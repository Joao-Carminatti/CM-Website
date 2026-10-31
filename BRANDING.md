# Branding: o que trocar quando a identidade visual chegar

> **PALETA PROVISÓRIA.** As cores, o monograma "CM" e o wordmark atuais são provisórios.

## 1. Cores

Arquivo: `src/app/globals.css`, bloco `@theme` (marcado "PALETA PROVISÓRIA").

| Token | Uso hoje | Provisório |
|---|---|---|
| `--color-ink` / `--color-ink-soft` | fundos escuros, botões | `#0f1d2e` / `#182a40` |
| `--color-paper` / `--color-paper-deep` | fundo padrão e superfícies | `#f3f1ec` / `#e8e5de` |
| `--color-stone` | texto secundário sobre paper | `#5b5c58` |
| `--color-mist` | texto secundário sobre ink | `#a9b1bc` |
| `--color-bronze` | acento sobre ink | `#b79a6a` |
| `--color-bronze-deep` | acento/links sobre paper | `#7d5f2e` |
| `--color-line` | bordas | `#d4d0c7` |

**Troque só esses valores**: todas as classes (`bg-ink`, `text-bronze-deep`...) acompanham. Depois, valide o contraste (mínimo AA = 4,5:1 para texto):

- `paper` sobre `ink` · `stone` sobre `paper` · `bronze` sobre `ink` · `bronze-deep` sobre `paper` · `mist` sobre `ink`
- Ferramenta rápida: https://webaim.org/resources/contrastchecker/

Cores repetidas fora do CSS (atualize junto): `src/lib/og.tsx` (constante `COR`), `src/app/icon.svg`, `themeColor` em `src/app/layout.tsx`, e o `PlaceholderArt.tsx` (só dos exemplos).

## 2. Logotipo e nome

- Wordmark: `src/components/ui/Wordmark.tsx`. Monograma: `src/components/ui/Monogram.tsx`.
- Com logo em SVG: coloque em `public/logo.svg` e troque o conteúdo de `Wordmark` por `<Image src="/logo.svg" ... />` (mantenha o `aria-label` do link no `Header`).
- Textos de marca (nome, cargo, tagline): `src/config/site.ts`.

## 3. Tipografia

- Fontes em `src/app/fonts/` (Newsreader para títulos, Hanken Grotesk para texto), declaradas em `src/app/layout.tsx`.
- Para trocar: coloque os `.woff2` na pasta, atualize `localFont({...})` no layout e mantenha os nomes das variáveis (`--font-newsreader`, `--font-hanken`), ou ajuste `--font-display` e `--font-sans` em `globals.css`.
- Verifique a licença de uso da fonte nova.

## 4. Favicon e imagem de compartilhamento (Open Graph)

- **Favicon:** `src/app/icon.svg` é usado automaticamente. Para um logo próprio, substitua o arquivo (SVG) ou adicione `src/app/favicon.ico` e `src/app/apple-icon.png` (180×180).
- **Imagem OG:** gerada em código, sem arquivo. Layout em `src/lib/og.tsx`; as telas em `src/app/opengraph-image.tsx` (geral), `src/app/imoveis/[slug]/opengraph-image.tsx` e `src/app/lancamentos/[slug]/opengraph-image.tsx`. Para uma imagem fixa, apague esses arquivos e coloque `opengraph-image.png` (1200×630) em `src/app/`.
- Para testar: abra `/imoveis/<slug>/opengraph-image` no navegador e use o depurador de compartilhamento do WhatsApp/Facebook.

## 5. Fotos definitivas

Substitua os placeholders: veja `GUIA-DE-CONTEUDO.md` (seção 2). A foto do corretor entra em `src/components/home/About.tsx` e `src/app/sobre/page.tsx` (hoje há um espaço reservado com `role="img"`; troque por `<Image>` com `alt` real).
