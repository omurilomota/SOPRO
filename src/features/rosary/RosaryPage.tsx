import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ButtonLink } from '../../components/ui/Button';
import { PageHeader } from '../../components/ui/PageHeader';
import { Meta, Rubric } from '../../components/ui/Marks';
import { mysteryGroups } from '../../data/rosary';
import { fromISODate, todayISO } from '../../utils/date';
import { cn } from '../../utils/cn';

const COLOR_CLASS = {
  verde: 'text-liturgia-verde',
  serenidade: 'text-indigo',
  roxo: 'text-liturgia-roxo',
  brass: 'text-liturgia-branco',
} as const;

/** Escolha do conjunto de mistérios para rezar o Terço. */
export default function RosaryPage() {
  const weekday = fromISODate(todayISO()).getDay();
  const suggested = mysteryGroups.find((group) => group.weekdays.includes(weekday)) ?? mysteryGroups[0]!;

  return (
    <div className="space-y-7 animate-[var(--animate-fade)]">
      <PageHeader
        label="Terço"
        title="Rezar o Terço"
        description="Escolha os mistérios. O contador é apenas um apoio discreto — a oração não é uma pontuação."
      />

      <div className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-2 border-y border-rule py-3.5">
        <div className="min-w-0">
          <Rubric>Sugestão para hoje</Rubric>
          <p className="mt-0.5 font-display text-[1.25rem] leading-snug text-ink">{suggested.name}</p>
          <p className="text-[0.8125rem] leading-relaxed text-muted">{suggested.description}</p>
        </div>
        <ButtonLink to={`/terco/${suggested.id}`} variant="solid" size="sm">
          Começar
          <ArrowUpRight size={13} aria-hidden />
        </ButtonLink>
      </div>

      <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        {mysteryGroups.map((group) => (
          <Link key={group.id} to={`/terco/${group.id}`} className="group block">
            <div className="flex items-baseline justify-between gap-3 border-t border-rule pt-2.5">
              <h2 className="font-display text-[1.0625rem] leading-snug text-ink transition-colors group-hover:text-rubric">
                {group.name}
              </h2>
              {group.id === suggested.id && <Meta>Hoje</Meta>}
            </div>
            <p className="mt-1 text-[0.8125rem] leading-relaxed text-muted">{group.description}</p>
            <ul className="mt-2 space-y-1">
              {group.mysteries.map((mystery) => (
                <li key={mystery.id} className="flex gap-2 text-[0.8125rem] leading-snug text-ink-2">
                  <span
                    className={cn('numeral shrink-0 text-[0.625rem]', COLOR_CLASS[group.color])}
                    aria-hidden
                  >
                    ·
                  </span>
                  <span className="flex-1">{mystery.title}</span>
                </li>
              ))}
            </ul>
          </Link>
        ))}
      </div>

      <p className="max-w-[62ch] border-t border-rule pt-3 text-[0.75rem] leading-relaxed text-muted">
        A indicação dos mistérios por dia da semana é um costume piedoso, não uma norma litúrgica.
        Você pode rezá-los em qualquer ordem.
      </p>
    </div>
  );
}
