import { ArrowUpRight, CircleDashed, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';
import { PageHeader } from '../../components/ui/PageHeader';
import { mysteryGroups } from '../../data/rosary';
import { fromISODate, todayISO } from '../../utils/date';

const COLOR_TONE = {
  verde: 'text-liturgy-green',
  serenidade: 'text-serenity',
  roxo: 'text-liturgy-purple',
  brass: 'text-brass',
} as const;

/** Escolha do conjunto de mistérios para rezar o Terço. */
export default function RosaryPage() {
  const weekday = fromISODate(todayISO()).getDay();
  const suggested = mysteryGroups.find((group) => group.weekdays.includes(weekday)) ?? mysteryGroups[0]!;

  return (
    <div className="space-y-6 animate-[var(--animate-fade-up)]">
      <PageHeader
        eyebrow="Terço"
        title="Rezar o Terço"
        description="Escolha os mistérios. O contador é apenas um apoio discreto — a oração não é uma pontuação."
      />

      <Card tone="brass" className="p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[0.6875rem] uppercase tracking-[0.12em] text-brass-strong dark:text-brass">
              Sugestão para hoje
            </p>
            <p className="font-display text-[1.125rem] text-ink">{suggested.name}</p>
            <p className="text-[0.8125rem] leading-relaxed text-ink-soft">{suggested.description}</p>
          </div>
          <Link
            to={`/terco/${suggested.id}`}
            className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-[0.8125rem] font-medium text-canvas transition-opacity hover:opacity-90"
          >
            Começar
            <ArrowUpRight size={14} aria-hidden />
          </Link>
        </div>
      </Card>

      <div className="grid gap-3 sm:grid-cols-2">
        {mysteryGroups.map((group) => (
          <Link key={group.id} to={`/terco/${group.id}`} className="group">
            <Card className="h-full space-y-2.5 p-4 transition-colors group-hover:border-brass/40 group-hover:bg-surface-muted/40">
              <div className="flex items-start justify-between gap-2">
                <h2 className="font-display text-[1.0625rem] text-ink">{group.name}</h2>
                {group.id === suggested.id && (
                  <Badge tone="brass">
                    <Star size={10} aria-hidden />
                    Hoje
                  </Badge>
                )}
              </div>
              <p className="text-[0.8125rem] leading-relaxed text-muted">{group.description}</p>
              <ul className="space-y-1 pt-1">
                {group.mysteries.map((mystery) => (
                  <li key={mystery.id} className="flex gap-2 text-[0.75rem] leading-snug text-ink-soft">
                    <span className={bulletClass(COLOR_TONE[group.color])} aria-hidden>
                      ·
                    </span>
                    <span className="flex-1">{mystery.title}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </Link>
        ))}
      </div>

      <p className="flex items-start gap-2 rounded-xl border border-line bg-surface-muted/40 p-3.5 text-[0.75rem] leading-relaxed text-muted">
        <CircleDashed size={14} className="mt-0.5 shrink-0 text-brass" aria-hidden />
        A indicação dos mistérios por dia da semana é um costume piedoso, não uma norma litúrgica.
        Você pode rezá-los em qualquer ordem.
      </p>
    </div>
  );
}

function bulletClass(color: string) {
  return `mt-0.5 flex size-3.5 shrink-0 items-center justify-center rounded-full border border-current text-[0.625rem] leading-none ${color}`;
}
