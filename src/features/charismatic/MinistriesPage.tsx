import { Section } from '../../components/ui/Structure';
import { Meta, Rubric } from '../../components/ui/Marks';
import { ministries } from '../../data/rcc/ministries';
import { CharismaticLayout } from './CharismaticLayout';
import { Caution, DashList, Refs } from './shared';

/**
 * Ministérios: catálogo de serviço.
 *
 * Nada de "descubra seu ministério" com questionário. A orientação é a
 * inversa, e é a católica: sirva, e o dom aparece.
 */
export default function MinistriesPage() {
  return (
    <CharismaticLayout
      path="/carismatico/ministerios"
      description="Quinze ministérios de serviço reconhecidos na organização nacional da RCC, com o que cada um faz, o que exige e onde costuma dar errado."
    >
      <Caution title="Antes do catálogo">
        <p>
          Na RCC, "ministério" não é ministério ordenado, e quem coordena um ministério não é
          "pastor" em sentido teológico. A CNBB recomenda evitar o uso de termos eclesiais com outro
          significado (Doc. 53, n. 29). O SOPRO mantém a distinção visível em cada verbete, porque a
          confusão não é só de vocabulário: ela muda a forma como as pessoas se relacionam com a
          autoridade da Igreja.
        </p>
      </Caution>

      <Section
        label="O catálogo"
        description="Cada ministério traz o que se faz na prática e o que se pede de quem se oferece."
      >
        <ol className="border-t border-rule">
          {ministries.map((ministry, index) => (
            <li key={ministry.id} className="border-b border-rule py-4">
              <div className="flex items-baseline gap-3">
                <span className="numeral w-5 shrink-0 text-[0.6875rem]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-3">
                    <h3 className="font-display text-[1.0625rem] leading-snug text-ink">
                      {ministry.name}
                    </h3>
                    {ministry.abbreviation && <Meta>{ministry.abbreviation}</Meta>}
                  </div>
                  <p className="mt-1 max-w-[58ch] text-[0.875rem] leading-relaxed text-ink-2">
                    {ministry.summary}
                  </p>

                  <div className="mt-2">
                    <Rubric className="text-[0.625rem]">O que se faz</Rubric>
                    <DashList className="mt-1" items={ministry.serves} />
                  </div>

                  <div className="mt-2">
                    <Rubric className="text-[0.625rem]">O que se pede</Rubric>
                    <DashList className="mt-1" items={ministry.requirements} tone="rubric" />
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section label="Como escolher" description="A resposta católica é desconcertante.">
        <div className="reading max-w-[58ch]">
          {`A pergunta "qual é o meu carisma?" costuma levar a uma busca introspectiva que não encontra resposta. O carisma não é um traço de personalidade a ser descoberto: é uma graça dada para uma necessidade concreta.

Por isso o caminho normal é o inverso. Você começa servindo — na acolhida, na limpeza, no som, no café — e percebe, com o tempo e com a confirmação dos irmãos, aquilo que a comunidade precisa e que você faz com alegria e fruto.

Três sinais ajudam a reconhecer: a comunidade confirma, o serviço produz fruto sem você se destruir, e há alegria permanente (não euforia passageira) naquilo. Nenhum desses sinais é infalível. Todos os três juntos formam um bom indício.`}
        </div>
        <DashList
          className="mt-3"
          items={[
            'Ofereça-se para o que existe, não para o que você gostaria que existisse.',
            'Comece pequeno e por pouco tempo: três meses é um bom teste.',
            'Esteja disposto a servir onde ninguém quer — é ali que se descobre muito.',
          ]}
        />
      </Section>

      <Caution title="Serviço que adoece">
        <p>
          Servir até a exaustão não é santidade: é falta de discernimento. Se o ministério está
          consumindo sua oração, sua família e seu sono, isso não é sinal de dedicação — é um
          problema a ser tratado com a coordenação. A CNBB inclui entre os cuidados pastorais a
          atenção ao equilíbrio da vida dos membros (Doc. 53, nn. 30-31).
        </p>
      </Caution>

      <Refs
        label="Base"
        items={[
          'Ministérios reconhecidos na organização nacional da RCCBRASIL',
          'CNBB 53, n. 29 (vocabulário)',
          '1Cor 12, 7 (bem comum)',
        ]}
      />
    </CharismaticLayout>
  );
}
