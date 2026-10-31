"use client";

import { useId, useRef, useState } from "react";
import { track } from "@/lib/analytics";
import { formatPreco } from "@/lib/format";

const campo = "border-line bg-paper h-11 w-full rounded-md border px-3 text-base";

/** Parcela pelo Sistema Price: PMT = PV · i / (1 − (1 + i)^−n). Estimativa educativa. */
function parcela(financiado: number, taxaAnual: number, meses: number) {
  if (financiado <= 0 || meses <= 0) return 0;
  const i = taxaAnual / 100 / 12;
  if (i === 0) return financiado / meses;
  return (financiado * i) / (1 - Math.pow(1 + i, -meses));
}

export function FinancingSimulator({ valor }: { valor: number }) {
  const id = useId();
  const [entrada, setEntrada] = useState(Math.round(valor * 0.2));
  const [meses, setMeses] = useState(360);
  const [taxa, setTaxa] = useState(11);

  const usou = useRef(false);
  const usado = () => {
    if (usou.current) return;
    usou.current = true;
    track("simulador_uso", { valor });
  };

  const financiado = Math.max(valor - entrada, 0);
  const mensal = parcela(financiado, taxa, meses);

  return (
    <section
      aria-labelledby={`${id}-t`}
      onChange={usado}
      className="bg-paper-deep rounded-lg p-6"
    >
      <h2 id={`${id}-t`} className="font-display text-2xl">
        Simule o financiamento
      </h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor={`${id}-e`} className="mb-1.5 block text-sm font-medium">
            Entrada (R$)
          </label>
          <input
            id={`${id}-e`}
            type="number"
            min={0}
            max={valor}
            step={1000}
            inputMode="numeric"
            value={entrada}
            onChange={(e) =>
              setEntrada(Math.min(Math.max(Number(e.target.value) || 0, 0), valor))
            }
            className={campo}
          />
        </div>
        <div>
          <label htmlFor={`${id}-p`} className="mb-1.5 block text-sm font-medium">
            Prazo
          </label>
          <select
            id={`${id}-p`}
            value={meses}
            onChange={(e) => setMeses(Number(e.target.value))}
            className={campo}
          >
            {[120, 180, 240, 300, 360, 420].map((m) => (
              <option key={m} value={m}>
                {m / 12} anos ({m} meses)
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`${id}-t2`} className="mb-1.5 block text-sm font-medium">
            Juros (% ao ano)
          </label>
          <input
            id={`${id}-t2`}
            type="number"
            min={0}
            max={40}
            step={0.1}
            inputMode="decimal"
            value={taxa}
            onChange={(e) =>
              setTaxa(Math.min(Math.max(Number(e.target.value) || 0, 0), 40))
            }
            className={campo}
          />
        </div>
      </div>

      <dl className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <dt className="text-stone text-sm">Valor financiado (estimado)</dt>
          <dd className="font-display text-2xl">{formatPreco(financiado)}</dd>
        </div>
        <div aria-live="polite">
          <dt className="text-stone text-sm">Parcela mensal estimada</dt>
          <dd className="font-display text-2xl">{formatPreco(Math.round(mensal))}</dd>
        </div>
      </dl>

      <p className="text-stone mt-5 text-xs leading-relaxed">
        Estimativa pelo sistema Price, sem seguros, taxas e correções. A taxa de juros é
        um valor de referência que você pode ajustar. Não é oferta de crédito: aprovação,
        taxa e condições dependem da análise do banco.
      </p>
    </section>
  );
}
