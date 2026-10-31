"use server";

import { headers } from "next/headers";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import {
  leadConfig,
  montarMensagemWhatsApp,
  validarLead,
  type LeadEstado,
  type LeadTipo,
  type Valores,
} from "@/lib/lead";

/**
 * Limite simples por IP: 5 envios a cada 10 min. Em memória, por instância: em ambiente
 * serverless (Vercel) cada instância tem o seu contador, então isto reduz abuso casual,
 * mas NÃO substitui um limitador compartilhado (ex.: Upstash/Vercel KV). Veja o README.
 */
const janelas = new Map<string, number[]>();
async function limitado(): Promise<boolean> {
  let ip: string | undefined;
  try {
    ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim();
  } catch {
    return false;
  }
  if (!ip) return false;
  const agora = Date.now();
  const recentes = (janelas.get(ip) ?? []).filter((t) => agora - t < 10 * 60_000);
  if (recentes.length >= 5) return true;
  janelas.set(ip, [...recentes, agora]);
  if (janelas.size > 5000) janelas.clear();
  return false;
}

const MSG_SUCESSO = "Recebemos seus dados. O Cleiton entra em contato em breve.";

/**
 * Server Action dos formulários. Fluxo:
 * 1. honeypot (campo "website" deve vir vazio; se vier preenchido, finge sucesso);
 * 2. validação no servidor (as regras do cliente NÃO bastam);
 * 3. POST para LEAD_WEBHOOK_URL (n8n, CRM...);
 * 4. sem webhook ou com falha: devolve link de WhatsApp com a mensagem montada.
 * Nenhum dado pessoal é registrado em log.
 */
export async function enviarLead(
  _anterior: LeadEstado,
  form: FormData,
): Promise<LeadEstado> {
  const tipo = String(form.get("tipo") ?? "") as LeadTipo;
  if (!(tipo in leadConfig)) {
    return {
      status: "erro",
      erros: { geral: "Formulário inválido. Recarregue a página." },
      valores: {},
    };
  }

  if (String(form.get("website") ?? "").trim() !== "") {
    return { status: "sucesso", mensagem: MSG_SUCESSO };
  }

  const bruto: Valores = {};
  for (const [k, v] of form.entries()) if (typeof v === "string") bruto[k] = v;

  const resultado = validarLead(tipo, bruto);
  if (!resultado.ok) return { status: "erro", erros: resultado.erros, valores: bruto };

  if (await limitado()) {
    return {
      status: "erro",
      erros: {
        geral:
          "Muitas tentativas em pouco tempo. Aguarde alguns minutos ou fale pelo WhatsApp.",
      },
      valores: bruto,
    };
  }

  const contexto = {
    nome: (bruto.contextoNome ?? "").slice(0, 160) || undefined,
    codigo: (bruto.contextoCodigo ?? "").slice(0, 40) || undefined,
    slug: (bruto.contextoSlug ?? "").slice(0, 160) || undefined,
  };
  const whatsappHref = buildWhatsAppLink({
    mensagem: montarMensagemWhatsApp(tipo, resultado.dados, contexto),
  });

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (!webhook) {
    return {
      status: "fallback",
      mensagem: "Quase lá! Toque no botão abaixo para enviar seus dados pelo WhatsApp.",
      whatsappHref,
    };
  }

  try {
    const resposta = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tipo,
        assunto: leadConfig[tipo].assunto,
        dados: resultado.dados,
        contexto,
        enviadoEm: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!resposta.ok) throw new Error(`webhook ${resposta.status}`);
    return { status: "sucesso", mensagem: MSG_SUCESSO };
  } catch {
    return {
      status: "fallback",
      mensagem:
        "Não conseguimos enviar automaticamente. Continue pelo WhatsApp para falar direto com o Cleiton.",
      whatsappHref,
    };
  }
}
