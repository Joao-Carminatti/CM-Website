import type { EtapaObra } from "@/types";

/**
 * Evolução da obra. A linha vertical preenche com o scroll (.timeline-fill, CSS puro).
 * A barra de cada etapa usa scaleX (transform), nunca width.
 */
export function ObraTimeline({ etapas }: { etapas: EtapaObra[] }) {
  if (etapas.length === 0) {
    return <p className="text-stone">O cronograma da obra será divulgado em breve.</p>;
  }
  return (
    <ol className="relative max-w-2xl">
      <span
        aria-hidden="true"
        className="bg-line absolute top-2 bottom-2 left-[1.0625rem] w-px"
      />
      <span
        aria-hidden="true"
        className="timeline-fill bg-bronze-deep absolute top-2 bottom-2 left-[1.0625rem] w-px"
      />
      {etapas.map((e, i) => (
        <li key={e.titulo} className="relative flex gap-6 pb-9 last:pb-0">
          <span
            className={`relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full border text-sm font-semibold ${
              e.concluida
                ? "bg-bronze-deep border-bronze-deep text-paper"
                : "bg-paper border-bronze-deep text-bronze-deep"
            }`}
          >
            {e.concluida ? (
              <svg
                viewBox="0 0 20 20"
                className="size-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M4 10.5l4 4 8-9" />
              </svg>
            ) : (
              i + 1
            )}
          </span>
          <div className="flex-1 pt-1">
            <h3 className="font-display text-xl">{e.titulo}</h3>
            <div className="mt-2 flex items-center gap-3">
              <div
                className="bg-line h-1.5 flex-1 overflow-hidden rounded-full"
                role="img"
                aria-label={`${e.progresso}% concluído`}
              >
                <div
                  className="bg-bronze-deep h-full origin-left rounded-full"
                  style={{ transform: `scaleX(${e.progresso / 100})` }}
                />
              </div>
              <span className="text-stone w-10 text-right text-sm">{e.progresso}%</span>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
