import type { LucideIcon } from 'lucide-react';
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

export interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  /** Linha explicativa usada na navegação lateral. */
  description: string;
}

/** As seis áreas principais da plataforma. */
export const primaryNav: NavItem[] = [
  { to: '/', label: 'Hoje', icon: Sun, description: 'O dia, a liturgia, a rotina' },
  { to: '/liturgia', label: 'Liturgia', icon: BookOpen, description: 'Leituras e orações da Missa' },
  { to: '/oracoes', label: 'Orações', icon: HandHeart, description: 'Biblioteca e terço' },
  { to: '/calendario', label: 'Calendário', icon: CalendarDays, description: 'Compromissos e grupo' },
  { to: '/formacoes', label: 'Formações', icon: GraduationCap, description: 'Trilhas e biblioteca' },
  { to: '/caminhada', label: 'Caminhada', icon: Compass, description: 'Diário e hábitos' },
];

/** Área em destaque: não é "mais uma seção", é o diferencial do projeto. */
export const charismaticNav: NavItem = {
  to: '/carismatico',
  label: 'Vida no Espírito',
  icon: Flame,
  description: 'RCC, carismas e discernimento',
};

/** Navegação inferior no celular. */
export const mobileNav: NavItem[] = primaryNav.slice(0, 4);

export const moreNav: NavItem[] = [
  primaryNav[4]!,
  primaryNav[5]!,
  charismaticNav,
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
