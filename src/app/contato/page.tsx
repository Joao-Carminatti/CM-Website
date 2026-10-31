import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { buildWhatsAppLink, mensagemPadrao } from "@/lib/whatsapp";
import { LeadForm } from "@/components/forms/LeadForm";

export const metadata: Metadata = {
  title: "Contato",
  description: `Fale com ${siteConfig.nome}, ${siteConfig.cargo.toLowerCase()} em ${siteConfig.regiao}, pelo WhatsApp ou pelo formulário.`,
  alternates: { canonical: "/contato" },
};

export default function ContatoPage() {
  return (
    <div className="page-width grid gap-14 py-12 md:py-20 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
      <div>
        <h1 className="font-display text-4xl leading-tight font-medium tracking-tight md:text-6xl">
          Vamos conversar?
        </h1>
        <p className="text-stone mt-4 max-w-md text-lg">
          O caminho mais rápido é o WhatsApp. Se preferir, deixe sua mensagem e o Cleiton
          retorna.
        </p>
        <a
          href={buildWhatsAppLink({ mensagem: mensagemPadrao })}
          target="_blank"
          rel="noopener noreferrer"
          data-magnetic
          className="bg-ink text-paper hover:bg-ink-soft mt-8 inline-flex h-12 items-center rounded-md px-7 font-semibold transition-colors"
        >
          Falar no WhatsApp
        </a>
        <dl className="mt-12 space-y-4">
          <div>
            <dt className="text-stone text-sm">WhatsApp</dt>
            <dd>{siteConfig.whatsappExibicao}</dd>
          </div>
          <div>
            <dt className="text-stone text-sm">E-mail</dt>
            <dd>{siteConfig.email}</dd>
          </div>
          <div>
            <dt className="text-stone text-sm">Região de atuação</dt>
            <dd>{siteConfig.regiao}</dd>
          </div>
          <div>
            <dt className="text-stone text-sm">CRECI</dt>
            <dd>{siteConfig.creci}</dd>
          </div>
        </dl>
      </div>
      <div className="border-line rounded-lg border p-6 md:p-8">
        <LeadForm tipo="contato" titulo="Envie uma mensagem" />
      </div>
    </div>
  );
}
