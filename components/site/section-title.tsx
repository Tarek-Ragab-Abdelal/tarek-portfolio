interface SectionTitleProps {
  eyebrow: string;
  title: string;
  description: string;
}

export function SectionTitle({ eyebrow, title, description }: SectionTitleProps) {
  return (
    <header className="space-y-4">
      <span className="badge-pill">{eyebrow}</span>
      <h2 className="font-display text-3xl font-semibold leading-tight text-white md:text-4xl">{title}</h2>
      <p className="max-w-2xl text-sm leading-relaxed text-muted md:text-base">{description}</p>
    </header>
  );
}
