import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { getImoveis, getLancamentos } from "@/lib/data";
import { schemaCorretor } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { Hero } from "@/components/home/Hero";
import {
  FeaturedLaunches,
  FeaturedProperties,
} from "@/components/home/FeaturedProperties";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { About } from "@/components/home/About";
import { SocialProof } from "@/components/home/SocialProof";
import { SellBanner } from "@/components/home/SellBanner";
import { Faq } from "@/components/home/Faq";
import { QuickContact } from "@/components/home/QuickContact";

export const metadata: Metadata = {
  title: { absolute: `Corretor de imóveis em ${siteConfig.regiao} | ${siteConfig.nome}` },
  description: `Imóveis à venda e lançamentos em ${siteConfig.regiao}. ${siteConfig.nome}, ${siteConfig.cargo.toLowerCase()}, acompanha você da visita à escritura.`,
  alternates: { canonical: "/" },
};

export default async function Home() {
  const [todos, destaques, lancamentos] = await Promise.all([
    getImoveis(),
    getImoveis({ destaque: true, limite: 3 }),
    getLancamentos({ destaque: true, limite: 3 }),
  ]);
  const locais = [...new Set(todos.flatMap((i) => [i.bairro, i.cidade]))].sort();

  return (
    <>
      <JsonLd data={schemaCorretor()} />
      <Hero locais={locais} />
      <FeaturedProperties imoveis={destaques} />
      <FeaturedLaunches lancamentos={lancamentos} />
      <ProcessTimeline />
      <About />
      <SocialProof />
      <SellBanner />
      <Faq />
      <QuickContact />
    </>
  );
}
