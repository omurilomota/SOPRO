import { Component, type ErrorInfo, type ReactNode } from 'react';

interface State {
  hasError: boolean;
  message: string;
}

/**
 * Fronteira de erro. Nunca esconde a falha com dados fictícios: mostra o
 * problema e oferece recuperação segura sem apagar os dados do usuário.
 */
export class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { hasError: false, message: '' };

  static getDerivedStateFromError(error: unknown): State {
    return {
      hasError: true,
      message: error instanceof Error ? error.message : 'Erro inesperado.',
    };
  }

  componentDidCatch(error: unknown, info: ErrorInfo): void {
    console.error('[SOPRO] Erro não tratado:', error, info.componentStack);
  }

  render(): ReactNode {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="flex min-h-dvh items-center justify-center bg-canvas px-6">
        <div className="max-w-md space-y-4 text-center">
          <h1 className="text-2xl text-ink">Algo saiu do previsto</h1>
          <p className="text-sm leading-relaxed text-muted">
            A aplicação encontrou um erro inesperado. Seus dados continuam salvos neste
            dispositivo — nada foi apagado.
          </p>
          <details className="rounded-xl border border-line bg-surface-muted p-3 text-left">
            <summary className="cursor-pointer text-xs text-muted">Detalhe técnico</summary>
            <p className="mt-2 break-words font-mono text-[0.6875rem] text-ink-soft">
              {this.state.message}
            </p>
          </details>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded-full bg-ink px-5 py-2.5 text-sm text-canvas transition-opacity hover:opacity-90"
          >
            Recarregar a aplicação
          </button>
        </div>
      </div>
    );
  }
}
