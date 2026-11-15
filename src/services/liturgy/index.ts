import type { ISODate } from '../../types/common';
import { LiturgyError, type Liturgy, type LiturgyProvider } from '../../types/liturgy';
import { env } from '../../utils/env';
import { isCacheFresh, readCachedLiturgy, writeCachedLiturgy } from './cache';
import { DancrfLiturgyProvider } from './provider-dancrf';

/**
 * Serviço de liturgia — camada de integração independente do frontend.
 *
 * Estratégia: cache primeiro para consulta offline imediata, rede em seguida.
 * - quando o cache está "fresco", devolvemos o cache e revalidamos depois;
 * - quando falha a rede, devolvemos o cache marcado como `cache` (com aviso na UI);
 * - nunca inventamos dados: se não há cache nem rede, propagamos o erro.
 */

export interface LiturgyResult {
  liturgy: Liturgy;
  fromCache: boolean;
  /** Erro de atualização ocorrido apesar de termos cache utilizável. */
  staleError: LiturgyError | null;
}

let providerInstance: LiturgyProvider = new DancrfLiturgyProvider();

/** Permite injetar outro provedor (testes ou backend futuro). */
export function setLiturgyProvider(provider: LiturgyProvider): void {
  providerInstance = provider;
}

export function getLiturgyProvider(): LiturgyProvider {
  return providerInstance;
}

export async function getLiturgy(date: ISODate, options: { force?: boolean } = {}): Promise<LiturgyResult> {
  const cached = await readCachedLiturgy(date);

  if (cached && !options.force && isCacheFresh(cached.cachedAt)) {
    return {
      liturgy: { ...cached, source: 'cache', season: cached.season },
      fromCache: true,
      staleError: null,
    };
  }

  try {
    const liturgy = await providerInstance.fetchByDate(date);
    await writeCachedLiturgy(liturgy);
    return { liturgy, fromCache: false, staleError: null };
  } catch (error) {
    const liturgyError =
      error instanceof LiturgyError
        ? error
        : new LiturgyError('unknown', 'Não foi possível carregar a liturgia.');

    if (cached) {
      return {
        liturgy: { ...cached, source: 'cache' },
        fromCache: true,
        staleError: liturgyError,
      };
    }

    throw liturgyError;
  }
}

/** Aviso claro e honesto para cada tipo de falha. */
export function describeLiturgyError(error: LiturgyError): {
  title: string;
  message: string;
} {
  switch (error.kind) {
    case 'offline':
      return {
        title: 'Você está sem conexão',
        message:
          'A liturgia de hoje ainda não está guardada neste dispositivo. Conecte-se à internet para baixá-la; depois ela ficará disponível offline.',
      };
    case 'not-found':
      return {
        title: 'Liturgia não publicada',
        message:
          'A fonte comunitária não possui liturgia para esta data. Tente outra data ou consulte novamente mais tarde.',
      };
    case 'provider-unavailable':
      return {
        title: 'Fonte de liturgia indisponível',
        message:
          'Não conseguimos falar com a fonte de liturgia agora. Seus dados locais continuam salvos neste dispositivo.',
      };
    case 'invalid-response':
      return {
        title: 'Resposta inesperada da fonte',
        message:
          'A fonte devolveu dados que não puderam ser validados. Preferimos não exibir conteúdo duvidoso como liturgia.',
      };
    case 'not-configured':
      return {
        title: 'Fonte não configurada',
        message:
          'Nenhum provedor de liturgia está configurado. Veja a documentação em docs/liturgia.md.',
      };
    default:
      return {
        title: 'Não foi possível carregar a liturgia',
        message: 'Ocorreu um erro inesperado ao consultar a fonte de liturgia.',
      };
  }
}

export const liturgyProviderInfo = {
  name: providerInstance.name,
  homepage: providerInstance.homepage,
  apiBase: env.liturgyApiBase,
};

export { clearLiturgyCache, listCachedLiturgies } from './cache';
export { DancrfLiturgyProvider } from './provider-dancrf';
