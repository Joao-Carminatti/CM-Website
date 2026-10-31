import type { Foto } from "@/types";

/**
 * Placeholder de foto gerado em SVG (~1 KB): gradiente + silhueta de prédios.
 * Usado nos dados de exemplo. Quando a Foto tem `src`, use next/image no lugar.
 */
const paletas = {
  1: { a: "#182a40", b: "#0f1d2e", p: "#26405f" },
  2: { a: "#2a3a36", b: "#16211f", p: "#3b4f49" },
  3: { a: "#3a3f4a", b: "#1b1f27", p: "#505767" },
  4: { a: "#33291d", b: "#17120c", p: "#52432f" },
} as const;

const silhuetas = {
  1: "M0 200V120h40V80h50v50h30V60h60v70h40V100h50v100z",
  2: "M0 200V90h60V40h40v60h50V120h70v80z",
  3: "M0 200V130h50V70h30v60h40V50h70v80h30V110h30v90z",
  4: "M0 200V110h30V90h40v20h40V70h60v60h50V100h20v100z",
} as const;

export function PlaceholderArt({
  foto,
  className = "",
}: {
  foto: Foto;
  className?: string;
}) {
  const tom = foto.tom ?? 1;
  const { a, b, p } = paletas[tom];
  const id = `g${tom}`;
  return (
    <svg
      viewBox="0 0 300 200"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={foto.alt}
      className={`block h-full w-full ${className}`}
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={a} />
          <stop offset="1" stopColor={b} />
        </linearGradient>
      </defs>
      <rect width="300" height="200" fill={`url(#${id})`} />
      <path d={silhuetas[tom]} fill={p} opacity="0.7" />
      <path
        d={silhuetas[tom]}
        fill="none"
        stroke="#b79a6a"
        strokeOpacity="0.55"
        strokeWidth="1"
      />
    </svg>
  );
}
