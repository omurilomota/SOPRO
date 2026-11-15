import type { FormationStage } from '../../types/rcc';

/**
 * Processo Formativo da RCCBRASIL.
 *
 * A estrutura abaixo segue a organização nacional: etapa querigmática
 * (SVES + Experiência de Oração + Aprofundamento de Dons, com seminário sobre
 * o Batismo no Espírito facultativo), Módulo Básico em oito apostilas mais três
 * de Formação Humana, e depois a formação específica por ministério.
 *
 * Há variações reais entre dioceses quanto à ordem (em algumas realidades a
 * Experiência de Oração vem antes do SVES). Indicamos isso onde é relevante.
 *
 * Este é um MAPA, não uma certificação: quem conclui é o grupo, com a
 * coordenação e a paróquia.
 */
export const formationStages: FormationStage[] = [
  // ---------- Etapa querigmática ----------
  {
    id: 'sves',
    name: 'Seminário de Vida no Espírito Santo',
    phase: 'querigma',
    summary:
      'Nove encontros semanais que percorrem o primeiro anúncio: amor de Deus, pecado, salvação, fé, senhorio de Jesus, cura interior, efusão do Espírito e vida em comunidade.',
    format:
      'Encontros semanais em dia distinto da reunião de oração, com grupos pequenos de 8 a 12 pessoas (cenáculos) e pastoreio.',
    duration: '9 semanas',
    outcome:
      'Conversão inicial, decisão de fé e integração na vida do grupo.',
    requires: null,
  },
  {
    id: 'experiencia-oracao',
    name: 'Experiência de Oração',
    phase: 'querigma',
    summary:
      'Encontros que ensinam a rezar: louvor, escuta da Palavra, silêncio, intercessão e uso dos carismas na oração comunitária.',
    format: 'Encontros em grupo, normalmente em um fim de semana ou em noites seguidas.',
    duration: 'Variável (1 a 4 encontros)',
    outcome: 'Aprender a orar em comunidade e reconhecer a ação do Espírito na própria oração.',
    requires: 'Ter iniciado ou concluído o SVES.',
  },
  {
    id: 'aprofundamento-dons',
    name: 'Aprofundamento de Dons',
    phase: 'querigma',
    summary:
      'Estudo e exercício ordenado dos carismas de 1Cor 12, com critérios de discernimento e prática supervisionada.',
    format: 'Encontros expositivos com prática, sempre acompanhados por irmãos experientes.',
    duration: '3 a 4 encontros',
    outcome: 'Compreender os carismas e começar a exercê-los com ordem e sob discernimento.',
    requires: 'Experiência de Oração.',
  },
  {
    id: 'sbes',
    name: 'Seminário sobre o Batismo no Espírito Santo',
    phase: 'querigma',
    summary:
      'Aprofundamento teológico e pastoral do tema, distinguindo o sentido sacramental do experiencial.',
    format: 'Seminário pontual, oferecido pela diocese ou pela coordenação estadual.',
    duration: '1 a 3 dias',
    outcome: 'Capacidade de explicar a doutrina sem confusão e sem criar duas classes de cristãos.',
    requires: 'SVES.',
    optional: true,
  },

  // ---------- Módulo Básico ----------
  {
    id: 'mb1',
    name: 'MB1 — Identidade',
    phase: 'basico',
    summary:
      'O que é a Renovação Carismática Católica: origem, natureza, carisma próprio e relação com a Igreja.',
    format: 'Apostila do Módulo Básico, com encontros em grupo.',
    duration: '2 a 3 encontros',
    outcome: 'Saber explicar o que a RCC é — e o que ela não é.',
    requires: 'Etapa querigmática.',
  },
  {
    id: 'mb2',
    name: 'MB2 — Jesus Senhor e Mestre',
    phase: 'basico',
    summary: 'Cristologia do primeiro anúncio: quem é Jesus e o que significa chamá-lo Senhor.',
    format: 'Apostila do Módulo Básico.',
    duration: '2 encontros',
    outcome: 'Fundamentar a fé na Pessoa de Cristo e não apenas na experiência.',
    requires: 'MB1.',
  },
  {
    id: 'mb3',
    name: 'MB3 — Vida no Espírito',
    phase: 'basico',
    summary:
      'A ação do Espírito Santo na vida cristã: graça, virtudes, dons e frutos.',
    format: 'Apostila do Módulo Básico.',
    duration: '2 encontros',
    outcome: 'Distinguir dons infusos, carismas e frutos, sem confundi-los.',
    requires: 'MB2.',
  },
  {
    id: 'mb4',
    name: 'MB4 — Grupo de Oração',
    phase: 'basico',
    summary:
      'Os três momentos (núcleo, reunião, perseverança), a estrutura da reunião e os ministérios do grupo.',
    format: 'Apostila do Módulo Básico.',
    duration: '2 encontros',
    outcome: 'Poder servir na condução e nos ministérios do Grupo de Oração.',
    requires: 'MB3.',
  },
  {
    id: 'mb5',
    name: 'MB5 — Vida de Oração',
    phase: 'basico',
    summary:
      'Oração pessoal, liturgia, sacramentos e leitura orante da Palavra.',
    format: 'Apostila do Módulo Básico.',
    duration: '2 encontros',
    outcome: 'Uma vida de oração estruturada, não dependente de emoção de reunião.',
    requires: 'MB4.',
  },
  {
    id: 'mb6',
    name: 'MB6 — Carismas / Dons do Espírito',
    phase: 'basico',
    summary:
      'Os carismas segundo 1Cor 12, Rm 12 e Ef 4, com critérios de discernimento e cuidados pastorais.',
    format: 'Apostila do Módulo Básico.',
    duration: '3 encontros',
    outcome: 'Exercer os carismas com ordem, caridade e submissão à Igreja.',
    requires: 'MB5.',
  },
  {
    id: 'mb7',
    name: 'MB7 — Igreja',
    phase: 'basico',
    summary:
      'Eclesiologia: a RCC dentro da Igreja particular, comunhão com o Bispo, paróquia e demais movimentos.',
    format: 'Apostila do Módulo Básico.',
    duration: '2 encontros',
    outcome: 'Compreender que a RCC é uma corrente de graça dentro da Igreja, não uma igreja paralela.',
    requires: 'MB6.',
  },
  {
    id: 'mb8',
    name: 'MB8 — Doutrina Social',
    phase: 'basico',
    summary:
      'O compromisso com a justiça, os pobres e a transformação da sociedade à luz do Evangelho.',
    format: 'Apostila do Módulo Básico.',
    duration: '2 encontros',
    outcome: 'Entender a fé como compromisso público e não como refúgio privado.',
    requires: 'MB7.',
  },
  {
    id: 'fh1',
    name: 'FH1 — Formação Humana I',
    phase: 'basico',
    summary:
      'Autoconhecimento, história pessoal e afetividade, à luz da fé.',
    format: 'Apostila de Formação Humana.',
    duration: '2 encontros',
    outcome: 'Reconhecer limites e feridas próprias sem escondê-los atrás do serviço.',
    requires: 'MB1 (pode ser feito em paralelo).',
  },
  {
    id: 'fh2',
    name: 'FH2 — Formação Humana II',
    phase: 'basico',
    summary: 'Relacionamentos, sexualidade, família e trabalho.',
    format: 'Apostila de Formação Humana.',
    duration: '2 encontros',
    outcome: 'Integrar a vida concreta ao caminho de fé.',
    requires: 'FH1.',
  },
  {
    id: 'fh3',
    name: 'FH3 — Formação Humana III',
    phase: 'basico',
    summary: 'Liderança servidora, comunicação não violenta e cuidado com o próximo.',
    format: 'Apostila de Formação Humana.',
    duration: '2 encontros',
    outcome: 'Exercer coordenação sem ferir e sem se esgotar.',
    requires: 'FH2.',
  },

  // ---------- Formação específica ----------
  {
    id: 'especifica',
    name: 'Formação específica por ministério',
    phase: 'especifico',
    summary:
      'Trilha própria do ministério em que a pessoa serve: pregação, cura e libertação, música, intercessão, comunicação, entre outros.',
    format: 'Apostilas e encontros ministrados pela coordenação diocesana ou estadual.',
    duration: 'Variável',
    outcome: 'Capacitação para servir com competência no ministério assumido.',
    requires: 'Módulo Básico.',
  },
];

export const formationPhases: { id: FormationStage['phase']; name: string; note: string }[] = [
  {
    id: 'querigma',
    name: 'Etapa querigmática',
    note:
      'O encontro inicial com Cristo. Não é informação: é decisão. Em algumas realidades a Experiência de Oração vem antes do SVES.',
  },
  {
    id: 'basico',
    name: 'Módulo Básico',
    note:
      'A base comum a todo membro da RCC. Sem ele, o serviço vira improviso e a experiência, entusiasmo sem raiz.',
  },
  {
    id: 'especifico',
    name: 'Formação específica',
    note:
      'Capacitação por ministério, oferecida pela coordenação diocesana ou estadual.',
  },
];

export function getFormationStage(id: string) {
  return formationStages.find((stage) => stage.id === id);
}
