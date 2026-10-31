import { siteConfig } from "@/config/site";
import { Monogram } from "./Monogram";

/** Wordmark tipográfico provisório: nome pessoal + cargo. */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <Monogram />
      <span className="flex flex-col leading-none">
        <span className="font-display text-xl font-medium tracking-tight">
          {siteConfig.nome}
        </span>
        <span className="mt-1 text-xs tracking-wide opacity-75">{siteConfig.cargo}</span>
      </span>
    </span>
  );
}
