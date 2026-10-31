import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getImoveis, getLancamentos } from "@/lib/data";

/** Sitemap dinâmico. Itens de exemplo (isDemo) NUNCA entram. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url.replace(/\/$/, "");
  const [imoveis, lancamentos] = await Promise.all([getImoveis(), getLancamentos()]);

  const fixas = [
    "",
    "/imoveis",
    "/lancamentos",
    "/vender-seu-imovel",
    "/sobre",
    "/contato",
    "/politica-de-privacidade",
    "/termos",
  ].map((r) => ({
    url: `${base}${r}`,
    changeFrequency: "weekly" as const,
    priority: r === "" ? 1 : 0.8,
  }));

  return [
    ...fixas,
    ...imoveis
      .filter((i) => !i.isDemo)
      .map((i) => ({
        url: `${base}/imoveis/${i.slug}`,
        lastModified: i.data,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      })),
    ...lancamentos
      .filter((l) => !l.isDemo)
      .map((l) => ({
        url: `${base}/lancamentos/${l.slug}`,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      })),
  ];
}
