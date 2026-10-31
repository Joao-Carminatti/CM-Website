import { siteConfig } from "@/config/site";
import { buildWhatsAppLink, mensagemPadrao } from "@/lib/whatsapp";

export function QuickContact() {
  return (
    <section aria-labelledby="contato-rapido" className="page-width py-20 md:py-28">
      <div className="max-w-2xl">
        <h2
          id="contato-rapido"
          className="font-display text-3xl leading-tight font-medium md:text-5xl"
        >
          Vamos conversar sobre o seu próximo imóvel?
        </h2>
        <p className="text-stone mt-4 text-lg">
          Conte o que você procura. O Cleiton responde pessoalmente.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
          <a
            href={buildWhatsAppLink({ mensagem: mensagemPadrao })}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-ink text-paper hover:bg-ink-soft inline-flex h-12 items-center rounded-md px-7 font-semibold transition-colors"
          >
            Falar no WhatsApp
          </a>
          <span className="text-stone">{siteConfig.email}</span>
        </div>
      </div>
    </section>
  );
}
