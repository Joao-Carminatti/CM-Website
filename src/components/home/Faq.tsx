import { SectionHeading } from "./SectionHeading";

const perguntas = [
  {
    p: "Como funciona o financiamento imobiliário?",
    r: "Um banco financia parte do valor do imóvel, e você paga em parcelas. O percentual financiado, o prazo e a taxa dependem do banco, da sua renda e do imóvel. Fazemos uma simulação estimada junto com você, mas a aprovação e as condições finais são sempre do banco.",
  },
  {
    p: "Quanto preciso ter de entrada?",
    r: "Depende da modalidade e do banco. Em geral, a entrada cobre a diferença entre o valor financiado e o preço do imóvel. Na conversa inicial avaliamos o seu caso para indicar um caminho realista.",
  },
  {
    p: "Posso usar o FGTS na compra?",
    r: "Em muitos casos, sim, desde que o seu perfil e o imóvel atendam às regras do programa de financiamento. Confirmamos a sua elegibilidade durante a simulação.",
  },
  {
    p: "Quais documentos são necessários?",
    r: "Para você, costumam ser documentos pessoais, comprovante de renda e de residência. Sobre o imóvel, a matrícula atualizada e certidões. Acompanhamos toda a análise documental com você.",
  },
  {
    p: "O que são ITBI e registro?",
    r: "O ITBI é um imposto municipal cobrado na transferência do imóvel. O registro é feito em cartório e também tem custos. Os valores variam por município e pelo valor do imóvel, e orientamos você sobre cada um antes de fechar negócio.",
  },
  {
    p: "Como agendar uma visita?",
    r: "Pelo botão de agendamento na página do imóvel ou pelo WhatsApp. O Cleiton combina o melhor horário e acompanha a visita.",
  },
];

export function Faq() {
  return (
    <section aria-labelledby="faq" className="page-width py-20 md:py-28">
      <SectionHeading id="faq" title="Perguntas frequentes sobre comprar um imóvel" />
      <div className="border-line mt-12 max-w-3xl divide-y border-y">
        {perguntas.map((item) => (
          <details key={item.p} className="group py-5">
            <summary className="font-display flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 text-xl [&::-webkit-details-marker]:hidden">
              {item.p}
              <svg
                viewBox="0 0 20 20"
                aria-hidden="true"
                className="size-5 shrink-0 transition-transform group-open:rotate-45"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M10 3v14M3 10h14" />
              </svg>
            </summary>
            <p className="text-stone mt-3 max-w-2xl">{item.r}</p>
          </details>
        ))}
      </div>
      <p className="text-stone mt-6 max-w-3xl text-sm">
        Respostas gerais, sem caráter de aconselhamento jurídico ou financeiro. Cada caso
        tem particularidades.
      </p>
    </section>
  );
}
