import React from "react";
import { GraduationCap, Trophy, Calendar, MapPin } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { education, coursework, achievements } from "@/data/portfolio";

const EducationSection = () => {
  return (
    <section id="education" className="section-padding">
      <div className="container mx-auto">
        <Reveal>
          <SectionHeading
            index="05."
            command="cat education.json"
            title="Education & Achievements"
            subtitle="Academic foundation and milestones along the way."
          />
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          {/* Education timeline */}
          <Reveal>
            <div className="cyber-card h-full p-6 md:p-8">
              <div className="mb-6 flex items-center gap-3">
                <span className="rounded-lg border border-neon-cyan/30 bg-neon-cyan/5 p-3 text-neon-cyan">
                  <GraduationCap className="h-6 w-6" />
                </span>
                <h3 className="font-display text-xl font-bold text-foreground">Education</h3>
              </div>

              <div className="relative space-y-6 pl-6">
                <div className="absolute left-[5px] top-2 bottom-2 w-px bg-gradient-to-b from-neon-cyan via-neon-purple to-transparent" />
                {education.map((edu) => (
                  <div key={edu.degree} className="relative">
                    <span className="absolute -left-[23px] top-1.5 h-2.5 w-2.5 rounded-full bg-neon-cyan shadow-neon-cyan" />
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="font-semibold text-foreground">{edu.degree}</h4>
                      {edu.current && (
                        <span className="rounded-full border border-neon-green/40 bg-neon-green/10 px-2 py-0.5 font-mono text-[10px] text-neon-green">
                          now
                        </span>
                      )}
                    </div>
                    <p className="font-mono text-sm text-neon-magenta">{edu.school}</p>
                    <div className="mt-1 flex flex-wrap gap-x-5 gap-y-1 font-mono text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-neon-cyan" />
                        {edu.period}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-neon-cyan" />
                        {edu.location}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mb-3 mt-7 font-mono text-xs uppercase tracking-widest text-neon-magenta">
                ./coursework
              </p>
              <div className="flex flex-wrap gap-2">
                {coursework.map((s) => (
                  <span key={s} className="chip">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Achievements */}
          <Reveal delay={120}>
            <div className="cyber-card h-full p-6 md:p-8">
              <div className="mb-5 flex items-center gap-3">
                <span className="rounded-lg border border-neon-magenta/30 bg-neon-magenta/5 p-3 text-neon-magenta">
                  <Trophy className="h-6 w-6" />
                </span>
                <h3 className="font-display text-xl font-bold text-foreground">
                  Achievements & Certifications
                </h3>
              </div>

              <ul className="space-y-3">
                {achievements.map((a) => (
                  <li
                    key={a.title}
                    className="flex items-start gap-3 rounded-md border border-border/60 bg-muted/30 p-3 transition-colors hover:border-neon-magenta/40"
                  >
                    <span className="mt-0.5 shrink-0 rounded border border-neon-magenta/30 bg-neon-magenta/5 px-2 py-0.5 font-mono text-[10px] text-neon-magenta">
                      {a.tag}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{a.title}</p>
                      <p className="text-xs text-muted-foreground">{a.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
