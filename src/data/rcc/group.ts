import type { GroupMoment, PrayerMeetingElement } from '../../types/rcc';

/**
 * O Grupo de Oração e seus três momentos constitutivos.
 *
 * Fonte: materiais de formação da RCCBRASIL (Módulo Básico, apostila 3) e
 * orientações para núcleos de Grupos de Oração, amplamente difundidas nas
 * dioceses brasileiras. A RCC lê os três momentos em Atos 2:
 *   At 2, 1-4  → Núcleo de Serviço (o cenáculo, a escuta profética)
 *   At 2, 5-41 → Reunião de Oração (o anúncio querigmático)
 *   At 2, 42-47→ Grupo de Perseverança (a vida fraterna e a formação)
 */
export const groupMoments: GroupMoment[] = [
  {
    id: 'nucleo',
    name: 'Núcleo de Serviço',
    scripture: 'At 2, 1-4',
    summary:
      'A reunião dos servos que ora, avalia, discerne, planeja e intercede antes da reunião de oração. É o "cenáculo" do grupo: o lugar da escuta profética.',
    who:
      'Coordenador, ex-coordenador, coordenadores de ministério e irmãos discernidos pelo próprio núcleo. Não é status: é serviço.',
    frequency: 'Semanal, em dia e hora distintos da reunião de oração. Cerca de 1h30.',
    steps: [
      {
        title: 'Oração inicial',
        description:
          'Os servos rezam juntos, pedindo a ação do Espírito sobre a reunião que virá. Alguns grupos reservam 15 minutos antes de tudo.',
      },
      {
        title: 'Avaliar',
        description:
          'Como foi a reunião anterior? O louvor foi oração ou espetáculo? Os cantos ajudaram a abrir o coração? Houve acolhida real? Alguém ficou de fora? Houve profecia e uso dos carismas com ordem?',
      },
      {
        title: 'Analisar',
        description:
          'Quem precisa de acompanhamento: doença, luto, dificuldade familiar, ausência prolongada. Encaminhar com amor, nunca expor.',
      },
      {
        title: 'Planejar',
        description:
          'Metas de pastoreio e missão. Revezamento na condução — inclusive dos mais tímidos, que precisam ser desenvolvidos.',
      },
      {
        title: 'Interceder',
        description:
          'Colocar-se na brecha pelas pessoas do grupo, pelos ministérios, pelas necessidades da paróquia.',
      },
      {
        title: 'Preparar a reunião',
        description:
          'Distribuir serviços, definir o tema (rhema) da pregação, escalar quem acolhe, quem anima, quem prega, quem intercede.',
      },
    ],
    cautions: [
      'Não transformar o núcleo em panelinha de decisões tomadas fora do grupo.',
      'Não confundir com reunião de diretoria: o centro é a oração e o discernimento.',
      'Não usar o núcleo como instância de poder sobre a vida das pessoas.',
    ],
  },
  {
    id: 'reuniao',
    name: 'Reunião de Oração',
    scripture: 'At 2, 5-41',
    summary:
      'O encontro semanal aberto a todos. É o espaço privilegiado da efusão do Espírito e do anúncio querigmático.',
    who: 'Todos. É aberta — inclusive a quem nunca veio, a quem está de passagem, a quem não é católico.',
    frequency: 'Semanal. A orientação comum é que não ultrapasse duas horas.',
    steps: [
      {
        title: 'Acolhida',
        description:
          'Na porta e no início. Convida a pessoa a entrar no contexto do encontro, sem interrogatório e sem constrangimento.',
      },
      {
        title: 'Animação',
        description:
          'Cânticos que criam unidade e tiram as pessoas da inércia. Não é show nem brincadeira: é preparação para a oração.',
      },
      {
        title: 'Louvor',
        description:
          'O primeiro dos três polos. Louvar é reconhecer quem Deus é — mais pelo que ele é do que pelo que ele faz.',
      },
      {
        title: 'Silêncio',
        description:
          'Espaço para que Deus fale. Costuma ser o momento menos praticado e mais necessário.',
      },
      {
        title: 'Efusão do Espírito Santo',
        description:
          'Segundo polo. O momento de invocar uma nova efusão da graça sobre a assembleia, com ordem e sem pressa.',
      },
      {
        title: 'Pregação querigmática',
        description:
          'Terceiro polo. Anúncio centrado na Pessoa de Jesus — amor de Deus, pecado, salvação, fé, conversão, dom do Espírito, vida comunitária.',
      },
      {
        title: 'Testemunhos',
        description: 'Manifestam a glória de Deus e tornam concreta a ação da graça no meio do povo.',
      },
      {
        title: 'Oração final e envio',
        description:
          'Síntese da mensagem e envio para a semana. Avisos em número reduzido, claros e rápidos.',
      },
    ],
    cautions: [
      'Não ultrapassar duas horas: o cansaço dispersa a oração.',
      'O dirigente não deve falar o tempo todo nem fazer a sua oração pessoal em público.',
      'Avisos longos no fim destroem o clima do encontro.',
      'A reunião não é lugar para manipulação emocional, pressão por dinheiro ou promessas de milagre.',
    ],
  },
  {
    id: 'perseveranca',
    name: 'Grupo de Perseverança',
    scripture: 'At 2, 42-47',
    summary:
      'O momento daqueles que assumem serviço e querem crescer na doutrina, na fraternidade e na vida de oração.',
    who:
      'Quem já fez a experiência inicial e quer se engajar. É o caminho natural de quem vai servir em algum ministério.',
    frequency: 'Semanal ou quinzenal, com formação contínua.',
    steps: [
      {
        title: 'Formação',
        description:
          'Estudo do Módulo Básico e das apostilas específicas, sempre com leitura orante e não apenas informação.',
      },
      {
        title: 'Partilha de vida',
        description:
          'Onde o crescimento real aparece: dificuldades em casa, no trabalho, na perseverança.',
      },
      {
        title: 'Oração e sacramentos',
        description:
          'Vida sacramental regular, sobretudo Eucaristia e confissão, sem as quais a experiência carismática se esvazia.',
      },
      {
        title: 'Serviço',
        description: 'Assunção gradual de responsabilidades concretas nos ministérios do grupo.',
      },
    ],
    cautions: [
      'Não transformar em elite espiritual dentro do grupo.',
      'Não usar como critério de pertencimento ou de "promoção".',
    ],
  },
];

/**
 * Elementos da Reunião de Oração, na ordem do ciclo carismático.
 * Os três polos — louvor, pregação e efusão — são o eixo.
 */
export const prayerMeetingElements: PrayerMeetingElement[] = [
  {
    id: 'acolhida',
    order: 1,
    name: 'Acolhida',
    description:
      'Receber as pessoas na porta e no início. Chamar pelo nome, apresentar-se, ajudar a encontrar lugar.',
    purpose:
      'Criar pertença. Muitas pessoas não voltam ao grupo não por discordar da pregação, mas porque ninguém notou que estavam ali.',
    pitfall:
      'Interrogar o visitante sobre a vida dele, ou ignorá-lo porque "os conhecidos já estão conversando".',
  },
  {
    id: 'animacao',
    order: 2,
    name: 'Animação',
    description:
      'Cânticos e gestos que criam unidade, com preferência por músicas que falem do tema da noite.',
    purpose: 'Tirar o povo da inércia e preparar o coração para a oração.',
    pitfall:
      'Transformar a animação em show, em pirotecnia ou em número de entretenimento — e estender além do necessário.',
  },
  {
    id: 'louvor',
    order: 3,
    name: 'Louvor',
    description:
      'Reconhecer Deus pelo que ele é: admirar, agradecer, engrandecer. É o tempo que deve consumir mais tempo na reunião.',
    purpose:
      'É o primeiro dos três polos. O louvor desloca o olhar de si para Deus e dispõe a assembleia para receber.',
    pitfall:
      'Reduzir louvor a pedidos cantados. Quando todo o "louvor" é sobre o que eu quero, ele deixou de ser louvor.',
    central: true,
  },
  {
    id: 'silencio',
    order: 4,
    name: 'Silêncio',
    description:
      'Um espaço real em que ninguém fala, ninguém canta e ninguém conduz.',
    purpose:
      'Permitir que Deus fale. Muitas vezes nos queixamos de que ele não fala, sem perceber que não damos oportunidade.',
    pitfall: 'Preencher o silêncio com mais música, mais palavra ou mais instruções.',
  },
  {
    id: 'efusao',
    order: 5,
    name: 'Efusão do Espírito Santo',
    description:
      'Invocação de uma nova efusão da graça sobre a assembleia, normalmente com imposição de mãos da equipe.',
    purpose:
      'É o segundo polo. Momento pentecostal do encontro: reavivar a graça do Batismo e da Crisma, sem criar dependência de experiência.',
    pitfall:
      'Confundir efusão com emoção intensa; pressionar as pessoas; usar gestos que imitem sacramentalidade.',
    central: true,
  },
  {
    id: 'pregação',
    order: 6,
    name: 'Pregação querigmática',
    description:
      'Anúncio centrado na Pessoa de Jesus, em 20 a 25 minutos, sem introduções longas.',
    purpose:
      'É o terceiro polo. O querigma não é discurso doutrinal: é o primeiro anúncio, que convida à conversão.',
    pitfall:
      'Pregação moralista, longa, ou que fala de tudo menos de Jesus. Também erra quem prega para si mesmo.',
    central: true,
  },
  {
    id: 'testemunhos',
    order: 7,
    name: 'Testemunhos',
    description: 'Pessoas concretas contam, de forma sóbria, o que Deus fez em suas vidas.',
    purpose: 'Manifestar a glória de Deus e tornar crível que ele age hoje.',
    pitfall:
      'Testemunhos intermináveis, exagerados ou usados como autopromoção — inclusive do pregador.',
  },
  {
    id: 'envio',
    order: 8,
    name: 'Oração final e envio',
    description:
      'Síntese breve da mensagem e envio para a vida concreta da semana. Avisos rápidos.',
    purpose: 'Devolver cada pessoa à sua casa, ao seu trabalho e à sua paróquia com uma tarefa.',
    pitfall: 'Encerrar com dez minutos de recados, aniversários e venda de camisetas.',
  },
  {
    id: 'oracao-carismas',
    order: 9,
    name: 'Exercício dos carismas',
    description:
      'Quando o Espírito suscita, palavras de sabedoria, ciência, profecia ou línguas com interpretação.',
    purpose: 'Edificar a assembleia, com ordem (1Cor 14, 26-33).',
    pitfall:
      'Desordem, sobreposição de vozes, mensagens que constrangem — e quem insiste em falar sem interpretação.',
  },
];
