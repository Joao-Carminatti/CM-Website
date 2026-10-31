import { getImovel, getImoveis } from "@/lib/data";
import { formatArea, formatPreco, rotulosTipo } from "@/lib/format";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Imóvel à venda";

export async function generateStaticParams() {
  return (await getImoveis()).map((i) => ({ slug: i.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const i = await getImovel((await params).slug);
  if (!i) return renderOg({ titulo: "Imóvel não encontrado" });
  return renderOg({
    rotulo: `${rotulosTipo[i.tipo]} à venda · ${i.bairro}`,
    titulo: i.titulo,
    rodape: `${formatPreco(i.preco)} · ${formatArea(i.area)}`,
  });
}
