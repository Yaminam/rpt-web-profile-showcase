import React from "react";
import {
  ArrowUpRight,
  Award,
  BadgeCheck,
  BookOpen,
  Calendar,
  ExternalLink,
  GraduationCap,
  MapPin,
  Medal,
  PenLine,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import { achievements, articles, coursework, education } from "@/data/portfolio";
import { bookCover, books } from "@/data/books";
import { cn } from "@/lib/utils";

const Kicker = ({ children }: { children: React.ReactNode }) => (
  <p className="font-mono text-xs uppercase tracking-widest text-neon-magenta">{children}</p>
);

/** Animated CGPA ring (out of 10). */
const CgpaRing = ({ value }: { value: number }) => {
  const r = 70;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative mx-auto h-48 w-48 shrink-0">
      <svg viewBox="0 0 180 180" className="h-full w-full -rotate-90" aria-hidden>
        <defs>
          <linearGradient id="cgpa-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00f0ff" />
            <stop offset="55%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#ff2bd6" />
          </linearGradient>
        </defs>
        <circle cx="90" cy="90" r={r} fill="none" stroke="currentColor" strokeWidth="10" className="text-muted/40" />
        <circle
          cx="90"
          cy="90"
          r={r}
          fill="none"
          stroke="url(#cgpa-grad)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - value / 10)}
          className="ring-draw drop-shadow-[0_0_10px_rgba(0,240,255,0.55)]"
          style={{ ["--ring-c" as string]: c }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-5xl font-extrabold text-foreground">{value}</span>
        <span className="font-mono text-xs text-muted-foreground">CGPA / 10</span>
      </div>
    </div>
  );
};

type TagMeta = { icon: LucideIcon; text: string; ring: string; glow: string };
const tagMeta: Record<string, TagMeta> = {
  National: { icon: Trophy, text: "text-neon-yellow", ring: "border-neon-yellow/40 bg-neon-yellow/10", glow: "rgba(253,224,71,0.18)" },
  Finalist: { icon: Medal, text: "text-neon-cyan", ring: "border-neon-cyan/40 bg-neon-cyan/10", glow: "rgba(0,240,255,0.16)" },
  Certified: { icon: BadgeCheck, text: "text-neon-green", ring: "border-neon-green/40 bg-neon-green/10", glow: "rgba(57,255,20,0.12)" },
  "IIT Guwahati": { icon: GraduationCap, text: "text-neon-purple", ring: "border-neon-purple/40 bg-neon-purple/10", glow: "rgba(168,85,247,0.18)" },
};
const defaultTag: TagMeta = { icon: Award, text: "text-neon-magenta", ring: "border-neon-magenta/40 bg-neon-magenta/10", glow: "rgba(255,43,214,0.15)" };

/**
 * /education body: the degree with an animated CGPA ring, a timeline from school to B.Tech,
 * achievements as a trophy wall, and learning-by-writing (book shelf + dev.to articles).
 */
const EducationDetail = () => {
  const degree = education[0];
  const cgpa = Number(degree.degree.match(/CGPA:\s*([\d.]+)/)?.[1] ?? 0);
  const degreeName = degree.degree.replace(/\s*\(CGPA[^)]*\)/, "").replace(" — ", " in ");
  const timeline = [...education].reverse();
  const [headline, ...rest] = achievements;
  const head = tagMeta[headline.tag] ?? defaultTag;

  return (
    <>
      {/* Degree */}
      <section className="section-padding pb-10">
        <div className="container mx-auto">
          <Reveal>
            <div className="terminal-window animated-border relative overflow-hidden">
              <div className="terminal-bar">
                <span className="terminal-dot bg-red-500/80" />
                <span className="terminal-dot bg-yellow-400/80" />
                <span className="terminal-dot bg-green-500/80" />
                <span className="ml-3 font-mono text-xs text-muted-foreground">degree.json</span>
              </div>
              <div className="grid items-center gap-10 p-6 md:p-10 lg:grid-cols-[auto_1fr]">
                <CgpaRing value={cgpa} />
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-neon-cyan/40 bg-neon-cyan/10 px-3 py-1 font-mono text-xs text-neon-cyan">
                    <GraduationCap className="h-3.5 w-3.5" /> undergraduate degree
                  </span>
                  <h2 className="mt-4 font-display text-2xl font-bold leading-tight md:text-4xl">{degreeName}</h2>
                  <p className="mt-2 font-mono text-neon-magenta">{degree.school}</p>
                  <div className="mt-4 flex flex-wrap gap-2 font-mono text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-muted/40 px-2.5 py-1">
                      <Calendar className="h-3.5 w-3.5 text-neon-cyan" /> {degree.period}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-muted/40 px-2.5 py-1">
                      <MapPin className="h-3.5 w-3.5 text-neon-cyan" /> {degree.location}
                    </span>
                  </div>
                  <p className="mt-6 font-mono text-xs text-muted-foreground">
                    <span className="text-neon-green">$</span> ls ./coursework
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {coursework.map((s, i) => (
                      <li
                        key={s}
                        className="opacity-0 animate-fade-in rounded-lg border border-neon-purple/30 bg-neon-purple/5 px-3 py-1.5 font-mono text-xs text-foreground/90 transition-all hover:-translate-y-0.5 hover:border-neon-purple hover:text-neon-purple"
                        style={{ animationDelay: `${400 + i * 70}ms` }}
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding pt-6">
        <div className="container mx-auto">
          <Reveal>
            <Kicker>./timeline</Kicker>
            <h2 className="mt-2 font-display text-2xl font-bold md:text-3xl">From school to B.Tech</h2>
          </Reveal>
          <ol className="relative mt-10 grid gap-8 md:grid-cols-3 md:gap-6">
            <span
              aria-hidden
              className="line-flow absolute bottom-0 left-[11px] top-0 w-px bg-gradient-to-b from-neon-cyan via-neon-magenta to-neon-cyan md:bottom-auto md:left-0 md:right-0 md:top-[11px] md:h-px md:w-auto md:bg-gradient-to-r"
            />
            {timeline.map((e, i) => {
              const last = i === timeline.length - 1;
              return (
                <Reveal as="li" key={e.degree} delay={i * 140} className="relative pl-10 md:pl-0 md:pt-10">
                  <span
                    aria-hidden
                    className={cn(
                      "absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full border bg-terminal-bg",
                      last ? "border-neon-magenta" : "border-neon-cyan"
                    )}
                  >
                    <span className={cn("h-2.5 w-2.5 rounded-full", last ? "animate-glow-pulse bg-neon-magenta" : "bg-neon-cyan")} />
                  </span>
                  <div className={cn("cyber-card h-full p-5 transition-transform duration-300 hover:-translate-y-1", last && "border-neon-magenta/40")}>
                    <span className={cn("font-display text-2xl font-extrabold", last ? "text-neon-magenta" : "text-neon-cyan")}>
                      {e.period.replace(/\s*—\s*/, "–")}
                    </span>
                    <h3 className="mt-2 font-display font-bold leading-snug">{e.degree.replace(/\s*\(CGPA[^)]*\)/, "")}</h3>
                    <p className="mt-1 font-mono text-sm text-muted-foreground">{e.school}</p>
                    <p className="mt-1 flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" /> {e.location}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Achievements */}
      <section className="section-padding pt-6">
        <div className="container mx-auto">
          <Reveal>
            <Kicker>./achievements</Kicker>
            <h2 className="mt-2 font-display text-2xl font-bold md:text-3xl">Achievements & certifications</h2>
          </Reveal>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            <Reveal className="lg:col-span-2 lg:row-span-3">
              <div className="cyber-card relative flex h-full flex-col justify-between overflow-hidden p-8 md:p-10">
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 animate-aurora"
                  style={{ background: `radial-gradient(circle, ${head.glow} 0%, transparent 70%)` }}
                />
                <div className="relative flex items-start justify-between gap-6">
                  <span className={cn("rounded-full border px-3 py-1 font-mono text-xs uppercase tracking-wider", head.ring, head.text)}>
                    {headline.tag}
                  </span>
                  <span className="relative flex h-24 w-24 items-center justify-center">
                    <span aria-hidden className="absolute inset-0 rounded-full border border-dashed border-neon-yellow/40 animate-spin-slow" />
                    <span aria-hidden className="absolute inset-3 rounded-full border border-neon-yellow/20" />
                    <Trophy className="h-10 w-10 text-neon-yellow drop-shadow-[0_0_12px_rgba(253,224,71,0.6)] animate-float" />
                  </span>
                </div>
                <div className="relative mt-8">
                  <p className="font-display text-6xl font-extrabold leading-none text-neon-yellow md:text-8xl">Top 10</p>
                  <h3 className="mt-4 font-display text-2xl font-bold md:text-3xl">Smart India Hackathon</h3>
                  <p className="mt-3 max-w-xl leading-relaxed text-muted-foreground">{headline.detail}</p>
                  <dl className="mt-6 flex flex-wrap gap-3">
                    {[
                      ["200+", "teams competed"],
                      ["National", "level hackathon"],
                    ].map(([v, l]) => (
                      <div key={l} className="rounded-lg border border-border bg-terminal-bg/60 px-4 py-3">
                        <dt className="sr-only">{l}</dt>
                        <dd>
                          <span className="block font-display text-xl font-bold text-foreground">{v}</span>
                          <span className="text-xs text-muted-foreground">{l}</span>
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </Reveal>
            {rest.map((a, i) => {
              const m = tagMeta[a.tag] ?? defaultTag;
              return (
                <Reveal key={a.title} delay={(i + 1) * 100}>
                  <div className="cyber-card group relative h-full overflow-hidden p-6 transition-transform duration-300 hover:-translate-y-1">
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -right-14 -top-14 h-40 w-40 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{ background: `radial-gradient(circle, ${m.glow} 0%, transparent 70%)` }}
                    />
                    <div className="relative flex items-center gap-3">
                      <span className={cn("flex h-10 w-10 items-center justify-center rounded-lg border transition-transform group-hover:scale-110", m.ring, m.text)}>
                        <m.icon className="h-5 w-5" />
                      </span>
                      <span className={cn("font-mono text-[11px] uppercase tracking-widest", m.text)}>{a.tag}</span>
                    </div>
                    <h3 className="relative mt-4 font-display font-bold leading-snug">{a.title}</h3>
                    <p className="relative mt-1.5 text-sm leading-relaxed text-muted-foreground">{a.detail}</p>
                    {a.link && (
                      <a
                        href={a.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative mt-3 inline-flex items-center gap-1.5 font-mono text-xs text-neon-cyan hover:underline"
                      >
                        <ExternalLink className="h-3.5 w-3.5" /> view certificate
                      </a>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Learning by writing */}
      <section className="section-padding pt-6">
        <div className="container mx-auto">
          <Reveal>
            <Kicker>./learning</Kicker>
            <h2 className="mt-2 font-display text-2xl font-bold md:text-3xl">Learning by writing</h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              The fastest way I've found to really understand something is to explain it. So I write books and articles about what I study
              and build.
            </p>
          </Reveal>

          <Reveal className="mt-10">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h3 className="flex items-center gap-2 font-display text-xl font-bold">
                <BookOpen className="h-5 w-5 text-neon-magenta" /> The Job-Ready Series
                <span className="font-mono text-sm font-normal text-muted-foreground">· {books.length} books</span>
              </h3>
              <a href="/books" className="btn-ghost py-2 text-xs">
                free_previews <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
            <ul className="mt-6 grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-7">
              {books.map((b, i) => (
                <li key={b.slug} className="opacity-0 animate-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
                  <a href={`/books/${b.slug}`} className="group block" title={b.title}>
                    <img
                      src={bookCover(b.slug)}
                      alt={`${b.title} book cover`}
                      width={847}
                      height={1200}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[847/1200] w-full rounded-md border border-border object-cover shadow-[0_12px_30px_-12px_rgba(0,0,0,0.9)] transition-all duration-300 group-hover:-translate-y-2 group-hover:-rotate-2 group-hover:border-neon-magenta/60 group-hover:shadow-[0_18px_40px_-14px_rgba(255,43,214,0.55)]"
                    />
                    <span className="mt-2 block truncate font-mono text-[11px] text-muted-foreground group-hover:text-neon-magenta">
                      {b.shortTitle}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="mt-12">
            <h3 className="flex items-center gap-2 font-display text-xl font-bold">
              <PenLine className="h-5 w-5 text-neon-cyan" /> Technical articles
              <span className="font-mono text-sm font-normal text-muted-foreground">· on dev.to</span>
            </h3>
          </Reveal>
          <ul className="mt-6 grid gap-5 md:grid-cols-2">
            {articles.map((a, i) => (
              <Reveal as="li" key={a.url} delay={(i % 2) * 100}>
                <a
                  href={a.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-event="article_click"
                  className="cyber-card group flex h-full flex-col p-6 hover:border-neon-cyan/60"
                >
                  <span className="flex items-center justify-between font-mono text-[11px] uppercase tracking-widest text-neon-cyan">
                    article #{String(i + 1).padStart(2, "0")}
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neon-cyan" />
                  </span>
                  <span className="mt-3 font-display text-lg font-bold leading-snug group-hover:text-neon-cyan">{a.title}</span>
                  <span className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{a.about}</span>
                  <span className="mt-4 flex flex-wrap gap-1.5">
                    {a.tags.map((t) => (
                      <span key={t} className="rounded-md border border-border bg-muted/30 px-2 py-0.5 font-mono text-[11px] text-foreground/80">
                        {t}
                      </span>
                    ))}
                  </span>
                </a>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default EducationDetail;
