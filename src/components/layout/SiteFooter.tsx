import { Link } from 'react-router-dom';
import { env } from '../../utils/env';

/**
 * Rodapé: colofão. Filete duplo, texto pequeno, sem ícones.
 * O link de doação só existe quando configurado — nunca um botão quebrado.
 */
export function SiteFooter() {
  const donationUrl = env.donationUrl;

  return (
    <footer className="mt-12 border-t border-rule pt-4">
      <div className="flex flex-col gap-3 text-[0.75rem] leading-relaxed text-muted sm:flex-row sm:items-start sm:justify-between">
        <p className="max-w-[42ch]">
          SOPRO é um projeto comunitário, gratuito e open-source. Não é um aplicativo oficial da
          RCCBRASIL nem de qualquer instituição eclesial.
        </p>
        <nav aria-label="Rodapé" className="flex flex-wrap gap-x-5 gap-y-1 sm:justify-end">
          <Link to="/privacidade" className="transition-colors hover:text-rubric">
            Privacidade
          </Link>
          <Link to="/caminhada/configuracoes" className="transition-colors hover:text-rubric">
            Seus dados
          </Link>
          <a
            href="https://github.com/omurilomota/SOPRO"
            target="_blank"
            rel="noreferrer noopener"
            className="transition-colors hover:text-rubric"
          >
            Código-fonte
          </a>
          {donationUrl && (
            <a
              href={donationUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="transition-colors hover:text-rubric"
            >
              ♡ Apoie o desenvolvimento
            </a>
          )}
        </nav>
      </div>
    </footer>
  );
}
