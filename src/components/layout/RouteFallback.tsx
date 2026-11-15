import { Skeleton } from '../ui/Skeleton';

export function RouteFallback() {
  return (
    <div className="space-y-5 py-2" aria-busy="true" aria-label="Carregando">
      <div className="space-y-2">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-8 w-2/5" />
        <Skeleton className="h-4 w-3/5" />
      </div>
      <Skeleton className="h-40 w-full rounded-[var(--radius-card)]" />
      <div className="grid gap-4 sm:grid-cols-2">
        <Skeleton className="h-28 rounded-[var(--radius-card)]" />
        <Skeleton className="h-28 rounded-[var(--radius-card)]" />
      </div>
    </div>
  );
}
