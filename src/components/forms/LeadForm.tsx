"use client";

import Link from "next/link";
import { useActionState, useEffect, useId, useRef } from "react";
import { enviarLead } from "@/app/actions/lead";
import { track } from "@/lib/analytics";
import { leadConfig, type LeadEstado, type LeadTipo } from "@/lib/lead";

const inicial: LeadEstado = { status: "idle" };
const campo =
  "border-line bg-paper h-12 w-full rounded-md border px-3 text-base aria-[invalid=true]:border-red-700";

/**
 * Formulário de lead reutilizável. Os campos vêm de leadConfig[tipo].
 * Acessibilidade: labels, erros ligados por aria-describedby, resumo com role="alert"
 * que recebe foco, e mensagem de sucesso/fallback anunciada via role="status".
 */
export function LeadForm({
  tipo,
  contexto,
  titulo,
  descricao,
}: {
  tipo: LeadTipo;
  contexto?: { nome?: string; codigo?: string; slug?: string };
  titulo?: string;
  descricao?: string;
}) {
  const cfg = leadConfig[tipo];
  const id = useId();
  const [estado, acao, enviando] = useActionState(enviarLead, inicial);
  const resumo = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (estado.status === "erro") resumo.current?.focus();
    if (estado.status === "sucesso" || estado.status === "fallback")
      track("lead", { tipo });
  }, [estado, tipo]);

  const erros = estado.status === "erro" ? estado.erros : {};
  const valores = estado.status === "erro" ? estado.valores : {};
  const idErro = (n: string) => `${id}-${n}-erro`;
  const props = (n: string) => ({
    id: `${id}-${n}`,
    name: n,
    defaultValue: valores[n] ?? "",
    "aria-invalid": erros[n] ? true : undefined,
    "aria-describedby": erros[n] ? idErro(n) : undefined,
  });
  const erroDe = (n: string) =>
    erros[n] ? (
      <p id={idErro(n)} className="mt-1.5 text-sm text-red-800">
        {erros[n]}
      </p>
    ) : null;

  if (estado.status === "sucesso") {
    return (
      <div role="status" className="bg-paper-deep rounded-lg p-8">
        <h3 className="font-display text-2xl">Tudo certo!</h3>
        <p className="text-stone mt-2">{estado.mensagem}</p>
      </div>
    );
  }

  if (estado.status === "fallback") {
    return (
      <div role="status" className="bg-paper-deep rounded-lg p-8">
        <h3 className="font-display text-2xl">Falta só um passo</h3>
        <p className="text-stone mt-2">{estado.mensagem}</p>
        <a
          href={estado.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-ink text-paper hover:bg-ink-soft mt-6 inline-flex h-12 items-center rounded-md px-6 font-semibold transition-colors"
        >
          Continuar no WhatsApp
        </a>
      </div>
    );
  }

  const listaErros = Object.entries(erros);

  return (
    <form
      action={acao}
      noValidate
      aria-labelledby={titulo ? `${id}-titulo` : undefined}
      className="space-y-5"
    >
      {titulo && (
        <div>
          <h2 id={`${id}-titulo`} className="font-display text-2xl">
            {titulo}
          </h2>
          {descricao && <p className="text-stone mt-1">{descricao}</p>}
        </div>
      )}

      {listaErros.length > 0 && (
        <div
          ref={resumo}
          tabIndex={-1}
          role="alert"
          className="rounded-md border border-red-700 bg-red-50 p-4 text-red-900"
        >
          <p className="font-medium">
            Revise {listaErros.length === 1 ? "o campo abaixo" : "os campos abaixo"}:
          </p>
          <ul className="mt-1 list-disc pl-5 text-sm">
            {listaErros.map(([n, msg]) => (
              <li key={n}>{msg}</li>
            ))}
          </ul>
        </div>
      )}

      <input type="hidden" name="tipo" value={tipo} />
      {contexto?.nome && (
        <input type="hidden" name="contextoNome" value={contexto.nome} />
      )}
      {contexto?.codigo && (
        <input type="hidden" name="contextoCodigo" value={contexto.codigo} />
      )}
      {contexto?.slug && (
        <input type="hidden" name="contextoSlug" value={contexto.slug} />
      )}

      {/* Honeypot: invisível para pessoas, tentador para robôs */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${id}-website`}>Não preencha este campo</label>
        <input id={`${id}-website`} name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-nome`} className="mb-1.5 block text-sm font-medium">
            Nome
          </label>
          <input {...props("nome")} autoComplete="name" required className={campo} />
          {erroDe("nome")}
        </div>
        <div>
          <label htmlFor={`${id}-telefone`} className="mb-1.5 block text-sm font-medium">
            WhatsApp (com DDD)
          </label>
          <input
            {...props("telefone")}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            className={campo}
          />
          {erroDe("telefone")}
        </div>
        <div className={cfg.campos.length || cfg.mensagem.mostrar ? "" : "sm:col-span-2"}>
          <label htmlFor={`${id}-email`} className="mb-1.5 block text-sm font-medium">
            E-mail{cfg.emailObrigatorio ? "" : " (opcional)"}
          </label>
          <input
            {...props("email")}
            type="email"
            autoComplete="email"
            className={campo}
          />
          {erroDe("email")}
        </div>

        {cfg.campos.map((c) => (
          <div key={c.name}>
            <label
              htmlFor={`${id}-${c.name}`}
              className="mb-1.5 block text-sm font-medium"
            >
              {c.label}
            </label>
            {c.type === "select" ? (
              <select {...props(c.name)} required={c.required} className={campo}>
                <option value="">Selecione</option>
                {c.options?.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                {...props(c.name)}
                type={c.type}
                inputMode={c.type === "number" ? "numeric" : undefined}
                min={c.type === "number" ? 1 : undefined}
                placeholder={c.placeholder}
                required={c.required}
                className={campo}
              />
            )}
            {erroDe(c.name)}
          </div>
        ))}
      </div>

      {cfg.mensagem.mostrar && (
        <div>
          <label htmlFor={`${id}-mensagem`} className="mb-1.5 block text-sm font-medium">
            {cfg.mensagem.rotulo}
          </label>
          <textarea {...props("mensagem")} rows={4} className={`${campo} h-auto py-3`} />
        </div>
      )}

      <div>
        <div className="flex items-start gap-3">
          <input
            id={`${id}-consentimento`}
            name="consentimento"
            type="checkbox"
            aria-invalid={erros.consentimento ? true : undefined}
            aria-describedby={erros.consentimento ? idErro("consentimento") : undefined}
            className="accent-ink mt-1 size-5 shrink-0"
          />
          <label htmlFor={`${id}-consentimento`} className="text-sm">
            Concordo com o uso dos meus dados para contato, conforme a{" "}
            <Link
              href="/politica-de-privacidade"
              className="underline underline-offset-4"
            >
              Política de Privacidade
            </Link>
            .
          </label>
        </div>
        {erroDe("consentimento")}
      </div>

      <button
        type="submit"
        disabled={enviando}
        data-magnetic
        className="bg-ink text-paper hover:bg-ink-soft inline-flex h-12 items-center rounded-md px-8 font-semibold transition-colors disabled:opacity-60"
      >
        {enviando ? "Enviando..." : cfg.botao}
      </button>
    </form>
  );
}
