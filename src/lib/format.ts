import type { Tipologia } from "@/types";
const brl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

export const formatPreco = (valor: number) => brl.format(valor);
export const formatArea = (m2: number) => `${m2.toLocaleString("pt-BR")} m²`;

/** Linha-resumo de uma tipologia: metragem · quartos · vagas · detalhes. Só o que existir. */
export function resumoTipologia(t: Tipologia): string {
  const partes: string[] = [];
  if (t.area !== undefined) {
    partes.push(
      Array.isArray(t.area)
        ? `${t.area[0].toLocaleString("pt-BR")} a ${t.area[1].toLocaleString("pt-BR")} m²`
        : formatArea(t.area),
    );
  }
  if (t.quartos !== undefined)
    partes.push(`${t.quartos} ${t.quartos === 1 ? "quarto" : "quartos"}`);
  if (t.vagas !== undefined) partes.push(`${t.vagas} ${t.vagas === 1 ? "vaga" : "vagas"}`);
  if (t.detalhes) partes.push(...t.detalhes);
  return partes.join(" · ");
}

export const rotulosTipo = {
  apartamento: "Apartamento",
  casa: "Casa",
  cobertura: "Cobertura",
  terreno: "Terreno",
  comercial: "Comercial",
} as const;

export const rotulosStatusLancamento = {
  "em-breve": "Em breve",
  lancamento: "Lançamento",
  "em-obras": "Em obras",
  pronto: "Pronto para morar",
} as const;

/** "2028-12" -> "dez. de 2028" */
export function formatEntrega(anoMes: string): string {
  const [ano, mes] = anoMes.split("-").map(Number);
  return new Date(ano, (mes ?? 1) - 1, 1).toLocaleDateString("pt-BR", {
    month: "short",
    year: "numeric",
  });
}
