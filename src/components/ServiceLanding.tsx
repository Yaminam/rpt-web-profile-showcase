import React, { useEffect } from "react";
import { ArrowLeft, Check, FileDown, Linkedin, Rocket } from "lucide-react";
import CyberBackground from "@/components/CyberBackground";
import { contactReasons, mailtoFor, profile, type ServiceLandingData } from "@/data/portfolio";

const projectMail = () => {
  const reason = contactReasons.find((r) => r.id === "freelance");
  return reason ? mailtoFor(profile.email, reason) : `mailto:${profile.email}`;
};

type Props = {
  data: ServiceLandingData;
  /** Last path segment, e.g. "seo" for /hire/seo. */
  slug: string;
  /** Terminal-bar command shown in the hero. */
  command: string;
  /** Small label above the headline. */
  kicker: string;
  /** Heading for the terms section. */
  termsHeading: string;
  /** Heading for the FAQ section. */
  faqHeading: string;
  /** Footer service label. */
  footerLabel: string;
  resume: { href: string; label: string; event: string };
  ctaEvent: string;
};

/**
 * Shared layout for the secondary hire pages (/hire/seo, /hire/shopify). The tech /hire page is primary.
 * Each page is prerendered by scripts/prerender.mjs with its own head tags + Service JSON-LD.
 */
const ServiceLanding = ({ data, slug, command, kicker, termsHeading, faqHeading, footerLabel, resume, ctaEvent }: Props) => {
  useEffect(() => {
    document.title = data.seo.title;
  }, [data.seo.title]);

  return (
    <div className="relative min-h-screen text-foreground">
      <CyberBackground />

      <header className="container mx-auto flex items-center justify-between py-6">
        <a href="/" className="group flex items-center gap-2 font-mono font-bold">
          <span className="text-neon-cyan">&gt;_</span>
          <span>
            Shreyash <span className="text-neon-cyan">Tripathi</span>
          </span>
        </a>
        <a href="/" className="btn-ghost py-2 text-xs">
          <ArrowLeft className="h-4 w-4" /> portfolio
        </a>
      </header>

      <main className="container mx-auto max-w-5xl space-y-10 pb-20">
        <nav aria-label="Breadcrumb" className="font-mono text-xs text-muted-foreground">
          <a href="/" className="hover:text-foreground">
            ~/portfolio
          </a>
          <span className="text-neon-cyan"> / </span>
          <a href="/hire" className="hover:text-foreground">
            hire
          </a>
          <span className="text-neon-cyan"> / </span>
          <span className="text-foreground">{slug}</span>
        </nav>

        {/* Hero */}
        <section className="terminal-window">
          <div className="terminal-bar">
            <span className="terminal-dot bg-red-500/80" />
            <span className="terminal-dot bg-yellow-400/80" />
            <span className="terminal-dot bg-green-500/80" />
            <span className="ml-3 font-mono text-xs text-muted-foreground">{command}</span>
          </div>
          <div className="space-y-5 p-6 md:p-10">
            <p className="font-mono text-xs uppercase tracking-wider text-neon-cyan">{kicker}</p>
            <h1 className="font-display text-3xl font-extrabold leading-tight md:text-5xl">{data.headline}</h1>
            <p className="max-w-3xl font-sans text-lg leading-relaxed text-muted-foreground">{data.intro}</p>
            <div className="flex flex-wrap gap-3 pt-1">
              <a href={projectMail()} data-event={ctaEvent} className="btn-neon">
                <Rocket className="h-4 w-4" /> start_a_project
              </a>
              <a href={resume.href} download data-event={resume.event} className="btn-ghost">
                <FileDown className="h-4 w-4" /> {resume.label}
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
            </div>
          </div>
        </section>

        {/* Plain definitions answer engines can quote */}
        <section className="space-y-5">
          <h2 className="font-display text-2xl font-bold md:text-3xl">{termsHeading}</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {data.terms.map((t) => (
              <div key={t.title} className="cyber-card p-6">
                <h3 className="font-display text-xl font-bold text-neon-cyan">{t.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Services */}
        <section className="space-y-5">
          <h2 className="font-display text-2xl font-bold md:text-3xl">What I do</h2>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {data.services.map((svc, i) => (
              <div key={svc.title} className="cyber-card p-6">
                <span className="font-mono text-xs text-neon-magenta">{String(i + 1).padStart(2, "0")}.</span>
                <h3 className="mt-2 font-display text-lg font-bold">{svc.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{svc.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Proof */}
        <section className="cyber-card p-6 md:p-8">
          <h2 className="mb-2 font-display text-2xl font-bold">{data.proofHeading}</h2>
          <p className="mb-5 text-sm text-muted-foreground">{data.proofIntro}</p>
          <ul className="space-y-3">
            {data.proof.map((p) => (
              <li key={p} className="flex gap-2 leading-relaxed text-muted-foreground">
                <Check className="mt-1 h-4 w-4 shrink-0 text-neon-green" aria-hidden /> {p}
              </li>
            ))}
          </ul>
          {data.caseStudies && (
            <div className="mt-5 flex flex-wrap gap-3">
              {data.caseStudies.map((c) => (
                <a key={c.href} href={c.href} className="btn-ghost text-xs">
                  {c.label}
                </a>
              ))}
            </div>
          )}
        </section>

        {/* FAQ */}
        <section className="space-y-3">
          <h2 className="mb-2 font-display text-2xl font-bold">{faqHeading}</h2>
          {data.faqs.map((f, i) => (
            <details key={f.q} className="cyber-card group p-5 [&_summary::-webkit-details-marker]:hidden" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-display font-semibold">
                <h3>{f.q}</h3>
                <span className="font-mono text-neon-cyan transition-transform group-open:rotate-45" aria-hidden>
                  +
                </span>
              </summary>
              <p className="mt-3 leading-relaxed text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </section>

        {/* Closing CTA */}
        <section className="terminal-window p-6 text-center md:p-10">
          <h2 className="font-display text-2xl font-bold md:text-3xl">{data.ctaHeading}</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            {data.ctaText} Email{" "}
            <a href={`mailto:${profile.email}`} className="text-neon-cyan underline underline-offset-4">
              {profile.email}
            </a>
            .
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a href={projectMail()} data-event={ctaEvent} className="btn-neon">
              <Rocket className="h-4 w-4" /> start_a_project
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-neon-cyan/15 py-8 text-center font-mono text-xs text-muted-foreground">
        © <span suppressHydrationWarning>{new Date().getFullYear()}</span>{" "}
        <a href="/" className="hover:text-foreground">
          {profile.name}
        </a>{" "}
        · {footerLabel} ·{" "}
        <a href="/hire" className="hover:text-foreground">
          hire me: frontend &amp; full-stack
        </a>
      </footer>
    </div>
  );
};

export default ServiceLanding;
