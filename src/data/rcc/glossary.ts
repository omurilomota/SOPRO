import type { GlossaryEntry, RccDocument } from '../../types/rcc';

/**
 * Glossário — termos que a RCC usa e que frequentemente circulam sem
 * explicação. Cada verbete traz a definição e, quando existe, a distinção
 * que evita confusão.
 */
export const glossary: GlossaryEntry[] = [
  {
    term: 'RCC',
    definition:
      'Renovação Carismática Católica. Movimento eclesial de leigos, nascido nos Estados Unidos em 1967 e presente no Brasil desde 1969, cujo carisma próprio é suscitar e alimentar a docilidade ao Espírito Santo.',
    see: ['Corrente de graça', 'CHARIS'],
  },
  {
    term: 'Corrente de graça',
    definition:
      'Expressão usada desde os Documentos de Malinas para dizer que a RCC não é uma associação de membros inscritos, mas um fluxo de graça que atravessa a Igreja inteira. Não há "carteirinha" de carismático.',
    see: ['Documentos de Malinas'],
  },
  {
    term: 'Batismo no Espírito Santo',
    definition:
      'Expressão consagrada pelo uso para designar uma efusão atual do Espírito já recebido no Batismo e na Confirmação. Não é um segundo batismo, não cria duas classes de cristãos e não é condição de salvação.',
    see: ['Efusão', 'Efetivação da graça'],
  },
  {
    term: 'Efusão do Espírito',
    definition:
      'Ação pela qual o Espírito Santo, já habitando no fiel, torna-se sensível e operante na vida da pessoa. Costuma ser o segundo polo da reunião de oração.',
    see: ['Batismo no Espírito Santo'],
  },
  {
    term: 'Querigma',
    definition:
      'O primeiro anúncio cristão: Deus ama, o pecado fere, Cristo salva, a fé converte. Não é doutrina avançada, mas o núcleo que precisa ser ouvido antes de qualquer aprofundamento.',
    see: ['SVES', 'Pregação querigmática'],
  },
  {
    term: 'SVES',
    definition:
      'Seminário de Vida no Espírito Santo. Nove encontros semanais que constituem a etapa querigmática do processo formativo da RCC.',
    see: ['Querigma'],
  },
  {
    term: 'Grupo de Oração',
    definition:
      'A célula fundamental da RCC. Uma reunião semanal, aberta, de cerca de duas horas, sustentada por um núcleo de serviço.',
    see: ['Núcleo de Serviço', 'Reunião de Oração', 'Perseverança'],
  },
  {
    term: 'Núcleo de Serviço',
    definition:
      'O grupo de servos que se reúne antes da reunião de oração para avaliar, analisar, planejar e interceder. Lido em At 2, 1-4.',
  },
  {
    term: 'Cenáculo',
    definition:
      'Grupo pequeno (8 a 12 pessoas) de acompanhamento durante o SVES, com um responsável leigo e um supervisor. É o lugar da partilha real.',
  },
  {
    term: 'Carisma',
    definition:
      'Graça dada pelo Espírito para o bem comum (1Cor 12, 7). Não é diploma de santidade e não se confunde com os sete dons infusos de Is 11.',
    see: ['Dons do Espírito Santo', 'Charismata'],
  },
  {
    term: 'Charismata',
    definition: 'Plural grego de carisma (χάρισμα). Aparece em 1Cor 12, 8-10 e Rm 12, 6-8.',
  },
  {
    term: 'Dons do Espírito Santo',
    definition:
      'Os sete dons infusos de Is 11, 2-3 (sabedoria, entendimento, conselho, fortaleza, ciência, piedade, temor de Deus). São permanentes, acompanham toda a vida cristã e aperfeiçoam as virtudes. Não se confundem com os carismas.',
    see: ['Carisma'],
  },
  {
    term: 'Frutos do Espírito',
    definition:
      'As disposições permanentes que o Espírito produz no caráter (Gl 5, 22-23). São o critério verificável de que uma experiência vem de Deus.',
    see: ['Carisma'],
  },
  {
    term: 'Ciclo carismático',
    definition:
      'Estrutura de um encontro carismático: acolhida, oração (louvor, escuta, resposta), efusão do Espírito, pregação e partilha.',
  },
  {
    term: 'Ministério',
    definition:
      'Na RCC, serviço organizado dentro do grupo (pregação, música, intercessão, cura e libertação...). Não é ministério ordenado e seus responsáveis não são "pastores" em sentido teológico (CNBB 53, n. 29).',
  },
  {
    term: 'Perseverança',
    definition:
      'O terceiro momento do grupo: encontro daqueles que assumiram serviço e querem formação contínua. Lido em At 2, 42-47.',
  },
  {
    term: 'Pastoreio',
    definition:
      'Na RCC, o acompanhamento próximo de pessoas durante o SVES e depois. O termo não deve ser confundido com o múnus pastoral dos sacerdotes (CNBB 53, n. 29).',
  },
  {
    term: 'Módulo Básico',
    definition:
      'A base formativa comum da RCCBRASIL: MB1 a MB8 mais FH1 a FH3 (Formação Humana).',
    see: ['Processo Formativo'],
  },
  {
    term: 'Processo Formativo',
    definition:
      'O caminho oficial de formação: etapa querigmática, Módulo Básico e formação específica por ministério.',
  },
  {
    term: 'CHARIS',
    definition:
      'Charis International Service for Catholic Charismatic Renewal, organismo criado pelo Vaticano em 2019 a partir do ICCRS, para a coordenação mundial do movimento.',
    see: ['ICCRS'],
  },
  {
    term: 'ICCRS',
    definition:
      'International Catholic Charismatic Renewal Services. Serviço internacional reconhecido pelo Pontifício Conselho para os Leigos em 1993; deu origem ao CHARIS em 2019.',
  },
  {
    term: 'Malinas',
    definition:
      'Documentos de Malinas (1974-1986), seis textos de discernimento teológico e pastoral coordenados pelo cardeal Léon-Joseph Suenens. São a principal referência doutrinal do movimento.',
  },
  {
    term: 'Elena Guerra',
    definition:
      'Beata italiana (1835-1914), fundadora das Oblatas do Espírito Santo. João XXIII a chamou "Apóstola do Espírito Santo dos tempos modernos". É invocada como intercessora pela ação do Espírito.',
  },
  {
    term: 'Pentecostalismo católico',
    definition:
      'Designação sociológica do fenômeno carismático católico. Não deve ser confundido com as igrejas pentecostais, com as quais a Igreja mantém diálogo, sem identidade doutrinal.',
  },
  {
    term: 'Repouso no Espírito',
    definition:
      'Fenômeno de queda ou perda momentânea de controle durante a oração. A CNBB recomenda que não seja cultivado em assembleias (Doc. 53, n. 66). O SOPRO não o apresenta como experiência normal.',
  },
  {
    term: 'Glossolalia',
    definition:
      'Falar em línguas não conhecidas pelo falante. Uso privado no louvor; na assembleia, exige interpretação para edificar (1Cor 14, 27-28).',
  },
  {
    term: 'Eclesialidade',
    definition:
      'Critérios que verificam se um movimento é autêntico na Igreja: primado da santidade, confissão da fé, comunhão, missão e caridade (ChL 30).',
  },
  {
    term: 'Doc. 53',
    definition:
      'Documento 53 da CNBB, "Orientações Pastorais sobre a Renovação Carismática Católica", de 1994. É a referência pastoral brasileira do movimento.',
  },
];

/**
 * Documentos e referências. Só registramos o que existe e o que sabemos —
 * nenhum link inventado. Os que não têm URL pública confiável são citados
 * apenas como referência bibliográfica.
 */
export const rccDocuments: RccDocument[] = [
  {
    id: 'cnbb-53',
    title: 'Orientações Pastorais sobre a Renovação Carismática Católica',
    year: '1994',
    author: 'CNBB — Documento 53',
    summary:
      'A palavra da Igreja no Brasil sobre a RCC: natureza do movimento, discernimento dos carismas, cuidados pastorais e limites concretos.',
    relevance:
      'É o documento que sustenta boa parte das cautelas do SOPRO. Vale ser lido inteiro — sobretudo os números 46-47, 56-58 e 60-66.',
    url: null,
  },
  {
    id: 'chL',
    title: 'Christifideles Laici',
    year: '1988',
    author: 'São João Paulo II',
    summary:
      'Exortação apostólica sobre a vocação e a missão dos leigos. Trata dos carismas, da eclesiologia de comunhão e dos critérios de eclesialidade (n. 30).',
    relevance: 'Fonte dos cinco critérios usados no discernimento de movimentos e carismas.',
    url: 'https://www.vatican.va/archive/index_po.htm',
  },
  {
    id: 'malinas',
    title: 'Documentos de Malinas',
    year: '1974-1986',
    author: 'Cardeal Léon-Joseph Suenens e equipe teológica',
    summary:
      'Seis documentos de discernimento teológico e pastoral da Renovação no Espírito: ecumenismo, serviço ao homem, poder das trevas, natureza e graça, entre outros.',
    relevance: 'A melhor porta de entrada para a teologia católica do movimento carismático.',
    url: null,
  },
  {
    id: 'catecismo',
    title: 'Catecismo da Igreja Católica',
    year: '1992',
    author: 'Igreja Católica',
    summary:
      'Os carismas aparecem nos números 799-801; a unção dos enfermos e os carismas de cura, nos números 1506-1523.',
    relevance: 'Dá o critério doutrinal para falar de carismas sem inventar categorias.',
    url: 'https://www.vatican.va/archive/index_po.htm',
  },
  {
    id: 'lumen-gentium',
    title: 'Lumen Gentium',
    year: '1964',
    author: 'Concílio Vaticano II',
    summary:
      'Constituição dogmática sobre a Igreja. O n. 12 trata da diversidade de carismas e do direito de todos os fiéis a eles.',
    relevance: 'Fundamento conciliar para a existência de movimentos carismáticos.',
    url: 'https://www.vatican.va/archive/index_po.htm',
  },
  {
    id: 'aparecida',
    title: 'Documento de Aparecida',
    year: '2007',
    author: 'CELA V — Conferência de Aparecida',
    summary:
      'Documento final da V Conferência do Episcopado Latino-Americano e do Caribe.',
    relevance:
      'Descreve o centro da evangelização como encontro com Cristo e propõe o querigma como fio condutor de todo o processo (n. 278), não apenas uma etapa.',
    url: null,
  },
  {
    id: 'inicio',
    title: 'Orações do início da Renovação',
    year: '1967',
    author: 'Universidade de Duquesne, EUA',
    summary:
      'O retiro de fevereiro de 1967, em Duquesne, é registrado como origem do movimento carismático católico.',
    relevance: 'Contexto histórico: a RCC nasce em ambiente universitário, por vontade de alunos, e chega ao Brasil em 1969.',
    url: null,
  },
];
