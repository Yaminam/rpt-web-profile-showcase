import React from "react";
import { ChevronRight, Calendar, MapPin } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { experience } from "@/data/portfolio";
import { highlightMetrics } from "@/lib/highlight";

const initialsOf = (name: string) =>
  name
    .replace(/[^a-zA-Z ]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

const ExperienceSection = () => {
  return (
    <section id="experience" className="section-padding">
      <div className="container mx-auto">
        <Reveal>
          <SectionHeading
            index="02."
            command="git log --work"
            title="Work Experience"
            subtitle="Where I've built, shipped and learned."
          />
        </Reveal>

        <div className="relative mx-auto max-w-3xl">
          {/* Timeline line */}
          <div className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-neon-cyan via-neon-purple to-transparent md:left-1/2" />

          <div className="space-y-8">
            {experience.map((job, i) => (
              <Reveal key={job.company} delay={i * 120}>
                <div
                  className={`relative pl-12 md:w-1/2 md:pl-0 ${
                    i % 2 === 0 ? "md:pr-12 md:text-right" : "md:ml-auto md:pl-12"
                  }`}
                >
                  {/* Node */}
                  <span
                    className={`absolute left-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full border border-neon-cyan bg-terminal-bg md:left-auto ${
                      i % 2 === 0 ? "md:-right-[10px]" : "md:-left-[10px]"
                    }`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full bg-neon-cyan shadow-neon-cyan ${
                        job.current ? "animate-glow-pulse" : ""
                      }`}
                    />
                  </span>

                  <div className="cyber-card p-5 text-left">
                    {/* header: badge + role + company */}
                    <div className="mb-3 flex items-center gap-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-neon-cyan/30 bg-neon-cyan/5 font-display text-sm font-bold text-neon-cyan">
                        {initialsOf(job.company)}
                      </span>
                      <div className="min-w-0">
                        <h3 className="font-display text-lg font-bold leading-tight text-foreground">
                          {job.role}
                        </h3>
                        <p className="truncate font-mono text-sm text-neon-magenta">
                          {job.company}
                        </p>
                      </div>
                    </div>

                    {/* meta chips */}
                    <div className="mb-4 flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-muted/40 px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
                        <Calendar className="h-3 w-3 text-neon-cyan" />
                        {job.period}
                      </span>
                      {job.location && (
                        <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-muted/40 px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
                          <MapPin className="h-3 w-3 text-neon-cyan" />
                          {job.location}
                        </span>
                      )}
                      {job.current && (
                        <span className="inline-flex items-center gap-1.5 rounded-md border border-neon-green/40 bg-neon-green/10 px-2 py-0.5 font-mono text-[11px] text-neon-green">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-green opacity-75" />
                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-neon-green" />
                          </span>
                          now
                        </span>
                      )}
                    </div>

                    <ul className="space-y-2">
                      {job.points.map((p, idx) => (
                        <li key={idx} className="flex gap-2 text-sm text-muted-foreground">
                          <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-neon-cyan" />
                          <span>{highlightMetrics(p)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
