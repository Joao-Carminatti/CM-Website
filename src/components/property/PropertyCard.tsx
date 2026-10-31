import Link from "next/link";
import { ViewTransition } from "react";
import type { Imovel } from "@/types";
import { formatArea, formatPreco, rotulosTipo } from "@/lib/format";
import { FotoView } from "@/components/ui/FotoView";
import { FavoriteButton } from "./FavoriteButton";

const rotulosSelo = {
  novo: "Novo",
  oportunidade: "Oportunidade",
  exclusivo: "Exclusivo",
} as const;

/** Card de imóvel. Server Component. Favoritar e ações rápidas entram na Fase 3. */
export function PropertyCard({ imovel, indice }: { imovel: Imovel; indice?: number }) {
  const selos: string[] = [];
  if (imovel.status === "vendido") selos.push("Vendido");
  else if (imovel.status === "reservado") selos.push("Reservado");
  else if (imovel.selo) selos.push(rotulosSelo[imovel.selo]);
  if (imovel.isDemo) selos.push("Imóvel de exemplo");

  const detalhes = [
    imovel.quartos > 0 &&
      `${imovel.quartos} ${imovel.quartos === 1 ? "quarto" : "quartos"}`,
    imovel.vagas > 0 && `${imovel.vagas} ${imovel.vagas === 1 ? "vaga" : "vagas"}`,
    formatArea(imovel.area),
  ].filter(Boolean);

  return (
    <article
      className={`group relative ${indice !== undefined ? "card-enter" : ""}`}
      style={
        indice !== undefined ? ({ "--i": indice } as React.CSSProperties) : undefined
      }
    >
      <ViewTransition name={`foto-${imovel.codigo}`} share="morph" default="none">
        <div
          data-spotlight
          className="zoom-media bg-paper-deep relative aspect-[4/3] overflow-hidden rounded-md"
        >
          <FotoView
            foto={imovel.fotos[0]}
            sizes="(min-width: 1024px) 24rem, (min-width: 640px) 50vw, 100vw"
          />
          {selos.length > 0 && (
            <ul className="absolute top-3 left-3 flex flex-wrap gap-2">
              {selos.map((s) => (
                <li
                  key={s}
                  className="bg-paper text-ink rounded-sm px-2.5 py-1 text-xs font-medium"
                >
                  {s}
                </li>
              ))}
            </ul>
          )}
          <div className="absolute top-3 right-3">
            <FavoriteButton codigo={imovel.codigo} titulo={imovel.titulo} />
          </div>
        </div>
      </ViewTransition>
      <div className="mt-4 space-y-1">
        <p className="text-stone text-sm">
          {rotulosTipo[imovel.tipo]} em {imovel.bairro}, {imovel.cidade}
        </p>
        <h3 className="font-display text-xl leading-snug">
          <Link
            href={`/imoveis/${imovel.slug}`}
            className="after:absolute after:inset-0 after:content-['']"
          >
            {imovel.titulo}
          </Link>
        </h3>
        <p className="text-stone text-sm">{detalhes.join(" · ")}</p>
        <p className="pt-1 text-lg font-semibold">{formatPreco(imovel.preco)}</p>
      </div>
    </article>
  );
}
