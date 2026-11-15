import { ArrowLeft, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { EmptyState } from '../../components/ui/EmptyState';
import { Meta, Reference, Rubric } from '../../components/ui/Marks';
import { getTrackById } from '../../data/formations';
import { cn } from '../../utils/cn';

export default function FormationTrackPage() {
  const { trackId } = useParams<{ trackId: string }>();
  const track = trackId ? getTrackById(trackId) : undefined;
  const [openLesson, setOpenLesson] = useState<string | null>(track?.lessons[0]?.id ?? null);

  if (!track) {
    return (
      <div className="space-y-4">
        <Link
          to="/formacoes"
          className="inline-flex items-center gap-1.5 text-[0.8125rem] text-muted transition-colors hover:text-rubric"
        >
          <ArrowLeft size={13} aria-hidden /> Formações
        </Link>
        <EmptyState
          label="Trilha não encontrada"
          description="Escolha uma das trilhas disponíveis na página de formações."
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-[var(--animate-fade)]">
      <Link
        to="/formacoes"
        className="inline-flex items-center gap-1.5 text-[0.8125rem] text-muted transition-colors hover:text-rubric"
      >
        <ArrowLeft size={13} aria-hidden /> Formações
      </Link>

      <header className="space-y-2">
        <p className="rubric">
          Trilha · {track.lessons.length} encontros
        </p>
        <h1 className="text-[1.875rem] leading-tight text-ink sm:text-[2.25rem]">{track.title}</h1>
        <div className="h-px bg-rule" />
        <p className="max-w-[58ch] text-[0.875rem] leading-relaxed text-muted">{track.description}</p>
      </header>

      <ol className="border-t border-rule">
        {track.lessons.map((lesson, index) => {
          const open = openLesson === lesson.id;
          return (
            <li key={lesson.id} className="border-b border-rule">
              <button
                type="button"
                onClick={() => setOpenLesson(open ? null : lesson.id)}
                aria-expanded={open}
                className="flex w-full items-baseline gap-3.5 py-3 text-left"
              >
                <span className="numeral w-6 shrink-0">{String(index + 1).padStart(2, '0')}</span>
                <span
                  className={cn(
                    'flex-1 font-display text-[1.0625rem] leading-snug transition-colors',
                    open ? 'text-rubric' : 'text-ink',
                  )}
                >
                  {lesson.title}
                </span>
                <ChevronDown
                  size={14}
                  className={cn('shrink-0 translate-y-1 text-muted transition-transform', open && 'rotate-180')}
                  aria-hidden
                />
              </button>

              {open && (
                <div className="space-y-4 pb-5 pl-[2.4rem] pr-1">
                  <p className="reading">{lesson.summary}</p>

                  {lesson.scripture.length > 0 && (
                    <div>
                      <Rubric className="text-[0.625rem]">Escritura</Rubric>
                      <p className="mt-1">
                        {lesson.scripture.map((reference, i) => (
                          <span key={reference}>
                            {i > 0 && <span className="mx-1.5 text-rule-strong">·</span>}
                            <Reference>{reference}</Reference>
                          </span>
                        ))}
                      </p>
                    </div>
                  )}

                  {lesson.magisterium.length > 0 && (
                    <div>
                      <Rubric className="text-[0.625rem]">Magistério e referências</Rubric>
                      <ul className="mt-1 space-y-0.5">
                        {lesson.magisterium.map((reference) => (
                          <li key={reference} className="text-[0.8125rem] leading-relaxed text-muted">
                            {reference}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {lesson.practice.length > 0 && (
                    <div className="border-l-2 border-rubric/40 pl-3.5">
                      <p className="rubric text-[0.625rem]">Para viver esta semana</p>
                      <ul className="mt-1 space-y-1">
                        {lesson.practice.map((item) => (
                          <li key={item} className="flex gap-2 text-[0.8125rem] leading-relaxed text-ink-2">
                            <span className="text-rubric" aria-hidden>
                              —
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ol>

      <div className="flex flex-wrap items-baseline gap-x-3 border-t border-rule pt-3">
        <Meta>Nota</Meta>
        <p className="max-w-[62ch] text-[0.75rem] leading-relaxed text-muted">
          Síntese escrita para o SOPRO. Para aprofundar, consulte as referências indicadas e os
          documentos oficiais. Em caso de dúvida doutrinal, procure o seu pároco.
        </p>
      </div>
    </div>
  );
}
