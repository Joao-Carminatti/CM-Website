"use client";

import { useEffect } from "react";

/**
 * Efeitos de ponteiro, só desktop com mouse e sem movimento reduzido:
 *  - [data-spotlight]: luz sutil que segue o cursor (CSS variables --mx/--my);
 *  - [data-magnetic]: deslocamento mínimo do CTA em direção ao cursor (transform).
 * UM único listener delegado para o site inteiro, sem custo em touch.
 */
export function PointerEffects() {
  useEffect(() => {
    const ok = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    if (!ok.matches) return;

    let quadro = 0;
    let ativoMagnetico: HTMLElement | null = null;

    const aoMover = (e: PointerEvent) => {
      cancelAnimationFrame(quadro);
      quadro = requestAnimationFrame(() => {
        const alvo = e.target as Element | null;

        const luz = alvo?.closest<HTMLElement>("[data-spotlight]");
        if (luz) {
          const r = luz.getBoundingClientRect();
          luz.style.setProperty("--mx", `${e.clientX - r.left}px`);
          luz.style.setProperty("--my", `${e.clientY - r.top}px`);
        }

        const mag = alvo?.closest<HTMLElement>("[data-magnetic]") ?? null;
        if (ativoMagnetico && ativoMagnetico !== mag) ativoMagnetico.style.transform = "";
        ativoMagnetico = mag;
        if (mag) {
          const r = mag.getBoundingClientRect();
          const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
          const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
          mag.style.transform = `translate(${(dx * 10).toFixed(1)}px, ${(dy * 8).toFixed(1)}px)`;
        }
      });
    };

    document.addEventListener("pointermove", aoMover, { passive: true });
    return () => {
      document.removeEventListener("pointermove", aoMover);
      cancelAnimationFrame(quadro);
    };
  }, []);

  return null;
}
