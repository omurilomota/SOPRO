import { Section } from '../../components/ui/Structure';
import { Meta, Rubric } from '../../components/ui/Marks';
import { prayerMeetingElements } from '../../data/rcc/group';
import { cn } from '../../utils/cn';
import { CharismaticLayout } from './CharismaticLayout';
import { Caution, DashList } from './shared';

const POLES = ['Louvor', 'Efusão do Espírito Santo', 'Pregação querigmática'];

/**
 * A reunião de oração por dentro.
 *
 * Estrutura: os três polos primeiro (o que define a reunião), depois o
 * elemento por elemento com o erro comum ao lado. A coluna do "erro" existe
 * porque é ali que a maior parte dos grupos se perde.
 */
export default function MeetingPage() {
  return (
    <CharismaticLayout
      path="/carismatico/reuniao"
      description="Cerca de duas horas, nove elementos, três polos. O que sustenta a reunião e o que a esvazia — inclusive quando tudo parece estar indo bem."
    >
      <section className="border-t border-rule pt-5">
        <Rubric>Os três polos</Rubric>
        <p className="mt-2 max-w-[58ch] text-[0.875rem] leading-relaxed text-ink-2">
          A tradição carismática resume a reunião de oração em três movimentos. Se um deles domina,
          a reunião se desequilibra: só louvor vira animação; só pregação vira aula; só efusão vira
          busca de sensação.
        </p>

        <ol className="mt-4 grid gap-4 sm:grid-cols-3">
          {POLES.map((pole, index) => (
            <li key={pole} className="border-t-2 border-rubric/60 pt-2.5">
              <span className="numeral text-[0.75rem]">{`0${index + 1}`}</span>
              <p className="mt-1 font-display text-[1.0625rem] leading-snug text-ink">{pole}</p>
              <p className="mt-1 text-[0.8125rem] leading-relaxed text-muted">
                {index === 0 && 'Reconhecer quem Deus é antes de pedir qualquer coisa.'}
                {index === 1 && 'Pedir e acolher uma nova efusão da graça já recebida.'}
                {index === 2 && 'Anunciar Jesus, não resolver a vida de ninguém em 20 minutos.'}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <Section
        label="Elemento por elemento"
        description="Na ordem habitual da reunião. O último é condicional — depende do que o Espírito suscita."
      >
        <ol className="ruled border-y border-rule">
          {prayerMeetingElements.map((element) => (
            <li key={element.id} className="py-4">
              <div className="flex items-baseline gap-3">
                <span className="numeral w-5 shrink-0">{String(element.order).padStart(2, '0')}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-2.5">
                    <h3
                      className={cn(
                        'font-display text-[1.0625rem] leading-snug',
                        element.central ? 'text-rubric' : 'text-ink',
                      )}
                    >
                      {element.name}
                    </h3>
                    {element.central && <Meta>Polo</Meta>}
                  </div>

                  <p className="mt-1 max-w-[58ch] text-[0.875rem] leading-relaxed text-ink-2">
                    {element.description}
                  </p>

                  <p className="mt-2 max-w-[58ch] text-[0.875rem] leading-relaxed text-muted">
                    <span className="rubric-muted mr-1.5 text-[0.625rem]">Por quê</span>
                    {element.purpose}
                  </p>

                  {element.pitfall && (
                    <p className="mt-2 max-w-[58ch] border-l-2 border-rule-strong pl-3 text-[0.875rem] leading-relaxed text-muted">
                      <span className="rubric mr-1.5 text-[0.625rem]">Erro comum</span>
                      {element.pitfall}
                    </p>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section label="O ritmo de duas horas" description="Uma referência, não uma lei.">
        <div className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
          {[
            ['0–10 min', 'Acolhida na porta e no início'],
            ['10–25 min', 'Animação e cânticos de entrada'],
            ['25–50 min', 'Louvor'],
            ['50–60 min', 'Silêncio'],
            ['60–75 min', 'Efusão do Espírito Santo'],
            ['75–100 min', 'Pregação querigmática'],
            ['100–115 min', 'Testemunhos e oração final'],
            ['115–120 min', 'Avisos, curtos'],
          ].map(([time, label]) => (
            <div key={time} className="flex items-baseline gap-3 border-b border-rule py-2">
              <span className="w-20 shrink-0 text-[0.75rem] tabular-nums text-rubric">{time}</span>
              <span className="text-[0.875rem] text-ink-2">{label}</span>
            </div>
          ))}
        </div>
      </Section>

      <Caution title="Ordem na assembleia">
        <p>
          São Paulo dedica um capítulo inteiro a organizar o uso dos carismas na reunião (1Cor 14).
          A regra é clara: tudo para a edificação, tudo com ordem, e quem fala em línguas sem
          intérprete deve calar (1Cor 14, 26-33. 40). Ordem não é falta de Espírito — é sinal de que
          se leva a assembleia a sério.
        </p>
      </Caution>

      <section>
        <Rubric>O que a Igreja pediu que se evitasse</Rubric>
        <DashList
          className="mt-2"
          items={[
            'Repouso no Espírito como espetáculo ou sinal de autenticidade (CNBB 53, n. 66).',
            'Óleo e gestos que imitem a Unção dos Enfermos (nn. 60-61).',
            'Promessas de cura e anúncio de milagres (n. 60).',
            'Profecias que constrangem pessoas ou orientam decisões íntimas (n. 65).',
            'Coletas insistentes e apelos financeiros em nome da bênção.',
          ]}
        />
      </section>
    </CharismaticLayout>
  );
}
