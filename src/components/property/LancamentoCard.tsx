import Link from "next/link";
import type { Lancamento } from "@/types";
import { formatEntrega, formatPreco, rotulosStatusLancamento } from "@/lib/format";
import { FotoView } from "@/components/ui/FotoView";

export function LancamentoCard({ lancamento }: { lancamento: Lancamento }) {
  const selos: string[] = [rotulosStatusLancamento[lancamento.status]];
  if (lancamento.isDemo) selos.push("Empreendimento de exemplo");

  return (
    <article className="group relative">
      <div
        data-spotlight
        className="zoom-media bg-paper-deep relative aspect-[4/3] overflow-hidden rounded-md"
      >
        <FotoView
          foto={lancamento.fotos[0]}
          sizes="(min-width: 1024px) 24rem, (min-width: 640px) 50vw, 100vw"
        />
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
      </div>
      <div className="mt-4 space-y-1">
        <p className="text-stone text-sm">
          {lancamento.construtora} · {lancamento.bairro}, {lancamento.cidade}
        </p>
        <h3 className="font-display text-xl leading-snug">
          <Link
            href={`/lancamentos/${lancamento.slug}`}
            className="after:absolute after:inset-0 after:content-['']"
          >
            {lancamento.nome}
          </Link>
        </h3>
        <p className="text-stone text-sm">
          Entrega prevista: {formatEntrega(lancamento.entrega)}
        </p>
        <p className="pt-1 text-lg font-semibold">
          {lancamento.aPartirDe
            ? `A partir de ${formatPreco(lancamento.aPartirDe)}`
            : "Valores sob consulta"}
        </p>
      </div>
    </article>
  );
}
