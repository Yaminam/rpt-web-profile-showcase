import React from "react";
import { Mail, Phone, MapPin, Github, Linkedin, FileDown } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { profile } from "@/data/portfolio";

const openMail = () => window.dispatchEvent(new Event("mail:open"));

const ContactSection = () => {
  const channels = [
    { icon: Mail, label: "email", value: profile.email, onClick: openMail },
    { icon: Phone, label: "phone", value: profile.phone, href: `tel:${profile.phoneHref}` },
    { icon: MapPin, label: "location", value: profile.location, href: undefined },
  ];

  return (
    <section id="contact" className="section-padding">
      <div className="container mx-auto">
        <Reveal>
          <SectionHeading
            index="06."
            command="./contact --connect"
            title="Get In Touch"
            subtitle="Currently building @ Garage Collective — open to interesting freelance projects and collaborations. Let's build something."
          />
        </Reveal>

        <Reveal>
          <div className="terminal-window animated-border group relative mx-auto max-w-3xl overflow-hidden">
            <span className="sheen-overlay" aria-hidden />
            <div className="terminal-bar">
              <span className="terminal-dot bg-red-500/80" />
              <span className="terminal-dot bg-yellow-400/80" />
              <span className="terminal-dot bg-green-500/80" />
              <span className="ml-3 font-mono text-xs text-muted-foreground">
                contact — bash
              </span>
            </div>

            <div className="space-y-6 p-6 font-mono text-sm md:p-8">
              <p className="text-muted-foreground">
                <span className="text-neon-green">$</span> echo "Let's connect"
              </p>

              <div className="grid gap-3 sm:grid-cols-3">
                {channels.map((c) => {
                  const content = (
                    <div className="cyber-card flex h-full flex-col gap-2 p-4">
                      <c.icon className="h-5 w-5 text-neon-cyan" />
                      <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
                        {c.label}
                      </span>
                      <span className="break-all text-xs text-foreground">{c.value}</span>
                    </div>
                  );
                  if (c.onClick) {
                    return (
                      <button
                        key={c.label}
                        type="button"
                        onClick={c.onClick}
                        className="block text-left"
                      >
                        {content}
                      </button>
                    );
                  }
                  return c.href ? (
                    <a key={c.label} href={c.href} className="block">
                      {content}
                    </a>
                  ) : (
                    <div key={c.label}>{content}</div>
                  );
                })}
              </div>

              <div className="flex flex-wrap gap-3 pt-1">
                <button type="button" onClick={openMail} className="btn-neon">
                  <Mail className="h-4 w-4" /> say_hello
                </button>
                <a href={profile.resume} download className="btn-ghost">
                  <FileDown className="h-4 w-4" /> resume.pdf
                </a>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                >
                  <Github className="h-4 w-4" /> github
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                >
                  <Linkedin className="h-4 w-4" /> linkedin
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default ContactSection;
