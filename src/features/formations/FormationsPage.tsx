import { ArrowRight, ExternalLink, GraduationCap, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';
import { PageHeader } from '../../components/ui/PageHeader';
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
    <div className="space-y-7 animate-[var(--animate-fade-up)]">
      <PageHeader
        eyebrow="Formações"
        title="Trilhas e biblioteca"
        description="Sínteses originais do SOPRO, com referências verificáveis, e uma biblioteca que aponta para as fontes oficiais em vez de copiar conteúdos de terceiros."
      />

      <section className="space-y-3">
        <h2 className="flex items-center gap-2 text-base text-ink">
          <GraduationCap size={16} className="text-brass" aria-hidden />
          Trilhas
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {formationTracks.map((track) => (
            <Link key={track.id} to={`/formacoes/${track.id}`} className="group">
              <Card className="h-full space-y-2.5 p-4 transition-colors group-hover:border-brass/40 group-hover:bg-surface-muted/40">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display text-[1.0625rem] leading-snug text-ink">
                    {track.title}
                  </h3>
                  <Badge>{LEVEL_LABEL[track.level]}</Badge>
                </div>
                <p className="text-[0.8125rem] leading-relaxed text-muted">{track.description}</p>
                <p className="flex items-center gap-1.5 text-[0.6875rem] text-brass">
                  <Layers size={11} aria-hidden />
                  {track.lessons.length} encontros
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-base text-ink">Biblioteca de referências</h2>
        <p className="text-[0.8125rem] leading-relaxed text-muted">
          Estes materiais pertencem às instituições que os publicam. O SOPRO não os reproduz:
          apenas indica onde encontrá-los na fonte original.
        </p>
        <ul className="space-y-2.5">
          {contentResources.map((resource) => (
            <li key={resource.id}>
              <Card className="p-4">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="font-display text-[1rem] leading-snug text-ink">
                      {resource.title}
                    </h3>
                    <p className="mt-0.5 text-[0.75rem] text-muted">
                      {resource.author}
                      {resource.institution && ` · ${resource.institution}`}
                    </p>
                  </div>
                  <Badge>{LICENSE_LABEL[resource.rights.license]}</Badge>
                </div>
                <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-ink-soft">
                  {resource.description}
                </p>
                <p className="mt-1.5 text-[0.6875rem] leading-relaxed text-muted">
                  {resource.rights.notes}
                </p>
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-2 inline-flex items-center gap-1.5 text-[0.75rem] font-medium text-ink transition-colors hover:text-brass"
                >
                  Abrir na fonte original
                  <ExternalLink size={11} aria-hidden />
                </a>
              </Card>
            </li>
          ))}
        </ul>
      </section>

      <Link
        to="/carismatico"
        className="group flex items-center gap-3 rounded-[var(--radius-card)] border border-line bg-surface-muted/40 p-4 transition-colors hover:border-brass/30"
      >
        <span className="flex-1">
          <span className="block text-[0.9375rem] text-ink">Espiritualidade carismática</span>
          <span className="block text-[0.75rem] text-muted">
            Dons, carismas e temas da RCC, com cuidado doutrinário
          </span>
        </span>
        <ArrowRight size={16} className="shrink-0 text-brass transition-transform group-hover:translate-x-0.5" aria-hidden />
      </Link>
    </div>
  );
}
