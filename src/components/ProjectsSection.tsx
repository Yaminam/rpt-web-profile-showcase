import React from "react";
import { Folder, ChevronRight, Github, ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import { projects, profile, type Project } from "@/data/portfolio";

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

const ProjectsSection = () => {
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

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => {
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

                    <div className="relative mb-4 flex items-center justify-between">
                      <span
                        className={`flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-muted/40 ${accent.text} transition-transform duration-300 group-hover:scale-110`}
                      >
                        <Folder className="h-5 w-5" />
                      </span>
                      <a
                        href={profile.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.name} on GitHub`}
                        className="flex items-center gap-1 font-mono text-[11px] text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <Github className="h-4 w-4" />
                        <ArrowUpRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                      </a>
                    </div>

                    <h3 className="relative font-display text-xl font-bold text-foreground">
                      {project.name}
                    </h3>
                    <p className={`relative mb-3 font-mono text-xs ${accent.text}`}>
                      {project.tagline}
                    </p>

                    <p className="relative mb-4 text-sm leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>

                    <ul className="relative mb-5 space-y-1.5">
                      {project.highlights.map((h, idx) => (
                        <li key={idx} className="flex gap-2 text-xs text-muted-foreground">
                          <ChevronRight className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${accent.text}`} />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="relative mt-auto flex flex-wrap gap-1.5 border-t border-border/60 pt-4">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded border border-border bg-muted/40 px-2 py-0.5 font-mono text-[10px] text-muted-foreground transition-colors group-hover:border-border/80"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </article>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
