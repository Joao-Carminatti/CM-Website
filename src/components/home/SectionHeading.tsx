export function SectionHeading({
  id,
  title,
  intro,
  className = "",
}: {
  id?: string;
  title: string;
  intro?: string;
  className?: string;
}) {
  return (
    <div className={`max-w-2xl ${className}`}>
      <h2
        id={id}
        className="font-display text-3xl leading-tight font-medium tracking-tight md:text-5xl"
      >
        {title}
      </h2>
      {intro && <p className="text-stone mt-4 text-lg">{intro}</p>}
    </div>
  );
}
