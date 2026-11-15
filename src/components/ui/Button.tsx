import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import { cn } from '../../utils/cn';

type Variant = 'solid' | 'outline' | 'quiet' | 'danger';
type Size = 'sm' | 'md';

/**
 * Botões do sistema "Missal": cantos quase retos, sem pílulas.
 * `solid` é tinta densa; `outline` é um filete; `quiet` é só texto com filete
 * inferior no hover. Nada de sombras.
 */
const base =
  'inline-flex items-center justify-center gap-1.5 rounded-[2px] text-[0.875rem] font-medium ' +
  'transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-45 ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2';

const variants: Record<Variant, string> = {
  solid: 'bg-ink text-paper hover:bg-rubric',
  outline: 'border border-rule-strong bg-transparent text-ink hover:border-ink hover:bg-paper-2',
  quiet: 'text-ink-2 hover:text-rubric',
  danger: 'border border-rubric/40 text-rubric hover:bg-rubric-wash',
};

const sizes: Record<Size, string> = {
  sm: 'h-8 px-3',
  md: 'h-10 px-4',
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = 'solid', size = 'md', type = 'button', ...props },
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

export function ButtonLink({ className, variant = 'outline', size = 'md', ...props }: ButtonLinkProps) {
  return <Link className={cn(base, variants[variant], sizes[size], className)} {...props} />;
}

/** Link editorial: texto com filete inferior. Não parece botão. */
export function TextLink({
  to,
  children,
  className,
}: {
  to: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      to={to}
      className={cn(
        'inline-flex items-center gap-1 text-[0.875rem] text-ink-2 underline decoration-rule-strong decoration-1 underline-offset-[3px] transition-colors hover:text-rubric hover:decoration-rubric/50',
        className,
      )}
    >
      {children}
    </Link>
  );
}
