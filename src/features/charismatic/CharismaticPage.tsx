import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../components/ui/PageHeader';
import { Flush, Section } from '../../components/ui/Structure';
import { Meta, Rubric } from '../../components/ui/Marks';
import { svesSessions } from '../../data/rcc/sves';
import { formationStages } from '../../data/rcc/formation';
import { charitableDisclaimer } from './shared';
import { charismaticSections } from './sections';
import { useRccProgress } from './useRccProgress';
import { CharismaticSectionNav } from './CharismaticSectionNav';

const basicsModules = formationStages.filter((stage) => stage.phase === 'basico');

/**
 * Porta de entrada da área que diferencia o SOPRO.
 *
 * Estrutura editorial, não dashboard: uma abertura em texto corrido, o estado
 * do caminho em uma linha, e um índice numerado — como o sumário de um missal.
 */
export default function CharismaticPage() {
  const sves = useRccProgress('sves');
  const formacao = useRccProgress('formacao');

  const svesDone = sves.completedCount;
  const basicDone = formacao.completedCount;

  return (
    <div className="space-y-8 animate-[var(--animate-fade)]">
      <PageHeader
        label="Vida no Espírito"
        title="A Renovação Carismática Católica, sem atalho"
        description="Não é uma coleção de frases sobre o Espírito Santo. É o que a Igreja no Brasil documentou sobre a RCC, o que o grupo de oração faz na prática e o que a formação realmente exige."
      />

      <CharismaticSectionNav />

      <div className="grid gap-7 md:grid-cols-[minmax(0,1fr)_13.5rem] md:gap-9">
        <div className="space-y-5">
          <p className="reading dropcap">
            A Renovação Carismática Católica nasceu em 1967, numa universidade americana, de
            universitários que rezavam pedindo uma renovação da vida cristã — não de uma instituição
            que decidiu fundar um movimento. Chegou ao Brasil em 1969 e, desde então, a Igreja
            brasileira precisou dizer o que nela edificava e o que feria o povo de Deus. Foi o que a
            CNBB fez em 1994, no Documento 53.
          </p>
          <p className="reading">
            Quase tudo o que circula sobre carismas na internet ignora esse documento. Esta área não
            ignora. Cada afirmação aqui tem uma referência que você pode conferir — e, onde a Igreja
            pede cautela, a cautela está escrita junto, não escondida numa nota de rodapé.
          </p>
        </div>

        <aside className="space-y-4 border-t border-rule pt-4 md:border-l md:border-t-0 md:pl-5 md:pt-0">
          <div>
            <Rubric>Seu caminho</Rubric>
            <p className="mt-1.5 font-display text-[1.75rem] leading-none text-ink [font-variant-numeric:oldstyle-nums]">
              {svesDone}
              <span className="text-[1rem] text-muted">/{svesSessions.length}</span>
            </p>
            <p className="mt-1 text-[0.75rem] leading-snug text-muted">
              semanas do SVES concluídas
            </p>
          </div>

          <div className="h-px bg-rule" />

          <div>
            <p className="font-display text-[1.75rem] leading-none text-ink [font-variant-numeric:oldstyle-nums]">
              {basicDone}
              <span className="text-[1rem] text-muted">/{basicsModules.length}</span>
            </p>
            <p className="mt-1 text-[0.75rem] leading-snug text-muted">
              módulos do Módulo Básico
            </p>
          </div>

          <div className="h-px bg-rule" />

          <p className="text-[0.6875rem] leading-relaxed text-muted">
            O progresso fica só no seu aparelho. Não há conta, nem sincronização, nem envio de nada.
          </p>
        </aside>
      </div>

      <Section label="Índice" description="Na ordem em que se entra na vida do movimento.">
        <ul className="ruled">
          {charismaticSections.map((section) => (
            <li key={section.to}>
              <Link
                to={section.to}
                className="group flex items-baseline gap-4 py-3.5 transition-colors hover:text-rubric"
              >
                <span className="numeral w-7 shrink-0 pt-0.5" aria-hidden>
                  {section.mark}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-baseline gap-2">
                    <span className="font-display text-[1.0625rem] leading-snug text-ink transition-colors group-hover:text-rubric">
                      {section.title}
                    </span>
                    <ArrowUpRight
                      size={13}
                      className="shrink-0 text-muted opacity-0 transition-opacity group-hover:opacity-100"
                      aria-hidden
                    />
                  </span>
                  <span className="mt-0.5 block max-w-[54ch] text-[0.8125rem] leading-relaxed text-muted">
                    {section.description}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Flush className="px-4 py-4">
        <Meta>Nota de transparência</Meta>
        <p className="mt-1.5 max-w-[60ch] text-[0.8125rem] leading-relaxed text-ink-2">
          {charitableDisclaimer}
        </p>
      </Flush>
    </div>
  );
}
