import { useState } from 'react';
import { Section } from '../../components/ui/Structure';
import { Meta, Reference, Rubric } from '../../components/ui/Marks';
import { carismOfServiceIds, charisms } from '../../data/rcc/charisms';
import { cn } from '../../utils/cn';
import { CharismaticLayout } from './CharismaticLayout';
import { Caution, DashList, Refs } from './shared';

/**
 * Os carismas um por um.
 *
 * Cada verbete traz a mesma estrutura — e sempre traz os "cuidados" e os
 * "requisitos", porque é neles que a Igreja se manifesta. Um catálogo de
 * carismas sem cautelas é propaganda, não formação.
 */
export default function CharismsPage() {
  const [selected, setSelected] = useState<string>(charisms[0]!.id);
  const charism = charisms.find((item) => item.id === selected) ?? charisms[0]!;

  const manisfestation = charisms.filter((item) => !carismOfServiceIds.includes(item.id));
  const service = charisms.filter((item) => carismOfServiceIds.includes(item.id));

  return (
    <CharismaticLayout
      path="/carismatico/carismas"
      description="Dez carismas de manifestação (1Cor 12) e sete de serviço (Rm 12), com a finalidade de cada um, o que a Igreja pede antes de exercê-lo e o que nunca se deve fazer."
    >
      <p className="reading border-t border-rule pt-5">
        São Paulo lista os carismas três vezes, e as listas não coincidem (1Cor 12, 8-10. 28-30;
        Rm 12, 6-8; Ef 4, 11-13). Isso significa que nenhuma delas é um catálogo fechado. O que
        define o carisma não é o nome, e sim a finalidade: é graça dada para o bem comum.
      </p>

      <div className="grid gap-6 md:grid-cols-[13rem_1fr] md:gap-8">
        {/* Índice */}
        <nav aria-label="Carismas">
          <p className="rubric mb-1.5">Manifestação</p>
          <ul className="border-t border-rule">
            {manisfestation.map((item, index) => (
              <li key={item.id} className="border-b border-rule">
                <button
                  type="button"
                  onClick={() => setSelected(item.id)}
                  aria-pressed={selected === item.id}
                  className={cn(
                    'flex w-full items-baseline gap-2 py-2 text-left text-[0.875rem] transition-colors',
                    selected === item.id ? 'text-rubric' : 'text-ink-2 hover:text-ink',
                  )}
                >
                  <span className="numeral shrink-0 text-[0.625rem]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span>{item.name}</span>
                </button>
              </li>
            ))}
          </ul>

          <p className="rubric mb-1.5 mt-5">Serviço</p>
          <ul className="border-t border-rule">
            {service.map((item, index) => (
              <li key={item.id} className="border-b border-rule">
                <button
                  type="button"
                  onClick={() => setSelected(item.id)}
                  aria-pressed={selected === item.id}
                  className={cn(
                    'flex w-full items-baseline gap-2 py-2 text-left text-[0.875rem] transition-colors',
                    selected === item.id ? 'text-rubric' : 'text-ink-2 hover:text-ink',
                  )}
                >
                  <span className="numeral shrink-0 text-[0.625rem]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span>{item.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Verbete */}
        <article className="md:border-l md:border-rule md:pl-8">
          <header className="space-y-2">
            <p className="flex flex-wrap items-baseline gap-x-2.5">
              <Rubric>
                {carismOfServiceIds.includes(charism.id) ? 'Carisma de serviço' : 'Carisma de manifestação'}
              </Rubric>
              <span>
                {charism.scripture.slice(0, 3).map((reference, index) => (
                  <span key={reference}>
                    {index > 0 && <span className="mx-1 text-rule-strong">·</span>}
                    <Reference className="text-[0.8125rem]">{reference}</Reference>
                  </span>
                ))}
              </span>
            </p>
            <h2 className="text-[1.5rem] leading-tight text-ink">{charism.name}</h2>
            <p className="max-w-[58ch] font-display text-[1.0625rem] italic leading-snug text-ink-2">
              {charism.summary}
            </p>
          </header>

          <div className="reading mt-4 max-w-[58ch]">{charism.body}</div>

          <div className="mt-5 border-l-2 border-rule-strong pl-4">
            <Rubric className="text-[0.625rem]">Para que serve</Rubric>
            <p className="mt-1 max-w-[58ch] text-[0.875rem] leading-relaxed text-ink-2">
              {charism.purpose}
            </p>
          </div>

          <div className="mt-5">
            <Rubric className="text-[0.625rem]">Cuidados pastorais</Rubric>
            <DashList className="mt-1" items={charism.cautions} tone="rubric" />
          </div>

          <div className="mt-4">
            <Rubric className="text-[0.625rem]">O que se pede antes de exercer</Rubric>
            <DashList className="mt-1" items={charism.requirements} />
          </div>

          <div className="mt-4 flex flex-wrap items-baseline gap-x-3 border-t border-rule pt-2">
            <Meta>Magistério</Meta>
            <span className="text-[0.8125rem] text-muted">{charism.magisterium.join(' · ')}</span>
          </div>
        </article>
      </div>

      <Caution title="A regra que sustenta todo o resto">
        <p>
          A CNBB é direta: os carismas devem ser recebidos com gratidão, mas não se deve ter a
          presunção de possuí-los nem pedi-los de modo temerário; e o juízo sobre sua autenticidade
          compete aos pastores da Igreja (Doc. 53, nn. 56-58). O SOPRO apresenta os carismas como
          formação — nunca como diagnóstico, nunca como hierarquia espiritual.
        </p>
      </Caution>

      <Section label="O que ninguém deve fazer" variant="plain">
        <DashList
          items={[
            'Anunciar que alguém "tem" este ou aquele carisma como quem dá um veredito.',
            'Usar palavras de ciência ou profecia para revelar segredos ou constranger pessoas.',
            'Confundir carisma com autoridade: nenhum carisma confere jurisdição na Igreja.',
            'Tratar a ausência de um carisma como falha de fé.',
          ]}
        />
        <Refs
          label="Nota"
          items={[
            'Textos escritos para o SOPRO a partir das fontes citadas',
            'Citações bíblicas por referência',
            'Apostilas oficiais não são reproduzidas',
          ]}
        />
      </Section>
    </CharismaticLayout>
  );
}
