import { depoimentos, indicadores } from "@/data/prova-social";
import { SectionHeading } from "./SectionHeading";

/** Só renderiza com dados reais (src/data/prova-social.ts). Vazio = seção omitida. */
export function SocialProof() {
  if (depoimentos.length === 0 && indicadores.length === 0) return null;
  return (
    <section aria-labelledby="prova-social" className="page-width py-20 md:py-28">
      <SectionHeading id="prova-social" title="O que dizem os clientes" />
      {indicadores.length > 0 && (
        <dl className="mt-10 grid gap-8 sm:grid-cols-3">
          {indicadores.map((i) => (
            <div key={i.rotulo}>
              <dt className="text-stone">{i.rotulo}</dt>
              <dd className="font-display text-4xl">
                {i.valor.toLocaleString("pt-BR")}
                {i.sufixo}
              </dd>
            </div>
          ))}
        </dl>
      )}
      {depoimentos.length > 0 && (
        <ul className="mt-12 grid gap-10 md:grid-cols-2">
          {depoimentos.map((d) => (
            <li key={d.nome}>
              <blockquote className="font-display text-xl leading-relaxed">
                “{d.texto}”
              </blockquote>
              <p className="mt-4 font-medium">{d.nome}</p>
              {d.contexto && <p className="text-stone text-sm">{d.contexto}</p>}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
