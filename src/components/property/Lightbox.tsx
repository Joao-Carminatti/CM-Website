"use client";

import { useEffect, useRef } from "react";
import type { Foto } from "@/types";
import { FotoView } from "@/components/ui/FotoView";

/**
 * Lightbox sobre <dialog> nativo: foco preso, Esc fecha e fundo inerte sem JS extra.
 * Setas do teclado e swipe (toque) trocam a foto. Carregado só quando o visitante abre a galeria.
 */
export default function Lightbox({
  fotos,
  indice,
  onMudar,
  onFechar,
}: {
  fotos: Foto[];
  indice: number;
  onMudar: (i: number) => void;
  onFechar: () => void;
}) {
  const dialogo = useRef<HTMLDialogElement>(null);
  const inicioX = useRef<number | null>(null);
  const total = fotos.length;
  const ir = (delta: number) => onMudar((indice + delta + total) % total);

  useEffect(() => {
    const d = dialogo.current;
    if (d && !d.open) d.showModal();
  }, []);

  useEffect(() => {
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") onMudar((indice + 1) % total);
      if (e.key === "ArrowLeft") onMudar((indice - 1 + total) % total);
    };
    document.addEventListener("keydown", aoTeclar);
    return () => document.removeEventListener("keydown", aoTeclar);
  }, [indice, total, onMudar]);

  const botao =
    "bg-ink-soft/80 text-paper hover:bg-ink-soft flex size-12 items-center justify-center rounded-full";

  return (
    <dialog
      ref={dialogo}
      aria-label="Galeria de fotos"
      onClose={onFechar}
      onClick={(e) => e.target === dialogo.current && dialogo.current?.close()}
      className="on-dark bg-ink/95 text-paper m-0 h-dvh max-h-none w-screen max-w-none backdrop:bg-black/60"
    >
      <div className="relative flex h-full flex-col">
        <div className="flex items-center justify-between px-4 py-3">
          <p aria-live="polite" className="text-sm">
            Foto {indice + 1} de {total}
          </p>
          <button
            type="button"
            onClick={() => dialogo.current?.close()}
            className={botao}
            aria-label="Fechar galeria"
          >
            <svg
              viewBox="0 0 20 20"
              className="size-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              aria-hidden="true"
            >
              <path d="M4 4l12 12M16 4L4 16" />
            </svg>
          </button>
        </div>

        <div
          className="relative flex-1 touch-pan-y px-4 pb-6"
          onTouchStart={(e) => (inicioX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (inicioX.current === null) return;
            const dx = e.changedTouches[0].clientX - inicioX.current;
            if (Math.abs(dx) > 50) ir(dx < 0 ? 1 : -1);
            inicioX.current = null;
          }}
        >
          <div
            key={indice}
            className="foto-enter relative mx-auto h-full max-w-5xl overflow-hidden rounded-md"
          >
            <FotoView foto={fotos[indice]} sizes="100vw" />
          </div>
          {total > 1 && (
            <>
              <button
                type="button"
                onClick={() => ir(-1)}
                aria-label="Foto anterior"
                className={`${botao} absolute top-1/2 left-4 -translate-y-1/2`}
              >
                <svg
                  viewBox="0 0 20 20"
                  className="size-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  aria-hidden="true"
                >
                  <path d="M12 4l-6 6 6 6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => ir(1)}
                aria-label="Próxima foto"
                className={`${botao} absolute top-1/2 right-4 -translate-y-1/2`}
              >
                <svg
                  viewBox="0 0 20 20"
                  className="size-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  aria-hidden="true"
                >
                  <path d="M8 4l6 6-6 6" />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>
    </dialog>
  );
}
