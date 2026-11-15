import { Section } from '../../components/ui/Structure';
import { Caution, DashList, Refs } from './shared';
import { CharismaticLayout } from './CharismaticLayout';
import { historyFacts } from '../../data/rcc/history';

const AFFIRMATIONS = [
  {
    title: 'A RCC é um movimento eclesial, não uma igreja',
    body: 'Ela existe dentro da Igreja Católica, sob a autoridade dos bispos. Não tem doutrina própria, clero próprio nem rituais próprios. Quando um grupo carismático se comporta como se fosse autossuficiente, deixou de ser o que diz ser.',
  },
  {
    title: 'O carisma próprio é a docilidade ao Espírito Santo',
    body: 'A RCC não foi fundada para ensinar uma espiritualidade nova. Seu carisma é reavivar nos batizados a consciência da presença e da ação do Espírito — o que a Igreja sempre creu, mas que muitas vezes ficou adormecido na prática.',
  },
  {
    title: 'É uma corrente de graça, não um clube',
    body: 'Desde os Documentos de Malinas, o movimento se descreve como um fluxo que atravessa a Igreja inteira. Não existe "carteirinha de carismático". Muitos católicos vivem essa espiritualidade sem nunca ter entrado num Grupo de Oração.',
  },
  {
    title: 'Não substitui a paróquia nem os sacramentos',
    body: 'A reunião de oração não é Missa, a efusão não é sacramento e o grupo não é a comunidade paroquial. Quem participa da RCC sem participar da vida da paróquia está no lugar errado — ou entendeu errado.',
  },
];

const CONCERNS = [
  {
    concern: 'Excesso de emoção e pouca doutrina',
    answer:
      'A CNBB pede que a fé não seja reduzida a experiência subjetiva (Doc. 53, nn. 46-47). É por isso que a formação — SVES, Módulo Básico — não é opcional na RCC séria.',
  },
  {
    concern: 'Linguagem que imita a hierarquia',
    answer:
      'A palavra "pastor" aplicada a coordenadores leigos pode confundir. A CNBB recomenda evitar o uso de termos eclesiais com outro sentido (n. 29).',
  },
  {
    concern: 'Manifestações estranhas em reunião',
    answer:
      'A Igreja orienta cautela: o "repouso no Espírito" não deve ser cultivado em assembleias (n. 66), e não se deve imitar gestos sacramentais (nn. 60-61).',
  },
  {
    concern: 'Profecias que controlam pessoas',
    answer:
      'A CNBB pede grande discernimento sobre a profecia (n. 65). Nenhum leigo tem autoridade para falar em nome de Deus sobre as escolhas íntimas de outra pessoa.',
  },
];

/**
 * O que é a RCC — com as objeções à mostra.
 *
 * Um app de espiritualidade que só apresenta o lado bonito não é confiável.
 * Aqui as críticas reais feitas ao movimento aparecem com a resposta da Igreja.
 */
export default function WhatIsRccPage() {
  return (
    <CharismaticLayout
      path="/carismatico/o-que-e"
      description="O movimento, o carisma próprio e o que a Igreja no Brasil efetivamente pediu que se corrigisse. Sem propaganda e sem caricatura."
    >
      <div className="grid gap-3 sm:grid-cols-4 sm:gap-6">
        {historyFacts.map((fact) => (
          <div key={fact.label}>
            <p className="rubric-muted text-[0.625rem]">{fact.label}</p>
            <p className="mt-1 font-display text-[1.0625rem] leading-snug text-ink">{fact.value}</p>
            <p className="mt-1 text-[0.75rem] leading-snug text-muted">{fact.note}</p>
          </div>
        ))}
      </div>

      <p className="reading dropcap border-t border-rule pt-5">
        Em fevereiro de 1967, estudantes e professores da Universidade de Duquesne, nos Estados
        Unidos, participaram de um retiro e saíram dele com algo que não sabiam explicar bem: uma
        experiência de oração que mudou a relação deles com a Escritura, com os sacramentos e com a
        própria fé. Não houve fundador, nem estatuto, nem plano estratégico. Houve um grupo de
        católicos rezando.
      </p>

      <p className="reading">
        Dois anos depois, a experiência chegava ao Brasil. O que se formou aqui tem uma fisionomia
        própria: reuniões semanais abertas em paróquias, forte ênfase no louvor e no anúncio
        querigmático, e uma estrutura de formação que se consolidou aos poucos. É dessa RCC
        brasileira que o SOPRO trata.
      </p>

      <Section label="Quatro afirmações" description="O que a RCC é — e o que ela não é.">
        <dl className="ruled border-y border-rule">
          {AFFIRMATIONS.map((item) => (
            <div key={item.title} className="py-4">
              <dt className="font-display text-[1.0625rem] leading-snug text-ink">{item.title}</dt>
              <dd className="mt-1 max-w-[58ch] text-[0.875rem] leading-relaxed text-ink-2">
                {item.body}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section
        label="As objeções reais"
        description="Críticas que a Igreja no Brasil fez por escrito — e o que se pede em resposta."
      >
        <div className="space-y-4">
          {CONCERNS.map((item) => (
            <div key={item.concern} className="border-l-2 border-rule-strong pl-4">
              <p className="font-display text-[1rem] leading-snug text-ink">{item.concern}</p>
              <p className="mt-1 text-[0.875rem] leading-relaxed text-ink-2">{item.answer}</p>
            </div>
          ))}
        </div>
      </Section>

      <Caution title="O critério que vale mais que todos">
        A CNBB lembra que o maior dom é a caridade (1Cor 12, 31 — 13, 13) e que não cabe a nenhum
        grupo se apresentar como autoridade final sobre o que vem de Deus: o discernimento dos
        carismas compete aos pastores da Igreja (Doc. 53, nn. 56-58).
      </Caution>

      <Section label="Para ler na fonte" variant="plain">
        <p className="text-[0.875rem] leading-relaxed text-muted">
          O SOPRO não substitui os documentos. Se você coordena um grupo, leia ao menos o Doc. 53 da
          CNBB — inteiro, não só as citações que circulam.
        </p>
        <DashList
          className="mt-2"
          items={[
            'CNBB, Documento 53 — Orientações Pastorais sobre a RCC (1994).',
            'João Paulo II, Christifideles Laici (1988), n. 30 — critérios de eclesialidade.',
            'Concílio Vaticano II, Lumen Gentium, n. 12 — os carismas na Igreja.',
            'Catecismo da Igreja Católica, nn. 799-801 e 1506-1523.',
          ]}
        />
        <Refs label="Nota" items={['Documentos citados por referência; o SOPRO não os redistribui.']} />
      </Section>
    </CharismaticLayout>
  );
}
