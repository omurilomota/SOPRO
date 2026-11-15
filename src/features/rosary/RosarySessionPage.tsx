import { ArrowLeft, ArrowRight, Check, RotateCcw } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { EmptyState } from '../../components/ui/EmptyState';
import { getMysteryGroup } from '../../data/rosary';
import type { MysteryGroupId } from '../../types/rosary';
import { cn } from '../../utils/cn';
import { buildRosarySteps } from './steps';

/**
 * Experiência guiada do Terço.
 *
 * - Uma etapa por tela, leitura confortável.
 * - Nas dezenas, um contador discreto de Ave-Marias (toque para avançar).
 * - O progresso vive só na sessão: sair recomeça, porque não existe
 *   "streak", pontuação ou competição a preservar.
 */
export default function RosarySessionPage() {
  const { groupId } = useParams<{ groupId: string }>();
  const navigate = useNavigate();
  const group = groupId ? getMysteryGroup(groupId as MysteryGroupId) : undefined;

  const steps = useMemo(() => (group ? buildRosarySteps(group) : []), [group]);

  const [stepIndex, setStepIndex] = useState(0);
  const [beads, setBeads] = useState(0);
  const [focusMode, setFocusMode] = useState(false);

  const step = steps[stepIndex];
  const progress = steps.length > 0 ? ((stepIndex + 1) / steps.length) * 100 : 0;

  useEffect(() => {
    setBeads(0);
  }, [stepIndex]);

  useEffect(() => {
    if (group) document.title = `${group.name} · Terço · SOPRO`;
  }, [group]);

  if (!group || !step) {
    return (
      <div className="space-y-4">
        <Link
          to="/terco"
          className="inline-flex items-center gap-1.5 text-[0.8125rem] text-muted hover:text-ink"
        >
          <ArrowLeft size={14} aria-hidden /> Terço
        </Link>
        <EmptyState
          icon={RotateCcw}
          title="Mistérios não encontrados"
          description="Escolha um dos conjuntos de mistérios para começar."
        />
      </div>
    );
  }

  const totalBeads = step.beads ?? 0;
  const isBeadStep = totalBeads > 0;
  const beadsComplete = !isBeadStep || beads >= totalBeads;
  const isLast = stepIndex === steps.length - 1;

  const advance = () => {
    if (!beadsComplete) {
      setBeads((value) => Math.min(totalBeads, value + 1));
      return;
    }
    if (!isLast) setStepIndex((index) => index + 1);
  };

  const previous = () => {
    if (isBeadStep && beads > 0) {
      setBeads((value) => value - 1);
      return;
    }
    if (stepIndex > 0) setStepIndex((index) => index - 1);
  };

  const leave = () => {
    if (stepIndex > 0 && !window.confirm('Sair do Terço? O progresso desta sessão será perdido.')) {
      return;
    }
    navigate('/terco');
  };

  return (
    <div className="mx-auto max-w-2xl space-y-5 animate-[var(--animate-fade-in)]">
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={leave}
          className="inline-flex items-center gap-1.5 text-[0.8125rem] text-muted transition-colors hover:text-ink"
        >
          <ArrowLeft size={14} aria-hidden /> {group.name}
        </button>
        <button
          type="button"
          onClick={() => setFocusMode((value) => !value)}
          className="rounded-full border border-line px-2.5 py-1 text-[0.6875rem] text-muted transition-colors hover:text-ink"
          aria-pressed={focusMode}
        >
          {focusMode ? 'Sair do modo leitura' : 'Modo leitura'}
        </button>
      </div>

      <div className="space-y-2">
        <div className="h-1 overflow-hidden rounded-full bg-surface-muted" aria-hidden>
          <div
            className="h-full rounded-full bg-brass/70 transition-[width] duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-right text-[0.6875rem] tabular-nums text-muted">
          Etapa {stepIndex + 1} de {steps.length}
        </p>
      </div>

      <section
        className={cn(
          'rounded-[var(--radius-card)] border border-line bg-surface p-5 shadow-[var(--shadow-soft)] sm:p-7',
          focusMode && 'px-4 py-8 sm:px-8',
        )}
      >
        {step.mystery && (
          <p className="mb-2 text-[0.6875rem] uppercase tracking-[0.14em] text-brass">
            {step.mystery.scripture}
          </p>
        )}
        <h1 className={cn('text-ink', focusMode ? 'text-[1.5rem]' : 'text-[1.375rem]')}>
          {step.title}
        </h1>

        {step.text && (
          <div
            className={cn(
              'mt-4 whitespace-pre-line font-display leading-[1.85] text-ink-soft',
              focusMode ? 'text-[1.25rem]' : 'text-[1.0625rem]',
            )}
          >
            {step.text}
          </div>
        )}

        {isBeadStep && (
          <div className="mt-7 space-y-4 border-t border-line pt-5">
            <div
              className="flex items-center justify-center gap-2"
              role="img"
              aria-label={`${beads} de ${totalBeads} Ave-Marias rezadas`}
            >
              {Array.from({ length: totalBeads }, (_, index) => (
                <span
                  key={index}
                  className={cn(
                    'size-2.5 rounded-full transition-colors duration-300',
                    index < beads ? 'bg-brass' : 'bg-line-strong/60',
                  )}
                />
              ))}
            </div>
            <p className="text-center text-[0.8125rem] text-muted">
              {beads === 0
                ? `Toque a cada Ave-Maria (${totalBeads})`
                : beads >= totalBeads
                  ? 'Dezena concluída. Siga quando quiser.'
                  : `${beads} de ${totalBeads}`}
            </p>
            <button
              type="button"
              onClick={advance}
              className={cn(
                'flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-3.5 text-[0.875rem] font-medium transition-colors',
                beadsComplete
                  ? 'border-brass/30 bg-brass-soft text-brass-strong dark:text-brass'
                  : 'border-line bg-surface-muted text-ink-soft hover:border-brass/40',
              )}
            >
              {beadsComplete ? 'Continuar' : 'Ave-Maria'}
              {beadsComplete ? (
                <ArrowRight size={15} aria-hidden />
              ) : (
                <Check size={15} aria-hidden />
              )}
            </button>
          </div>
        )}
      </section>

      <div className="flex items-center justify-between gap-3 pb-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={previous}
          disabled={stepIndex === 0 && beads === 0}
        >
          <ArrowLeft size={14} aria-hidden />
          Voltar
        </Button>

        {isLast && beadsComplete ? (
          <Button onClick={leave} size="sm">
            <Check size={14} aria-hidden />
            Encerrar
          </Button>
        ) : (
          <Button onClick={advance} size="sm">
            {isBeadStep && !beadsComplete ? 'Avançar conta' : 'Próxima etapa'}
            <ArrowRight size={14} aria-hidden />
          </Button>
        )}
      </div>

      <p className="pb-2 text-center text-[0.6875rem] leading-relaxed text-muted">
        Não há registro de pontuação. Se precisar parar, pare — e retome quando puder.
      </p>
    </div>
  );
}
