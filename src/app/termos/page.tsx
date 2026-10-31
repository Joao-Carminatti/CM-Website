import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: `Condições de uso do site de ${siteConfig.nome}, ${siteConfig.cargo.toLowerCase()}.`,
  alternates: { canonical: "/termos" },
};

export default function TermosPage() {
  return (
    <LegalPage titulo="Termos de Uso" atualizado="[DATA DA PUBLICAÇÃO]">
      <section>
        <h2>1. Sobre o site</h2>
        <p>
          Este site apresenta imóveis à venda e lançamentos intermediados por{" "}
          {siteConfig.nome}, {siteConfig.cargo.toLowerCase()}, CRECI {siteConfig.creci}.
          Ao usá-lo, você concorda com estes termos.
        </p>
      </section>
      <section>
        <h2>2. Informações dos imóveis</h2>
        <ul>
          <li>
            Valores, metragens, disponibilidade e condições podem sofrer alteração sem
            aviso prévio.
          </li>
          <li>
            Imagens, plantas e perspectivas são ilustrativas e podem diferir do imóvel
            entregue.
          </li>
          <li>
            Anúncios não constituem proposta vinculante. A venda depende de negociação,
            análise documental e contrato.
          </li>
          <li>
            A localização exibida é aproximada. O endereço exato é informado na visita.
          </li>
        </ul>
      </section>
      <section>
        <h2>3. Simulações</h2>
        <p>
          O simulador de financiamento fornece apenas uma estimativa educativa. Não é
          oferta, aprovação nem promessa de crédito. Taxas, prazos, seguros e condições
          dependem da análise da instituição financeira.
        </p>
      </section>
      <section>
        <h2>4. Sem promessa de resultado</h2>
        <p>
          Nada neste site garante valorização, rentabilidade ou prazo de venda de qualquer
          imóvel.
        </p>
      </section>
      <section>
        <h2>5. Propriedade intelectual</h2>
        <p>
          Textos, marca, layout e imagens deste site pertencem aos seus titulares e não
          podem ser reproduzidos sem autorização.
        </p>
      </section>
      <section>
        <h2>6. Links e serviços de terceiros</h2>
        <p>
          O site pode conter links e conteúdos de terceiros (como mapas, vídeos e
          WhatsApp), regidos pelos termos e políticas desses serviços.
        </p>
      </section>
      <section>
        <h2>7. Privacidade</h2>
        <p>
          O tratamento de dados pessoais está descrito na{" "}
          <Link href="/politica-de-privacidade" className="underline underline-offset-4">
            Política de Privacidade
          </Link>
          .
        </p>
      </section>
      <section>
        <h2>8. Foro e legislação</h2>
        <p>
          Estes termos seguem a legislação brasileira. Fica eleito o foro da comarca de{" "}
          {siteConfig.regiao}. [REVISAR COM ADVOGADO]
        </p>
      </section>
    </LegalPage>
  );
}
