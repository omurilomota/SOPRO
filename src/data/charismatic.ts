import type { GiftOfTheSpirit } from '../types/formation';

/**
 * Dons do Espírito (Is 11, 2-3) e carismas (1Cor 12, 8-10).
 *
 * Cuidado teológico deliberado: são categorias distintas. Os sete dons do
 * Espírito Santo são disposições permanentes que acompanham a vida da graça;
 * os carismas são graças dadas "para o bem comum" (1Cor 12, 7), muitas vezes
 * ligadas a um serviço ou momento concreto da vida da Igreja.
 *
 * Cada verbete traz apenas paráfrase própria; as citações são referências
 * bíblicas, não reprodução de comentários de terceiros.
 */

export const gifts: GiftOfTheSpirit[] = [
  {
    id: 'sabedoria',
    name: 'Sabedoria',
    category: 'dom-do-espirito',
    summary:
      'Gosto pelas coisas de Deus. Não é inteligência nem cultura: é a capacidade de julgar a vida a partir de Deus e de reconhecer o que conduz à comunhão com ele.',
    scripture: ['Is 11, 2', 'Sb 7, 7', 'Tg 3, 17'],
    notes: [
      'Na tradição católica é o primeiro dos sete dons e fonte dos demais (CIC 1831).',
      'Distingue-se do "carisma da palavra de sabedoria" (1Cor 12, 8), que é uma moção concreta para falar de modo que ilumine uma situação específica.',
    ],
  },
  {
    id: 'entendimento',
    name: 'Entendimento (inteligência)',
    category: 'dom-do-espirito',
    summary:
      'Aptidão para penetrar a fé: compreender o sentido da Escritura, da doutrina e da própria história à luz de Deus.',
    scripture: ['Is 11, 2', 'Ef 1, 17-18', 'Lc 24, 45'],
    notes: [
      'Não substitui o estudo: o dom aperfeiçoa o esforço humano de compreender a fé.',
      'Ajuda a distinguir o essencial do acessório na vida espiritual.',
    ],
  },
  {
    id: 'conselho',
    name: 'Conselho',
    category: 'dom-do-espirito',
    summary:
      'Discernimento prático sobre o que fazer. Capacita a aconselhar bem e a decidir bem, sobretudo nos casos difíceis.',
    scripture: ['Is 11, 2', 'Sl 32, 8', 'Tg 1, 5'],
    notes: [
      'Exige humildade: quem aconselha também precisa ser aconselhado.',
      'Não confundir com o "carisma de conselho" ou de governo, ligado a funções na comunidade.',
    ],
  },
  {
    id: 'fortaleza',
    name: 'Fortaleza',
    category: 'dom-do-espirito',
    summary:
      'Firmeza para suportar o difícil e perseverar no bem, inclusive quando custa caro.',
    scripture: ['Is 11, 2', 'Js 1, 9', 'Ef 6, 10-11'],
    notes: [
      'É virtude moral e também dom: a virtude se cultiva, o dom se recebe.',
      'Não é insensibilidade nem dureza: é constância na caridade.',
    ],
  },
  {
    id: 'ciencia',
    name: 'Ciência',
    category: 'dom-do-espirito',
    summary:
      'Capacidade de julgar corretamente as realidades criadas: reconhecer seu valor real, sem absolutizá-las nem desprezá-las.',
    scripture: ['Is 11, 2', 'Rm 1, 20', 'Fl 3, 8'],
    notes: [
      'Ajuda a usar as coisas do mundo como meios, não como fins.',
      'Diferente do "carisma da palavra de ciência" (1Cor 12, 8), que é uma percepção concreta, para servir, sobre uma situação ou pessoa.',
    ],
  },
  {
    id: 'piedade',
    name: 'Piedade',
    category: 'dom-do-espirito',
    summary:
      'Afeto filial para com Deus e compaixão concreta pelos irmãos. É a devoção que se torna ternura e cuidado.',
    scripture: ['Is 11, 3', 'Rm 8, 15', '1Ts 2, 7-8'],
    notes: [
      'Não é sentimentalismo: a piedade bíblica se mede pelo amor efetivo ao próximo.',
      'Sua ausência torna a religiosidade dura e formal.',
    ],
  },
  {
    id: 'temor-de-deus',
    name: 'Temor de Deus',
    category: 'dom-do-espirito',
    summary:
      'Reconhecer a grandeza de Deus e a própria pequenez — não medo servil, mas reverência que evita o mal por amor.',
    scripture: ['Is 11, 3', 'Sl 111, 10', '2Cor 7, 1'],
    notes: [
      'O Catecismo o apresenta como dom que "não teme o castigo", mas ama o bem (CIC 1836).',
      'É o começo da sabedoria, não o fim da confiança.',
    ],
  },

  {
    id: 'palavra-de-sabedoria',
    name: 'Palavra de sabedoria',
    category: 'carisma',
    summary:
      'Fala iluminadora dada para o bem comum em uma situação concreta: luzes que ajudam a compreender a vontade de Deus aqui e agora.',
    scripture: ['1Cor 12, 8', '1Cor 2, 6-13'],
    notes: [
      'Precisa ser discernida: toda palavra deve ser verificada com a comunidade e a doutrina.',
      'Não é o dom permanente de sabedoria (Is 11, 2).',
    ],
  },
  {
    id: 'palavra-de-ciencia',
    name: 'Palavra de ciência (conhecimento)',
    category: 'carisma',
    summary:
      'Conhecimento concreto, dirigido a uma necessidade real, que ajuda a comunidade a agir com verdade e caridade.',
    scripture: ['1Cor 12, 8', 'Jo 4, 16-18'],
    notes: [
      'Nunca deve ser usado para diagnosticar pessoas, expor segredos ou constranger.',
      'Distingue-se do dom permanente de ciência (Is 11, 2).',
    ],
  },
  {
    id: 'fe',
    name: 'Fé (carisma)',
    category: 'carisma',
    summary:
      'Confiança extraordinária que move a comunidade a se entregar a Deus em uma situação específica. Não é a virtude teologal da fé, recebida no Batismo.',
    scripture: ['1Cor 12, 9', 'Mt 17, 20', 'Mc 11, 23'],
    notes: [
      'A virtude da fé é a base de toda vida cristã; o carisma é uma graça particular para o bem comum.',
      'Não se mede por emoção nem por intensidade psicológica.',
    ],
  },
  {
    id: 'cura',
    name: 'Dons de cura',
    category: 'carisma',
    summary:
      'Graças pelas quais a comunidade intercede e, por vezes, experimenta sinais de restauração física ou interior.',
    scripture: ['1Cor 12, 9. 28-30', 'Tg 5, 14-15', 'Mc 6, 13'],
    notes: [
      'A cura é dom de Deus, nunca resultado de técnica, mérito ou insistência humana.',
      'Não se promete cura. Quem não é curado não é menos amado.',
      'Sempre em comunhão com a oração da Igreja e acompanhamento médico quando necessário.',
    ],
  },
  {
    id: 'milagres',
    name: 'Operação de milagres',
    category: 'carisma',
    summary:
      'Ações extraordinárias de Deus que confirmam a fé e servem à missão, sempre para o bem das pessoas.',
    scripture: ['1Cor 12, 10', 'At 3, 6-10', 'Jo 14, 12'],
    notes: [
      'A Igreja recebe com gratidão e prudência, submetendo fatos a discernimento e verificação.',
      'Nunca deve ser espetáculo nem prova de superioridade espiritual.',
    ],
  },
  {
    id: 'profecia',
    name: 'Profecia',
    category: 'carisma',
    summary:
      'Palavra que edifica, exorta e consola (1Cor 14, 3), ajudando a comunidade a perceber a direção de Deus.',
    scripture: ['1Cor 12, 10', '1Cor 14, 1-5', '1Ts 5, 19-21'],
    notes: [
      'A Escritura manda julgar toda profecia (1Ts 5, 19-21) — o profeta não é autoridade absoluta.',
      'Deve ser coerente com a fé da Igreja e com a caridade; profecias que geram medo, confusão ou divisão devem ser recusadas.',
    ],
  },
  {
    id: 'discernimento-dos-espiritos',
    name: 'Discernimento dos espíritos',
    category: 'carisma',
    summary:
      'Reconhecer o que vem de Deus, do próprio interior e do maligno, distinguindo as moções que conduzem à caridade.',
    scripture: ['1Cor 12, 10', '1Jo 4, 1-3', 'Mt 7, 15-20'],
    notes: [
      'É dom para a comunidade, não uma habilidade pessoal de "ler" os outros.',
      'Ninguém deve se apresentar como detentor do discernimento sobre a vida de outra pessoa.',
    ],
  },
  {
    id: 'variedade-de-linguas',
    name: 'Variedade de línguas',
    category: 'carisma',
    summary:
      'Expressão de louvor dirigida a Deus, em línguas não conhecidas pelo falante, frequentemente presente na oração carismática.',
    scripture: ['1Cor 12, 10. 28-30', 'At 2, 4-11', '1Cor 14, 2-5. 18'],
    notes: [
      'A tradição carismática distingue a oração em línguas do carisma público com intenção de assembleia.',
      'Não é sinal de santidade maior nem de batismo no Espírito como privilégio.',
      'Deve ser exercida com ordem (1Cor 14, 26-33).',
    ],
  },
  {
    id: 'interpretacao-das-linguas',
    name: 'Interpretação das línguas',
    category: 'carisma',
    summary:
      'Capacidade de tornar compreensível, para a assembleia, o conteúdo de uma palavra em línguas.',
    scripture: ['1Cor 12, 10. 30', '1Cor 14, 13. 27-28'],
    notes: [
      'Não é tradução linguística, mas dom dado para a edificação comum.',
      'Sem interpretação, a palavra em línguas na assembleia perde sua função pública.',
    ],
  },
];

export const charismaticTopics = [
  {
    id: 'pessoa-do-espirito-santo',
    title: 'A pessoa do Espírito Santo',
    summary:
      'O Espírito não é uma força impessoal: é a terceira Pessoa da Trindade, que habita no batizado e o conduz à verdade inteira.',
    scripture: ['Jo 14, 16-17. 26', '1Cor 3, 16', 'Rm 8, 14-16'],
    magisterium: ['CIC 683-741', 'Concílio Vaticano II, Lumen Gentium 4'],
    practice: [
      'Retome a oração "Vinde, Espírito Santo" todos os dias desta semana, sem pressa.',
      'Anote, no diário, uma situação em que você percebeu uma moção interior.',
    ],
  },
  {
    id: 'efusao-do-espirito-santo',
    title: 'Efusão do Espírito Santo',
    summary:
      'Na espiritualidade da RCC, a "efusão" (ou "batismo no Espírito") é uma experiência de graça que reaviva os dons recebidos no Batismo e na Crisma. Não é um novo sacramento nem substitui os sacramentos.',
    scripture: ['At 2, 1-4', 'At 8, 14-17', 'At 19, 1-6', 'Lc 11, 13'],
    magisterium: [
      'CIC 1265-1274 (Batismo)',
      'CIC 1302-1314 (Confirmação)',
      'João Paulo II, discursos aos movimentos eclesiais',
    ],
    practice: [
      'Não busque experiência emocional como prova. Busque disponibilidade.',
      'Peça o Espírito na oração pessoal, em comunhão com a Igreja.',
      'Se houver efusão acompanhada por um grupo, procure sacerdotes e equipes em comunhão com a paróquia.',
    ],
  },
  {
    id: 'batismo-no-espirito',
    title: 'Batismo no Espírito Santo',
    summary:
      'Expressão usada pela RCC para a mesma obra de graça: o Espírito já recebido no Batismo passa a ser experimentado como princípio vivo de oração, testemunho e serviço.',
    scripture: ['Jo 3, 5', 'At 1, 8', 'At 2, 38'],
    magisterium: ['CIC 1213', 'CIC 1265', 'CIC 1303'],
    practice: [
      'Evite a confusão de pensar que quem não teve essa experiência "não tem o Espírito".',
      'O sacramento é a fonte objetiva da graça; a experiência é subjetiva e varia.',
    ],
  },
  {
    id: 'vida-de-oracao',
    title: 'Vida de oração',
    summary:
      'A oração carismática não dispensa a oração silenciosa, litúrgica e perseverante. O Espírito conduz à intimidade, não ao espetáculo.',
    scripture: ['Mt 6, 5-8', 'Lc 18, 1-8', 'Rm 8, 26'],
    magisterium: ['CIC 2559-2758'],
    practice: [
      'Reserve 10 minutos diários de silêncio absoluto.',
      'Alterne oração vocal, leitura orante e adoração segundo o seu estado real.',
    ],
  },
  {
    id: 'intercessao',
    title: 'Intercessão',
    summary:
      'Orar pelos outros, assumindo o seu lugar diante de Deus. É serviço que protege do egoísmo espiritual.',
    scripture: ['1Tm 2, 1-4', 'Rm 15, 30', 'Ef 6, 18'],
    magisterium: ['CIC 2634-2636'],
    practice: [
      'Escolha três pessoas e reze por elas todos os dias, sem contar a ninguém.',
      'Peça a intercessão dos santos como companhia, não como fórmula.',
    ],
  },
  {
    id: 'louvor',
    title: 'Louvor',
    summary:
      'Reconhecer a Deus pelo que ele é, não só pelo que faz. O louvor carismático precisa de raízes na liturgia e na humildade.',
    scripture: ['Sl 150', 'Ef 5, 18-20', 'Hb 13, 15'],
    magisterium: ['CIC 2639', 'CIC 2098'],
    practice: [
      'Comece o tempo de louvor agradecendo por três coisas concretas.',
      'Cante o que a Igreja canta: a liturgia é escola de louvor.',
    ],
  },
  {
    id: 'discernimento-espiritual',
    title: 'Discernimento espiritual',
    summary:
      'Discernir é decidir na presença de Deus. Regras inacianas ajudam a reconhecer moções, mas o critério último é a caridade e a comunhão eclesial.',
    scripture: ['1Jo 4, 1', 'Gl 5, 19-23', 'Rm 12, 2'],
    magisterium: ['Santo Inácio de Loyola, Exercícios Espirituais 313-336', 'CIC 1776-1785'],
    practice: [
      'Nunca decida em pico de desolação ou de euforia: espere um tempo de paz.',
      'Teste as moções pelos frutos: caridade, paz, humildade, servidão alegre.',
      'Ande com um diretor espiritual quando a decisão for importante.',
    ],
  },
  {
    id: 'grupo-de-oracao',
    title: 'Grupo de Oração',
    summary:
      'O grupo de oração é lugar de oração, acolhida e formação. Não é palco para carismas pessoais nem fonte de dependência emocional.',
    scripture: ['At 2, 42-47', '1Cor 12, 12-27', 'Hb 10, 24-25'],
    magisterium: ['RCCBRASIL, documentos de identidade do grupo de oração'],
    practice: [
      'Chegue antes e cumprimente quem você não conhece.',
      'Um carisma só é autêntico quando constrói unidade.',
    ],
  },
  {
    id: 'ministerios',
    title: 'Ministérios e serviços',
    summary:
      'Cada carisma se ordena ao serviço. Na RCC, os ministérios organizam a acolhida, a intercessão, a formação, o louvor e a caridade.',
    scripture: ['1Cor 12, 4-11', 'Ef 4, 11-13', '1Pd 4, 10-11'],
    magisterium: ['CIC 873-892', 'Cristifideles Laici 24'],
    practice: [
      'Sirva em algo pequeno e concreto antes de assumir grandes responsabilidades.',
      'Nenhum ministério substitui a vida em família e o trabalho.',
    ],
  },
  {
    id: 'servico-e-missao',
    title: 'Serviço e missão',
    summary:
      'A experiência do Espírito empurra para fora: para os pobres, os afastados, os abandonados. Espiritualidade sem caridade é ruído.',
    scripture: ['Mt 25, 31-46', 'Mc 16, 15', 'Is 58, 6-7'],
    magisterium: ['Evangelii Gaudium 20-24', 'CIC 2443-2449'],
    practice: [
      'Faça uma visita ou um gesto concreto por alguém que passa necessidade neste mês.',
    ],
  },
  {
    id: 'comunidade',
    title: 'Vivência comunitária',
    summary:
      'O Espírito se reconhece na Igreja concreta: paróquia, diocese, comunidade. Espiritualidade "sem vínculos" é sinal de alerta.',
    scripture: ['At 4, 32-35', '1Cor 1, 10', 'Ef 4, 1-6'],
    magisterium: ['Lumen Gentium 8-9', 'CIC 811-822'],
    practice: [
      'Verifique sua pertença: paróquia, comunidade, direção espiritual.',
      'Rejeite qualquer grupo que se coloque acima da autoridade da Igreja.',
    ],
  },
] as const;

export function getGiftById(id: string) {
  return gifts.find((gift) => gift.id === id);
}

export function getTopicById(id: string) {
  return charismaticTopics.find((topic) => topic.id === id);
}
