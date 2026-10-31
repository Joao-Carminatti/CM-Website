import { LeadForm } from "./LeadForm";

/** Captação "Lista VIP": lançamentos em primeira mão por WhatsApp ou e-mail. */
export function VipList() {
  return (
    <section aria-labelledby="vip" className="on-dark bg-ink text-paper">
      <div className="page-width grid gap-10 py-16 md:grid-cols-[1fr_1.2fr] md:gap-16 md:py-24">
        <div>
          <h2
            id="vip"
            className="font-display text-3xl leading-tight font-medium md:text-5xl"
          >
            Receba lançamentos em primeira mão
          </h2>
          <p className="text-mist mt-4 max-w-md text-lg">
            Entre na Lista VIP e seja avisado antes da divulgação geral. Sem spam: só
            novidades de empreendimentos.
          </p>
        </div>
        <div className="bg-paper text-ink rounded-lg p-6 md:p-8">
          <LeadForm tipo="vip" />
        </div>
      </div>
    </section>
  );
}
