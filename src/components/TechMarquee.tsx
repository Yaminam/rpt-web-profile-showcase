import React from "react";

const techs = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Radix UI",
  "Framer Motion",
  "GSAP",
  "Three.js",
  "Node.js",
  "Express.js",
  "Supabase",
  "PostgreSQL",
  "MongoDB",
  "Prisma",
  "Clerk",
  "OpenAI API",
  "Anthropic Claude SDK",
  "Socket.IO",
  "Java",
  "Python",
  "Git",
  "Vercel",
  "REST API",
];

/** Infinite, edge-faded scrolling strip of technologies. */
const TechMarquee = () => {
  const row = [...techs, ...techs];

  return (
    <div className="relative border-y border-neon-cyan/10 bg-terminal-panel/40 py-5">
      <div className="marquee-mask overflow-hidden">
        <div className="flex w-max animate-marquee gap-4 hover:[animation-play-state:paused]">
          {row.map((t, i) => (
            <span
              key={`${t}-${i}`}
              className="flex shrink-0 items-center gap-2 font-mono text-sm text-muted-foreground"
            >
              <span className="text-neon-cyan">{"//"}</span>
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechMarquee;
