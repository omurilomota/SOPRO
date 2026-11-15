import { ArrowRight, Flame, Info, ScrollText } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';
import { PageHeader } from '../../components/ui/PageHeader';
import { charismaticTopics, gifts } from '../../data/charismatic';
import { cn } from '../../utils/cn';

type Tab = 'dons' | 'carismas' | 'temas';

/**
 * Espiritualidade carismática.
 *
 * Separação teológica explícita em três abas: dons do Espírito (Is 11),
 * carismas (1Cor 12) e temas da vida no Espírito. Não há testes de dons —
 * a plataforma é instrumento de formação, não autoridade de discernimento.
 */
export default function CharismaticPage() {
  const [tab, setTab] = useState<Tab>('dons');

  const giftsOfSpirit = gifts.filter((gift) => gift.category === 'dom-do-espirito');
  const charisms = gifts.filter((gift) => gift.category === 'carisma');

  return (
    <div className="space-y-6 animate-[var(--animate-fade-up)]">
      <PageHeader
        eyebrow="Espiritualidade carismática"
        title="Vida no Espírito"
        description="Formação sobre dons, carismas e a espiritualidade da Renovação Carismática Católica, com distinções teológicas claras e referências verificáveis."
      />

      <div className="flex items-start gap-2.5 rounded-xl border border-serenity/20 bg-serenity-soft/60 px-3.5 py-3 text-[0.75rem] leading-relaxed text-ink-soft dark:bg-serenity-soft/40">
        <Info size={14} className="mt-0.5 shrink-0 text-serenity" aria-hidden />
        <span>
          Esta seção é formativa, não diagnóstica. O SOPRO <strong className="font-medium">não</strong>{' '}
          oferece testes para identificar ou confirmar carismas: o discernimento pertence à pessoa,
          à comunidade e à Igreja.
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Categorias">
        {(
          [
            { id: 'dons', label: 'Dons do Espírito' },
            { id: 'carismas', label: 'Carismas (1Cor 12)' },
            { id: 'temas', label: 'Temas e vida no Espírito' },
          ] as const
        ).map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={tab === item.id}
            onClick={() => setTab(item.id)}
            className={cn(
              'rounded-full border px-3.5 py-1.5 text-[0.75rem] transition-colors',
              tab === item.id
                ? 'border-ink bg-ink text-canvas'
                : 'border-line bg-surface text-ink-soft hover:border-line-strong',
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      {tab === 'dons' && (
        <div className="space-y-3">
          <p className="text-[0.8125rem] leading-relaxed text-muted">
            Os sete dons do Espírito (Is 11, 2-3) acompanham a vida da graça e aperfeiçoam as
            virtudes. Não são habilidades extraordinárias nem sinais de eleição.
          </p>
          <ul className="grid gap-2.5 sm:grid-cols-2">
            {giftsOfSpirit.map((gift) => (
              <li key={gift.id}>
                <Card className="h-full p-4">
                  <div className="flex items-start gap-2">
                    <Flame size={14} className="mt-1 shrink-0 text-brass" aria-hidden />
                    <h2 className="font-display text-[1rem] leading-snug text-ink">{gift.name}</h2>
                  </div>
                  <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-ink-soft">
                    {gift.summary}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {gift.scripture.map((reference) => (
                      <Badge key={reference}>{reference}</Badge>
                    ))}
                  </div>
                  {gift.notes.length > 0 && (
                    <ul className="mt-2.5 space-y-1 border-t border-line pt-2.5">
                      {gift.notes.map((note) => (
                        <li key={note} className="text-[0.6875rem] leading-relaxed text-muted">
                          {note}
                        </li>
                      ))}
                    </ul>
                  )}
                </Card>
              </li>
            ))}
          </ul>
        </div>
      )}

      {tab === 'carismas' && (
        <div className="space-y-3">
          <p className="text-[0.8125rem] leading-relaxed text-muted">
            Os carismas de 1Cor 12, 8-10 são graças dadas &ldquo;para o bem comum&rdquo;. São
            distintos dos sete dons: servem a uma necessidade concreta da comunidade e precisam ser
            discernidos.
          </p>
          <ul className="space-y-2.5">
            {charisms.map((gift) => (
              <li key={gift.id}>
                <Card className="p-4">
                  <div className="flex items-start gap-2">
                    <ScrollText size={14} className="mt-1 shrink-0 text-brass" aria-hidden />
                    <h2 className="font-display text-[1rem] leading-snug text-ink">{gift.name}</h2>
                  </div>
                  <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-ink-soft">
                    {gift.summary}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {gift.scripture.map((reference) => (
                      <Badge key={reference}>{reference}</Badge>
                    ))}
                  </div>
                  {gift.notes.length > 0 && (
                    <ul className="mt-2.5 space-y-1 border-t border-line pt-2.5">
                      {gift.notes.map((note) => (
                        <li key={note} className="text-[0.6875rem] leading-relaxed text-muted">
                          {note}
                        </li>
                      ))}
                    </ul>
                  )}
                </Card>
              </li>
            ))}
          </ul>
        </div>
      )}

      {tab === 'temas' && (
        <ul className="space-y-2.5">
          {charismaticTopics.map((topic) => (
            <li key={topic.id}>
              <Link to={`/carismatico/${topic.id}`} className="group">
                <Card className="flex items-center gap-3 p-4 transition-colors group-hover:border-brass/40 group-hover:bg-surface-muted/40">
                  <div className="min-w-0 flex-1">
                    <h2 className="font-display text-[1rem] leading-snug text-ink">{topic.title}</h2>
                    <p className="mt-0.5 line-clamp-2 text-[0.8125rem] leading-relaxed text-muted">
                      {topic.summary}
                    </p>
                  </div>
                  <ArrowRight size={15} className="shrink-0 text-muted transition-transform group-hover:translate-x-0.5" aria-hidden />
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <p className="rounded-xl border border-line bg-surface-muted/40 p-4 text-[0.75rem] leading-relaxed text-muted">
        <strong className="font-medium text-ink-soft">Sobre a RCC:</strong> o SOPRO é um projeto
        independente e não é um aplicativo oficial da RCCBRASIL nem de qualquer instituição eclesial.
        As referências a documentos da Renovação são indicativas, para estudo, e devem ser conferidas
        nas fontes oficiais.
      </p>
    </div>
  );
}
