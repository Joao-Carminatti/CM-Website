"use client";

import { consentimentoAtual } from "./consent";

type Params = Record<string, string | number | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

/** Nome do evento no Meta Pixel (eventos padrão quando existem). */
const pixel: Record<string, string> = { whatsapp_click: "Contact", lead: "Lead" };

/**
 * Dispara um evento de conversão. Sem consentimento, não faz NADA.
 * Eventos: whatsapp_click, agendar_visita, lead, favoritar, simulador_uso.
 */
export function track(evento: string, params: Params = {}) {
  if (typeof window === "undefined" || consentimentoAtual() !== "granted") return;
  const limpos = Object.fromEntries(
    Object.entries(params).filter(([, v]) => v !== undefined),
  );
  window.dataLayer?.push({ event: evento, ...limpos });
  window.gtag?.("event", evento, limpos);
  window.fbq?.(pixel[evento] ? "track" : "trackCustom", pixel[evento] ?? evento, limpos);
}
