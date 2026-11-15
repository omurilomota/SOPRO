/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

interface ImportMetaEnv {
  readonly VITE_DONATION_URL?: string;
  readonly VITE_LITURGIA_API_BASE?: string;
  readonly VITE_LITURGIA_CACHE_TTL_HOURS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
