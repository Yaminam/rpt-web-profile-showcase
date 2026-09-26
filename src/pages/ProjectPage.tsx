import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, ChevronRight, ExternalLink, Github, Mail } from "lucide-react";
import CyberBackground from "@/components/CyberBackground";
import { caseStudies, profile, type Project } from "@/data/portfolio";
import { projectSeo } from "@/lib/seo";
import NotFound from "./NotFound";

const accentText: Record<Project["accent"], string> = {
  cyan: "text-neon-cyan",
  magenta: "text-neon-magenta",
  green: "text-neon-green",
  purple: "text-neon-purple",
  yellow: "text-neon-yellow",
};

/**
 * /projects/:slug case-study page. Prerendered per project by scripts/prerender.mjs
 * (which also writes the page's <title>, meta and JSON-LD from lib/seo.ts).
 */
const ProjectPage = () => {
  const { slug } = useParams();
  const project = caseStudies.find((p) => p.slug === slug);

  // Keep the tab title right if this page is ever reached by client-side navigation.
  useEffect(() => {
    if (project) document.title = projectSeo(project).title;
  }, [project]);

  if (!project) return <NotFound />;

  const accent = accentText[project.accent];
  const others = caseStudies.filter((p) => p.slug !== project.slug);

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
        <a href="/#projects" className="btn-ghost py-2 text-xs">
          <ArrowLeft className="h-4 w-4" /> all_projects
        </a>
      </header>

      <main className="container mx-auto max-w-4xl pb-20">
        <nav aria-label="Breadcrumb" className="mb-6 font-mono text-xs text-muted-foreground">
          <a href="/" className="hover:text-foreground">
            ~/portfolio
          </a>
          <span className="text-neon-cyan"> / </span>
          <a href="/#projects" className="hover:text-foreground">
            projects
          </a>
          <span className="text-neon-cyan"> / </span>
          <span className="text-foreground">{project.slug}</span>
        </nav>

        <article className="space-y-8">
          <div className="terminal-window">
            <div className="terminal-bar">
              <span className="terminal-dot bg-red-500/80" />
              <span className="terminal-dot bg-yellow-400/80" />
              <span className="terminal-dot bg-green-500/80" />
              <span className="ml-3 font-mono text-xs text-muted-foreground">
                ~/projects/{project.slug}/README.md
              </span>
            </div>
            <div className="space-y-5 p-6 md:p-8">
              <p className="font-mono text-sm text-muted-foreground">
                <span className="text-neon-green">$</span> cat README.md
              </p>
              <h1 className="font-display text-3xl font-extrabold leading-tight md:text-5xl">
                {project.name}
              </h1>
              <p className={`font-mono text-sm md:text-base ${accent}`}>{project.tagline}</p>
              <p className="max-w-2xl font-sans leading-relaxed text-muted-foreground">
                {project.description} {project.team ? `A team project, with the ${project.team.part} built by ` : "Designed and built end-to-end by "}
                <a href="/" className="text-foreground underline decoration-neon-cyan/50 underline-offset-4">
                  {profile.name}
                </a>
                , a Frontend Developer and UI/UX Engineer based in {profile.location}.
              </p>

              {project.team && (
                <p className="rounded-md border border-neon-cyan/30 bg-neon-cyan/5 px-4 py-3 text-sm leading-relaxed text-muted-foreground">
                  <span className="font-mono text-neon-cyan">my_role: </span>
                  {project.team.role}
                </p>
              )}

              {(project.links?.demo || project.links?.repo) && (
                <div className="flex flex-wrap gap-3 pt-1">
                  {project.links?.demo && (
                    <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="btn-neon">
                      <ExternalLink className="h-4 w-4" /> live_demo
                    </a>
                  )}
                  {project.links?.repo && (
                    <a href={project.links.repo} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                      <Github className="h-4 w-4" /> {project.team ? "team_repo" : "source_code"}
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>

          {project.caseStudy && (
            <>
              <section className="cyber-card p-6 md:p-8">
                <h2 className="mb-4 font-display text-xl font-bold md:text-2xl">Overview</h2>
                <div className="space-y-4 leading-relaxed text-muted-foreground">
                  {project.caseStudy.overview.map((para) => (
                    <p key={para}>{para}</p>
                  ))}
                </div>
              </section>

              <section className="cyber-card p-6 md:p-8">
                <h2 className="mb-5 font-display text-xl font-bold md:text-2xl">How it works</h2>
                <ol className="space-y-5">
                  {project.caseStudy.howItWorks.map((step, i) => (
                    <li key={step.title} className="flex gap-4">
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border bg-muted/40 font-mono text-sm ${accent}`}
                        aria-hidden
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="font-display font-semibold text-foreground">{step.title}</h3>
                        <p className="mt-1 leading-relaxed text-muted-foreground">{step.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>

              <section className="cyber-card p-6 md:p-8">
                <h2 className="mb-5 font-display text-xl font-bold md:text-2xl">Challenges &amp; solutions</h2>
                <div className="space-y-5">
                  {project.caseStudy.challenges.map((c) => (
                    <div key={c.problem} className="border-l-2 border-border pl-4">
                      <p className="text-foreground">
                        <span className="font-mono text-xs text-neon-magenta">challenge: </span>
                        {c.problem}
                      </p>
                      <p className="mt-2 leading-relaxed text-muted-foreground">
                        <span className={`font-mono text-xs ${accent}`}>solution: </span>
                        {c.solution}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="cyber-card p-6 md:p-8">
                <h2 className="mb-4 font-display text-xl font-bold md:text-2xl">Results</h2>
                <ul className="space-y-3">
                  {project.caseStudy.results.map((r) => (
                    <li key={r} className="flex gap-3 leading-relaxed text-muted-foreground">
                      <span className="mt-0.5 font-mono text-neon-green" aria-hidden>
                        ✓
                      </span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </>
          )}

          <section className="cyber-card p-6 md:p-8">
            <h2 className="mb-4 font-display text-xl font-bold md:text-2xl">
              {project.team ? "Key features" : "What I built"}
            </h2>
            <ul className="space-y-3">
              {project.highlights.map((h) => (
                <li key={h} className="flex gap-3 leading-relaxed text-muted-foreground">
                  <ChevronRight className={`mt-1 h-4 w-4 shrink-0 ${accent}`} />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="cyber-card p-6 md:p-8">
            <h2 className="mb-4 font-display text-xl font-bold md:text-2xl">Tech stack</h2>
            <p className="mb-4 text-muted-foreground">
              {project.name} is built with {project.tech.slice(0, -1).join(", ")} and{" "}
              {project.tech[project.tech.length - 1]}.
            </p>
            <ul className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <li
                  key={t}
                  className="rounded border border-border bg-muted/40 px-2.5 py-1 font-mono text-xs text-muted-foreground"
                >
                  {t}
                </li>
              ))}
            </ul>
          </section>

          {project.caseStudy?.note && (
            <p className="rounded-md border border-neon-yellow/30 bg-neon-yellow/5 px-4 py-3 text-sm leading-relaxed text-muted-foreground">
              <span className="font-mono text-neon-yellow">note: </span>
              {project.caseStudy.note}
            </p>
          )}

          <section className="cyber-card flex flex-col gap-5 p-6 sm:flex-row sm:items-center md:p-8">
            <img
              src={profile.photo}
              alt={`${profile.name}, Frontend Developer & UI/UX Engineer`}
              width={96}
              height={96}
              loading="lazy"
              decoding="async"
              className="h-24 w-24 shrink-0 rounded-full border border-neon-cyan/40 object-cover object-top"
            />
            <div>
              <h2 className="font-display text-lg font-bold">About the developer</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                <a href="/" className="text-foreground underline decoration-neon-cyan/50 underline-offset-4">
                  {profile.name}
                </a>{" "}
                is a Frontend Developer and UI/UX Engineer in {profile.location}, currently Junior Developer, UI/UX
                at Garage Collective. He builds React, Next.js and TypeScript interfaces for AI-integrated SaaS
                products.
              </p>
              <div className="mt-3 flex flex-wrap gap-4 font-mono text-xs">
                <a href="/" className="flex items-center gap-1 text-neon-cyan hover:underline">
                  portfolio <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
                >
                  <Github className="h-3.5 w-3.5" /> GitHub
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
                >
                  LinkedIn <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
                >
                  <Mail className="h-3.5 w-3.5" /> {profile.email}
                </a>
              </div>
            </div>
          </section>

          {others.length > 0 && (
            <section>
              <h2 className="mb-4 font-display text-xl font-bold">More projects</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {others.map((p) => (
                  <a key={p.slug} href={`/projects/${p.slug}`} className="cyber-card group block p-5">
                    <span className="font-display font-bold group-hover:text-neon-cyan">{p.name}</span>
                    <span className={`mt-1 block font-mono text-xs ${accentText[p.accent]}`}>{p.tagline}</span>
                  </a>
                ))}
              </div>
            </section>
          )}
        </article>
      </main>

      <footer className="border-t border-neon-cyan/15 py-8 text-center font-mono text-xs text-muted-foreground">
        © <span suppressHydrationWarning>{new Date().getFullYear()}</span>{" "}
        <a href="/" className="hover:text-foreground">
          {profile.name}
        </a>{" "}
        · Frontend Developer &amp; UI/UX Engineer
      </footer>
    </div>
  );
};

export default ProjectPage;
