export type TipoImovel = "apartamento" | "casa" | "cobertura" | "terreno" | "comercial";
export type StatusImovel = "disponivel" | "reservado" | "vendido";
export type Selo = "novo" | "oportunidade" | "exclusivo";
export type StatusLancamento = "em-breve" | "lancamento" | "em-obras" | "pronto";

/** Foto real (src) ou placeholder gerado em SVG (tom). Troque tom por src quando houver foto. */
export interface Foto {
  alt: string;
  src?: string;
  largura?: number;
  altura?: number;
  /** Variação do placeholder (1 a 4). Ignorado quando há src. */
  tom?: 1 | 2 | 3 | 4;
}

export interface Imovel {
  codigo: string;
  slug: string;
  titulo: string;
  tipo: TipoImovel;
  status: StatusImovel;
  selo?: Selo;
  preco: number;
  bairro: string;
  cidade: string;
  /** Área privativa em m² */
  area: number;
  quartos: number;
  banheiros: number;
  vagas: number;
  diferenciais: string[];
  fotos: Foto[];
  /** ID do vídeo no YouTube (carregado sob demanda) */
  videoYoutube?: string;
  descricao: string;
  /** ISO 8601 */
  data: string;
  destaque?: boolean;
  isDemo?: boolean;
}

export interface Tipologia {
  nome: string;
  area: number;
  quartos: number;
  vagas: number;
  aPartirDe?: number;
}

export interface EtapaObra {
  titulo: string;
  /** 0 a 100 */
  progresso: number;
  concluida: boolean;
}

export interface Lancamento {
  slug: string;
  nome: string;
  construtora: string;
  status: StatusLancamento;
  bairro: string;
  cidade: string;
  /** Previsão de entrega, ex.: "2028-12" */
  entrega: string;
  aPartirDe?: number;
  tipologias: Tipologia[];
  plantas: Foto[];
  fotos: Foto[];
  diferenciais: string[];
  lazer: string[];
  etapasObra: EtapaObra[];
  /** Sem dado = exibir "Sob consulta" */
  condicoesPagamento?: string;
  descricao: string;
  destaque?: boolean;
  isDemo?: boolean;
}
