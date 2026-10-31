/**
 * Monograma "CM" provisório. Contorno de planta com canto cortado
 * (referência a telhado/corte arquitetônico). Substituir pelo logo definitivo.
 */
export function Monogram({ className = "size-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" fill="none">
      <path
        d="M1.5 46.5V14L14 1.5h32.5v45z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <text
        x="24.5"
        y="32"
        textAnchor="middle"
        fill="currentColor"
        fontFamily="var(--font-display)"
        fontSize="20"
        fontWeight="500"
        letterSpacing="-0.5"
      >
        CM
      </text>
    </svg>
  );
}
