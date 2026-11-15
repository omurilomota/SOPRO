import { cn } from '../../utils/cn';

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn('animate-pulse rounded-[2px] bg-paper-2', className)}
      aria-hidden
    />
  );
}

export function ReadingSkeleton() {
  return (
    <div className="space-y-3" aria-busy="true" aria-label="Carregando liturgia">
      <Skeleton className="h-3 w-24" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-11/12" />
      <Skeleton className="h-4 w-4/5" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/5" />
    </div>
  );
}
