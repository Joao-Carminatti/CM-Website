/**
 * Fonte única dos dados do site. Tudo que está entre [COLCHETES] é
 * PLACEHOLDER e precisa ser preenchido antes de publicar.
 */
export const siteConfig = {
  nome: "Cleiton Molon",
  cargo: "Corretor de Imóveis",
  tagline: "Compre seu imóvel com acompanhamento de ponta a ponta.",
  descricao:
    "Imóveis à venda e lançamentos com atendimento próximo e transparente, da primeira conversa à escritura.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  creci: "[CRECI]",
  regiao: "Florianópolis e Grande Florianópolis",
  /** Apenas dígitos com DDI+DDD. Vazio = link do WhatsApp sem número. */
  whatsappNumero: process.env.NEXT_PUBLIC_WHATSAPP ?? "",
  whatsappExibicao: "[WHATSAPP]",
  email: "[EMAIL]",
  redes: {
    instagram: "", // ex.: https://instagram.com/usuario
    facebook: "",
    youtube: "",
  },
  /**
   * Foto de fundo do hero da Home. Deixe src vazio para usar o fundo azul.
   * Salve o arquivo em public/. Use foto horizontal, ~2400 px de largura, até ~400 KB.
   */
  heroImagem: { src: "/hero.jpg", alt: "Foto áerea da Ilha do campeche." },
  /** IDs de analytics. Sem ID, NADA é carregado. Só rodam após consentimento. */
  analytics: {
    ga4: /^G-[A-Z0-9]{4,}$/.test(process.env.NEXT_PUBLIC_GA4_ID ?? "")
      ? process.env.NEXT_PUBLIC_GA4_ID!
      : "",
    gtm: /^GTM-[A-Z0-9]{4,}$/.test(process.env.NEXT_PUBLIC_GTM_ID ?? "")
      ? process.env.NEXT_PUBLIC_GTM_ID!
      : "",
    metaPixel: /^\d{6,}$/.test(process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "")
      ? process.env.NEXT_PUBLIC_META_PIXEL_ID!
      : "",
  },
  /** Imóveis e lançamentos de exemplo (isDemo). Desligue em produção. */
  mostrarExemplos: process.env.NEXT_PUBLIC_SHOW_DEMO !== "false",
} as const;

export const navegacao = [
  { href: "/imoveis", rotulo: "Imóveis à venda" },
  { href: "/lancamentos", rotulo: "Lançamentos" },
  { href: "/vender-seu-imovel", rotulo: "Vender meu imóvel" },
  { href: "/sobre", rotulo: "Sobre" },
  { href: "/contato", rotulo: "Contato" },
] as const;

/** Valor ainda é placeholder ("[CRECI]", vazio...)? Usado para não publicar dados falsos no SEO. */
export const ehPlaceholder = (v: string) => !v || v.startsWith("[");

export const temAnalytics = Boolean(
  siteConfig.analytics.ga4 || siteConfig.analytics.gtm || siteConfig.analytics.metaPixel,
);
