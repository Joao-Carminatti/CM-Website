import { SectionHeading } from "./SectionHeading";

const etapas = [
  {
    titulo: "Conversa e perfil",
    texto: "Entendemos o que você procura, seu orçamento e o seu prazo.",
  },
  {
    titulo: "Seleção de imóveis",
    texto: "Você recebe só opções que fazem sentido para o seu perfil.",
  },
  {
    titulo: "Visita",
    texto: "O Cleiton acompanha cada visita e aponta o que olhar com atenção.",
  },
  {
    titulo: "Simulação de financiamento",
    texto: "Estimamos parcelas e entrada para você decidir com segurança.",
  },
  {
    titulo: "Negociação",
    texto: "Conduzimos a proposta e a contraproposta até um acordo justo.",
  },
  {
    titulo: "Documentação e escritura",
    texto: "Acompanhamos a análise documental, o registro e a entrega das chaves.",
  },
];

/**
 * Sequência real (etapas em ordem), por isso a numeração é informação.
 * A linha lateral preenche com o scroll via CSS scroll-driven animations
 * (.timeline-fill), sem JavaScript. Sem suporte: já aparece preenchida.
 */
export function ProcessTimeline() {
  return (
    <section aria-labelledby="como-funciona" className="page-width py-20 md:py-28">
      <SectionHeading
        id="como-funciona"
        title="Como funciona a compra, passo a passo"
        intro="Do primeiro contato às chaves, você sabe em que etapa está e qual é a próxima."
      />
      <ol className="relative mt-14 max-w-2xl">
        <span
          aria-hidden="true"
          className="bg-line absolute top-2 bottom-2 left-[1.0625rem] w-px"
        />
        <span
          aria-hidden="true"
          className="timeline-fill bg-bronze-deep absolute top-2 bottom-2 left-[1.0625rem] w-px"
        />
        {etapas.map((etapa, i) => (
          <li key={etapa.titulo} className="relative flex gap-6 pb-10 last:pb-0">
            <span className="bg-paper border-bronze-deep text-bronze-deep relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full border text-sm font-semibold">
              {i + 1}
            </span>
            <div className="pt-1">
              <h3 className="font-display text-xl">{etapa.titulo}</h3>
              <p className="text-stone mt-1">{etapa.texto}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
