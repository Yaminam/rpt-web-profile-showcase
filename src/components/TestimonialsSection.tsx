import React from "react";
import { Quote } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { testimonialNote, testimonials } from "@/data/portfolio";

type Props = {
  /** Home page uses the numbered terminal heading; other pages pass their own heading. */
  heading?: React.ReactNode;
};

/** Anonymous praise from leadership (role only, by request). Plain text, no review schema. */
const TestimonialsSection = ({ heading }: Props) => (
  <section id="praise" className={heading ? "space-y-5" : "section-padding"}>
    <div className={heading ? "" : "container mx-auto"}>
      {heading ?? (
        <Reveal>
          <SectionHeading
            index="08."
            command="cat ./feedback.log"
            title="What Leadership Says"
            subtitle="From messages sent by my company's leadership after seeing the work."
          />
        </Reveal>
      )}

      <div className="grid gap-5 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <Reveal key={t.quote} delay={i * 90}>
            <figure className="cyber-card flex h-full flex-col gap-4 p-6">
              <Quote className="h-6 w-6 text-neon-cyan" aria-hidden />
              <blockquote className="flex-1 font-display text-lg leading-snug text-foreground">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="font-mono text-xs text-muted-foreground">
                <span className="text-neon-magenta">{t.role}</span> · {t.context}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>

      <p className="mt-5 font-mono text-sm text-muted-foreground">
        <span className="text-neon-green">$</span> {testimonialNote}
      </p>
    </div>
  </section>
);

export default TestimonialsSection;
