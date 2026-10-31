import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { getImoveis } from "@/lib/data";
import { parseFiltros, temFiltros, toQuery } from "@/lib/filtros";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { CatalogFilters } from "@/components/property/CatalogFilters";
import { PropertyCard } from "@/components/property/PropertyCard";

const POR_PAGINA = 6;

export const metadata: Metadata = {
  title: `Imóveis à venda em ${siteConfig.regiao}`,
  description: `Veja apartamentos, casas, coberturas, terrenos e imóveis comerciais à venda em ${siteConfig.regiao}, com atendimento direto do corretor.`,
  alternates: { canonical: "/imoveis" },
};

export default async function ImoveisPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const filtros = parseFiltros(sp);
  const ate = Math.max(
    POR_PAGINA,
    Number(Array.isArray(sp.ate) ? sp.ate[0] : sp.ate) || POR_PAGINA,
  );

  const [todos, resultado] = await Promise.all([getImoveis(), getImoveis({ filtros })]);
  const locais = [...new Set(todos.flatMap((i) => [i.bairro, i.cidade]))].sort();
  const visiveis = resultado.slice(0, ate);
  const restantes = resultado.length - visiveis.length;

  return (
    <div className="page-width py-12 md:py-20">
      <h1 className="font-display max-w-3xl text-4xl leading-tight font-medium tracking-tight md:text-6xl">
        Imóveis à venda em {siteConfig.regiao}
      </h1>
      <p className="text-stone mt-4 max-w-xl text-lg">
        Use os filtros para encontrar o imóvel certo. O endereço da busca pode ser
        compartilhado.
      </p>

      <div className="mt-10">
        <CatalogFilters filtros={filtros} locais={locais} />
      </div>

      <p role="status" aria-live="polite" className="mt-10 font-medium">
        {resultado.length === 0
          ? "Nenhum imóvel encontrado"
          : `${resultado.length} ${resultado.length === 1 ? "imóvel encontrado" : "imóveis encontrados"}`}
      </p>

      {resultado.length === 0 ? (
        <div className="border-line mt-6 rounded-lg border border-dashed p-10 text-center">
          <h2 className="font-display text-2xl">Nada com esses filtros, por enquanto.</h2>
          <p className="text-stone mx-auto mt-3 max-w-md">
            Tente ampliar a busca ou conte ao Cleiton o que você procura: ele avisa quando
            surgir algo no seu perfil.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            {temFiltros(filtros) && (
              <Link
                href="/imoveis"
                className="border-ink hover:bg-paper-deep inline-flex h-12 items-center rounded-md border px-6 font-medium"
              >
                Limpar filtros
              </Link>
            )}
            <a
              href={buildWhatsAppLink({
                mensagem:
                  "Olá, Cleiton! Não achei no site o imóvel que procuro. Pode me ajudar?",
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-ink text-paper hover:bg-ink-soft inline-flex h-12 items-center rounded-md px-6 font-semibold"
            >
              Falar no WhatsApp
            </a>
          </div>
        </div>
      ) : (
        <ul className="mt-6 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {visiveis.map((imovel, i) => (
            <li key={imovel.codigo}>
              <PropertyCard
                imovel={imovel}
                indice={i >= ate - POR_PAGINA ? i - (ate - POR_PAGINA) : undefined}
              />
            </li>
          ))}
        </ul>
      )}

      {restantes > 0 && (
        <div className="mt-14 text-center">
          <Link
            href={`/imoveis${toQuery(filtros, { ate: ate + POR_PAGINA })}`}
            scroll={false}
            className="border-ink hover:bg-paper-deep inline-flex h-12 items-center rounded-md border px-8 font-medium transition-colors"
          >
            Carregar mais ({restantes})
          </Link>
        </div>
      )}
    </div>
  );
}
