"use client";

import { useState } from "react";

export function ShareButton({ titulo }: { titulo: string }) {
  const [aviso, setAviso] = useState("");

  async function compartilhar() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: titulo, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setAviso("Link copiado");
    } catch {
      setAviso("");
    }
    setTimeout(() => setAviso(""), 2500);
  }

  return (
    <span className="inline-flex items-center gap-3">
      <button
        type="button"
        onClick={compartilhar}
        className="underline underline-offset-4"
      >
        Compartilhar
      </button>
      <span role="status" aria-live="polite" className="text-stone text-sm">
        {aviso}
      </span>
    </span>
  );
}
