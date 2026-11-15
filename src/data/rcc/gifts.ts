import type { FruitOfTheSpirit, GiftOfTheSpirit } from '../../types/rcc';

/**
 * Os sete dons do Espírito Santo (Is 11, 2-3).
 *
 * Distinção que o SOPRO mantém com rigor: estes são dons INFUSOS, disposições
 * permanentes que acompanham a graça santificante e aperfeiçoam as virtudes.
 * Não são os carismas de 1Cor 12, que são graças dadas para o bem comum e para
 * uma necessidade concreta.
 *
 * Textos escritos para o SOPRO; as referências ao Catecismo são indicações de
 * estudo, não citações literais.
 */
export const giftsInfused: GiftOfTheSpirit[] = [
  {
    id: 'sabedoria',
    name: 'Sabedoria',
    latin: 'Sapientia',
    summary:
      'Gosto pelas coisas de Deus: julgar a vida a partir dele, e não apenas conhecê-lo por informação.',
    body: `A sabedoria não é inteligência acima da média nem cultura teológica. É o dom que faz a pessoa saborear Deus — reconhecer, com o coração iluminado, o que conduz à comunhão com ele e o que afasta.

Por isso ela ordena todos os outros dons: sem sabedoria, o conhecimento se torna orgulho, a fortaleza se torna dureza e o conselho se torna manipulação. O sábio, na linguagem bíblica, não é o mais instruído: é aquele que construiu a casa sobre a rocha (Mt 7, 24-25).

Na vida prática, a sabedoria aparece menos em respostas brilhantes e mais em decisões coerentes: escolher o que é pequeno, calar quando seria mais fácil vencer uma discussão, perceber que determinada oportunidade, embora boa, não é para agora.`,
    scripture: ['Is 11, 2', 'Sb 7, 7', 'Tg 3, 13-17', 'Mt 7, 24-25'],
    magisterium: ['CIC 1831', 'CIC 1803-1804 (virtude da prudência)'],
    signs: [
      'Reconhece com facilidade o que aproxima e o que afasta de Deus.',
      'Prefere a fidelidade escondida ao reconhecimento público.',
      'Sabe esperar; não precisa resolver tudo imediatamente.',
      'Diante de uma decisão, pergunta primeiro "para onde isso me leva?" e não "o que isso me rende?".',
    ],
    misreadings: [
      'Não é erudição nem capacidade de citar autores espirituais.',
      'Não é o mesmo que prudência humana, embora a aperfeiçoe.',
      'Não garante acerto em decisões técnicas, financeiras ou de saúde.',
    ],
    practice:
      'Uma vez por semana, reveja uma decisão concreta e pergunte: isso me aproximou ou me afastou de Deus e das pessoas que ele me confiou?',
  },
  {
    id: 'entendimento',
    name: 'Entendimento',
    latin: 'Intellectus',
    summary:
      'Penetrar o sentido da fé: compreender a Escritura, a doutrina e a própria história à luz de Deus.',
    body: `O entendimento não acrescenta informações novas: aprofunda o que já foi revelado. É a diferença entre ler uma passagem do Evangelho e perceber que ela está falando de mim, agora, sem que o texto tenha mudado.

O próprio Cristo prometeu esse dom ao dizer que o Espírito nos conduziria à verdade inteira (Jo 16, 13). Ele não dispensa o estudo: supõe-no e o ultrapassa. Por isso a Igreja insiste que a interpretação da Escritura pertence ao Magistério e não ao gosto pessoal (CNBB 53, sobre o intimismo bíblico).

Sua ausência produz uma fé de superfície — devota e sincera, mas sem raiz, que se abala ao primeiro questionamento.`,
    scripture: ['Is 11, 2', 'Jo 16, 13', 'Ef 1, 17-18', 'Lc 24, 45'],
    magisterium: ['CIC 1831', 'CIC 108-114 (sentidos da Escritura)'],
    signs: [
      'Percebe conexões entre passagens distantes da Escritura.',
      'Escuta a Palavra e reconhece nela uma palavra dirigida a si.',
      'Não se escandaliza com perguntas difíceis; busca entender.',
      'Consegue explicar a fé sem simplificar até a distorção.',
    ],
    misreadings: [
      'Não é receber revelações novas nem "interpretações inéditas".',
      'Não autoriza leitura subjetiva ou mágica do texto sagrado.',
      'Não substitui a formação doutrinal séria.',
    ],
    practice:
      'Na próxima leitura orante, pare em uma palavra que chamou sua atenção e permaneça nela por cinco minutos sem avançar no texto.',
  },
  {
    id: 'conselho',
    name: 'Conselho',
    latin: 'Consilium',
    summary:
      'Discernir o que fazer aqui e agora — e ajudar os outros a discernir — sobretudo no que é difícil.',
    body: `O conselho é o dom da decisão prudente em situação concreta. Ele não responde "o que é verdade em geral", mas "o que devo fazer hoje, com estas pessoas, nestas circunstâncias".

Santo Tomás o associa ao ato de aconselhar-se bem — incluindo a humildade de pedir conselho. Quem tem esse dom costuma ser procurado por outros, não porque tenha respostas prontas, mas porque ajuda a clarear o caminho sem decidir pela pessoa.

Na espiritualidade carismática, é preciso não confundi-lo com a "palavra de conselho" dada em oração por alguém sobre a sua vida. O dom é uma disposição estável; a palavra é uma moção concreta que precisa ser discernida pela própria pessoa e sempre verificada.`,
    scripture: ['Is 11, 2', 'Sl 32, 8', 'Tg 1, 5', 'Pr 15, 22'],
    magisterium: ['CIC 1831', 'CIC 1776-1785 (discernimento da consciência)'],
    signs: [
      'Diante de um impasse, percebe qual caminho é o mais conforme o Evangelho.',
      'Ajuda outros a decidir sem impor sua vontade.',
      'Sabe reconhecer quando não sabe e buscar quem saiba.',
      'Reconhece o próprio limite e pede direção espiritual.',
    ],
    misreadings: [
      'Não é dar ordens sobre a vida alheia.',
      'Não é ser "o conselheiro" do grupo — ninguém é dono do discernimento de outro.',
      'Não confundir com o carisma de conselho/governo ligado a um serviço eclesial.',
    ],
    practice:
      'Antes de dar um conselho a alguém, pergunte primeiro: "o que você já percebeu sobre isso?" — e escute até o fim.',
  },
  {
    id: 'fortaleza',
    name: 'Fortaleza',
    latin: 'Fortitudo',
    summary:
      'Perseverar no bem quando custa caro, sem se tornar duro nem insensível.',
    body: `A fortaleza é a firmeza que sustenta o bem no sofrimento. Não elimina o medo: permite agir apesar dele. O próprio Jesus no Getsêmani sentiu angústia e pediu que o cálice passasse — e permaneceu fiel.

Aqui é preciso desfazer um mal-entendido frequente na vida carismática: fortaleza não é euforia. Não se mede pela intensidade da emoção durante a oração, mas pela constância nos dias secos, quando nenhum canto anima e nenhuma experiência sustenta.

Ela também tem um limite: a fortaleza não é teimosia. Perseverar no bem é diferente de insistir em uma decisão que o discernimento já mostrou errada.`,
    scripture: ['Is 11, 2', 'Js 1, 9', 'Ef 6, 10-11', 'Lc 22, 42-44'],
    magisterium: ['CIC 1831', 'CIC 1808 (virtude da fortaleza)'],
    signs: [
      'Continua na rotina de oração mesmo sem sentir nada.',
      'Suporta contrariedades sem descontar nos outros.',
      'Assume compromissos e os cumpre quando a novidade passa.',
      'Não foge de conversas difíceis que precisam acontecer.',
    ],
    misreadings: [
      'Não é insensibilidade nem dureza consigo mesmo.',
      'Não é aguentar tudo calado — o silêncio que adoece não é virtude.',
      'Não é euforia em momentos de louvor.',
    ],
    practice:
      'Identifique um compromisso que você assumiu e abandonou quando perdeu o entusiasmo. Retome-o por quatro semanas, na medida do possível.',
  },
  {
    id: 'ciencia',
    name: 'Ciência',
    latin: 'Scientia',
    summary:
      'Julgar corretamente as coisas criadas: reconhecer seu valor real, sem absolutizá-las nem desprezá-las.',
    body: `A ciência, como dom do Espírito, não é o conhecimento científico. É a capacidade de ver o mundo como ele é diante de Deus: criatura, não criador.

Isso tem consequências muito concretas. O trabalho é bom, mas não salva. A saúde é dom, mas não é o sentido da vida. O afeto é precioso, mas não pode ocupar o lugar de Deus. Quem recebe esse dom não despreza nada: reordena tudo.

Na prática pastoral, essa é uma das maiores necessidades da vida carismática — porque é fácil transformar uma experiência forte em absoluto, ou uma devoção em medida de todas as coisas.`,
    scripture: ['Is 11, 2', 'Rm 1, 20', 'Fl 3, 8', 'Ecl 1, 2-3'],
    magisterium: ['CIC 1831', 'CIC 302-314 (providência e uso dos bens)'],
    signs: [
      'Usa as coisas sem se deixar possuir por elas.',
      'Não trata prosperidade, saúde ou sucesso como sinal de aprovação divina.',
      'Reconhece o limite do próprio saber técnico.',
      'Aprecia o mundo criado sem se confundir com ele.',
    ],
    misreadings: [
      'Não é conhecimento científico nem cultura acadêmica.',
      'Não é desprezo pelo mundo material — a criação é boa (Gn 1, 31).',
      'Não confundir com a palavra de ciência (1Cor 12, 8), que é uma moção concreta.',
    ],
    practice:
      'Escolha uma área em que você está investindo muito — trabalho, aparência, redes sociais. Pergunte honestamente que lugar ela ocupa no seu dia e no seu coração.',
  },
  {
    id: 'piedade',
    name: 'Piedade',
    latin: 'Pietas',
    summary:
      'Afeto filial por Deus e compaixão concreta pelos irmãos — a devoção que se torna ternura.',
    body: `A piedade é a devoção que não fica na sacristia. Ela produz intimidade com Deus como Pai (Rm 8, 15) e, exatamente por isso, não pode coexistir com a indiferença diante do sofrimento alheio.

O apóstolo João estabelece a medida sem meias palavras: quem não ama o irmão que vê, não ama o Deus que não vê (1Jo 4, 20). Na tradição carismática, esse é um critério prático de verificação: se a experiência do Espírito não aumenta a paciência em casa, o cuidado com o doente e a atenção com quem ninguém nota, há algo a discernir.

A piedade não é sentimentalismo. Há muita emoção em oração sem piedade alguma — e há piedade profunda em quem reza com rosto seco e cumpre o que lhe cabe.`,
    scripture: ['Is 11, 3', 'Rm 8, 15', '1Jo 4, 20', '1Ts 2, 7-8'],
    magisterium: ['CIC 1831', 'CIC 2697-2699 (formas de oração)'],
    signs: [
      'Trata Deus como Pai, com confiança e sem servilismo.',
      'Repara em quem está só e faz algo concreto, sem plateia.',
      'Reza pelos outros sem esperar retorno.',
      'Chora com quem chora — e depois ajuda a resolver.',
    ],
    misreadings: [
      'Não é emotividade religiosa nem lágrimas durante o louvor.',
      'Não é cumprir práticas para evitar culpa.',
      'Não substitui a caridade concreta com quem sofre.',
    ],
    practice:
      'Faça uma visita ou um contato por semana com alguém que está sozinho ou doente. Sem contar a ninguém.',
  },
  {
    id: 'temor-de-deus',
    name: 'Temor de Deus',
    latin: 'Timor',
    summary:
      'Reverência filial: reconhecer a grandeza de Deus e recusar o mal por amor, não por medo do castigo.',
    body: `Nada mais mal compreendido. O temor de Deus não é medo servil de quem espera punição — esse é imperfeito e precisa ser purificado. É o temor filial: a admiração reverente que faz a pessoa não querer machucar o que ama.

O Catecismo o descreve como o dom que nos faz temer a separação de Deus mais do que qualquer sofrimento (CIC 1836). É, paradoxalmente, o dom da liberdade: quem não teme perder o amor de Deus acaba temendo tudo o mais — a opinião dos outros, o fracasso, a doença, a morte.

É também o início da sabedoria (Sl 111, 10), não o seu fim. Um cristão maduro não deixa de temer a Deus; deixa de ter medo dele.`,
    scripture: ['Is 11, 3', 'Sl 111, 10', '2Cor 7, 1', '1Jo 4, 18'],
    magisterium: ['CIC 1836', 'CIC 1804-1806', 'CIC 2095-2097 (virtude da religião)'],
    signs: [
      'Recusa o mal ainda que ninguém veja.',
      'Age com reverência na liturgia e no trato com o sagrado.',
      'Não usa Deus como meio para obter vantagens.',
      'Sente mais temor de se afastar de Deus do que de perder coisas.',
    ],
    misreadings: [
      'Não é medo servil nem imagem de um Deus vingativo.',
      'Não é escrúpulo nem angústia permanente com o pecado.',
      'Não é o oposto da confiança filial — caminham juntos.',
    ],
    practice:
      'Ao examinar o dia, troque a pergunta "o que eu arrisco perder?" por "de quem eu me afastei hoje?"',
  },
];

/**
 * Os doze frutos do Espírito (Gl 5, 22-23).
 *
 * O Catecismo apresenta doze (CIC 1832), somando a tradição da Vulgata. São o
 * critério prático mais seguro de discernimento: carisma autêntico produz
 * fruto — e fruto se vê na vida cotidiana, não na intensidade da experiência.
 */
export const fruitsOfTheSpirit: FruitOfTheSpirit[] = [
  {
    id: 'caridade',
    name: 'Caridade',
    summary: 'Amar sem exigir retorno, inclusive quem não retribui.',
    inDailyLife:
      'Fazer o bem a alguém que não vai saber, ou perdoar uma dívida pequena sem mencioná-la.',
  },
  {
    id: 'alegria',
    name: 'Alegria',
    summary: 'Contentamento que não depende das circunstâncias.',
    inDailyLife:
      'Continuar gentil em um dia ruim; não precisar que o outro perceba o quanto você está cansado.',
  },
  {
    id: 'paz',
    name: 'Paz',
    summary: 'Serenidade interior que permite conviver com o que não está resolvido.',
    inDailyLife: 'Dormir sem ter a resposta pronta. Não precisar controlar tudo.',
  },
  {
    id: 'paciencia',
    name: 'Paciência',
    summary: 'Suportar o outro e a si mesmo sem violência.',
    inDailyLife: 'Ouvir a mesma reclamação sem revidar; esperar sem punir quem está atrasado.',
  },
  {
    id: 'benignidade',
    name: 'Benignidade (bondade)',
    summary: 'Tratar bem por hábito, e não por ocasião.',
    inDailyLife: 'Ser gentil com quem atende no telefone; agradecer de verdade.',
  },
  {
    id: 'bondade',
    name: 'Bondade (generosidade)',
    summary: 'Dar do que se tem, inclusive do próprio tempo.',
    inDailyLife: 'Dar o melhor lugar, o melhor pedaço, a melhor hora do dia.',
  },
  {
    id: 'longanimidade',
    name: 'Longanimidade',
    summary: 'A generosidade de quem não desiste do outro.',
    inDailyLife: 'Voltar a ajudar alguém que já falhou várias vezes.',
  },
  {
    id: 'mansidao',
    name: 'Mansidão',
    summary: 'Força que não precisa ferir para vencer.',
    inDailyLife: 'Ter razão e não usar isso como arma.',
  },
  {
    id: 'fe',
    name: 'Fé',
    summary: 'Fidelidade que permanece quando a evidência não sustenta.',
    inDailyLife: 'Rezar quando não se sente nada; confiar sem garantias.',
  },
  {
    id: 'modestia',
    name: 'Modéstia',
    summary: 'Não precisar ser visto para se sentir existindo.',
    inDailyLife: 'Deixar a conversa girar em torno de outro; não mencionar o próprio feito.',
  },
  {
    id: 'continencia',
    name: 'Continência',
    summary: 'Domínio de si sem rigidez, para ser livre para o outro.',
    inDailyLife: 'Não dizer tudo o que se pensa; escolher o que fazer com um impulso.',
  },
  {
    id: 'castidade',
    name: 'Castidade',
    summary: 'Integração do desejo na lógica do dom e não do consumo.',
    inDailyLife: 'Tratar as pessoas como pessoas, não como possibilidades.',
  },
];
