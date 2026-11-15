import { ArrowLeft, Database, EyeOff, Lock, Server, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { PageHeader } from '../../components/ui/PageHeader';
import { liturgyProviderInfo } from '../../services/liturgy';
import { DB_NAME } from '../../database/schema';

const STORED = [
  ['Configurações', 'Nome de exibição (opcional), tema e horários de oração.'],
  ['Diário espiritual', 'Título, data, texto e movimento interior (opcional).'],
  ['Intenções', 'Texto da intenção, por quem e data.'],
  ['Hábitos e registros', 'Atividades espirituais e marcações de realização.'],
  ['Versículos favoritos', 'Referência, texto e nota.'],
  ['Plano de vida', 'Itens de compromisso pessoal.'],
  ['Calendário', 'Compromissos, recorrências e grupos de oração.'],
  ['Favoritos', 'Orações e conteúdos marcados.'],
  ['Cache de liturgia', 'Última liturgia consultada, para leitura offline.'],
  ['Registro de atividades', 'Histórico local das ações realizadas no app.'],
];

export default function PrivacyPage() {
  return (
    <div className="space-y-6 animate-[var(--animate-fade-up)]">
      <Link to="/caminhada/configuracoes" className="inline-flex items-center gap-1.5 text-[0.8125rem] text-muted hover:text-ink">
        <ArrowLeft size={14} aria-hidden /> Configurações
      </Link>

      <PageHeader
        eyebrow="Privacidade"
        title="O que acontece com os seus dados"
        description="Privacidade desde a concepção. Esta página descreve, sem letras miúdas, o funcionamento real do SOPRO."
      />

      <Card className="space-y-2.5 p-5">
        <h2 className="flex items-center gap-2 text-base text-ink">
          <Lock size={16} className="text-brass" aria-hidden />
          Tudo fica no seu dispositivo
        </h2>
        <p className="text-[0.875rem] leading-relaxed text-ink-soft">
          Diário, intenções, anotações e compromissos são gravados no IndexedDB do seu navegador,
          em um banco local chamado <code className="rounded bg-surface-muted px-1.5 py-0.5 text-[0.75rem]">{DB_NAME}</code>.
          Não há conta, login, servidor de aplicação ou sincronização nesta versão. Se você limpar
          os dados do site no navegador, esses registros serão apagados.
        </p>
      </Card>

      <section className="space-y-3">
        <h2 className="text-base text-ink">Dados guardados localmente</h2>
        <div className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface">
          <dl className="divide-y divide-line">
            {STORED.map(([title, description]) => (
              <div key={title} className="grid gap-0.5 px-4 py-3 sm:grid-cols-[11rem_1fr] sm:gap-4">
                <dt className="flex items-center gap-2 text-[0.8125rem] font-medium text-ink">
                  <Database size={12} className="text-brass" aria-hidden />
                  {title}
                </dt>
                <dd className="text-[0.8125rem] leading-relaxed text-muted">{description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-base text-ink">A única conexão externa</h2>
        <Card className="space-y-2 p-4">
          <p className="flex items-start gap-2 text-[0.875rem] leading-relaxed text-ink-soft">
            <Server size={15} className="mt-0.5 shrink-0 text-brass" aria-hidden />
            <span>
              Para exibir a liturgia do dia, o SOPRO consulta a API pública{' '}
              {liturgyProviderInfo.homepage ? (
                <a
                  href={liturgyProviderInfo.homepage}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="underline decoration-line-strong underline-offset-2 hover:text-brass"
                >
                  {liturgyProviderInfo.name}
                </a>
              ) : (
                liturgyProviderInfo.name
              )}
              . Essa consulta envia apenas a data pedida e o cabeçalho padrão do navegador. Nenhum
              dado seu, nenhuma anotação ou intenção é enviado. A resposta é guardada em cache no
              seu dispositivo para uso offline.
            </span>
          </p>
          <p className="text-[0.8125rem] leading-relaxed text-muted">
            Como toda requisição HTTP, o servidor da API pode registrar o endereço IP de origem. Se
            você preferir não fazer nem essa consulta, é possível usar o SOPRO apenas com o
            conteúdo já salvo.
          </p>
        </Card>
      </section>

      <section className="space-y-3">
        <h2 className="text-base text-ink">O que o SOPRO não faz</h2>
        <Card className="p-4">
          <ul className="space-y-2 text-[0.875rem] leading-relaxed text-ink-soft">
            {[
              'Não exige cadastro nem senha para uso básico.',
              'Não usa analytics, rastreadores, pixels ou publicidade.',
              'Não vende, compartilha ou transfere seus dados.',
              'Não envia textos do diário, intenções ou anotações a terceiros.',
              'Não faz notificações em segundo plano que dependam de servidor próprio.',
              'Não usa cookies de rastreamento.',
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <EyeOff size={14} className="mt-1 shrink-0 text-brass" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      <section className="space-y-3">
        <h2 className="text-base text-ink">Seus controles</h2>
        <Card className="flex flex-wrap items-center justify-between gap-3 p-4">
          <p className="flex items-start gap-2 text-[0.875rem] leading-relaxed text-ink-soft">
            <ShieldCheck size={15} className="mt-0.5 shrink-0 text-brass" aria-hidden />
            <span>
              Em <strong className="font-medium text-ink">Configurações</strong> você pode exportar
              uma cópia completa em JSON e apagar integralmente todos os dados.
            </span>
          </p>
          <Link
            to="/caminhada/configuracoes"
            className="rounded-full border border-line-strong bg-surface px-3.5 py-2 text-[0.8125rem] font-medium text-ink transition-colors hover:border-brass/40"
          >
            Abrir configurações
          </Link>
        </Card>
      </section>

      <p className="rounded-xl border border-line bg-surface-muted/40 p-4 text-[0.75rem] leading-relaxed text-muted">
        <strong className="font-medium text-ink-soft">Nota honesta:</strong> dados locais não são
        criptografados pelo SOPRO — eles ficam protegidos pela segurança do seu navegador e do seu
        dispositivo. Em computadores compartilhados, use o modo de navegação privada ou apague os
        dados ao terminar. Se no futuro existir backend ou sincronização, haverá revisão específica
        de segurança e adequação à LGPD antes de qualquer disponibilização.
      </p>
    </div>
  );
}
