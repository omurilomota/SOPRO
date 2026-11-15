import { X } from 'lucide-react';
import { useEffect, useId, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../utils/cn';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: 'md' | 'lg';
}

export function Modal({ open, onClose, title, description, children, footer, size = 'md' }: ModalProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousFocus = document.activeElement as HTMLElement | null;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', onKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const firstFocusable = dialogRef.current?.querySelector<HTMLElement>(
      'input, textarea, select, button, [href]',
    );
    firstFocusable?.focus();

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = originalOverflow;
      previousFocus?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <div
        className="absolute inset-0 bg-ink/20 animate-[var(--animate-fade)] dark:bg-black/60"
        onClick={onClose}
        aria-hidden
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={cn(
          'relative flex max-h-[92dvh] w-full flex-col overflow-hidden border-t-2 border-rubric bg-plate shadow-[0_-1px_0_rgba(0,0,0,0.04)]',
          'animate-[var(--animate-rise)] sm:border sm:border-rule sm:border-t-2 sm:border-t-rubric',
          size === 'lg' ? 'sm:max-w-2xl' : 'sm:max-w-lg',
        )}
      >
        <header className="flex items-start justify-between gap-4 px-5 pb-3 pt-4 sm:px-6">
          <div className="min-w-0">
            <p className="rubric">Formulário</p>
            <h2 id={titleId} className="mt-0.5 text-[1.25rem] leading-tight text-ink">
              {title}
            </h2>
            {description && <p className="mt-1 text-[0.75rem] text-muted">{description}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="-mr-1 -mt-0.5 p-1.5 text-muted transition-colors hover:text-rubric"
          >
            <X size={15} aria-hidden />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto border-t border-rule px-5 py-4 sm:px-6">{children}</div>

        {footer && (
          <footer className="flex items-center justify-end gap-2 border-t border-rule bg-paper-2/60 px-5 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-6">
            {footer}
          </footer>
        )}
      </div>
    </div>,
    document.body,
  );
}
