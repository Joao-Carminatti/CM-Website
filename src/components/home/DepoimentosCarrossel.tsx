"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import type { Depoimento } from "@/data/prova-social";

/** Tempo em que cada relato fica na tela (milissegundos). Altere aqui. */
const INTERVALO_MS = 7000;

const MOVIMENTO_REDUZIDO = "(prefers-reduced-motion: reduce)";
const assinarMovimento = (cb: () => void) => {
  const mq = window.matchMedia(MOVIMENTO_REDUZIDO);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

/**
 * Carrossel de depoimentos em um card.
 *  - Todos os relatos ficam empilhados na mesma célula do grid: o card tem a altura do
 *    maior relato, então nada "pula" na tela (CLS = 0) e a troca é só opacity + transform.
 *  - Troca sozinho a cada INTERVALO_MS. Pausa com o mouse/foco no card, com a aba em segundo
 *    plano e pelo botão "Pausar". Com movimento reduzido, não troca sozinho.
 *  - Os relatos que não estão visíveis ficam `inert` (leitores de tela e Tab os ignoram).
 */
export function DepoimentosCarrossel({ itens }: { itens: Depoimento[] }) {
  const total = itens.length;
  const [atual, setAtual] = useState(0);
  const [pausadoPeloUsuario, setPausadoPeloUsuario] = useState(false);
  const [sobre, setSobre] = useState(false);
  const [aba, setAba] = useState(true);
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

  const rodando = total > 1 && !pausadoPeloUsuario && !sobre && aba && !reduzido;

  useEffect(() => {
    if (!rodando) return;
    const t = setTimeout(() => setAtual((i) => (i + 1) % total), INTERVALO_MS);
    return () => clearTimeout(t);
  }, [rodando, atual, total]);

  const ir = (i: number) => setAtual((i + total) % total);
  const botao =
    "border-line hover:bg-paper flex size-11 items-center justify-center rounded-full border transition-colors";

  return (
    <div
      role="group"
      aria-roledescription="carrossel"
      aria-label="Depoimentos de clientes"
      onMouseEnter={() => setSobre(true)}
      onMouseLeave={() => setSobre(false)}
      onFocus={() => setSobre(true)}
      onBlur={() => setSobre(false)}
      className="bg-paper-deep relative max-w-3xl rounded-lg p-8 md:p-12"
    >
      <svg
        viewBox="0 0 48 36"
        aria-hidden="true"
        className="text-bronze-deep mb-6 h-8 w-10"
        fill="currentColor"
      >
        <path d="M0 36V20C0 8 6 1 18 0v7c-6 1-9 5-9 10h9v19H0Zm28 0V20C28 8 34 1 46 0v7c-6 1-9 5-9 10h9v19H28Z" />
      </svg>

      {/* Todos os relatos na mesma célula: o card assume a altura do maior (sem layout shift) */}
      <div className="grid" aria-live={rodando ? "off" : "polite"}>
        {itens.map((d, i) => {
          const ativo = i === atual;
          return (
            <figure
              key={`${d.nome}-${i}`}
              inert={!ativo}
              aria-roledescription="slide"
              aria-label={`${i + 1} de ${total}`}
              className={`col-start-1 row-start-1 transition-[opacity,transform] duration-700 ease-out ${
                ativo
                  ? "translate-y-0 opacity-100"
                  : "pointer-events-none translate-y-3 opacity-0"
              }`}
            >
              <blockquote className="font-display text-2xl leading-relaxed md:text-3xl">
                “{d.texto}”
              </blockquote>
              <figcaption className="mt-6">
                <p className="font-medium">{d.nome}</p>
                {d.contexto && <p className="text-stone text-sm">{d.contexto}</p>}
              </figcaption>
            </figure>
          );
        })}
      </div>

      {total > 1 && (
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <div
            className="flex items-center gap-1"
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
                className="flex size-11 items-center justify-center"
              >
                <span
                  className={`block h-2 rounded-full transition-[width,background-color] duration-300 ${
                    i === atual ? "bg-bronze-deep w-8" : "bg-line w-2"
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {!reduzido && (
              <button
                type="button"
                onClick={() => setPausadoPeloUsuario((v) => !v)}
                aria-pressed={pausadoPeloUsuario}
                className="mr-2 text-sm underline underline-offset-4"
              >
                {pausadoPeloUsuario ? "Retomar rotação" : "Pausar rotação"}
              </button>
            )}
            <button
              type="button"
              onClick={() => ir(atual - 1)}
              aria-label="Depoimento anterior"
              className={botao}
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
              onClick={() => ir(atual + 1)}
              aria-label="Próximo depoimento"
              className={botao}
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
          </div>
        </div>
      )}
    </div>
  );
}