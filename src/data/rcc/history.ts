/**
 * História e cultura de Pentecostes.
 *
 * Só fatos verificáveis e amplamente documentados. Datas aproximadas são
 * marcadas como tal. Nada de "revelações" sobre fundadores.
 */
export interface HistoryEvent {
  year: string;
  title: string;
  body: string;
  place?: string;
}

export const historyTimeline: HistoryEvent[] = [
  {
    year: '1913',
    title: 'Beata Elena Guerra escreve ao Papa',
    body: `Elena Guerra, fundadora das Oblatas do Espírito Santo, insiste com São Pio X para que toda a Igreja reze pela efusão do Espírito. O Papa acolhe o pedido e estende a novena de Pentecostes a toda a Igreja — antecedente direto do que, décadas depois, seria a Renovação.`,
    place: 'Lucca, Itália',
  },
  {
    year: '1960',
    title: 'Novena do Espírito Santo',
    body: `Nos Estados Unidos, professores e estudantes universitários começam a rezar a novena do Espírito Santo pedindo uma renovação da vida cristã. Não buscavam fundar nada: buscavam viver o que já professavam.`,
    place: 'Pittsburgh, EUA',
  },
  {
    year: '1967',
    title: 'Duquesne: o fim de semana de fevereiro',
    body: `Estudantes e professores da Universidade de Duquesne participam de um retiro. O grupo registra, em linguagem direta e sem exageros posteriores, o que viveu: uma experiência de oração que transformou a relação com os sacramentos e a leitura da Escritura. A Universidade de Notre Dame se torna, na sequência, um dos polos do movimento.`,
    place: 'Pittsburgh, EUA',
  },
  {
    year: '1969',
    title: 'A RCC chega ao Brasil',
    body: `A experiência chega ao país por padres e universitários. No Brasil, o movimento assume rapidamente a forma que lhe é própria: reuniões semanais abertas, em paróquias, com ênfase no louvor e no anúncio querigmático.`,
    place: 'Brasil',
  },
  {
    year: '1974',
    title: 'Primeiro Documento de Malinas',
    body: `Cardeal Léon-Joseph Suenens, arcebispo de Malinas-Bruxelas, reúne teólogos para dar forma doutrinal ao que acontecia. O primeiro documento trata da Renovação e do ecumenismo.`,
    place: 'Bélgica',
  },
  {
    year: '1975',
    title: 'Paulo VI recebe o movimento',
    body: `No Pentecostes de 1975, Paulo VI reconhece publicamente a Renovação no Espírito como "uma oportunidade providencial" para a Igreja. O discurso é, até hoje, uma referência para a identidade do movimento.`,
    place: 'Roma',
  },
  {
    year: '1979',
    title: 'Malinas III: Renovação e serviço ao homem',
    body: `O documento insiste que a experiência do Espírito não é refúgio privado: ela envia ao serviço dos pobres e à transformação do mundo.`,
    place: 'Bélgica',
  },
  {
    year: '1982',
    title: 'Malinas IV: Renovação e poder das trevas',
    body: `Documento sobre a luta espiritual. Insiste no equilíbrio: o mal é real, mas a vitória de Cristo é maior — evitando tanto a negação quanto o medo.`,
    place: 'Bélgica',
  },
  {
    year: '1986',
    title: 'Malinas V: natureza e graça',
    body: `O último documento do ciclo trata da relação entre a experiência carismática, a graça santificante e a vida sacramental — afirmando o primado da graça sobre a emoção.`,
    place: 'Bélgica',
  },
  {
    year: '1993',
    title: 'Reconhecimento do ICCRS',
    body: `O Pontifício Conselho para os Leigos reconhece oficialmente o ICCRS como serviço internacional de coordenação do movimento carismático católico.`,
    place: 'Roma',
  },
  {
    year: '1994',
    title: 'CNBB publica o Documento 53',
    body: `A conferência episcopal brasileira publica as "Orientações Pastorais sobre a Renovação Carismática Católica". Não é condenação: é disciplina pastoral — diz o que edifica e o que fere o povo de Deus.`,
    place: 'Brasil',
  },
  {
    year: '2019',
    title: 'Nasce o CHARIS',
    body: `O Vaticano cria o Charis International Service for Catholic Charismatic Renewal, substituindo o ICCRS e reunindo os vários ramos carismáticos (RCC, Focolares, Comunidade Católica Shalom, comunidades do Espírito) num único serviço de comunhão.`,
    place: 'Roma',
  },
];

/**
 * Números que valem ser registrados — para que o SOPRO não trate a RCC como
 * fenômeno brasileiro e recente.
 */
export const historyFacts = [
  {
    label: 'Origem',
    value: 'Duquesne, 1967',
    note: 'Não nasceu de uma instituição: nasceu de universitários rezando.',
  },
  {
    label: 'Brasil',
    value: 'Desde 1969',
    note: 'A RCC brasileira é hoje uma das maiores do mundo.',
  },
  {
    label: 'Marco pastoral',
    value: 'CNBB 53 (1994)',
    note: 'Não é condenação: é disciplina pastoral, e corrige desvios reais.',
  },
  {
    label: 'Coordenação mundial',
    value: 'CHARIS (2019)',
    note: 'Criado pelo Vaticano, não pelo movimento.',
  },
];
