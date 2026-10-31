import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { getLancamentos } from "@/lib/data";
import { rotulosStatusLancamento } from "@/lib/format";
import type { StatusLancamento } from "@/types";
import { LancamentoCard } from "@/components/property/LancamentoCard";
import { VipList } from "@/components/forms/VipList";

export const metadata: Metadata = {
  title: `Lançamentos em ${siteConfig.regiao}`,
  description: `Empreendimentos em lançamento, em obras e prontos para morar em ${siteConfig.regiao}. Receba tabela e condições com o corretor.`,
  alternates: { canonical: "/lancamentos" },
};

export default async function LancamentosPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const bruto = Array.isArray(sp.status) ? sp.status[0] : sp.status;
  const status =
    bruto && bruto in rotulosStatusLancamento ? (bruto as StatusLancamento) : undefined;

  const todos = await getLancamentos();
  const lista = status ? todos.filter((l) => l.status === status) : todos;
  const presentes = (Object.keys(rotulosStatusLancamento) as StatusLancamento[]).filter(
    (s) => todos.some((l) => l.status === s),
  );

  const chip = (ativo: boolean) =>
    `inline-flex h-11 items-center rounded-full border px-5 text-sm font-medium transition-colors ${
      ativo ? "bg-ink text-paper border-ink" : "border-line hover:bg-paper-deep"
    }`;

  return (
    <>
      <div className="page-width py-12 md:py-20">
        <h1 className="font-display max-w-3xl text-4xl leading-tight font-medium tracking-tight md:text-6xl">
          Lançamentos em {siteConfig.regiao}
        </h1>
        <p className="text-stone mt-4 max-w-xl text-lg">
          Da planta à entrega das chaves, com tabela, plantas e condições atualizadas
          direto com o corretor.
        </p>

        {presentes.length > 1 && (
          <nav aria-label="Filtrar por status" className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/lancamentos"
              aria-current={!status ? "page" : undefined}
              className={chip(!status)}
            >
              Todos
            </Link>
            {presentes.map((s) => (
              <Link
                key={s}
                href={`/lancamentos?status=${s}`}
                aria-current={status === s ? "page" : undefined}
                className={chip(status === s)}
              >
                {rotulosStatusLancamento[s]}
              </Link>
            ))}
          </nav>
        )}

        {lista.length === 0 ? (
          <p className="text-stone mt-12">
            Nenhum empreendimento nesta categoria no momento.
          </p>
        ) : (
          <ul className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {lista.map((l) => (
              <li key={l.slug}>
                <LancamentoCard lancamento={l} />
              </li>
            ))}
          </ul>
        )}
      </div>
      <VipList />
    </>
  );
}
