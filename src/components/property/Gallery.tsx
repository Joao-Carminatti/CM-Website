"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { ViewTransition } from "react";
import type { Foto } from "@/types";
import { FotoView } from "@/components/ui/FotoView";

// O lightbox só é baixado quando alguém abre a galeria.
const Lightbox = dynamic(() => import("./Lightbox"), { ssr: false });

export function Gallery({
  fotos,
  codigo,
  titulo,
  prioridade = true,
}: {
  fotos: Foto[];
  codigo: string;
  titulo: string;
  prioridade?: boolean;
}) {
  const [aberta, setAberta] = useState<number | null>(null);
  const [principal, ...demais] = fotos;

  return (
    <div>
      <ViewTransition name={`foto-${codigo}`} share="morph" default="none">
        <button
          type="button"
          onClick={() => setAberta(0)}
          aria-label={`Ampliar fotos de ${titulo}`}
          className="bg-paper-deep relative block aspect-[16/10] w-full overflow-hidden rounded-lg"
        >
          <FotoView
            foto={principal}
            sizes="(min-width: 1024px) 48rem, 100vw"
            priority={prioridade}
          />
          {fotos.length > 1 && (
            <span className="bg-paper text-ink absolute right-3 bottom-3 rounded-sm px-3 py-1.5 text-sm font-medium">
              Ver {fotos.length} fotos
            </span>
          )}
        </button>
      </ViewTransition>

      {demais.length > 0 && (
        <ul className="mt-3 grid grid-cols-3 gap-3">
          {demais.slice(0, 3).map((foto, i) => (
            <li key={i}>
              <button
                type="button"
                onClick={() => setAberta(i + 1)}
                aria-label={`Abrir foto ${i + 2} de ${fotos.length}`}
                className="bg-paper-deep relative block aspect-[4/3] w-full overflow-hidden rounded-md"
              >
                <FotoView foto={foto} sizes="(min-width: 1024px) 15rem, 33vw" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {aberta !== null && (
        <Lightbox
          fotos={fotos}
          indice={aberta}
          onMudar={setAberta}
          onFechar={() => setAberta(null)}
        />
      )}
    </div>
  );
}
