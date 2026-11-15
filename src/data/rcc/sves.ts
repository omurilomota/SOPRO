import type { SvesSession } from '../../types/rcc';

/**
 * Seminário de Vida no Espírito Santo — 9 encontros semanais.
 *
 * O SVES é a etapa querigmática do processo formativo da RCC: não é um curso de
 * informação, mas um caminho de conversão. Por isso os encontros são semanais,
 * em dia diferente da reunião de oração, e costumam vir acompanhados de
 * grupos pequenos (cenáculos de 8 a 12 pessoas) com pastoreio.
 *
 * Sobre o roteiro: circulam duas tradições de temário. Adotamos o roteiro
 * mais difundido no Brasil — Semeador, Amor de Deus, Pecado, Jesus Salvador,
 * Fé e Conversão, Senhorio de Jesus, Cura Interior, Batismo no Espírito Santo,
 * Vida em Comunidade — e registramos o outro no fim do arquivo.
 *
 * O conteúdo de cada encontro é aqui apenas SINTÉTICO. O SOPRO não substitui a
 * apostila nem o encontro presencial: indica a natureza de cada passo para que
 * a pessoa saiba onde está e o que esperar.
 */
export const svesSessions: SvesSession[] = [
  {
    number: 1,
    title: 'O Semeador',
    theme:
      'Deus sai a semear e o faz com abundância, inclusive onde parece não haver terreno. O ponto de partida não é o que eu faço por Deus, mas o que ele já fez por mim.',
    scripture: ['Mt 13, 1-23', 'Is 55, 10-11'],
    aim:
      'Que a pessoa reconheça a ação de Deus em sua história até aqui e aceite caminhar. É o encontro do "sim, eu quero" — não ainda da conversão, mas da abertura.',
  },
  {
    number: 2,
    title: 'O Amor de Deus',
    theme:
      'Deus não é um juiz a ser aplacado: é Pai que ama primeiro, e o amor dele não depende do nosso desempenho.',
    scripture: ['Jo 3, 16', '1Jo 4, 7-19', 'Rm 5, 5-8', 'Lc 15, 11-32'],
    aim:
      'Que a pessoa deixe de se relacionar com Deus por medo e comece a se relacionar por confiança. Sem esse passo, os seguintes ficam distorcidos: quem não sabe que é amado confunde conversão com autoflagelação.',
  },
  {
    number: 3,
    title: 'O Pecado',
    theme:
      'O pecado não é só quebra de regra: é recusa do amor, e é sempre uma ferida antes de ser uma culpa.',
    scripture: ['Gn 3', 'Rm 3, 23', '1Jo 1, 8-9', 'Sl 51'],
    aim:
      'Que a pessoa nomeie com verdade o que a afasta de Deus, sem se esmagar. Este é o encontro mais delicado do seminário: pecado sem amor de Deus produz desespero; amor de Deus sem verdade sobre o pecado produz superficialidade.',
  },
  {
    number: 4,
    title: 'Jesus Salvador',
    theme:
      'Jesus não veio apenas ensinar: veio salvar. A cruz não é fracasso, é o modo pelo qual Deus entra no sofrimento humano e o atravessa.',
    scripture: ['Jo 3, 14-17', 'Is 53', 'Fl 2, 5-11', 'At 4, 12'],
    aim:
      'Que a pessoa deixe de tentar se salvar sozinha e reconheça em Jesus o único Salvador. A CNBB insiste que a fé não pode ser reduzida a experiência subjetiva nem a necessidades imediatas (Doc. 53, nn. 46-47): a cruz faz parte do anúncio.',
  },
  {
    number: 5,
    title: 'Fé e Conversão',
    theme:
      'A fé é adesão da pessoa inteira, e a conversão é um caminho, não um instante. Crer é entregar-se; converter-se é mudar de direção.',
    scripture: ['Mc 1, 15', 'Hb 11, 1-6', 'At 2, 37-41', 'Lc 5, 1-11'],
    aim:
      'Que a pessoa faça uma decisão concreta e verifique sua vida. Costuma ser o encontro em que se propõe a confissão sacramental.',
  },
  {
    number: 6,
    title: 'Senhorio de Jesus',
    theme:
      'Reconhecer Jesus como Senhor de toda a vida — não só de uma parte dela. É a entrega da vontade, não apenas do sentimento.',
    scripture: ['Rm 10, 9-13', 'Fl 2, 9-11', 'Mt 16, 13-20', 'Cl 1, 15-20'],
    aim:
      'Que a pessoa nomeie os "senhorios" concorrentes — medo, dinheiro, aprovação, vício — e escolha Cristo. É um passo de liberdade, não de coação.',
  },
  {
    number: 7,
    title: 'Cura Interior',
    theme:
      'Deus cura memórias, feridas e vínculos. Não se trata de apagar o passado, mas de atravessá-lo com Cristo presente.',
    scripture: ['Sl 147, 3', 'Lc 4, 18', 'Is 61, 1-3', 'Mt 11, 28-30'],
    aim:
      'Que a pessoa apresente a Deus feridas concretas e receba consolação. A CNBB alerta contra promessas de cura e contra gestos que imitem sacramentos (Doc. 53, nn. 60-61); a linguagem aqui deve ser de confiança, nunca de garantia. Quem tem feridas graves deve ser encaminhado a acompanhamento profissional.',
  },
  {
    number: 8,
    title: 'Batismo no Espírito Santo',
    theme:
      'Não é um segundo batismo: é a graça do Batismo e da Crisma tomada consciente, vivida e testemunhada. Dois sentidos precisam ser distinguidos.',
    scripture: ['At 2, 1-4', 'At 8, 14-17', 'At 19, 1-7', 'Lc 11, 9-13', 'Jo 7, 37-39'],
    aim:
      'Que a pessoa peça e receba uma efusão do Espírito que torne operante o que já recebeu nos sacramentos. Este é o encontro que dá nome ao seminário — e o mais sujeito a mal-entendidos.',
  },
  {
    number: 9,
    title: 'Vida em Comunidade',
    theme:
      'O Espírito não faz cristãos isolados: faz corpo. A experiência termina onde começou — numa comunidade concreta.',
    scripture: ['At 2, 42-47', 'At 4, 32-35', '1Cor 12, 12-27', 'Jo 13, 34-35'],
    aim:
      'Que a pessoa se comprometa com o Grupo de Oração e com a própria paróquia. Sem esse passo, o seminário produz entusiasmo sem pertença — e entusiasmo sem pertença dura pouco.',
  },
];

/** Roteiro alternativo, também tradicional, para comparação e estudo. */
export const svesAlternativeOutline = [
  'O que é o Seminário de Vida no Espírito Santo',
  'Pessoa e Missão do Espírito Santo',
  'A Promessa do Pai',
  'O Batismo no Espírito Santo',
  'É Jesus quem batiza',
  'Vida no Espírito',
  'Os Carismas',
  'Os Frutos',
  'A Comunidade Cristã',
];

/**
 * Os dois sentidos de "batismo no Espírito Santo" — distinção exigida pela
 * teologia católica. Publicar sem essa distinção é o erro mais comum da
 * literatura popular sobre o tema.
 */
export const baptismInSpiritSenses = [
  {
    id: 'sacramental',
    title: 'Sentido teológico-sacramental',
    body: `Todo cristão batizado recebe o Espírito Santo. Não existe "segundo batismo" e não há duas classes de cristãos. O Batismo e a Confirmação conferem o dom do Espírito de modo objetivo; nada falta ao sacramento.

Neste sentido, é incorreto dizer que alguém "ainda não recebeu o Espírito" por não ter tido uma experiência carismática.`,
    reference: 'CIC 1213-1284; At 2, 38; Rm 8, 9',
  },
  {
    id: 'experiencial',
    title: 'Sentido experiencial (efusão)',
    body: `O que a expressão designa, na prática da RCC, é uma efusão atual da graça: o Espírito já recebido torna-se sensível, operante e testemunhado na vida da pessoa. É uma experiência, não uma nova pertença.

O vocabulário "batismo no Espírito Santo" é consagrado pelo uso, mas precisa ser usado com essa explicação. São João Paulo II, em 1989, falou de uma "aceitação consciente" do Espírito que já habita no fiel.

Importante: a efusão não é condição para a salvação, não é sinal de santidade maior e sua ausência não indica nada negativo sobre a vida espiritual de alguém.`,
    reference: 'Documentos de Malinas; CNBB 53, nn. 36-40 (efeitos e limites)',
  },
];

export function getSvesSession(number: number) {
  return svesSessions.find((session) => session.number === number);
}
