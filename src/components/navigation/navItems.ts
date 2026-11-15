import {
  BookOpen,
  CalendarDays,
  Compass,
  Flame,
  GraduationCap,
  HandHeart,
  Heart,
  Settings2,
  Sun,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  /** Descrição usada na navegação lateral e em contextos auxiliares. */
  description: string;
}

/** As seis áreas principais da plataforma. */
export const primaryNav: NavItem[] = [
  { to: '/', label: 'Hoje', icon: Sun, description: 'Seu dia, sua caminhada' },
  { to: '/liturgia', label: 'Liturgia', icon: BookOpen, description: 'Leituras e orações do dia' },
  { to: '/oracoes', label: 'Orações', icon: HandHeart, description: 'Biblioteca e terço' },
  {
    to: '/calendario',
    label: 'Calendário',
    icon: CalendarDays,
    description: 'Compromissos e grupo de oração',
  },
  {
    to: '/formacoes',
    label: 'Formações',
    icon: GraduationCap,
    description: 'Trilhas e biblioteca',
  },
  {
    to: '/caminhada',
    label: 'Minha caminhada',
    icon: Compass,
    description: 'Diário e hábitos',
  },
];

/** Navegação inferior no celular: cinco itens + "Mais". */
export const mobileNav: NavItem[] = primaryNav.slice(0, 5);

export const moreNav: NavItem[] = [
  primaryNav[5]!,
  {
    to: '/carismatico',
    label: 'Carismático',
    icon: Flame,
    description: 'Dons, carismas e RCC',
  },
];

export const secondaryNav: NavItem[] = [
  {
    to: '/carismatico',
    label: 'Espiritualidade carismática',
    icon: Flame,
    description: 'Dons, carismas e RCC',
  },
  {
    to: '/caminhada/configuracoes',
    label: 'Configurações',
    icon: Settings2,
    description: 'Tema, dados e privacidade',
  },
  {
    to: '/privacidade',
    label: 'Privacidade',
    icon: Heart,
    description: 'Como seus dados são tratados',
  },
];
