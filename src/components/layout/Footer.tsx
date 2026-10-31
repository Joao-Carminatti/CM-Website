import Link from "next/link";
import { navegacao, siteConfig } from "@/config/site";
import { Wordmark } from "@/components/ui/Wordmark";
import { CookiePrefsButton } from "@/components/analytics/ConsentBanner";

export function Footer() {
  const redes = Object.entries(siteConfig.redes).filter(([, url]) => url);

  return (
    <footer className="on-dark bg-ink text-paper">
      <div className="page-width grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-5">
          <Wordmark />
          <p className="text-mist max-w-sm">{siteConfig.tagline}</p>
          <p className="text-sm">
            <span className="text-mist">CRECI </span>
            <strong className="font-semibold">{siteConfig.creci}</strong>
          </p>
        </div>

        <nav aria-label="Rodapé">
          <h2 className="font-display text-lg">Navegue</h2>
          <ul className="mt-4 space-y-2">
            {navegacao.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-mist hover:text-paper transition-colors"
                >
                  {item.rotulo}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-lg">Contato</h2>
          <ul className="text-mist mt-4 space-y-2">
            <li>{siteConfig.whatsappExibicao}</li>
            <li>{siteConfig.email}</li>
            <li>{siteConfig.regiao}</li>
          </ul>
          {redes.length > 0 && (
            <ul className="mt-5 flex gap-4">
              {redes.map(([nome, url]) => (
                <li key={nome}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-bronze hover:text-paper capitalize underline-offset-4 hover:underline"
                  >
                    {nome}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="border-ink-soft border-t">
        <div className="page-width text-mist flex flex-col gap-3 py-6 text-sm md:flex-row md:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.nome}. Todos os direitos reservados.
          </p>
          <p className="flex gap-5">
            <Link href="/politica-de-privacidade" className="hover:text-paper">
              Privacidade
            </Link>
            <Link href="/termos" className="hover:text-paper">
              Termos de uso
            </Link>
            <CookiePrefsButton />
          </p>
        </div>
        <p className="page-width text-mist pb-8 text-xs leading-relaxed">
          Valores, metragens e condições podem sofrer alteração sem aviso prévio.
          Simulações são estimativas e não representam oferta de crédito. Imagens
          ilustrativas.
        </p>
      </div>
    </footer>
  );
}
