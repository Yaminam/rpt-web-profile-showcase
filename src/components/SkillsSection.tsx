import React, { Suspense, lazy } from "react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { skillGroups } from "@/data/portfolio";

// recharts is heavy — load the radar chart only when this section renders
const SkillsRadar = lazy(() => import("@/components/SkillsRadar"));

const SkillsSection = () => {
  return (
    <section id="skills" className="section-padding">
      <div className="container mx-auto">
        <Reveal>
          <SectionHeading
            index="03."
            command="ls ./skills"
            title="Tech Stack & Skills"
            subtitle="The tools I reach for to design, build and ship."
          />
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Reveal>
            <Suspense
              fallback={
                <div className="terminal-window flex h-full min-h-[20rem] items-center justify-center">
                  <span className="font-mono text-xs text-muted-foreground">
                    loading radar<span className="animate-blink">_</span>
                  </span>
                </div>
              }
            >
              <SkillsRadar />
            </Suspense>
          </Reveal>

          {skillGroups.map((group, i) => (
            <Reveal key={group.label} delay={i * 90}>
              <div className="terminal-window group relative h-full overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-neon-cyan/40 hover:shadow-neon-cyan">
                <span className="sheen-overlay" aria-hidden />
                <div className="terminal-bar">
                  <span className="terminal-dot bg-red-500/70" />
                  <span className="terminal-dot bg-yellow-400/70" />
                  <span className="terminal-dot bg-green-500/70" />
                  <span className="ml-2 font-mono text-[11px] text-muted-foreground">
                    {group.label.toLowerCase()}.sh
                  </span>
                </div>
                <div className="p-5 font-mono text-sm">
                  <p className="mb-3 text-muted-foreground">
                    <span className="text-neon-green">$</span> {group.prompt}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span key={item} className="chip">
                        {item}
                      </span>
                    ))}
                  </div>
                  <p className="mt-4 text-xs text-muted-foreground">
                    <span className="text-neon-cyan">✓</span> {group.items.length} loaded
                  </p>
                </div>
              </div>
            </Reveal>
          ))}

          {/* Currently learning card */}
          <Reveal delay={skillGroups.length * 90}>
            <div className="cyber-card flex h-full flex-col justify-center p-6">
              <p className="mb-3 font-mono text-xs uppercase tracking-widest text-neon-magenta">
                ./currently-learning
              </p>
              <div className="flex flex-wrap gap-2">
                {["Motion & WebGL (Three.js)", "Design Systems at Scale", "AI-Native UX Patterns", "Accessibility (WCAG)"].map((s) => (
                  <span key={s} className="chip-magenta">
                    {s}
                  </span>
                ))}
              </div>
              <p className="mt-4 font-mono text-xs text-muted-foreground">
                <span className="text-neon-green">while</span>(alive) {"{"} keepLearning(); {"}"}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
