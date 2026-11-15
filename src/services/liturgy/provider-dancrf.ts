import type { ISODate } from '../../types/common';
import { LiturgyError, type Liturgy, type LiturgyProvider } from '../../types/liturgy';
import { env } from '../../utils/env';
import { normalizeV2 } from './normalize';
import { liturgyErrorSchema, liturgyV2Schema } from './schema';

export const DANCRF_HOMEPAGE = 'https://github.com/Dancrf/liturgia-diaria';

/**
 * Provedor da API comunitária Dancrf/liturgia-diaria (v2, versão estável).
 *
 * Observações documentadas em `docs/liturgia.md`:
 * - a API não declara licença própria no repositório; dados litúrgicos são
 *   consumidos apenas para exibição ao usuário, com atribuição da fonte;
 * - o endpoint público pode não enviar cabeçalhos CORS. Para desenvolvimento
 *   é possível usar `VITE_LITURGIA_API_BASE=/api/liturgia` (proxy do Vite);
 * - o parâmetro `periodo` existe, mas o limite é 7 dias — consultamos uma
 *   data por vez para manter o cache previsível.
 */
export class DancrfLiturgyProvider implements LiturgyProvider {
  readonly id = 'dancrf';
  readonly name = 'Liturgia Diária (Dancrf)';
  readonly homepage = DANCRF_HOMEPAGE;

  private readonly baseUrl: string;
  private readonly timeoutMs: number;

  constructor(options: { baseUrl?: string; timeoutMs?: number } = {}) {
    this.baseUrl = (options.baseUrl ?? env.liturgyApiBase).replace(/\/+$/, '');
    this.timeoutMs = options.timeoutMs ?? 10_000;
  }

  async fetchByDate(date: ISODate): Promise<Liturgy> {
    const url = this.buildUrl(date);

    if (!url) {
      throw new LiturgyError('not-configured', 'A fonte de liturgia não está configurada.');
    }

    if (typeof navigator !== 'undefined' && navigator.onLine === false) {
      throw new LiturgyError('offline', 'Sem conexão com a internet.');
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.timeoutMs);

    let response: Response;
    try {
      response = await fetch(url, {
        signal: controller.signal,
        headers: { Accept: 'application/json' },
      });
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        throw new LiturgyError('provider-unavailable', 'A fonte de liturgia demorou demais.');
      }
      throw new LiturgyError(
        'provider-unavailable',
        'Não foi possível alcançar a fonte de liturgia.',
      );
    } finally {
      clearTimeout(timeout);
    }

    if (response.status === 404) {
      throw new LiturgyError(
        'not-found',
        'A fonte não possui liturgia publicada para esta data.',
        404,
      );
    }

    if (!response.ok) {
      throw new LiturgyError(
        'provider-unavailable',
        `A fonte de liturgia respondeu com status ${response.status}.`,
        response.status,
      );
    }

    let payload: unknown;
    try {
      payload = await response.json();
    } catch {
      throw new LiturgyError('invalid-response', 'A fonte devolveu uma resposta ilegível.');
    }

    const errorCheck = liturgyErrorSchema.safeParse(payload);
    if (errorCheck.success) {
      throw new LiturgyError('not-found', errorCheck.data.erro, null);
    }

    const parsed = liturgyV2Schema.safeParse(payload);
    if (!parsed.success) {
      throw new LiturgyError(
        'invalid-response',
        'A fonte devolveu dados em formato inesperado.',
      );
    }

    const liturgy = normalizeV2(parsed.data, {
      provider: this.name,
      providerUrl: this.homepage,
    });

    if (!liturgy) {
      throw new LiturgyError('invalid-response', 'Não foi possível interpretar a liturgia.');
    }

    return liturgy;
  }

  private buildUrl(date: ISODate): string | null {
    if (!this.baseUrl) return null;
    const [year, month, day] = date.split('-');
    const params = new URLSearchParams({ dia: day ?? '', mes: month ?? '', ano: year ?? '' });
    return `${this.baseUrl}/?${params.toString()}`;
  }
}
