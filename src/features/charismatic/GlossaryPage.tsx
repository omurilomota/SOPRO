import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { EmptyState } from '../../components/ui/EmptyState';
import { TextInput } from '../../components/ui/Field';
import { Reference } from '../../components/ui/Marks';
import { glossary } from '../../data/rcc/glossary';
import { CharismaticLayout } from './CharismaticLayout';

/**
 * Glossário. Busca local, lista alfabética e termos relacionados.
 * A ausência de jargão é o objetivo: cada verbete deveria ser compreensível
 * por alguém que nunca entrou num Grupo de Oração.
 */
export default function GlossaryPage() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    const sorted = [...glossary].sort((a, b) => a.term.localeCompare(b.term, 'pt-BR'));
    if (!term) return sorted;
    return sorted.filter(
      (entry) =>
        entry.term.toLowerCase().includes(term) ||
        entry.definition.toLowerCase().includes(term),
    );
  }, [query]);

  const groups = useMemo(() => {
    const map = new Map<string, typeof filtered>();
    for (const entry of filtered) {
      const letter = entry.term[0]?.toUpperCase() ?? '#';
      const list = map.get(letter) ?? [];
      list.push(entry);
      map.set(letter, list);
    }
    return [...map.entries()];
  }, [filtered]);

  return (
    <CharismaticLayout
      path="/carismatico/glossario"
      description="Os termos que a RCC usa — e que costumam circular sem explicação. Definidos sem jargão, com a distinção que evita confusão."
    >
      <div className="relative">
        <Search
          size={14}
          className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-muted"
          aria-hidden
        />
        <TextInput
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Buscar termo ou definição…"
          className="pl-5"
          aria-label="Buscar no glossário"
          type="search"
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          label="Nenhum termo encontrado"
          description="Tente outra palavra. Se o termo que você procura não está aqui, ele provavelmente não é usado na RCC — ou é usado de forma equivocada."
        />
      ) : (
        <dl className="space-y-7">
          {groups.map(([letter, entries]) => (
            <div key={letter}>
              <div className="section-rule mb-2">
                <span className="font-display text-[0.9375rem] text-rubric">{letter}</span>
              </div>
              <div className="ruled border-y border-rule">
                {entries.map((entry) => (
                  <div key={entry.term} className="py-3">
                    <dt className="font-display text-[1.0625rem] leading-snug text-ink">
                      {entry.term}
                    </dt>
                    <dd className="mt-0.5 max-w-[66ch] text-[0.8125rem] leading-relaxed text-ink-2">
                      {entry.definition}
                    </dd>
                    {entry.see && entry.see.length > 0 && (
                      <dd className="mt-1 flex flex-wrap items-baseline gap-x-2">
                        <span className="rubric-muted text-[0.5625rem]">Ver também</span>
                        {entry.see.map((term, index) => (
                          <span key={term}>
                            {index > 0 && <span className="mr-1.5 text-rule-strong">·</span>}
                            <Reference className="text-[0.75rem]">{term}</Reference>
                          </span>
                        ))}
                      </dd>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </dl>
      )}
    </CharismaticLayout>
  );
}
