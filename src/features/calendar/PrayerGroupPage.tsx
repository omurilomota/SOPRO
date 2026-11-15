import { ArrowLeft, Clock, MapPin, Pencil, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { EmptyState } from '../../components/ui/EmptyState';
import { Field, Select, TextArea, TextInput } from '../../components/ui/Field';
import { Modal } from '../../components/ui/Modal';
import { PageHeader } from '../../components/ui/PageHeader';
import { useToast } from '../../components/ui/Toast';
import { useCalendarEvents, usePrayerGroups } from '../../hooks/useCalendar';
import type { PrayerGroup } from '../../types/calendar';
import { WEEKDAY_NAMES, formatTime } from '../../utils/date';
import { useTheme } from '../../app/providers/ThemeProvider';

const DAY_OPTIONS = WEEKDAY_NAMES.map((label, index) => ({ value: index, label }));

/**
 * Cadastro do próprio grupo de oração.
 *
 * Dados de localização são opcionais. Nesta versão não há rede nacional de
 * grupos — tudo fica no dispositivo do usuário.
 */
export default function PrayerGroupPage() {
  const { items, loading, create, save, remove } = usePrayerGroups();
  const { create: createEvent } = useCalendarEvents();
  const { notify } = useToast();
  const { settings } = useTheme();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<PrayerGroup | undefined>(undefined);

  const openNew = () => {
    setEditing(undefined);
    setOpen(true);
  };

  return (
    <div className="space-y-6 animate-[var(--animate-fade)]">
      <Link
        to="/calendario"
        className="inline-flex items-center gap-1.5 text-[0.875rem] text-muted transition-colors hover:text-rubric"
      >
        <ArrowLeft size={13} aria-hidden /> Calendário
      </Link>

      <PageHeader
        label="Grupo de oração"
        title="Meu grupo de oração"
        description="Cadastre o dia e o horário da sua reunião. Sem endereço obrigatório, sem cadastro público."
        action={
          <Button size="sm" onClick={openNew}>
            <Plus size={14} aria-hidden />
            Adicionar grupo
          </Button>
        }
      />

      {loading ? (
        <div className="h-20 animate-pulse bg-paper-2" />
      ) : items.length === 0 ? (
        <EmptyState
          label="Nenhum grupo cadastrado"
          description="Informe o nome e o dia da semana da reunião. Depois você poderá ver o próximo encontro na tela Hoje."
          action={
            <Button size="sm" variant="outline" onClick={openNew}>
              Cadastrar meu grupo
            </Button>
          }
        />
      ) : (
        <ul className="ruled border-y border-rule">
          {items.map((group) => (
            <li key={group.id}>
              <div className="py-3.5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="font-display text-[1.0625rem] text-ink">{group.name}</h2>
                    <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.8125rem] text-muted">
                      <span className="flex items-center gap-1">
                        <Clock size={12} aria-hidden />
                        {WEEKDAY_NAMES[group.weekday]} · {formatTime(group.startTime)}
                        {group.endTime && ` – ${formatTime(group.endTime)}`}
                      </span>
                      {group.location && (
                        <span className="flex items-center gap-1">
                          <MapPin size={12} aria-hidden />
                          {group.location}
                        </span>
                      )}
                    </p>
                    {group.notes && (
                      <p className="mt-2 text-[0.8125rem] leading-relaxed text-muted">{group.notes}</p>
                    )}
                  </div>
                  <div className="flex shrink-0 gap-0.5">
                    <button
                      type="button"
                      onClick={() => {
                        setEditing(group);
                        setOpen(true);
                      }}
                      className="p-1 text-muted transition-colors hover:text-ink"
                      aria-label={`Editar ${group.name}`}
                    >
                      <Pencil size={13} aria-hidden />
                    </button>
                    <button
                      type="button"
                      onClick={async () => {
                        if (!window.confirm(`Remover "${group.name}"?`)) return;
                        await remove(group.id);
                        notify('Grupo removido.');
                      }}
                      className="p-1 text-muted transition-colors hover:text-rubric"
                      aria-label={`Remover ${group.name}`}
                    >
                      <Trash2 size={13} aria-hidden />
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="border-t border-rule pt-3 text-[0.8125rem] leading-relaxed text-muted">
        <p className="mb-1 font-medium text-ink-2">Por que só no dispositivo?</p>
        <p>
          Nesta primeira versão não existe rede nacional de grupos nem cadastro público de
          participantes. Participar de um grupo de oração envolve dados sensíveis — se um dia houver
          compartilhamento, ele será opcional e precedido de revisão de privacidade e adequação à
          LGPD.
        </p>
      </div>

      <PrayerGroupModal
        open={open}
        onClose={() => {
          setOpen(false);
          setEditing(undefined);
        }}
        group={editing}
        defaultName={settings?.name ? `Grupo de ${settings.name}` : ''}
        onSubmit={async (data) => {
          let groupId: string;
          if (editing) {
            await save({ ...editing, ...data });
            groupId = editing.id;
            notify('Grupo atualizado.');
          } else {
            const created = await create(data);
            groupId = created.id;
            notify('Grupo cadastrado.');
          }
          if (!editing) {
            await createEvent({
              title: data.name,
              kind: 'grupo-oracao',
              date: nextDateForWeekday(data.weekday),
              startTime: data.startTime,
              endTime: data.endTime,
              location: data.location,
              notes: 'Reunião semanal do grupo de oração.',
              recurrence: { frequency: 'weekly', weekday: data.weekday, until: null },
              prayerGroupId: groupId,
            });
          }
        }}
      />
    </div>
  );
}

function nextDateForWeekday(weekday: number): string {
  const today = new Date();
  const delta = (weekday - today.getDay() + 7) % 7;
  const target = new Date(today.getFullYear(), today.getMonth(), today.getDate() + delta, 12);
  return `${target.getFullYear()}-${String(target.getMonth() + 1).padStart(2, '0')}-${String(
    target.getDate(),
  ).padStart(2, '0')}`;
}

interface ModalProps {
  open: boolean;
  onClose: () => void;
  group?: PrayerGroup | undefined;
  defaultName: string;
  onSubmit: (data: Omit<PrayerGroup, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
}

function PrayerGroupModal({ open, onClose, group, defaultName, onSubmit }: ModalProps) {
  const [name, setName] = useState(group?.name ?? defaultName);
  const [weekday, setWeekday] = useState(group?.weekday ?? 3);
  const [startTime, setStartTime] = useState(group?.startTime ?? '19:30');
  const [endTime, setEndTime] = useState(group?.endTime ?? '21:00');
  const [location, setLocation] = useState(group?.location ?? '');
  const [notes, setNotes] = useState(group?.notes ?? '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [seed, setSeed] = useState(`${group?.id ?? 'new'}:${open}`);
  const currentSeed = `${group?.id ?? 'new'}:${open}`;
  if (seed !== currentSeed) {
    setSeed(currentSeed);
    setName(group?.name ?? defaultName);
    setWeekday(group?.weekday ?? 3);
    setStartTime(group?.startTime ?? '19:30');
    setEndTime(group?.endTime ?? '21:00');
    setLocation(group?.location ?? '');
    setNotes(group?.notes ?? '');
    setError(null);
  }

  const submit = async (formEvent: React.FormEvent) => {
    formEvent.preventDefault();
    if (!name.trim()) {
      setError('Dê um nome ao grupo.');
      return;
    }
    setSaving(true);
    try {
      await onSubmit({
        name: name.trim(),
        weekday,
        startTime,
        endTime: endTime || null,
        location: location.trim() || null,
        notes: notes.trim() || null,
      });
      onClose();
    } catch {
      setError('Não foi possível salvar. Tente novamente.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={group ? 'Editar grupo' : 'Cadastrar grupo de oração'}
      description="O endereço é opcional."
      footer={
        <>
          <Button variant="quiet" size="sm" onClick={onClose} disabled={saving}>
            Cancelar
          </Button>
          <Button size="sm" onClick={submit} disabled={saving}>
            {saving ? 'Salvando…' : 'Salvar'}
          </Button>
        </>
      }
    >
      <form onSubmit={submit} className="space-y-4">
        <Field label="Nome do grupo">
          {(id) => (
            <TextInput
              id={id}
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Grupo de Oração Sementes do Verbo"
              maxLength={80}
            />
          )}
        </Field>

        <Field label="Dia da semana">
          {(id) => (
            <Select
              id={id}
              value={weekday}
              onChange={(event) => setWeekday(Number(event.target.value))}
            >
              {DAY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          )}
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Início">
            {(id) => (
              <TextInput
                id={id}
                type="time"
                value={startTime}
                onChange={(event) => setStartTime(event.target.value)}
              />
            )}
          </Field>
          <Field label="Término" optional>
            {(id) => (
              <TextInput
                id={id}
                type="time"
                value={endTime}
                onChange={(event) => setEndTime(event.target.value)}
              />
            )}
          </Field>
        </div>

        <Field label="Local" optional>
          {(id) => (
            <TextInput
              id={id}
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              placeholder="Paróquia, capela, salão…"
              maxLength={120}
            />
          )}
        </Field>

        <Field label="Observações" optional>
          {(id) => (
            <TextArea
              id={id}
              rows={3}
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Quem coordena, quem acolhe, como chegar…"
              maxLength={400}
            />
          )}
        </Field>

        {error && (
          <p role="alert" className="border-l-2 border-rubric pl-3 text-[0.8125rem] text-rubric">
            {error}
          </p>
        )}
      </form>
    </Modal>
  );
}
