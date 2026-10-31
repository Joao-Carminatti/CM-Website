import Link from "next/link";
import type { Imovel, Lancamento } from "@/types";
import { PropertyCard } from "@/components/property/PropertyCard";
import { LancamentoCard } from "@/components/property/LancamentoCard";
import { SectionHeading } from "./SectionHeading";

export function FeaturedProperties({ imoveis }: { imoveis: Imovel[] }) {
  if (imoveis.length === 0) return null;
  return (
    <section aria-labelledby="destaques" className="page-width py-20 md:py-28">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          id="destaques"
          title="Imóveis em destaque"
          intro="Seleção atual, com valores e condições confirmados com o corretor."
        />
        <Link href="/imoveis" className="font-medium underline underline-offset-4">
          Ver todos os imóveis
        </Link>
      </div>
      <ul className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {imoveis.map((imovel) => (
          <li key={imovel.codigo}>
            <PropertyCard imovel={imovel} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export function FeaturedLaunches({ lancamentos }: { lancamentos: Lancamento[] }) {
  if (lancamentos.length === 0) return null;
  return (
    <section aria-labelledby="lancamentos" className="bg-paper-deep">
      <div className="page-width py-20 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            id="lancamentos"
            title="Lançamentos"
            intro="Empreendimentos em primeira mão, da planta à entrega das chaves."
          />
          <Link href="/lancamentos" className="font-medium underline underline-offset-4">
            Ver todos os lançamentos
          </Link>
        </div>
        <ul className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {lancamentos.map((l) => (
            <li key={l.slug}>
              <LancamentoCard lancamento={l} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
