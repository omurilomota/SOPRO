import { ArrowLeft, EyeOff } from 'lucide-react';
import { ButtonLink } from '../../components/ui/Button';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../components/ui/PageHeader';
import { Meta } from '../../components/ui/Marks';
import { Section } from '../../components/ui/Structure';
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
    <div className="space-y-8 animate-[var(--animate-fade)]">
      <Link
        to="/caminhada/configuracoes"
        className="inline-flex items-center gap-1.5 text-[0.875rem] text-muted transition-colors hover:text-rubric"
      >
        <ArrowLeft size={13} aria-hidden /> Configurações
      </Link>

      <PageHeader
        label="Privacidade"
        title="O que acontece com os seus dados"
        description="Privacidade desde a concepção. Esta página descreve, sem letras miúdas, o funcionamento real do SOPRO."
      />

      <section className="border-y border-rule py-4">
        <h2 className="font-display text-[1.25rem] text-ink">Tudo fica no seu dispositivo</h2>
        <p className="mt-2 max-w-[58ch] text-[0.875rem] leading-relaxed text-ink-2">
          Diário, intenções, anotações e compromissos são gravados no IndexedDB do seu navegador,
          em um banco local chamado{' '}
          <code className="border-b border-rule-strong px-0.5 font-mono text-[0.875rem]">{DB_NAME}</code>.
          Não há conta, login, servidor de aplicação ou sincronização nesta versão. Se você limpar
          os dados do site no navegador, esses registros serão apagados.
        </p>
      </section>

      <Section label="Dados guardados localmente">
        <dl className="ruled border-y border-rule">
          {STORED.map(([title, description]) => (
            <div key={title} className="grid gap-0.5 py-3 sm:grid-cols-[11rem_1fr] sm:gap-5">
              <dt className="text-[0.875rem] font-medium text-ink">{title}</dt>
              <dd className="text-[0.875rem] leading-relaxed text-muted">{description}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section label="A única conexão externa">
        <div className="space-y-2">
          <p className="text-[0.875rem] leading-relaxed text-ink-2">
            <span>
              Para exibir a liturgia do dia, o SOPRO consulta a API pública{' '}
              {liturgyProviderInfo.homepage ? (
                <a
                  href={liturgyProviderInfo.homepage}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="underline decoration-rule-strong underline-offset-2 hover:text-rubric"
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
          <p className="text-[0.875rem] leading-relaxed text-muted">
            Como toda requisição HTTP, o servidor da API pode registrar o endereço IP de origem. Se
            você preferir não fazer nem essa consulta, é possível usar o SOPRO apenas com o
            conteúdo já salvo.
          </p>
        </div>
      </Section>

      <Section label="O que o SOPRO não faz">
        <div>
          <ul className="space-y-2 text-[0.875rem] leading-relaxed text-ink-2">
            {[
              'Não exige cadastro nem senha para uso básico.',
              'Não usa analytics, rastreadores, pixels ou publicidade.',
              'Não vende, compartilha ou transfere seus dados.',
              'Não envia textos do diário, intenções ou anotações a terceiros.',
              'Não faz notificações em segundo plano que dependam de servidor próprio.',
              'Não usa cookies de rastreamento.',
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <EyeOff size={12} className="mt-2 shrink-0 text-muted" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section label="Seus controles">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="max-w-[58ch] text-[0.875rem] leading-relaxed text-ink-2">
            <span>
              Em <strong className="font-medium text-ink">Configurações</strong> você pode exportar
              uma cópia completa em JSON e apagar integralmente todos os dados.
            </span>
          </p>
          <ButtonLink to="/caminhada/configuracoes" variant="outline" size="sm">
            Abrir configurações
          </ButtonLink>
        </div>
      </Section>

      <p className="border-t border-rule pt-3 text-[0.8125rem] leading-relaxed text-muted">
        <Meta>Nota honesta</Meta>{' '}
        <span className="mt-1 block">Dados locais não são
        criptografados pelo SOPRO — eles ficam protegidos pela segurança do seu navegador e do seu
        dispositivo. Em computadores compartilhados, use o modo de navegação privada ou apague os
        dados ao terminar. Se no futuro existir backend ou sincronização, haverá revisão específica
        de segurança e adequação à LGPD antes de qualquer disponibilização.</span>
      </p>
    </div>
  );
}
