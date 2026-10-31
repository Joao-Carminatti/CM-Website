import Link from "next/link";
import { navegacao } from "@/config/site";
import { buildWhatsAppLink, mensagemPadrao } from "@/lib/whatsapp";
import { Wordmark } from "@/components/ui/Wordmark";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const whatsappHref = buildWhatsAppLink({ mensagem: mensagemPadrao });

  return (
    <header className="bg-paper/95 border-line sticky top-0 z-50 border-b">
      <div className="page-width relative flex h-[4.5rem] items-center justify-between gap-6">
        <Link href="/" aria-label="Cleiton Molon, Corretor de Imóveis: página inicial">
          <Wordmark />
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-8 text-[0.95rem]">
            {navegacao.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="hover:text-bronze-deep py-2 transition-colors"
                >
                  {item.rotulo}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <a
          data-magnetic
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-ink text-paper hover:bg-ink-soft hidden h-11 items-center rounded-md px-5 text-sm font-medium transition-colors lg:inline-flex"
        >
          Falar no WhatsApp
        </a>

        <MobileMenu whatsappHref={whatsappHref} />
      </div>
    </header>
  );
}
