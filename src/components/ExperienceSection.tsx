import React from "react";
import { Briefcase, ChevronRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { experience } from "@/data/portfolio";

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
                    i % 2 === 0
                      ? "md:pr-12 md:text-right"
                      : "md:ml-auto md:pl-12"
                  }`}
                >
                  {/* Node */}
                  <span
                    className={`absolute left-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full border border-neon-cyan bg-terminal-bg md:left-auto ${
                      i % 2 === 0
                        ? "md:-right-[10px]"
                        : "md:-left-[10px]"
                    }`}
                  >
                    <span className="h-2 w-2 rounded-full bg-neon-cyan shadow-neon-cyan" />
                  </span>

                  <div className="cyber-card p-5 text-left">
                    <div className="mb-2 flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-neon-cyan" />
                      <span className="font-mono text-xs text-neon-cyan">{job.period}</span>
                      {job.current && (
                        <span className="rounded-full border border-neon-green/40 bg-neon-green/10 px-2 py-0.5 font-mono text-[10px] text-neon-green">
                          now
                        </span>
                      )}
                    </div>
                    <h3 className="font-display text-lg font-bold text-foreground">
                      {job.role}
                    </h3>
                    <p className="mb-3 font-mono text-sm text-neon-magenta">{job.company}</p>
                    <ul className="space-y-2">
                      {job.points.map((p, idx) => (
                        <li key={idx} className="flex gap-2 text-sm text-muted-foreground">
                          <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-neon-cyan" />
                          <span>{p}</span>
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
