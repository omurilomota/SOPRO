import { render, type RenderResult } from '@testing-library/react';
import type { ReactElement } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '../app/providers/ThemeProvider';
import { ToastProvider } from '../components/ui/Toast';

/**
 * Renderiza uma página em isolamento, com os providers reais (tema e toasts)
 * e um roteador em memória. Usado para detectar erros de execução nas telas.
 */
export function renderPage(
  element: ReactElement,
  options: { path?: string; initialEntries?: string[] } = {},
): RenderResult {
  const path = options.path ?? '*';

  return render(
    <ThemeProvider>
      <ToastProvider>
        <MemoryRouter initialEntries={options.initialEntries ?? ['/']}>
          <Routes>
            <Route path={path} element={element} />
          </Routes>
        </MemoryRouter>
      </ToastProvider>
    </ThemeProvider>,
  );
}
