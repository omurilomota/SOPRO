import {
  BookMarked,
  Compass,
  Flame,
  HandHeart,
  HeartHandshake,
  History,
  ListTree,
  ScrollText,
  Users,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/**
 * Mapa da área "Vida no Espírito".
 *
 * A ordem não é alfabética nem por popularidade: é a ordem em que alguém
 * realmente entra na RCC — primeiro entende o que é, depois entra num grupo,
 * depois faz o seminário, depois discerne o que recebeu, depois serve.
 */

export interface SectionDef {
  to: string;
  label: string;
  title: string;
  description: string;
  icon: LucideIcon;
  /** Marcador marginal, como uma rubrica de missal. */
  mark: string;
}

export const charismaticSections: SectionDef[] = [
  {
    to: '/carismatico/o-que-e',
    label: 'O que é',
    title: 'O que é a Renovação Carismática Católica',
    description:
      'Origem, natureza e o que a Igreja diz dela — inclusive o que ela corrige.',
    icon: Flame,
    mark: 'I',
  },
  {
    to: '/carismatico/grupo-de-oracao',
    label: 'Grupo de oração',
    title: 'Os três momentos do Grupo de Oração',
    description:
      'Núcleo de serviço, reunião de oração e perseverança: o que At 2 tem a ver com a sua quarta-feira à noite.',
    icon: Users,
    mark: 'II',
  },
  {
    to: '/carismatico/reuniao',
    label: 'Reunião de oração',
    title: 'A reunião por dentro',
    description:
      'Elemento por elemento, com os três polos e os erros que esvaziam o encontro.',
    icon: ListTree,
    mark: 'III',
  },
  {
    to: '/carismatico/sves',
    label: 'SVES',
    title: 'Seminário de Vida no Espírito Santo',
    description:
      'Nove semanas, nove passos. Acompanhe onde você está — o progresso fica no seu aparelho.',
    icon: Compass,
    mark: 'IV',
  },
  {
    to: '/carismatico/dons',
    label: 'Dons e carismas',
    title: 'Dons, carismas e frutos',
    description:
      'Três categorias que quase todo mundo confunde. Is 11, 1Cor 12 e Gl 5 — cada uma no seu lugar.',
    icon: ScrollText,
    mark: 'V',
  },
  {
    to: '/carismatico/carismas',
    label: 'Carismas',
    title: 'Os carismas, um por um',
    description:
      'O que são, para que servem, o que a Igreja pede antes de exercê-los e o que nunca fazer.',
    icon: BookMarked,
    mark: 'VI',
  },
  {
    to: '/carismatico/discernimento',
    label: 'Discernimento',
    title: 'Discernir sem se enganar',
    description:
      'Os cinco critérios de eclesialidade e os desvios que a CNBB nomeou. A parte que ninguém ensina.',
    icon: HeartHandshake,
    mark: 'VII',
  },
  {
    to: '/carismatico/formacao',
    label: 'Formação',
    title: 'O processo formativo da RCC',
    description:
      'Querigma, Módulo Básico e formação específica: o caminho real, sem atalho.',
    icon: HandHeart,
    mark: 'VIII',
  },
  {
    to: '/carismatico/ministerios',
    label: 'Ministérios',
    title: 'Onde servir',
    description:
      'Quinze ministérios, o que cada um faz e o que exige de quem se oferece.',
    icon: Users,
    mark: 'IX',
  },
  {
    to: '/carismatico/historia',
    label: 'História',
    title: 'De Duquesne a hoje',
    description:
      'A linha do tempo do movimento, de Elena Guerra ao CHARIS — e a chegada ao Brasil.',
    icon: History,
    mark: 'X',
  },
  {
    to: '/carismatico/glossario',
    label: 'Glossário',
    title: 'Falar a mesma língua',
    description:
      'Carisma, efusão, cenáculo, querigma: os termos em uso, definidos sem jargão.',
    icon: BookMarked,
    mark: 'XI',
  },
];

export function getSection(path: string) {
  return charismaticSections.find((section) => section.to === path);
}
