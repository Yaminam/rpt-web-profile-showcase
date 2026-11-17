import React from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Briefcase, Rocket } from "lucide-react";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { caseStudies, hire, sectionPages, type SectionPageId } from "@/data/portfolio";

const order: SectionPageId[] = ["about", "experience", "skills", "projects", "education", "contact"];

const Block = ({ title, kicker, children }: { title: string; kicker: string; children: React.ReactNode }) => (
  <section className="section-padding pt-0">
    <div className="container mx-auto">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-widest text-neon-magenta">{kicker}</p>
        <h2 className="mt-2 font-display text-2xl font-bold md:text-3xl">{title}</h2>
      </Reveal>
      <div className="mt-8">{children}</div>
    </div>
  </section>
);

/** About: how a project runs, and what I'm focused on right now. */
const AboutExtras = () => (
  <>
    <Block kicker="./process" title="How I work">
      <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {hire.process.map((step, i) => (
          <Reveal as="li" key={step.title} delay={i * 90} className="cyber-card h-full p-6 transition-transform duration-300 hover:-translate-y-1">
              <span className="font-mono text-sm text-neon-cyan">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 font-display text-lg font-bold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
            </Reveal>
        ))}
      </ol>
    </Block>
    <Block kicker="./now" title="What I'm focused on right now">
      <ul className="grid gap-5 md:grid-cols-3">
        {[
          { t: "Building", d: "AI-integrated SaaS products, mobile apps and client sites at a digital product agency." },
          { t: "Learning", d: "System design and DevOps: Docker, Kubernetes, CI/CD and observability, practised on goredis." },
          { t: "Writing", d: "The Job-Ready Series of interview books and technical articles on what I build." },
        ].map((n, i) => (
          <Reveal as="li" key={n.t} delay={i * 90} className="cyber-card h-full p-6">
              <h3 className="font-display text-lg font-bold text-neon-green">{n.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{n.d}</p>
            </Reveal>
        ))}
      </ul>
    </Block>
  </>
);

const clientSlugs = [
  "finance-mobile-app",
  "affiliate-marketing-saas",
  "spirits-brand-website",
  "school-website",
  "ayurvedic-shopify-store",
  "ethnic-wear-shopify-theme",
];

/** Experience: the work behind the bullets, as case studies. */
const ExperienceExtras = () => (
  <Block kicker="./work" title="The work behind it: client case studies">
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {caseStudies
        .filter((p) => clientSlugs.includes(p.slug))
        .map((p, i) => (
          <Reveal as="li" key={p.slug} delay={i * 80}>
              <a href={`/projects/${p.slug}`} className="cyber-card group block h-full overflow-hidden">
                {p.image && (
                  <img
                    src={p.image.src}
                    alt={p.image.alt}
                    width={960}
                    height={600}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[16/10] w-full border-b border-border/60 object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                )}
                <span className="block p-5">
                  <span className="flex items-center justify-between font-display font-bold group-hover:text-neon-cyan">
                    {p.name} <ArrowUpRight className="h-4 w-4" />
                  </span>
                  <span className="mt-1 block text-sm text-muted-foreground">{p.tagline}</span>
                </span>
              </a>
            </Reveal>
        ))}
    </ul>
  </Block>
);

/** Skills: each area backed by a project you can read. */
const SkillsExtras = () => (
  <Block kicker="./proof" title="Skills in action">
    <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {[
        { area: "Frontend & UI/UX", proof: "Storefront and 3-step case designer", href: "/projects/purrcase" },
        { area: "Full-stack & SaaS", proof: "Multi-tenant affiliate platform, 41 pages", href: "/projects/affiliate-marketing-saas" },
        { area: "Mobile (React Native)", proof: "Finance app with 6 Android widgets", href: "/projects/finance-mobile-app" },
        { area: "Backend & Go", proof: "Redis-compatible database, 137k commands/s", href: "/projects/goredis" },
        { area: "DevOps", proof: "Docker, Kubernetes, CI and Grafana for goredis", href: "/projects/goredis" },
        { area: "Shopify", proof: "Custom Online Store 2.0 theme from scratch", href: "/projects/ethnic-wear-shopify-theme" },
        { area: "Real-time", proof: "Socket.IO multiplayer game server", href: "/projects/sketchrace" },
        { area: "Security", proof: "Zero-knowledge vault with WebCrypto", href: "/projects/asset-credential-vault" },
        { area: "SEO, AEO & GEO", proof: "This site: ranked and known to AI assistants", href: "/hire/seo" },
      ].map((s, i) => (
        <Reveal as="li" key={s.area} delay={(i % 3) * 80}>
            <a href={s.href} className="cyber-card group flex h-full items-start justify-between gap-3 p-5 hover:border-neon-cyan/60">
              <span>
                <span className="block font-display font-bold">{s.area}</span>
                <span className="mt-1 block text-sm text-muted-foreground">{s.proof}</span>
              </span>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neon-cyan" />
            </a>
          </Reveal>
      ))}
    </ul>
  </Block>
);

/** Contact: how we can work together, and the three hire pages. */
const ContactExtras = () => (
  <Block kicker="./availability" title="Ways to work together">
    <div className="grid gap-5 md:grid-cols-2">
      {hire.engagements.map((e, i) => (
        <Reveal key={e.title} delay={i * 90}>
          <div className="cyber-card h-full p-6">
            {e.reason === "job" ? <Briefcase className="h-5 w-5 text-neon-cyan" /> : <Rocket className="h-5 w-5 text-neon-magenta" />}
            <h3 className="mt-3 font-display text-xl font-bold">{e.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{e.text}</p>
          </div>
        </Reveal>
      ))}
    </div>
    <ul className="mt-5 grid gap-3 sm:grid-cols-3">
      {[
        { href: "/hire", label: "Hire a frontend & full-stack developer" },
        { href: "/hire/shopify", label: "Hire a Shopify developer" },
        { href: "/hire/seo", label: "AI-first SEO, AEO & GEO" },
      ].map((l) => (
        <li key={l.href}>
          <a href={l.href} className="cyber-card group flex items-center justify-between gap-2 p-4 text-sm hover:border-neon-cyan/60">
            {l.label} <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-neon-cyan" />
          </a>
        </li>
      ))}
    </ul>
  </Block>
);

export const pageExtras: Partial<Record<SectionPageId, () => JSX.Element>> = {
  about: AboutExtras,
  experience: ExperienceExtras,
  skills: SkillsExtras,
  contact: ContactExtras,
};

/** Accent → classes for the "up next" card. */
const accentCls: Record<string, { text: string; border: string; glow: string; bg: string }> = {
  cyan: { text: "text-neon-cyan", border: "hover:border-neon-cyan/70", glow: "rgba(0,240,255,0.22)", bg: "bg-neon-cyan" },
  magenta: { text: "text-neon-magenta", border: "hover:border-neon-magenta/70", glow: "rgba(255,43,214,0.2)", bg: "bg-neon-magenta" },
  green: { text: "text-neon-green", border: "hover:border-neon-green/70", glow: "rgba(57,255,20,0.16)", bg: "bg-neon-green" },
  purple: { text: "text-neon-purple", border: "hover:border-neon-purple/70", glow: "rgba(168,85,247,0.22)", bg: "bg-neon-purple" },
  yellow: { text: "text-neon-yellow", border: "hover:border-neon-yellow/70", glow: "rgba(253,224,71,0.16)", bg: "bg-neon-yellow" },
};

/**
 * End-of-page navigator: where you are in the six pages, a big "up next" card and a smaller
 * "previous" card. Wraps around, so every page has both.
 */
export const PageNav = ({ id }: { id: SectionPageId }) => {
  const i = order.indexOf(id);
  const prev = order[(i - 1 + order.length) % order.length];
  const next = order[(i + 1) % order.length];
  const a = accentCls[sectionPages[next].hero.accent] ?? accentCls.cyan;

  return (
    <nav aria-label="More pages" className="container mx-auto px-5 pb-20 pt-4">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-border bg-terminal-bg/70 p-5 backdrop-blur md:p-8">
          <div className="bg-grid-lines pointer-events-none absolute inset-0 bg-[length:40px_40px] opacity-20" aria-hidden />
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 animate-aurora"
            style={{ background: `radial-gradient(circle, ${a.glow} 0%, transparent 70%)` }}
            aria-hidden
          />

          {/* where you are */}
          <div className="relative flex flex-wrap items-center justify-between gap-3">
            <p className="font-mono text-xs uppercase tracking-widest text-neon-magenta">./continue_exploring</p>
            <p className="font-mono text-xs text-muted-foreground">
              <span className="text-foreground">{String(i + 1).padStart(2, "0")}</span> / {String(order.length).padStart(2, "0")}
            </p>
          </div>
          <ol className="relative mt-4 grid grid-cols-6 gap-1.5 md:gap-2">
            {order.map((p, k) => (
              <li key={p}>
                <a href={`/${p}`} aria-current={p === id ? "page" : undefined} className="group block" title={sectionPages[p].hero.h1}>
                  <span
                    className={cn(
                      "block h-1.5 rounded-full transition-all duration-300",
                      p === id
                        ? "bg-gradient-to-r from-neon-cyan to-neon-magenta shadow-[0_0_12px_rgba(0,240,255,0.7)]"
                        : k < i
                          ? "bg-neon-cyan/40 group-hover:bg-neon-cyan/70"
                          : "bg-muted group-hover:bg-muted-foreground/50"
                    )}
                  />
                  <span
                    className={cn(
                      "mt-2 hidden truncate font-mono text-[11px] transition-colors sm:block",
                      p === id ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                    )}
                  >
                    /{p}
                  </span>
                </a>
              </li>
            ))}
          </ol>

          <div className="relative mt-6 grid gap-4 md:grid-cols-[1fr_2fr]">
            <a
              href={`/${prev}`}
              className="group flex items-center gap-4 rounded-2xl border border-border bg-muted/10 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-neon-cyan/50 md:flex-col md:items-start md:justify-between"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-all group-hover:-translate-x-1 group-hover:border-neon-cyan/60 group-hover:text-neon-cyan">
                <ArrowLeft className="h-4 w-4" />
              </span>
              <span className="min-w-0">
                <span className="block font-mono text-[11px] uppercase tracking-widest text-muted-foreground">previous</span>
                <span className="block font-display text-lg font-bold">{sectionPages[prev].hero.h1}</span>
                <span className="block text-sm text-muted-foreground">{sectionPages[prev].blurb}</span>
              </span>
            </a>

            <a
              href={`/${next}`}
              className={cn(
                "group relative flex items-center justify-between gap-6 overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-muted/30 to-transparent p-6 transition-all duration-300 hover:-translate-y-0.5 md:p-8",
                a.border
              )}
            >
              <span
                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                aria-hidden
              />
              <span className="relative min-w-0">
                <span className={cn("block font-mono text-[11px] uppercase tracking-widest", a.text)}>up next · /{next}</span>
                <span className="mt-2 block font-display text-2xl font-extrabold leading-tight md:text-4xl">{sectionPages[next].hero.h1}</span>
                <span className="mt-2 block text-sm text-muted-foreground md:text-base">{sectionPages[next].blurb}</span>
              </span>
              <span
                className={cn(
                  "relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-terminal-bg shadow-[0_0_30px_-6px_currentColor] transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-110 md:h-16 md:w-16",
                  a.bg
                )}
              >
                <ArrowRight className="h-6 w-6" />
              </span>
            </a>
          </div>
        </div>
      </Reveal>
    </nav>
  );
};
