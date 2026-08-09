import React from "react";
import {
  Code2,
  Cpu,
  Rocket,
  MapPin,
  GraduationCap,
  Briefcase,
  Clock,
  Zap,
  Wrench,
  Package,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import { profile, stats, strengths } from "@/data/portfolio";

const parseStat = (value: string) => {
  const num = parseInt(value, 10) || 0;
  const suffix = value.replace(/[0-9]/g, "");
  return { num, suffix };
};

const accentText: Record<string, string> = {
  cyan: "text-neon-cyan",
  magenta: "text-neon-magenta",
  green: "text-neon-green",
};
const accentBar: Record<string, string> = {
  cyan: "from-neon-cyan",
  magenta: "from-neon-magenta",
  green: "from-neon-green",
};

const highlights = [
  {
    icon: Code2,
    accent: "cyan",
    title: "Frontend Engineering",
    text: "Production UI across React, Next.js (App Router) and TypeScript — from responsive layout to backend integration.",
  },
  {
    icon: Cpu,
    accent: "magenta",
    title: "AI & Automation",
    text: "Shipping AI-powered features and content pipelines that cut manual work by ~40%.",
  },
  {
    icon: Rocket,
    accent: "green",
    title: "Ships Real Products",
    text: "From hackathon finalist to production deploys across a live agency portfolio of client and SaaS products.",
  },
];

const facts = [
  { icon: MapPin, label: "Based in", value: profile.location },
  { icon: GraduationCap, label: "Education", value: "B.Tech CSE, JECRC University" },
  { icon: Briefcase, label: "Currently", value: "Junior Developer, UI/UX @ Garage Collective" },
];

// icon + accent per stat (matched to portfolio.ts order)
const statMeta = [
  { icon: Clock, accent: "cyan" },
  { icon: Zap, accent: "magenta" },
  { icon: Wrench, accent: "green" },
  { icon: Package, accent: "cyan" },
];

const AboutSection = () => {
  return (
    <section id="about" className="section-padding">
      <div className="container mx-auto">
        <Reveal>
          <SectionHeading
            index="01."
            command="cat about.md"
            title="About Me"
            subtitle="Frontend-focused engineer and UI/UX builder who turns ideas into clean, scalable, production-ready interfaces."
          />
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          {/* Bio + highlights */}
          <Reveal className="space-y-6">
            <div className="cyber-card p-6 md:p-8">
              <p className="font-mono text-sm leading-relaxed text-muted-foreground">
                <span className="text-neon-green">/**</span>
                <br />
                <span className="text-neon-cyan"> * </span>
                {profile.summary}
                <br />
                <span className="text-neon-cyan"> * </span>I enjoy thoughtful UI, clean
                design systems, and shipping features that people actually use.
                <br />
                <span className="text-neon-green"> */</span>
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {highlights.map((h) => (
                <div key={h.title} className="cyber-card p-5">
                  <span
                    className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-muted/40 ${accentText[h.accent]}`}
                  >
                    <h.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mb-1 font-display text-sm font-bold text-foreground">
                    {h.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-muted-foreground">{h.text}</p>
                </div>
              ))}
            </div>

            <div className="cyber-card p-6">
              <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-neon-magenta">
                ./strengths
              </h3>
              <div className="flex flex-wrap gap-2">
                {strengths.map((s) => (
                  <span key={s} className="chip-magenta">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Quick facts + stats */}
          <Reveal delay={120} className="space-y-6">
            <div className="cyber-card p-6">
              <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-neon-magenta">
                ./quick-facts
              </h3>
              <ul className="space-y-4">
                {facts.map((f) => (
                  <li key={f.label} className="flex items-start gap-3">
                    <span className="mt-0.5 rounded-md border border-neon-cyan/30 bg-neon-cyan/5 p-1.5 text-neon-cyan">
                      <f.icon className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                        {f.label}
                      </p>
                      <p className="text-sm text-foreground">{f.value}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {stats.map((s, i) => {
                const { num, suffix } = parseStat(s.value);
                const meta = statMeta[i % statMeta.length];
                return (
                  <div
                    key={s.label}
                    className="cyber-card relative overflow-hidden p-4 text-center"
                  >
                    <span
                      className={`absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r ${accentBar[meta.accent]} to-transparent opacity-60`}
                    />
                    <meta.icon
                      className={`mx-auto mb-1.5 h-4 w-4 ${accentText[meta.accent]}`}
                    />
                    <CountUp
                      end={num}
                      suffix={suffix}
                      className="gradient-text font-display text-3xl font-extrabold"
                    />
                    <p className="mt-1 text-[11px] leading-tight text-muted-foreground">
                      {s.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
