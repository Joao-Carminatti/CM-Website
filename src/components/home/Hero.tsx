import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { buildWhatsAppLink, mensagemPadrao } from "@/lib/whatsapp";
import { HeroSearch } from "./HeroSearch";

/**
 * Traço arquitetônico: contorno de um skyline desenhado com stroke-dashoffset.
 * pathLength="1" normaliza o comprimento, então o CSS (.draw) funciona em qualquer path.
 * ~1 KB. Anima só stroke-dashoffset (propriedade barata, sem layout).
 */
function SkylineDraw() {
  const props = {
    pathLength: 1,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.25,
  } as const;
  return (
    <svg
      viewBox="0 0 1200 220"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      className="draw text-bronze pointer-events-none absolute inset-x-0 bottom-0 h-40 w-full opacity-80 md:h-56"
    >
      <path {...props} style={{ "--i": 0 } as React.CSSProperties} d="M0 218H1200" />
      <path
        {...props}
        style={{ "--i": 1 } as React.CSSProperties}
        d="M60 218V120L110 92V218M110 92H190V218M130 120H170M130 150H170M130 180H170"
      />
      <path
        {...props}
        style={{ "--i": 2 } as React.CSSProperties}
        d="M280 218V60H420V218M280 60L350 20L420 60M310 90H390M310 120H390M310 150H390M310 180H390"
      />
      <path
        {...props}
        style={{ "--i": 3 } as React.CSSProperties}
        d="M520 218V110H640V218M520 110L580 76L640 110M545 218V160H615V218"
      />
      <path
        {...props}
        style={{ "--i": 4 } as React.CSSProperties}
        d="M740 218V40H900V218M770 70V200M800 70V200M830 70V200M860 70V200"
      />
      <path
        {...props}
        style={{ "--i": 5 } as React.CSSProperties}
        d="M1000 218V130H1080V90H1160V218M1020 160H1060M1100 120H1140M1100 160H1140"
      />
    </svg>
  );
}

export function Hero({ locais }: { locais: string[] }) {
  const foto = siteConfig.heroImagem;
  const comFoto = Boolean(foto.src);
  const linhas = ["Seu próximo imóvel,", "com alguém ao seu lado", "da visita à escritura."];

  return (
    <section className="on-dark bg-ink text-paper relative isolate overflow-hidden">
      {comFoto ? (
        <div className="absolute inset-0 -z-10">
          <Image src={foto.src} alt={foto.alt} fill priority sizes="100vw" className="object-cover" />
          <div className="from-ink/90 via-ink/80 to-ink/70 absolute inset-0 bg-gradient-to-b" />
        </div>
      ) : (
        <div
          aria-hidden="true"
          className="hero-panel from-ink-soft to-ink absolute inset-y-0 right-0 -z-10 hidden w-[42%] bg-gradient-to-br md:block"
        />
      )}
      {!comFoto && <SkylineDraw />}

      <div className="page-width relative pt-16 pb-44 md:pt-24 md:pb-60">
        <h1 className="font-display max-w-3xl text-[2.6rem] leading-[1.08] font-medium tracking-tight sm:text-6xl lg:text-7xl">
          {linhas.map((linha, i) => (
            <span key={linha} className="reveal-line">
              <span style={{ "--i": i } as React.CSSProperties}>{linha}</span>
            </span>
          ))}
        </h1>

        <p className={`${comFoto ? "text-paper" : "text-mist"} mt-8 max-w-xl text-lg`}>
          Imóveis à venda e lançamentos em {siteConfig.regiao}, com atendimento direto do
          corretor {siteConfig.nome}.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
          <a
            data-magnetic
            href={buildWhatsAppLink({ mensagem: mensagemPadrao })}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-bronze text-ink hover:bg-paper inline-flex h-12 items-center rounded-md px-6 font-semibold transition-colors"
          >
            Falar no WhatsApp
          </a>
          <Link href="/lancamentos" className="underline-offset-4 hover:underline">
            Ver lançamentos
          </Link>
        </div>

        <HeroSearch locais={locais} />
      </div>
    </section>
  );
}