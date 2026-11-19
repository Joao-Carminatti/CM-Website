import type { Lancamento } from "@/types";

/**
 * LANÇAMENTOS REAIS. Imagens em public/lancamentos/<slug>/.
 * Para adicionar outro: copie um bloco, troque os dados e salve as imagens em
 * public/lancamentos/<novo-slug>/ (passo a passo em GUIA-DE-CONTEUDO.md).
 */
const pasta = (slug: string) => `/lancamentos/${slug}`;

const nautic = pasta("nautic-campeche");
const laMare = pasta("la-mare-campeche");

export const lancamentos: Lancamento[] = [
  {
    slug: "nautic-campeche",
    nome: "Nautic",
    construtora: "LongView Empreendimentos Imobiliários",
    status: "em-obras",
    bairro: "Campeche",
    cidade: "Florianópolis",
    destaque: true,
    tipologias: [
      { nome: "1 dormitório" },
      { nome: "2 dormitórios" },
      { nome: "3 dormitórios" },
      {
        nome: "Cobertura de 3 dormitórios",
        detalhes: ["Terraço descoberto com espaço gourmet"],
      },
    ],
    plantas: [
      { alt: "Planta ilustrativa de apartamento de 1 dormitório", src: `${nautic}/planta-1-dormitorio.jpg` },
      { alt: "Planta ilustrativa de apartamento de 2 dormitórios", src: `${nautic}/planta-2-dormitorios.jpg` },
      { alt: "Planta ilustrativa de apartamento de 3 dormitórios", src: `${nautic}/planta-3-dormitorios.jpg` },
      {
        alt: "Planta ilustrativa de cobertura de 3 dormitórios, com terraço e espaço gourmet",
        src: `${nautic}/planta-cobertura-3-dormitorios.jpg`,
      },
    ],
    fotos: [
      {
        alt: "Vista aérea da obra do Nautic, com a praia do Campeche e a ilha ao fundo",
        src: `${nautic}/01-obra-vista-aerea.jpg`,
      },
      { alt: "Vista aérea da praia do Campeche", src: `${nautic}/02-praia-campeche.jpg` },
      {
        alt: "Implantação do Nautic: cinco blocos, jardins e piscina, vistos de cima (imagem ilustrativa)",
        src: `${nautic}/03-implantacao.jpg`,
      },
    ],
    diferenciais: [
      "Em frente ao mar do Campeche",
      "Obras em andamento",
      "Unidades de 1, 2 e 3 dormitórios",
      "Coberturas de 3 dormitórios com terraço e espaço gourmet",
      "Jardins com paisagismo diferenciado",
    ],
    lazer: [
      "Garagem, bicicletário e hobby box",
      "Lounges externos",
      "Piscina externa",
      "Piscina climatizada",
      "Academia",
      "Spa com sauna e hidromassagem climatizada",
      "Playground e espaço kids",
      "Salão de festas",
      "Sala de jogos",
      "Bar piscina",
      "Mini market",
      "Pet place",
      "Guarita e torres com controle de acesso",
    ],
    etapasObra: [],
    descricao:
      "Empreendimento residencial da LongView no Campeche, em frente ao mar, com obras em andamento. O conjunto reúne cinco blocos, executados em duas etapas, com unidades de 1, 2 e 3 dormitórios e coberturas de 3 dormitórios. O lazer é completo, com piscinas externa e climatizada, spa com sauna e hidromassagem, academia, bar piscina e mini market.",
  },
  {
    slug: "la-mare-campeche",
    nome: "La Mare Campeche",
    construtora: "CFL",
    status: "lancamento",
    bairro: "Campeche",
    cidade: "Florianópolis",
    destaque: true,
    tipologias: [
      { nome: "Final 14", area: [108.34, 117.62], detalhes: ["1 dormitório + 1 suíte master", "2 vagas"] },
      { nome: "Finais 08, 10, 15 e 16", area: [132.53, 141.81], detalhes: ["1 suíte + 2 dormitórios", "2 vagas"] },
      { nome: "Final 12", area: [141.41, 145.33], detalhes: ["2 suítes", "2 vagas"] },
      { nome: "Final 11", area: [141.16, 147.76], detalhes: ["3 suítes", "2 vagas"] },
      { nome: "Finais 07 e 13", area: [158.76, 165.36], detalhes: ["3 suítes", "2 vagas"] },
      {
        nome: "Finais 02 e 19",
        area: [181.34, 188.2],
        detalhes: ["4 suítes (ou 3 suítes com living ampliado)", "2 vagas"],
      },
      { nome: "Final 05", area: [221.43, 225.35], detalhes: ["4 suítes", "3 vagas"] },
      { nome: "Final 09", area: [229.9, 236.5], detalhes: ["4 suítes", "3 vagas"] },
      {
        nome: "Finais 03, 04 e 18",
        area: [238.88, 245.48],
        detalhes: ["5 suítes (ou 4 suítes com living ampliado)", "3 vagas"],
      },
      {
        nome: "Finais 06 e 17",
        area: [238.88, 248.16],
        detalhes: ["5 suítes (ou 4 suítes com living ampliado)", "3 vagas"],
      },
      { nome: "Final 20", area: [303.85, 314.37], detalhes: ["5 suítes", "4 vagas"] },
      { nome: "Final 01", area: [342.04, 361.84], detalhes: ["5 suítes", "4 vagas"] },
      { nome: "Casas 01 e 09 (térreas)", area: [194.5, 197.36], detalhes: ["1 suíte + 2 dormitórios", "2 vagas"] },
      { nome: "Casas 02, 04, 05 e 08 (térreas)", area: [224.45, 246.06], detalhes: ["3 suítes", "2 vagas"] },
      { nome: "Casa 03 (térrea)", area: 361.08, detalhes: ["5 suítes", "3 vagas"] },
      { nome: "Casa 06 (térrea)", area: 358.25, detalhes: ["5 suítes", "3 vagas"] },
    ],
    plantas: [
      { alt: "Mapa das tipologias de apartamento no pavimento tipo do La Mare", src: `${laMare}/planta-tipologias.jpg` },
      { alt: "Planta ilustrativa do Final 14, de 108 a 118 m²", src: `${laMare}/planta-final-14.jpg` },
      { alt: "Planta ilustrativa dos Finais 08, 10, 15 e 16, de 132 a 142 m²", src: `${laMare}/planta-finais-08-10-15-16.jpg` },
      { alt: "Planta ilustrativa dos Finais 07 e 13, de 159 a 165 m²", src: `${laMare}/planta-finais-07-13.jpg` },
      { alt: "Planta ilustrativa dos Finais 02 e 19, de 181 a 188 m²", src: `${laMare}/planta-finais-02-19.jpg` },
      { alt: "Planta ilustrativa das Casas 01 e 09, térreo e mezanino", src: `${laMare}/planta-casa-01-09.jpg` },
    ],
    fotos: [
      { alt: "La Mare Campeche visto do mar, ao entardecer (imagem ilustrativa)", src: `${laMare}/01-fachada-vista-do-mar.jpg` },
      { alt: "Vista aérea do terreno do La Mare, com a praia do Campeche e a ilha ao fundo", src: `${laMare}/02-terreno-vista-aerea.jpg` },
      { alt: "Fachada e acesso do La Mare, com jardins e térreo comercial (imagem ilustrativa)", src: `${laMare}/03-fachada-entrada.jpg` },
      { alt: "Piscina externa aquecida com vista para o mar (imagem ilustrativa)", src: `${laMare}/04-piscina-externa.jpg` },
      { alt: "Piscina térmica indoor do Club La Mare (imagem ilustrativa)", src: `${laMare}/05-piscina-termica.jpg` },
      { alt: "Sala de estar e jantar com vista para o mar (imagem ilustrativa)", src: `${laMare}/06-sala-de-estar-vista-mar.jpg` },
    ],
    diferenciais: [
      "Terreno único de 12.000 m², com 202 metros de frente para o mar",
      "100 apartamentos e 9 casas (gardens)",
      "80% das unidades com vista para o mar",
      "Faixa de restinga preservada integrada ao projeto",
      "Piscina elevada a doze metros do nível da praia, com vista panorâmica",
      "Térreo com Food Hall",
    ],
    lazer: [
      "Piscina externa aquecida com vista para o mar (Sun Pool)",
      "Piscina térmica indoor",
      "Fitness center by Technogym e sala de yoga",
      "Espaço wellness com sauna seca e úmida, área relax e sala de massagem",
      "Workspace",
      "Brinquedoteca e espaço teens",
      "Salão de festas e espaço gourmet",
      "Playground",
      "Food Hall e Praça La Mare",
      "Em temporada: serviço de beach point e limpeza das unidades",
    ],
    etapasObra: [],
    descricao:
      "Empreendimento da CFL na praia do Campeche, em um terreno único de 12.000 m² com 202 metros de frente para o mar. São 100 apartamentos e 9 casas (gardens), com projeto de arquitetura autoral que integra a faixa de restinga preservada. O Club La Mare funciona como um clube de praia, com piscinas, fitness, wellness e espaços de convivência.",
  },
];