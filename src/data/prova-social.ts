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
    nome: "Sibelle Della Costa",
    texto:
      "Mais do que intermediar a negociação, esteve verdadeiramente envolvido em cada etapa. Sua comunicação é impecável, sempre clara, ágil e transparente. Transmitiu confiança, segurança e tranquilidade durante todo o processo. Recomendo de olhos fechados!",
    destaque: "clara, ágil e transparente",
    contexto: "Vendeu um apartamento na praia",
  },
  {
    nome: "Bernardo Comandulle",
    texto:
      "O Cleiton demonstra um conhecimento muito acima da média sobre o mercado e as regiões em que atua. Apresentou diversas opções até encontrarmos o imóvel ideal, que se encaixava perfeitamente no meu orçamento e nas minhas expectativas. Já tenho meu corretor de confiança em Santa Catarina!",
    destaque: "conhecimento muito acima da média",
    contexto: "Investiu em um imóvel",
  },
  {
    nome: "Bibiana Marczyk dos Santos",
    texto:
      "Cleiton foi incansável em nos ajudar a encontrar um novo projeto que nos encantou ainda mais e, com muito trabalho, conseguiu exatamente o apto que gostamos. Quando as adversidades aparecem é que realmente conhecemos o bom profissional.",
    destaque: "incansável",
    contexto: "Comprou um apartamento em novo empreendimento",
  },
];
export const indicadores: Indicador[] = [];
