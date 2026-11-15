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
  /** Classe de cor do marcador (mantém a paleta sóbria). */
  dot: string;
}

export const EVENT_KINDS: EventKindMeta[] = [
  { id: 'missa', label: 'Missa', icon: Church, dot: 'bg-brass' },
  { id: 'grupo-oracao', label: 'Grupo de Oração', icon: Users, dot: 'bg-serenity' },
  { id: 'confissao', label: 'Confissão', icon: HandHeart, dot: 'bg-liturgy-purple' },
  { id: 'adoracao', label: 'Adoração', icon: Sparkles, dot: 'bg-liturgy-white' },
  { id: 'formacao', label: 'Formação', icon: BookOpenCheck, dot: 'bg-liturgy-green' },
  { id: 'retiro', label: 'Retiro', icon: Mountain, dot: 'bg-serenity' },
  { id: 'novena', label: 'Novena', icon: Flame, dot: 'bg-liturgy-rose' },
  { id: 'outro', label: 'Outro', icon: CalendarHeart, dot: 'bg-muted' },
];

export function eventKindMeta(kind: EventKind): EventKindMeta {
  return EVENT_KINDS.find((item) => item.id === kind) ?? EVENT_KINDS[EVENT_KINDS.length - 1]!;
}
