import React, { useState } from "react";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import { projects, type Project } from "@/data/portfolio";

const accentMap: Record<
  Project["accent"],
  { text: string; border: string; glow: string; bar: string }
> = {
  cyan: {
    text: "text-neon-cyan",
    border: "hover:border-neon-cyan/60",
    glow: "group-hover:shadow-neon-cyan",
    bar: "from-neon-cyan",
  },
  magenta: {
    text: "text-neon-magenta",
    border: "hover:border-neon-magenta/60",
    glow: "group-hover:shadow-neon-magenta",
    bar: "from-neon-magenta",
  },
  green: {
    text: "text-neon-green",
    border: "hover:border-neon-green/60",
    glow: "group-hover:shadow-neon-green",
    bar: "from-neon-green",
  },
  purple: {
    text: "text-neon-purple",
    border: "hover:border-neon-purple/60",
    glow: "",
    bar: "from-neon-purple",
  },
  yellow: {
    text: "text-neon-yellow",
    border: "hover:border-neon-yellow/60",
    glow: "",
    bar: "from-neon-yellow",
  },
};

/** Home shows the first `limit` projects with a link to /projects; the /projects page shows all. */
const filters = [
  { id: "all", label: "All" },
  { id: "web", label: "Web apps" },
  { id: "mobile", label: "Mobile" },
  { id: "shopify", label: "Shopify" },
  { id: "backend", label: "Backend & systems" },
  { id: "client", label: "Client work" },
] as const;
type FilterId = (typeof filters)[number]["id"];

const ProjectsSection = ({ limit, filterable }: { limit?: number; filterable?: boolean }) => {
  const [filter, setFilter] = useState<FilterId>("all");
  const matching = filter === "all" ? projects : projects.filter((p) => p.categories?.includes(filter));
  const shown = limit ? projects.slice(0, limit) : matching;
  return (
    <section id="projects" className="section-padding">
      <div className="container mx-auto">
        <Reveal>
          <SectionHeading
            index="04."
            command="ls ./projects"
            title="Featured Projects"
            subtitle="A few things I've designed and built end-to-end."
          />
        </Reveal>

        {filterable && (
          <div role="group" aria-label="Filter projects" className="mb-8 flex flex-wrap gap-2">
            {filters.map((f) => {
              const count = f.id === "all" ? projects.length : projects.filter((p) => p.categories?.includes(f.id)).length;
              const active = filter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFilter(f.id)}
                  aria-pressed={active}
                  className={`rounded-full border px-4 py-1.5 font-mono text-xs transition-all duration-300 ${
                    active
                      ? "border-neon-cyan bg-neon-cyan/15 text-neon-cyan shadow-neon-cyan"
                      : "border-border text-muted-foreground hover:border-neon-cyan/50 hover:text-foreground"
                  }`}
                >
                  {f.label} <span className="opacity-60">{count}</span>
                </button>
              );
            })}
          </div>
        )}

        <div key={filter} className="grid gap-6 animate-fade-in md:grid-cols-2 lg:grid-cols-3">
          {shown.map((project, i) => {
            const accent = accentMap[project.accent];
            return (
              <Reveal key={project.name} delay={i * 110}>
                <TiltCard className="group/tilt">
                  <article
                    className={`cyber-card group relative flex h-full flex-col overflow-hidden p-6 ${accent.border} ${accent.glow}`}
                  >
                    {/* sheen + accent bar + index watermark */}
                    <span className="sheen-overlay" aria-hidden />
                    <span
                      className={`absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r ${accent.bar} to-transparent opacity-50 transition-opacity duration-300 group-hover:opacity-100`}
                      aria-hidden
                    />
                    <span
                      className="pointer-events-none absolute right-4 top-2 select-none font-display text-6xl font-black leading-none text-foreground/[0.04]"
                      aria-hidden
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {project.image && (
                      <a
                        href={project.slug ? `/projects/${project.slug}` : project.links?.demo}
                        className="relative -mx-6 -mt-6 mb-5 block overflow-hidden border-b border-border/60"
                        tabIndex={-1}
                        aria-hidden
                      >
                        <img
                          src={project.image.src}
                          alt={project.image.alt}
                          width={960}
                          height={600}
                          loading="lazy"
                          decoding="async"
                          className="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      </a>
                    )}

                    <h3 className="relative font-display text-xl font-bold text-foreground">
                      {project.name}
                    </h3>
                    <p className={`relative mb-2 font-mono text-xs ${accent.text}`}>
                      {project.tagline}
                      {project.team && <span className="text-muted-foreground"> · team, {project.team.part}</span>}
                    </p>

                    <p className="relative mb-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>

                    <div className="relative mb-4 flex flex-wrap gap-1.5">
                      {project.tech.slice(0, 5).map((t) => (
                        <span
                          key={t}
                          className="rounded border border-border bg-muted/40 px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="relative mt-auto flex flex-wrap items-center gap-4 border-t border-border/60 pt-4 font-mono text-xs">
                      {project.slug && (
                        <a href={`/projects/${project.slug}`} className={`inline-flex items-center gap-1 ${accent.text} hover:underline`}>
                          how_i_built_it <ArrowUpRight className="h-3.5 w-3.5" />
                          <span className="sr-only"> ({project.name} case study)</span>
                        </a>
                      )}
                      {project.links?.demo && (
                        <a
                          href={project.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"
                        >
                          <ExternalLink className="h-3.5 w-3.5" /> live
                          <span className="sr-only"> {project.name}</span>
                        </a>
                      )}
                      {project.links?.repo && (
                        <a
                          href={project.links.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"
                        >
                          <Github className="h-3.5 w-3.5" /> code
                          <span className="sr-only"> for {project.name}</span>
                        </a>
                      )}
                    </div>
                  </article>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>

        {limit && projects.length > limit && (
          <div className="mt-8 text-center">
            <a href="/projects" className="btn-ghost text-xs">
              view_all_{projects.length}_projects <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
