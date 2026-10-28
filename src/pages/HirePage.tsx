import React, { useEffect } from "react";
import { ArrowLeft, ArrowUpRight, Briefcase, FileDown, Linkedin, Mail, MapPin, Rocket } from "lucide-react";
import CyberBackground from "@/components/CyberBackground";
import TestimonialsSection from "@/components/TestimonialsSection";
import { caseStudies, contactReasons, hire, mailtoFor, profile } from "@/data/portfolio";
import { bookCover, books, SERIES_NAME } from "@/data/books";

const reasonMail = (id: string) => {
  const reason = contactReasons.find((r) => r.id === id);
  return reason ? mailtoFor(profile.email, reason) : `mailto:${profile.email}`;
};

/**
 * /hire: full-time roles and freelance services. Prerendered by scripts/prerender.mjs
 * (head tags + Service JSON-LD from lib/seo.ts → hireSeo).
 */
const HirePage = () => {
  // Keep the tab title right if this page is ever reached by client-side navigation.
  useEffect(() => {
    document.title = hire.seo.title;
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
          <span className="text-foreground">hire</span>
        </nav>

        {/* Hero */}
        <section className="terminal-window">
          <div className="terminal-bar">
            <span className="terminal-dot bg-red-500/80" />
            <span className="terminal-dot bg-yellow-400/80" />
            <span className="terminal-dot bg-green-500/80" />
            <span className="ml-3 font-mono text-xs text-muted-foreground">~/hire --available</span>
          </div>
          <div className="space-y-5 p-6 md:p-10">
            <span className="inline-flex items-center gap-2 rounded-md border border-neon-green/40 bg-neon-green/5 px-2.5 py-1 font-mono text-xs text-neon-green">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-green opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-green" />
              </span>
              status: AVAILABLE for full-time &amp; freelance
            </span>
            <h1 className="font-display text-3xl font-extrabold leading-tight md:text-5xl">{hire.headline}</h1>
            <p className="max-w-3xl font-sans text-lg leading-relaxed text-muted-foreground">{hire.intro}</p>
            <div className="flex flex-wrap gap-3 pt-1">
              <a href={reasonMail("job")} data-event="hire_full_time_click" className="btn-neon">
                <Briefcase className="h-4 w-4" /> hire_full_time
              </a>
              <a href={reasonMail("freelance")} data-event="start_project_click" className="btn-neon">
                <Rocket className="h-4 w-4" /> start_a_project
              </a>
              <a href={profile.resume} download className="btn-ghost">
                <FileDown className="h-4 w-4" /> resume.pdf
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
            </div>
          </div>
        </section>

        {/* Full-time vs freelance */}
        <section aria-labelledby="ways" className="grid gap-5 md:grid-cols-2">
          <h2 id="ways" className="sr-only">
            Ways to work together
          </h2>
          {hire.engagements.map((e) => (
            <div key={e.title} className="cyber-card flex flex-col gap-3 p-6 md:p-8">
              <h3 className="font-display text-xl font-bold">{e.title}</h3>
              <p className="flex-1 leading-relaxed text-muted-foreground">{e.text}</p>
              <a href={reasonMail(e.reason)} data-event={e.reason === "job" ? "hire_full_time_click" : "start_project_click"} className="btn-ghost self-start text-xs">
                <Mail className="h-4 w-4" /> {e.cta}
              </a>
            </div>
          ))}
        </section>

        {/* Locations: named on the page, not just in metadata, so location searches can match */}
        <section className="space-y-5">
          <h2 className="font-display text-2xl font-bold md:text-3xl">Where I work</h2>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {hire.locations.map((loc) => (
              <li key={loc.name} className="cyber-card p-5">
                <span className="flex items-center gap-2 font-display font-bold">
                  <MapPin className="h-4 w-4 shrink-0 text-neon-cyan" aria-hidden /> {loc.name}
                </span>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{loc.text}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Services */}
        <section className="space-y-5">
          <h2 className="font-display text-2xl font-bold md:text-3xl">What I can build for you</h2>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {hire.services.map((svc, i) => (
              <div key={svc.title} className="cyber-card p-6">
                <span className="font-mono text-xs text-neon-magenta">{String(i + 1).padStart(2, "0")}.</span>
                <h3 className="mt-2 font-display text-lg font-bold">{svc.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{svc.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Proof */}
        <section className="space-y-5">
          <h2 className="font-display text-2xl font-bold md:text-3xl">Work you can check</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {caseStudies.map((p) => (
              <a key={p.slug} href={`/projects/${p.slug}`} className="cyber-card group block p-5">
                <span className="flex items-center justify-between font-display font-bold group-hover:text-neon-cyan">
                  {p.name} <ArrowUpRight className="h-4 w-4" />
                </span>
                <span className="mt-1 block font-mono text-xs text-neon-cyan">{p.tagline}</span>
                <span className="mt-2 block text-sm text-muted-foreground">{p.description}</span>
              </a>
            ))}
          </div>
        </section>

        {/* Books he wrote: proof of depth across CS fundamentals */}
        <section className="space-y-5">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="font-display text-2xl font-bold md:text-3xl">Books I've written</h2>
              <p className="mt-2 max-w-3xl text-muted-foreground">
                The {SERIES_NAME}: {books.length} books and about{" "}
                {(Math.floor(books.reduce((n, b) => n + b.editions[0].pages, 0) / 100) * 100).toLocaleString("en-IN")}{" "}
                pages on System Design, DSA, DBMS, Computer Networks, Operating Systems and Full-Stack TypeScript, written
                for developers preparing for interviews.
              </p>
            </div>
            <a href="/books" className="btn-ghost text-xs">
              all_books <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
          <ul className="grid grid-cols-4 gap-3 sm:grid-cols-4 lg:grid-cols-9">
            {books.map((b) => (
              <li key={b.slug}>
                <a href={`/books/${b.slug}`} className="group block" title={b.title}>
                  <img
                    src={bookCover(b.slug)}
                    alt={`${b.title} book cover by ${profile.name}`}
                    width={847}
                    height={1200}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[847/1200] w-full rounded-md border border-border object-cover transition-transform duration-300 group-hover:-translate-y-1 group-hover:border-neon-cyan/60"
                  />
                  <span className="mt-2 block text-center font-mono text-[11px] text-muted-foreground group-hover:text-neon-cyan">
                    {b.shortTitle}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* Praise from leadership (anonymous, role only) */}
        <TestimonialsSection
          heading={<h2 className="mb-5 font-display text-2xl font-bold md:text-3xl">What leadership says</h2>}
        />

        {/* Process */}
        <section className="cyber-card p-6 md:p-8">
          <h2 className="mb-5 font-display text-2xl font-bold">How we'd work together</h2>
          <ol className="grid gap-5 md:grid-cols-4">
            {hire.process.map((step, i) => (
              <li key={step.title}>
                <span className="font-mono text-sm text-neon-cyan">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-1 font-display font-semibold">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* FAQ (plain text in the DOM, readable by search and answer engines) */}
        <section className="space-y-3">
          <h2 className="mb-2 font-display text-2xl font-bold">Hiring FAQ</h2>
          {hire.faqs.map((f, i) => (
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
          <h2 className="font-display text-2xl font-bold md:text-3xl">Let's build something</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Tell me about the role or the project. Email{" "}
            <a href={`mailto:${profile.email}`} className="text-neon-cyan underline underline-offset-4">
              {profile.email}
            </a>{" "}
            or use a button below.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a href={reasonMail("job")} data-event="hire_full_time_click" className="btn-neon">
              <Briefcase className="h-4 w-4" /> hire_full_time
            </a>
            <a href={reasonMail("freelance")} data-event="start_project_click" className="btn-neon">
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
        · Full-Stack Developer · Noida · Delhi NCR · UP · Gujarat · Remote
      </footer>
    </div>
  );
};

export default HirePage;
