import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig } from "@/config/site";
import { getImovel, getImoveis, getImoveisSemelhantes } from "@/lib/data";
import { formatArea, formatPreco, rotulosTipo } from "@/lib/format";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { Gallery } from "@/components/property/Gallery";
import { YoutubeFacade } from "@/components/property/YoutubeFacade";
import { MapOnDemand } from "@/components/property/MapOnDemand";
import { ShareButton } from "@/components/property/ShareButton";
import { FinancingSimulator } from "@/components/property/FinancingSimulator";
import { PropertyCard } from "@/components/property/PropertyCard";
import { LeadForm } from "@/components/forms/LeadForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { schemaImovel } from "@/lib/schema";

export const revalidate = 3600; // ISR: regenera a cada hora quando os dados vierem de CMS

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getImoveis()).map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const imovel = await getImovel((await params).slug);
  if (!imovel) return { title: "Imóvel não encontrado" };
  return {
    title: `${imovel.titulo} em ${imovel.bairro}`,
    description: `${rotulosTipo[imovel.tipo]} à venda em ${imovel.bairro}, ${imovel.cidade}: ${formatArea(imovel.area)}, ${formatPreco(imovel.preco)}. Código ${imovel.codigo}.`,
    alternates: { canonical: `/imoveis/${imovel.slug}` },
    // Exemplos nunca devem ser indexados
    robots: imovel.isDemo ? { index: false, follow: false } : undefined,
  };
}

export default async function ImovelPage({ params }: Props) {
  const imovel = await getImovel((await params).slug);
  if (!imovel) notFound();
  const semelhantes = await getImoveisSemelhantes(imovel);

  const nome = `${imovel.titulo} (${imovel.bairro})`;
  const whatsVisita = buildWhatsAppLink({
    mensagem: "Olá, Cleiton! Gostaria de agendar uma visita a este imóvel.",
    nome,
    codigo: imovel.codigo,
  });
  const whatsConversa = buildWhatsAppLink({
    mensagem:
      "Olá, Cleiton! Tenho interesse neste imóvel e gostaria de mais informações.",
    nome,
    codigo: imovel.codigo,
  });

  const caracteristicas = [
    ["Área", formatArea(imovel.area)],
    imovel.quartos > 0 ? ["Quartos", String(imovel.quartos)] : null,
    imovel.banheiros > 0 ? ["Banheiros", String(imovel.banheiros)] : null,
    imovel.vagas > 0 ? ["Vagas", String(imovel.vagas)] : null,
    ["Tipo", rotulosTipo[imovel.tipo]],
    ["Código", imovel.codigo],
  ].filter((x): x is string[] => x !== null);

  const indisponivel = imovel.status !== "disponivel";

  return (
    <article className="page-width py-8 md:py-14">
      {!imovel.isDemo && <JsonLd data={schemaImovel(imovel)} />}
      <nav aria-label="Você está em" className="text-stone text-sm">
        <Link href="/imoveis" className="underline underline-offset-4">
          Imóveis à venda
        </Link>
        <span aria-hidden="true"> / </span>
        <span>{imovel.bairro}</span>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_22rem] lg:gap-14">
        <div className="min-w-0 space-y-14">
          <Gallery fotos={imovel.fotos} codigo={imovel.codigo} titulo={imovel.titulo} />

          <header>
            {imovel.isDemo && (
              <p className="bg-paper-deep mb-4 inline-block rounded-sm px-3 py-1 text-sm font-medium">
                Imóvel de exemplo
              </p>
            )}
            <h1 className="font-display text-3xl leading-tight font-medium tracking-tight md:text-5xl">
              {imovel.titulo}
            </h1>
            <p className="text-stone mt-3">
              {imovel.bairro}, {imovel.cidade} · Código {imovel.codigo}
            </p>
          </header>

          <section aria-labelledby="caracteristicas">
            <h2 id="caracteristicas" className="font-display text-2xl">
              Características
            </h2>
            <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3">
              {caracteristicas.map(([k, v]) => (
                <div key={k} className="border-line border-t pt-3">
                  <dt className="text-stone text-sm">{k}</dt>
                  <dd className="text-lg font-medium">{v}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby="descricao">
            <h2 id="descricao" className="font-display text-2xl">
              Sobre o imóvel
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed">{imovel.descricao}</p>
            {imovel.diferenciais.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-3">
                {imovel.diferenciais.map((d) => (
                  <li
                    key={d}
                    className="border-line rounded-full border px-4 py-1.5 text-sm"
                  >
                    {d}
                  </li>
                ))}
              </ul>
            )}
          </section>

          {imovel.videoYoutube && (
            <section aria-labelledby="video">
              <h2 id="video" className="font-display mb-5 text-2xl">
                Vídeo
              </h2>
              <YoutubeFacade id={imovel.videoYoutube} titulo={imovel.titulo} />
            </section>
          )}

          <section aria-labelledby="localizacao">
            <h2 id="localizacao" className="font-display mb-5 text-2xl">
              Localização aproximada
            </h2>
            <MapOnDemand bairro={imovel.bairro} cidade={imovel.cidade} />
            <p className="text-stone mt-3 text-sm">
              Por segurança, o endereço exato é informado apenas na visita.
            </p>
          </section>

          <FinancingSimulator valor={imovel.preco} />

          <section
            aria-labelledby="interesse"
            className="border-line rounded-lg border p-6 md:p-8"
          >
            <LeadForm
              tipo="interesse"
              titulo="Tenho interesse neste imóvel"
              descricao="Deixe seus dados e o Cleiton retorna para combinar a visita."
              contexto={{ nome, codigo: imovel.codigo, slug: imovel.slug }}
            />
          </section>
        </div>

        <aside aria-label="Valor e contato" className="lg:sticky lg:top-24 lg:self-start">
          <div className="border-line rounded-lg border p-6">
            <p className="text-stone text-sm">
              {indisponivel
                ? imovel.status === "vendido"
                  ? "Imóvel vendido"
                  : "Imóvel reservado"
                : "Valor de venda"}
            </p>
            <p className="font-display mt-1 text-4xl">{formatPreco(imovel.preco)}</p>
            <div className="mt-6 grid gap-3">
              <a
                href={whatsVisita}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-ink text-paper hover:bg-ink-soft flex h-12 items-center justify-center rounded-md font-semibold transition-colors"
              >
                Agendar visita
              </a>
              <a
                href={whatsConversa}
                target="_blank"
                rel="noopener noreferrer"
                className="border-ink hover:bg-paper-deep flex h-12 items-center justify-center rounded-md border font-semibold transition-colors"
              >
                Chamar no WhatsApp
              </a>
            </div>
            <div className="mt-5 text-sm">
              <ShareButton titulo={imovel.titulo} />
            </div>
            <p className="text-stone mt-5 text-xs leading-relaxed">
              Valores e condições podem sofrer alteração sem aviso prévio. CRECI{" "}
              {siteConfig.creci}.
            </p>
          </div>
        </aside>
      </div>

      {semelhantes.length > 0 && (
        <section aria-labelledby="semelhantes" className="mt-20">
          <h2 id="semelhantes" className="font-display text-3xl">
            Imóveis semelhantes
          </h2>
          <ul className="mt-8 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {semelhantes.map((i) => (
              <li key={i.codigo}>
                <PropertyCard imovel={i} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
