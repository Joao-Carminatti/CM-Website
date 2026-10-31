/**
 * PROVA SOCIAL: só dados REAIS. Enquanto estas listas estiverem vazias,
 * a seção não aparece no site. Nunca invente depoimentos ou números.
 */
export interface Depoimento {
  nome: string;
  texto: string;
  /** ex.: "Comprou um apartamento em Bairro X" */
  contexto?: string;
}
export interface Indicador {
  valor: number;
  rotulo: string;
  sufixo?: string;
}

export const depoimentos: Depoimento[] = [];
export const indicadores: Indicador[] = [];
