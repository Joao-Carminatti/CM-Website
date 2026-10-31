import Link from "next/link";
import type { FiltrosImoveis } from "@/lib/filtros";
import { temFiltros } from "@/lib/filtros";

const campo = "border-line bg-paper h-11 w-full rounded-md border px-3 text-base";
const rotulo = "mb-1.5 block text-sm font-medium";

const precos = [100000, 200000, 300000, 500000, 800000, 1200000, 2000000, 3000000];
const fmt = (n: number) =>
  n >= 1000000 ? `R$ ${(n / 1000000).toLocaleString("pt-BR")} mi` : `R$ ${n / 1000} mil`;

const minimos = (nome: string, id: string, atual?: number, max = 4) => (
  <select id={id} name={nome} defaultValue={atual ? String(atual) : ""} className={campo}>
    <option value="">Qualquer</option>
    {Array.from({ length: max }, (_, i) => i + 1).map((n) => (
      <option key={n} value={n}>
        {n}+
      </option>
    ))}
  </select>
);

/**
 * Filtros como formulário GET: o estado vive na URL (compartilhável, sem JS).
 * Foco e teclado funcionam nativamente porque são campos HTML padrão.
 */
export function CatalogFilters({
  filtros,
  locais,
}: {
  filtros: FiltrosImoveis;
  locais: string[];
}) {
  return (
    <form
      action="/imoveis"
      method="get"
      aria-label="Filtrar imóveis"
      className="bg-paper-deep grid gap-4 rounded-lg p-5 sm:grid-cols-2 lg:grid-cols-4"
    >
      <div>
        <label htmlFor="f-tipo" className={rotulo}>
          Tipo
        </label>
        <select
          id="f-tipo"
          name="tipo"
          defaultValue={filtros.tipo ?? ""}
          className={campo}
        >
          <option value="">Todos</option>
          <option value="apartamento">Apartamento</option>
          <option value="casa">Casa</option>
          <option value="cobertura">Cobertura</option>
          <option value="terreno">Terreno</option>
          <option value="comercial">Comercial</option>
        </select>
      </div>
      <div>
        <label htmlFor="f-local" className={rotulo}>
          Cidade ou bairro
        </label>
        <input
          id="f-local"
          name="local"
          list="f-locais"
          autoComplete="off"
          defaultValue={filtros.local ?? ""}
          className={campo}
        />
        <datalist id="f-locais">
          {locais.map((l) => (
            <option key={l} value={l} />
          ))}
        </datalist>
      </div>
      <div>
        <label htmlFor="f-pmin" className={rotulo}>
          Valor mínimo
        </label>
        <select
          id="f-pmin"
          name="precoMin"
          defaultValue={filtros.precoMin ? String(filtros.precoMin) : ""}
          className={campo}
        >
          <option value="">Sem mínimo</option>
          {precos.map((p) => (
            <option key={p} value={p}>
              {fmt(p)}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="f-pmax" className={rotulo}>
          Valor máximo
        </label>
        <select
          id="f-pmax"
          name="precoMax"
          defaultValue={filtros.precoMax ? String(filtros.precoMax) : ""}
          className={campo}
        >
          <option value="">Sem máximo</option>
          {precos.map((p) => (
            <option key={p} value={p}>
              {fmt(p)}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="f-quartos" className={rotulo}>
          Quartos
        </label>
        {minimos("quartos", "f-quartos", filtros.quartos)}
      </div>
      <div>
        <label htmlFor="f-banheiros" className={rotulo}>
          Banheiros
        </label>
        {minimos("banheiros", "f-banheiros", filtros.banheiros)}
      </div>
      <div>
        <label htmlFor="f-vagas" className={rotulo}>
          Vagas
        </label>
        {minimos("vagas", "f-vagas", filtros.vagas)}
      </div>
      <div>
        <label htmlFor="f-area" className={rotulo}>
          Área mínima (m²)
        </label>
        <input
          id="f-area"
          name="areaMin"
          type="number"
          min="0"
          inputMode="numeric"
          defaultValue={filtros.areaMin ?? ""}
          className={campo}
        />
      </div>
      <div>
        <label htmlFor="f-codigo" className={rotulo}>
          Código do imóvel
        </label>
        <input
          id="f-codigo"
          name="codigo"
          defaultValue={filtros.codigo ?? ""}
          placeholder="Ex.: EX-001"
          className={campo}
        />
      </div>
      <div>
        <label htmlFor="f-ordem" className={rotulo}>
          Ordenar por
        </label>
        <select id="f-ordem" name="ordem" defaultValue={filtros.ordem} className={campo}>
          <option value="recentes">Mais recentes</option>
          <option value="menor-preco">Menor preço</option>
          <option value="maior-preco">Maior preço</option>
        </select>
      </div>
      <div className="flex items-end gap-3 sm:col-span-2">
        <button
          type="submit"
          className="bg-ink text-paper hover:bg-ink-soft h-11 flex-1 rounded-md px-6 font-semibold transition-colors"
        >
          Aplicar filtros
        </button>
        {temFiltros(filtros) && (
          <Link
            href="/imoveis"
            className="flex h-11 items-center px-3 underline underline-offset-4"
          >
            Limpar
          </Link>
        )}
      </div>
    </form>
  );
}
