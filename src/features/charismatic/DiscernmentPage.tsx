import { Section } from '../../components/ui/Structure';
import { Meta } from '../../components/ui/Marks';
import { discernmentCriteria, pastoralWarnings } from '../../data/rcc/discernment';
import { CharismaticLayout } from './CharismaticLayout';
import { Caution, Refs } from './shared';

const ECCLESIALITY_IDS = ['primado-da-vocacao', 'confissao-da-fe', 'comunhao', 'missao', 'caridade'];

/**
 * Discernimento.
 *
 * A página mais "impopular" e a mais necessária: os cinco critérios de
 * eclesialidade e os desvios que a Igreja no Brasil nomeou por escrito.
 *
 * Estrutura em dois blocos: primeiro como se discerne (critérios), depois
 * o que já se discerniu e foi reprovado (alertas).
 */
export default function DiscernmentPage() {
  const ecclesiality = discernmentCriteria.filter((item) => ECCLESIALITY_IDS.includes(item.id));
  const practical = discernmentCriteria.filter((item) => !ECCLESIALITY_IDS.includes(item.id));

  return (
    <CharismaticLayout
      path="/carismatico/discernimento"
      description="Como saber se uma moção vem de Deus, do próprio desejo ou de outro lugar — e o que a Igreja no Brasil já reprovou por escrito. Esta é a parte que quase nunca se ensina."
    >
      <p className="reading border-t border-rule pt-5">
        O discernimento não é um dom reservado a místicos. É uma tarefa cristã comum, com critérios
        verificáveis, e a Igreja os formulou com precisão. O problema é que eles circulam pouco: é
        mais fácil ensinar que o Espírito fala do que ensinar como distinguir a voz dele das outras.
      </p>

      <Section
        label="Os cinco critérios de eclesialidade"
        description="Propostos por João Paulo II em Christifideles Laici 30 e retomados pela CNBB. Servem a qualquer movimento — inclusive à RCC."
      >
        <ol className="border-t border-rule">
          {ecclesiality.map((criterion, index) => (
            <li key={criterion.id} className="border-b border-rule py-4">
              <div className="flex items-baseline gap-3">
                <span className="numeral w-5 shrink-0">{String(index + 1).padStart(2, '0')}</span>
                <div className="min-w-0">
                  <h3 className="font-display text-[1.125rem] leading-snug text-ink">{criterion.title}</h3>
                  <p className="mt-1 max-w-[60ch] font-display text-[1rem] italic leading-snug text-rubric">
                    {criterion.question}
                  </p>
                  <p className="mt-1.5 max-w-[62ch] text-[0.8125rem] leading-relaxed text-ink-2">
                    {criterion.explanation}
                  </p>
                  <p className="mt-1 text-[0.6875rem] text-muted">{criterion.source}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Caution title="A pergunta que resolve">
        Se você só puder fazer uma pergunta diante de uma moção, faça esta: isso me torna mais capaz
        de amar as pessoas concretas que Deus colocou na minha vida? Se a resposta for não, o resto
        não importa.
      </Caution>

      <Section
        label="Critérios de trabalho"
        description="Não são oficialmente os cinco acima — são ferramentas práticas, de uso comum na formação carismática e na tradição inaciana."
      >
        <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
          {practical.map((criterion) => (
            <div key={criterion.id} className="border-t border-rule pt-2.5">
              <h3 className="font-display text-[1rem] leading-snug text-ink">{criterion.title}</h3>
              <p className="mt-0.5 font-display text-[0.9375rem] italic leading-snug text-rubric">
                {criterion.question}
              </p>
              <p className="mt-1 text-[0.8125rem] leading-relaxed text-ink-2">{criterion.explanation}</p>
              <p className="mt-1 text-[0.6875rem] text-muted">{criterion.source}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        label="O que a Igreja já reprovou"
        description="Cada item corresponde a um desvio nomeado por escrito — não a uma suposição do SOPRO."
      >
        <ol className="border-t border-rule">
          {pastoralWarnings.map((warning, index) => (
            <li key={warning.id} className="border-b border-rule py-4">
              <div className="flex items-baseline gap-3">
                <span className="numeral w-5 shrink-0 text-[0.625rem]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-[1.0625rem] leading-snug text-ink">
                    {warning.title}
                  </h3>
                  <p className="mt-1 max-w-[62ch] text-[0.8125rem] leading-relaxed text-muted">
                    <span className="rubric-muted mr-1.5 text-[0.5625rem]">O problema</span>
                    {warning.problem}
                  </p>
                  <p className="mt-1.5 max-w-[62ch] border-l-2 border-rubric/40 pl-3 text-[0.8125rem] leading-relaxed text-ink-2">
                    <span className="rubric mr-1.5 text-[0.5625rem]">Orientação</span>
                    {warning.guidance}
                  </p>
                  <p className="mt-1 text-[0.6875rem] text-muted">{warning.source}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section label="Quando procurar um sacerdote" variant="plain">
        <div className="space-y-2 text-[0.875rem] leading-relaxed text-ink-2">
          <p>
            O discernimento pessoal não substitui o acompanhamento. Procure o seu pároco ou um
            diretor espiritual quando:
          </p>
          <ul className="space-y-1.5">
            {[
              'Você acha que Deus está pedindo uma decisão grande — vocação, casamento, mudança de vida.',
              'Alguém afirmou ter uma "revelação" sobre você que gera medo ou obrigação.',
              'Há sofrimento psíquico envolvido: angústia persistente, vozes, perda de sono, crises.',
              'Um grupo está isolando você da paróquia, da família ou dos amigos.',
              'Você quer exercer um carisma publicamente e não tem referência eclesial.',
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-rubric" aria-hidden>
                  —
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-[0.8125rem] text-muted">
            Em sofrimento psíquico, procure também profissional de saúde. Fé e tratamento não se
            opõem.
          </p>
        </div>
        <Refs
          label="Base"
          items={['ChL 30', 'CNBB 53, nn. 46-47. 56-66', 'Exercícios Espirituais 313-336']}
        />
      </Section>

      <p className="border-t border-rule pt-3 text-[0.75rem] leading-relaxed text-muted">
        <Meta>Nota</Meta>{' '}
        Esta página não é um teste nem um formulário de avaliação. Não há resultado, pontuação ou
        perfil. É material de estudo — e o discernimento concreto é sempre seu, com a comunidade e
        com a Igreja.
      </p>
    </CharismaticLayout>
  );
}
