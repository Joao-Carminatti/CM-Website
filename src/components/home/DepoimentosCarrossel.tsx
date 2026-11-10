"use client";

import { Fragment, useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { Depoimento } from "@/data/prova-social";

/** Tempo em que cada relato fica na tela (milissegundos). Altere aqui. */
const INTERVALO_MS = 8000;

const MOVIMENTO_REDUZIDO = "(prefers-reduced-motion: reduce)";
const assinarMovimento = (cb: () => void) => {
  const mq = window.matchMedia(MOVIMENTO_REDUZIDO);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

/** Coloca o trecho `destaque` em bronze, se ele existir no texto. */
function comDestaque(texto: string, destaque?: string) {
  const i = destaque ? texto.indexOf(destaque) : -1;
  if (!destaque || i === -1) return texto;
  return (
    <Fragment>
      {texto.slice(0, i)}
      <span className="text-bronze">{destaque}</span>
      {texto.slice(i + destaque.length)}
    </Fragment>
  );
}

/**
 * Depoimentos em destaque, centralizados, trocando sozinhos.
 *  - Todos os relatos ficam empilhados na mesma célula do grid: a área tem a altura do
 *    maior relato (CLS = 0) e a troca é só opacity + transform.
 *  - Troca a cada INTERVALO_MS. Pausa com mouse/foco e com a aba em segundo plano.
 *    Com movimento reduzido, não troca sozinho.
 *  - Navegação: bolinhas, setas do teclado (← →) e swipe no celular.
 *  - Relatos fora de vista ficam `inert` (leitores de tela e Tab os ignoram).
 */
export function DepoimentosCarrossel({ itens }: { itens: Depoimento[] }) {
  const total = itens.length;
  const [atual, setAtual] = useState(0);
  const [sobre, setSobre] = useState(false);
  const [aba, setAba] = useState(true);
  const inicioX = useRef<number | null>(null);
  // No servidor assume "sem redução"; no cliente lê a preferência real do sistema.
  const reduzido = useSyncExternalStore(
    assinarMovimento,
    () => window.matchMedia(MOVIMENTO_REDUZIDO).matches,
    () => false,
  );

  useEffect(() => {
    const aoVisibilidade = () => setAba(!document.hidden);
    document.addEventListener("visibilitychange", aoVisibilidade);
    return () => document.removeEventListener("visibilitychange", aoVisibilidade);
  }, []);

  const rodando = total > 1 && !sobre && aba && !reduzido;

  useEffect(() => {
    if (!rodando) return;
    const t = setTimeout(() => setAtual((i) => (i + 1) % total), INTERVALO_MS);
    return () => clearTimeout(t);
  }, [rodando, atual, total]);

  const ir = (i: number) => setAtual((i + total) % total);

  return (
    <div
      role="group"
      aria-roledescription="carrossel"
      aria-label="Depoimentos de clientes"
      onMouseEnter={() => setSobre(true)}
      onMouseLeave={() => setSobre(false)}
      onFocus={() => setSobre(true)}
      onBlur={() => setSobre(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") ir(atual + 1);
        if (e.key === "ArrowLeft") ir(atual - 1);
      }}
      onTouchStart={(e) => (inicioX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (inicioX.current === null) return;
        const dx = e.changedTouches[0].clientX - inicioX.current;
        if (Math.abs(dx) > 50) ir(dx < 0 ? atual + 1 : atual - 1);
        inicioX.current = null;
      }}
      className="touch-pan-y"
    >
      {/* Todos os relatos na mesma célula: a área assume a altura do maior (sem layout shift) */}
      <div className="grid" aria-live={rodando ? "off" : "polite"}>
        {itens.map((d, i) => {
          const ativo = i === atual;
          return (
            <figure
              key={`${d.nome}-${i}`}
              inert={!ativo}
              aria-roledescription="slide"
              aria-label={`${i + 1} de ${total}`}
              className={`col-start-1 row-start-1 flex flex-col items-center justify-between gap-10 transition-[opacity,transform] duration-1000 ease-out ${
                ativo
                  ? "translate-y-0 opacity-100"
                  : "pointer-events-none translate-y-3 opacity-0"
              }`}
            >
              <blockquote className="font-display text-2xl leading-snug font-light text-balance md:text-3xl lg:text-4xl">
                “{comDestaque(d.texto, d.destaque)}”
              </blockquote>
              <figcaption className="text-mist text-sm tracking-[0.18em] md:text-base">
                {d.nome}
                {d.contexto && ` · ${d.contexto}`}
              </figcaption>
            </figure>
          );
        })}
      </div>

      {total > 1 && (
        <div
          className="mt-8 flex items-center justify-center"
          role="group"
          aria-label="Escolher depoimento"
        >
          {itens.map((d, i) => (
            <button
              key={`${d.nome}-${i}`}
              type="button"
              onClick={() => ir(i)}
              aria-label={`Ver depoimento ${i + 1} de ${total}`}
              aria-current={i === atual ? "true" : undefined}
              className="flex h-11 w-7 items-center justify-center"
            >
              <span
                className={`block h-1.5 rounded-full transition-[width,background-color] duration-300 ${
                  i === atual ? "bg-bronze w-6" : "bg-paper/30 w-1.5"
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}