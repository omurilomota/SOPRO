import { RefreshCw } from 'lucide-react';
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

  return (
    <EmptyState
      label={title}
      description={message}
      action={
        <Button variant="outline" size="sm" onClick={onRetry}>
          <RefreshCw size={13} aria-hidden />
          Tentar novamente
        </Button>
      }
    />
  );
}

export function LiturgyLoading() {
  return (
    <div className="space-y-5">
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
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-y border-rule bg-paper-2/60 px-1 py-2 text-[0.75rem] leading-relaxed text-ink-2">
      <span className="flex-1">{message}</span>
      <button
        type="button"
        onClick={onRetry}
        className="inline-flex items-center gap-1 text-[0.75rem] font-medium text-rubric hover:underline"
      >
        <RefreshCw size={12} aria-hidden />
        Atualizar
      </button>
    </div>
  );
}
