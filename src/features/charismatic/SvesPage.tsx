import { Check } from 'lucide-react';
import { useState } from 'react';
import { Section } from '../../components/ui/Structure';
import { Meta, Reference, Rubric } from '../../components/ui/Marks';
import { Button } from '../../components/ui/Button';
import { baptismInSpiritSenses, svesAlternativeOutline, svesSessions } from '../../data/rcc/sves';
import { cn } from '../../utils/cn';
import { CharismaticLayout } from './CharismaticLayout';
import { Caution, DashList, Refs } from './shared';
import { useRccProgress } from './useRccProgress';

/**
 * Trilha guiada do SVES.
 *
 * Estado: o progresso é local e por semana. Não há nota, não há prazo, não
 * há cobrança. A pessoa marca o que viveu — e pode desmarcar.
 */
export default function SvesPage() {
  const { byRef, completedCount, toggle } = useRccProgress('sves');
  const [open, setOpen] = useState<number>(1);

  const nextNumber = Math.min(completedCount + 1, svesSessions.length);

  return (
    <CharismaticLayout
      path="/carismatico/sves"
      description="Nove encontros semanais que percorrem o primeiro anúncio cristão. Não é um curso: é um caminho de conversão, com partilha em grupos pequenos e acompanhamento."
    >
      {/* Progresso */}
      <div className="grid gap-5 border-y border-rule py-4 sm:grid-cols-[1fr_auto] sm:items-center">
        <div>
          <Rubric>Seu progresso</Rubric>
          <p className="sr-only" aria-live="polite">
            {`Progresso do SVES: ${completedCount} de ${svesSessions.length} semanas.`}
          </p>
          <p className="mt-1 font-display text-[1.75rem] leading-none text-ink [font-variant-numeric:oldstyle-nums]">
            {completedCount}
            <span className="text-[1rem] text-muted"> / {svesSessions.length} semanas</span>
          </p>
          <p className="mt-1 text-[0.75rem] leading-relaxed text-muted">
            {completedCount === 0
              ? 'Comece pela semana 1. Marque conforme viver cada encontro — não antes.'
              : completedCount >= svesSessions.length
                ? 'Seminário concluído. O próximo passo é a formação do Módulo Básico.'
                : `Próximo encontro sugerido: semana ${nextNumber}.`}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5" aria-hidden>
          {svesSessions.map((session) => {
            const done = byRef.get(String(session.number))?.completed;
            return (
              <span
                key={session.number}
                className={cn(
                  'size-2.5 rounded-full border',
                  done ? 'border-rubric bg-rubric' : 'border-rule-strong bg-transparent',
                )}
              />
            );
          })}
        </div>
      </div>

      <p className="reading dropcap">
        O Seminário de Vida no Espírito Santo é a porta de entrada da RCC. Nove semanas, um encontro
        por semana, sempre em dia diferente da reunião de oração. A razão é simples: o seminário
        pede tempo para digerir, e a reunião semanal já ocupa o seu espaço.
      </p>

      <p className="reading">
        Os encontros seguem a lógica do primeiro anúncio — o querigma. Não se começa pela moral nem
        pelos carismas: começa-se por Deus, que ama primeiro. Cada passo abaixo é uma síntese do que
        o encontro trata; a apostila e a partilha no cenáculo fazem o resto.
      </p>

      {/* Trilha */}
      <Section label="As nove semanas" description="Abra cada uma para ver o núcleo do encontro.">
        <ol className="border-t border-rule">
          {svesSessions.map((session) => {
            const record = byRef.get(String(session.number));
            const done = Boolean(record?.completed);
            const expanded = open === session.number;

            return (
              <li key={session.number} className="border-b border-rule">
                <div className="flex items-start gap-3 py-3">
                  <button
                    type="button"
                    onClick={() => void toggle(String(session.number))}
                    aria-pressed={done}
                    aria-label={`Marcar semana ${session.number} como concluída`}
                    className={cn(
                      'mt-0.5 flex size-[18px] shrink-0 items-center justify-center border transition-colors',
                      done
                        ? 'border-rubric bg-rubric text-paper'
                        : 'border-rule-strong text-transparent hover:border-ink',
                    )}
                  >
                    <Check size={11} strokeWidth={3} aria-hidden />
                  </button>

                  <button
                    type="button"
                    onClick={() => setOpen(expanded ? -1 : session.number)}
                    aria-expanded={expanded}
                    className="min-w-0 flex-1 text-left"
                  >
                    <span className="flex flex-wrap items-baseline gap-x-2.5">
                      <span className="numeral text-[0.6875rem]">
                        {String(session.number).padStart(2, '0')}
                      </span>
                      <span
                        className={cn(
                          'font-display text-[1.0625rem] leading-snug transition-colors',
                          done ? 'text-muted' : expanded ? 'text-rubric' : 'text-ink',
                        )}
                      >
                        {session.title}
                      </span>
                      {done && <Meta>Concluída</Meta>}
                    </span>

                    {!expanded && (
                      <span className="mt-0.5 block max-w-[62ch] text-[0.8125rem] leading-relaxed text-muted">
                        {session.theme.split('.')[0]}.
                      </span>
                    )}
                  </button>
                </div>

                {expanded && (
                  <div className="space-y-3 pb-5 pl-[30px] pr-1">
                    <p className="reading-sm max-w-[64ch]">{session.theme}</p>

                    <div>
                      <Rubric className="text-[0.5625rem]">Escritura</Rubric>
                      <p className="mt-0.5">
                        {session.scripture.map((reference, index) => (
                          <span key={reference}>
                            {index > 0 && <span className="mx-1.5 text-rule-strong">·</span>}
                            <Reference>{reference}</Reference>
                          </span>
                        ))}
                      </p>
                    </div>

                    <div className="border-l-2 border-rubric/40 pl-3.5">
                      <Rubric className="text-[0.5625rem]">O que se espera</Rubric>
                      <p className="mt-0.5 max-w-[62ch] text-[0.8125rem] leading-relaxed text-ink-2">
                        {session.aim}
                      </p>
                    </div>

                    {record?.note && (
                      <div>
                        <Rubric className="text-[0.5625rem]">Sua anotação</Rubric>
                        <p className="mt-0.5 whitespace-pre-line text-[0.8125rem] leading-relaxed text-muted">
                          {record.note}
                        </p>
                      </div>
                    )}

                    <Button
                      size="sm"
                      variant={done ? 'outline' : 'solid'}
                      onClick={() => void toggle(String(session.number))}
                    >
                      {done ? 'Desmarcar' : 'Marcar como vivida'}
                    </Button>
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </Section>

      {/* Os dois sentidos */}
      <Section
        label="A semana 8, explicada"
        description="A expressão 'batismo no Espírito Santo' tem dois sentidos. Confundi-los é o erro mais comum da literatura popular."
      >
        <div className="grid gap-6 sm:grid-cols-2">
          {baptismInSpiritSenses.map((sense) => (
            <div key={sense.id} className="border-t border-rule pt-2.5">
              <h3 className="font-display text-[1.0625rem] leading-snug text-ink">{sense.title}</h3>
              <p className="mt-1 whitespace-pre-line text-[0.8125rem] leading-relaxed text-ink-2">
                {sense.body}
              </p>
              <Reference className="mt-1.5 block text-[0.6875rem]">{sense.reference}</Reference>
            </div>
          ))}
        </div>
      </Section>

      <Caution title="Sobre a experiência e a ausência dela">
        A efusão do Espírito não é condição para a salvação nem sinal de santidade maior. Sua
        ausência não diz nada negativo sobre a vida espiritual de ninguém — e ninguém deve ser
        pressionado a "sentir" algo.
      </Caution>

      {/* Como o seminário funciona */}
      <Section label="Como o seminário funciona na prática">
        <dl className="ruled border-y border-rule">
          {[
            {
              label: 'Ritmo',
              text: 'Um encontro por semana, em dia diferente da reunião de oração. Duração de 2h30 a 4h, conforme a realidade local.',
            },
            {
              label: 'Cenáculo',
              text: 'Grupos pequenos de 8 a 12 pessoas, com um responsável e um supervisor. É ali que a partilha acontece de verdade.',
            },
            {
              label: 'Pastoreio',
              text: 'Acompanhamento próximo de cada participante, com visitas e oração. Na RCC, "pastoreio" designa esse cuidado — não o múnus pastoral dos sacerdotes (CNBB 53, n. 29).',
            },
            {
              label: 'Equipes',
              text: 'Coordenação geral, espiritualidade, estrutura, pregadores, oração, música, secretaria, intercessão, limpeza. Nenhum seminário funciona com três pessoas.',
            },
            {
              label: 'Sacramentos',
              text: 'O seminário caminha junto com a vida sacramental. Confissão e Eucaristia não são apêndice: a semana 5 costuma propor a confissão.',
            },
          ].map((row) => (
            <div key={row.label} className="grid gap-0.5 py-2.5 sm:grid-cols-[9rem_1fr] sm:gap-5">
              <dt className="text-[0.8125rem] font-medium text-ink">{row.label}</dt>
              <dd className="max-w-[60ch] text-[0.8125rem] leading-relaxed text-ink-2">{row.text}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section
        label="O outro roteiro"
        description="Circulam duas tradições de temário. Esta é a segunda, para quem encontrar referência a ela."
        variant="plain"
      >
        <ol className="grid gap-x-6 gap-y-1 sm:grid-cols-2">
          {svesAlternativeOutline.map((title, index) => (
            <li key={title} className="flex gap-2.5 border-b border-rule py-1.5 text-[0.8125rem]">
              <span className="numeral shrink-0 text-[0.625rem]">{index + 1}</span>
              <span className="text-ink-2">{title}</span>
            </li>
          ))}
        </ol>
      </Section>

      <DashList
        className="border-t border-rule pt-4"
        items={[
          'O SOPRO não substitui a apostila nem o encontro presencial.',
          'Se você procura um seminário, procure a coordenação diocesana da RCC ou a sua paróquia.',
          'O progresso marcado aqui fica apenas neste dispositivo.',
        ]}
      />
      <Refs
        label="Base"
        items={['Materiais de formação da RCCBRASIL', 'CNBB 53', 'Documentos de Malinas']}
      />
    </CharismaticLayout>
  );
}
