import { ehPlaceholder, siteConfig } from "@/config/site";
import type { Imovel } from "@/types";

/** Corretor/organização. Campos ainda em placeholder são omitidos (nunca publicamos dado falso). */
export function schemaCorretor() {
  const redes = Object.values(siteConfig.redes).filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": ["RealEstateAgent", "Organization"],
    name: `${siteConfig.nome}, ${siteConfig.cargo}`,
    url: siteConfig.url,
    description: siteConfig.descricao,
    ...(siteConfig.whatsappNumero && { telephone: `+${siteConfig.whatsappNumero}` }),
    ...(!ehPlaceholder(siteConfig.email) && { email: siteConfig.email }),
    ...(!ehPlaceholder(siteConfig.regiao) && { areaServed: siteConfig.regiao }),
    ...(!ehPlaceholder(siteConfig.creci) && {
      identifier: { "@type": "PropertyValue", name: "CRECI", value: siteConfig.creci },
    }),
    ...(redes.length > 0 && { sameAs: redes }),
  };
}

/** Anúncio. Só para imóveis REAIS: o chamador nunca deve passar isDemo. Sem endereço exato. */
export function schemaImovel(i: Imovel) {
  const imagens = i.fotos
    .filter((f) => f.src)
    .map((f) => new URL(f.src!, siteConfig.url).toString());
  const url = `${siteConfig.url}/imoveis/${i.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: i.titulo,
    url,
    description: i.descricao,
    datePosted: i.data,
    ...(imagens.length > 0 && { image: imagens }),
    contentLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: i.cidade,
        addressRegion: i.bairro,
      },
    },
    offers: {
      "@type": "Offer",
      price: i.preco,
      priceCurrency: "BRL",
      availability:
        i.status === "vendido"
          ? "https://schema.org/SoldOut"
          : "https://schema.org/InStock",
      url,
    },
  };
}
