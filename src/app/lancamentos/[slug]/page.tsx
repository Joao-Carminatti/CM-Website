import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig } from "@/config/site";
import { getLancamento, getLancamentos } from "@/lib/data";
import {
  formatArea,
  formatEntrega,
  formatPreco,
  rotulosStatusLancamento,
} from "@/lib/format";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { Gallery } from "@/components/property/Gallery";
import { MapOnDemand } from "@/components/property/MapOnDemand";
import { ObraTimeline } from "@/components/property/ObraTimeline";
import { LeadForm } from "@/components/forms/LeadForm";
import { VipList } from "@/components/forms/VipList";

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getLancamentos()).map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const l = await getLancamento((await params).slug);
  if (!l) return { title: "Empreendimento não encontrado" };
  return {
    title: `${l.nome}: lançamento em ${l.bairro}`,
    description: `${rotulosStatusLancamento[l.status]} em ${l.bairro}, ${l.cidade}. Entrega prevista: ${formatEntrega(l.entrega)}. Receba tabela e condições.`,
    alternates: { canonical: `/lancamentos/${l.slug}` },
    robots: l.isDemo ? { index: false, follow: false } : undefined,
  };
}

export default async function LancamentoPage({ params }: Props) {
  const l = await getLancamento((await params).slug);
  if (!l) notFound();

  const whats = buildWhatsAppLink({
    mensagem:
      "Olá, Cleiton! Gostaria de receber a tabela e as condições deste empreendimento.",
    nome: l.nome,
  });

  return (
    <article>
      <header className="on-dark bg-ink text-paper">
        <div className="page-width py-14 md:py-20">
          <nav aria-label="Você está em" className="text-mist text-sm">
            <Link href="/lancamentos" className="underline underline-offset-4">
              Lançamentos
            </Link>
            <span aria-hidden="true"> / </span>
            <span>{l.nome}</span>
          </nav>
          <p className="text-bronze mt-8 font-medium">
            {rotulosStatusLancamento[l.status]}
            {l.isDemo && " · Empreendimento de exemplo"}
          </p>
          <h1 className="font-display mt-2 max-w-3xl text-4xl leading-tight font-medium tracking-tight md:text-6xl">
            {l.nome}
          </h1>
          <p className="text-mist mt-4 text-lg">
            {l.construtora} · {l.bairro}, {l.cidade}
          </p>
          <dl className="mt-8 flex flex-wrap gap-x-12 gap-y-4">
            <div>
              <dt className="text-mist text-sm">Entrega prevista</dt>
              <dd className="font-display text-2xl">{formatEntrega(l.entrega)}</dd>
            </div>
            <div>
              <dt className="text-mist text-sm">Valores</dt>
              <dd className="font-display text-2xl">
                {l.aPartirDe ? `A partir de ${formatPreco(l.aPartirDe)}` : "Sob consulta"}
              </dd>
            </div>
          </dl>
          <a
            href={whats}
            target="_blank"
            rel="noopener noreferrer"
            data-magnetic
            className="bg-bronze text-ink hover:bg-paper mt-8 inline-flex h-12 items-center rounded-md px-7 font-semibold transition-colors"
          >
            Chamar no WhatsApp
          </a>
        </div>
      </header>

      <div className="page-width grid gap-14 py-14 md:py-20 lg:grid-cols-[1fr_24rem] lg:gap-16">
        <div className="min-w-0 space-y-16">
          <Gallery fotos={l.fotos} codigo={`lanc-${l.slug}`} titulo={l.nome} />

          <section aria-labelledby="sobre-emp">
            <h2 id="sobre-emp" className="font-display text-2xl">
              Sobre o empreendimento
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed">{l.descricao}</p>
            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="font-medium">Diferenciais</h3>
                <ul className="mt-3 space-y-2">
                  {l.diferenciais.map((d) => (
                    <li key={d} className="border-bronze-deep border-l-2 pl-3">
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-medium">Lazer</h3>
                <ul className="mt-3 space-y-2">
                  {l.lazer.map((d) => (
                    <li key={d} className="border-bronze-deep border-l-2 pl-3">
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section aria-labelledby="tipologias">
            <h2 id="tipologias" className="font-display text-2xl">
              Tipologias e plantas
            </h2>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2">
              {l.tipologias.map((t) => (
                <li key={t.nome} className="border-line rounded-lg border p-5">
                  <h3 className="font-display text-xl">{t.nome}</h3>
                  <p className="text-stone mt-1 text-sm">
                    {formatArea(t.area)} · {t.quartos}{" "}
                    {t.quartos === 1 ? "quarto" : "quartos"} · {t.vagas}{" "}
                    {t.vagas === 1 ? "vaga" : "vagas"}
                  </p>
                  <p className="mt-3 font-medium">
                    {t.aPartirDe
                      ? `A partir de ${formatPreco(t.aPartirDe)}`
                      : "Valor sob consulta"}
                  </p>
                </li>
              ))}
            </ul>
            {l.plantas.length > 0 && (
              <div className="mt-6">
                <Gallery
                  fotos={l.plantas}
                  codigo={`planta-${l.slug}`}
                  titulo={`Plantas de ${l.nome}`}
                  prioridade={false}
                />
              </div>
            )}
          </section>

          <section aria-labelledby="obra">
            <h2 id="obra" className="font-display mb-6 text-2xl">
              Evolução da obra
            </h2>
            <ObraTimeline etapas={l.etapasObra} />
          </section>

          <section aria-labelledby="pagamento">
            <h2 id="pagamento" className="font-display text-2xl">
              Condições de pagamento
            </h2>
            <p className="mt-3 max-w-2xl text-lg">
              {l.condicoesPagamento ??
                "Sob consulta. Solicite a tabela atualizada ao lado."}
            </p>
          </section>

          <section aria-labelledby="local-emp">
            <h2 id="local-emp" className="font-display mb-5 text-2xl">
              Localização aproximada
            </h2>
            <MapOnDemand bairro={l.bairro} cidade={l.cidade} />
          </section>
        </div>

        <aside
          id="tabela"
          aria-label="Receber tabela e condições"
          className="lg:sticky lg:top-24 lg:self-start"
        >
          <div className="border-line rounded-lg border p-6">
            <LeadForm
              tipo="tabela"
              titulo="Receber tabela e condições"
              descricao="Informe seus dados e o Cleiton envia a tabela atualizada."
              contexto={{ nome: l.nome, slug: l.slug }}
            />
            <p className="text-stone mt-5 text-xs leading-relaxed">
              Valores, metragens e condições podem sofrer alteração sem aviso prévio.
              Imagens ilustrativas. CRECI {siteConfig.creci}.
            </p>
          </div>
        </aside>
      </div>
      <VipList />
    </article>
  );
}
