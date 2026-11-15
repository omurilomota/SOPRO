import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import { cn } from '../../utils/cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 ' +
  'disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 ' +
  'focus-visible:outline-brass active:scale-[0.985] select-none';

const variants: Record<Variant, string> = {
  primary:
    'bg-ink text-canvas hover:bg-ink/90 dark:bg-ink dark:text-canvas shadow-[0_1px_2px_rgb(35_32_27/0.12)]',
  secondary:
    'border border-line-strong bg-surface text-ink hover:bg-surface-muted hover:border-brass/40',
  ghost: 'text-ink-soft hover:bg-surface-muted hover:text-ink',
  danger: 'border border-liturgy-red/30 text-liturgy-red hover:bg-liturgy-red/8',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-3.5 text-[0.8125rem]',
  md: 'h-11 px-5 text-sm',
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = 'primary', size = 'md', type = 'button', ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
});

interface ButtonLinkProps extends LinkProps {
  variant?: Variant;
  size?: Size;
}

export function ButtonLink({
  className,
  variant = 'secondary',
  size = 'md',
  ...props
}: ButtonLinkProps) {
  return <Link className={cn(base, variants[variant], sizes[size], className)} {...props} />;
}
