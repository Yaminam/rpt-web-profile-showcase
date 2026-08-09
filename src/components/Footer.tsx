import React from "react";
import { ArrowUp, Github, Linkedin, Mail, Phone, MapPin, FileDown } from "lucide-react";
import { profile, navItems } from "@/data/portfolio";
import { useTypewriter } from "@/hooks/use-typewriter";
import MatrixRain from "@/components/MatrixRain";

const openMail = () => window.dispatchEvent(new Event("mail:open"));

const Footer = () => {
  const typed = useTypewriter(
    ["thanks for scrolling :)", "let's build something", "let's collaborate"],
    { typeSpeed: 65, deleteSpeed: 30, pause: 1800 }
  );

  const socials = [
    { icon: Github, href: profile.github, label: "GitHub" },
    { icon: Linkedin, href: profile.linkedin, label: "LinkedIn" },
    { icon: Mail, onClick: openMail, label: "Email" },
    { icon: Phone, href: `tel:${profile.phoneHref}`, label: "Phone" },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-neon-cyan/15 bg-terminal-bg">
      {/* Matrix rain backdrop */}
      <MatrixRain className="absolute inset-0 h-full w-full opacity-[0.18]" color="#39ff14" />
      <div className="absolute inset-0 bg-gradient-to-t from-terminal-bg via-terminal-bg/85 to-terminal-bg/60" />
      <div className="bg-grid-lines absolute inset-0 bg-[length:40px_40px] opacity-20" />

      <div className="container relative z-10 mx-auto px-5 py-16">
        {/* CTA */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="section-label">./let's-connect</p>
          <h2 className="mt-3 font-display text-3xl font-extrabold md:text-5xl">
            <span className="shimmer-text">Let's build the future</span>
          </h2>
          <p className="mt-4 font-mono text-sm text-muted-foreground">
            <span className="text-neon-green">$</span> echo "
            <span className="text-foreground">{typed}</span>
            <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-neon-cyan animate-blink" />
            "
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <button type="button" onClick={openMail} className="btn-neon">
              <Mail className="h-4 w-4" /> say_hello
            </button>
            <a href={profile.resume} download className="btn-ghost">
              <FileDown className="h-4 w-4" /> resume.pdf
            </a>
          </div>
        </div>

        {/* Columns */}
        <div className="grid gap-10 border-t border-neon-cyan/10 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-2">
            <a href="#home" className="font-mono text-xl font-bold text-foreground">
              Shreyash <span className="text-neon-cyan">Tripathi</span>
            </a>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {profile.role} — building clean, accessible interfaces across React & Next.js
              products, with hands-on AI integration experience.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-md border border-neon-green/40 bg-neon-green/5 px-3 py-1.5 font-mono text-xs text-neon-green">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-green opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-green" />
              </span>
              building @ Garage Collective
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-neon-cyan">
              ./navigate
            </h3>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="group inline-flex items-center gap-2 font-mono text-sm text-muted-foreground transition-colors hover:text-neon-cyan"
                  >
                    <span className="text-neon-magenta/60 transition-transform group-hover:translate-x-1">
                      ›
                    </span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-neon-cyan">
              ./contact
            </h3>
            <ul className="space-y-3 font-mono text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-neon-cyan" />
                <button
                  type="button"
                  onClick={openMail}
                  className="break-all text-left hover:text-neon-cyan"
                >
                  {profile.email}
                </button>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-neon-cyan" />
                <a href={`tel:${profile.phoneHref}`} className="hover:text-neon-cyan">
                  {profile.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-neon-cyan" />
                {profile.location}
              </li>
            </ul>

            <div className="mt-5 flex items-center gap-3">
              {socials.map((s) =>
                s.onClick ? (
                  <button
                    key={s.label}
                    type="button"
                    onClick={s.onClick}
                    aria-label={s.label}
                    className="rounded-md border border-border bg-card/40 p-2 text-muted-foreground transition-all hover:-translate-y-1 hover:border-neon-cyan hover:text-neon-cyan hover:shadow-neon-cyan"
                  >
                    <s.icon className="h-4 w-4" />
                  </button>
                ) : (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="rounded-md border border-border bg-card/40 p-2 text-muted-foreground transition-all hover:-translate-y-1 hover:border-neon-cyan hover:text-neon-cyan hover:shadow-neon-cyan"
                  >
                    <s.icon className="h-4 w-4" />
                  </a>
                )
              )}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-neon-cyan/10 pt-7 font-mono text-xs text-muted-foreground md:flex-row">
          <p>
            © {new Date().getFullYear()} {profile.name} — all rights reserved.
          </p>
          <a
            href="#home"
            aria-label="Back to top"
            className="group flex items-center gap-2 rounded-md border border-neon-cyan/30 bg-neon-cyan/5 px-3 py-1.5 text-neon-cyan transition-all hover:bg-neon-cyan hover:text-terminal-bg"
          >
            <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
            top
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
