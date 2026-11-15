import { Section } from '../../components/ui/Structure';
import { Meta, Reference, Rubric } from '../../components/ui/Marks';
import { historyTimeline } from '../../data/rcc/history';
import { rccDocuments } from '../../data/rcc/glossary';
import { CharismaticLayout } from './CharismaticLayout';
import { Caution } from './shared';

/**
 * Linha do tempo e documentos.
 *
 * A história serve a um argumento: a RCC não é um fenômeno brasileiro recente
 * nem uma invenção de televisão. Ela tem antecessores, documentos e correções.
 */
export default function HistoryPage() {
  return (
    <CharismaticLayout
      path="/carismatico/historia"
      description="De Elena Guerra ao CHARIS: como o movimento nasceu, como foi recebido pela Igreja e o que precisou ser corrigido no caminho."
    >
      <p className="reading border-t border-rule pt-5">
        Nenhum movimento eclesial nasce pronto. A Renovação Carismática Católica nasceu de uma
        oração por renovação, foi acolhida com desconfiança, ganhou documentos de discernimento,
        recebeu correções pastorais e chegou ao século XXI com um serviço internacional criado pelo
        próprio Vaticano. Essa história é mais interessante — e mais exigente — do que a versão
        triunfalista que costuma circular.
      </p>

      <ol className="relative border-l border-rule pl-5">
        {historyTimeline.map((event) => (
          <li key={`${event.year}-${event.title}`} className="relative pb-6 last:pb-0">
            <span
              className="absolute -left-[23px] top-[7px] size-[7px] rounded-full border border-rubric bg-paper"
              aria-hidden
            />
            <div className="flex flex-wrap items-baseline gap-x-3">
              <span className="font-display text-[0.9375rem] tabular-nums text-rubric">
                {event.year}
              </span>
              <h2 className="font-display text-[1.0625rem] leading-snug text-ink">{event.title}</h2>
              {event.place && <Meta>{event.place}</Meta>}
            </div>
            <p className="mt-1 max-w-[64ch] text-[0.8125rem] leading-relaxed text-ink-2">
              {event.body}
            </p>
          </li>
        ))}
      </ol>

      <Caution title="Sobre o que não está aqui">
        <p>
          A história do movimento inclui episódios controversos: tensões com bispos, grupos que se
          isolaram, lideranças que abusaram de autoridade. O SOPRO não os detalha porque não tem
          fontes públicas suficientes para narrá-los com justiça — e narrar mal é pior que não
          narrar. O que se pode afirmar com segurança está nos documentos: a Igreja reconheceu o
          movimento e, ao mesmo tempo, corrigiu desvios reais.
        </p>
      </Caution>

      <Section
        label="Documentos"
        description="O que ler, e por quê. Onde não há endereço público confiável, fica a referência bibliográfica."
      >
        <ul className="border-t border-rule">
          {rccDocuments.map((document) => (
            <li key={document.id} className="border-b border-rule py-4">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-display text-[1.0625rem] leading-snug text-ink">
                  {document.title}
                </h3>
                <span className="flex items-baseline gap-2.5">
                  <Reference className="text-[0.75rem]">{document.year}</Reference>
                  {document.url && (
                    <a
                      href={document.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="border-b border-rule-strong pb-px text-[0.6875rem] text-ink transition-colors hover:border-rubric hover:text-rubric"
                    >
                      Abrir
                    </a>
                  )}
                </span>
              </div>
              <p className="mt-0.5 text-[0.75rem] text-muted">{document.author}</p>
              <p className="mt-1 max-w-[62ch] text-[0.8125rem] leading-relaxed text-ink-2">
                {document.summary}
              </p>
              <p className="mt-1 max-w-[62ch] text-[0.8125rem] leading-relaxed text-muted">
                <span className="rubric-muted mr-1.5 text-[0.5625rem]">Por que importa</span>
                {document.relevance}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <div className="border-t border-rule pt-3">
        <Rubric className="text-[0.5625rem]">Nota sobre direitos</Rubric>
        <p className="mt-1 max-w-[64ch] text-[0.75rem] leading-relaxed text-muted">
          O SOPRO não reproduz o texto integral de documentos de terceiros. As sínteses são próprias
          e as referências apontam para as fontes. Documentos da Santa Sé estão disponíveis no site
          do Vaticano; os da CNBB, no site da conferência e em publicações impressas.
        </p>
      </div>
    </CharismaticLayout>
  );
}
