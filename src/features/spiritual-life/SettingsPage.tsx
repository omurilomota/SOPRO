import { ArrowLeft, Download, MonitorSmartphone, Moon, Sun, Trash2, Upload } from 'lucide-react';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Field, TextInput } from '../../components/ui/Field';
import { PageHeader } from '../../components/ui/PageHeader';
import { Section } from '../../components/ui/Structure';
import { Meta } from '../../components/ui/Marks';
import { useToast } from '../../components/ui/Toast';
import { useSettings } from '../../hooks/useSettings';
import {
  buildBackup,
  downloadBackup,
  eraseAllData,
  restoreBackup,
  validateBackup,
} from '../../services/storage/backup';
import { cn } from '../../utils/cn';

const THEMES = [
  { value: 'light', label: 'Claro', icon: Sun },
  { value: 'dark', label: 'Escuro', icon: Moon },
  { value: 'system', label: 'Sistema', icon: MonitorSmartphone },
] as const;

export default function SettingsPage() {
  const { settings, updateSettings } = useSettings();
  const { notify } = useToast();
  const fileInput = useRef<HTMLInputElement>(null);
  const [name, setName] = useState(settings?.name ?? '');
  const [busy, setBusy] = useState(false);

  const handleExport = async () => {
    setBusy(true);
    try {
      const backup = await buildBackup();
      downloadBackup(backup);
      notify('Cópia de segurança gerada neste dispositivo.');
    } catch (error) {
      notify(error instanceof Error ? error.message : 'Não foi possível exportar.', 'error');
    } finally {
      setBusy(false);
    }
  };

  const handleImport = async (file: File) => {
    setBusy(true);
    try {
      const text = await file.text();
      const backup = validateBackup(JSON.parse(text));
      if (
        !window.confirm(
          'Restaurar esta cópia substituirá todos os dados atuais deste dispositivo. Continuar?',
        )
      ) {
        return;
      }
      await restoreBackup(backup);
      notify('Dados restaurados. Recarregando…');
      window.setTimeout(() => window.location.reload(), 800);
    } catch (error) {
      notify(error instanceof Error ? error.message : 'Arquivo inválido.', 'error');
    } finally {
      setBusy(false);
    }
  };

  const handleErase = async () => {
    const confirmation = window.prompt(
      'Isso apagará diário, intenções, hábitos, compromissos e favoritos deste dispositivo, sem recuperação. Digite APAGAR para confirmar.',
    );
    if (confirmation !== 'APAGAR') return;
    setBusy(true);
    try {
      await eraseAllData();
      notify('Todos os dados locais foram apagados.');
      window.setTimeout(() => window.location.reload(), 800);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-8 animate-[var(--animate-fade)]">
      <Link
        to="/caminhada"
        className="inline-flex items-center gap-1.5 text-[0.875rem] text-muted transition-colors hover:text-rubric"
      >
        <ArrowLeft size={13} aria-hidden /> Minha caminhada
      </Link>

      <PageHeader
        label="Configurações"
        title="Preferências e dados"
        description="Aparência, identificação e controle total sobre o que está guardado neste dispositivo."
      />

      <Section label="Aparência">
        <div className="flex flex-wrap gap-x-4 gap-y-2" role="group" aria-label="Tema">
          {THEMES.map((theme) => (
            <button
              key={theme.value}
              type="button"
              onClick={() => void updateSettings({ theme: theme.value })}
              aria-pressed={settings?.theme === theme.value}
              className={cn(
                'flex items-center gap-1.5 border-b pb-0.5 text-[0.875rem] transition-colors',
                settings?.theme === theme.value
                  ? 'border-rubric text-rubric'
                  : 'border-transparent text-muted hover:text-ink-2',
              )}
            >
              <theme.icon size={13} aria-hidden />
              {theme.label}
            </button>
          ))}
        </div>
      </Section>

      <Section label="Como quer ser chamado">
        <div>
          <Field
            label="Nome ou apelido"
            optional
            hint="Usado apenas na saudação da tela Hoje. Pode deixar em branco."
          >
            {(id) => (
              <div className="flex gap-2">
                <TextInput
                  id={id}
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Maria, Zé, Irmã Clara…"
                  maxLength={40}
                />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    void updateSettings({ name: name.trim() || null });
                    notify('Nome atualizado.');
                  }}
                >
                  Salvar
                </Button>
              </div>
            )}
          </Field>
        </div>
      </Section>

      <Section label="Seus dados">
        <div className="ruled border-y border-rule">
          <div className="flex flex-wrap items-center justify-between gap-3 py-3.5">
            <div className="min-w-0">
              <p className="text-[0.9375rem] text-ink">Exportar cópia de segurança</p>
              <p className="text-[0.8125rem] leading-relaxed text-muted">
                Gera um arquivo JSON com tudo o que está salvo. O arquivo fica com você.
              </p>
            </div>
            <Button size="sm" variant="outline" onClick={handleExport} disabled={busy}>
              <Download size={14} aria-hidden />
              Exportar
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 py-3.5">
            <div className="min-w-0">
              <p className="text-[0.9375rem] text-ink">Restaurar de uma cópia</p>
              <p className="text-[0.8125rem] leading-relaxed text-muted">
                Substitui os dados atuais pelos do arquivo. Ação irreversível.
              </p>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => fileInput.current?.click()}
              disabled={busy}
            >
              <Upload size={14} aria-hidden />
              Importar
            </Button>
            <input
              ref={fileInput}
              type="file"
              accept="application/json,.json"
              className="hidden"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) void handleImport(file);
                event.target.value = '';
              }}
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 py-3.5">
            <div className="min-w-0">
              <p className="text-[0.9375rem] text-rubric">Excluir todos os dados</p>
              <p className="text-[0.8125rem] leading-relaxed text-muted">
                Apaga diário, intenções, hábitos, compromissos, favoritos e cache de liturgia.
              </p>
            </div>
            <Button size="sm" variant="danger" onClick={handleErase} disabled={busy}>
              <Trash2 size={14} aria-hidden />
              Excluir tudo
            </Button>
          </div>
        </div>
      </Section>

      <p className="border-t border-rule pt-3 text-[0.8125rem] leading-relaxed text-muted">
        <Meta>Privacidade</Meta>{' '}
        Para entender exatamente o que é armazenado e onde, leia a{' '}
        <Link to="/privacidade" className="underline decoration-rule-strong underline-offset-2 hover:text-rubric">
          política de privacidade
        </Link>
        .
      </p>
    </div>
  );
}
