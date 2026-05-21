import React from "react";
import { Folder, ChevronRight, Github } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import { projects, profile, type Project } from "@/data/portfolio";

const accentMap: Record<Project["accent"], { text: string; border: string; glow: string }> = {
  cyan: { text: "text-neon-cyan", border: "hover:border-neon-cyan/60", glow: "group-hover:shadow-neon-cyan" },
  magenta: { text: "text-neon-magenta", border: "hover:border-neon-magenta/60", glow: "group-hover:shadow-neon-magenta" },
  green: { text: "text-neon-green", border: "hover:border-neon-green/60", glow: "group-hover:shadow-neon-green" },
  purple: { text: "text-neon-purple", border: "hover:border-neon-purple/60", glow: "" },
  yellow: { text: "text-neon-yellow", border: "hover:border-neon-yellow/60", glow: "" },
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
                  className={`cyber-card group flex h-full flex-col p-6 ${accent.border} ${accent.glow}`}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <Folder className={`h-9 w-9 ${accent.text}`} />
                    <a
                      href={profile.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.name} on GitHub`}
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                  </div>

                  <h3 className="font-display text-xl font-bold text-foreground">
                    {project.name}
                  </h3>
                  <p className={`mb-3 font-mono text-xs ${accent.text}`}>{project.tagline}</p>

                  <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>

                  <ul className="mb-5 space-y-1.5">
                    {project.highlights.map((h, idx) => (
                      <li key={idx} className="flex gap-2 text-xs text-muted-foreground">
                        <ChevronRight className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${accent.text}`} />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex flex-wrap gap-1.5 border-t border-border/60 pt-4">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded border border-border bg-muted/40 px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
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
