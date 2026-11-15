import { ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../components/ui/PageHeader';
import { Meta, Tag } from '../../components/ui/Marks';
import { Section } from '../../components/ui/Structure';
import { contentResources, formationTracks } from '../../data/formations';

const LEVEL_LABEL = {
  iniciante: 'Iniciante',
  intermediario: 'Intermediário',
  avancado: 'Avançado',
} as const;

const LICENSE_LABEL = {
  'link-only': 'Apenas link',
  'cc-by': 'CC BY',
  'cc-by-sa': 'CC BY-SA',
  'dominio-publico': 'Domínio público',
  proprio: 'Conteúdo do SOPRO',
  desconhecida: 'Licença não verificada',
} as const;

export default function FormationsPage() {
  return (
    <div className="space-y-8 animate-[var(--animate-fade)]">
      <PageHeader
        label="Formações"
        title="Trilhas e biblioteca"
        description="Sínteses originais do SOPRO, com referências verificáveis, e uma biblioteca que aponta para as fontes oficiais em vez de copiar conteúdos de terceiros."
      />

      <Section label="Trilhas" description="Encontros curtos, para ler devagar.">
        <ul className="ruled border-y border-rule">
          {formationTracks.map((track) => (
            <li key={track.id}>
              <Link to={`/formacoes/${track.id}`} className="group flex items-baseline gap-4 py-3.5">
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-[1.0625rem] leading-snug text-ink transition-colors group-hover:text-rubric">
                    {track.title}
                  </span>
                  <span className="mt-0.5 block max-w-[56ch] text-[0.8125rem] leading-relaxed text-muted">
                    {track.description}
                  </span>
                  <span className="mt-1.5 flex flex-wrap items-center gap-x-3">
                    <Meta>{LEVEL_LABEL[track.level]}</Meta>
                    <Meta>{track.lessons.length} encontros</Meta>
                  </span>
                </span>
                <ArrowRight
                  size={14}
                  className="shrink-0 translate-y-1 text-muted transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        label="Biblioteca de referências"
        description="Estes materiais pertencem às instituições que os publicam. O SOPRO não os reproduz: apenas indica onde encontrá-los na fonte original."
      >
        <ul className="ruled border-y border-rule">
          {contentResources.map((resource) => (
            <li key={resource.id} className="py-4">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-display text-[1rem] leading-snug text-ink">{resource.title}</h3>
                <Tag>{LICENSE_LABEL[resource.rights.license]}</Tag>
              </div>
              <p className="mt-0.5 text-[0.75rem] text-muted">
                {resource.author}
                {resource.institution && ` · ${resource.institution}`}
              </p>
              <p className="mt-1.5 max-w-[62ch] text-[0.8125rem] leading-relaxed text-ink-2">
                {resource.description}
              </p>
              <p className="mt-1 max-w-[62ch] text-[0.6875rem] leading-relaxed text-muted">
                {resource.rights.notes}
              </p>
              <a
                href={resource.url}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-1.5 inline-flex items-center gap-1.5 border-b border-rule-strong pb-px text-[0.75rem] text-ink transition-colors hover:border-rubric hover:text-rubric"
              >
                Abrir na fonte original
                <ExternalLink size={10} aria-hidden />
              </a>
            </li>
          ))}
        </ul>
      </Section>

      <Link
        to="/carismatico"
        className="group flex items-baseline justify-between gap-4 border-y border-rule py-3.5"
      >
        <span className="min-w-0">
          <span className="block font-display text-[1.0625rem] text-ink transition-colors group-hover:text-rubric">
            Vida no Espírito
          </span>
          <span className="block text-[0.75rem] text-muted">
            A área específica da RCC: grupo de oração, SVES, carismas e discernimento
          </span>
        </span>
        <ArrowRight
          size={14}
          className="shrink-0 translate-y-1 text-muted transition-transform group-hover:translate-x-0.5"
          aria-hidden
        />
      </Link>
    </div>
  );
}
