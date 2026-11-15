import type { ContentResource, FormationTrack } from '../types/formation';

/**
 * Formações e biblioteca.
 *
 * Regra editorial: NÃO copiamos textos de terceiros. Cada trilha é uma
 * síntese original do SOPRO, com referências verificáveis (Escritura,
 * Catecismo, documentos da Igreja). Cada recurso da biblioteca aponta para a
 * fonte original, com nota de licença.
 */

export const formationTracks: FormationTrack[] = [
  {
    id: 'trilha-fundamentos',
    title: 'Fundamentos da vida cristã',
    description:
      'Uma base curta sobre os sacramentos, a oração e a vida em Cristo. Bom ponto de partida.',
    level: 'iniciante',
    theme: 'espirito-santo',
    lessons: [
      {
        id: 'f-batismo',
        title: 'O Batismo: a porta da vida nova',
        summary:
          'O Batismo é o primeiro sacramento: ele nos incorpora a Cristo e à Igreja, perdoa o pecado e concede o Espírito. Todo o resto da vida cristã é desdobramento disso.',
        scripture: ['Mt 28, 19', 'At 2, 38', 'Rm 6, 3-4'],
        magisterium: ['CIC 1213', 'CIC 1265', 'CIC 1274'],
        practice: [
          'Procure a data do seu Batismo e anote-a no diário.',
          'Reze uma vez por semana agradecendo pelo Batismo.',
        ],
      },
      {
        id: 'f-eucaristia',
        title: 'A Eucaristia: fonte e ápice',
        summary:
          'A Eucaristia é o próprio Cristo entregue por nós. Não é lembrança vazia, mas memória real que nos torna corpo dele.',
        scripture: ['Lc 22, 14-20', 'Jo 6, 51-58', '1Cor 11, 23-29'],
        magisterium: ['CIC 1322-1419', 'Sacrosanctum Concilium 47', 'Ecclesia de Eucharistia'],
        practice: [
          'Chegue alguns minutos antes da Missa para silenciar.',
          'Leia a liturgia do dia antes de participar.',
        ],
      },
      {
        id: 'f-oracao',
        title: 'A oração cristã',
        summary:
          'A oração é diálogo com Deus, que nos ama primeiro. Ela tem formas: vocal, meditativa, contemplativa. Todas cabem, e nenhuma se basta.',
        scripture: ['Mt 6, 5-15', 'Lc 18, 1', 'Rm 8, 26'],
        magisterium: ['CIC 2559-2758'],
        practice: [
          'Escolha um horário fixo e um lugar discreto para orar.',
          'Se não souber o que dizer, reze um salmo.',
        ],
      },
      {
        id: 'f-mandamentos',
        title: 'Os Mandamentos e a liberdade',
        summary:
          'Os Mandamentos não são uma lista de impossibilidades: são o caminho da liberdade e da vida. Não se cumprem com força de vontade, mas em graça.',
        scripture: ['Ex 20, 1-17', 'Mt 22, 34-40', 'Rm 13, 8-10'],
        magisterium: ['CIC 2052-2082'],
        practice: [
          'Pegue uma falha recorrente e leve-a à confissão, sem autopunição.',
          'Reveja a semana com o exame de consciência.',
        ],
      },
    ],
  },
  {
    id: 'trilha-espirito-santo',
    title: 'O Espírito Santo e seus dons',
    description:
      'Um percurso para conhecer a terceira Pessoa da Trindade e distinguir dons, carismas e virtudes.',
    level: 'intermediario',
    theme: 'dons',
    lessons: [
      {
        id: 'e-pessoa',
        title: 'Quem é o Espírito Santo',
        summary:
          'Não é força nem energia: é Pessoa. O Espírito fala, consola, intercede e habita no batizado.',
        scripture: ['Jo 14, 16-26', 'At 8, 29', 'Rm 8, 14-16'],
        magisterium: ['CIC 683-747'],
        practice: ['Antes da leitura bíblica, peça em silêncio: "Fala, Senhor."'],
      },
      {
        id: 'e-dons',
        title: 'Os sete dons do Espírito',
        summary:
          'Sabedoria, entendimento, conselho, fortaleza, ciência, piedade e temor de Deus: disposições que aperfeiçoam a vida da graça.',
        scripture: ['Is 11, 2-3', 'Sb 7, 7'],
        magisterium: ['CIC 1830-1832'],
        practice: ['Reze um dia por semana pedindo um dos dons.'],
      },
      {
        id: 'e-carismas',
        title: 'Os carismas de 1Cor 12',
        summary:
          'São graças dadas para o bem comum. Não são troféus, nem sinais de superioridade: servem para edificar a comunidade.',
        scripture: ['1Cor 12, 4-11', '1Cor 14, 26-33', 'Rm 12, 6-8'],
        magisterium: ['CIC 799-801', 'Lumen Gentium 12'],
        practice: ['Identifique um serviço concreto onde seu carisma pode ser útil.'],
      },
      {
        id: 'e-discernir',
        title: 'Discernir as moções',
        summary:
          'Nem tudo o que sentimos vem de Deus. O critério são os frutos: caridade, paz, coerência, humildade.',
        scripture: ['1Jo 4, 1-3', 'Gl 5, 19-23', 'Mt 7, 15-20'],
        magisterium: ['CIC 1776-1785', 'Inácio, Exercícios 313-336'],
        practice: ['Diante de uma decisão, espere três dias antes de responder.'],
      },
    ],
  },
  {
    id: 'trilha-rcc',
    title: 'A Renovação Carismática Católica',
    description:
      'O que é a RCC, sua história, sua espiritualidade e sua relação com a Igreja e a paróquia.',
    level: 'intermediario',
    theme: 'comunidade',
    lessons: [
      {
        id: 'r-origem',
        title: 'Origem e identidade',
        summary:
          'A RCC nasce nos anos 1960 nos Estados Unidos, no meio universitário católico, e se espalha pelo mundo com aprovação e acompanhamento da Igreja.',
        scripture: ['At 2, 1-13', 'At 4, 23-31'],
        magisterium: [
          'João Paulo II, encontro com movimentos (1998)',
          'Documentos da RCCBRASIL sobre identidade',
        ],
        practice: [
          'Converse com o coordenador do seu grupo sobre a história local.',
        ],
      },
      {
        id: 'r-carisma',
        title: 'Qual é o carisma da RCC',
        summary:
          'Reavivar a graça do Batismo e da Crisma, promovendo a experiência do Espírito e o exercício dos carismas na ordem da caridade.',
        scripture: ['2Tm 1, 6', '1Cor 12, 31-13, 13'],
        magisterium: ['CIC 800-801'],
        practice: ['Procure a relação entre carisma e caridade em 1Cor 13.'],
      },
      {
        id: 'r-paroquia',
        title: 'Em comunhão com a paróquia',
        summary:
          'A RCC não é uma igreja paralela. Ela existe dentro da Igreja e deve servir à missão da diocese e da paróquia.',
        scripture: ['1Cor 1, 10-13', 'Ef 4, 1-6'],
        magisterium: ['Lumen Gentium 8', 'Cristifideles Laici 30'],
        practice: ['Participe da Missa dominical e procure o seu pároco.'],
      },
    ],
  },
];

/**
 * Biblioteca de recursos: apenas metadados e link para a fonte original.
 * Nenhum texto é reproduzido aqui.
 */
export const contentResources: ContentResource[] = [
  {
    id: 'res-catecismo',
    title: 'Catecismo da Igreja Católica',
    description:
      'Referência doutrinal completa, organizada em quatro partes: fé, sacramentos, moral e oração.',
    category: 'Documentos da Igreja',
    author: 'Igreja Católica',
    institution: 'Santa Sé',
    source: 'Vaticano',
    url: 'https://www.vatican.va/archive/index_po.htm',
    scripture: [],
    publishedAt: '1997',
    rights: {
      license: 'link-only',
      notes:
        'Texto disponível na página da Santa Sé. O SOPRO apenas indica o link; não reproduz o conteúdo.',
    },
    tags: ['doutrina', 'referência'],
  },
  {
    id: 'res-biblia',
    title: 'Bíblia Sagrada — tradução oficial',
    description:
      'Para leitura orante, use a tradução aprovada pela sua conferência episcopal e o texto indicado pela sua edição.',
    category: 'Escritura',
    author: 'Antigo e Novo Testamento',
    institution: null,
    source: 'Santa Sé',
    url: 'https://www.vatican.va/archive/index_po.htm',
    scripture: [],
    publishedAt: null,
    rights: {
      license: 'link-only',
      notes:
        'Traduções bíblicas contemporâneas são protegidas por direitos autorais. O SOPRO não reproduz textos.',
    },
    tags: ['escritura'],
  },
  {
    id: 'res-liturgia-horas',
    title: 'Liturgia das Horas',
    description:
      'Oração oficial da Igreja, distribuída ao longo do dia. Excelente para quem quer ampliar a oração diária.',
    category: 'Oração litúrgica',
    author: 'Igreja Católica',
    institution: 'Santa Sé',
    source: 'Santa Sé',
    url: 'https://www.vatican.va/archive/index_po.htm',
    scripture: ['Sl 119'],
    publishedAt: null,
    rights: {
      license: 'link-only',
      notes: 'Texto protegido. O SOPRO indica a fonte, sem reproduzir o conteúdo.',
    },
    tags: ['liturgia', 'oração'],
  },
  {
    id: 'res-rccbrasil',
    title: 'RCCBRASIL',
    description:
      'Portal oficial da Renovação Carismática Católica no Brasil: notícias, formações e contatos.',
    category: 'RCC',
    author: 'RCCBRASIL',
    institution: 'Renovação Carismática Católica do Brasil',
    source: 'RCCBRASIL',
    url: 'https://www.rccbrasil.org.br/',
    scripture: [],
    publishedAt: null,
    rights: {
      license: 'link-only',
      notes:
        'O SOPRO não é um aplicativo oficial da RCCBRASIL e não reproduz materiais da instituição sem autorização.',
    },
    tags: ['rcc', 'formação'],
  },
  {
    id: 'res-vaticano',
    title: 'Documentos do Magistério',
    description:
      'Encíclicas, exortações apostólicas e documentos conciliares em edições oficiais.',
    category: 'Documentos da Igreja',
    author: 'Papas e concílios',
    institution: 'Santa Sé',
    source: 'Santa Sé',
    url: 'https://www.vatican.va/archive/index_po.htm',
    scripture: [],
    publishedAt: null,
    rights: {
      license: 'link-only',
      notes: 'Indicação de fonte apenas.',
    },
    tags: ['magistério'],
  },
];

export function getTrackById(id: string) {
  return formationTracks.find((track) => track.id === id);
}
