import { useId, type InputHTMLAttributes, type SelectHTMLAttributes, type TextareaHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

const controlBase =
  'w-full rounded-xl border border-line-strong bg-surface px-3.5 py-2.5 text-sm text-ink ' +
  'placeholder:text-muted/70 transition-colors hover:border-brass/40 ' +
  'focus:border-brass focus:outline-none focus:ring-2 focus:ring-brass/15 disabled:opacity-60';

interface FieldShellProps {
  label: string;
  hint?: string;
  error?: string;
  children: (id: string) => ReactNode;
  className?: string;
  optional?: boolean;
}

export function Field({ label, hint, error, children, className, optional }: FieldShellProps) {
  const id = useId();
  const describedBy = [hint ? `${id}-hint` : null, error ? `${id}-error` : null]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={cn('space-y-1.5', className)}>
      <label htmlFor={id} className="flex items-baseline justify-between gap-2 text-[0.8125rem] font-medium text-ink-soft">
        <span>{label}</span>
        {optional && <span className="text-[0.6875rem] font-normal text-muted">opcional</span>}
      </label>
      {children(id)}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-xs text-liturgy-red">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-xs leading-relaxed text-muted">
          {hint}
        </p>
      ) : null}
      {error && describedBy.includes(`${id}-hint`) ? null : null}
    </div>
  );
}

export function TextInput({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(controlBase, className)} {...props} />;
}

export function TextArea({ className, rows = 4, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea rows={rows} className={cn(controlBase, 'resize-y leading-relaxed', className)} {...props} />;
}

export function Select({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={cn(controlBase, 'cursor-pointer appearance-none pr-8 bg-[length:16px] bg-[right_0.75rem_center] bg-no-repeat', className)}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%237d746a' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
      }}
      {...props}
    >
      {children}
    </select>
  );
}
