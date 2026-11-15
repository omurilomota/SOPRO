import 'fake-indexeddb/auto';

// Ambiente jsdom: `matchMedia` não existe por padrão.
if (!window.matchMedia) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      addListener: () => undefined,
      removeListener: () => undefined,
      dispatchEvent: () => false,
    }),
  });
}

// Evita que o jsdom reclame de navegação não implementada.
if (!window.scrollTo) {
  Object.defineProperty(window, 'scrollTo', { value: () => undefined, writable: true });
}
