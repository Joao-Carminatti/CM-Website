"use client";

import Link from "next/link";
import { temAnalytics } from "@/config/site";
import { definirConsentimento, useConsentimento } from "@/lib/consent";

/**
 * Banner de consentimento (LGPD). Só aparece quando há algo a consentir
 * (algum ID de analytics configurado) e a pessoa ainda não escolheu.
 * "Aceitar" e "Recusar" têm o mesmo peso visual.
 */
export function ConsentBanner() {
  const consentimento = useConsentimento();
  if (!temAnalytics || consentimento !== null) return null;

  const botao =
    "h-11 rounded-md border border-ink px-5 text-sm font-semibold transition-colors";
  return (
    <section
      aria-label="Preferências de cookies"
      className="bg-paper border-line fixed inset-x-3 bottom-3 z-50 max-w-xl rounded-lg border p-5 shadow-[var(--shadow-lift)] sm:right-auto sm:bottom-6 sm:left-6"
    >
      <p className="text-sm leading-relaxed">
        Usamos cookies de medição para entender como o site é usado e melhorar o
        atendimento. Eles só são ativados com a sua permissão. Saiba mais na{" "}
        <Link href="/politica-de-privacidade" className="underline underline-offset-4">
          Política de Privacidade
        </Link>
        .
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => definirConsentimento("granted")}
          className={`${botao} bg-ink text-paper hover:bg-ink-soft`}
        >
          Aceitar
        </button>
        <button
          type="button"
          onClick={() => definirConsentimento("denied")}
          className={`${botao} hover:bg-paper-deep`}
        >
          Recusar
        </button>
      </div>
    </section>
  );
}

/** Link do rodapé para rever a escolha. */
export function CookiePrefsButton() {
  if (!temAnalytics) return null;
  return (
    <button
      type="button"
      onClick={() => definirConsentimento(null)}
      className="hover:text-paper underline-offset-4 hover:underline"
    >
      Preferências de cookies
    </button>
  );
}
