import { BookHeart, ChevronRight, CircleDashed, Flame, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { EmptyState } from '../../components/ui/EmptyState';
import { PageHeader } from '../../components/ui/PageHeader';
import { TextInput } from '../../components/ui/Field';
import { prayerCategories, prayers } from '../../data/prayers';
import { cn } from '../../utils/cn';

/**
 * Biblioteca de orações.
 *
 * Busca local por título, resumo e tags; agrupamento por categoria.
 * O Terço tem entrada própria (experiência guiada).
 */
export default function PrayersPage() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('todas');

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return prayers.filter((prayer) => {
      const matchesCategory = activeCategory === 'todas' || prayer.category === activeCategory;
      if (!matchesCategory) return false;
      if (!term) return true;
      return (
        prayer.title.toLowerCase().includes(term) ||
        prayer.summary.toLowerCase().includes(term) ||
        prayer.tags.some((tag) => tag.toLowerCase().includes(term))
      );
    });
  }, [query, activeCategory]);

  const grouped = useMemo(() => {
    const map = new Map<string, typeof prayers>();
    for (const prayer of filtered) {
      const list = map.get(prayer.category) ?? [];
      list.push(prayer);
      map.set(prayer.category, list);
    }
    return map;
  }, [filtered]);

  return (
    <div className="space-y-6 animate-[var(--animate-fade-up)]">
      <PageHeader
        eyebrow="Orações e devoções"
        title="Biblioteca de orações"
        description="Orações tradicionais da Igreja e roteiros para a vida diária. Todos os textos são de domínio público ou escritos para o SOPRO."
      />

      <Link
        to="/terco"
        className="group flex items-center gap-4 rounded-[var(--radius-card)] border border-brass/25 bg-brass-soft/60 p-4 transition-colors hover:bg-brass-soft dark:bg-brass-soft/30 dark:hover:bg-brass-soft/50"
      >
        <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-surface text-brass shadow-[var(--shadow-soft)]">
          <CircleDashed size={21} strokeWidth={1.6} aria-hidden />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-display text-[1.0625rem] text-ink">Rezar o Terço</span>
          <span className="block text-[0.8125rem] leading-relaxed text-ink-soft">
            Experiência guiada, com contador discreto e os mistérios de cada dia.
          </span>
        </span>
        <ChevronRight size={17} className="shrink-0 text-brass transition-transform group-hover:translate-x-0.5" aria-hidden />
      </Link>

      <div className="space-y-3">
        <div className="relative">
          <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" aria-hidden />
          <TextInput
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar oração por nome ou tema…"
            className="pl-10"
            aria-label="Buscar oração"
            type="search"
          />
        </div>

        <div className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1 no-scrollbar">
          <CategoryChip active={activeCategory === 'todas'} onClick={() => setActiveCategory('todas')}>
            Todas
          </CategoryChip>
          {prayerCategories.map((category) => (
            <CategoryChip
              key={category.id}
              active={activeCategory === category.id}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.title.replace('Orações ', '')}
            </CategoryChip>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={BookHeart}
          title="Nenhuma oração encontrada"
          description="Tente outro termo de busca ou selecione outra categoria."
        />
      ) : (
        <div className="space-y-8">
          {prayerCategories
            .filter((category) => grouped.has(category.id))
            .map((category) => {
              const items = grouped.get(category.id) ?? [];
              return (
                <section key={category.id} className="space-y-3">
                  <div>
                    <h2 className="text-base text-ink">{category.title}</h2>
                    <p className="text-[0.75rem] text-muted">{category.description}</p>
                  </div>
                  <div className="grid gap-2.5 sm:grid-cols-2">
                    {items.map((prayer) => (
                      <Link
                        key={prayer.id}
                        to={`/oracoes/${prayer.id}`}
                        className="group"
                      >
                        <Card className="h-full p-4 transition-colors group-hover:border-brass/40 group-hover:bg-surface-muted/40">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-display text-[1.0625rem] leading-snug text-ink">
                              {prayer.title}
                            </h3>
                            <ChevronRight size={15} className="mt-1 shrink-0 text-muted transition-transform group-hover:translate-x-0.5" aria-hidden />
                          </div>
                          <p className="mt-1 text-[0.8125rem] leading-relaxed text-muted">
                            {prayer.summary}
                          </p>
                          {prayer.scripture.length > 0 && (
                            <p className="mt-2 flex items-center gap-1 text-[0.6875rem] text-brass">
                              <Flame size={11} aria-hidden />
                              {prayer.scripture[0]}
                            </p>
                          )}
                        </Card>
                      </Link>
                    ))}
                  </div>
                </section>
              );
            })}
        </div>
      )}
    </div>
  );
}

function CategoryChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'shrink-0 whitespace-nowrap rounded-full border px-3 py-1.5 text-[0.75rem] transition-colors',
        active
          ? 'border-ink bg-ink text-canvas'
          : 'border-line bg-surface text-ink-soft hover:border-line-strong',
      )}
    >
      {children}
    </button>
  );
}
