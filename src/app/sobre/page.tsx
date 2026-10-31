import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Monogram } from "@/components/ui/Monogram";
import { buildWhatsAppLink, mensagemPadrao } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: `Sobre ${siteConfig.nome}`,
  description: `Conheça ${siteConfig.nome}, ${siteConfig.cargo.toLowerCase()} em ${siteConfig.regiao}: forma de trabalhar, diferenciais e atendimento.`,
  alternates: { canonical: "/sobre" },
};

const principios = [
  {
    t: "Clareza",
    d: "Valores, prazos e condições explicados de forma simples, em cada etapa.",
  },
  {
    t: "Acompanhamento",
    d: "Da primeira conversa à escritura, você sabe o que vem a seguir.",
  },
  {
    t: "Atendimento direto",
    d: "Quem atende você é o próprio corretor, sem intermediários.",
  },
];

export default function SobrePage() {
  return (
    <div className="page-width py-12 md:py-20">
      <div className="grid items-start gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
        <div
          role="img"
          aria-label="Espaço reservado para a foto do corretor"
          className="from-ink-soft to-ink text-bronze flex aspect-[4/5] items-center justify-center rounded-lg bg-gradient-to-b"
        >
          <Monogram className="size-24 opacity-60" />
        </div>
        <div>
          <h1 className="font-display text-4xl leading-tight font-medium tracking-tight md:text-6xl">
            {siteConfig.nome}
          </h1>
          <p className="text-stone mt-2 text-lg">
            {siteConfig.cargo} · CRECI {siteConfig.creci}
          </p>
          <p className="mt-8 max-w-xl text-lg leading-relaxed">
            [BIO DO CLEITON: trajetória, tempo de mercado, regiões e perfis de cliente que
            atende. Use apenas informações reais.]
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
        </div>
      </div>

      <section aria-labelledby="principios" className="mt-20">
        <h2 id="principios" className="font-display text-3xl">
          Como eu trabalho
        </h2>
        <ul className="mt-8 grid gap-8 md:grid-cols-3">
          {principios.map((p) => (
            <li key={p.t} className="border-line border-t pt-4">
              <h3 className="font-display text-xl">{p.t}</h3>
              <p className="text-stone mt-2">{p.d}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
