import React, { useEffect } from "react";
import { ArrowLeft, Check, FileDown, Linkedin, Rocket } from "lucide-react";
import CyberBackground from "@/components/CyberBackground";
import { contactReasons, mailtoFor, profile, seoServices } from "@/data/portfolio";

const SEO_RESUME = "/Shreyash_Tripathi_Resume_FullStack_SEO.pdf";

const projectMail = () => {
  const reason = contactReasons.find((r) => r.id === "freelance");
  return reason ? mailtoFor(profile.email, reason) : `mailto:${profile.email}`;
};

/**
 * /hire/seo: secondary hire page for AI-first SEO, AEO and GEO work (the tech /hire page is primary).
 * Prerendered by scripts/prerender.mjs (head tags + Service JSON-LD from lib/seo.ts → seoServicesSeo).
 */
const SeoServicesPage = () => {
  useEffect(() => {
    document.title = seoServices.seo.title;
  }, []);

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
          <span className="text-foreground">seo</span>
        </nav>

        {/* Hero */}
        <section className="terminal-window">
          <div className="terminal-bar">
            <span className="terminal-dot bg-red-500/80" />
            <span className="terminal-dot bg-yellow-400/80" />
            <span className="terminal-dot bg-green-500/80" />
            <span className="ml-3 font-mono text-xs text-muted-foreground">~/hire/seo --ai-first</span>
          </div>
          <div className="space-y-5 p-6 md:p-10">
            <p className="font-mono text-xs uppercase tracking-wider text-neon-cyan">SEO · AEO · GEO</p>
            <h1 className="font-display text-3xl font-extrabold leading-tight md:text-5xl">{seoServices.headline}</h1>
            <p className="max-w-3xl font-sans text-lg leading-relaxed text-muted-foreground">{seoServices.intro}</p>
            <div className="flex flex-wrap gap-3 pt-1">
              <a href={projectMail()} data-event="seo_project_click" className="btn-neon">
                <Rocket className="h-4 w-4" /> start_a_project
              </a>
              <a href={SEO_RESUME} download data-event="resume_seo_download" className="btn-ghost">
                <FileDown className="h-4 w-4" /> resume_fullstack_+_seo.pdf
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
            </div>
          </div>
        </section>

        {/* SEO vs AEO vs GEO: plain definitions answer engines can quote */}
        <section className="space-y-5">
          <h2 className="font-display text-2xl font-bold md:text-3xl">SEO, AEO and GEO in one line each</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {seoServices.terms.map((t) => (
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
            {seoServices.services.map((svc, i) => (
              <div key={svc.title} className="cyber-card p-6">
                <span className="font-mono text-xs text-neon-magenta">{String(i + 1).padStart(2, "0")}.</span>
                <h3 className="mt-2 font-display text-lg font-bold">{svc.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{svc.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Proof: this site's own results */}
        <section className="cyber-card p-6 md:p-8">
          <h2 className="mb-2 font-display text-2xl font-bold">Proof: this website</h2>
          <p className="mb-5 text-sm text-muted-foreground">
            I did all of this on shreyashtripathi.in, a brand-new domain, in its first month.
          </p>
          <ul className="space-y-3">
            {seoServices.proof.map((p) => (
              <li key={p} className="flex gap-2 leading-relaxed text-muted-foreground">
                <Check className="mt-1 h-4 w-4 shrink-0 text-neon-green" aria-hidden /> {p}
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ */}
        <section className="space-y-3">
          <h2 className="mb-2 font-display text-2xl font-bold">SEO, AEO & GEO FAQ</h2>
          {seoServices.faqs.map((f, i) => (
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
          <h2 className="font-display text-2xl font-bold md:text-3xl">Want to be found?</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Send your site and what you want to rank for. Email{" "}
            <a href={`mailto:${profile.email}`} className="text-neon-cyan underline underline-offset-4">
              {profile.email}
            </a>
            .
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a href={projectMail()} data-event="seo_project_click" className="btn-neon">
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
        · AI-first SEO, AEO &amp; GEO ·{" "}
        <a href="/hire" className="hover:text-foreground">
          hire me: frontend &amp; full-stack
        </a>
      </footer>
    </div>
  );
};

export default SeoServicesPage;
