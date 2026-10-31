/**
 * CAMADA DE DADOS. As páginas só chamam estas funções.
 * Para migrar para CMS/banco (Sanity, Supabase...), reescreva apenas o
 * corpo delas: a assinatura (async + tipos) permanece a mesma.
 */
import { siteConfig } from "@/config/site";
import { imoveis } from "@/data/imoveis";
import { lancamentos } from "@/data/lancamentos";
import type { Imovel, Lancamento } from "@/types";
import type { FiltrosImoveis } from "@/lib/filtros";

const norm = (t: string) =>
  t
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

const visivel = <T extends { isDemo?: boolean }>(item: T) =>
  siteConfig.mostrarExemplos || !item.isDemo;

interface OpcoesImoveis {
  destaque?: boolean;
  limite?: number;
  filtros?: Partial<FiltrosImoveis>;
}

function aplicarFiltros(lista: Imovel[], f: Partial<FiltrosImoveis>): Imovel[] {
  const local = f.local ? norm(f.local) : undefined;
  const codigo = f.codigo ? norm(f.codigo) : undefined;
  const filtrada = lista.filter(
    (i) =>
      (!f.tipo || i.tipo === f.tipo) &&
      (!local || norm(i.bairro).includes(local) || norm(i.cidade).includes(local)) &&
      (!f.precoMin || i.preco >= f.precoMin) &&
      (!f.precoMax || i.preco <= f.precoMax) &&
      (!f.quartos || i.quartos >= f.quartos) &&
      (!f.banheiros || i.banheiros >= f.banheiros) &&
      (!f.vagas || i.vagas >= f.vagas) &&
      (!f.areaMin || i.area >= f.areaMin) &&
      (!codigo || norm(i.codigo).includes(codigo)),
  );
  if (f.ordem === "menor-preco") return filtrada.sort((a, b) => a.preco - b.preco);
  if (f.ordem === "maior-preco") return filtrada.sort((a, b) => b.preco - a.preco);
  return filtrada;
}

export async function getImoveis(opcoes: OpcoesImoveis = {}): Promise<Imovel[]> {
  let lista = imoveis.filter(visivel).sort((a, b) => b.data.localeCompare(a.data));
  if (opcoes.destaque) lista = lista.filter((i) => i.destaque);
  if (opcoes.filtros) lista = aplicarFiltros(lista, opcoes.filtros);
  return opcoes.limite ? lista.slice(0, opcoes.limite) : lista;
}

/** Imóveis parecidos: mesmo tipo ou mesmo bairro, exceto o próprio. */
export async function getImoveisSemelhantes(
  imovel: Imovel,
  limite = 3,
): Promise<Imovel[]> {
  const todos = await getImoveis();
  return todos
    .filter((i) => i.slug !== imovel.slug && i.status !== "vendido")
    .map((i) => ({
      i,
      pontos: Number(i.tipo === imovel.tipo) + Number(i.bairro === imovel.bairro),
    }))
    .filter((x) => x.pontos > 0)
    .sort((a, b) => b.pontos - a.pontos)
    .slice(0, limite)
    .map((x) => x.i);
}

export async function getImovel(slug: string): Promise<Imovel | undefined> {
  return imoveis.filter(visivel).find((i) => i.slug === slug);
}

export async function getLancamentos(
  opcoes: Pick<OpcoesImoveis, "destaque" | "limite"> = {},
): Promise<Lancamento[]> {
  let lista = lancamentos.filter(visivel);
  if (opcoes.destaque) lista = lista.filter((l) => l.destaque);
  return opcoes.limite ? lista.slice(0, opcoes.limite) : lista;
}

export async function getLancamento(slug: string): Promise<Lancamento | undefined> {
  return lancamentos.filter(visivel).find((l) => l.slug === slug);
}
