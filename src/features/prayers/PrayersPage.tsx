import { ChevronRight, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { EmptyState } from '../../components/ui/EmptyState';
import { PageHeader } from '../../components/ui/PageHeader';
import { TextInput } from '../../components/ui/Field';
import { Reference } from '../../components/ui/Marks';
import { prayerCategories, prayers } from '../../data/prayers';
import { cn } from '../../utils/cn';

/**
 * Biblioteca de orações.
 *
 * Índice de livro: busca, filtro por categoria e listas pautadas. O Terço tem
 * entrada própria, marcada como uma rubrica antes do índice.
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
    <div className="space-y-7 animate-[var(--animate-fade)]">
      <PageHeader
        label="Orações e devoções"
        title="Biblioteca de orações"
        description="Orações tradicionais da Igreja e roteiros para a vida diária. Os textos são de domínio público ou escritos para o SOPRO."
      />

      <Link
        to="/terco"
        className="group flex items-baseline justify-between gap-4 border-y border-rule py-3 transition-colors"
      >
        <span className="min-w-0">
          <span className="block font-display text-[1.0625rem] text-ink transition-colors group-hover:text-rubric">
            Rezar o Terço
          </span>
          <span className="mt-0.5 block text-[0.8125rem] leading-relaxed text-muted">
            Experiência guiada, com contador discreto e os mistérios de cada dia.
          </span>
        </span>
        <ChevronRight
          size={15}
          className="shrink-0 translate-y-1 text-muted transition-transform group-hover:translate-x-0.5"
          aria-hidden
        />
      </Link>

      <div className="space-y-3">
        <div className="relative">
          <Search
            size={14}
            className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-muted"
            aria-hidden
          />
          <TextInput
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar oração por nome ou tema…"
            className="pl-5"
            aria-label="Buscar oração"
            type="search"
          />
        </div>

        <div className="no-scrollbar -mx-1 flex gap-3 overflow-x-auto px-1 pb-0.5">
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
          label="Nenhuma oração encontrada"
          description="Tente outro termo de busca ou selecione outra categoria."
        />
      ) : (
        <div className="space-y-8">
          {prayerCategories
            .filter((category) => grouped.has(category.id))
            .map((category) => {
              const items = grouped.get(category.id) ?? [];
              return (
                <section key={category.id} className="space-y-2">
                  <div>
                    <p className="section-rule">
                      <span className="rubric whitespace-nowrap">{category.title}</span>
                    </p>
                    <p className="mt-1 text-[0.75rem] leading-relaxed text-muted">
                      {category.description}
                    </p>
                  </div>
                  <ul className="ruled">
                    {items.map((prayer) => (
                      <li key={prayer.id}>
                        <Link
                          to={`/oracoes/${prayer.id}`}
                          className="group flex items-baseline gap-3 py-2.5"
                        >
                          <span className="min-w-0 flex-1">
                            <span className="block font-display text-[1.0625rem] leading-snug text-ink transition-colors group-hover:text-rubric">
                              {prayer.title}
                            </span>
                            <span className="mt-0.5 block text-[0.8125rem] leading-relaxed text-muted">
                              {prayer.summary}
                            </span>
                          </span>
                          {prayer.scripture[0] && (
                            <Reference className="hidden shrink-0 sm:block">
                              {prayer.scripture[0]}
                            </Reference>
                          )}
                          <ChevronRight
                            size={14}
                            className="shrink-0 text-muted transition-transform group-hover:translate-x-0.5"
                            aria-hidden
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
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
        'shrink-0 whitespace-nowrap border-b pb-0.5 text-[0.75rem] transition-colors',
        active
          ? 'border-rubric font-medium text-rubric'
          : 'border-transparent text-muted hover:text-ink-2',
      )}
    >
      {children}
    </button>
  );
}
