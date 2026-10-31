import { siteConfig } from "@/config/site";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = `${siteConfig.nome}, ${siteConfig.cargo}`;

export default function Image() {
  return renderOg({ titulo: siteConfig.tagline, rodape: siteConfig.regiao });
}
