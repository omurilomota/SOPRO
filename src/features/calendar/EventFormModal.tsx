import { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Field, Select, TextArea, TextInput } from '../../components/ui/Field';
import { Modal } from '../../components/ui/Modal';
import type { CalendarEvent, EventKind, Recurrence } from '../../types/calendar';
import type { ISODate, ISOTime } from '../../types/common';
import { WEEKDAY_NAMES } from '../../utils/date';
import { EVENT_KINDS } from './eventMeta';

export interface EventDraft {
  title: string;
  kind: EventKind;
  date: ISODate;
  startTime: ISOTime | null;
  endTime: ISOTime | null;
  location: string | null;
  notes: string | null;
  recurrence: Recurrence;
  prayerGroupId: string | null;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (draft: EventDraft) => Promise<void>;
  initialDate: ISODate;
  event?: CalendarEvent;
  prayerGroupId?: string | null;
}

const RECURRENCE_OPTIONS = [
  { value: 'none', label: 'Não se repete' },
  { value: 'weekly', label: 'Toda semana' },
  { value: 'biweekly', label: 'A cada duas semanas' },
  { value: 'monthly', label: 'Todo mês' },
] as const;

export function EventFormModal({
  open,
  onClose,
  onSubmit,
  initialDate,
  event,
  prayerGroupId = null,
}: Props) {
  const [title, setTitle] = useState(event?.title ?? '');
  const [kind, setKind] = useState<EventKind>(event?.kind ?? 'missa');
  const [date, setDate] = useState(event?.date ?? initialDate);
  const [startTime, setStartTime] = useState(event?.startTime ?? '19:30');
  const [endTime, setEndTime] = useState(event?.endTime ?? '');
  const [location, setLocation] = useState(event?.location ?? '');
  const [notes, setNotes] = useState(event?.notes ?? '');
  const [frequency, setFrequency] = useState<Recurrence['frequency']>(
    event?.recurrence.frequency ?? 'none',
  );
  const [until, setUntil] = useState(event?.recurrence.until ?? '');
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Se o modal for reaberto para outro evento/data, reinicializa o formulário.
  const [seed, setSeed] = useState(`${event?.id ?? 'new'}:${initialDate}`);
  const currentSeed = `${event?.id ?? 'new'}:${initialDate}`;
  if (seed !== currentSeed) {
    setSeed(currentSeed);
    setTitle(event?.title ?? '');
    setKind(event?.kind ?? 'missa');
    setDate(event?.date ?? initialDate);
    setStartTime(event?.startTime ?? '19:30');
    setEndTime(event?.endTime ?? '');
    setLocation(event?.location ?? '');
    setNotes(event?.notes ?? '');
    setFrequency(event?.recurrence.frequency ?? 'none');
    setUntil(event?.recurrence.until ?? '');
    setFormError(null);
  }

  const handleSubmit = async (submitEvent: React.FormEvent) => {
    submitEvent.preventDefault();
    setFormError(null);

    if (!title.trim()) {
      setFormError('Dê um nome ao compromisso.');
      return;
    }
    if (endTime && startTime && endTime < startTime) {
      setFormError('O horário de término deve ser depois do início.');
      return;
    }

    setSaving(true);
    try {
      await onSubmit({
        title: title.trim(),
        kind,
        date,
        startTime: startTime || null,
        endTime: endTime || null,
        location: location.trim() || null,
        notes: notes.trim() || null,
        recurrence: {
          frequency,
          ...(frequency === 'weekly' || frequency === 'biweekly'
            ? { weekday: new Date(date + 'T12:00:00').getDay() }
            : {}),
          until: until || null,
        },
        prayerGroupId,
      });
      onClose();
    } catch {
      setFormError('Não foi possível salvar. Tente novamente.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={event ? 'Editar compromisso' : 'Novo compromisso'}
      description="Tudo fica salvo apenas neste dispositivo."
      footer={
        <>
          <Button variant="quiet" size="sm" onClick={onClose} disabled={saving}>
            Cancelar
          </Button>
          <Button size="sm" onClick={handleSubmit} disabled={saving}>
            {saving ? 'Salvando…' : 'Salvar'}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Field label="Nome do compromisso">
          {(id) => (
            <TextInput
              id={id}
              value={title}
              onChange={(event_) => setTitle(event_.target.value)}
              placeholder="Missa na comunidade, reunião do grupo…"
              maxLength={90}
              autoComplete="off"
            />
          )}
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Tipo">
            {(id) => (
              <Select id={id} value={kind} onChange={(event_) => setKind(event_.target.value as EventKind)}>
                {EVENT_KINDS.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </Select>
            )}
          </Field>

          <Field label="Data">
            {(id) => (
              <TextInput
                id={id}
                type="date"
                value={date}
                onChange={(event_) => setDate(event_.target.value)}
                required
              />
            )}
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Início" optional>
            {(id) => (
              <TextInput
                id={id}
                type="time"
                value={startTime}
                onChange={(event_) => setStartTime(event_.target.value)}
              />
            )}
          </Field>
          <Field label="Término" optional>
            {(id) => (
              <TextInput
                id={id}
                type="time"
                value={endTime}
                onChange={(event_) => setEndTime(event_.target.value)}
              />
            )}
          </Field>
        </div>

        <Field label="Local" optional hint="Endereço é opcional — você pode deixar em branco.">
          {(id) => (
            <TextInput
              id={id}
              value={location ?? ''}
              onChange={(event_) => setLocation(event_.target.value)}
              placeholder="Paróquia, capela, salão…"
              maxLength={120}
            />
          )}
        </Field>

        <Field label="Repetição">
          {(id) => (
            <Select
              id={id}
              value={frequency}
              onChange={(event_) => setFrequency(event_.target.value as Recurrence['frequency'])}
            >
              {RECURRENCE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          )}
        </Field>

        {frequency !== 'none' && (
          <>
            <Field
              label="Repetir até"
              optional
              hint={
                frequency === 'weekly' || frequency === 'biweekly'
                  ? `Repete toda ${WEEKDAY_NAMES[new Date(date + 'T12:00:00').getDay()]?.toLowerCase()} a partir da data acima.`
                  : 'Todo mês no mesmo dia. Meses sem esse dia são ignorados.'
              }
            >
              {(id) => (
                <TextInput
                  id={id}
                  type="date"
                  value={until ?? ''}
                  onChange={(event_) => setUntil(event_.target.value)}
                />
              )}
            </Field>
          </>
        )}

        <Field label="Anotações" optional>
          {(id) => (
            <TextArea
              id={id}
              rows={3}
              value={notes ?? ''}
              onChange={(event_) => setNotes(event_.target.value)}
              placeholder="Qualquer detalhe que ajude você a se lembrar."
              maxLength={600}
            />
          )}
        </Field>

        {formError && (
          <p role="alert" className="rounded-lg bg-liturgy-red/8 px-3 py-2 text-[0.75rem] text-liturgy-red">
            {formError}
          </p>
        )}
      </form>
    </Modal>
  );
}
