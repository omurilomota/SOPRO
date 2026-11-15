import type { Mystery, MysteryGroup } from '../../types/rosary';

export type RosaryStepKind =
  | 'sign-of-the-cross'
  | 'creed'
  | 'our-father'
  | 'hail-mary'
  | 'glory'
  | 'mystery-announcement'
  | 'decade'
  | 'salve-regina';

export interface RosaryStep {
  /** Identificador estável (útil para progresso salvo). */
  id: string;
  kind: RosaryStepKind;
  title: string;
  /** Texto a ser lido, quando existir. */
  text: string | null;
  /** Número de contas (Ave-Marias) desta etapa, quando aplicável. */
  beads?: number;
  /** Mistério associado, no caso de dezenas. */
  mystery?: Mystery;
  /** Índice do mistério (0–4) para a dezena. */
  mysteryIndex?: number;
}

const SIGN_OF_THE_CROSS = {
  kind: 'sign-of-the-cross' as const,
  title: 'Sinal da Cruz',
  text: 'Em nome do Pai, do Filho e do Espírito Santo. Amém.',
};

const CREED = {
  kind: 'creed' as const,
  title: 'Credo',
  text: `Creio em Deus Pai todo-poderoso, criador do céu e da terra.
E em Jesus Cristo, seu único Filho, nosso Senhor,
que foi concebido pelo poder do Espírito Santo,
nasceu da Virgem Maria, padeceu sob Pôncio Pilatos,
foi crucificado, morto e sepultado; desceu à mansão dos mortos;
ressuscitou ao terceiro dia; subiu aos céus,
está sentado à direita de Deus Pai todo-poderoso,
donde há de vir a julgar os vivos e os mortos.

Creio no Espírito Santo, na santa Igreja católica,
na comunhão dos santos, na remissão dos pecados,
na ressurreição da carne, na vida eterna. Amém.`,
};

const OUR_FATHER = {
  kind: 'our-father' as const,
  title: 'Pai-Nosso',
  text: `Pai nosso que estais nos céus, santificado seja o vosso nome;
venha a nós o vosso reino; seja feita a vossa vontade,
assim na terra como no céu.
O pão nosso de cada dia nos dai hoje;
perdoai-nos as nossas ofensas,
assim como nós perdoamos a quem nos tem ofendido;
e não nos deixeis cair em tentação, mas livrai-nos do mal. Amém.`,
};

const GLORY = {
  kind: 'glory' as const,
  title: 'Glória ao Pai',
  text: 'Glória ao Pai, ao Filho e ao Espírito Santo, como era no princípio, agora e sempre. Amém.',
};

const HAIL_MARY = {
  kind: 'hail-mary' as const,
  title: 'Ave-Maria',
  text: `Ave, Maria, cheia de graça, o Senhor é convosco.
Bendita sois vós entre as mulheres
e bendito é o fruto do vosso ventre, Jesus.
Santa Maria, Mãe de Deus, rogai por nós, pecadores,
agora e na hora da nossa morte. Amém.`,
};

const SALVE_REGINA = {
  kind: 'salve-regina' as const,
  title: 'Salve-Rainha',
  text: `Salve, Rainha, Mãe de misericórdia, vida, doçura e esperança nossa, salve!
A vós clamamos, os degredados filhos de Eva.
A vós suspiramos, gemendo e chorando neste vale de lágrimas.
Eia, pois, advogada nossa, esses vossos olhos misericordiosos a nós volvei,
e depois deste desterro, mostrai-nos Jesus, bendito fruto do vosso ventre,
ó clemente, ó piedosa, ó doce sempre Virgem Maria. Amém.`,
};

/**
 * Monta a sequência completa do Terço (5 dezenas) para um grupo de mistérios.
 *
 * A função é pura: recebe o grupo e devolve as etapas, o que facilita testes
 * e permite retomar de qualquer ponto.
 */
export function buildRosarySteps(group: MysteryGroup): RosaryStep[] {
  const steps: RosaryStep[] = [
    { id: 'sign', ...SIGN_OF_THE_CROSS },
    { id: 'creed', ...CREED },
    { id: 'opening-our-father', ...OUR_FATHER },
    {
      id: 'opening-hail-marys',
      ...HAIL_MARY,
      title: 'Três Ave-Marias',
      text: `${HAIL_MARY.text}\n\n(Pelas intenções do Santo Padre: reze três vezes.)`,
      beads: 3,
    },
    { id: 'opening-glory', ...GLORY },
  ];

  group.mysteries.forEach((mystery, index) => {
    steps.push({
      id: `${mystery.id}-announcement`,
      kind: 'mystery-announcement',
      title: `${ordinal(index + 1)} Mistério — ${mystery.title}`,
      text: `${mystery.meditation}\n\n(${mystery.scripture})`,
      mystery,
      mysteryIndex: index,
    });
    steps.push({
      id: `${mystery.id}-our-father`,
      ...OUR_FATHER,
      title: 'Pai-Nosso',
      mystery,
      mysteryIndex: index,
    });
    steps.push({
      id: `${mystery.id}-decade`,
      kind: 'decade',
      title: 'Dez Ave-Marias',
      text: HAIL_MARY.text,
      beads: 10,
      mystery,
      mysteryIndex: index,
    });
    steps.push({
      id: `${mystery.id}-glory`,
      ...GLORY,
      mystery,
      mysteryIndex: index,
    });
  });

  steps.push({ id: 'salve-regina', ...SALVE_REGINA });
  steps.push({
    id: 'final-prayer',
    kind: 'glory',
    title: 'Oração final',
    text: `Oremos: ó Deus, cujo Filho unigênito nos deu, por sua vida, morte e ressurreição,
os prêmios da salvação eterna, concedei-nos, ao meditar estes mistérios do Rosário,
imitar o que eles contêm e alcançar o que prometem.
Por Cristo, nosso Senhor. Amém.`,
  });

  return steps;
}

function ordinal(value: number): string {
  return ['Primeiro', 'Segundo', 'Terceiro', 'Quarto', 'Quinto'][value - 1] ?? `${value}º`;
}
