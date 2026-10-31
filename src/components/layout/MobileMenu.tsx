"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { navegacao } from "@/config/site";

/** Menu móvel. Client Component pequeno: só estado aberto/fechado. */
export function MobileMenu({ whatsappHref }: { whatsappHref: string }) {
  const [aberto, setAberto] = useState(false);
  const botao = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!aberto) return;
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setAberto(false);
        botao.current?.focus();
      }
    };
    document.addEventListener("keydown", aoTeclar);
    return () => document.removeEventListener("keydown", aoTeclar);
  }, [aberto]);

  return (
    <div className="lg:hidden">
      <button
        ref={botao}
        type="button"
        onClick={() => setAberto((v) => !v)}
        aria-expanded={aberto}
        aria-controls="menu-movel"
        className="inline-flex h-11 items-center gap-2 rounded-md px-3 text-sm font-medium"
      >
        <span>{aberto ? "Fechar" : "Menu"}</span>
        <svg
          viewBox="0 0 20 20"
          className="size-5"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          {aberto ? (
            <path d="M4 4l12 12M16 4L4 16" />
          ) : (
            <path d="M3 6h14M3 10h14M3 14h14" />
          )}
        </svg>
      </button>

      {aberto && (
        <nav
          id="menu-movel"
          aria-label="Menu principal"
          className="bg-paper border-line absolute inset-x-0 top-full border-b shadow-[var(--shadow-lift)]"
        >
          <ul className="page-width flex flex-col py-3">
            {navegacao.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setAberto(false)}
                  className="border-line flex min-h-12 items-center border-b text-lg"
                >
                  {item.rotulo}
                </Link>
              </li>
            ))}
            <li className="py-4">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-ink text-paper flex min-h-12 items-center justify-center rounded-md px-5 font-medium"
              >
                Falar no WhatsApp
              </a>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
