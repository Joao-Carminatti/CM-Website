"use client";

import { useState } from "react";

/** Facade: nenhum byte do YouTube é carregado até o clique. */
export function YoutubeFacade({ id, titulo }: { id: string; titulo: string }) {
  const [ativo, setAtivo] = useState(false);
  return (
    <div className="bg-ink relative aspect-video overflow-hidden rounded-lg">
      {ativo ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={`Vídeo: ${titulo}`}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 size-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setAtivo(true)}
          className="text-paper from-ink-soft to-ink absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br"
        >
          <span className="bg-bronze text-ink flex size-16 items-center justify-center rounded-full">
            <svg
              viewBox="0 0 24 24"
              className="size-7"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          <span className="font-medium">Assistir ao vídeo do imóvel</span>
        </button>
      )}
    </div>
  );
}
