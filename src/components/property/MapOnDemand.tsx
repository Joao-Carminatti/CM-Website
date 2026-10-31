"use client";

import { useState } from "react";

/** Mapa só sob demanda e só com bairro + cidade (localização APROXIMADA, nunca o endereço). */
export function MapOnDemand({ bairro, cidade }: { bairro: string; cidade: string }) {
  const [ativo, setAtivo] = useState(false);
  const consulta = encodeURIComponent(`${bairro}, ${cidade}`);
  return (
    <div className="bg-paper-deep relative aspect-[16/9] overflow-hidden rounded-lg">
      {ativo ? (
        <iframe
          src={`https://www.google.com/maps?q=${consulta}&output=embed`}
          title={`Mapa da região: ${bairro}, ${cidade}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 size-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setAtivo(true)}
          className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-center"
        >
          <span className="font-medium underline underline-offset-4">
            Ver a região no mapa
          </span>
          <span className="text-stone text-sm">
            {bairro}, {cidade} (localização aproximada)
          </span>
        </button>
      )}
    </div>
  );
}
