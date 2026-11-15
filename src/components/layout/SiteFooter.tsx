import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { env } from '../../utils/env';

/**
 * Rodapé discreto.
 *
 * O link de doação só aparece quando `VITE_DONATION_URL` está configurada —
 * nunca exibimos um botão quebrado.
 */
export function SiteFooter() {
  const donationUrl = env.donationUrl;

  return (
    <footer className="mt-10 border-t border-line/70 pt-5">
      <div className="flex flex-col gap-3 text-[0.6875rem] text-muted sm:flex-row sm:items-center sm:justify-between">
        <p className="leading-relaxed">
          SOPRO · projeto comunitário, gratuito e open-source. Não é um aplicativo oficial da RCCBRASIL
          ou de qualquer instituição eclesial.
        </p>
        <nav aria-label="Rodapé" className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
          <Link to="/privacidade" className="transition-colors hover:text-ink-soft">
            Privacidade
          </Link>
          <a
            href="https://github.com/omurilomota/SOPRO"
            target="_blank"
            rel="noreferrer noopener"
            className="transition-colors hover:text-ink-soft"
          >
            Código-fonte
          </a>
          {donationUrl && (
            <a
              href={donationUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1 text-brass transition-colors hover:text-brass-strong"
            >
              <Heart size={11} aria-hidden />
              Apoie o desenvolvimento
            </a>
          )}
        </nav>
      </div>
    </footer>
  );
}
