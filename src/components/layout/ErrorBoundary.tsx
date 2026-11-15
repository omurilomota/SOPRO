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
      <div className="flex min-h-dvh items-center justify-center bg-paper px-6">
        <div className="w-full max-w-md space-y-3.5">
          <p className="rubric">Erro inesperado</p>
          <h1 className="text-[1.75rem] leading-tight text-ink">Algo saiu do previsto</h1>
          <div className="h-px bg-rule" />
          <p className="text-[0.875rem] leading-relaxed text-muted">
            A aplicação encontrou um erro inesperado. Seus dados continuam salvos neste
            dispositivo — nada foi apagado.
          </p>
          <details className="border-y border-rule py-2">
            <summary className="cursor-pointer text-[0.8125rem] text-muted">Detalhe técnico</summary>
            <p className="mt-2 break-words font-mono text-[0.75rem] leading-relaxed text-ink-2">
              {this.state.message}
            </p>
          </details>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded-[2px] bg-ink px-4 py-2 text-[0.875rem] font-medium text-paper transition-colors hover:bg-rubric"
          >
            Recarregar a aplicação
          </button>
        </div>
      </div>
    );
  }
}
