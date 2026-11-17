import React, { useEffect, useState } from "react";
import { ArrowUpRight, Check, Copy, FileDown, Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import Reveal from "@/components/Reveal";
import { contactReasons, mailtoFor, profile } from "@/data/portfolio";

/** Current time in Noida, filled in after mount so the prerendered HTML stays stable. */
const useIstTime = () => {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true, timeZone: "Asia/Kolkata" });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const t = window.setInterval(tick, 30_000);
    return () => window.clearInterval(t);
  }, []);
  return time;
};

/**
 * /contact body: a wide two-column layout. Left: pick a topic (opens a pre-written email) and every
 * channel with copy buttons. Right: availability, location and the resume.
 */
const ContactDetail = () => {
  const [copied, setCopied] = useState<string | null>(null);
  const time = useIstTime();

  const copy = async (label: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
      window.setTimeout(() => setCopied(null), 1600);
    } catch {
      /* clipboard blocked: the value is still visible to copy by hand */
    }
  };

  const channels = [
    { label: "email", value: profile.email, href: `mailto:${profile.email}`, icon: Mail, copy: true },
    { label: "phone", value: profile.phone, href: `tel:${profile.phoneHref}`, icon: Phone, copy: true },
    { label: "linkedin", value: "in/shreyashtripathi9", href: profile.linkedin, icon: Linkedin, external: true },
    { label: "github", value: "github.com/Yaminam", href: profile.github, icon: Github, external: true },
  ];

  return (
    <section className="section-padding">
      <div className="container mx-auto grid gap-6 lg:grid-cols-5">
        <Reveal className="lg:col-span-3">
          <div className="terminal-window animated-border relative h-full overflow-hidden">
            <div className="terminal-bar">
              <span className="terminal-dot bg-red-500/80" />
              <span className="terminal-dot bg-yellow-400/80" />
              <span className="terminal-dot bg-green-500/80" />
              <span className="ml-3 font-mono text-xs text-muted-foreground">contact — bash</span>
            </div>
            <div className="p-6 md:p-8">
              <h2 className="font-display text-2xl font-bold md:text-3xl">What's it about?</h2>
              <p className="mt-2 text-sm text-muted-foreground">Pick one and your mail app opens with a short note already written.</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {contactReasons.map((r, i) => (
                  <a
                    key={r.id}
                    href={mailtoFor(profile.email, r)}
                    data-event={`contact_reason_${r.id}`}
                    className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-muted/20 px-4 py-3.5 text-left font-mono text-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-neon-cyan/60 hover:bg-neon-cyan/5 opacity-0 animate-fade-in"
                    style={{ animationDelay: `${200 + i * 80}ms` }}
                  >
                    <span>
                      <span className="text-neon-magenta">./</span>
                      {r.label.toLowerCase().replace(/\s+/g, "_")}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neon-cyan" />
                  </a>
                ))}
              </div>

              <p className="mt-8 font-mono text-xs text-muted-foreground">
                <span className="text-neon-green">$</span> ls ./channels
              </p>
              <ul className="mt-3 divide-y divide-border rounded-xl border border-border">
                {channels.map((c) => (
                  <li key={c.label} className="group flex items-center gap-4 px-4 py-3.5 transition-colors hover:bg-muted/20">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-neon-cyan/30 bg-neon-cyan/5 text-neon-cyan transition-transform group-hover:scale-110">
                      <c.icon className="h-4 w-4" />
                    </span>
                    <a
                      href={c.href}
                      {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      data-event={`contact_${c.label}`}
                      className="min-w-0 flex-1"
                    >
                      <span className="block font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{c.label}</span>
                      <span className="block truncate text-sm font-medium text-foreground group-hover:text-neon-cyan">{c.value}</span>
                    </a>
                    {c.copy ? (
                      <button
                        type="button"
                        onClick={() => copy(c.label, c.value)}
                        aria-label={`Copy ${c.label}`}
                        className="flex h-8 items-center gap-1.5 rounded-md border border-border px-2.5 font-mono text-[11px] text-muted-foreground transition-colors hover:border-neon-cyan/60 hover:text-neon-cyan"
                      >
                        {copied === c.label ? <Check className="h-3.5 w-3.5 text-neon-green" /> : <Copy className="h-3.5 w-3.5" />}
                        {copied === c.label ? "copied" : "copy"}
                      </button>
                    ) : (
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-neon-cyan" />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120} className="lg:col-span-2">
          <div className="flex h-full flex-col gap-6">
            <div className="cyber-card relative flex-1 overflow-hidden p-6 md:p-8">
              <span
                aria-hidden
                className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 animate-aurora"
                style={{ background: "radial-gradient(circle, rgba(57,255,20,0.16) 0%, transparent 70%)" }}
              />
              <p className="relative inline-flex items-center gap-2 rounded-full border border-neon-green/40 bg-neon-green/10 px-3 py-1 font-mono text-xs text-neon-green">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-green opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-green" />
                </span>
                available
              </p>
              <h2 className="relative mt-4 font-display text-2xl font-bold">Open to work</h2>
              <ul className="relative mt-4 space-y-3 text-sm">
                {[
                  "Full-time roles: frontend, full-stack or backend",
                  "Freelance: web apps, mobile apps, Shopify stores, SEO",
                  "On-site in Noida and Delhi NCR, or remote",
                ].map((t) => (
                  <li key={t} className="flex gap-2.5 text-muted-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-neon-green" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="cyber-card flex items-center gap-4 p-6">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-neon-magenta/40 bg-neon-magenta/10 text-neon-magenta">
                <MapPin className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display font-bold">{profile.location}</p>
                <p className="font-mono text-xs text-muted-foreground">
                  IST (UTC+5:30){time && <span className="text-neon-cyan"> · {time} there now</span>}
                </p>
              </div>
            </div>

            <a
              href={profile.resume}
              download
              data-event="contact_resume"
              className="cyber-card group flex items-center justify-between gap-4 p-6 hover:border-neon-cyan/60"
            >
              <span className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-neon-cyan/40 bg-neon-cyan/10 text-neon-cyan">
                  <FileDown className="h-5 w-5 transition-transform group-hover:translate-y-0.5" />
                </span>
                <span>
                  <span className="block font-display font-bold">Download resume</span>
                  <span className="font-mono text-xs text-muted-foreground">PDF</span>
                </span>
              </span>
              <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-neon-cyan" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default ContactDetail;
