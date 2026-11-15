import type { ID } from './common';

export interface Prayer {
  id: ID;
  title: string;
  /** Categoria editorial (chave estável). */
  category: PrayerCategoryId;
  summary: string;
  /** Corpo da oração; quebras de linha são preservadas. */
  body: string;
  /** Indicação de onde o texto provém (domínio público, fonte, etc.). */
  attribution: string | null;
  /** Referências bíblicas relacionadas. */
  scripture: string[];
  tags: string[];
  /** Sugestão de momento do dia para exibição na rotina. */
  suggestedMoment: 'manha' | 'noite' | 'qualquer';
}

export type PrayerCategoryId =
  | 'manha'
  | 'noite'
  | 'espirito-santo'
  | 'tradicionais'
  | 'rosario'
  | 'terco'
  | 'terco-espirito-santo'
  | 'novenas'
  | 'adoracao'
  | 'exame'
  | 'pelos-outros';

export interface PrayerCategory {
  id: PrayerCategoryId;
  title: string;
  description: string;
  icon: string;
}
