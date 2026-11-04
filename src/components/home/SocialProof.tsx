import { depoimentos, indicadores } from "@/data/prova-social";
import { DepoimentosCarrossel } from "./DepoimentosCarrossel";

/**
 * Faixa de depoimentos em largura total, fundo azul-noite, tudo centralizado.
 * Só renderiza com dados reais (src/data/prova-social.ts). Vazio = seção omitida.
 */
export function SocialProof() {
  if (depoimentos.length === 0 && indicadores.length === 0) return null;
  return (
    <section aria-labelledby="prova-social" className="on-dark bg-ink text-paper">
      <div className="page-width mx-auto max-w-5xl py-20 text-center md:py-28">
        <h2
          id="prova-social"
          className="text-mist text-xs font-medium tracking-[0.3em] uppercase md:text-sm"
        >
          O que dizem os clientes
        </h2>

        {depoimentos.length > 0 && (
          <div className="mt-10 md:mt-14">
            <DepoimentosCarrossel itens={depoimentos} />
          </div>
        )}

        {indicadores.length > 0 && (
          <dl className="border-ink-soft mt-16 grid gap-8 border-t pt-10 sm:grid-cols-3">
            {indicadores.map((i) => (
              <div key={i.rotulo}>
                <dd className="font-display text-bronze text-5xl font-light">
                  {i.valor.toLocaleString("pt-BR")}
                  {i.sufixo}
                </dd>
                <dt className="text-mist mt-2 text-sm tracking-wide">{i.rotulo}</dt>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}