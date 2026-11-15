import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
  compact?: boolean;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
  compact = false,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-[var(--radius-card)] border border-dashed border-line-strong/70 bg-surface/60 text-center',
        compact ? 'gap-2 px-5 py-8' : 'gap-3 px-6 py-12',
        className,
      )}
    >
      <span className="flex size-10 items-center justify-center rounded-full bg-surface-muted text-brass">
        <Icon size={19} strokeWidth={1.6} aria-hidden />
      </span>
      <div className="max-w-sm space-y-1">
        <p className="font-display text-base text-ink">{title}</p>
        <p className="text-[0.8125rem] leading-relaxed text-muted">{description}</p>
      </div>
      {action && <div className="pt-1">{action}</div>}
    </div>
  );
}
