import { ArrowLeft, BookMarked, Sparkles } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';
import { EmptyState } from '../../components/ui/EmptyState';
import { getTopicById } from '../../data/charismatic';
import { Flame } from 'lucide-react';

export default function CharismaticTopicPage() {
  const { topicId } = useParams<{ topicId: string }>();
  const topic = topicId ? getTopicById(topicId) : undefined;

  if (!topic) {
    return (
      <div className="space-y-4">
        <Link
          to="/carismatico"
          className="inline-flex items-center gap-1.5 text-[0.8125rem] text-muted hover:text-ink"
        >
          <ArrowLeft size={14} aria-hidden /> Carismático
        </Link>
        <EmptyState
          icon={Flame}
          title="Tema não encontrado"
          description="Volte para a lista de temas da espiritualidade carismática."
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-[var(--animate-fade-up)]">
      <Link
        to="/carismatico"
        className="inline-flex items-center gap-1.5 text-[0.8125rem] text-muted hover:text-ink"
      >
        <ArrowLeft size={14} aria-hidden /> Carismático
      </Link>

      <header className="space-y-2">
        <div className="flex flex-wrap gap-1.5">
          {topic.scripture.slice(0, 3).map((reference) => (
            <Badge key={reference}>{reference}</Badge>
          ))}
        </div>
        <h1 className="text-[1.75rem] leading-tight tracking-tight text-ink">{topic.title}</h1>
      </header>

      <Card className="p-5">
        <p className="text-[0.9375rem] leading-relaxed text-ink-soft">{topic.summary}</p>
      </Card>

      <section className="space-y-2.5">
        <h2 className="flex items-center gap-2 text-base text-ink">
          <BookMarked size={15} className="text-brass" aria-hidden />
          Magistério e referências
        </h2>
        <ul className="space-y-1.5">
          {topic.magisterium.map((reference) => (
            <li
              key={reference}
              className="rounded-lg border border-line bg-surface px-3.5 py-2 text-[0.8125rem] text-ink-soft"
            >
              {reference}
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-2.5">
        <h2 className="flex items-center gap-2 text-base text-ink">
          <Sparkles size={15} className="text-brass" aria-hidden />
          Para viver
        </h2>
        <ul className="space-y-1.5">
          {topic.practice.map((item) => (
            <li key={item} className="flex gap-2 text-[0.875rem] leading-relaxed text-ink-soft">
              <span className="text-brass" aria-hidden>
                ·
              </span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      <p className="text-[0.75rem] leading-relaxed text-muted">
        Síntese escrita para o SOPRO. Para questões pessoais de discernimento, procure um sacerdote
        ou um diretor espiritual — nenhum texto substitui esse acompanhamento.
      </p>
    </div>
  );
}
