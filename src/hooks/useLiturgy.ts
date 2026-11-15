import { useCallback, useEffect, useState } from 'react';
import type { ISODate } from '../types/common';
import { LiturgyError, type Liturgy } from '../types/liturgy';
import { getLiturgy } from '../services/liturgy';

export interface UseLiturgyResult {
  liturgy: Liturgy | null;
  loading: boolean;
  error: LiturgyError | null;
  /** Aviso não bloqueante (exibimos cache, mas a atualização falhou). */
  staleWarning: LiturgyError | null;
  fromCache: boolean;
  reload: (options?: { force?: boolean }) => void;
}

/**
 * Carrega a liturgia de uma data.
 *
 * A data é tratada como string ISO e nunca convertida por UTC — o pedido é
 * sempre "a liturgia de 2026-11-15 no calendário local".
 */
export function useLiturgy(date: ISODate): UseLiturgyResult {
  const [liturgy, setLiturgy] = useState<Liturgy | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<LiturgyError | null>(null);
  const [staleWarning, setStaleWarning] = useState<LiturgyError | null>(null);
  const [fromCache, setFromCache] = useState(false);
  const [nonce, setNonce] = useState(0);
  const [force, setForce] = useState(false);

  const reload = useCallback((options: { force?: boolean } = {}) => {
    setForce(options.force ?? false);
    setNonce((value) => value + 1);
  }, []);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    getLiturgy(date, { force })
      .then((result) => {
        if (!active) return;
        setLiturgy(result.liturgy);
        setFromCache(result.fromCache);
        setStaleWarning(result.staleError);
        setError(null);
      })
      .catch((caught: unknown) => {
        if (!active) return;
        setLiturgy(null);
        setFromCache(false);
        setStaleWarning(null);
        setError(
          caught instanceof LiturgyError
            ? caught
            : new LiturgyError('unknown', 'Falha inesperada ao carregar a liturgia.'),
        );
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [date, nonce, force]);

  return { liturgy, loading, error, staleWarning, fromCache, reload };
}
