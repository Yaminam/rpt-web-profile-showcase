import React from "react";

type Stat = { value: string; label: string };

type PageHeroProps = {
  /** Breadcrumb label, e.g. "about". */
  crumb: string;
  /** Terminal command shown above the title, e.g. "cat about.md". */
  command: string;
  title: string;
  lead: string;
  stats: Stat[];
  /** Tailwind color token used for the glow and accents. */
  accent: "cyan" | "magenta" | "green" | "purple" | "yellow";
};

const glow: Record<PageHeroProps["accent"], string> = {
  cyan: "rgba(0,240,255,0.28)",
  magenta: "rgba(255,43,214,0.26)",
  green: "rgba(57,255,20,0.2)",
  purple: "rgba(168,85,247,0.28)",
  yellow: "rgba(255,214,10,0.2)",
};
const text: Record<PageHeroProps["accent"], string> = {
  cyan: "text-neon-cyan",
  magenta: "text-neon-magenta",
  green: "text-neon-green",
  purple: "text-neon-purple",
  yellow: "text-neon-yellow",
};

/**
 * Big animated header for each standalone section page: the page's <h1>, an intro paragraph and
 * key numbers. Pure CSS animation (aurora glow, grid, staggered fade-in) so it costs no JS.
 */
const PageHero = ({ crumb, command, title, lead, stats, accent }: PageHeroProps) => (
  <header className="relative overflow-hidden border-b border-neon-cyan/10">
    {/* animated backdrop */}
    <div className="bg-grid-lines pointer-events-none absolute inset-0 bg-[length:48px_48px] opacity-25" aria-hidden />
    <div
      className="pointer-events-none absolute -left-40 -top-48 h-[36rem] w-[36rem] animate-aurora"
      style={{ background: `radial-gradient(circle, ${glow[accent]} 0%, transparent 65%)` }}
      aria-hidden
    />
    <div
      className="pointer-events-none absolute -right-40 -top-10 h-[32rem] w-[32rem] animate-aurora [animation-delay:-8s]"
      style={{ background: "radial-gradient(circle, rgba(168,85,247,0.22) 0%, transparent 65%)" }}
      aria-hidden
    />
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/60 to-transparent" aria-hidden />

    <div className="container relative mx-auto px-5 pb-16 pt-28 md:pb-20 md:pt-36">
      <nav aria-label="Breadcrumb" className="mb-6 font-mono text-xs text-muted-foreground opacity-0 animate-fade-in">
        <a href="/" className="hover:text-foreground">
          ~/portfolio
        </a>
        <span className="text-neon-cyan"> / </span>
        <span className="text-foreground">{crumb}</span>
      </nav>

      <p className="font-mono text-sm text-muted-foreground opacity-0 animate-fade-in">
        <span className="text-neon-green">~/portfolio</span>
        <span className="text-neon-cyan"> $ </span>
        {command}
        <span className="ml-1 inline-block h-4 w-2 translate-y-0.5 bg-neon-cyan animate-blink" />
      </p>

      <h1 className="mt-4 max-w-4xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight opacity-0 animate-fade-in-delay-1 md:text-6xl lg:text-7xl">
        <span className="shimmer-text">{title}</span>
      </h1>

      <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground opacity-0 animate-fade-in-delay-2 md:text-xl">
        {lead}
      </p>

      <dl className="mt-10 grid max-w-4xl grid-cols-2 gap-4 opacity-0 animate-fade-in-delay-3 md:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="group rounded-lg border border-border bg-terminal-bg/60 p-4 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-neon-cyan/50"
          >
            <dt className="sr-only">{s.label}</dt>
            <dd>
              <span className={`block font-display text-3xl font-extrabold ${text[accent]}`}>{s.value}</span>
              <span className="mt-1 block text-xs leading-snug text-muted-foreground">{s.label}</span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  </header>
);

export default PageHero;
