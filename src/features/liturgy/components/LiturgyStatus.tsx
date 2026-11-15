import { CircleAlert, RefreshCw, WifiOff } from 'lucide-react';
import type { LiturgyError } from '../../../types/liturgy';
import { describeLiturgyError } from '../../../services/liturgy';
import { Button } from '../../../components/ui/Button';
import { EmptyState } from '../../../components/ui/EmptyState';
import { ReadingSkeleton } from '../../../components/ui/Skeleton';

export function LiturgyErrorState({
  error,
  onRetry,
}: {
  error: LiturgyError;
  onRetry: () => void;
}) {
  const { title, message } = describeLiturgyError(error);
  const Icon = error.kind === 'offline' ? WifiOff : CircleAlert;

  return (
    <div className="rounded-[var(--radius-card)] border border-line bg-surface">
      <EmptyState
        icon={Icon}
        title={title}
        description={message}
        action={
          <Button variant="secondary" size="sm" onClick={onRetry}>
            <RefreshCw size={14} aria-hidden />
            Tentar novamente
          </Button>
        }
      />
    </div>
  );
}

export function LiturgyLoading() {
  return (
    <div className="space-y-5 rounded-[var(--radius-card)] border border-line bg-surface p-5 sm:p-6">
      <div className="space-y-2">
        <div className="h-3 w-24 animate-pulse rounded bg-surface-muted" />
        <div className="h-7 w-2/3 animate-pulse rounded bg-surface-muted" />
      </div>
      <ReadingSkeleton />
      <ReadingSkeleton />
    </div>
  );
}

/** Aviso não bloqueante quando exibimos cache desatualizado. */
export function StaleNotice({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 rounded-xl border border-brass/25 bg-brass-soft/60 px-3.5 py-2.5 text-[0.75rem] leading-relaxed text-ink-soft dark:bg-brass-soft/30">
      <span className="flex-1">{message}</span>
      <button
        type="button"
        onClick={onRetry}
        className="inline-flex items-center gap-1 font-medium text-brass-strong hover:underline dark:text-brass"
      >
        <RefreshCw size={12} aria-hidden />
        Atualizar
      </button>
    </div>
  );
}
