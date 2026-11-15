import { ArrowLeft, PenLine, Save, Trash2 } from 'lucide-react';
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
import { journalRepository } from '../../services/storage/repositories';
import type { JournalEntry } from '../../types/spiritual-life';
import { capitalize, formatLongDate, todayISO } from '../../utils/date';
import { createId } from '../../utils/id';

const MOODS: { value: NonNullable<JournalEntry['mood']>; label: string }[] = [
  { value: 'consolacao', label: 'Consolação — paz, luz, vontade de Deus' },
  { value: 'desolacao', label: 'Desolação — aridez, inquietação, cansaço' },
  { value: 'neutro', label: 'Neutro — sem percepção clara' },
];

const MOOD_LABEL: Record<NonNullable<JournalEntry['mood']>, string> = {
  consolacao: 'Consolação',
  desolacao: 'Desolação',
  neutro: 'Neutro',
};

/**
 * Diário espiritual.
 *
 * Texto livre, privado, com um campo opcional de "movimento interior"
 * (consolação/desolação), linguagem clássica do discernimento inaciano.
 */
export default function JournalPage() {
  const journal = useLocalCollection<JournalEntry>(journalRepository, {
    sort: (a, b) => b.date.localeCompare(a.date) || b.createdAt.localeCompare(a.createdAt),
  });
  const { notify } = useToast();

  const [date, setDate] = useState(todayISO());
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [mood, setMood] = useState<JournalEntry['mood']>(null);
  const [saving, setSaving] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!body.trim()) return;
    setSaving(true);
    try {
      const now = new Date().toISOString();
      await journal.add({
        id: createId('entry'),
        date,
        title: title.trim() || null,
        body: body.trim(),
        mood,
        createdAt: now,
        updatedAt: now,
      });
      setTitle('');
      setBody('');
      setMood(null);
      notify('Registro salvo neste dispositivo.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 animate-[var(--animate-fade-up)]">
      <Link to="/caminhada" className="inline-flex items-center gap-1.5 text-[0.8125rem] text-muted hover:text-ink">
        <ArrowLeft size={14} aria-hidden /> Minha caminhada
      </Link>

      <PageHeader
        eyebrow="Diário"
        title="Diário espiritual"
        description="Escreva o que percebeu na oração, o que agradeceu, o que pesou. Ninguém mais lê isso."
      />

      <Card className="p-4 sm:p-5">
        <form onSubmit={submit} className="space-y-3.5">
          <div className="grid gap-3.5 sm:grid-cols-2">
            <Field label="Data">
              {(id) => (
                <TextInput
                  id={id}
                  type="date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                />
              )}
            </Field>
            <Field label="Movimento interior" optional hint="Como você estava diante de Deus?">
              {(id) => (
                <Select
                  id={id}
                  value={mood ?? ''}
                  onChange={(event) =>
                    setMood((event.target.value || null) as JournalEntry['mood'])
                  }
                >
                  <option value="">Não registrar</option>
                  {MOODS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              )}
            </Field>
          </div>

          <Field label="Título" optional>
            {(id) => (
              <TextInput
                id={id}
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Uma palavra sobre hoje"
                maxLength={80}
              />
            )}
          </Field>

          <Field label="Registro">
            {(id) => (
              <TextArea
                id={id}
                rows={6}
                value={body}
                onChange={(event) => setBody(event.target.value)}
                placeholder="O que ficou do dia? O que eu quero entregar a Deus?"
                maxLength={8000}
              />
            )}
          </Field>

          <div className="flex items-center justify-between gap-3">
            <p className="text-[0.6875rem] leading-relaxed text-muted">
              Salvo no IndexedDB deste navegador. Não é enviado a nenhum servidor.
            </p>
            <Button type="submit" size="sm" disabled={saving || !body.trim()}>
              <Save size={14} aria-hidden />
              {saving ? 'Salvando…' : 'Salvar'}
            </Button>
          </div>
        </form>
      </Card>

      <section className="space-y-3">
        <h2 className="text-base text-ink">Registros</h2>

        {journal.items.length === 0 ? (
          <EmptyState
            icon={PenLine}
            title="Nenhum registro ainda"
            description="Comece com uma frase. Não precisa ser bonito nem completo."
          />
        ) : (
          <ul className="space-y-2.5">
            {journal.items.map((entry) => (
              <li key={entry.id}>
                <Card className="p-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="text-[0.6875rem] uppercase tracking-[0.1em] text-brass">
                      {capitalize(formatLongDate(entry.date))}
                    </p>
                    <div className="flex items-center gap-2">
                      {entry.mood && <Badge>{MOOD_LABEL[entry.mood]}</Badge>}
                      <button
                        type="button"
                        onClick={async () => {
                          if (!window.confirm('Excluir este registro?')) return;
                          await journal.remove(entry.id);
                          notify('Registro excluído.');
                        }}
                        className="rounded-full p-1.5 text-muted transition-colors hover:bg-liturgy-red/8 hover:text-liturgy-red"
                        aria-label="Excluir registro"
                      >
                        <Trash2 size={13} aria-hidden />
                      </button>
                    </div>
                  </div>
                  {entry.title && (
                    <h3 className="mt-1 font-display text-[1.0625rem] text-ink">{entry.title}</h3>
                  )}
                  <p className="mt-1.5 whitespace-pre-line text-[0.875rem] leading-relaxed text-ink-soft">
                    {entry.body}
                  </p>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
