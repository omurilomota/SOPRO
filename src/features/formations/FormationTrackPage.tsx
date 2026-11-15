import { ArrowLeft, BookOpen, ChevronDown, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';
import { EmptyState } from '../../components/ui/EmptyState';
import { getTrackById } from '../../data/formations';
import { cn } from '../../utils/cn';

export default function FormationTrackPage() {
  const { trackId } = useParams<{ trackId: string }>();
  const track = trackId ? getTrackById(trackId) : undefined;
  const [openLesson, setOpenLesson] = useState<string | null>(track?.lessons[0]?.id ?? null);

  if (!track) {
    return (
      <div className="space-y-4">
        <Link to="/formacoes" className="inline-flex items-center gap-1.5 text-[0.8125rem] text-muted hover:text-ink">
          <ArrowLeft size={14} aria-hidden /> Formações
        </Link>
        <EmptyState
          icon={BookOpen}
          title="Trilha não encontrada"
          description="Escolha uma das trilhas disponíveis na página de formações."
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-[var(--animate-fade-up)]">
      <Link to="/formacoes" className="inline-flex items-center gap-1.5 text-[0.8125rem] text-muted hover:text-ink">
        <ArrowLeft size={14} aria-hidden /> Formações
      </Link>

      <header className="space-y-2">
        <Badge tone="brass">{track.lessons.length} encontros</Badge>
        <h1 className="text-[1.75rem] leading-tight tracking-tight text-ink">{track.title}</h1>
        <p className="max-w-prose text-sm leading-relaxed text-muted">{track.description}</p>
      </header>

      <ul className="space-y-2.5">
        {track.lessons.map((lesson, index) => {
          const open = openLesson === lesson.id;
          return (
            <li key={lesson.id}>
              <Card className="overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenLesson(open ? null : lesson.id)}
                  aria-expanded={open}
                  className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
                >
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-surface-muted text-[0.6875rem] font-medium text-brass">
                    {index + 1}
                  </span>
                  <span className="flex-1 font-display text-[1rem] leading-snug text-ink">
                    {lesson.title}
                  </span>
                  <ChevronDown
                    size={15}
                    className={cn('shrink-0 text-muted transition-transform', open && 'rotate-180')}
                    aria-hidden
                  />
                </button>

                {open && (
                  <div className="space-y-4 border-t border-line px-4 py-4">
                    <p className="text-[0.875rem] leading-relaxed text-ink-soft">{lesson.summary}</p>

                    {lesson.scripture.length > 0 && (
                      <div>
                        <p className="mb-1.5 text-[0.625rem] uppercase tracking-[0.12em] text-muted">
                          Escritura
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {lesson.scripture.map((reference) => (
                            <Badge key={reference}>{reference}</Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {lesson.magisterium.length > 0 && (
                      <div>
                        <p className="mb-1.5 text-[0.625rem] uppercase tracking-[0.12em] text-muted">
                          Magistério e referências
                        </p>
                        <ul className="space-y-0.5 text-[0.8125rem] text-ink-soft">
                          {lesson.magisterium.map((reference) => (
                            <li key={reference}>{reference}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {lesson.practice.length > 0 && (
                      <div className="rounded-xl border border-brass/20 bg-brass-soft/50 p-3.5 dark:bg-brass-soft/25">
                        <p className="mb-1 flex items-center gap-1.5 text-[0.625rem] uppercase tracking-[0.12em] text-brass-strong dark:text-brass">
                          <Sparkles size={10} aria-hidden />
                          Para viver esta semana
                        </p>
                        <ul className="space-y-1 text-[0.8125rem] leading-relaxed text-ink-soft">
                          {lesson.practice.map((item) => (
                            <li key={item} className="flex gap-1.5">
                              <span className="text-brass" aria-hidden>
                                ·
                              </span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </Card>
            </li>
          );
        })}
      </ul>

      <p className="text-[0.75rem] leading-relaxed text-muted">
        Este material é uma síntese escrita para o SOPRO. Para aprofundar, consulte as referências
        indicadas e os documentos oficiais. Em caso de dúvida doutrinal, procure o seu pároco.
      </p>
    </div>
  );
}
