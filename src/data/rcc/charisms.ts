import type { Charism } from '../../types/rcc';

/**
 * Os carismas (1Cor 12, 8-10.28-30; Rm 12, 6-8; Ef 4, 11-13).
 *
 * Categoria distinta dos sete dons (Is 11): são graças dadas para o BEM COMUM
 * (1Cor 12, 7), muitas vezes ligadas a uma necessidade concreta da comunidade.
 *
 * A CNBB é explícita (Doc. 53, nn. 56-58): os carismas devem ser recebidos com
 * gratidão, mas não devem ser temerariamente pedidos nem se deve ter a presunção
 * de possuí-los; e o juízo sobre sua autenticidade cabe aos pastores da Igreja.
 * O SOPRO segue essa orientação em cada verbete.
 */
export const charisms: Charism[] = [
  {
    id: 'palavra-de-sabedoria',
    name: 'Palavra de sabedoria',
    scripture: ['1Cor 12, 8', '1Cor 2, 6-13', 'Cl 1, 9-10'],
    summary:
      'Fala que ilumina uma situação concreta à luz de Deus, ajudando a comunidade a compreender o que ele quer aqui e agora.',
    body: `Não é o dom permanente de sabedoria (Is 11, 2), e sim uma moção pontual: alguém diz algo que reorganiza a compreensão de todos sobre um fato, uma decisão ou um sofrimento.

Sua marca é a clareza serena. Costuma produzir paz e não confusão; amplia a caridade em vez de estreitar. Não traz informação nova sobre a vida de ninguém (isso seria intromissão), mas reorganiza a leitura da fé.`,
    purpose:
      'Ajudar a comunidade a interpretar os acontecimentos à luz do Evangelho e decidir com coerência.',
    magisterium: ['CIC 799-801', 'Lumen Gentium 12', 'CNBB 53, nn. 56-58'],
    cautions: [
      'Jamais usar para "corrigir" alguém em público sob pretexto de inspiração.',
      'Se produzir medo, confusão ou divisão, deve ser recusada.',
      'Toda palavra precisa ser submetida ao juízo da comunidade e da Igreja.',
    ],
    requirements: [
      'Vida de oração constante e humildade comprovada.',
      'Referência a um sacerdote ou diretor espiritual.',
      'Disposição de calar quando não houver confirmação.',
    ],
  },
  {
    id: 'palavra-de-ciencia',
    name: 'Palavra de ciência',
    scripture: ['1Cor 12, 8', 'Jo 4, 16-19', 'Hb 4, 12-13'],
    summary:
      'Percepção concreta, dada para servir, sobre uma situação ou necessidade real.',
    body: `Diferente do dom infuso de ciência (Is 11, 2), é um conhecimento pontual que serve à comunidade. Não é leitura de pensamentos nem diagnóstico de pessoas.

Sua finalidade é sempre o bem: levar alguém a se abrir, orientar uma intercessão, identificar uma necessidade material que ninguém tinha visto. A tradição carismática insiste que, se a "palavra" expõe alguém, ela não vem de Deus — a verdade que humilha não é a verdade do Evangelho.`,
    purpose: 'Servir com precisão a uma necessidade concreta, seja espiritual ou material.',
    magisterium: ['CIC 799-801', 'CNBB 53, nn. 56-58'],
    cautions: [
      'Nunca usar para revelar segredos, "diagnosticar" doenças ou constranger.',
      'O que é dado ao intercessor é para orar, não necessariamente para dizer.',
      'Não substitui acompanhamento médico, psicológico ou sacramental.',
    ],
    requirements: [
      'Discernimento prévio com o núcleo de serviço.',
      'Prudência quanto a revelar detalhes pessoais.',
    ],
  },
  {
    id: 'fe-carisma',
    name: 'Fé (carisma)',
    scripture: ['1Cor 12, 9', 'Mt 17, 20', 'Mc 11, 22-24'],
    summary:
      'Confiança extraordinária que move a comunidade a se entregar a Deus em uma situação específica.',
    body: `É preciso não confundir: a virtude teologal da fé é recebida no Batismo e sustenta toda a vida cristã. Este carisma é uma graça particular, dada em momentos concretos, que contagia a comunidade e a leva a arriscar por Deus.

Aparece em quem sustenta a intercessão por uma causa difícil durante anos, em quem crê por uma conversão quando todos já desistiram. Não se mede por intensidade emocional — se mede pela perseverança que produz.`,
    purpose: 'Sustentar a comunidade em situações em que a evidência não ajuda a crer.',
    magisterium: ['CIC 799-801', 'CIC 162 (perseverança final)'],
    cautions: [
      'Não é a mesma coisa que fé teologal; ninguém é "mais salvo" por tê-lo.',
      'Não se manifesta por fórmula de "decretar" vitórias ou bênçãos.',
      'Deve-se distinguir confiança em Deus de teimosia disfarçada de fé.',
    ],
    requirements: [
      'Nunca transformar em promessa de resultado a outra pessoa.',
      'Aceitar o silêncio de Deus sem abandonar a intercessão.',
    ],
  },
  {
    id: 'cura',
    name: 'Dons de cura',
    scripture: ['1Cor 12, 9. 28-30', 'Tg 5, 14-15', 'Mc 6, 13', 'Eclo 38, 1-15'],
    summary:
      'Graça pela qual a comunidade intercede e, por vezes, experimenta sinais de restauração física ou interior.',
    body: `A Igreja sempre orou pelos doentes e sempre soube que a cura é dom de Deus, não técnica humana. O Catecismo reconhece os carismas de cura (CIC 1508) e os distingue do Sacramento da Unção dos Enfermos, que tem natureza inteiramente diversa.

Duas coisas precisam ser ditas com clareza, e ambas vêm do ensinamento da Igreja:

Primeiro, a cura não é resultado de insistência, mérito ou fórmula mais fervorosa. Quando se transforma a oração em técnica, o fracasso lança a culpa sobre o doente — e isso é cruel e anticristão.

Segundo, pedir cura não dispensa o tratamento (Eclo 38, 12). O médico exerce uma vocação legítima; recusar tratamento por "ter fé" é tentação, não confiança.

E a verdade mais importante: quem não é curado não é menos amado. Deus não deve nada a ninguém, e o silêncio dele nunca significa abandono.`,
    purpose:
      'Consolar os enfermos, sustentar a fé da comunidade e abrir espaço para a ação livre de Deus.',
    magisterium: [
      'CIC 1506-1523 (unção dos enfermos)',
      'CIC 1508 (carismas de cura)',
      'CNBB 53, nn. 60-61',
    ],
    cautions: [
      'Não prometer cura, não anunciar "milagre" sem verificação.',
      'Não usar óleo ou gestos que imitem sacramentalidade (CNBB 53, n. 61).',
      'Não interromper tratamento médico.',
      'Não atribuir a falta de cura à falta de fé do doente.',
    ],
    requirements: [
      'Oração em comunhão com a paróquia e o sacerdote.',
      'Consentimento explícito de quem recebe a oração.',
      'Acompanhamento de equipe do ministério de cura e libertação.',
    ],
  },
  {
    id: 'milagres',
    name: 'Operação de milagres',
    scripture: ['1Cor 12, 10. 28-29', 'At 3, 6-10', 'Jo 14, 12'],
    summary:
      'Ações extraordinárias de Deus que servem à missão e confirmam a fé.',
    body: `A Escritura registra milagres em abundância, e a Igreja reconhece que Deus continua agindo de modo extraordinário. Mas o critério nunca é o espetáculo: é a fé que se fortalece e a caridade que cresce.

A Igreja é prudente e verifica. Processos de canonização submetem supostos milagres a exame médico minucioso e a discernimento teológico. Essa prudência não é desconfiança de Deus: é proteção do povo, que pode ser enganado por sugestão, fraude ou coincidência interpretada.`,
    purpose: 'Servir à missão, confirmar a fé e socorrer o necessitado.',
    magisterium: ['CIC 799-801', 'CNBB 53, nn. 60-61'],
    cautions: [
      'Nunca usar como prova de santidade pessoal ou de superioridade espiritual.',
      'Não promover "shows de milagres" nem vender testemunhos.',
      'Fatos extraordinários devem ser encaminhados à autoridade eclesial.',
    ],
    requirements: [
      'Submissão total ao Bispo diocesano.',
      'Discrição e ausência de autopromoção.',
    ],
  },
  {
    id: 'profecia',
    name: 'Profecia',
    scripture: ['1Cor 12, 10', '1Cor 14, 1-5. 29-33', '1Ts 5, 19-21', 'Dt 18, 20-22'],
    summary:
      'Palavra que edifica, exorta e consola, ajudando a comunidade a perceber a direção de Deus.',
    body: `São Paulo dá o critério objetivo: quem profetiza fala aos homens para edificação, exortação e consolação (1Cor 14, 3). Se uma "profecia" humilha, ameaça ou desorganiza, ela falhou no teste mais básico.

A Escritura também ordena julgar toda profecia (1Ts 5, 19-21) e o próprio Paulo pede que se examine o que é dito (1Cor 14, 29). Isso significa que o profeta não é autoridade absoluta: ele é um irmão que fala e se submete ao discernimento da comunidade e da Igreja.

A CNBB orienta grande discernimento quanto ao dom da profecia, "eliminando qualquer dependência mágica e até supersticiosa" (n. 65). Profecias sobre o futuro, datas e escolhas pessoais específicas devem ser recebidas com particular desconfiança.`,
    purpose: 'Edificar, exortar e consolar a comunidade; tornar perceptível a voz de Deus.',
    magisterium: ['1Cor 14', 'CNBB 53, n. 65', 'CIC 799-801'],
    cautions: [
      'Toda profecia deve ser julgada — inclusive as que parecem boas.',
      'Nunca dirigir profecias para controlar decisões alheias (casamento, trabalho, vocação).',
      'Não usar a fórmula "assim diz o Senhor" para opiniões pessoais.',
      'Desconfiar de profecias que geram medo, urgência artificial ou dependência do profeta.',
    ],
    requirements: [
      'Verificação pela comunidade e pela autoridade eclesial.',
      'Obediência ao Bispo diocesano, a quem compete o juízo sobre autenticidade.',
    ],
  },
  {
    id: 'discernimento-dos-espiritos',
    name: 'Discernimento dos espíritos',
    scripture: ['1Cor 12, 10', '1Jo 4, 1-6', 'Mt 7, 15-20', 'At 16, 16-18'],
    summary:
      'Distinguir o que vem de Deus, do próprio interior e do maligno, reconhecendo o que conduz à caridade.',
    body: `É o carisma que serve de guarda aos demais. Sem ele, qualquer emoção passa por inspiração e qualquer ideia passa por revelação.

Os critérios são conhecidos e verificáveis: coerência com a fé da Igreja, frutos de caridade (Gl 5, 22-23), paz duradoura e não euforia passageira, humildade e não autopromoção. Santo Inácio acrescenta que, em tempo de desolação, nunca se deve mudar uma decisão tomada em tempo de paz.

Cuidado essencial: este carisma serve à comunidade, não transforma ninguém em "leitor de almas". Nenhuma pessoa deve se apresentar como detentora do discernimento sobre a vida de outra.`,
    purpose: 'Proteger a comunidade do engano e acompanhar o exercício dos demais carismas.',
    magisterium: [
      'CIC 1776-1785',
      'Santo Inácio de Loyola, Exercícios Espirituais 313-336',
      'CNBB 53, n. 57',
    ],
    cautions: [
      'Não confundir com intuição psicológica ou com opinião sobre os outros.',
      'Não usar para "diagnosticar" possessão, opressão ou pecado alheio.',
      'Em casos de possível ação extraordinária do mal, encaminhar ao exorcista da diocese.',
    ],
    requirements: [
      'Formação sólida e vida sacramental regular.',
      'Acompanhamento por diretor espiritual experiente.',
    ],
  },
  {
    id: 'linguas',
    name: 'Variedade de línguas',
    scripture: ['1Cor 12, 10. 28-30', 'At 2, 4-11', '1Cor 14, 2-5. 13-19', 'Mc 16, 17'],
    summary:
      'Expressão de louvor dirigida a Deus em línguas não conhecidas pelo falante.',
    body: `A tradição carismática distingue dois usos. No primeiro, a pessoa louva a Deus em particular, em línguas que não compreende — São Paulo diz que fala a Deus e não aos homens (1Cor 14, 2) e agradece por esse dom (14, 18). No segundo, em assembleia, há necessidade de interpretação para que a comunidade seja edificada (14, 27-28).

É importante desfazer uma confusão frequente: falar em línguas não é sinal de santidade maior, não é privilégio de alguns e não é condição para ser "batizado no Espírito". Muitos santos jamais o fizeram; muitas pessoas o fazem e crescem pouco em caridade. O valor está na caridade, não no fenômeno.

São Paulo, que agradecia por falar em línguas mais que todos, dedica o capítulo seguinte a dizer que sem amor isso não vale nada (1Cor 13, 1). A ordem na assembleia também é exigência apostólica (14, 26-33).`,
    purpose: 'Servir ao louvor e à oração, e — quando interpretado — à edificação da assembleia.',
    magisterium: ['1Cor 12-14', 'CIC 799-801', 'CNBB 53, n. 53 (tema a aprofundar)'],
    cautions: [
      'Não é sinal de superioridade espiritual nem de pertença ao grupo.',
      'Na assembleia, sem interpretação, deve-se calar (1Cor 14, 28).',
      'Nunca forçar ou induzir alguém a falar em línguas.',
      'Não confundir com glossolalia de outros contextos religiosos sem discernimento.',
    ],
    requirements: [
      'Ordem e decência na assembleia (1Cor 14, 40).',
      'Liberdade: ninguém é obrigado a manifestar o dom.',
    ],
  },
  {
    id: 'interpretacao',
    name: 'Interpretação das línguas',
    scripture: ['1Cor 12, 10. 30', '1Cor 14, 5. 13. 26-28'],
    summary:
      'Tornar compreensível para a assembleia o conteúdo de uma palavra em línguas.',
    body: `Não é tradução linguística — é um dom dado para que a comunidade compreenda e seja edificada. Por isso é ordenado à assembleia e não ao proveito pessoal de quem interpreta.

Na prática, a interpretação costuma vir em primeira pessoa ("eu estou convosco..."), como se Deus falasse. Isso exige humildade: quem interpreta deve aceitar que o conteúdo seja julgado pela comunidade e recusar a tentação de embelezar a mensagem.`,
    purpose: 'Permitir que a palavra em línguas edifique a assembleia.',
    magisterium: ['1Cor 14', 'CIC 799-801'],
    cautions: [
      'Nunca usar para introduzir opiniões pessoais como se fossem de Deus.',
      'Se a interpretação contradiz a fé da Igreja, deve ser rejeitada.',
    ],
    requirements: [
      'Discernimento do dirigente da reunião.',
      'Verificação dos frutos: a mensagem deve consolar e exortar, não humilhar.',
    ],
  },
  // --- Carismas de serviço (Rm 12; 1Cor 12, 28) -------------------------
  {
    id: 'servico',
    name: 'Serviço',
    scripture: ['Rm 12, 6-8', '1Pd 4, 10-11', 'Jo 13, 12-15'],
    summary: 'A graça de servir com alegria nas necessidades concretas da comunidade.',
    body: `O mais discreto e o mais necessário dos carismas. Quem serve não aparece na frente, e é justamente por isso que sua ausência é sentida em tudo: a cadeira que não foi posta, o som que falhou, a pessoa que ninguém acolheu.

Na RCC, esse carisma sustenta todos os ministérios. E há um teste simples: quem serve com alegria não fica contando o que fez.`,
    purpose: 'Sustentar a vida prática da comunidade e libertar os demais para a oração e o anúncio.',
    magisterium: ['CIC 799-801', 'Rm 12, 7'],
    cautions: [
      'Não é sobrecarga: servir até a exaustão não é virtude, é falta de discernimento.',
      'Não usar o serviço como forma de controle ou de pertencimento.',
    ],
    requirements: ['Constância e discrição.', 'Saber delegar e pedir ajuda.'],
  },
  {
    id: 'ensino',
    name: 'Ensino',
    scripture: ['Rm 12, 7', 'Ef 4, 11-13', 'Tg 3, 1'],
    summary: 'A capacidade de explicar a fé de modo que outros cresçam nela.',
    body: `Ensinar não é pregar. A pregação anuncia e provoca; o ensino instrui e aprofunda. Quem tem este carisma consegue tornar acessível o que é complexo sem falsificar o que é exigente.

São Tiago adverte: os mestres serão julgados com maior rigor (Tg 3, 1). Por isso, o carisma do ensino exige estudo, fidelidade ao Magistério e disposição de corrigir-se.`,
    purpose: 'Aprofundar a fé da comunidade e protegê-la da superficialidade.',
    magisterium: ['CIC 799-801', 'CIC 85-90'],
    cautions: [
      'Não inventar doutrina nem "novidades" espirituais.',
      'Não ensinar o que não se vive minimamente.',
    ],
    requirements: ['Formação doutrinal.', 'Fidelidade ao Magistério e ao pároco.'],
  },
  {
    id: 'exortacao',
    name: 'Exortação',
    scripture: ['Rm 12, 8', '1Ts 2, 11-12', 'Hb 3, 13'],
    summary: 'Encorajar e corrigir com firmeza e ternura, no tempo certo.',
    body: `É o carisma de quem sabe dizer a verdade difícil sem destruir a pessoa. A exortação cristã tem um alvo: que o outro se levante, não que se envergonhe.

Na vida de grupo, esse carisma é precioso e perigoso. Precioso porque sem ele tudo se acomoda; perigoso porque, sem caridade, ele fere.`,
    purpose: 'Manter a comunidade desperta e corrigir o que adoece.',
    magisterium: ['Mt 18, 15-17', 'CIC 1829'],
    cautions: [
      'Nunca corrigir em público o que deve ser tratado em particular (Mt 18, 15).',
      'Nunca exortar quando o próprio estado é de raiva.',
    ],
    requirements: ['Vínculo real com a pessoa.', 'Caridade verificável no modo de falar.'],
  },
  {
    id: 'generosidade',
    name: 'Generosidade / repartir',
    scripture: ['Rm 12, 8', '2Cor 9, 6-9', 'At 4, 32-35'],
    summary: 'Dar com simplicidade, sem calcular e sem alarde.',
    body: `A tradição carismática nem sempre dá a este carisma o peso que ele tem. Mas a primeira comunidade cristã se caracterizava por repartir (At 4, 32-35), e São Paulo o lista entre os carismas (Rm 12, 8).

Generosidade não é apenas dinheiro: é tempo, atenção, casa, escuta. E sua marca é a simplicidade — quem calcula o retorno não repartiu.`,
    purpose: 'Tornar visível a providência de Deus no cuidado concreto entre irmãos.',
    magisterium: ['CIC 2402-2406', 'Rm 12, 8'],
    cautions: [
      'Dar não substitui justiça nem compromisso social.',
      'Não usar a doação como forma de influência sobre decisões da comunidade.',
    ],
    requirements: ['Discrição.', 'Prudência com as próprias obrigações.'],
  },
  {
    id: 'governo',
    name: 'Governo / presidir',
    scripture: ['Rm 12, 8', '1Cor 12, 28', '1Pd 5, 1-4'],
    summary: 'Coordenar com solicitude, servindo e não dominando.',
    body: `O carisma de presidir é a graça de conduzir pessoas sem usá-las. Pedro define o estilo sem ambiguidade: pastorear não por constrangimento nem por interesse, mas de boa vontade; não como dominadores, mas como modelos (1Pd 5, 2-3).

Na RCC, esse carisma se exerce na coordenação de grupos e ministérios. A CNBB faz uma recomendação importante: evitar usar termos consagrados da linguagem da Igreja com significado diferente, como "pastor" e "pastoreio" (Doc. 53, n. 29). Coordenar é servir — não é ser hierarquia.`,
    purpose: 'Manter a comunidade unida, organizada e fiel à sua identidade.',
    magisterium: ['1Pd 5, 1-4', 'CNBB 53, n. 29', 'CIC 874-896 (hierarquia)'],
    cautions: [
      'Não confundir coordenação com autoridade hierárquica.',
      'Não confundir "pastoreio" usado na RCC com o múnus pastoral dos sacerdotes.',
    ],
    requirements: [
      'Formação e discernimento pela comunidade.',
      'Comunhão com o pároco e a diocese.',
    ],
  },
  {
    id: 'acolhida',
    name: 'Acolhida',
    scripture: ['Rm 15, 7', 'Rm 12, 13', 'Hb 13, 2', 'Lc 1, 39-42'],
    summary: 'A graça de fazer o outro se sentir esperado e pertencente.',
    body: `Acolher não é receber com cortesia: é criar pertença. A RCC costuma descrever esse serviço a partir da visita de Maria a Isabel — alguém que chega e alegra a casa.

Um carisma discreto e decisivo: a maioria das pessoas que não voltam ao grupo de oração não sai por discordar da pregação. Sai porque ninguém notou que ela estava ali.`,
    purpose: 'Abrir espaço para que o novo se sinta parte do corpo.',
    magisterium: ['Rm 15, 7', 'CNBB 53, n. 24 (participação na vida da Igreja)'],
    cautions: [
      'Não transformar acolhida em abordagem insistente.',
      'Não prometer o que a comunidade não pode oferecer.',
    ],
    requirements: ['Presença constante e atenção real às pessoas.'],
  },
  {
    id: 'intercessao',
    name: 'Intercessão',
    scripture: ['1Tm 2, 1-4', 'Rm 15, 30-32', 'Ez 22, 30', 'Lc 18, 1-8'],
    summary: 'Pôr-se na brecha pelos outros, sustentando a comunidade na oração.',
    body: `Interceder é literalmente "pôr-se entre". É o carisma de quem carrega na oração o peso que os outros não conseguem carregar — e que quase nunca aparece.

A CNBB recomenda a prática do jejum e da adoração como sustento dessa oração (Doc. 53). O intercessor aprende a persistir sem exigir resultados e a confiar que Deus ouve mesmo quando não responde no tempo esperado.`,
    purpose: 'Sustentar espiritualmente as pessoas, os projetos e a missão da comunidade.',
    magisterium: ['CIC 2634-2636', '1Tm 2, 1-4'],
    cautions: [
      'Não transformar em ansiedade nem em responsabilidade pelo resultado.',
      'Guardar sigilo absoluto sobre o que lhe é confiado.',
    ],
    requirements: ['Vida sacramental regular.', 'Discrição e perseverança.'],
  },
];

export const carismOfServiceIds = ['servico', 'ensino', 'exortacao', 'generosidade', 'governo', 'acolhida', 'intercessao'];
