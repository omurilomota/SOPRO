import { registerSW } from 'virtual:pwa-register';

/**
 * Registro do Service Worker (PWA).
 *
 * `autoUpdate` mantém o app atualizado silenciosamente. Não prometemos
 * notificações em segundo plano: o app não depende de servidor próprio.
 */
export function registerServiceWorker(): void {
  if (typeof window === 'undefined') return;
  if (!('serviceWorker' in navigator)) return;

  try {
    registerSW({
      immediate: true,
      onRegisterError(error) {
        console.warn('[SOPRO] Service worker não registrado:', error);
      },
    });
  } catch (error) {
    console.warn('[SOPRO] PWA indisponível neste ambiente:', error);
  }
}
