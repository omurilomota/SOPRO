import { Check, NotebookPen, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonLink } from '../../components/ui/Button';
import { EmptyState } from '../../components/ui/EmptyState';
import { Field, Select, TextArea, TextInput } from '../../components/ui/Field';
import { PageHeader } from '../../components/ui/PageHeader';
import { Meta, Reference, Rubric, Tag } from '../../components/ui/Marks';
import { Section } from '../../components/ui/Structure';
import { useToast } from '../../components/ui/Toast';
import { useLocalCollection } from '../../hooks/useLocalCollection';
import {
  habitCompletionRepository,
  habitRepository,
  intentionRepository,
  journalRepository,
  lifePlanRepository,
  verseRepository,
} from '../../services/storage/repositories';
import type { HabitKind, SpiritualHabit } from '../../types/spiritual-life';
import { addDaysISO, formatShortDate, todayISO, WEEKDAY_SHORT } from '../../utils/date';
import { createId } from '../../utils/id';
import { cn } from '../../utils/cn';

const HABIT_KINDS: { value: HabitKind; label: string }[] = [
  { value: 'oracao-manha', label: 'Oração da manhã' },
  { value: 'leitura-biblica', label: 'Leitura bíblica' },
  { value: 'terco', label: 'Terço' },
  { value: 'adoracao', label: 'Adoração' },
  { value: 'exame-consciencia', label: 'Exame de consciência' },
  { value: 'leitura-espiritual', label: 'Leitura espiritual' },
  { value: 'jejum', label: 'Jejum' },
  { value: 'outro', label: 'Outro' },
];

/**
 * Caminhada: hábitos, diário, intenções, versículos e plano de vida.
 *
 * Tudo em listas pautadas. O tom é de caderno pessoal, não de painel de
 * métricas — de propósito: constância não se mede por gráfico.
 */
export default function SpiritualLifePage() {
  const { notify } = useToast();
  const habits = useLocalCollection<SpiritualHabit>(habitRepository, {
    sort: (a, b) => a.title.localeCompare(b.title),
  });
  const completions = useLocalCollection(habitCompletionRepository);
  const intentions = useLocalCollection(intentionRepository, {
    sort: (a, b) => b.createdAt.localeCompare(a.createdAt),
  });
  const verses = useLocalCollection(verseRepository, {
    sort: (a, b) => b.createdAt.localeCompare(a.createdAt),
  });
  const plan = useLocalCollection(lifePlanRepository);
  const journal = useLocalCollection(journalRepository, {
    sort: (a, b) => b.date.localeCompare(a.date),
  });

  const today = todayISO();

  const [newHabit, setNewHabit] = useState('');
  const [newHabitKind, setNewHabitKind] = useState<HabitKind>('oracao-manha');
  const [newIntention, setNewIntention] = useState('');
  const [verseRef, setVerseRef] = useState('');
  const [verseText, setVerseText] = useState('');
  const [planText, setPlanText] = useState('');

  const last7 = Array.from({ length: 7 }, (_, index) => addDaysISO(today, index - 6));

  const completedOn = (habitId: string, date: string) =>
    completions.items.some((item) => item.habitId === habitId && item.date === date);

  const toggleCompletion = async (habitId: string, date: string) => {
    const existing = completions.items.find(
      (item) => item.habitId === habitId && item.date === date,
    );
    if (existing) {
      await completions.remove(existing.id);
      return;
    }
    await completions.add({
      id: createId('done'),
      habitId,
      date,
      createdAt: new Date().toISOString(),
    });
  };

  const addHabit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!newHabit.trim()) return;
    await habits.add({
      id: createId('habit'),
      title: newHabit.trim(),
      kind: newHabitKind,
      targetPerWeek: 7,
      weekdays: [],
      active: true,
      createdAt: new Date().toISOString(),
    });
    setNewHabit('');
    notify('Hábito adicionado.');
  };

  return (
    <div className="space-y-9 animate-[var(--animate-fade)]">
      <PageHeader
        label="Minha caminhada"
        title="Minha caminhada"
        description="Um espaço privado para o seu ritmo: hábitos, intenções, versículos e plano de vida. Nada daqui sai deste dispositivo."
        action={
          <ButtonLink to="/caminhada/diario" variant="outline" size="sm">
            <NotebookPen size={13} aria-hidden />
            Diário
          </ButtonLink>
        }
      />

      {/* Hábitos -------------------------------------------------------- */}
      <Section label="Rotina e hábitos">
        {habits.items.length === 0 ? (
          <EmptyState
            label="Defina sua rotina"
            description="Comece com um hábito por vez: oração da manhã, leitura bíblica, terço."
          />
        ) : (
          <ul className="ruled border-y border-rule">
            {habits.items.map((habit) => (
              <li key={habit.id} className="flex flex-wrap items-center gap-x-3 gap-y-2 py-2.5">
                <div className="min-w-0 flex-1">
                  <p className="text-[0.9375rem] text-ink">{habit.title}</p>
                  <p className="text-[0.6875rem] uppercase tracking-[0.1em] text-muted">
                    {HABIT_KINDS.find((kind) => kind.value === habit.kind)?.label}
                  </p>
                </div>
                <div
                  className="flex items-center gap-1"
                  role="group"
                  aria-label={`Marcações de ${habit.title}`}
                >
                  {last7.map((date) => {
                    const done = completedOn(habit.id, date);
                    return (
                      <button
                        key={date}
                        type="button"
                        onClick={() => void toggleCompletion(habit.id, date)}
                        aria-pressed={done}
                        aria-label={`${formatShortDate(date)} — ${done ? 'feito' : 'não marcado'}`}
                        className={cn(
                          'flex size-[22px] items-center justify-center border text-[0.5rem] transition-colors',
                          done
                            ? 'border-rubric bg-rubric text-paper'
                            : 'border-rule-strong text-muted hover:border-ink',
                        )}
                      >
                        {done ? (
                          <Check size={10} strokeWidth={3} aria-hidden />
                        ) : (
                          <span aria-hidden>
                            {WEEKDAY_SHORT[new Date(date + 'T12:00:00').getDay()]?.[0]}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
                <button
                  type="button"
                  onClick={async () => {
                    if (!window.confirm(`Remover o hábito "${habit.title}"?`)) return;
                    await habits.remove(habit.id);
                    notify('Hábito removido.');
                  }}
                  className="p-1 text-muted transition-colors hover:text-rubric"
                  aria-label={`Remover ${habit.title}`}
                >
                  <Trash2 size={13} aria-hidden />
                </button>
              </li>
            ))}
          </ul>
        )}

        <form onSubmit={addHabit} className="flex flex-wrap items-end gap-3">
          <Field label="Novo hábito" className="min-w-40 flex-1">
            {(id) => (
              <TextInput
                id={id}
                value={newHabit}
                onChange={(event) => setNewHabit(event.target.value)}
                placeholder="Ex.: Terço às 20h"
                maxLength={60}
              />
            )}
          </Field>
          <Field label="Tipo" className="w-44">
            {(id) => (
              <Select
                id={id}
                value={newHabitKind}
                onChange={(event) => setNewHabitKind(event.target.value as HabitKind)}
              >
                {HABIT_KINDS.map((kind) => (
                  <option key={kind.value} value={kind.value}>
                    {kind.label}
                  </option>
                ))}
              </Select>
            )}
          </Field>
          <Button type="submit" size="sm" variant="outline">
            <Plus size={13} aria-hidden />
            Adicionar
          </Button>
        </form>
        <p className="text-[0.6875rem] leading-relaxed text-muted">
          Os sete quadrados mostram a última semana. Marcar não é nota — serve para você perceber
          padrões, não para cobrar constância.
        </p>
      </Section>

      {/* Diário -------------------------------------------------------- */}
      <Section
        label="Diário espiritual"
        action={
          <Link to="/caminhada/diario" className="text-[0.75rem] text-ink-2 hover:text-rubric">
            Ver tudo
          </Link>
        }
      >
        {journal.items.length === 0 ? (
          <EmptyState
            label="Ainda sem registros"
            description="Escreva quando quiser. Um parágrafo basta."
            action={
              <ButtonLink to="/caminhada/diario" variant="quiet" size="sm" className="px-0">
                Abrir o diário
              </ButtonLink>
            }
          />
        ) : (
          <ul className="ruled border-y border-rule">
            {journal.items.slice(0, 3).map((entry) => (
              <li key={entry.id} className="py-3">
                <Rubric className="text-[0.5625rem]">{formatShortDate(entry.date)}</Rubric>
                {entry.title && (
                  <p className="mt-0.5 font-display text-[1rem] text-ink">{entry.title}</p>
                )}
                <p className="mt-1 line-clamp-3 whitespace-pre-line text-[0.8125rem] leading-relaxed text-ink-2">
                  {entry.body}
                </p>
              </li>
            ))}
          </ul>
        )}
      </Section>

      {/* Intenções ----------------------------------------------------- */}
      <Section label="Intenções">
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            if (!newIntention.trim()) return;
            await intentions.add({
              id: createId('int'),
              text: newIntention.trim(),
              forWhom: null,
              createdAt: new Date().toISOString(),
              answeredAt: null,
            });
            setNewIntention('');
            notify('Intenção guardada.');
          }}
          className="flex items-end gap-2"
        >
          <TextInput
            value={newIntention}
            onChange={(event) => setNewIntention(event.target.value)}
            placeholder="Por quem você quer rezar?"
            aria-label="Nova intenção"
            maxLength={200}
          />
          <Button type="submit" size="sm" variant="outline">
            <Plus size={13} aria-hidden />
          </Button>
        </form>

        {intentions.items.length === 0 ? (
          <EmptyState
            label="Nenhuma intenção"
            description="Escreva um nome ou um pedido. Fica só entre você e Deus."
          />
        ) : (
          <ul className="ruled border-y border-rule">
            {intentions.items.map((intention) => (
              <li key={intention.id} className="flex items-center gap-3 py-2.5">
                <span className="min-w-0 flex-1 text-[0.875rem] text-ink">{intention.text}</span>
                {intention.answeredAt ? (
                  <Tag tone="rubric">Atendida</Tag>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      void intentions.update({
                        ...intention,
                        answeredAt: new Date().toISOString(),
                      })
                    }
                    className="text-[0.6875rem] text-muted underline decoration-rule-strong underline-offset-2 transition-colors hover:text-rubric"
                  >
                    Marcar como atendida
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => void intentions.remove(intention.id)}
                  className="p-1 text-muted transition-colors hover:text-rubric"
                  aria-label="Remover intenção"
                >
                  <Trash2 size={12} aria-hidden />
                </button>
              </li>
            ))}
          </ul>
        )}
      </Section>

      {/* Versículos ---------------------------------------------------- */}
      <Section label="Versículos favoritos">
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            if (!verseRef.trim() || !verseText.trim()) return;
            await verses.add({
              id: createId('verse'),
              reference: verseRef.trim(),
              text: verseText.trim(),
              note: null,
              createdAt: new Date().toISOString(),
            });
            setVerseRef('');
            setVerseText('');
            notify('Versículo guardado.');
          }}
          className="space-y-3"
        >
          <Field label="Referência">
            {(id) => (
              <TextInput
                id={id}
                value={verseRef}
                onChange={(event) => setVerseRef(event.target.value)}
                placeholder="Ex.: Sl 23, 1"
                maxLength={40}
              />
            )}
          </Field>
          <Field label="Texto">
            {(id) => (
              <TextArea
                id={id}
                rows={2}
                value={verseText}
                onChange={(event) => setVerseText(event.target.value)}
                placeholder="Escreva o versículo com as suas palavras, se preferir."
                maxLength={400}
              />
            )}
          </Field>
          <div className="flex justify-end">
            <Button type="submit" size="sm" variant="outline">
              <Plus size={13} aria-hidden />
              Guardar
            </Button>
          </div>
        </form>

        {verses.items.length === 0 ? (
          <p className="text-[0.75rem] leading-relaxed text-muted">
            Guarde aqui os versículos que falam com você. Sempre à mão, offline.
          </p>
        ) : (
          <ul className="ruled border-y border-rule">
            {verses.items.map((verse) => (
              <li key={verse.id} className="flex items-start gap-3 py-3">
                <div className="min-w-0 flex-1">
                  <Reference>{verse.reference}</Reference>
                  <p className="mt-0.5 font-display text-[0.9375rem] leading-relaxed text-ink">
                    {verse.text}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => void verses.remove(verse.id)}
                  className="p-1 text-muted transition-colors hover:text-rubric"
                  aria-label={`Remover ${verse.reference}`}
                >
                  <Trash2 size={12} aria-hidden />
                </button>
              </li>
            ))}
          </ul>
        )}
      </Section>

      {/* Plano de vida ------------------------------------------------- */}
      <Section label="Plano de vida espiritual">
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            if (!planText.trim()) return;
            await plan.add({
              id: createId('plan'),
              title: planText.trim(),
              description: null,
              period: 'diario',
              createdAt: new Date().toISOString(),
            });
            setPlanText('');
            notify('Item adicionado ao plano.');
          }}
          className="flex items-end gap-2"
        >
          <TextInput
            value={planText}
            onChange={(event) => setPlanText(event.target.value)}
            placeholder="Um compromisso simples, possível de cumprir"
            aria-label="Novo item do plano de vida"
            maxLength={140}
          />
          <Button type="submit" size="sm" variant="outline">
            <Plus size={13} aria-hidden />
          </Button>
        </form>

        {plan.items.length === 0 ? (
          <EmptyState
            label="Sem plano ainda"
            description="Um plano de vida não é uma lista de exigências. Comece com duas ou três coisas."
          />
        ) : (
          <ul className="ruled border-y border-rule">
            {plan.items.map((item) => (
              <li key={item.id} className="flex items-center gap-3 py-2.5">
                <span className="numeral shrink-0" aria-hidden>
                  ·
                </span>
                <span className="min-w-0 flex-1 text-[0.875rem] text-ink">{item.title}</span>
                <button
                  type="button"
                  onClick={() => void plan.remove(item.id)}
                  className="p-1 text-muted transition-colors hover:text-rubric"
                  aria-label="Remover item"
                >
                  <Trash2 size={12} aria-hidden />
                </button>
              </li>
            ))}
          </ul>
        )}
      </Section>

      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1.5 border-t border-rule pt-3">
        <Meta>Seus dados</Meta>
        <p className="flex-1 text-[0.75rem] leading-relaxed text-muted">
          Quer levar seus dados com você ou apagá-los? Em Configurações há exportação e exclusão
          integral.
        </p>
        <ButtonLink to="/caminhada/configuracoes" variant="quiet" size="sm" className="px-0">
          Configurações
        </ButtonLink>
      </div>
    </div>
  );
}
