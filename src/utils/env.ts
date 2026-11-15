/**
 * Acesso centralizado às variáveis de ambiente do Vite.
 *
 * Valores são lidos em tempo de build. Nada aqui contém segredos: todas as
 * variáveis `VITE_*` são públicas por definição.
 */

function readString(key: string): string {
  const value = import.meta.env[key as keyof ImportMetaEnv];
  return typeof value === 'string' ? value.trim() : '';
}

export const DEFAULT_LITURGY_API_BASE = 'https://liturgia.up.railway.app/v2';

export const env = {
  /** URL de doação. Vazio = link não é exibido. */
  donationUrl: readString('VITE_DONATION_URL'),
  liturgyApiBase: readString('VITE_LITURGIA_API_BASE') || DEFAULT_LITURGY_API_BASE,
  liturgyCacheTtlHours: Number(readString('VITE_LITURGIA_CACHE_TTL_HOURS') || '6'),
};

export const LITURGY_API_DOCS = 'https://github.com/Dancrf/liturgia-diaria';
