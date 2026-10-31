import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { LeadForm } from "@/components/forms/LeadForm";

export const metadata: Metadata = {
  title: "Venda seu imóvel com avaliação gratuita",
  description: `Quer vender seu imóvel em ${siteConfig.regiao}? Peça uma avaliação gratuita e conte com acompanhamento do corretor em todas as etapas.`,
  alternates: { canonical: "/vender-seu-imovel" },
};

const beneficios = [
  {
    t: "Avaliação baseada no mercado",
    d: "Analisamos imóveis comparáveis da região para indicar uma faixa de preço realista, sem promessa de valor.",
  },
  {
    t: "Atendimento direto",
    d: "Você fala com o próprio corretor, do primeiro contato à assinatura.",
  },
  {
    t: "Divulgação cuidadosa",
    d: "Fotos, descrição e apresentação pensadas para atrair compradores qualificados.",
  },
  {
    t: "Segurança na negociação",
    d: "Acompanhamos propostas, documentação e escritura para você vender com tranquilidade.",
  },
];

const etapas = [
  "Você envia os dados do imóvel pelo formulário.",
  "O Cleiton entra em contato e agenda a avaliação.",
  "Definimos juntos o preço e a estratégia de divulgação.",
  "Visitas e propostas são conduzidas com você.",
  "Acompanhamos documentação, escritura e entrega das chaves.",
];

export default function VenderPage() {
  return (
    <>
      <section className="on-dark bg-ink text-paper">
        <div className="page-width py-16 md:py-24">
          <h1 className="font-display max-w-3xl text-4xl leading-tight font-medium tracking-tight md:text-6xl">
            Quer vender seu imóvel? Comece com uma avaliação gratuita.
          </h1>
          <p className="text-mist mt-5 max-w-xl text-lg">
            Sem compromisso. Você descobre quanto o mercado está pagando por imóveis como
            o seu.
          </p>
        </div>
      </section>

      <div className="page-width grid gap-14 py-16 md:py-24 lg:grid-cols-[1fr_28rem] lg:gap-20">
        <div className="space-y-16">
          <section aria-labelledby="beneficios">
            <h2 id="beneficios" className="font-display text-3xl">
              Por que vender com o Cleiton
            </h2>
            <ul className="mt-8 grid gap-8 sm:grid-cols-2">
              {beneficios.map((b) => (
                <li key={b.t} className="border-line border-t pt-4">
                  <h3 className="font-display text-xl">{b.t}</h3>
                  <p className="text-stone mt-2">{b.d}</p>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="processo">
            <h2 id="processo" className="font-display text-3xl">
              Como é o processo
            </h2>
            <ol className="mt-8 space-y-5">
              {etapas.map((e, i) => (
                <li key={e} className="flex gap-4">
                  <span className="border-bronze-deep text-bronze-deep flex size-9 shrink-0 items-center justify-center rounded-full border text-sm font-semibold">
                    {i + 1}
                  </span>
                  <span className="pt-1">{e}</span>
                </li>
              ))}
            </ol>
            <p className="text-stone mt-8 max-w-xl text-sm">
              A avaliação é uma estimativa de mercado e não garante o valor final de
              venda, que depende da negociação.
            </p>
          </section>
        </div>

        <aside
          id="avaliacao"
          aria-label="Formulário de avaliação gratuita"
          className="lg:sticky lg:top-24 lg:self-start"
        >
          <div className="border-line rounded-lg border p-6">
            <LeadForm
              tipo="avaliacao"
              titulo="Avaliação gratuita"
              descricao="Conte um pouco sobre o seu imóvel."
            />
          </div>
        </aside>
      </div>
    </>
  );
}
