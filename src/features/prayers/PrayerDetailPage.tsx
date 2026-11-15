import { ArrowLeft, Heart, Minus, Plus, Type } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { EmptyState } from '../../components/ui/EmptyState';
import { Meta, Reference } from '../../components/ui/Marks';
import { useToast } from '../../components/ui/Toast';
import { getCategoryById, getPrayerById } from '../../data/prayers';
import { useFavorites } from '../../hooks/useFavorites';
import { cn } from '../../utils/cn';

const FONT_SIZES = ['text-[0.9375rem]', 'text-[1.0625rem]', 'text-[1.1875rem]'] as const;

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
        <BackLink />
        <EmptyState
          label="Oração não encontrada"
          description="Esse endereço não corresponde a nenhuma oração da biblioteca."
        />
      </div>
    );
  }

  const favourite = isFavorite(prayer.id);

  return (
    <article className="space-y-5 animate-[var(--animate-fade)]">
      <BackLink />

      <header className="space-y-2">
        <p className="rubric">{category?.title ?? 'Oração'}</p>
        <h1 className="text-[1.875rem] leading-tight text-ink sm:text-[2.25rem]">{prayer.title}</h1>
        <div className="h-px bg-rule" />
        <p className="max-w-[58ch] text-[0.875rem] leading-relaxed text-muted">{prayer.summary}</p>
        {prayer.attribution && <Meta>{prayer.attribution}</Meta>}
      </header>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1" aria-label="Tamanho do texto">
          <Type size={13} className="mr-1 text-muted" aria-hidden />
          <button
            type="button"
            onClick={() => setSizeIndex((index) => Math.max(0, index - 1))}
            disabled={sizeIndex === 0}
            className="border border-rule-strong p-1.5 text-muted transition-colors hover:border-ink hover:text-ink disabled:opacity-40"
            aria-label="Diminuir texto"
          >
            <Minus size={12} aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => setSizeIndex((index) => Math.min(FONT_SIZES.length - 1, index + 1))}
            disabled={sizeIndex === FONT_SIZES.length - 1}
            className="border border-rule-strong p-1.5 text-muted transition-colors hover:border-ink hover:text-ink disabled:opacity-40"
            aria-label="Aumentar texto"
          >
            <Plus size={12} aria-hidden />
          </button>
        </div>

        <Button
          variant={favourite ? 'solid' : 'outline'}
          size="sm"
          onClick={async () => {
            const added = await toggle(prayer.id, prayer.title);
            notify(added ? 'Oração guardada nos favoritos.' : 'Removida dos favoritos.');
          }}
        >
          <Heart size={13} className={cn(favourite && 'fill-current')} aria-hidden />
          {favourite ? 'Favorita' : 'Favoritar'}
        </Button>
      </div>

      <div className="border-t border-rule pt-5">
        <div
          className={cn(
            'whitespace-pre-line font-display leading-[1.9] text-ink',
            '[font-variation-settings:"opsz"_16]',
            FONT_SIZES[sizeIndex],
          )}
        >
          {prayer.body}
        </div>
      </div>

      {prayer.scripture.length > 0 && (
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-rule pt-3">
          <Meta>Referências</Meta>
          {prayer.scripture.map((reference) => (
            <Reference key={reference}>{reference}</Reference>
          ))}
        </div>
      )}
    </article>
  );
}

function BackLink() {
  return (
    <Link
      to="/oracoes"
      className="inline-flex items-center gap-1.5 text-[0.875rem] text-muted transition-colors hover:text-rubric"
    >
      <ArrowLeft size={13} aria-hidden /> Orações
    </Link>
  );
}
