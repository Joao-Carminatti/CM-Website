import { buildWhatsAppLink, mensagemPadrao } from "@/lib/whatsapp";

/** Botão flutuante discreto. Server Component: zero JS. */
export function WhatsAppFloat() {
  return (
    <a
      href={buildWhatsAppLink({ mensagem: mensagemPadrao })}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar no WhatsApp"
      className="bg-ink text-paper border-bronze hover:bg-ink-soft fixed right-4 bottom-4 z-40 inline-flex size-14 items-center justify-center rounded-full border shadow-[var(--shadow-lift)] transition-colors sm:right-6 sm:bottom-6"
    >
      <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true" fill="currentColor">
        <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.95L2 22l5.2-1.5A9.9 9.9 0 1 0 12.04 2Zm0 1.8a8.1 8.1 0 1 1-4.2 15.03l-.3-.18-3.08.88.9-3-.2-.31A8.1 8.1 0 0 1 12.04 3.8Zm-3.2 3.9c-.2 0-.5.07-.76.35-.26.29-1 1-1 2.43s1.03 2.8 1.18 3c.14.2 2 3.2 4.95 4.35 2.44.96 2.94.77 3.47.72.53-.05 1.7-.7 1.94-1.37.24-.68.24-1.26.17-1.38-.07-.12-.26-.2-.55-.34-.29-.15-1.7-.84-1.97-.94-.26-.1-.46-.14-.65.15-.2.29-.75.94-.92 1.13-.17.2-.34.22-.63.07-.29-.14-1.22-.45-2.32-1.43-.86-.77-1.44-1.71-1.6-2-.17-.29-.02-.45.13-.6.13-.13.29-.34.43-.5.15-.17.2-.29.3-.48.1-.2.05-.36-.02-.5-.07-.15-.65-1.6-.9-2.18-.23-.56-.47-.48-.65-.49h-.55Z" />
      </svg>
    </a>
  );
}
