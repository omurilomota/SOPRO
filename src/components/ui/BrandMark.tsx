/**
 * Marca do SOPRO.
 *
 * Um traço de pena que se abre em três — o sopro, o Espírito, o texto escrito.
 * Sem símbolo religioso decorativo, desenhada em traço fino para conviver com
 * a tipografia serifada do sistema.
 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden role="presentation">
      <path
        d="M3.5 18.5c3.1-1.1 5.9-1.7 8.5-1.7s5.4.6 8.5 1.7"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
      />
      <path
        d="M6 14.1c2.1-1.2 4.1-1.8 6-1.8s3.9.6 6 1.8"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
        strokeOpacity=".62"
      />
      <path
        d="M9 9.9c1.1-.8 2.1-1.2 3-1.2s1.9.4 3 1.2"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
        strokeOpacity=".34"
      />
    </svg>
  );
}
