import type { Lancamento } from "@/types";

/** EMPREENDIMENTOS DE EXEMPLO (isDemo). Mesma regra de imoveis.ts. */
const base = { cidade: "Cidade Exemplo", isDemo: true } as const;

export const lancamentos: Lancamento[] = [
  {
    ...base,
    slug: "residencial-exemplo-um",
    nome: "Residencial Exemplo Um",
    construtora: "Construtora Exemplo",
    status: "lancamento",
    bairro: "Jardim das Acácias",
    entrega: "2029-06",
    aPartirDe: 520000,
    tipologias: [
      { nome: "2 quartos", area: 62, quartos: 2, vagas: 1, aPartirDe: 520000 },
      { nome: "3 quartos", area: 88, quartos: 3, vagas: 2, aPartirDe: 690000 },
    ],
    plantas: [{ alt: "Planta do apartamento de 2 quartos (ilustração)", tom: 1 }],
    fotos: [{ alt: "Fachada do empreendimento (ilustração)", tom: 1 }],
    diferenciais: ["Localização central", "Vista permanente"],
    lazer: ["Piscina", "Academia", "Salão de festas"],
    etapasObra: [
      { titulo: "Fundação", progresso: 0, concluida: false },
      { titulo: "Estrutura", progresso: 0, concluida: false },
      { titulo: "Acabamento", progresso: 0, concluida: false },
    ],
    descricao: "Texto de exemplo. Substitua pela descrição real do empreendimento.",
    destaque: true,
  },
  {
    ...base,
    slug: "residencial-exemplo-dois",
    nome: "Residencial Exemplo Dois",
    construtora: "Construtora Exemplo",
    status: "em-obras",
    bairro: "Parque Azul",
    entrega: "2027-12",
    aPartirDe: 610000,
    tipologias: [
      { nome: "3 quartos", area: 92, quartos: 3, vagas: 2, aPartirDe: 610000 },
    ],
    plantas: [{ alt: "Planta do apartamento de 3 quartos (ilustração)", tom: 2 }],
    fotos: [{ alt: "Fachada do empreendimento (ilustração)", tom: 2 }],
    diferenciais: ["Perto do parque", "Entrega prevista"],
    lazer: ["Playground", "Espaço gourmet"],
    etapasObra: [
      { titulo: "Fundação", progresso: 100, concluida: true },
      { titulo: "Estrutura", progresso: 60, concluida: false },
      { titulo: "Acabamento", progresso: 0, concluida: false },
    ],
    descricao: "Texto de exemplo. Substitua pela descrição real do empreendimento.",
    destaque: true,
  },
  {
    ...base,
    slug: "residencial-exemplo-tres",
    nome: "Residencial Exemplo Três",
    construtora: "Outra Construtora Exemplo",
    status: "em-breve",
    bairro: "Centro",
    entrega: "2030-03",
    tipologias: [{ nome: "Studio", area: 34, quartos: 1, vagas: 1 }],
    plantas: [{ alt: "Planta do studio (ilustração)", tom: 3 }],
    fotos: [{ alt: "Fachada do empreendimento (ilustração)", tom: 3 }],
    diferenciais: ["Ideal para investir ou morar"],
    lazer: ["Rooftop", "Lavanderia coletiva"],
    etapasObra: [],
    descricao: "Texto de exemplo. Substitua pela descrição real do empreendimento.",
  },
];
