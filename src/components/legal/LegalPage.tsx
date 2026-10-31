import { ReactNode } from "react";

/** Moldura das páginas legais. REMOVA o aviso de revisão depois que um advogado validar o texto. */
export function LegalPage({
  titulo,
  atualizado,
  children,
}: {
  titulo: string;
  atualizado: string;
  children: ReactNode;
}) {
  return (
    <div className="page-width py-12 md:py-20">
      <h1 className="font-display max-w-3xl text-4xl leading-tight font-medium tracking-tight md:text-5xl">
        {titulo}
      </h1>
      <p className="text-stone mt-3 text-sm">Última atualização: {atualizado}</p>
      <p
        role="note"
        className="border-bronze-deep bg-paper-deep mt-8 max-w-3xl rounded-md border-l-4 p-4 text-sm"
      >
        <strong>Texto-base para revisão jurídica.</strong> Este conteúdo é um modelo
        inicial e deve ser revisado por um advogado antes da publicação.
      </p>
      <div className="[&_h2]:font-display mt-10 max-w-3xl space-y-8 text-lg leading-relaxed [&_h2]:mb-3 [&_h2]:text-2xl [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-6">
        {children}
      </div>
    </div>
  );
}
