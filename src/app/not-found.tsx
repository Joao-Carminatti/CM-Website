import Link from "next/link";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export const metadata = { title: "Página não encontrada" };

export default function NotFound() {
  return (
    <div className="page-width py-24 md:py-36">
      <p className="text-bronze-deep font-medium">Erro 404</p>
      <h1 className="font-display mt-3 max-w-2xl text-4xl leading-tight font-medium md:text-6xl">
        Não encontramos esta página.
      </h1>
      <p className="text-stone mt-5 max-w-lg text-lg">
        O endereço pode ter mudado ou o imóvel já foi vendido. Veja os imóveis disponíveis
        ou fale direto com o Cleiton.
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          href="/imoveis"
          className="bg-ink text-paper hover:bg-ink-soft inline-flex h-12 items-center rounded-md px-6 font-medium transition-colors"
        >
          Ver imóveis à venda
        </Link>
        <a
          href={buildWhatsAppLink({
            mensagem: "Olá, Cleiton! Não encontrei uma página do seu site.",
          })}
          target="_blank"
          rel="noopener noreferrer"
          className="border-ink hover:bg-paper-deep inline-flex h-12 items-center rounded-md border px-6 font-medium transition-colors"
        >
          Falar no WhatsApp
        </a>
      </div>
    </div>
  );
}
