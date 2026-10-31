/**
 * Regras dos formulários de lead. Módulo isomórfico: o cliente usa para montar
 * os campos e o servidor usa para validar de novo (nunca confie só no cliente).
 */
export type LeadTipo = "interesse" | "tabela" | "avaliacao" | "vip" | "contato";

export interface CampoExtra {
  name: string;
  label: string;
  type: "text" | "number" | "select";
  options?: { value: string; label: string }[];
  required?: boolean;
  placeholder?: string;
}

interface ConfigLead {
  /** Texto usado na mensagem de WhatsApp e no payload do webhook */
  assunto: string;
  botao: string;
  mensagem: { mostrar: boolean; rotulo: string };
  emailObrigatorio: boolean;
  campos: CampoExtra[];
}

export const leadConfig: Record<LeadTipo, ConfigLead> = {
  interesse: {
    assunto: "Interesse em imóvel",
    botao: "Enviar interesse",
    mensagem: { mostrar: true, rotulo: "Mensagem (opcional)" },
    emailObrigatorio: false,
    campos: [],
  },
  tabela: {
    assunto: "Tabela e condições de lançamento",
    botao: "Receber tabela e condições",
    mensagem: { mostrar: false, rotulo: "" },
    emailObrigatorio: false,
    campos: [],
  },
  avaliacao: {
    assunto: "Avaliação gratuita de imóvel",
    botao: "Solicitar avaliação gratuita",
    mensagem: { mostrar: true, rotulo: "Algo mais que devemos saber? (opcional)" },
    emailObrigatorio: false,
    campos: [
      {
        name: "tipoImovel",
        label: "Tipo do imóvel",
        type: "select",
        required: true,
        options: [
          { value: "Apartamento", label: "Apartamento" },
          { value: "Casa", label: "Casa" },
          { value: "Cobertura", label: "Cobertura" },
          { value: "Terreno", label: "Terreno" },
          { value: "Comercial", label: "Comercial" },
        ],
      },
      { name: "bairro", label: "Bairro", type: "text", required: true },
      { name: "metragem", label: "Metragem (m²)", type: "number", required: true },
      {
        name: "expectativa",
        label: "Expectativa de valor (R$)",
        type: "text",
        placeholder: "Opcional",
      },
    ],
  },
  vip: {
    assunto: "Lista VIP de lançamentos",
    botao: "Entrar na Lista VIP",
    mensagem: { mostrar: false, rotulo: "" },
    emailObrigatorio: false,
    campos: [
      {
        name: "canal",
        label: "Como prefere receber?",
        type: "select",
        required: true,
        options: [
          { value: "WhatsApp", label: "WhatsApp" },
          { value: "E-mail", label: "E-mail" },
        ],
      },
    ],
  },
  contato: {
    assunto: "Contato pelo site",
    botao: "Enviar mensagem",
    mensagem: { mostrar: true, rotulo: "Como podemos ajudar?" },
    emailObrigatorio: false,
    campos: [],
  },
};

export type Valores = Record<string, string>;

export type LeadEstado =
  | { status: "idle" }
  | { status: "erro"; erros: Record<string, string>; valores: Valores }
  | { status: "sucesso"; mensagem: string }
  | { status: "fallback"; mensagem: string; whatsappHref: string };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const limpar = (v: string | undefined, max = 600) => (v ?? "").trim().slice(0, max);

export function validarLead(
  tipo: LeadTipo,
  bruto: Valores,
): { ok: true; dados: Valores } | { ok: false; erros: Record<string, string> } {
  const cfg = leadConfig[tipo];
  const dados: Valores = {};
  const erros: Record<string, string> = {};

  dados.nome = limpar(bruto.nome, 120);
  if (dados.nome.length < 2) erros.nome = "Informe seu nome.";

  dados.telefone = limpar(bruto.telefone, 30);
  const digitos = dados.telefone.replace(/\D/g, "");
  if (digitos.length < 10 || digitos.length > 13)
    erros.telefone = "Informe um WhatsApp com DDD.";

  dados.email = limpar(bruto.email, 160);
  if (dados.email ? !EMAIL.test(dados.email) : cfg.emailObrigatorio) {
    erros.email = "Informe um e-mail válido.";
  }

  if (cfg.mensagem.mostrar) dados.mensagem = limpar(bruto.mensagem, 1000);

  for (const c of cfg.campos) {
    const v = limpar(bruto[c.name], 120);
    dados[c.name] = v;
    if (c.required && !v) erros[c.name] = `Preencha: ${c.label.toLowerCase()}.`;
    if (c.type === "select" && v && !c.options?.some((o) => o.value === v))
      erros[c.name] = "Escolha uma opção.";
    if (c.type === "number" && v && !(Number(v) > 0))
      erros[c.name] = "Informe um número válido.";
  }

  if (bruto.consentimento !== "on")
    erros.consentimento = "É preciso concordar com a Política de Privacidade.";

  return Object.keys(erros).length ? { ok: false, erros } : { ok: true, dados };
}

/** Mensagem de WhatsApp montada com os dados do formulário (usada no fallback). */
export function montarMensagemWhatsApp(
  tipo: LeadTipo,
  dados: Valores,
  contexto: { nome?: string; codigo?: string },
): string {
  const cfg = leadConfig[tipo];
  const linhas = [`Olá, Cleiton! Sou ${dados.nome}. Assunto: ${cfg.assunto}.`];
  if (contexto.nome) linhas.push(`Referência: ${contexto.nome}`);
  if (contexto.codigo) linhas.push(`Código: ${contexto.codigo}`);
  for (const c of cfg.campos)
    if (dados[c.name]) linhas.push(`${c.label}: ${dados[c.name]}`);
  if (dados.mensagem) linhas.push(dados.mensagem);
  linhas.push(`Meu WhatsApp: ${dados.telefone}`);
  return linhas.join("\n");
}
