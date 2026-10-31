"use client";

import { useSyncExternalStore } from "react";

export type Consentimento = "granted" | "denied" | null;
const KEY = "cm:consent";
const ouvintes = new Set<() => void>();

function ler(): Consentimento {
  try {
    const v = localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
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

/** Estado do consentimento. No servidor (e na hidratação) é sempre null: nada carrega sem opt-in. */
export function useConsentimento(): Consentimento {
  return useSyncExternalStore(assinar, ler, () => null);
}

export function definirConsentimento(valor: Consentimento) {
  const anterior = ler();
  try {
    if (valor) localStorage.setItem(KEY, valor);
    else localStorage.removeItem(KEY);
  } catch {
    /* ignora */
  }
  ouvintes.forEach((cb) => cb());
  // Retirar um consentimento já dado: recarrega para descarregar os scripts de terceiros.
  if (anterior === "granted" && valor !== "granted") window.location.reload();
}

export const consentimentoAtual = ler;
