import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Monogram } from "@/components/ui/Monogram";
import { buildWhatsAppLink, mensagemPadrao } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: `Sobre ${siteConfig.nome}`,
  description: `Conheça ${siteConfig.nome}: 17 anos de atuação no mercado imobiliário de Florianópolis e Grande Florianópolis, com abordagem consultiva e estratégica.`,
  alternates: { canonical: "/sobre" },
};

const paragrafos = [
  "Com 17 anos de atuação no mercado imobiliário de Florianópolis e Grande Florianópolis, Cleiton construiu uma trajetória pautada pela experiência, pelo conhecimento regional e pela capacidade de identificar oportunidades em diferentes segmentos do mercado imobiliário.",
  "Especialista no mercado imobiliário de Florianópolis, com atuação especialmente concentrada nas regiões Leste e Sul da Ilha, também desenvolve negócios em toda a Grande Florianópolis e em importantes mercados do litoral catarinense, abrangendo o Norte e o Sul do estado.",
  "Ao longo de sua trajetória, consolidou ampla experiência na comercialização de lançamentos imobiliários, imóveis na planta, imóveis prontos, casas, apartamentos, coberturas e terrenos, atendendo diferentes perfis e objetivos de aquisição.",
  "Seu trabalho é fundamentado em uma abordagem consultiva e estratégica, que vai além da simples intermediação imobiliária. Cada atendimento parte da compreensão das necessidades, expectativas e objetivos do cliente, buscando identificar as melhores oportunidades de acordo com seu perfil.",
  "Com uma visão abrangente do mercado, considera aspectos fundamentais como localização, qualidade do empreendimento, posicionamento de preço, potencial de valorização, liquidez e rentabilidade, oferecendo uma análise criteriosa tanto para quem busca um novo lar quanto para quem deseja investir e construir patrimônio.",
  "Acredita que cada negociação representa uma decisão importante e, por isso, conduz seu trabalho com transparência, proximidade e compromisso, acompanhando seus clientes em todas as etapas do processo.",
  "Seu propósito é oferecer mais do que imóveis: proporcionar orientação especializada, identificar boas oportunidades e contribuir para decisões imobiliárias seguras, inteligentes e alinhadas aos objetivos de cada cliente.",
];

const principios = [
  {
    t: "Abordagem consultiva",
    d: "Cada atendimento parte das necessidades, expectativas e objetivos do cliente.",
  },
  {
    t: "Análise criteriosa",
    d: "Localização, qualidade do empreendimento, preço, valorização, liquidez e rentabilidade avaliados caso a caso.",
  },
  {
    t: "Transparência e proximidade",
    d: "Acompanhamento do cliente em todas as etapas do processo.",
  },
];

export default function SobrePage() {
  return (
    <div className="page-width py-12 md:py-20">
      <div className="grid items-start gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
        {/* Placeholder da foto: substituir por <Image> quando houver foto */}
        <div
          role="img"
          aria-label="Espaço reservado para a foto do corretor"
          className="from-ink-soft to-ink text-bronze flex aspect-[4/5] items-center justify-center rounded-lg bg-gradient-to-b md:sticky md:top-24"
        >
          <Monogram className="size-24 opacity-60" />
        </div>
        <div>
          <h1 className="font-display text-4xl leading-tight font-medium tracking-tight md:text-6xl">
            {siteConfig.nome}
          </h1>
          <p className="text-stone mt-2 text-lg">
            Consultor Imobiliário · CRECI {siteConfig.creci}
          </p>
          <p className="font-display mt-8 max-w-2xl text-2xl leading-snug text-balance md:text-3xl">
            Experiência, conhecimento de mercado e visão estratégica para transformar
            oportunidades imobiliárias em grandes negócios.
          </p>
          <div className="mt-8 max-w-2xl space-y-5 text-lg leading-relaxed">
            {paragrafos.map((texto) => (
              <p key={texto.slice(0, 40)}>{texto}</p>
            ))}
          </div>
          <a
            href={buildWhatsAppLink({ mensagem: mensagemPadrao })}
            target="_blank"
            rel="noopener noreferrer"
            data-magnetic
            className="bg-ink text-paper hover:bg-ink-soft mt-10 inline-flex h-12 items-center rounded-md px-7 font-semibold transition-colors"
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