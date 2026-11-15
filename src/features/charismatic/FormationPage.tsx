import { Check } from 'lucide-react';
import { Section } from '../../components/ui/Structure';
import { Meta, Rubric } from '../../components/ui/Marks';
import { formationPhases, formationStages } from '../../data/rcc/formation';
import { cn } from '../../utils/cn';
import { CharismaticLayout } from './CharismaticLayout';
import { Caution, DashList } from './shared';
import { useRccProgress } from './useRccProgress';

/**
 * Mapa do processo formativo da RCCBRASIL.
 *
 * Três fases, com o progresso do Módulo Básico marcável. A ordem dos módulos
 * é a usual; a ordem entre EO, AD e SVES varia por diocese, e isso está dito
 * na tela — porque quem já participou de um processo em outra paróquia
 * estranharia a diferença.
 */
export default function FormationPage() {
  const { byRef, completedCount, toggle } = useRccProgress('formacao');
  const basics = formationStages.filter((stage) => stage.phase === 'basico');

  return (
    <CharismaticLayout
      path="/carismatico/formacao"
      description="Querigma, Módulo Básico e formação específica: o caminho que a RCCBRASIL organizou para que o serviço não seja improviso e a experiência não fique sem raiz."
    >
      <p className="reading border-t border-rule pt-5">
        A tentação permanente de todo movimento espiritual é o atalho: chegar à frente sem passar
        pela base. A RCC brasileira respondeu a isso com uma estrutura formativa longa, em três
        fases. Ela não é burocracia: é o que impede que alguém pregue sobre carismas sem saber
        distinguir dons infusos de carismas, ou anime uma reunião sem conhecer a doutrina dos
        sacramentos.
      </p>

      {/* As três fases */}
      <div className="grid gap-5 border-y border-rule py-4 sm:grid-cols-3">
        {formationPhases.map((phase) => (
          <div key={phase.id}>
            <Rubric className="text-[0.625rem]">
              {phase.id === 'querigma' ? 'Fase 1' : phase.id === 'basico' ? 'Fase 2' : 'Fase 3'}
            </Rubric>
            <p className="mt-1 font-display text-[1.0625rem] leading-snug text-ink">{phase.name}</p>
            <p className="mt-1 text-[0.8125rem] leading-relaxed text-muted">{phase.note}</p>
          </div>
        ))}
      </div>

      {formationPhases.map((phase) => {
        const stages = formationStages.filter((stage) => stage.phase === phase.id);
        return (
          <Section
            key={phase.id}
            label={phase.name}
            description={phase.id === 'basico' ? 'Marque o que você já fez. O progresso fica neste dispositivo.' : undefined}
          >
            <ol className="border-t border-rule">
              {stages.map((stage) => {
                const trackable = stage.phase === 'basico';
                const done = trackable ? Boolean(byRef.get(stage.id)?.completed) : false;

                return (
                  <li
                    key={stage.id}
                    className="flex items-start gap-3 border-b border-rule py-3.5"
                  >
                    {trackable ? (
                      <button
                        type="button"
                        onClick={() => void toggle(stage.id)}
                        aria-pressed={done}
                        aria-label={`Marcar ${stage.name} como concluído`}
                        className={cn(
                          'mt-1 flex size-[18px] shrink-0 items-center justify-center border transition-colors',
                          done
                            ? 'border-rubric bg-rubric text-paper'
                            : 'border-rule-strong text-transparent hover:border-ink',
                        )}
                      >
                        <Check size={11} strokeWidth={3} aria-hidden />
                      </button>
                    ) : (
                      <span
                        className="mt-[9px] size-1.5 shrink-0 rounded-full bg-rule-strong"
                        aria-hidden
                      />
                    )}

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline gap-x-2.5">
                        <h3
                          className={cn(
                            'font-display text-[1rem] leading-snug',
                            done ? 'text-muted' : 'text-ink',
                          )}
                        >
                          {stage.name}
                        </h3>
                        {stage.optional && <Meta>Opcional</Meta>}
                        <Meta>{stage.duration}</Meta>
                      </div>
                      <p className="mt-1 max-w-[58ch] text-[0.875rem] leading-relaxed text-ink-2">
                        {stage.summary}
                      </p>
                      <p className="mt-1 max-w-[58ch] text-[0.8125rem] leading-relaxed text-muted">
                        <span className="rubric-muted mr-1.5 text-[0.625rem]">Formato</span>
                        {stage.format}
                      </p>
                      <p className="mt-1 max-w-[58ch] text-[0.8125rem] leading-relaxed text-muted">
                        <span className="rubric-muted mr-1.5 text-[0.625rem]">Ao final</span>
                        {stage.outcome}
                      </p>
                      {stage.requires && (
                        <p className="mt-1 text-[0.75rem] text-muted">
                          <span className="rubric-muted mr-1.5 text-[0.625rem]">Requer</span>
                          {stage.requires}
                        </p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
          </Section>
        );
      })}

      <Caution title="Ritmo, não corrida">
        <p>
          O Módulo Básico é longo porque é feito junto com a vida: trabalho, família, serviço no
          grupo. Quem faz as apostilas em três meses e não muda nada na prática não fez formação —
          fez leitura.
        </p>
      </Caution>

      <Section label="Como marcar o seu progresso" variant="plain">
        <p className="sr-only" aria-live="polite">
          {`Progresso da formação: ${completedCount} de ${basics.length} módulos.`}
        </p>
        <p className="max-w-[58ch] text-[0.875rem] leading-relaxed text-ink-2">
          {completedCount === 0
            ? 'Você ainda não marcou nenhum módulo. Marque apenas o que efetivamente concluiu com a sua coordenação.'
            : `Módulos marcados até agora: ${completedCount} de ${basics.length}.`}{' '}
          O SOPRO não emite certificado, não valida formação e não substitui a coordenação diocesana.
        </p>
        <DashList
          className="mt-2"
          items={[
            'Para fazer o SVES ou o Módulo Básico, procure a coordenação diocesana da RCC ou a sua paróquia.',
            'O que você marca aqui é privado: não é compartilhado com ninguém.',
            'A ordem entre Experiência de Oração, Aprofundamento de Dons e SVES varia por diocese.',
          ]}
        />
      </Section>
    </CharismaticLayout>
  );
}
