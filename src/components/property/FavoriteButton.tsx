"use client";

import { useSyncExternalStore } from "react";
import { track } from "@/lib/analytics";

const KEY = "cm:favoritos";
const ouvintes = new Set<() => void>();

/** Lê a lista crua (string) do localStorage: string é estável para useSyncExternalStore. */
function ler(): string {
  try {
    return localStorage.getItem(KEY) ?? "[]";
  } catch {
    return "[]";
  }
}
function assinar(cb: () => void) {
  ouvintes.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    ouvintes.delete(cb);
    window.removeEventListener("storage", cb);
  };
}
function alternar(codigo: string) {
  try {
    const lista: string[] = JSON.parse(ler());
    const nova = lista.includes(codigo)
      ? lista.filter((c) => c !== codigo)
      : [...lista, codigo];
    localStorage.setItem(KEY, JSON.stringify(nova));
    if (!lista.includes(codigo)) track("favoritar", { codigo });
  } catch {
    /* localStorage indisponível: ignora */
  }
  ouvintes.forEach((cb) => cb());
}

/** Coração com persistência em localStorage. O traço "se desenha" ao favoritar (stroke-dashoffset). */
export function FavoriteButton({ codigo, titulo }: { codigo: string; titulo: string }) {
  const bruto = useSyncExternalStore(assinar, ler, () => "[]");
  const ativo = (JSON.parse(bruto) as string[]).includes(codigo);

  return (
    <button
      type="button"
      aria-pressed={ativo}
      aria-label={ativo ? `Remover ${titulo} dos favoritos` : `Favoritar ${titulo}`}
      onClick={() => alternar(codigo)}
      className="bg-paper text-ink hover:text-bronze-deep relative z-10 flex size-11 items-center justify-center rounded-full shadow-sm transition-colors"
    >
      <svg
        viewBox="0 0 24 24"
        className="heart size-6"
        data-on={ativo}
        aria-hidden="true"
      >
        <path
          pathLength={1}
          d="M12 20.5s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.6a4.3 4.3 0 0 1 7.5 2.7c0 5.6-7.5 10.2-7.5 10.2Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
