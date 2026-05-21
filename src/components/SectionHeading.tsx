import React from "react";

type SectionHeadingProps = {
  index: string;
  command: string;
  title: string;
  subtitle?: string;
};

/** Terminal-styled section heading: `~/section $ command` + glowing title. */
const SectionHeading = ({ index, command, title, subtitle }: SectionHeadingProps) => {
  return (
    <div className="mb-12 md:mb-16">
      <div className="flex items-center gap-3 font-mono text-sm">
        <span className="text-neon-magenta">{index}</span>
        <span className="text-muted-foreground">
          <span className="text-neon-green">~/portfolio</span>
          <span className="text-neon-cyan"> $ </span>
          {command}
          <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-neon-cyan animate-blink" />
        </span>
      </div>
      <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
        {title}
      </h2>
      <div className="mt-3 h-px w-24 bg-gradient-to-r from-neon-cyan via-neon-purple to-transparent" />
      {subtitle && (
        <p className="mt-4 max-w-2xl font-sans text-muted-foreground">{subtitle}</p>
      )}
    </div>
  );
};

export default SectionHeading;
