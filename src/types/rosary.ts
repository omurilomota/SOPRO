export type MysteryGroupId = 'gozosos' | 'luminosos' | 'dolorosos' | 'gloriosos';

export interface Mystery {
  id: string;
  title: string;
  /** Frase curta para meditação durante as dez Ave-Marias. */
  meditation: string;
  scripture: string;
}

export interface MysteryGroup {
  id: MysteryGroupId;
  name: string;
  /** Dias da semana tradicionalmente associados (0 = domingo). */
  weekdays: number[];
  color: 'verde' | 'serenidade' | 'roxo' | 'brass';
  description: string;
  mysteries: Mystery[];
}
