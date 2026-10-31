import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

/**
 * Imagem Open Graph 1200x630. Cores = tokens da PALETA PROVISÓRIA (ver BRANDING.md).
 * Ao definir a identidade visual, troque as constantes abaixo.
 */
const COR = { ink: "#0f1d2e", paper: "#f3f1ec", bronze: "#b79a6a", mist: "#a9b1bc" };

export function renderOg({
  rotulo,
  titulo,
  rodape,
}: {
  rotulo?: string;
  titulo: string;
  rodape?: string;
}) {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        background: COR.ink,
        color: COR.paper,
        padding: 72,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          color: COR.bronze,
          fontSize: 30,
        }}
      >
        <div style={{ display: "flex", width: 64, height: 4, background: COR.bronze }} />
        <div style={{ display: "flex" }}>{rotulo ?? siteConfig.cargo}</div>
      </div>
      <div
        style={{
          display: "flex",
          fontSize: titulo.length > 60 ? 54 : 68,
          lineHeight: 1.12,
          maxWidth: 1000,
        }}
      >
        {titulo}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 30,
          color: COR.mist,
        }}
      >
        <div style={{ display: "flex" }}>{rodape ?? ""}</div>
        <div style={{ display: "flex", color: COR.paper }}>{siteConfig.nome}</div>
      </div>
    </div>,
    ogSize,
  );
}
