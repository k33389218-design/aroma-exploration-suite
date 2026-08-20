import bottle from "@/assets/bottle.png";

export function ScentSection({
  title,
  tagline,
}: {
  title: string;
  tagline: string;
}) {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden border-t border-border bg-smoke">
      <img
        src={bottle}
        alt="SARKAR LE MALE ELIXIR leather-wrapped chess king parfum bottle"
        loading="lazy"
        className="absolute left-1/2 top-1/2 h-[130%] max-w-none -translate-x-1/2 -translate-y-1/2 object-contain brightness-[0.62]"
      />
      <div className="relative z-10 px-6 text-center [text-shadow:0_2px_24px_rgba(0,0,0,0.55)]">
        <h2 className="text-3xl font-bold tracking-brand text-smoke-foreground sm:text-5xl md:text-6xl">
          {title}
        </h2>
        <p className="mt-3 text-xs tracking-wide-label text-smoke-foreground/80 sm:text-sm">
          {tagline}
        </p>
        <a
          href="#shop"
          className="mt-8 inline-block border border-smoke-foreground px-8 py-3 text-[11px] font-semibold tracking-wide-label text-smoke-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          EXPLORE PARFUM
        </a>
      </div>
    </section>
  );
}
