import Link from "next/link";

export function SellBanner() {
  return (
    <section aria-labelledby="vender" className="page-width py-8">
      <div className="on-dark bg-ink-soft text-paper flex flex-col gap-8 rounded-lg p-8 md:flex-row md:items-center md:justify-between md:p-14">
        <div className="max-w-xl">
          <h2
            id="vender"
            className="font-display text-3xl leading-tight font-medium md:text-4xl"
          >
            Quer vender seu imóvel? Peça uma avaliação gratuita.
          </h2>
          <p className="text-mist mt-3">
            Você recebe uma análise do valor de mercado e um plano de venda, sem
            compromisso.
          </p>
        </div>
        <Link
          href="/vender-seu-imovel"
          className="bg-bronze text-ink hover:bg-paper inline-flex h-12 shrink-0 items-center justify-center rounded-md px-7 font-semibold transition-colors"
        >
          Solicitar avaliação
        </Link>
      </div>
    </section>
  );
}
