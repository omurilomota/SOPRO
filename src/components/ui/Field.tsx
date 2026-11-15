import {
  useId,
  type InputHTMLAttributes,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
  type ReactNode,
} from 'react';
import { cn } from '../../utils/cn';

/**
 * Campos de formulário: sublinhado, não caixa.
 * O foco engrossa o filete em rubrica, como uma anotação à margem.
 */
const control =
  'w-full rounded-none border-0 border-b border-rule-strong bg-transparent px-0 py-2 text-[0.9375rem] ' +
  'text-ink placeholder:text-muted/60 transition-colors ' +
  'focus:border-rubric focus:outline-none disabled:opacity-50';

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

  return (
    <div className={cn('space-y-1', className)}>
      <label
        htmlFor={id}
        className="flex items-baseline justify-between gap-2 text-[0.75rem] font-medium tracking-[0.02em] text-ink-2"
      >
        <span>{label}</span>
        {optional && <span className="text-[0.6875rem] font-normal text-muted">opcional</span>}
      </label>
      {children(id)}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-[0.75rem] text-rubric">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-[0.75rem] leading-relaxed text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export function TextInput({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(control, className)} {...props} />;
}

export function TextArea({
  className,
  rows = 4,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      rows={rows}
      className={cn(control, 'resize-y leading-relaxed', className)}
      {...props}
    />
  );
}

export function Select({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(control, 'cursor-pointer appearance-none bg-no-repeat pr-6', className)}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%237c7267' stroke-width='2' stroke-linecap='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
        backgroundPosition: 'right 2px center',
      }}
      {...props}
    >
      {children}
    </select>
  );
}

/** Controle segmentado: filetes, sem pílula de fundo. */
export function Segmented<T extends string>({
  options,
  value,
  onChange,
  label,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  label: string;
}) {
  return (
    <div
      className="flex overflow-hidden rounded-[2px] border border-rule-strong"
      role="group"
      aria-label={label}
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          aria-pressed={value === option.value}
          className={cn(
            'px-3 py-1.5 text-[0.75rem] transition-colors [&+&]:border-l [&+&]:border-rule-strong',
            value === option.value
              ? 'bg-ink text-paper'
              : 'text-ink-2 hover:bg-paper-2',
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
