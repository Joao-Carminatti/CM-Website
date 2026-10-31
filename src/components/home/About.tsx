import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Monogram } from "@/components/ui/Monogram";

const diferenciais = [
  "Atendimento direto com o corretor, sem intermediários",
  "Acompanhamento da primeira conversa até a escritura",
  "Clareza sobre valores, prazos e condições em cada etapa",
];

export function About() {
  return (
    <section aria-labelledby="sobre" className="on-dark bg-ink text-paper">
      <div className="page-width grid items-center gap-12 py-20 md:grid-cols-[0.8fr_1.2fr] md:gap-20 md:py-28">
        {/* Placeholder da foto: substituir por <Image> quando houver foto */}
        <div
          role="img"
          aria-label="Espaço reservado para a foto do corretor Cleiton Molon"
          className="from-ink-soft to-ink border-ink-soft text-bronze flex aspect-[4/5] items-center justify-center rounded-lg border bg-gradient-to-b"
        >
          <Monogram className="size-24 opacity-60" />
        </div>
        <div>
          <h2
            id="sobre"
            className="font-display text-3xl leading-tight font-medium md:text-5xl"
          >
            {siteConfig.nome}, {siteConfig.cargo.toLowerCase()}
          </h2>
          <p className="text-mist mt-5 text-lg">
            [BIO DO CLEITON: 2 a 3 frases sobre trajetória e forma de trabalhar]
          </p>
          <p className="mt-4">
            <span className="text-mist">CRECI </span>
            <strong>{siteConfig.creci}</strong>
          </p>
          <ul className="mt-8 space-y-3">
            {diferenciais.map((d) => (
              <li
                key={d}
                className="border-ink-soft border-l-2 border-l-[var(--color-bronze)] pl-4"
              >
                {d}
              </li>
            ))}
          </ul>
          <Link
            href="/sobre"
            className="text-bronze mt-8 inline-block underline underline-offset-4"
          >
            Conheça melhor o trabalho
          </Link>
        </div>
      </div>
    </section>
  );
}
