import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../components/ui/PageHeader';
import { CharismaticSectionNav } from './CharismaticSectionNav';
import { getSection } from './sections';

/**
 * Moldura comum das páginas da área "Vida no Espírito".
 *
 * Cada página repete o mesmo gesto: rubrica da seção → título → filete →
 * contexto → índice horizontal. A repetição é o que dá a sensação de livro.
 */
export function CharismaticLayout({
  path,
  title,
  description,
  children,
}: {
  path: string;
  title?: string;
  description: ReactNode;
  children: ReactNode;
}) {
  const section = getSection(path);

  return (
    <div className="space-y-7 animate-[var(--animate-fade)]">
      <nav aria-label="Trilha de navegação" className="text-[0.6875rem] text-muted">
        <Link to="/carismatico" className="transition-colors hover:text-rubric">
          Vida no Espírito
        </Link>
        <span className="mx-1.5 text-rule-strong" aria-hidden>
          /
        </span>
        <span className="text-ink-2">{section?.label ?? title}</span>
      </nav>

      <PageHeader
        label={section ? `${section.mark} · ${section.label}` : undefined}
        title={title ?? section?.title ?? ''}
        description={description}
      />

      <CharismaticSectionNav />

      <div className="space-y-8">{children}</div>
    </div>
  );
}
