# Guia de conteúdo: como manter o site

Tudo que aparece no site vem de arquivos em `src/data/`. Você edita o arquivo, faz commit e a Vercel publica sozinha.

## 1. Cadastrar um imóvel

1. Abra `src/data/imoveis.ts`.
2. Copie um bloco existente e preencha. Exemplo mínimo:

```ts
{
  codigo: "CM-0012",                 // único, aparece no site e no WhatsApp
  slug: "casa-3-quartos-bairro-x",   // endereço: /imoveis/casa-3-quartos-bairro-x (minúsculas, sem acento, com hífens)
  titulo: "Casa com 3 quartos e quintal",
  tipo: "casa",                      // apartamento | casa | cobertura | terreno | comercial
  status: "disponivel",              // disponivel | reservado | vendido
  selo: "novo",                      // opcional: novo | oportunidade | exclusivo
  preco: 850000,                     // só números
  bairro: "Nome do bairro",
  cidade: "Nome da cidade",
  area: 140, quartos: 3, banheiros: 2, vagas: 2,
  diferenciais: ["Quintal", "Armários planejados"],
  fotos: [
    { alt: "Fachada da casa", src: "/imoveis/CM-0012/01.jpg" },
    { alt: "Sala de estar com porta para o quintal", src: "/imoveis/CM-0012/02.jpg" },
  ],
  videoYoutube: "dQw4w9WgXcQ",       // opcional: só o ID do vídeo (o que vem depois de v= na URL)
  descricao: "Texto real do imóvel. Sem prometer valorização.",
  data: "2026-11-05",                // AAAA-MM-DD, define a ordem "mais recentes"
  destaque: true,                    // opcional: aparece na Home
},
```

3. **Não** coloque `isDemo` nos imóveis reais. Ele é exclusivo dos exemplos.
4. Regras do site: nunca escreva o endereço exato (rua e número). O site mostra só bairro e cidade.

## 2. Preparar as fotos

- Formato: JPG (ou WebP). O site converte para AVIF/WebP automaticamente.
- Tamanho: lado maior entre 1600 e 2400 px, até ~400 KB por foto (use squoosh.app ou tinypng.com).
- Proporção: prefira horizontais (3:2 ou 4:3). A primeira foto é a capa do card, então escolha a melhor.
- Onde salvar: `public/imoveis/CM-0012/01.jpg`, `02.jpg`... (pasta com o código do imóvel).
- Texto alternativo (`alt`): descreva o que a foto mostra, em uma frase. Ajuda na acessibilidade e no Google.
- Remover marcas d'água de terceiros e rostos/placas visíveis de vizinhos.

## 3. Atualizar o status

- **Reservado:** troque `status: "reservado"`. O card ganha o selo "Reservado".
- **Vendido:** troque `status: "vendido"`. O imóvel continua online com o selo "Vendido" (bom como prova de resultado). Se preferir tirar do ar, apague o bloco.
- Mudou o preço? Edite `preco`. Os metadados e o Google atualizam no próximo deploy.

## 4. Cadastrar um lançamento

Abra `src/data/lancamentos.ts` e siga o modelo dos exemplos. Pontos de atenção:

- `status`: `em-breve` | `lancamento` | `em-obras` | `pronto`.
- `entrega`: `"AAAA-MM"` (ex.: `"2028-12"`).
- `aPartirDe`: omita se não houver valor, e o site mostra "sob consulta".
- `condicoesPagamento`: omita se não houver dado, e o site mostra "Sob consulta".
- `etapasObra`: use `[]` se não houver cronograma. Atualize `progresso` (0 a 100) e `concluida` conforme a obra avança.
- Plantas: mesmas regras das fotos (`plantas: [{ alt: "...", src: "/lancamentos/slug/planta-2q.jpg" }]`).

## 5. Depoimentos e números (prova social)

Edite `src/data/prova-social.ts`. **Só dados reais**, com autorização por escrito de quem deu o depoimento. Enquanto as listas estiverem vazias, a seção não aparece no site.

## 6. Remover os dados de exemplo

1. Cadastre os imóveis e lançamentos reais.
2. Apague os blocos com `isDemo: true` (ou defina `NEXT_PUBLIC_SHOW_DEMO=false` na Vercel).
3. Os exemplos já ficam fora do sitemap, do JSON-LD e dos resultados do Google (`noindex`), mas apague antes de divulgar o site.

## 7. Textos do site

- Nome, CRECI, WhatsApp, e-mail, região, redes sociais: `src/config/site.ts`.
- Bio do Cleiton: procure `[BIO DO CLEITON` em `src/components/home/About.tsx` e `src/app/sobre/page.tsx`.
- Perguntas frequentes: `src/components/home/Faq.tsx`.
- Políticas: `src/app/politica-de-privacidade` e `src/app/termos` (revise com advogado e remova o aviso de revisão em `LegalPage.tsx`).

## 8. Antes de publicar uma mudança

```bash
npm run lint && npm run build
```

Se o build passar, pode fazer commit e push.
