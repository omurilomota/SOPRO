import { Skeleton } from '../ui/Skeleton';

/**
 * Placeholder de rota em carregamento.
 * Linhas de texto e filetes — nada de blocos de cartão, que não existem mais
 * no sistema visual.
 */
export function RouteFallback() {
  return (
    <div className="space-y-6 py-2" aria-busy="true" aria-label="Carregando">
      <div className="space-y-2">
        <Skeleton className="h-2.5 w-24" />
        <Skeleton className="h-7 w-2/5" />
        <div className="h-px bg-rule" />
        <Skeleton className="h-3.5 w-3/5" />
      </div>
      <div className="space-y-3">
        <Skeleton className="h-3.5 w-full" />
        <Skeleton className="h-3.5 w-11/12" />
        <Skeleton className="h-3.5 w-4/5" />
      </div>
      <div className="space-y-3 border-t border-rule pt-4">
        <Skeleton className="h-3.5 w-full" />
        <Skeleton className="h-3.5 w-3/4" />
      </div>
    </div>
  );
}
