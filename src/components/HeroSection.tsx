import React, { useEffect, useState } from "react";
import { ArrowDown, Github, Linkedin, Mail, FileDown, Sparkles, Activity, TerminalSquare } from "lucide-react";
import { profile } from "@/data/portfolio";
import { useTypewriter } from "@/hooks/use-typewriter";
import { useScramble } from "@/hooks/use-scramble";

/** Live session clock + faux activity meter — makes the HUD feel alive. */
const Telemetry = () => {
  const [secs, setSecs] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setSecs((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);
  const hh = String(Math.floor(secs / 3600)).padStart(2, "0");
  const mm = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
  const ss = String(secs % 60).padStart(2, "0");

  const rows = [
    { k: "session", v: `${hh}:${mm}:${ss}`, accent: "text-neon-cyan" },
    { k: "stack", v: "MERN · Next · AI", accent: "text-foreground" },
    { k: "status", v: "ONLINE", accent: "text-neon-green" },
  ];

  return (
    <div className="cyber-card mt-8 hidden w-full max-w-xs p-4 font-mono text-[11px] md:block">
      <div className="mb-3 flex items-center justify-between border-b border-border/60 pb-2">
        <span className="flex items-center gap-1.5 text-neon-magenta">
          <Activity className="h-3.5 w-3.5" /> system.monitor
        </span>
        {/* equalizer */}
        <span className="flex items-end gap-0.5">
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className="w-0.5 rounded-sm bg-neon-cyan animate-glow-pulse"
              style={{
                height: `${6 + ((i * 5) % 12)}px`,
                animationDelay: `${i * 0.18}s`,
                animationDuration: `${1 + (i % 3) * 0.4}s`,
              }}
            />
          ))}
        </span>
      </div>
      <ul className="space-y-1.5">
        {rows.map((r) => (
          <li key={r.k} className="flex items-center justify-between">
            <span className="text-muted-foreground">{r.k}</span>
            <span className={r.accent}>{r.v}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const HeroSection = () => {
  const typed = useTypewriter(profile.roles);
  const name = useScramble(profile.name, { speed: 38, revealEvery: 2 });

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center pt-24 pb-16"
    >
      <div className="container mx-auto">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Left: terminal */}
          <div className="opacity-0 animate-fade-in">
            <div className="terminal-window animated-border group">
              <span className="sheen-overlay" aria-hidden />
              <div className="terminal-bar">
                <span className="terminal-dot bg-red-500/80" />
                <span className="terminal-dot bg-yellow-400/80" />
                <span className="terminal-dot bg-green-500/80" />
                <span className="ml-3 font-mono text-xs text-muted-foreground">
                  shreyash@portfolio: ~
                </span>
              </div>

              <div className="relative space-y-5 p-6 font-mono text-sm md:p-8">
                <p className="text-muted-foreground">
                  <span className="text-neon-green">$</span> whoami
                </p>

                <div>
                  <h1
                    className="glitch font-display text-4xl font-extrabold leading-tight tracking-tight text-foreground md:text-6xl"
                    data-text={name}
                  >
                    {name}
                  </h1>
                </div>

                <p className="text-base text-muted-foreground md:text-lg">
                  <span className="text-neon-cyan">&gt; role:</span>{" "}
                  <span className="font-semibold text-foreground">{typed}</span>
                  <span className="ml-0.5 inline-block h-5 w-2.5 translate-y-1 bg-neon-cyan animate-blink" />
                </p>

                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="inline-flex items-center gap-2 rounded-md border border-neon-green/40 bg-neon-green/5 px-2.5 py-1 text-neon-green">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-green opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-green" />
                    </span>
                    status: ONLINE — open to work
                  </span>
                  <span className="rounded-md border border-border bg-muted/40 px-2.5 py-1 text-muted-foreground">
                    📍 {profile.location}
                  </span>
                </div>

                <p className="max-w-xl font-sans leading-relaxed text-muted-foreground">
                  <span className="text-neon-cyan">&gt; </span>
                  {profile.summary}
                </p>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 pt-1">
                  <a href="#projects" className="btn-neon">
                    <Sparkles className="h-4 w-4" /> view_projects
                  </a>
                  <button
                    type="button"
                    onClick={() =>
                      window.dispatchEvent(new CustomEvent("terminal:open"))
                    }
                    className="btn-ghost"
                  >
                    <TerminalSquare className="h-4 w-4" /> init_terminal
                  </button>
                  <a href="#contact" className="btn-ghost">
                    <Mail className="h-4 w-4" /> get_in_touch
                  </a>
                  <a href={profile.resume} download className="btn-ghost">
                    <FileDown className="h-4 w-4" /> resume.pdf
                  </a>
                </div>

                {/* Socials */}
                <div className="flex items-center gap-4 pt-2">
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="text-muted-foreground transition-colors hover:text-neon-cyan"
                  >
                    <Github size={20} />
                  </a>
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="text-muted-foreground transition-colors hover:text-neon-cyan"
                  >
                    <Linkedin size={20} />
                  </a>
                  <a
                    href={`mailto:${profile.email}`}
                    aria-label="Email"
                    className="text-muted-foreground transition-colors hover:text-neon-cyan"
                  >
                    <Mail size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: avatar HUD */}
          <div className="flex flex-col items-center opacity-0 animate-fade-in-delay-2">
            <div className="relative">
              {/* Rotating conic ring */}
              <div
                className="absolute -inset-4 rounded-full opacity-70 blur-md animate-spin-slow"
                style={{
                  background:
                    "conic-gradient(from 0deg, #00f0ff, #a855f7, #ff2bd6, #39ff14, #00f0ff)",
                }}
              />
              {/* Dashed scanning ring */}
              <div
                className="absolute -inset-1 rounded-full border border-dashed border-neon-cyan/30 animate-spin-slow"
                style={{ animationDirection: "reverse", animationDuration: "26s" }}
              />

              <div className="relative rounded-full bg-gradient-to-br from-neon-cyan via-neon-purple to-neon-magenta p-[3px] animate-pulse-ring">
                <div className="relative overflow-hidden rounded-full bg-terminal-bg p-2">
                  <img
                    src={profile.photo}
                    alt={profile.name}
                    className="h-56 w-56 rounded-full object-cover object-top md:h-72 md:w-72"
                  />
                  {/* Scan sweep over the photo */}
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-neon-cyan/40 via-neon-cyan/10 to-transparent animate-scan-y" />
                </div>
              </div>

              {/* HUD targeting brackets */}
              <div className="pointer-events-none absolute -inset-3 hidden md:block animate-glow-pulse">
                <span className="hud-corner left-0 top-0 rounded-tl-lg border-l-2 border-t-2" />
                <span className="hud-corner right-0 top-0 rounded-tr-lg border-r-2 border-t-2" />
                <span className="hud-corner bottom-0 left-0 rounded-bl-lg border-b-2 border-l-2" />
                <span className="hud-corner bottom-0 right-0 rounded-br-lg border-b-2 border-r-2" />
              </div>

              {/* Orbiting tech badges */}
              <div className="pointer-events-none absolute left-1/2 top-1/2 hidden md:block">
                <span
                  className="absolute animate-orbit rounded-md border border-neon-cyan/40 bg-terminal-panel/90 px-2.5 py-1 font-mono text-[11px] text-neon-cyan shadow-neon-cyan backdrop-blur"
                  style={{ ["--orbit-r" as string]: "188px" }}
                >
                  {"<MERN/>"}
                </span>
                <span
                  className="absolute animate-orbit-rev rounded-md border border-neon-magenta/40 bg-terminal-panel/90 px-2.5 py-1 font-mono text-[11px] text-neon-magenta backdrop-blur"
                  style={{ ["--orbit-r" as string]: "174px", animationDelay: "-9s" }}
                >
                  AI.automate()
                </span>
                <span
                  className="absolute animate-orbit rounded-md border border-neon-green/40 bg-terminal-panel/90 px-2.5 py-1 font-mono text-[11px] text-neon-green backdrop-blur"
                  style={{ ["--orbit-r" as string]: "188px", animationDelay: "-12s" }}
                >
                  {"{ }"}
                </span>
              </div>
            </div>

            {/* Live telemetry */}
            <Telemetry />
          </div>
        </div>

        {/* Scroll cue */}
        <a
          href="#about"
          aria-label="Scroll to about"
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 font-mono text-xs text-muted-foreground md:flex"
        >
          scroll
          <ArrowDown className="h-4 w-4 animate-bounce text-neon-cyan" />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
