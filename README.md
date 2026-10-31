# Cleiton Molon: site de corretor de imóveis

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Motion. Foco em conversão: cliques no WhatsApp, pedidos de visita e leads.

## Rodar localmente

```bash
npm install
cp .env.example .env.local   # preencha o WhatsApp e o que for usar
npm run dev                  # http://localhost:3000
npm run lint && npm run build
```

## Páginas

`/` · `/imoveis` · `/imoveis/[slug]` · `/lancamentos` · `/lancamentos/[slug]` · `/vender-seu-imovel` · `/sobre` · `/contato` · `/politica-de-privacidade` · `/termos` · 404 · `/sitemap.xml` · `/robots.txt`. Estrutura de blog e de páginas por bairro: fase 2 do projeto (nada fictício foi criado).

## Estrutura

| Caminho | Para quê |
|---|---|
| `src/config/site.ts` | Nome, CRECI, WhatsApp, e-mail, redes, região, IDs de analytics. **[COLCHETES] = placeholder.** |
| `src/app/globals.css` | Design tokens (`@theme`) e animações. Paleta **PROVISÓRIA**. |
| `src/types/index.ts` | Schemas de Imóvel e Lançamento. |
| `src/data/` | Imóveis, lançamentos e prova social (hoje, exemplos `isDemo`). |
| `src/lib/data.ts` | `getImoveis`, `getImovel`, `getLancamentos`, `getLancamento`, `getImoveisSemelhantes`. Única porta de entrada dos dados. |
| `src/lib/lead.ts` + `src/app/actions/lead.ts` | Regras e envio dos formulários. |
| `src/lib/schema.ts` | JSON-LD (corretor e anúncio). |
| `src/components/` | `home/`, `property/` (PropertyCard, PropertyFilters via `CatalogFilters`, Gallery, Lightbox, FinancingSimulator...), `forms/` (LeadForm, VipList), `layout/`, `analytics/`, `seo/`, `ui/`. |

## Documentação

- `GUIA-DE-CONTEUDO.md`: cadastrar imóveis e lançamentos, fotos, status, remover exemplos.
- `BRANDING.md`: o que trocar com logo, paleta e fotos definitivas; favicon e imagem OG.

## Variáveis de ambiente

Veja `.env.example`. Resumo: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_WHATSAPP`, `NEXT_PUBLIC_SHOW_DEMO`, `LEAD_WEBHOOK_URL` (só servidor), `NEXT_PUBLIC_GA4_ID`, `NEXT_PUBLIC_GTM_ID`, `NEXT_PUBLIC_META_PIXEL_ID`. Sem ID de analytics, nada de terceiros é carregado e o banner de cookies não aparece.

## Formulários e leads

Mesmo componente (`LeadForm`) e mesma Server Action para: interesse no imóvel, tabela de lançamento, avaliação, Lista VIP e contato. Fluxo: honeypot → validação no servidor → limite de 5 envios/10 min por IP → `POST` em `LEAD_WEBHOOK_URL` → se não houver webhook ou ele falhar, o visitante recebe um botão para continuar no WhatsApp com a mensagem pronta.

Corpo enviado ao webhook:

```json
{
  "tipo": "avaliacao",
  "assunto": "Avaliação gratuita de imóvel",
  "dados": { "nome": "...", "telefone": "...", "email": "", "tipoImovel": "Casa", "bairro": "...", "metragem": "120" },
  "contexto": { "nome": "...", "codigo": "EX-001", "slug": "..." },
  "enviadoEm": "2026-10-30T12:00:00.000Z"
}
```

Para o n8n: crie um nó **Webhook** (POST), copie a *Production URL* para `LEAD_WEBHOOK_URL` e responda 200.

**Limitação do limite por IP:** o contador fica em memória de cada instância. Na Vercel (serverless) isso reduz abuso casual, mas não substitui um limitador compartilhado (Upstash Redis / Vercel KV). Troque se começar a receber spam.

## Eventos de conversão

Só disparam **com consentimento** e com ao menos um ID de analytics: `whatsapp_click` (com código do imóvel), `agendar_visita`, `lead` (com o tipo do formulário), `favoritar`, `simulador_uso`. Implementação: `src/lib/analytics.ts` e `src/components/analytics/Analytics.tsx` (os cliques em links do WhatsApp são capturados por um único listener).

## Animações (técnica e por que são leves)

Todas animam só `transform`, `opacity`, `clip-path` e `stroke-dashoffset`, e respeitam `prefers-reduced-motion` (versão estática).

1. **Hero em linhas mascaradas:** CSS `@keyframes` com `translateY` dentro de `overflow:hidden`. Zero JS.
2. **Painel do hero:** `clip-path` animado em CSS. Só desktop.
3. **Skyline desenhado:** SVG com `pathLength=1` + `stroke-dashoffset` em CSS. Estático no mobile.
4. **Transição entre páginas:** `<ViewTransition>` do React + View Transitions API nativa (foto do card → galeria). Sem suporte do navegador, a navegação é normal.
5. **Linha do tempo (compra e obra):** CSS scroll-driven animations (`animation-timeline: view()`) com `scaleY`. Sem suporte, já aparece preenchida. Zero JS no scroll.
6. **Zoom/spotlight/CTA magnético nos cards:** zoom por CSS `:hover` (só com mouse); spotlight e magnético por um único listener delegado (`PointerEffects`) que só atualiza variáveis CSS e `transform`, apenas com ponteiro fino.
7. **Entrada escalonada dos cards, lightbox, coração que se desenha:** CSS `@keyframes` curtos.
8. **Contadores animados:** **não implementados** (exigem números reais; ver `src/data/prova-social.ts`).

## Deploy na Vercel

1. Suba o repositório no GitHub e importe o projeto na Vercel.
2. Em *Settings → Environment Variables*, cadastre as variáveis acima (use `NEXT_PUBLIC_SHOW_DEMO=false` em produção) e `NEXT_PUBLIC_SITE_URL` com o domínio final.
3. **Uso comercial exige plano adequado:** o plano Hobby da Vercel é só para uso pessoal e não comercial. Para o site de um corretor, use o plano Pro (ou outra hospedagem).
4. Depois do deploy, envie `https://SEU-DOMINIO/sitemap.xml` ao Google Search Console.
