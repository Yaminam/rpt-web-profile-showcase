import React from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, Briefcase, Rocket } from "lucide-react";
import Reveal from "@/components/Reveal";
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

/** Education: the books are part of how I learn. */
const EducationExtras = () => (
  <Block kicker="./learning" title="Learning by writing">
    <Reveal>
      <a
        href="/books"
        className="cyber-card group flex flex-col gap-4 p-6 hover:border-neon-magenta/60 md:flex-row md:items-center md:justify-between md:p-8"
      >
        <span className="flex items-start gap-4">
          <BookOpen className="mt-1 h-6 w-6 shrink-0 text-neon-magenta" />
          <span>
            <span className="block font-display text-xl font-bold">The Job-Ready Series</span>
            <span className="mt-1 block text-muted-foreground">
              12 interview and job-switch books I wrote, on DSA, DBMS, OS, networks, system design, DevOps, cloud and more, with free
              chapter previews.
            </span>
          </span>
        </span>
        <span className="btn-ghost shrink-0 text-xs">
          browse_books <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </a>
    </Reveal>
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
  education: EducationExtras,
  contact: ContactExtras,
};

/** Previous / next section page, so every page leads somewhere. */
export const PageNav = ({ id }: { id: SectionPageId }) => {
  const i = order.indexOf(id);
  const prev = i > 0 ? order[i - 1] : null;
  const next = i < order.length - 1 ? order[i + 1] : null;
  return (
    <nav aria-label="More pages" className="container mx-auto grid gap-4 px-5 pb-16 sm:grid-cols-2">
      {prev ? (
        <a href={`/${prev}`} className="cyber-card group flex items-center gap-3 p-5 hover:border-neon-cyan/60">
          <ArrowLeft className="h-5 w-5 text-neon-cyan transition-transform group-hover:-translate-x-1" />
          <span>
            <span className="block font-mono text-xs text-muted-foreground">previous</span>
            <span className="font-display font-bold">/{prev}</span>
            <span className="block text-sm text-muted-foreground">{sectionPages[prev].blurb}</span>
          </span>
        </a>
      ) : (
        <span />
      )}
      {next && (
        <a href={`/${next}`} className="cyber-card group flex items-center justify-end gap-3 p-5 text-right hover:border-neon-cyan/60">
          <span>
            <span className="block font-mono text-xs text-muted-foreground">next</span>
            <span className="font-display font-bold">/{next}</span>
            <span className="block text-sm text-muted-foreground">{sectionPages[next].blurb}</span>
          </span>
          <ArrowRight className="h-5 w-5 text-neon-cyan transition-transform group-hover:translate-x-1" />
        </a>
      )}
    </nav>
  );
};
