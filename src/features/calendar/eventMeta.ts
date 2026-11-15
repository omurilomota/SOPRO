import {
  BookOpenCheck,
  CalendarHeart,
  Church,
  Flame,
  HandHeart,
  Mountain,
  Sparkles,
  Users,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { EventKind } from '../../types/calendar';

export interface EventKindMeta {
  id: EventKind;
  label: string;
  icon: LucideIcon;
  /** Cor do marcador — usa as cores litúrgicas onde há correspondência. */
  dot: string;
}

/**
 * Marcadores de tipo de compromisso.
 * As cores não são decorativas: seguem a paleta litúrgica do sistema.
 */
export const EVENT_KINDS: EventKindMeta[] = [
  { id: 'missa', label: 'Missa', icon: Church, dot: 'bg-liturgia-branco' },
  { id: 'grupo-oracao', label: 'Grupo de Oração', icon: Users, dot: 'bg-rubric' },
  { id: 'confissao', label: 'Confissão', icon: HandHeart, dot: 'bg-liturgia-roxo' },
  { id: 'adoracao', label: 'Adoração', icon: Sparkles, dot: 'bg-liturgia-branco' },
  { id: 'formacao', label: 'Formação', icon: BookOpenCheck, dot: 'bg-liturgia-verde' },
  { id: 'retiro', label: 'Retiro', icon: Mountain, dot: 'bg-liturgia-verde' },
  { id: 'novena', label: 'Novena', icon: Flame, dot: 'bg-liturgia-rosa' },
  { id: 'outro', label: 'Outro', icon: CalendarHeart, dot: 'bg-muted' },
];

export function eventKindMeta(kind: EventKind): EventKindMeta {
  return EVENT_KINDS.find((item) => item.id === kind) ?? EVENT_KINDS[EVENT_KINDS.length - 1]!;
}
