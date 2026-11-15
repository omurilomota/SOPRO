import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
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
          className="inline-flex items-center gap-1.5 text-[0.875rem] text-muted hover:text-rubric"
        >
          <ArrowLeft size={13} aria-hidden /> Terço
        </Link>
        <EmptyState
          label="Mistérios não encontrados"
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
    <div className="mx-auto max-w-2xl space-y-5 animate-[var(--animate-fade)]">
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={leave}
          className="inline-flex items-center gap-1.5 text-[0.875rem] text-muted transition-colors hover:text-rubric"
        >
          <ArrowLeft size={13} aria-hidden /> {group.name}
        </button>
        <button
          type="button"
          onClick={() => setFocusMode((value) => !value)}
          className="border-b border-rule-strong pb-px text-[0.75rem] text-muted transition-colors hover:border-rubric hover:text-rubric"
          aria-pressed={focusMode}
        >
          {focusMode ? 'Sair do modo leitura' : 'Modo leitura'}
        </button>
      </div>

      <div className="space-y-2">
        <div className="h-px overflow-hidden bg-rule" aria-hidden>
          <div
            className="h-full bg-rubric transition-[width] duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-right text-[0.75rem] tabular-nums text-muted">
          Etapa {stepIndex + 1} de {steps.length}
        </p>
      </div>

      <section
        className={cn('border-t border-rule pt-5', focusMode && 'pt-8')}
      >
        {step.mystery && (
          <p className="rubric mb-1.5">{step.mystery.scripture}</p>
        )}
        <h1 className={cn('text-ink', focusMode ? 'text-[1.5rem]' : 'text-[1.375rem]')}>
          {step.title}
        </h1>

        {step.text && (
          <div
            className={cn(
              'mt-3 whitespace-pre-line font-display leading-[1.85] text-ink',
              focusMode ? 'text-[1.25rem]' : 'text-[1.0625rem]',
            )}
          >
            {step.text}
          </div>
        )}

        {isBeadStep && (
          <div className="mt-6 space-y-4 border-t border-rule pt-5">
            <div
              className="flex items-center justify-center gap-2"
              role="img"
              aria-label={`${beads} de ${totalBeads} Ave-Marias rezadas`}
            >
              {Array.from({ length: totalBeads }, (_, index) => (
                <span
                  key={index}
                  className={cn(
                    'size-2 rounded-full transition-colors duration-300',
                    index < beads ? 'bg-rubric' : 'bg-rule-strong/70',
                  )}
                />
              ))}
            </div>
            <p className="text-center text-[0.875rem] text-muted">
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
                'flex w-full items-center justify-center gap-2 border py-3 text-[0.875rem] font-medium transition-colors',
                beadsComplete
                  ? 'border-ink bg-ink text-paper hover:bg-rubric'
                  : 'border-rule-strong text-ink hover:border-ink',
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
          variant="quiet"
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

      <p className="pb-2 text-center text-[0.75rem] leading-relaxed text-muted">
        Não há registro de pontuação. Se precisar parar, pare — e retome quando puder.
      </p>
    </div>
  );
}
