import type { DiscernmentCriterion, PastoralWarning } from '../../types/rcc';

/**
 * Discernimento.
 *
 * Dois conjuntos de fontes:
 *
 * 1. Os cinco critérios de eclesialidade propostos por João Paulo II em
 *    Christifideles Laici 30 — aplicáveis a qualquer movimento eclesial.
 *    A CNBB (Doc. 53) os retoma ao tratar da RCC.
 *
 * 2. As orientações pastorais específicas do Doc. 53, que respondem às
 *    distorções observadas no Brasil desde os anos 1980.
 */
export const discernmentCriteria: DiscernmentCriterion[] = [
  {
    id: 'primado-da-vocacao',
    title: 'O primado da vocação à santidade',
    question:
      'Isto me ajuda a crescer na santidade concreta — na caridade com quem está perto de mim?',
    explanation:
      'Primeiro critério de ChL 30. Um movimento autêntico produz santos, não apenas frequentadores. O teste não é a intensidade da experiência, mas a transformação verificável da vida: paciência em casa, honestidade no trabalho, capacidade de perdoar.',
    source: 'Christifideles Laici 30; CNBB 53, n. 19',
  },
  {
    id: 'confissao-da-fe',
    title: 'A confissão da fé católica',
    question: 'Isto está de acordo com o que a Igreja crê e ensina?',
    explanation:
      'Segundo critério. Qualquer "revelação", "novidade" ou ensino que contradiga o Credo não vem do Espírito Santo — ainda que venha acompanhado de emoção intensa. A fé é recebida, não inventada.',
    source: 'Christifideles Laici 30; CNBB 53, nn. 39-40',
  },
  {
    id: 'comunhao',
    title: 'A comunhão com a Igreja e os pastores',
    question: 'Isto me aproxima do meu pároco, do meu bispo e da vida da diocese?',
    explanation:
      'Terceiro critério. Um grupo que se entende melhor que a Igreja, que desconfia da hierarquia ou que "protege" o fiel do pároco não está no Espírito. A RCC existe na Igreja e para a Igreja.',
    source: 'Christifideles Laici 30; CNBB 53, nn. 57-58',
  },
  {
    id: 'missao',
    title: 'A conformidade com o ardor missionário',
    question: 'Isto me envia ao mundo ou me tranca dentro do grupo?',
    explanation:
      'Quarto critério. A experiência carismática que não termina em missão — evangelização, serviço, compromisso com os pobres — se fecha em si mesma e murcha. O Espírito sempre envia.',
    source: 'Christifideles Laici 30; Documento de Aparecida 278',
  },
  {
    id: 'caridade',
    title: 'A atenção à caridade e à vida fraterna',
    question: 'Quem convive comigo percebe alguém mais paciente e mais solidário?',
    explanation:
      'Quinto critério. São Paulo é radical: sem amor, línguas, profecia e ciência não valem nada (1Cor 13, 1-3). O maior carisma é a caridade (1Cor 12, 31). Toda avaliação de carisma começa e termina aqui.',
    source: 'Christifideles Laici 30; 1Cor 13; CNBB 53, n. 56',
  },
  /* Critérios práticos complementares, de uso comum na formação da RCC. */
  {
    id: 'frutos',
    title: 'Os frutos duradouros',
    question: 'Depois de semanas, o que restou?',
    explanation:
      'A emoção passa; o fruto permanece. Paz consistente, mudança de hábito, reconciliações, retorno aos sacramentos. São Mateus dá o critério: pelos frutos os conhecereis (Mt 7, 16-20).',
    source: 'Mt 7, 16-20; Gl 5, 22-23',
  },
  {
    id: 'paz',
    title: 'A paz duradoura, não a euforia',
    question: 'Tenho paz com isso — ou apenas agitação?',
    explanation:
      'Santo Inácio distingue consolação verdadeira de falsa: a verdadeira deixa paz e humildade; a falsa agita, infla e dispersa. E lembra que, em desolação, não se mudam decisões tomadas em paz.',
    source: 'Exercícios Espirituais 313-336',
  },
  {
    id: 'humildade',
    title: 'A ausência de autopromoção',
    question: 'Quem chama a atenção: Deus ou o instrumento?',
    explanation:
      'Nenhum carisma autêntico promove seu portador. Se a mensagem converge para a pessoa que a transmite — seu nome, seu grupo, suas revelações — o sinal é de alerta.',
    source: '1Cor 4, 7; CNBB 53, n. 65',
  },
];

/**
 * Alertas pastorais documentados. Cada um corresponde a um desvio que a
 * Igreja no Brasil nomeou explicitamente — não a uma suposição do SOPRO.
 */
export const pastoralWarnings: PastoralWarning[] = [
  {
    id: 'repouso',
    title: '"Repouso no Espírito" não deve ser cultivado em assembleias',
    problem:
      'Manifestações como queda, riso incontrolável ou convulsões durante a oração, tratadas como prova de ação do Espírito.',
    guidance:
      'A CNBB orienta que se evite o "repouso no Espírito" em reuniões e retiros, até que o tema seja estudado com maior profundidade (Doc. 53, n. 66). O SOPRO não o apresenta como experiência normal ou desejável da vida cristã. Fenômenos desse tipo devem ser conduzidos com descrição e encaminhados ao discernimento pastoral — nunca incentivados.',
    source: 'CNBB, Doc. 53, n. 66',
  },
  {
    id: 'sacramentalidade',
    title: 'Não imitar gestos sacramentais na oração pelos doentes',
    problem:
      'Uso de óleo, unções, sinais e fórmulas que imitam o Sacramento da Unção dos Enfermos, feitos por leigos.',
    guidance:
      'A CNBB proíbe essas imitações (Doc. 53, nn. 60-61). Leigos podem usar o Ritual de Bênçãos, que é próprio para eles. A Unção dos Enfermos é ministrada somente por sacerdotes, a quem ela é reservada.',
    source: 'CNBB, Doc. 53, nn. 60-61; CIC 1519',
  },
  {
    id: 'promessas-de-cura',
    title: 'Nada de promessas de cura ou de milagres',
    problem:
      'Anunciar "hoje todos serão curados", atribuir a falta de cura à falta de fé do doente, ou vender expectativas de milagre.',
    guidance:
      'A Igreja pede que se evite todo sensacionalismo e que se anuncie o Evangelho, não resultados. O sofrimento não é sinal de falta de fé, e a cruz faz parte da fé (Doc. 53, nn. 46-47. 60).',
    source: 'CNBB, Doc. 53, nn. 46-47, 60',
  },
  {
    id: 'vocabulario',
    title: 'Não reaproveitar termos eclesiais com outro sentido',
    problem:
      'Uso de "pastor", "pastoreio", "ministério" e "evangelizador" com significado diferente do da Igreja.',
    guidance:
      'A CNBB pede que não se criem confusões terminológicas (Doc. 53, n. 29). Na RCC, quem coordena não é "pastor" em sentido teológico; coordenação é serviço, não hierarquia. O SOPRO sempre explicita essa distinção.',
    source: 'CNBB, Doc. 53, n. 29',
  },
  {
    id: 'discernimento-carismas',
    title: 'O juízo sobre os carismas cabe aos pastores',
    problem:
      'Grupos ou pessoas que se apresentam como autoridade final sobre o que é ou não de Deus.',
    guidance:
      'A CNBB lembra que discernir os carismas autênticos compete aos pastores da Igreja (Doc. 53, nn. 57-58), com o princípio paulino: "não extingais o Espírito, mas examinai tudo" (1Ts 5, 19-21). Nenhum dirigente leigo tem esse juízo em nome próprio.',
    source: 'CNBB, Doc. 53, nn. 57-58; 1Ts 5, 19-21',
  },
  {
    id: 'experiencia-sem-cruz',
    title: 'Fé reduzida a experiência subjetiva',
    problem:
      'Reduzir a fé ao que se sente no encontro, e tratar o sofrimento, a dúvida e a aridez como falhas espirituais.',
    guidance:
      'A CNBB adverte que a fé não se reduz a experiência subjetiva nem às necessidades imediatas e deve incluir a cruz (Doc. 53, nn. 46-47). Noite escura, aridez e dúvida fazem parte do caminho dos santos.',
    source: 'CNBB, Doc. 53, nn. 46-47',
  },
  {
    id: 'profecias-de-controle',
    title: 'Profecias usadas para controlar decisões alheias',
    problem:
      '"Deus me revelou que você deve..." — orientações sobre casamento, trabalho, vocação ou dinheiro, apresentadas como vontade de Deus.',
    guidance:
      'A CNBB pede grande discernimento quanto à profecia, eliminando qualquer dependência mágica ou supersticiosa (Doc. 53, n. 65). Decisões de vida são da pessoa, com acompanhamento e liberdade; nunca obedeça a alguém que fala em nome de Deus sobre sua intimidade.',
    source: 'CNBB, Doc. 53, n. 65; 1Cor 14, 29',
  },
  {
    id: 'financeiro',
    title: 'Pressão financeira em nome da fé',
    problem:
      'Coletas insistentes, promessas de bênção proporcional à oferta, venda de bens religiosos como se fossem mediadores de graça.',
    guidance:
      'A contribuição deve ser livre, discreta e nunca condicionada a bênção. A RCC mantém seus encontros abertos e gratuitos, sustentados pela generosidade dos que podem e querem.',
    source: '2Cor 9, 7; At 20, 33-35',
  },
  {
    id: 'acompanhamento',
    title: 'Acompanhamento que substitui a Igreja',
    problem:
      'Direção espiritual exercida por leigos sem formação, com dependência afetiva do dirigente.',
    guidance:
      'A RCC pode acompanhar e exortar, mas o acompanhamento espiritual próprio é do sacerdote. Em sofrimento psíquico, procure profissional de saúde; em questões de fé, o pároco.',
    source: 'CIC 2690; CNBB 53, n. 30',
  },
];

export function getCriterion(id: string) {
  return discernmentCriteria.find((criterion) => criterion.id === id);
}
