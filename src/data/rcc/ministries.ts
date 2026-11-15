import type { Ministry } from '../../types/rcc';

/**
 * Ministérios de serviço reconhecidos na organização nacional da RCCBRASIL.
 *
 * Importante (CNBB Doc. 53, n. 29): a RCC usa a palavra "ministério" num
 * sentido próprio, diferente do ministério ordenado. Nenhum destes é
 * ministério hierárquico, e seus responsáveis não são "pastores" no sentido
 * teológico do termo. O SOPRO mantém essa distinção visível.
 */
export const ministries: Ministry[] = [
  {
    id: 'pregacao',
    name: 'Pregação',
    abbreviation: null,
    summary:
      'Anúncio querigmático nas reuniões de oração, seminários e encontros. É o ministério que dá voz ao primeiro anúncio.',
    serves: [
      'Preparar e ministrar pregações a partir da Palavra e do tema do encontro.',
      'Acompanhar pregadores iniciantes.',
      'Zelar para que a pregação permaneça querigmática e não se torne palestra motivacional.',
    ],
    requirements: [
      'Módulo Básico concluído.',
      'Formação específica de pregação.',
      'Referência de um presbítero ou coordenador experiente.',
    ],
  },
  {
    id: 'formacao',
    name: 'Formação',
    abbreviation: null,
    summary:
      'Organiza e ministra o processo formativo: SVES, Experiência de Oração, Módulo Básico e formação específica.',
    serves: [
      'Planejar o calendário formativo do grupo e da diocese.',
      'Preparar e acompanhar formadores.',
      'Guardar a fidelidade doutrinal do material usado.',
    ],
    requirements: ['Módulo Básico e formação específica de formação.', 'Comunhão com a coordenação diocesana.'],
  },
  {
    id: 'intercessao',
    name: 'Intercessão',
    abbreviation: null,
    summary:
      'Sustenta na oração as pessoas, os encontros e a missão. É o ministério que quase nunca aparece e do qual tudo depende.',
    serves: [
      'Interceder antes e durante as reuniões.',
      'Organizar vigílias, jejuns e adoração.',
      'Guardar sigilo absoluto sobre as intenções confiadas.',
    ],
    requirements: ['Vida sacramental regular.', 'Constância e discrição.'],
  },
  {
    id: 'musica',
    name: 'Música e Artes',
    abbreviation: null,
    summary:
      'Conduz o louvor e cuida da beleza como linguagem de fé.',
    serves: [
      'Escolher o repertório em função do tema e do momento da reunião.',
      'Formar músicos e cantores do grupo.',
      'Cuidar do som sem transformá-lo em espetáculo.',
    ],
    requirements: ['Módulo Básico.', 'Discernimento sobre o palco: quem anima serve, não se apresenta.'],
  },
  {
    id: 'cura-libertacao',
    name: 'Oração por Cura e Libertação',
    abbreviation: null,
    summary:
      'Atende pessoas que pedem oração por cura física ou interior e por libertação, em articulação com a paróquia.',
    serves: [
      'Atender com escuta, sigilo e sem promessas.',
      'Encaminhar casos que exigem acompanhamento médico, psicológico ou exorcístico.',
      'Formar equipes com preparação específica.',
    ],
    requirements: [
      'Formação específica obrigatória.',
      'Autorização e comunhão com o pároco e a diocese.',
      'Nunca usar óleo ou gestos que imitem sacramentos (CNBB 53, n. 61).',
    ],
  },
  {
    id: 'comunicacao',
    name: 'Comunicação Social',
    abbreviation: null,
    summary:
      'Divulga a vida do grupo e comunica com verdade, sem sensacionalismo.',
    serves: [
      'Divulgar encontros e formações.',
      'Cuidar de redes, site e boletins.',
      'Evitar imagens e promessas que distorçam a fé.',
    ],
    requirements: ['Módulo Básico.', 'Formação em comunicação, quando possível.'],
  },
  {
    id: 'jovem',
    name: 'Jovem',
    abbreviation: null,
    summary:
      'Grupos de oração e encontros voltados aos jovens, com linguagem e ritmo próprios.',
    serves: [
      'Acompanhar grupos jovens.',
      'Formar lideranças jovens.',
      'Integrar os jovens na vida da paróquia e não apenas no grupo.',
    ],
    requirements: ['Módulo Básico.', 'Capacidade de trabalhar com faixa etária específica.'],
  },
  {
    id: 'criancas',
    name: 'Crianças e Adolescentes',
    abbreviation: null,
    summary:
      'Acolhe crianças e adolescentes com linguagem adequada e salvaguarda integral.',
    serves: [
      'Encontros adaptados à idade.',
      'Trabalho com as famílias.',
      'Cumprimento rigoroso das normas de proteção à infância.',
    ],
    requirements: ['Formação em salvaguarda.', 'Presença de mais de um adulto por atividade.'],
  },
  {
    id: 'familias',
    name: 'Famílias',
    abbreviation: null,
    summary:
      'Acompanha casais e famílias, com atenção às crises, à parentalidade e à espiritualidade conjugal.',
    serves: [
      'Encontros de casais.',
      'Acompanhamento de famílias em dificuldade.',
      'Articulação com a Pastoral Familiar paroquial.',
    ],
    requirements: ['Módulo Básico.', 'Formação específica ou encaminhamento a profissionais.'],
  },
  {
    id: 'fe-politica',
    name: 'Fé e Política',
    abbreviation: null,
    summary:
      'Forma cristãos para o compromisso público à luz da Doutrina Social da Igreja, sem partidarismo.',
    serves: [
      'Formação em Doutrina Social.',
      'Acompanhamento de quem exerce mandato ou função pública.',
      'Ações de incidência social junto à paróquia.',
    ],
    requirements: ['Módulo Básico, incluindo MB8.', 'Isonomia em relação a partidos e candidatos.'],
  },
  {
    id: 'promocao-humana',
    name: 'Promoção Humana',
    abbreviation: null,
    summary:
      'Ações concretas de caridade, justiça e dignidade humana.',
    serves: [
      'Projetos de assistência e geração de renda.',
      'Articulação com a Cáritas e as pastorais sociais.',
      'Presença em situações de vulnerabilidade.',
    ],
    requirements: ['Disponibilidade para o serviço concreto.', 'Articulação com a paróquia.'],
  },
  {
    id: 'universidades',
    name: 'Universidades Renovadas',
    abbreviation: null,
    summary:
      'Presença da RCC no ambiente universitário e na intelectualidade católica.',
    serves: ['Grupos de oração em campi.', 'Formação teológica e cultural dos universitários.'],
    requirements: ['Presença no ambiente acadêmico.'],
  },
  {
    id: 'cristo-sacerdote',
    name: 'Cristo Sacerdote',
    abbreviation: null,
    summary:
      'Acompanha seminaristas, padres e diáconos em sua vida espiritual.',
    serves: [
      'Oração pelos seminaristas.',
      'Retiros e encontros de espiritualidade sacerdotal.',
      'Apoio à formação no seminário.',
    ],
    requirements: ['Discrição e comunhão com a autoridade eclesiástica.'],
  },
  {
    id: 'religiosas',
    name: 'Religiosas e Consagradas',
    abbreviation: null,
    summary:
      'Acompanha a vida religiosa carismática e a vocação consagrada.',
    serves: ['Encontros com religiosos.', 'Oração pela vida consagrada.'],
    requirements: ['Discrição e comunhão com a autoridade eclesiástica.'],
  },
];

export function getMinistry(id: string) {
  return ministries.find((ministry) => ministry.id === id);
}
