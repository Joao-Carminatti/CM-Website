import Image from "next/image";
import type { Foto } from "@/types";
import { PlaceholderArt } from "./PlaceholderArt";

/** Foto real (next/image, AVIF/WebP) ou placeholder SVG. Preenche o pai (que define a proporção). */
export function FotoView({
  foto,
  sizes,
  priority = false,
}: {
  foto: Foto;
  sizes: string;
  priority?: boolean;
}) {
  if (!foto.src) return <PlaceholderArt foto={foto} />;
  return (
    <Image
      src={foto.src}
      alt={foto.alt}
      fill
      sizes={sizes}
      priority={priority}
      className="object-cover"
    />
  );
}
