import type { ID } from './common';

export interface FormationTrack {
  id: ID;
  title: string;
  description: string;
  /** Nível de aprofundamento. */
  level: 'iniciante' | 'intermediario' | 'avancado';
  /** Tema/trilha a que pertence. */
  theme: CharismaticTheme;
  lessons: FormationLesson[];
}

export interface FormationLesson {
  id: ID;
  title: string;
  /** Resumo próprio, escrito para o SOPRO. */
  summary: string;
  /** Referências bíblicas citadas. */
  scripture: string[];
  /** Documentos eclesiais e catecismo. */
  magisterium: string[];
  /** Próximos passos sugeridos. */
  practice: string[];
}

export type CharismaticTheme =
  | 'espirito-santo'
  | 'efusao'
  | 'batismo-no-espirito'
  | 'dons'
  | 'oracao'
  | 'intercessao'
  | 'louvor'
  | 'discernimento'
  | 'grupo-de-oracao'
  | 'ministerios'
  | 'servico'
  | 'comunidade';

/**
 * Material de formação/ biblioteca. `rights` documenta as condições de uso:
 * nunca redistribuímos conteúdo de terceiros sem permissão — por padrão
 * guardamos apenas metadados e o link para a fonte original.
 */
export interface ContentResource {
  id: ID;
  title: string;
  description: string;
  category: string;
  author: string;
  institution: string | null;
  source: string;
  url: string;
  scripture: string[];
  publishedAt: string | null;
  rights: {
    /** 'link-only' = apenas referência; 'cc-by' / 'dominio-publico' / 'proprio'. */
    license: 'link-only' | 'cc-by' | 'cc-by-sa' | 'dominio-publico' | 'proprio' | 'desconhecida';
    notes: string;
  };
  tags: string[];
}
