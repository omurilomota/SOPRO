import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  tone?: 'default' | 'muted' | 'brass';
}

export function Card({ className, tone = 'default', ...props }: CardProps) {
  const tones = {
    default: 'bg-surface border-line',
    muted: 'bg-surface-muted border-line',
    brass: 'bg-brass-soft border-brass/25',
  } as const;

  return (
    <div
      className={cn('rounded-[var(--radius-card)] border shadow-[var(--shadow-soft)]', tones[tone], className)}
      {...props}
    />
  );
}

interface SectionProps {
  title?: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  id?: string;
}

export function Section({ title, description, action, children, className, id }: SectionProps) {
  return (
    <section id={id} className={cn('space-y-3', className)} aria-label={title}>
      {(title || action) && (
        <header className="flex items-end justify-between gap-4">
          <div className="min-w-0">
            {title && (
              <h2 className="text-lg tracking-tight text-ink sm:text-xl">{title}</h2>
            )}
            {description && (
              <p className="mt-0.5 text-[0.8125rem] leading-relaxed text-muted">{description}</p>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </header>
      )}
      {children}
    </section>
  );
}
