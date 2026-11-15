/**
 * Marca do SOPRO: um sopro estilizado — três traços concêntricos que se
 * abrem para cima, sugerindo vento/Espírito. Deliberadamente sóbrio:
 * nenhum símbolo religioso decorativo, apenas forma.
 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden
      role="presentation"
    >
      <circle cx="16" cy="16" r="15" stroke="currentColor" strokeOpacity="0.22" />
      <path
        d="M9 20.5c2.2-1.6 4.9-2.5 7-2.5s4.8.9 7 2.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M10.5 16.4C12.3 15 14 14.4 16 14.4s3.7.6 5.5 2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeOpacity="0.75"
      />
      <path
        d="M12.6 12.3c1-.9 2.2-1.4 3.4-1.4s2.4.5 3.4 1.4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeOpacity="0.5"
      />
    </svg>
  );
}
