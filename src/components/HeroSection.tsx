import React from "react";
import { ArrowDown, Github, Linkedin, Mail, FileDown, Sparkles } from "lucide-react";
import { profile } from "@/data/portfolio";
import { useTypewriter } from "@/hooks/use-typewriter";

const HeroSection = () => {
  const typed = useTypewriter(profile.roles);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center pt-24 pb-16"
    >
      <div className="container mx-auto">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Left: terminal */}
          <div className="opacity-0 animate-fade-in">
            <div className="terminal-window animated-border">
              <div className="terminal-bar">
                <span className="terminal-dot bg-red-500/80" />
                <span className="terminal-dot bg-yellow-400/80" />
                <span className="terminal-dot bg-green-500/80" />
                <span className="ml-3 font-mono text-xs text-muted-foreground">
                  shreyash@portfolio: ~
                </span>
              </div>

              <div className="space-y-5 p-6 font-mono text-sm md:p-8">
                <p className="text-muted-foreground">
                  <span className="text-neon-green">$</span> whoami
                </p>

                <div>
                  <h1
                    className="glitch font-display text-4xl font-extrabold leading-tight tracking-tight text-foreground md:text-6xl"
                    data-text={profile.name}
                  >
                    {profile.name}
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

          {/* Right: avatar */}
          <div className="flex justify-center opacity-0 animate-fade-in-delay-2">
            <div className="relative">
              {/* Rotating conic ring */}
              <div
                className="absolute -inset-4 rounded-full opacity-70 blur-md animate-spin-slow"
                style={{
                  background:
                    "conic-gradient(from 0deg, #00f0ff, #a855f7, #ff2bd6, #39ff14, #00f0ff)",
                }}
              />
              <div className="relative rounded-full bg-gradient-to-br from-neon-cyan via-neon-purple to-neon-magenta p-[3px] animate-pulse-ring">
                <div className="rounded-full bg-terminal-bg p-2">
                  <img
                    src={profile.photo}
                    alt={profile.name}
                    className="h-56 w-56 rounded-full object-cover object-top md:h-72 md:w-72"
                  />
                </div>
              </div>

              {/* Floating chips */}
              <span className="absolute -left-6 top-8 hidden rounded-md border border-neon-cyan/40 bg-terminal-panel/90 px-3 py-1.5 font-mono text-xs text-neon-cyan shadow-neon-cyan backdrop-blur md:block animate-float">
                {"<MERN/>"}
              </span>
              <span
                className="absolute -right-4 bottom-12 hidden rounded-md border border-neon-magenta/40 bg-terminal-panel/90 px-3 py-1.5 font-mono text-xs text-neon-magenta backdrop-blur md:block animate-float"
                style={{ animationDelay: "2s" }}
              >
                AI.automate()
              </span>
            </div>
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
