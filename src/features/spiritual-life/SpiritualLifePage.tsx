import {
  BookHeart,
  Check,
  Circle,
  Flame,
  Heart,
  NotebookPen,
  PenLine,
  Plus,
  Sparkles,
  Target,
  Trash2,
  Undo2,
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { EmptyState } from '../../components/ui/EmptyState';
import { Field, Select, TextArea, TextInput } from '../../components/ui/Field';
import { PageHeader } from '../../components/ui/PageHeader';
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
    const now = new Date().toISOString();
    await habits.add({
      id: createId('habit'),
      title: newHabit.trim(),
      kind: newHabitKind,
      targetPerWeek: 7,
      weekdays: [],
      active: true,
      createdAt: now,
    });
    setNewHabit('');
    notify('Hábito adicionado.');
  };

  return (
    <div className="space-y-8 animate-[var(--animate-fade-up)]">
      <PageHeader
        eyebrow="Minha caminhada"
        title="Minha caminhada"
        description="Um espaço privado para o seu ritmo: hábitos, intenções, versículos e plano de vida. Nada daqui sai deste dispositivo."
        action={
          <Link to="/caminhada/diario" className="inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-surface px-3.5 py-2 text-[0.8125rem] font-medium text-ink transition-colors hover:border-brass/40">
            <NotebookPen size={14} aria-hidden />
            Diário
          </Link>
        }
      />

      {/* Hábitos -------------------------------------------------------- */}
      <section className="space-y-3">
        <h2 className="text-base text-ink">Rotina e hábitos</h2>

        {habits.items.length === 0 ? (
          <EmptyState
            compact
            icon={Target}
            title="Defina sua rotina"
            description="Comece com um hábito por vez: oração da manhã, leitura bíblica, terço."
          />
        ) : (
          <Card className="overflow-hidden">
            <ul className="divide-y divide-line">
              {habits.items.map((habit) => (
                <li key={habit.id} className="flex flex-wrap items-center gap-3 px-4 py-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-[0.9375rem] text-ink">{habit.title}</p>
                    <p className="text-[0.6875rem] text-muted">
                      {HABIT_KINDS.find((kind) => kind.value === habit.kind)?.label}
                    </p>
                  </div>
                  <div className="flex items-center gap-1" role="group" aria-label={`Marcações de ${habit.title}`}>
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
                            'flex size-6 items-center justify-center rounded-full border text-[0.5rem] transition-colors',
                            done
                              ? 'border-brass/40 bg-brass text-white'
                              : 'border-line text-muted hover:border-brass/40',
                          )}
                        >
                          {done ? (
                            <Check size={10} strokeWidth={3} aria-hidden />
                          ) : (
                            <span aria-hidden>{WEEKDAY_SHORT[new Date(date + 'T12:00:00').getDay()]?.[0]}</span>
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
                    className="rounded-full p-1.5 text-muted transition-colors hover:bg-liturgy-red/8 hover:text-liturgy-red"
                    aria-label={`Remover ${habit.title}`}
                  >
                    <Trash2 size={13} aria-hidden />
                  </button>
                </li>
              ))}
            </ul>
          </Card>
        )}

        <form onSubmit={addHabit} className="flex flex-wrap items-end gap-2">
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
          <Button type="submit" size="sm" variant="secondary">
            <Plus size={14} aria-hidden />
            Adicionar
          </Button>
        </form>
        <p className="text-[0.6875rem] leading-relaxed text-muted">
          Os sete círculos mostram a última semana. Marcar não é nota — serve para você perceber
          padrões, não para cobrar constância.
        </p>
      </section>

      {/* Diário -------------------------------------------------------- */}
      <section className="space-y-3">
        <div className="flex items-end justify-between gap-3">
          <h2 className="text-base text-ink">Diário espiritual</h2>
          <Link to="/caminhada/diario" className="text-[0.75rem] text-ink-soft hover:text-brass">
            Ver tudo
          </Link>
        </div>
        {journal.items.length === 0 ? (
          <EmptyState
            compact
            icon={PenLine}
            title="Ainda sem registros"
            description="Escreva quando quiser. Um parágrafo basta."
            action={
              <Link to="/caminhada/diario" className="inline-flex items-center gap-1.5 text-[0.75rem] font-medium text-ink hover:text-brass">
                Abrir o diário
              </Link>
            }
          />
        ) : (
          <ul className="space-y-2">
            {journal.items.slice(0, 3).map((entry) => (
              <li key={entry.id}>
                <Card className="p-4">
                  <p className="text-[0.6875rem] uppercase tracking-[0.1em] text-brass">
                    {formatShortDate(entry.date)}
                  </p>
                  {entry.title && <p className="mt-0.5 text-[0.9375rem] text-ink">{entry.title}</p>}
                  <p className="mt-1 line-clamp-3 whitespace-pre-line text-[0.8125rem] leading-relaxed text-muted">
                    {entry.body}
                  </p>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Intenções ----------------------------------------------------- */}
      <section className="space-y-3">
        <h2 className="text-base text-ink">Intenções</h2>
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
            notify('Intenção guardada. Vamos rezar por ela.');
          }}
          className="flex gap-2"
        >
          <TextInput
            value={newIntention}
            onChange={(event) => setNewIntention(event.target.value)}
            placeholder="Por quem você quer rezar?"
            aria-label="Nova intenção"
            maxLength={200}
          />
          <Button type="submit" size="sm" variant="secondary">
            <Plus size={14} aria-hidden />
          </Button>
        </form>

        {intentions.items.length === 0 ? (
          <EmptyState
            compact
            icon={Heart}
            title="Nenhuma intenção"
            description="Escreva um nome ou um pedido. Fica só entre você e Deus."
          />
        ) : (
          <ul className="space-y-2">
            {intentions.items.map((intention) => (
              <li key={intention.id}>
                <Card className="flex items-center gap-3 px-4 py-3">
                  <span className="flex-1 text-[0.875rem] text-ink">{intention.text}</span>
                  {intention.answeredAt ? (
                    <Badge tone="brass">
                      <Sparkles size={10} aria-hidden />
                      Atendida
                    </Badge>
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        void intentions.update({
                          ...intention,
                          answeredAt: new Date().toISOString(),
                        })
                      }
                      className="text-[0.6875rem] text-muted transition-colors hover:text-brass"
                    >
                      Marcar como atendida
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => void intentions.remove(intention.id)}
                    className="rounded-full p-1.5 text-muted hover:bg-liturgy-red/8 hover:text-liturgy-red"
                    aria-label="Remover intenção"
                  >
                    <Trash2 size={12} aria-hidden />
                  </button>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Versículos ---------------------------------------------------- */}
      <section className="space-y-3">
        <h2 className="text-base text-ink">Versículos favoritos</h2>
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
          className="space-y-2 rounded-[var(--radius-card)] border border-line bg-surface p-3.5"
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
            <Button type="submit" size="sm" variant="secondary">
              <Plus size={14} aria-hidden />
              Guardar
            </Button>
          </div>
        </form>

        {verses.items.length === 0 ? (
          <p className="text-[0.75rem] text-muted">
            Guarde aqui os versículos que falam com você. Sempre à mão, offline.
          </p>
        ) : (
          <ul className="grid gap-2 sm:grid-cols-2">
            {verses.items.map((verse) => (
              <li key={verse.id}>
                <Card className="flex h-full flex-col justify-between gap-2 p-4">
                  <div>
                    <p className="text-[0.6875rem] uppercase tracking-[0.1em] text-brass">
                      {verse.reference}
                    </p>
                    <p className="mt-1 font-display text-[0.9375rem] leading-relaxed text-ink-soft">
                      {verse.text}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => void verses.remove(verse.id)}
                    className="self-end rounded-full p-1.5 text-muted hover:bg-liturgy-red/8 hover:text-liturgy-red"
                    aria-label={`Remover ${verse.reference}`}
                  >
                    <Trash2 size={12} aria-hidden />
                  </button>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Plano de vida ------------------------------------------------- */}
      <section className="space-y-3">
        <h2 className="text-base text-ink">Plano de vida espiritual</h2>
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
          className="flex gap-2"
        >
          <TextInput
            value={planText}
            onChange={(event) => setPlanText(event.target.value)}
            placeholder="Um compromisso simples, possível de cumprir"
            aria-label="Novo item do plano de vida"
            maxLength={140}
          />
          <Button type="submit" size="sm" variant="secondary">
            <Plus size={14} aria-hidden />
          </Button>
        </form>

        {plan.items.length === 0 ? (
          <EmptyState
            compact
            icon={BookHeart}
            title="Sem plano ainda"
            description="Um plano de vida não é uma lista de exigências. Comece com duas ou três coisas."
          />
        ) : (
          <ul className="space-y-1.5">
            {plan.items.map((item) => (
              <li key={item.id}>
                <Card className="flex items-center gap-3 px-4 py-2.5">
                  <Circle size={16} className="shrink-0 text-brass/60" aria-hidden />
                  <span className="flex-1 text-[0.875rem] text-ink">{item.title}</span>
                  <button
                    type="button"
                    onClick={() => void plan.remove(item.id)}
                    className="rounded-full p-1.5 text-muted hover:bg-liturgy-red/8 hover:text-liturgy-red"
                    aria-label="Remover item"
                  >
                    <Trash2 size={12} aria-hidden />
                  </button>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </section>

      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-line bg-surface-muted/40 px-4 py-3">
        <Flame size={15} className="text-brass" aria-hidden />
        <p className="flex-1 text-[0.75rem] leading-relaxed text-muted">
          Quer levar seus dados com você ou apagá-los? Em Configurações há exportação e exclusão
          integral.
        </p>
        <Link
          to="/caminhada/configuracoes"
          className="inline-flex items-center gap-1 text-[0.75rem] font-medium text-ink hover:text-brass"
        >
          <Undo2 size={12} aria-hidden />
          Configurações
        </Link>
      </div>
    </div>
  );
}
