import { siteConfig } from "@/config/site";

interface WhatsAppOpcoes {
  mensagem: string;
  /** Nome do imóvel/empreendimento e código entram na mensagem */
  nome?: string;
  codigo?: string;
}

/** Monta o link do WhatsApp com mensagem pré-preenchida. */
export function buildWhatsAppLink({ mensagem, nome, codigo }: WhatsAppOpcoes): string {
  const partes = [mensagem];
  if (nome) partes.push(`Imóvel: ${nome}`);
  if (codigo) partes.push(`Código: ${codigo}`);
  const texto = encodeURIComponent(partes.join("\n"));
  const base = siteConfig.whatsappNumero
    ? `https://wa.me/${siteConfig.whatsappNumero}`
    : "https://wa.me/";
  return `${base}?text=${texto}`;
}

export const mensagemPadrao =
  "Olá, Cleiton! Vim pelo seu site e gostaria de conversar sobre imóveis.";
