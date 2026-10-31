import type { TipoImovel } from "@/types";

export type Ordem = "recentes" | "menor-preco" | "maior-preco";

export interface FiltrosImoveis {
  tipo?: TipoImovel;
  local?: string;
  precoMin?: number;
  precoMax?: number;
  quartos?: number;
  banheiros?: number;
  vagas?: number;
  areaMin?: number;
  codigo?: string;
  ordem: Ordem;
}

type SearchParams = Record<string, string | string[] | undefined>;

const tipos: TipoImovel[] = ["apartamento", "casa", "cobertura", "terreno", "comercial"];
const ordens: Ordem[] = ["recentes", "menor-preco", "maior-preco"];

const um = (v: string | string[] | undefined) =>
  (Array.isArray(v) ? v[0] : v)?.trim() || undefined;
const num = (v: string | string[] | undefined) => {
  const n = Number(um(v));
  return Number.isFinite(n) && n > 0 ? n : undefined;
};

/** URL (searchParams) -> filtros tipados. Valores inválidos são ignorados. */
export function parseFiltros(sp: SearchParams): FiltrosImoveis {
  const tipo = um(sp.tipo) as TipoImovel | undefined;
  const ordem = um(sp.ordem) as Ordem | undefined;
  return {
    tipo: tipo && tipos.includes(tipo) ? tipo : undefined,
    local: um(sp.local),
    precoMin: num(sp.precoMin),
    precoMax: num(sp.precoMax),
    quartos: num(sp.quartos),
    banheiros: num(sp.banheiros),
    vagas: num(sp.vagas),
    areaMin: num(sp.areaMin),
    codigo: um(sp.codigo),
    ordem: ordem && ordens.includes(ordem) ? ordem : "recentes",
  };
}

/** Filtros -> query string (para links como "Carregar mais"). */
export function toQuery(
  f: FiltrosImoveis,
  extra: Record<string, string | number> = {},
): string {
  const q = new URLSearchParams();
  for (const [k, v] of Object.entries({ ...f, ...extra })) {
    if (v === undefined || v === "" || (k === "ordem" && v === "recentes")) continue;
    q.set(k, String(v));
  }
  const s = q.toString();
  return s ? `?${s}` : "";
}

export const temFiltros = (f: FiltrosImoveis) =>
  Object.entries(f).some(
    ([k, v]) => v !== undefined && !(k === "ordem" && v === "recentes"),
  );
