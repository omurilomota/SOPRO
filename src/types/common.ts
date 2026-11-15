/** Tipos compartilhados de domínio do SOPRO. */

export type ID = string;

/** Data no formato ISO curto (AAAA-MM-DD), sempre em calendário local. */
export type ISODate = string;

/** Horário no formato HH:mm (24h). */
export type ISOTime = string;

export type LiturgicalColor = 'verde' | 'vermelho' | 'roxo' | 'rosa' | 'branco' | 'desconhecida';

export type AsyncStatus = 'idle' | 'loading' | 'success' | 'error';
