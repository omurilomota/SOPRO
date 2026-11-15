import { ArrowLeft, Heart, Minus, Plus, Type } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { EmptyState } from '../../components/ui/EmptyState';
import { useToast } from '../../components/ui/Toast';
import { getCategoryById, getPrayerById } from '../../data/prayers';
import { useFavorites } from '../../hooks/useFavorites';
import { cn } from '../../utils/cn';
import { BookX } from 'lucide-react';

const FONT_SIZES = ['text-[1rem]', 'text-[1.0625rem]', 'text-[1.1875rem]'] as const;

export default function PrayerDetailPage() {
  const { prayerId } = useParams<{ prayerId: string }>();
  const prayer = prayerId ? getPrayerById(prayerId) : undefined;
  const { isFavorite, toggle } = useFavorites();
  const { notify } = useToast();
  const [sizeIndex, setSizeIndex] = useState(1);

  useEffect(() => {
    if (prayer) document.title = `${prayer.title} · SOPRO`;
  }, [prayer]);

  const category = useMemo(
    () => (prayer ? getCategoryById(prayer.category) : undefined),
    [prayer],
  );

  if (!prayer) {
    return (
      <div className="space-y-4">
        <Link to="/oracoes" className="inline-flex items-center gap-1.5 text-[0.8125rem] text-muted hover:text-ink">
          <ArrowLeft size={14} aria-hidden /> Orações
        </Link>
        <EmptyState
          icon={BookX}
          title="Oração não encontrada"
          description="Esse endereço não corresponde a nenhuma oração da biblioteca."
        />
      </div>
    );
  }

  const favourite = isFavorite(prayer.id);

  return (
    <article className="space-y-5 animate-[var(--animate-fade-up)]">
      <Link to="/oracoes" className="inline-flex items-center gap-1.5 text-[0.8125rem] text-muted hover:text-ink">
        <ArrowLeft size={14} aria-hidden /> Orações
      </Link>

      <header className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="brass">{category?.title ?? 'Oração'}</Badge>
          {prayer.attribution && <span className="text-[0.6875rem] text-muted">{prayer.attribution}</span>}
        </div>
        <h1 className="text-[1.75rem] leading-tight tracking-tight text-ink sm:text-[2rem]">
          {prayer.title}
        </h1>
        <p className="max-w-prose text-sm leading-relaxed text-muted">{prayer.summary}</p>
      </header>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1" aria-label="Tamanho do texto">
          <Type size={14} className="mr-1 text-muted" aria-hidden />
          <button
            type="button"
            onClick={() => setSizeIndex((index) => Math.max(0, index - 1))}
            disabled={sizeIndex === 0}
            className="rounded-full border border-line p-1.5 text-muted transition-colors hover:text-ink disabled:opacity-40"
            aria-label="Diminuir texto"
          >
            <Minus size={13} aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => setSizeIndex((index) => Math.min(FONT_SIZES.length - 1, index + 1))}
            disabled={sizeIndex === FONT_SIZES.length - 1}
            className="rounded-full border border-line p-1.5 text-muted transition-colors hover:text-ink disabled:opacity-40"
            aria-label="Aumentar texto"
          >
            <Plus size={13} aria-hidden />
          </button>
        </div>

        <Button
          variant={favourite ? 'primary' : 'secondary'}
          size="sm"
          onClick={async () => {
            const added = await toggle(prayer.id, prayer.title);
            notify(added ? 'Oração guardada nos favoritos.' : 'Removida dos favoritos.');
          }}
        >
          <Heart size={14} className={cn(favourite && 'fill-current')} aria-hidden />
          {favourite ? 'Favorita' : 'Favoritar'}
        </Button>
      </div>

      <Card className="px-5 py-7 sm:px-8 sm:py-9">
        <div
          className={cn(
            'whitespace-pre-line font-display leading-[1.9] text-ink-soft',
            FONT_SIZES[sizeIndex],
          )}
        >
          {prayer.body}
        </div>
      </Card>

      {prayer.scripture.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 text-[0.75rem] text-muted">
          <span>Referências:</span>
          {prayer.scripture.map((reference) => (
            <Badge key={reference}>{reference}</Badge>
          ))}
        </div>
      )}
    </article>
  );
}
