import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig, temAnalytics } from "@/config/site";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: `Como ${siteConfig.nome} coleta, usa e protege os seus dados pessoais, conforme a LGPD.`,
  alternates: { canonical: "/politica-de-privacidade" },
};

export default function PrivacidadePage() {
  return (
    <LegalPage titulo="Política de Privacidade" atualizado="[DATA DA PUBLICAÇÃO]">
      <section>
        <h2>1. Quem somos</h2>
        <p>
          Este site é operado por {siteConfig.nome}, {siteConfig.cargo.toLowerCase()},
          CRECI {siteConfig.creci}, que atua como controlador dos dados pessoais tratados
          aqui, nos termos da Lei Geral de Proteção de Dados (Lei nº 13.709/2018, LGPD).
          Contato para assuntos de privacidade: {siteConfig.email}.
        </p>
      </section>
      <section>
        <h2>2. Dados que coletamos</h2>
        <ul>
          <li>
            <strong>Informados por você nos formulários:</strong> nome, telefone/WhatsApp,
            e-mail, mensagem e, quando aplicável, dados do imóvel (tipo, bairro, metragem
            e expectativa de valor).
          </li>
          <li>
            <strong>Armazenados no seu navegador:</strong> lista de imóveis favoritos e a
            sua escolha sobre cookies. Ficam apenas no seu dispositivo.
          </li>
          {temAnalytics && (
            <li>
              <strong>Dados de navegação (somente com seu consentimento):</strong> páginas
              visitadas, cliques em botões de contato e informações técnicas do
              dispositivo, coletados por ferramentas de análise e publicidade.
            </li>
          )}
        </ul>
      </section>
      <section>
        <h2>3. Para que usamos</h2>
        <ul>
          <li>
            Responder a pedidos de contato, visita, avaliação e envio de tabelas e
            condições.
          </li>
          <li>Enviar lançamentos em primeira mão, quando você entra na Lista VIP.</li>
          <li>
            Melhorar o site e o atendimento, com base em estatísticas de uso (apenas com
            consentimento).
          </li>
        </ul>
      </section>
      <section>
        <h2>4. Bases legais</h2>
        <p>
          Tratamos seus dados com base no seu consentimento, na execução de procedimentos
          preliminares relacionados a uma possível compra, venda ou avaliação de imóvel a
          seu pedido, e no legítimo interesse de responder às suas solicitações. [REVISAR
          COM ADVOGADO]
        </p>
      </section>
      <section>
        <h2>5. Compartilhamento</h2>
        <p>
          Seus dados podem ser tratados por prestadores que viabilizam o serviço:
          hospedagem do site, ferramentas de automação e de gestão de contatos (CRM), o
          WhatsApp, quando você escolhe conversar por ele, e ferramentas de análise, se
          você consentir. Também podem ser compartilhados com construtoras, incorporadoras
          e instituições financeiras quando necessário para atender ao seu pedido, sempre
          com a sua ciência. Não vendemos dados pessoais.
        </p>
      </section>
      <section>
        <h2>6. Por quanto tempo guardamos</h2>
        <p>
          Mantemos seus dados pelo tempo necessário para atender à sua solicitação e
          cumprir obrigações legais. [DEFINIR PRAZO DE RETENÇÃO]
        </p>
      </section>
      <section>
        <h2>7. Seus direitos</h2>
        <p>
          Você pode solicitar confirmação de tratamento, acesso, correção, anonimização,
          portabilidade, eliminação dos dados tratados com consentimento, informação sobre
          compartilhamentos e revogação do consentimento, a qualquer momento, pelo e-mail{" "}
          {siteConfig.email}. Você também pode reclamar à Autoridade Nacional de Proteção
          de Dados (ANPD).
        </p>
      </section>
      <section>
        <h2>8. Cookies</h2>
        <p>
          {temAnalytics
            ? "Cookies de medição só são ativados depois que você aceita no aviso exibido no site. Você pode mudar a escolha a qualquer momento em “Preferências de cookies”, no rodapé."
            : "Atualmente este site não utiliza cookies de medição ou publicidade. Se isso mudar, pediremos o seu consentimento antes de ativá-los."}
        </p>
      </section>
      <section>
        <h2>9. Alterações</h2>
        <p>
          Podemos atualizar esta política. A data da última atualização fica no topo desta
          página. Veja também os{" "}
          <Link href="/termos" className="underline underline-offset-4">
            Termos de Uso
          </Link>
          .
        </p>
      </section>
    </LegalPage>
  );
}
