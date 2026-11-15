import type { Prayer, PrayerCategory } from '../types/prayer';

/**
 * Biblioteca inicial de orações.
 *
 * Sobre direitos: os textos aqui são formulações tradicionais da Igreja,
 * em domínio público (orações do Pai-Nosso, Ave-Maria, Credo, Salve-Rainha,
 * Vinde Espírito Santo, Anjo da Guarda, entre outras, em uso há séculos).
 * Nenhum texto de autor contemporâneo, editora ou subsídio litúrgico
 * protegido é reproduzido nesta biblioteca.
 *
 * Ver `docs/conteudo.md` para a política editorial.
 */

export const prayerCategories: PrayerCategory[] = [
  {
    id: 'manha',
    title: 'Orações da manhã',
    description: 'Para começar o dia oferecendo a Deus o que está por vir.',
    icon: 'sunrise',
  },
  {
    id: 'noite',
    title: 'Orações da noite',
    description: 'Para encerrar o dia em ação de graças e confiança.',
    icon: 'moon',
  },
  {
    id: 'espirito-santo',
    title: 'Orações ao Espírito Santo',
    description: 'Invocação, sequência e pedido dos dons.',
    icon: 'flame',
  },
  {
    id: 'tradicionais',
    title: 'Orações tradicionais',
    description: 'As orações fundamentais da vida cristã.',
    icon: 'cross',
  },
  {
    id: 'rosario',
    title: 'Rosário',
    description: 'Como rezar o Rosário e os mistérios de cada dia.',
    icon: 'circle-dot',
  },
  {
    id: 'terco',
    title: 'Terço tradicional',
    description: 'A experiência guiada do Terço, passo a passo.',
    icon: 'circle-dashed',
  },
  {
    id: 'terco-espirito-santo',
    title: 'Terço do Espírito Santo',
    description: 'Coroa com sete grupos de sete contas, dedicada aos dons.',
    icon: 'wind',
  },
  {
    id: 'novenas',
    title: 'Novenas',
    description: 'Preparação de nove dias para festas e intenções.',
    icon: 'calendar-days',
  },
  {
    id: 'adoracao',
    title: 'Adoração eucarística',
    description: 'Orações diante do Santíssimo Sacramento.',
    icon: 'sparkles',
  },
  {
    id: 'exame',
    title: 'Exame de consciência',
    description: 'Revisão serena do dia diante de Deus.',
    icon: 'search',
  },
  {
    id: 'pelos-outros',
    title: 'Orações pelos outros',
    description: 'Intercessão por familiares, doentes e falecidos.',
    icon: 'heart-handshake',
  },
];

export const prayers: Prayer[] = [
  // ---------------------------------------------------------------------
  // Tradicionais
  // ---------------------------------------------------------------------
  {
    id: 'pai-nosso',
    title: 'Pai-Nosso',
    category: 'tradicionais',
    summary: 'A oração que o próprio Jesus ensinou aos discípulos.',
    body: `Pai nosso que estais nos céus,
santificado seja o vosso nome;
venha a nós o vosso reino;
seja feita a vossa vontade,
assim na terra como no céu.

O pão nosso de cada dia nos dai hoje;
perdoai-nos as nossas ofensas,
assim como nós perdoamos a quem nos tem ofendido;
e não nos deixeis cair em tentação,
mas livrai-nos do mal.

Amém.`,
    attribution: 'Mt 6, 9-13 · fórmula tradicional em português',
    scripture: ['Mt 6, 9-13', 'Lc 11, 2-4'],
    tags: ['fundamental', 'bíblia'],
    suggestedMoment: 'qualquer',
  },
  {
    id: 'ave-maria',
    title: 'Ave-Maria',
    category: 'tradicionais',
    summary: 'Saudação do anjo Gabriel e louvor a Maria, Mãe de Deus.',
    body: `Ave, Maria, cheia de graça, o Senhor é convosco.
Bendita sois vós entre as mulheres
e bendito é o fruto do vosso ventre, Jesus.

Santa Maria, Mãe de Deus,
rogai por nós, pecadores,
agora e na hora da nossa morte.

Amém.`,
    attribution: 'Lc 1, 28. 42 · fórmula tradicional',
    scripture: ['Lc 1, 28', 'Lc 1, 42'],
    tags: ['fundamental', 'mariano'],
    suggestedMoment: 'qualquer',
  },
  {
    id: 'gloria',
    title: 'Glória ao Pai',
    category: 'tradicionais',
    summary: 'Doxologia trinitária rezada no início e no fim de muitas orações.',
    body: `Glória ao Pai, ao Filho e ao Espírito Santo,
como era no princípio, agora e sempre.

Amém.`,
    attribution: 'Doxologia tradicional',
    scripture: [],
    tags: ['fundamental', 'trindade'],
    suggestedMoment: 'qualquer',
  },
  {
    id: 'credo-apostolos',
    title: 'Creio (Símbolo dos Apóstolos)',
    category: 'tradicionais',
    summary: 'A profissão de fé baptismal da Igreja.',
    body: `Creio em Deus Pai todo-poderoso,
criador do céu e da terra.
E em Jesus Cristo, seu único Filho, nosso Senhor,
que foi concebido pelo poder do Espírito Santo,
nasceu da Virgem Maria,
padeceu sob Pôncio Pilatos,
foi crucificado, morto e sepultado;
desceu à mansão dos mortos;
ressuscitou ao terceiro dia;
subiu aos céus,
está sentado à direita de Deus Pai todo-poderoso,
donde há de vir a julgar os vivos e os mortos.

Creio no Espírito Santo,
na santa Igreja católica,
na comunhão dos santos,
na remissão dos pecados,
na ressurreição da carne,
na vida eterna.

Amém.`,
    attribution: 'Símbolo dos Apóstolos · fórmula tradicional',
    scripture: [],
    tags: ['fundamental', 'fé'],
    suggestedMoment: 'qualquer',
  },
  {
    id: 'salve-rainha',
    title: 'Salve-Rainha',
    category: 'tradicionais',
    summary: 'Oração mariana milenar, rezada ao fim da Liturgia das Horas e do Rosário.',
    body: `Salve, Rainha, Mãe de misericórdia,
vida, doçura e esperança nossa, salve!
A vós clamamos, os degredados filhos de Eva.
A vós suspiramos, gemendo e chorando neste vale de lágrimas.
Eia, pois, advogada nossa,
esses vossos olhos misericordiosos a nós volvei,
e depois deste desterro,
mostrai-nos Jesus, bendito fruto do vosso ventre,
ó clemente, ó piedosa, ó doce sempre Virgem Maria. Amém.

Rogai por nós, santa Mãe de Deus,
para que sejamos dignos das promessas de Cristo. Amém.`,
    attribution: 'Antífona mariana tradicional',
    scripture: [],
    tags: ['mariano'],
    suggestedMoment: 'noite',
  },
  {
    id: 'santo-anjo',
    title: 'Santo Anjo do Senhor',
    category: 'tradicionais',
    summary: 'Oração ao anjo da guarda.',
    body: `Santo Anjo do Senhor,
meu zeloso guardador,
se a ti me confiou a piedade divina,
sempre me rege, me guarda, me governa, me ilumina.

Amém.`,
    attribution: 'Oração tradicional ao anjo da guarda',
    scripture: ['Sl 91, 11', 'Mt 18, 10'],
    tags: ['anjo-da-guarda', 'proteção'],
    suggestedMoment: 'manha',
  },
  {
    id: 'sao-miguel',
    title: 'Oração a São Miguel Arcanjo',
    category: 'tradicionais',
    summary: 'Pedido de proteção contra o mal, na formulação tradicional.',
    body: `São Miguel Arcanjo, defendei-nos no combate,
sede o nosso refúgio contra as maldades e ciladas do demônio.
Que Deus manifeste sobre ele o seu poder, é o que humildemente pedimos.
E vós, ó Príncipe da milícia celeste,
com o poder que Deus vos conferiu,
precipitai no inferno a Satanás e aos outros espíritos malignos
que vagueiam pelo mundo para perdição das almas.

Amém.`,
    attribution: 'Oração tradicional a São Miguel',
    scripture: ['Ap 12, 7-9'],
    tags: ['proteção', 'santos'],
    suggestedMoment: 'qualquer',
  },
  {
    id: 'ato-contricao',
    title: 'Ato de contrição',
    category: 'tradicionais',
    summary: 'Pedido de perdão com arrependimento sincero.',
    body: `Meu Deus, eu me arrependo de todo o coração
de todos os meus pecados
e os detesto, porque pecando mereci
os castigos estabelecidos por vossa justiça.
Mas, sobretudo, me arrependo por vos ofender,
a vós, sumo bem e digno de amor sobre todas as coisas.
Proponho firmemente, com o auxílio da vossa graça,
fugir das ocasiões de pecado e fazer penitência.

Senhor, tende piedade de mim, pelos méritos da paixão,
morte e ressurreição de vosso Filho, nosso Senhor.

Amém.`,
    attribution: 'Fórmula tradicional do ato de contrição',
    scripture: ['Lc 18, 13', '1Jo 1, 9'],
    tags: ['confissão', 'perdão'],
    suggestedMoment: 'qualquer',
  },
  {
    id: 'ato-fe-esperanca-caridade',
    title: 'Atos de fé, esperança e caridade',
    category: 'tradicionais',
    summary: 'As três virtudes teologais, em oração.',
    body: `Meu Deus, creio firmemente em tudo quanto revelastes
e a santa Igreja nos propõe crer, porque sois a própria verdade.

Meu Deus, espero, pela vossa bondade e pelos méritos de Jesus Cristo,
a vida eterna e as graças necessárias para a alcançar,
porque prometestes e sois fiel.

Meu Deus, amo-vos sobre todas as coisas
e amo o meu próximo como a mim mesmo por amor de vós.

Amém.`,
    attribution: 'Formulação tradicional dos atos de fé, esperança e caridade',
    scripture: ['Hb 11, 1', '1Cor 13, 13'],
    tags: ['virtudes'],
    suggestedMoment: 'qualquer',
  },

  // ---------------------------------------------------------------------
  // Manhã
  // ---------------------------------------------------------------------
  {
    id: 'oferecimento-manha',
    title: 'Oferecimento do dia',
    category: 'manha',
    summary: 'Entregar a Deus o dia que começa.',
    body: `Senhor, Deus todo-poderoso,
eu vos ofereço este dia:
o trabalho, o descanso, as alegrias e as dificuldades.
Que tudo o que eu fizer seja para a vossa glória
e para o bem dos irmãos.

Dai-me atenção para reconhecer a vossa presença,
paciência nas contrariedades
e um coração disponível para servir.

Pai nosso, Ave-Maria e Glória ao Pai.`,
    attribution: 'Oração de oferecimento do dia · formulação própria do SOPRO',
    scripture: ['Rm 12, 1'],
    tags: ['manhã', 'oferecimento'],
    suggestedMoment: 'manha',
  },
  {
    id: 'laudes-simples',
    title: 'Louvor da manhã',
    category: 'manha',
    summary: 'Abençoar o Senhor ao amanhecer, como no salmo.',
    body: `Ao despertar, eu vos bendigo, Senhor.
Que a vossa misericórdia me acompanhe neste dia
e que a vossa fidelidade seja a minha segurança.

Que eu não caminhe sozinho:
vinde comigo nas estradas de hoje.
Aumentai em mim o desejo do bem
e a prontidão para perdoar.

Em nome do Pai, do Filho e do Espírito Santo. Amém.`,
    attribution: 'Inspirada no Sl 17, 8-9 · formulação própria do SOPRO',
    scripture: ['Sl 17, 8-9', 'Lam 3, 22-23'],
    tags: ['manhã', 'louvor'],
    suggestedMoment: 'manha',
  },
  {
    id: 'entrega-do-dia-providencia',
    title: 'Entrega do dia à providência',
    category: 'manha',
    summary: 'Confiar o dia ao cuidado de Deus, sem ansiedade.',
    body: `Senhor, o dia está diante de mim
com tudo o que eu já conheço e com o que não prevejo.
Ponho nas vossas mãos o que sei e o que temo.

Dai-me o necessário para fazer bem o meu dever,
e a humildade de aceitar o que não depende de mim.
Que a ansiedade não governe as minhas decisões,
e que a paz que vem de vós esteja no meu coração.

Amém.`,
    attribution: 'Formulação própria do SOPRO',
    scripture: ['Mt 6, 25-34', '1Pd 5, 7'],
    tags: ['manhã', 'providência'],
    suggestedMoment: 'manha',
  },

  // ---------------------------------------------------------------------
  // Noite
  // ---------------------------------------------------------------------
  {
    id: 'acao-gracas-noite',
    title: 'Ação de graças da noite',
    category: 'noite',
    summary: 'Reconhecer os cuidados de Deus no dia que termina.',
    body: `Senhor, antes de dormir, eu vos agradeço.
Pelos dons que pude perceber
e por aqueles que deixei passar sem perceber.
Pelas pessoas que me quiseram bem
e pelas que me ensinaram algo hoje.

Obrigado pelas forças que tive
e pelo descanso que agora busco.
Renove em mim a esperança para o dia de amanhã.

Em nome do Pai, do Filho e do Espírito Santo. Amém.`,
    attribution: 'Formulação própria do SOPRO',
    scripture: ['1Ts 5, 16-18', 'Col 3, 15'],
    tags: ['noite', 'gratidão'],
    suggestedMoment: 'noite',
  },
  {
    id: 'protecao-noite',
    title: 'Oração de proteção para dormir',
    category: 'noite',
    summary: 'Pedir o repouso seguro e o cuidado de Deus.',
    body: `Senhor, eu me deito em vossas mãos.
Guardai o meu sono, a minha casa e os que amo.
Se algum medo me visitar durante a noite,
lembrai-me de que estais perto.

Que o descanso restaure o meu corpo
e que a vossa paz restaure o meu coração.
Amanhã recomeçaremos, com a vossa graça.

Amém.`,
    attribution: 'Formulação própria do SOPRO',
    scripture: ['Sl 4, 9', 'Sl 127, 2'],
    tags: ['noite', 'proteção'],
    suggestedMoment: 'noite',
  },
  {
    id: 'nunc-dimittis',
    title: 'Nunc dimittis (Cântico de Simeão)',
    category: 'noite',
    summary: 'Cântico da Liturgia das Horas rezado na completas.',
    body: `Agora, Senhor, conforme a vossa palavra,
deixai que o vosso servo se vá em paz,
porque os meus olhos viram a vossa salvação,
que preparastes diante de todos os povos:
luz para iluminar as nações
e glória do vosso povo de Israel.

Glória ao Pai, ao Filho e ao Espírito Santo,
como era no princípio, agora e sempre. Amém.`,
    attribution: 'Lc 2, 29-32 · texto bíblico',
    scripture: ['Lc 2, 29-32'],
    tags: ['noite', 'bíblia'],
    suggestedMoment: 'noite',
  },
  {
    id: 'magnificat',
    title: 'Magnificat',
    category: 'noite',
    summary: 'O cântico de Maria.',
    body: `A minha alma engrandece o Senhor,
e o meu espírito se alegra em Deus, meu Salvador,
porque olhou para a humildade de sua serva.
Desde agora todas as gerações me chamarão bem-aventurada,
porque me fez grandes coisas o Todo-Poderoso,
e santo é o seu nome.

A sua misericórdia se estende de geração em geração
sobre aqueles que o temem.
Manifestou o poder do seu braço
e dispersou os soberbos.
Derrubou os poderosos de seus tronos
e exaltou os humildes.
Aos famintos encheu de bens
e aos ricos despediu de mãos vazias.

Acolheu Israel, seu servo,
lembrado de sua misericórdia,
como havia prometido a nossos pais,
em favor de Abraão e de sua descendência, para sempre.

Glória ao Pai, ao Filho e ao Espírito Santo. Amém.`,
    attribution: 'Lc 1, 46-55 · texto bíblico',
    scripture: ['Lc 1, 46-55'],
    tags: ['mariano', 'bíblia', 'noite'],
    suggestedMoment: 'noite',
  },

  // ---------------------------------------------------------------------
  // Espírito Santo
  // ---------------------------------------------------------------------
  {
    id: 'vinde-espirito-santo',
    title: 'Vinde, Espírito Santo',
    category: 'espirito-santo',
    summary: 'A invocação mais antiga e difundida ao Espírito.',
    body: `Vinde, Espírito Santo,
enchei os corações dos vossos fiéis
e acendei neles o fogo do vosso amor.

Enviai o vosso Espírito e tudo será criado,
e renovareis a face da terra.

Oremos: ó Deus, que instruístes os corações dos vossos fiéis
com a luz do Espírito Santo,
fazei que apreciemos retamente todas as coisas
segundo o mesmo Espírito
e gozemos sempre da sua consolação.
Por Cristo, Senhor nosso.

Amém.`,
    attribution: 'Antífona e coleta tradicionais ao Espírito Santo',
    scripture: ['Jo 14, 26', 'At 2, 1-4', 'Sl 103, 30'],
    tags: ['espírito-santo', 'fundamental'],
    suggestedMoment: 'qualquer',
  },
  {
    id: 'sequencia-pentecostes',
    title: 'Sequência de Pentecostes (Veni Sancte Spiritus)',
    category: 'espirito-santo',
    summary: 'Hino tradicional cantado na solenidade de Pentecostes.',
    body: `Vinde, Espírito Santo,
e enviai dos céus um raio da vossa luz.

Vinde, pai dos pobres,
vinde, dispensador dos dons,
vinde, luz dos corações.

Consolador excelente,
hóspede suave da alma,
refrigério verdadeiro.

No trabalho, repouso;
no calor, alívio;
no pranto, consolação.

Ó luz beatíssima,
enchei o íntimo dos corações dos vossos fiéis.

Sem o vosso auxílio, nada há no homem,
nada há que seja puro.

Lavai o que está sujo,
regai o que está seco,
curai o que está ferido.

Dobrai o que é rígido,
aquecei o que é frio,
endireitai o que está torto.

Concedei aos vossos fiéis,
que confiam em vós,
os vossos sete dons.

Dai-lhes o mérito da virtude,
dai-lhes o desfecho da salvação,
dai-lhes a alegria eterna.

Amém.`,
    attribution: 'Sequência de Pentecostes · texto litúrgico tradicional (domínio público)',
    scripture: ['At 2, 1-11'],
    tags: ['espírito-santo', 'pentecostes'],
    suggestedMoment: 'qualquer',
  },
  {
    id: 'dons-espirito-santo',
    title: 'Pedido dos dons do Espírito Santo',
    category: 'espirito-santo',
    summary: 'Pedir, com humildade, sabedoria, entendimento e os demais dons.',
    body: `Espírito Santo, dai-me o dom da sabedoria,
para saborear as coisas de Deus.
Dai-me o dom do entendimento,
para compreender a vossa Palavra.
Dai-me o dom do conselho,
para acertar nas decisões.

Dai-me o dom da fortaleza,
para não desistir do bem.
Dai-me o dom da ciência,
para conhecer o que me aproxima de vós.
Dai-me o dom da piedade,
para tratar a Deus como Pai.

Dai-me o dom do temor de Deus,
para não me afastar do que me faz bem.

Amém.`,
    attribution: 'Formulação própria do SOPRO, a partir de Is 11, 2-3',
    scripture: ['Is 11, 2-3'],
    tags: ['espírito-santo', 'dons'],
    suggestedMoment: 'qualquer',
  },
  {
    id: 'oracao-efusao',
    title: 'Oração de efusão do Espírito Santo',
    category: 'espirito-santo',
    summary: 'Dispor-se a acolher novamente o Espírito, sem fórmulas mágicas.',
    body: `Pai, eu me apresento diante de vós,
como quem já recebeu o vosso Espírito no Batismo
e deseja acolhê-lo de novo, com mais inteireza.

Jesus, não confio em minhas próprias forças.
Enviai sobre mim o Espírito que prometestes.

Espírito Santo, vinde.
Iluminai o que em mim está confuso,
curai o que está ferido,
ordenai os meus afetos,
e abri-me para os dons que o Senhor quiser me dar.

Aqui está o meu coração. Fazei dele o que for melhor.

Amém.`,
    attribution: 'Formulação própria do SOPRO · sem atribuição de efeitos mágicos',
    scripture: ['Lc 11, 13', 'At 19, 1-6'],
    tags: ['efusão', 'espírito-santo', 'rcc'],
    suggestedMoment: 'qualquer',
  },

  // ---------------------------------------------------------------------
  // Adoração
  // ---------------------------------------------------------------------
  {
    id: 'adoracao-santissimo',
    title: 'Oração diante do Santíssimo',
    category: 'adoracao',
    summary: 'Silêncio, adoração e entrega diante do Sacramento.',
    body: `Senhor, vós estais aqui.
Antes de dizer qualquer coisa, eu quero ficar em silêncio
e reconhecer que vós sois Deus e eu sou criatura.

Adoro-vos, verdadeiramente presente neste Sacramento.
Obrigado por esperar por mim
todas as vezes em que eu não vim.

Aqui trago a minha vida:
as pessoas que eu amo, as dores que eu não sei explicar,
os pedidos que eu nem sei formular.
Olhai para tudo isso com a vossa misericórdia.

Que este tempo diante de vós não passe em vão:
faz de mim alguém mais disponível, mais atento, mais fiel.
Amém.`,
    attribution: 'Formulação própria do SOPRO',
    scripture: ['Mt 26, 26-28', 'Jo 6, 51'],
    tags: ['eucaristia', 'adoração'],
    suggestedMoment: 'qualquer',
  },
  {
    id: 'visita-santissimo',
    title: 'Visita breve ao Santíssimo',
    category: 'adoracao',
    summary: 'Uma visita curta, para um dia comum.',
    body: `Meu Jesus, eu sei que estais aí.
Vim por um instante, só para dizer que vos amo
e que preciso de vós.

Abençoai a minha casa, o meu trabalho,
os que eu amo e os que não sei amar.

Que eu volte para casa um pouco mais parecido convosco.
Amém.`,
    attribution: 'Formulação própria do SOPRO',
    scripture: ['Mt 11, 28'],
    tags: ['eucaristia', 'breve'],
    suggestedMoment: 'qualquer',
  },

  // ---------------------------------------------------------------------
  // Exame de consciência
  // ---------------------------------------------------------------------
  {
    id: 'exame-consciencia',
    title: 'Exame de consciência',
    category: 'exame',
    summary: 'Cinco passos para revisar o dia com serenidade, sem autopunição.',
    body: `PASSO 1 — Luz. Vinde, Espírito Santo. Iluminai o meu dia como ele foi, e não como eu o imagino.

PASSO 2 — Gratidão. Senhor, o que hoje me foi dado e que eu não agradeci?

PASSO 3 — Verdade. Onde hoje eu escolhi o que me afastou de vós? Onde fui duro, omisso, orgulhoso, impaciente, injusto?

PASSO 4 — Perdão. Senhor, tende piedade. Eu me arrependo e confio na vossa misericórdia maior do que a minha culpa.

PASSO 5 — Passo concreto. Amanhã, o que eu posso fazer diferente? Que pessoa eu preciso procurar? Que hábito eu preciso retomar?

Glória ao Pai, ao Filho e ao Espírito Santo. Amém.`,
    attribution: 'Estrutura inspirada no método inaciano do exame · formulação própria do SOPRO',
    scripture: ['Sl 139, 23-24', '2Cor 13, 5'],
    tags: ['exame', 'discernimento'],
    suggestedMoment: 'noite',
  },

  // ---------------------------------------------------------------------
  // Pelos outros
  // ---------------------------------------------------------------------
  {
    id: 'pelos-doentes',
    title: 'Oração pelos doentes',
    category: 'pelos-outros',
    summary: 'Apresentar a Deus quem está enfermo.',
    body: `Senhor, olhai para os que estão enfermos,
em casa, nos hospitais ou sem ninguém que os acompanhe.
Concedei-lhes alívio no corpo
e paz no coração.

Dai sabedoria aos médicos e paciência a quem cuida.
Sustentai as famílias que estão cansadas.

E dai-me olhos para ver quem sofre perto de mim
e mãos dispostas a ajudar.
Amém.`,
    attribution: 'Formulação própria do SOPRO',
    scripture: ['Tg 5, 14-15', 'Mt 25, 36'],
    tags: ['intercessão', 'doentes'],
    suggestedMoment: 'qualquer',
  },
  {
    id: 'pelos-falecidos',
    title: 'Oração pelos falecidos',
    category: 'pelos-outros',
    summary: 'Confiar à misericórdia de Deus quem já partiu.',
    body: `Senhor, Pai de misericórdia,
confio à vossa bondade os que já deixaram esta vida,
especialmente os da minha família e os meus amigos.

Se ainda precisarem de purificação,
acolhei-os no vosso amor que purifica e restaura.
Concedei-lhes a paz da vossa presença.

E consolai os que estão de luto:
que a esperança da ressurreição
não os deixe sem motivo para viver.
Amém.`,
    attribution: 'Formulação própria do SOPRO',
    scripture: ['2Mc 12, 46', 'Jo 11, 25-26'],
    tags: ['falecidos', 'luto'],
    suggestedMoment: 'qualquer',
  },
  {
    id: 'pela-familia',
    title: 'Oração pela família',
    category: 'pelos-outros',
    summary: 'Pedir unidade, paciência e paz em casa.',
    body: `Senhor, abençoai a minha família.
Onde houver mágoa antiga, dai-nos coragem para conversar.
Onde houver cansaço, dai-nos paciência.
Onde houver alegria, dai-nos gratidão.

Que a nossa casa seja lugar de descanso
e não de cobrança.
Que ninguém se sinta estrangeiro entre nós.

Amém.`,
    attribution: 'Formulação própria do SOPRO',
    scripture: ['Js 24, 15', 'Ef 4, 2-3'],
    tags: ['família'],
    suggestedMoment: 'qualquer',
  },
  {
    id: 'pelo-grupo-oracao',
    title: 'Oração pelo grupo de oração',
    category: 'pelos-outros',
    summary: 'Por quem conduz e por quem chega ao grupo.',
    body: `Senhor, abençoai o nosso grupo de oração.
Guardai os que servem com fidelidade
e os que estão chegando agora, com timidez ou com sede.

Dai unidade aos que coordenam,
humildade aos que animam,
discernimento aos que orientam.

Que o grupo não seja lugar de vaidade,
mas de encontro convosco e de amizade verdadeira.

Amém.`,
    attribution: 'Formulação própria do SOPRO',
    scripture: ['At 2, 42', '1Cor 14, 26'],
    tags: ['rcc', 'comunidade'],
    suggestedMoment: 'qualquer',
  },

  // ---------------------------------------------------------------------
  // Terço / Rosário
  // ---------------------------------------------------------------------
  {
    id: 'como-rezar-rosario',
    title: 'Como rezar o Rosário',
    category: 'rosario',
    summary: 'A estrutura completa do Rosário e a indicação dos mistérios.',
    body: `1. Sinal da cruz e Credo.
2. Pai-Nosso, três Ave-Marias e Glória (pelas intenções do Papa).
3. Anúncio do primeiro mistério, seguido de Pai-Nosso, dez Ave-Marias e Glória.
4. Repetir para o segundo, terceiro, quarto e quinto mistérios.
5. Salve-Rainha e oração final.

MISTÉRIOS POR DIA (costume tradicional)
• Segunda e sábado — Mistérios Gozosos.
• Terça e sexta — Mistérios Dolorosos.
• Quarta e domingo — Mistérios Gloriosos.
• Quinta — Mistérios Luminosos.

Este é um costume piedoso, não uma norma litúrgica: você pode rezá-los em qualquer ordem.`,
    attribution: 'Estrutura tradicional do Rosário',
    scripture: ['Lc 1, 26-38', 'Lc 2, 1-20'],
    tags: ['rosário', 'guia'],
    suggestedMoment: 'qualquer',
  },
  {
    id: 'novena-espirito-santo',
    title: 'Novena ao Espírito Santo',
    category: 'novenas',
    summary: 'Roteiro de nove dias, tradicionalmente rezado antes de Pentecostes.',
    body: `Para cada um dos nove dias:

1. Sinal da cruz.
2. Vinde, Espírito Santo (invocação).
3. Uma das leituras do dia (sugestão: At 1–2 nestes dias).
4. Silêncio de um minuto.
5. Pedido do dia — a cada dia, contemple um dom do Espírito:
   dia 1 sabedoria; dia 2 entendimento; dia 3 conselho;
   dia 4 fortaleza; dia 5 ciência; dia 6 piedade;
   dia 7 temor de Deus; dia 8 os frutos do Espírito;
   dia 9 a unidade da Igreja.
6. Pai-Nosso, Ave-Maria e Glória.

Oração final: Vinde, Espírito Santo, enchei os corações dos vossos fiéis e acendei neles o fogo do vosso amor. Amém.

Você pode registrar as datas desta novena no Calendário do SOPRO.`,
    attribution: 'Roteiro tradicional · organização própria do SOPRO',
    scripture: ['At 1, 12-14', 'At 2, 1-4'],
    tags: ['novena', 'espírito-santo'],
    suggestedMoment: 'qualquer',
  },
];

export function getPrayerById(id: string): Prayer | undefined {
  return prayers.find((prayer) => prayer.id === id);
}

export function getPrayersByCategory(category: PrayerCategory['id']): Prayer[] {
  return prayers.filter((prayer) => prayer.category === category);
}

export function getCategoryById(id: string): PrayerCategory | undefined {
  return prayerCategories.find((category) => category.id === id);
}
