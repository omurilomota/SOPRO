import { useState } from 'react';
import { Section } from '../../components/ui/Structure';
import { Meta, Reference, Rubric } from '../../components/ui/Marks';
import { groupMoments } from '../../data/rcc/group';
import { cn } from '../../utils/cn';
import { CharismaticLayout } from './CharismaticLayout';
import { Caution, DashList, Refs } from './shared';

/**
 * Os três momentos do Grupo de Oração.
 *
 * A leitura é sequencial e explícita: At 2, 1-4 → 2, 5-41 → 2, 42-47.
 * Cada momento pode ser aberto; o conteúdo mostra o que se faz, quem faz e
 * o que dá errado.
 */
export default function GroupMomentsPage() {
  const [active, setActive] = useState(groupMoments[1]!.id);
  const moment = groupMoments.find((item) => item.id === active) ?? groupMoments[1]!;

  return (
    <CharismaticLayout
      path="/carismatico/grupo-de-oracao"
      description="A RCC lê o Grupo de Oração em Atos 2. Três momentos, três versículos, três tarefas distintas — e é comum que um grupo funcione bem em um e falhe nos outros dois."
    >
      <p className="reading border-t border-rule pt-5">
        O Grupo de Oração não é uma reunião semanal com um responsável. É uma estrutura de três
        momentos que se sustentam mutuamente. Quando um deles desaparece, os outros dois se
        deformam: sem núcleo, a reunião vira improviso; sem perseverança, o grupo produz conversões
        que não têm para onde ir.
      </p>

      {/* Seletor dos três momentos */}
      <div className="-mx-5 border-y border-rule sm:-mx-7">
        <div className="grid grid-cols-3 divide-x divide-rule">
          {groupMoments.map((item, index) => {
            const selected = item.id === moment.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActive(item.id)}
                aria-pressed={selected}
                className={cn(
                  'flex flex-col gap-1 px-3 py-3 text-left transition-colors sm:px-5',
                  selected ? 'bg-paper-2' : 'hover:bg-paper-2/60',
                )}
              >
                <span className="flex items-baseline gap-1.5">
                  <span
                    className={cn('numeral text-[0.75rem]', selected ? 'text-rubric' : 'text-muted/70')}
                    aria-hidden
                  >
                    {index + 1}
                  </span>
                  <span
                    className={cn(
                      'font-display text-[0.9375rem] leading-tight sm:text-[1.0625rem]',
                      selected ? 'text-ink' : 'text-ink-2',
                    )}
                  >
                    {item.name}
                  </span>
                </span>
                <Reference className="text-[0.75rem]">{item.scripture}</Reference>
              </button>
            );
          })}
        </div>
      </div>

      <article className="space-y-6">
        <header className="space-y-2">
          <h2 className="text-[1.5rem] leading-tight text-ink">{moment.name}</h2>
          <p className="reading">{moment.summary}</p>
        </header>

        <dl className="grid gap-x-6 gap-y-3 border-y border-rule py-3 sm:grid-cols-2">
          <div>
            <dt>
              <Meta>Quem participa</Meta>
            </dt>
            <dd className="mt-1 text-[0.875rem] leading-relaxed text-ink-2">{moment.who}</dd>
          </div>
          <div>
            <dt>
              <Meta>Quando</Meta>
            </dt>
            <dd className="mt-1 text-[0.875rem] leading-relaxed text-ink-2">{moment.frequency}</dd>
          </div>
        </dl>

        <Section label="O que se faz" variant="plain">
          <ol className="space-y-4">
            {moment.steps.map((step, index) => (
              <li key={step.title} className="flex gap-3.5">
                <span className="numeral w-5 shrink-0 pt-0.5">{String(index + 1).padStart(2, '0')}</span>
                <div className="min-w-0">
                  <p className="font-display text-[1rem] leading-snug text-ink">{step.title}</p>
                  <p className="mt-1 max-w-[58ch] text-[0.875rem] leading-relaxed text-ink-2">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Caution title="Onde isso costuma falhar">
          <DashList items={moment.cautions} />
        </Caution>
      </article>

      <Section
        label="O que o núcleo não é"
        description="Cinco verbos, e nenhum deles é 'mandar'."
      >
        <div className="grid gap-x-6 gap-y-3 sm:grid-cols-5">
          {['Avaliar', 'Analisar', 'Planejar', 'Interceder', 'Preparar'].map((verb) => (
            <div key={verb} className="border-t border-rule pt-2">
              <Rubric className="text-[0.625rem]">{verb}</Rubric>
            </div>
          ))}
        </div>
        <p className="mt-3 max-w-[58ch] text-[0.875rem] leading-relaxed text-ink-2">
          A tradição carismática descreve o núcleo com esses cinco verbos, e às vezes acrescenta
          três: pastorear (acompanhar pessoas), revezar (não concentrar tudo em uma pessoa) e
          abastecer (cuidar do material e da formação). Nenhum deles é governo: é serviço.
        </p>
        <Refs
          label="Atenção ao vocabulário"
          items={[
            'CNBB 53, n. 29: não reaproveitar termos eclesiais com outro sentido',
            'Coordenar não é ser hierarquia',
          ]}
        />
      </Section>
    </CharismaticLayout>
  );
}
