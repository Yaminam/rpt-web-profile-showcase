import React from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Calendar,
  Globe,
  LayoutDashboard,
  MapPin,
  ShieldCheck,
  Smartphone,
  TrendingUp,
  Wrench,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import { experience, workStreams, type WorkStream } from "@/data/portfolio";
import { cn } from "@/lib/utils";

type Area = WorkStream["area"];

const areaStyle: Record<Area, { icon: React.ElementType; text: string; border: string; bar: string; glow: string }> = {
  mobile: { icon: Smartphone, text: "text-neon-cyan", border: "hover:border-neon-cyan/60", bar: "from-neon-cyan", glow: "rgba(0,240,255,0.16)" },
  "design systems": { icon: LayoutDashboard, text: "text-neon-purple", border: "hover:border-neon-purple/60", bar: "from-neon-purple", glow: "rgba(168,85,247,0.18)" },
  AI: { icon: Bot, text: "text-neon-magenta", border: "hover:border-neon-magenta/60", bar: "from-neon-magenta", glow: "rgba(255,43,214,0.15)" },
  SaaS: { icon: TrendingUp, text: "text-neon-green", border: "hover:border-neon-green/60", bar: "from-neon-green", glow: "rgba(57,255,20,0.12)" },
  web: { icon: Globe, text: "text-neon-yellow", border: "hover:border-neon-yellow/60", bar: "from-neon-yellow", glow: "rgba(253,224,71,0.12)" },
  security: { icon: ShieldCheck, text: "text-neon-cyan", border: "hover:border-neon-cyan/60", bar: "from-neon-cyan", glow: "rgba(0,240,255,0.16)" },
  toolbox: { icon: Wrench, text: "text-neon-purple", border: "hover:border-neon-purple/60", bar: "from-neon-purple", glow: "rgba(168,85,247,0.18)" },
};

const initialsOf = (name: string) =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

/** Every tool named in the work streams, once, for the role panel. */
const stackUsed = Array.from(
  new Set(workStreams.filter((w) => w.area !== "toolbox").flatMap((w) => w.stack))
).filter((s) => !["Instagram", "LinkedIn", "Blog", "Analytics", "Dashboards", "Dark mode"].includes(s));

const StreamCard = ({ stream, index }: { stream: WorkStream; index: number }) => {
  const s = areaStyle[stream.area];
  const Icon = s.icon;
  const body = (
    <>
      <span
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(circle, ${s.glow} 0%, transparent 70%)` }}
      />
      <span aria-hidden className={cn("absolute inset-x-0 top-0 h-px bg-gradient-to-r to-transparent", s.bar)} />
      <span aria-hidden className="absolute right-5 top-4 font-display text-4xl font-extrabold text-foreground/[0.04]">
        {String(index + 1).padStart(2, "0")}
      </span>

      <span className="relative flex items-center gap-3">
        <span className={cn("flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-muted/30", s.text)}>
          <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6" />
        </span>
        <span className={cn("font-mono text-[11px] uppercase tracking-widest", s.text)}>{stream.area}</span>
      </span>

      <span className="relative mt-4 flex items-start justify-between gap-4">
        <h3 className="font-display text-lg font-bold leading-snug md:text-xl">{stream.title}</h3>
        {stream.metric && (
          <span className="shrink-0 text-right">
            <span className={cn("block font-display text-2xl font-extrabold leading-none md:text-3xl", s.text)}>
              {stream.metric.value}
            </span>
            <span className="mt-1 block max-w-[8rem] text-[11px] leading-tight text-muted-foreground">{stream.metric.label}</span>
          </span>
        )}
      </span>

      <span className="relative mt-3 block text-sm leading-relaxed text-muted-foreground">{stream.text}</span>

      <span className="relative mt-auto flex flex-wrap items-center gap-1.5 pt-5">
        {stream.stack.map((t) => (
          <span key={t} className="rounded-md border border-border bg-muted/30 px-2 py-0.5 font-mono text-[11px] text-foreground/80">
            {t}
          </span>
        ))}
        {stream.slug && (
          <span className={cn("ml-auto inline-flex items-center gap-1 font-mono text-xs", s.text)}>
            case_study <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        )}
      </span>
    </>
  );
  const cls = cn(
    "cyber-card group relative flex h-full flex-col overflow-hidden p-6 transition-all duration-300 hover:-translate-y-1",
    s.border
  );
  return stream.slug ? (
    <a href={`/projects/${stream.slug}`} className={cls}>
      {body}
    </a>
  ) : (
    <div className={cls}>{body}</div>
  );
};

/**
 * /experience body: the role as a wide panel (promotion path, stack used) and the work behind it
 * as a bento grid of streams, each linking to its case study where there is one.
 */
const ExperienceDetail = () => {
  const job = experience[0];
  return (
    <>
      <section className="section-padding pb-10">
        <div className="container mx-auto">
          <Reveal>
            <div className="terminal-window animated-border relative overflow-hidden">
              <div className="terminal-bar">
                <span className="terminal-dot bg-red-500/80" />
                <span className="terminal-dot bg-yellow-400/80" />
                <span className="terminal-dot bg-green-500/80" />
                <span className="ml-3 font-mono text-xs text-muted-foreground">experience.log — {job.company.toLowerCase().replace(/\s+/g, "-")}</span>
              </div>

              <div className="grid gap-10 p-6 md:p-10 lg:grid-cols-[1.25fr_1fr]">
                <div>
                  <div className="flex items-center gap-4">
                    <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-neon-cyan/40 bg-neon-cyan/10 font-display text-xl font-bold text-neon-cyan shadow-[0_0_30px_-8px_rgba(0,240,255,0.6)]">
                      {initialsOf(job.company)}
                    </span>
                    <div>
                      <h2 className="font-display text-2xl font-bold leading-tight md:text-3xl">{job.role}</h2>
                      <p className="mt-1 font-mono text-sm text-neon-magenta">{job.company}</p>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2 font-mono text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-muted/40 px-2.5 py-1">
                      <Calendar className="h-3.5 w-3.5 text-neon-cyan" /> {job.period}
                    </span>
                    {job.location && (
                      <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-muted/40 px-2.5 py-1">
                        <MapPin className="h-3.5 w-3.5 text-neon-cyan" /> {job.location}
                      </span>
                    )}
                    {job.current && (
                      <span className="inline-flex items-center gap-1.5 rounded-md border border-neon-green/40 bg-neon-green/10 px-2.5 py-1 text-neon-green">
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-green opacity-75" />
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-green" />
                        </span>
                        current role
                      </span>
                    )}
                  </div>

                  <p className="mt-6 max-w-2xl leading-relaxed text-muted-foreground">
                    At a digital product agency I build and ship production UI and AI-powered features across its client and SaaS
                    portfolio, owning components end to end: a React Native finance app, dashboards and design systems, AI agents,
                    SaaS features and marketing sites.
                  </p>

                  {/* promotion path */}
                  <ol className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <li className="rounded-lg border border-border bg-muted/20 px-4 py-3">
                      <span className="block font-mono text-[11px] uppercase tracking-wider text-muted-foreground">started as</span>
                      <span className="font-display font-bold">AI Trainee</span>
                    </li>
                    <li aria-hidden className="flex items-center gap-2 px-1 font-mono text-[11px] text-neon-green sm:flex-col sm:gap-0.5">
                      <ArrowRight className="h-4 w-4 rotate-90 animate-pulse sm:rotate-0" />
                      promoted
                    </li>
                    <li className="rounded-lg border border-neon-cyan/50 bg-neon-cyan/10 px-4 py-3 shadow-[0_0_24px_-10px_rgba(0,240,255,0.8)]">
                      <span className="block font-mono text-[11px] uppercase tracking-wider text-neon-cyan">now</span>
                      <span className="font-display font-bold">{job.role}</span>
                    </li>
                  </ol>
                </div>

                <div className="rounded-xl border border-border bg-terminal-bg/60 p-5">
                  <p className="font-mono text-xs text-muted-foreground">
                    <span className="text-neon-green">$</span> cat stack.json
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {stackUsed.map((t, i) => (
                      <li
                        key={t}
                        className="opacity-0 animate-fade-in rounded-md border border-neon-cyan/25 bg-neon-cyan/5 px-2.5 py-1 font-mono text-xs text-foreground/90 transition-colors hover:border-neon-cyan hover:text-neon-cyan"
                        style={{ animationDelay: `${300 + i * 45}ms` }}
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                  <dl className="mt-6 grid grid-cols-3 gap-3 border-t border-border pt-5 text-center">
                    {[
                      ["20+", "builds"],
                      [String(workStreams.length - 1), "work streams"],
                      [String(workStreams.filter((w) => w.slug).length), "case studies"],
                    ].map(([v, l]) => (
                      <div key={l}>
                        <dt className="sr-only">{l}</dt>
                        <dd>
                          <span className="block font-display text-2xl font-extrabold text-neon-cyan">{v}</span>
                          <span className="text-[11px] text-muted-foreground">{l}</span>
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-padding pt-6">
        <div className="container mx-auto">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-neon-magenta">./work-streams</p>
            <h2 className="mt-2 font-display text-2xl font-bold md:text-3xl">What I've worked on</h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              The role, broken down by the products I built and improved.
            </p>
          </Reveal>
          <ul className="mt-8 grid grid-flow-dense gap-5 md:grid-cols-2 lg:grid-cols-3">
            {workStreams.map((w, i) => (
              <Reveal as="li" key={w.title} delay={(i % 3) * 90} className={cn("h-full", w.wide && "lg:col-span-2")}>
                <StreamCard stream={w} index={i} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default ExperienceDetail;
