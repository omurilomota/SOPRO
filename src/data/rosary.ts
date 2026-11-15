import type { MysteryGroup, MysteryGroupId } from '../types/rosary';

/**
 * Mistérios do Rosário, com referências bíblicas.
 *
 * Os títulos dos mistérios são formulações tradicionais em uso há séculos.
 * As meditações e descrições foram escritas para o SOPRO — não reproduzem
 * textos de subsídios protegidos.
 *
 * Os Mistérios Luminosos foram propostos por São João Paulo II em 2002
 * (carta apostólica *Rosarium Virginis Mariae*); os próprios mistérios
 * são episódios evangélicos, não texto editorial protegido.
 */

export const mysteryGroups: MysteryGroup[] = [
  {
    id: 'gozosos',
    name: 'Mistérios Gozosos',
    color: 'brass',
    weekdays: [1, 6],
    description: 'A encarnação e a infância de Jesus, contempladas com Maria.',
    mysteries: [
      {
        id: 'gozoso-1',
        title: 'A Anunciação do Anjo a Maria',
        meditation:
          'Maria escuta e responde. Peça a graça de acolher a vontade de Deus antes de entendê-la por completo.',
        scripture: 'Lc 1, 26-38',
      },
      {
        id: 'gozoso-2',
        title: 'A Visitação de Maria a Isabel',
        meditation:
          'Quem recebeu Deus se põe a caminho para servir. Peça um coração que não guarde a alegria só para si.',
        scripture: 'Lc 1, 39-56',
      },
      {
        id: 'gozoso-3',
        title: 'O Nascimento de Jesus em Belém',
        meditation:
          'Deus escolhe a pobreza. Peça olhos para reconhecer a presença dele no que é pequeno e despojado.',
        scripture: 'Lc 2, 1-20',
      },
      {
        id: 'gozoso-4',
        title: 'A Apresentação do Menino no Templo',
        meditation:
          'Simeão reconhece a luz. Peça a graça de ver o que Deus já está fazendo na sua vida.',
        scripture: 'Lc 2, 22-38',
      },
      {
        id: 'gozoso-5',
        title: 'A Perda e o Encontro do Menino Jesus no Templo',
        meditation:
          'Também há dias de busca e angústia. Peça perseverança para procurar Deus quando ele parece distante.',
        scripture: 'Lc 2, 41-52',
      },
    ],
  },
  {
    id: 'luminosos',
    name: 'Mistérios Luminosos',
    color: 'verde',
    weekdays: [4],
    description: 'A vida pública de Jesus: a luz que revela o Pai.',
    mysteries: [
      {
        id: 'luminoso-1',
        title: 'O Batismo de Jesus no Jordão',
        meditation:
          'Antes de ensinar, Jesus desce à água. Peça a graça de lembrar sempre de onde você vem: do Batismo.',
        scripture: 'Mt 3, 13-17',
      },
      {
        id: 'luminoso-2',
        title: 'A Autorrevelação de Jesus nas Bodas de Caná',
        meditation:
          'A obediência de Maria abriu espaço para o milagre. Peça a graça de fazer o que ele disser.',
        scripture: 'Jo 2, 1-12',
      },
      {
        id: 'luminoso-3',
        title: 'O Anúncio do Reino de Deus',
        meditation:
          'O Reino está perto e pede conversão. Peça um coração pronto a mudar de rumo sem medo.',
        scripture: 'Mc 1, 14-15',
      },
      {
        id: 'luminoso-4',
        title: 'A Transfiguração de Jesus',
        meditation:
          'A glória aparece no meio do caminho. Peça a graça de esperar mesmo quando o monte de hoje é baixo.',
        scripture: 'Lc 9, 28-36',
      },
      {
        id: 'luminoso-5',
        title: 'A Instituição da Eucaristia',
        meditation:
          'Jesus se entrega como alimento. Peça fome de comunhão e reverência diante do Sacramento.',
        scripture: 'Lc 22, 14-20',
      },
    ],
  },
  {
    id: 'dolorosos',
    name: 'Mistérios Dolorosos',
    color: 'roxo',
    weekdays: [2, 5],
    description: 'A paixão de Cristo, rezada junto com quem sofre.',
    mysteries: [
      {
        id: 'doloroso-1',
        title: 'A Agonia de Jesus no Horto',
        meditation:
          'Jesus não foge da angústia. Peça a graça de levar suas dores a Deus em vez de escondê-las.',
        scripture: 'Lc 22, 39-46',
      },
      {
        id: 'doloroso-2',
        title: 'A Flagelação de Jesus',
        meditation:
          'O corpo ferido é o corpo de Cristo. Peça olhos para as violências que ninguém vê.',
        scripture: 'Jo 19, 1',
      },
      {
        id: 'doloroso-3',
        title: 'A Coroação de Espinhos',
        meditation:
          'Zombaram do rei. Peça a graça de suportar humilhações sem devolver o mesmo veneno.',
        scripture: 'Mt 27, 27-31',
      },
      {
        id: 'doloroso-4',
        title: 'O Caminho do Calvário',
        meditation:
          'Jesus caminha com o peso e recebe ajuda de Simão. Peça a graça de aceitar ajuda e de oferecer a sua.',
        scripture: 'Lc 23, 26-32',
      },
      {
        id: 'doloroso-5',
        title: 'A Crucifixão e Morte de Jesus',
        meditation:
          'O silêncio de quem ama até o fim. Fique aos pés da cruz antes de dizer qualquer coisa.',
        scripture: 'Jo 19, 17-30',
      },
    ],
  },
  {
    id: 'gloriosos',
    name: 'Mistérios Gloriosos',
    color: 'serenidade',
    weekdays: [0, 3],
    description: 'A vitória da vida sobre a morte, e a esperança cristã.',
    mysteries: [
      {
        id: 'glorioso-1',
        title: 'A Ressurreição de Jesus',
        meditation:
          'A morte não tem a última palavra. Peça a graça de viver como quem já sabe o final da história.',
        scripture: 'Mt 28, 1-10',
      },
      {
        id: 'glorioso-2',
        title: 'A Ascensão de Jesus ao Céu',
        meditation:
          'Jesus vai e envia. Peça a graça de não ficar parado olhando para o alto.',
        scripture: 'At 1, 6-11',
      },
      {
        id: 'glorioso-3',
        title: 'A Vinda do Espírito Santo',
        meditation:
          'Medo se transforma em coragem. Peça o Espírito que faz falar de Cristo sem vergonha.',
        scripture: 'At 2, 1-13',
      },
      {
        id: 'glorioso-4',
        title: 'A Assunção de Maria',
        meditation:
          'Deus completa o que começa. Peça a esperança de ver a obra dele realizada em você.',
        scripture: 'Ap 12, 1',
      },
      {
        id: 'glorioso-5',
        title: 'A Coroação de Maria',
        meditation:
          'A serva é exaltada. Peça um coração livre da necessidade de ser reconhecido.',
        scripture: 'Ap 12, 1',
      },
    ],
  },
];

export function getMysteryGroup(id: MysteryGroupId): MysteryGroup | undefined {
  return mysteryGroups.find((group) => group.id === id);
}

/** Grupo tradicionalmente sugerido para o dia da semana (0 = domingo). */
export function getMysteryGroupForWeekday(weekday: number): MysteryGroup {
  return (
    mysteryGroups.find((group) => group.weekdays.includes(weekday)) ?? mysteryGroups[0]!
  );
}
