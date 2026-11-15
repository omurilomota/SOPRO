import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function PageHeader({ eyebrow, title, description, action, className }: PageHeaderProps) {
  return (
    <header className={cn('flex flex-wrap items-end justify-between gap-4 pb-1', className)}>
      <div className="min-w-0 space-y-1">
        {eyebrow && (
          <p className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-brass">
            {eyebrow}
          </p>
        )}
        <h1 className="text-[1.75rem] leading-tight tracking-tight text-ink sm:text-[2rem]">
          {title}
        </h1>
        {description && (
          <p className="max-w-prose text-sm leading-relaxed text-muted">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </header>
  );
}
