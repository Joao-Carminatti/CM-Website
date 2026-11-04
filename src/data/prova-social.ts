/**
 * PROVA SOCIAL: só dados REAIS. Enquanto estas listas estiverem vazias,
 * a seção não aparece no site. Nunca invente depoimentos ou números.
 */
export interface Depoimento {
  nome: string;
  texto: string;
  /** ex.: "Comprou um apartamento em Bairro X" */
  contexto?: string;
  /** Trecho do texto a destacar em bronze (opcional). Copie exatamente como está no texto. */
  destaque?: string;
}
export interface Indicador {
  valor: number;
  rotulo: string;
  sufixo?: string;
}

export const depoimentos: Depoimento[] = [
  {
    nome: "Maria S.",
    texto: "Texto do relato exatamente como o cliente autorizou.",
    contexto: "Comprou um apartamento em Bairro X",
  },
  {
    nome: "João P.",
    texto: "Outro relato.",
    contexto: "Vendeu uma casa em Bairro Y",
  },
  {
    nome: "João Little",
    texto: "Muito satisfeito com a compra da minha mansão com o cleiton, ele me ajudou em tudo e me deu ótimas dicas.",
    destaque: "ótimas dicas",
    contexto: "Comprou uma mansão no Bairro palhoça",
  },
];
export const indicadores: Indicador[] = [];
