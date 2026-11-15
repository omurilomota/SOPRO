import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './providers/ThemeProvider';
import { ToastProvider } from '../components/ui/Toast';
import { ErrorBoundary } from '../components/layout/ErrorBoundary';
import { router } from './router/routes';

export function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <ToastProvider>
          <RouterProvider router={router} />
        </ToastProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
