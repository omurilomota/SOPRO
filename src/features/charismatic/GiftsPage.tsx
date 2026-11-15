import { Link } from 'react-router-dom';
import { Section } from '../../components/ui/Structure';
import { Meta, Reference, Rubric } from '../../components/ui/Marks';
import { fruitsOfTheSpirit, giftsInfused } from '../../data/rcc/gifts';
import { CharismaticLayout } from './CharismaticLayout';
import { Caution, DashList } from './shared';
import { useState } from 'react';
import { cn } from '../../utils/cn';

const CATEGORIES = [
  {
    id: 'infusos',
    title: 'Dons infusos',
    reference: 'Is 11, 2-3',
    count: '7',
    text: 'Disposições permanentes que acompanham a graça santificante e aperfeiçoam as virtudes. Todo batizado os recebe; crescer neles é obra da vida inteira.',
    color: 'text-indigo',
  },
  {
    id: 'carismas',
    title: 'Carismas',
    reference: '1Cor 12, 8-10',
    count: 'muitos',
    text: 'Graças pontuais dadas para o bem comum (1Cor 12, 7). Servem a uma necessidade concreta da comunidade e precisam de discernimento.',
    color: 'text-rubric',
  },
  {
    id: 'frutos',
    title: 'Frutos',
    reference: 'Gl 5, 22-23',
    count: '12',
    text: 'O que o Espírito produz no caráter. Não são o que você faz: são o que você se torna — e é o critério verificável de autenticidade.',
    color: 'text-liturgia-verde',
  },
];

/**
 * Dons, carismas e frutos: as três categorias, com a distinção explícita.
 * A confusão entre elas é a fonte da maior parte do que se fala errado sobre
 * a vida carismática.
 */
export default function GiftsPage() {
  const [openGift, setOpenGift] = useState<string>(giftsInfused[0]!.id);
  const gift = giftsInfused.find((item) => item.id === openGift) ?? giftsInfused[0]!;

  return (
    <CharismaticLayout
      path="/carismatico/dons"
      description="Is 11, 1Cor 12 e Gl 5 falam de coisas diferentes. Quem confunde os três acaba pedindo o que já tem, exigindo o que não lhe foi dado e medindo a vida espiritual pelo que não se mede."
    >
      {/* Comparação das categorias */}
      <div className="grid gap-x-6 gap-y-5 border-t border-rule pt-4 sm:grid-cols-3">
        {CATEGORIES.map((category) => (
          <div key={category.id}>
            <p className={cn('numeral text-[0.6875rem]', category.color)}>{category.count}</p>
            <h2 className="mt-0.5 font-display text-[1.125rem] leading-snug text-ink">
              {category.title}
            </h2>
            <Reference className="text-[0.75rem]">{category.reference}</Reference>
            <p className="mt-1.5 max-w-[40ch] text-[0.8125rem] leading-relaxed text-ink-2">
              {category.text}
            </p>
          </div>
        ))}
      </div>

      <Caution title="A distinção em uma frase">
        Os dons de Is 11 são permanentes e aperfeiçoam o modo de ser; os carismas de 1Cor 12 são
        pontuais e servem ao bem comum; os frutos de Gl 5 são o resultado verificável de tudo isso na
        vida cotidiana. Só os frutos são critério de discernimento — e são o único critério que a
        Igreja permite usar sobre a própria santidade.
      </Caution>

      {/* Os sete dons */}
      <Section
        label="Os sete dons infusos"
        description="Abra cada um para ver os sinais concretos, o que ele não é, e uma prática para cultivar."
      >
        <div className="grid gap-6 sm:grid-cols-[10.5rem_1fr]">
          <ul className="border-t border-rule">
            {giftsInfused.map((item, index) => {
              const selected = item.id === gift.id;
              return (
                <li key={item.id} className="border-b border-rule">
                  <button
                    type="button"
                    onClick={() => setOpenGift(item.id)}
                    aria-pressed={selected}
                    className={cn(
                      'flex w-full items-baseline gap-2.5 py-2 text-left transition-colors',
                      selected ? 'text-rubric' : 'text-ink-2 hover:text-ink',
                    )}
                  >
                    <span className="numeral shrink-0 text-[0.625rem]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={cn(
                        'font-display text-[0.9375rem] leading-snug',
                        selected && 'font-medium',
                      )}
                    >
                      {item.name}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <article className="border-t border-rule pt-3 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
            <header>
              <Rubric className="text-[0.5625rem]">{gift.latin}</Rubric>
              <h3 className="text-[1.375rem] leading-tight text-ink">{gift.name}</h3>
              <p className="mt-1 max-w-[56ch] font-display text-[1rem] italic leading-snug text-ink-2">
                {gift.summary}
              </p>
            </header>

            <div className="reading-sm mt-3 max-w-[62ch]">{gift.body}</div>

            <div className="mt-4">
              <Rubric className="text-[0.5625rem]">Sinais concretos</Rubric>
              <DashList className="mt-1" items={gift.signs} />
            </div>

            <div className="mt-4">
              <Rubric className="text-[0.5625rem]">O que não é</Rubric>
              <DashList className="mt-1" items={gift.misreadings} tone="rubric" />
            </div>

            <div className="mt-4 border-l-2 border-rubric/40 pl-3.5">
              <Rubric className="text-[0.5625rem]">Para cultivar</Rubric>
              <p className="mt-0.5 max-w-[62ch] text-[0.8125rem] leading-relaxed text-ink-2">
                {gift.practice}
              </p>
            </div>

            <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-rule pt-2">
              <Meta>Escritura</Meta>
              {gift.scripture.map((reference) => (
                <Reference key={reference} className="text-[0.75rem]">
                  {reference}
                </Reference>
              ))}
            </div>
            <p className="mt-1 flex flex-wrap items-baseline gap-x-3 text-[0.6875rem] text-muted">
              <Meta>Magistério</Meta>
              {gift.magisterium.join(' · ')}
            </p>
          </article>
        </div>
      </Section>

      {/* Carismas */}
      <Section
        label="Carismas"
        description="São graças dadas 'para o bem comum' (1Cor 12, 7). A lista bíblica não é exaustiva: Rm 12 e Ef 4 acrescentam outros, e a Igreja reconhece carismas em formas novas ao longo da história."
      >
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1.5">
          <Link
            to="/carismatico/carismas"
            className="inline-flex items-center gap-1.5 border-b border-rule-strong pb-0.5 text-[0.8125rem] text-ink transition-colors hover:border-rubric hover:text-rubric"
          >
            Ver os carismas um por um
          </Link>
          <span className="text-[0.75rem] text-muted">
            10 carismas de 1Cor 12 e 7 de serviço (Rm 12), com cautelas pastorais
          </span>
        </div>
        <p className="mt-3 max-w-[64ch] text-[0.8125rem] leading-relaxed text-ink-2">
          Uma advertência que vale mais que a lista: a CNBB pede que não se tenha a presunção de
          possuir carismas nem que se peça temerariamente por eles (Doc. 53, nn. 56-58). O SOPRO não
          oferece testes de identificação de dons — quem faz esse discernimento é a pessoa, em
          diálogo com a comunidade e com os pastores.
        </p>
      </Section>

      {/* Frutos */}
      <Section
        label="Os doze frutos"
        description="Gl 5, 22-23. A tradição enumera doze. São o único critério que se pode verificar de fora."
      >
        <ul className="ruled border-y border-rule">
          {fruitsOfTheSpirit.map((fruit) => (
            <li key={fruit.id} className="grid gap-0.5 py-2.5 sm:grid-cols-[10rem_1fr] sm:gap-5">
              <p className="font-display text-[0.9375rem] text-ink">{fruit.name}</p>
              <div>
                <p className="text-[0.8125rem] leading-relaxed text-ink-2">{fruit.summary}</p>
                <p className="mt-0.5 text-[0.75rem] leading-relaxed text-muted">
                  <span className="rubric-muted mr-1.5 text-[0.5625rem]">No cotidiano</span>
                  {fruit.inDailyLife}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <p className="max-w-[64ch] border-t border-rule pt-3 text-[0.8125rem] leading-relaxed text-muted">
        Se você chegou até aqui buscando saber qual é o seu dom: a resposta católica é
        desconcertante. Não se descobre o próprio carisma olhando para dentro — descobre-se servindo.
        O dom aparece quando a comunidade precisa dele e você responde.
      </p>
    </CharismaticLayout>
  );
}
