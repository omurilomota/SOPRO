/* ==========================================================================
   Tipos da espiritualidade carismática.

   Base documental: CNBB Documento 53 (Orientações pastorais sobre a RCC,
   1994), Documentos de Malinas (Suenens, 1974–1986), Catecismo da Igreja
   Católica, Lumen Gentium 12, e materiais de formação da RCCBRASIL.

   Princípio editorial: a plataforma FORM A e ACOMPANHA. Nunca diagnostica,
   nunca promete, nunca substitui o discernimento da Igreja.
   ========================================================================== */

/** Um dos dons infusos do Espírito (Is 11, 2-3). */
export interface GiftOfTheSpirit {
  id: string;
  name: string;
  /** Nome latino tradicional — útil para estudo. */
  latin: string;
  /** Definição em uma frase, escrita para o SOPRO. */
  summary: string;
  /** Desenvolvimento em parágrafos. */
  body: string;
  scripture: string[];
  magisterium: string[];
  /** Como se reconhece esse dom na vida concreta (sem virar diagnóstico). */
  signs: string[];
  /** O que esse dom NÃO é — evita confusão comum. */
  misreadings: string[];
  /** Prática sugerida para cultivar. */
  practice: string;
}

/** Um carisma de 1Cor 12 / Rm 12 / Ef 4. */
export interface Charism {
  id: string;
  name: string;
  /** Referência principal que o fundamenta. */
  scripture: string[];
  summary: string;
  body: string;
  /** Para que serve na comunidade. */
  purpose: string;
  magisterium: string[];
  /** Cuidados pastorais concretos. */
  cautions: string[];
  /** O que a Igreja pede antes de exercê-lo publicamente. */
  requirements: string[];
}

/** Fruto do Espírito (Gl 5, 22-23). */
export interface FruitOfTheSpirit {
  id: string;
  name: string;
  summary: string;
  /** Como esse fruto aparece no cotidiano, em termos concretos. */
  inDailyLife: string;
}

/** Os três momentos constitutivos do Grupo de Oração. */
export interface GroupMoment {
  id: 'nucleo' | 'reuniao' | 'perseveranca';
  name: string;
  /** Referência bíblica que a RCC associa ao momento (At 2). */
  scripture: string;
  summary: string;
  /** Quem participa. */
  who: string;
  /** O que se faz, em passos. */
  steps: { title: string; description: string }[];
  /** Frequência típica. */
  frequency: string;
  cautions: string[];
}

/** Um elemento dentro da Reunião de Oração. */
export interface PrayerMeetingElement {
  id: string;
  name: string;
  /** Ordem sugerida no ciclo. */
  order: number;
  description: string;
  /** Por que importa. */
  purpose: string;
  /** Erro comum a evitar. */
  pitfall: string | null;
  /** Se é um dos três polos principais. */
  central?: boolean;
}

/** Ministério de serviço da RCC. */
export interface Ministry {
  id: string;
  name: string;
  abbreviation: string | null;
  summary: string;
  /** O que a pessoa faz concretamente. */
  serves: string[];
  /** Perfil e requisitos. */
  requirements: string[];
}

/** Um encontro do Seminário de Vida no Espírito Santo (9 semanas). */
export interface SvesSession {
  /** 1 a 9. */
  number: number;
  title: string;
  /** Núcleo querigmático do encontro. */
  theme: string;
  scripture: string[];
  /** O que se espera que aconteça. */
  aim: string;
}

/** Etapa do processo formativo oficial da RCC. */
export interface FormationStage {
  id: string;
  name: string;
  /** A que fase pertence. */
  phase: 'querigma' | 'basico' | 'especifico';
  summary: string;
  format: string;
  /** Duração típica. */
  duration: string;
  /** O que se recebe ao final. */
  outcome: string;
  /** Pré-requisito. */
  requires: string | null;
  optional?: boolean;
}

/** Critério de discernimento de carismas / eclesialidade. */
export interface DiscernmentCriterion {
  id: string;
  title: string;
  question: string;
  explanation: string;
  /** Fonte documental. */
  source: string;
}

/** Alerta pastoral — os "não faças" documentados pela Igreja. */
export interface PastoralWarning {
  id: string;
  title: string;
  problem: string;
  /** O que a Igreja orienta. */
  guidance: string;
  source: string;
}

export interface GlossaryEntry {
  term: string;
  definition: string;
  /** Termos relacionados. */
  see?: string[];
}

export interface RccDocument {
  id: string;
  title: string;
  year: string;
  author: string;
  summary: string;
  /** Por que importa para quem está na RCC. */
  relevance: string;
  url: string | null;
}

/**
 * Progresso local do caminho carismático.
 *
 * Decisão de privacidade: o que a pessoa marca aqui é dela. Não existe conta,
 * não existe sincronização e não existe analytics. Uma linha por iniciativa:
 * o SVES é uma linha, cada módulo de formação é uma linha.
 */
export interface RccProgressRecord {
  /** `sves` | `formacao:mb1` | `pratica:...` */
  id: string;
  kind: 'sves' | 'formacao' | 'pratica';
  /** Referência ao conteúdo (número da semana, id do módulo). */
  refId: string;
  completed: boolean;
  completedAt: string | null;
  /** Nota pessoal — fica no aparelho, como o diário. */
  note: string | null;
  updatedAt: string;
}
