import { getLancamento, getLancamentos } from "@/lib/data";
import { formatEntrega, formatPreco, rotulosStatusLancamento } from "@/lib/format";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Lançamento imobiliário";

export async function generateStaticParams() {
  return (await getLancamentos()).map((l) => ({ slug: l.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const l = await getLancamento((await params).slug);
  if (!l) return renderOg({ titulo: "Empreendimento não encontrado" });
  return renderOg({
    rotulo: `${rotulosStatusLancamento[l.status]} · ${l.bairro}`,
    titulo: l.nome,
    rodape: l.aPartirDe
      ? `A partir de ${formatPreco(l.aPartirDe)} · entrega ${formatEntrega(l.entrega)}`
      : `Entrega prevista ${formatEntrega(l.entrega)}`,
  });
}
