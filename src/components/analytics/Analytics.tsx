"use client";

import { useEffect } from "react";
import Script from "next/script";
import { siteConfig } from "@/config/site";
import { useConsentimento } from "@/lib/consent";
import { track } from "@/lib/analytics";

const { ga4, gtm, metaPixel } = siteConfig.analytics;

/**
 * Scripts de terceiros: SÓ com consentimento e SÓ se o ID estiver definido em .env.
 * Os IDs são validados por regex em site.ts antes de entrar no script (sem injeção).
 * strategy="lazyOnload": carregam depois da página interativa, sem bloquear.
 */
export function Analytics() {
  const consentimento = useConsentimento();

  // Cliques em links de WhatsApp (delegado: cobre todos os botões do site)
  useEffect(() => {
    const aoClicar = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest<HTMLAnchorElement>(
        'a[href^="https://wa.me"]',
      );
      if (!a) return;
      const texto = decodeURIComponent(new URL(a.href).searchParams.get("text") ?? "");
      const codigo = /Código: (\S+)/.exec(texto)?.[1];
      track("whatsapp_click", { codigo, pagina: location.pathname });
      if (/agendar uma visita/i.test(texto)) track("agendar_visita", { codigo });
    };
    document.addEventListener("click", aoClicar);
    return () => document.removeEventListener("click", aoClicar);
  }, []);

  if (consentimento !== "granted") return null;

  return (
    <>
      {gtm && (
        <Script
          id="gtm"
          strategy="lazyOnload"
        >{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s);j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtm}');`}</Script>
      )}
      {ga4 && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ga4}`}
            strategy="lazyOnload"
          />
          <Script
            id="ga4"
            strategy="lazyOnload"
          >{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('config','${ga4}',{anonymize_ip:true});`}</Script>
        </>
      )}
      {metaPixel && (
        <Script
          id="meta-pixel"
          strategy="lazyOnload"
        >{`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${metaPixel}');fbq('track','PageView');`}</Script>
      )}
    </>
  );
}
