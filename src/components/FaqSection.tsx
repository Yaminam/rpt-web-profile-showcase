import React from "react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { faqs } from "@/data/portfolio";

/**
 * Plain-text Q&A about Shreyash. Answers stay in the DOM (native <details>),
 * so search engines and AI answer engines can read and quote them.
 */
const FaqSection = () => (
  <section id="faq" className="section-padding">
    <div className="container mx-auto">
      <Reveal>
        <SectionHeading
          index="07."
          command="man shreyash"
          title="FAQ"
          subtitle="Quick answers about who I am, what I build and how to reach me."
        />
      </Reveal>

      <div className="mx-auto max-w-3xl space-y-3">
        {faqs.map((f, i) => (
          <Reveal key={f.q} delay={i * 60}>
            <details className="cyber-card group p-5 [&_summary::-webkit-details-marker]:hidden" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-display text-base font-semibold text-foreground md:text-lg">
                <h3>{f.q}</h3>
                <span className="mt-0.5 font-mono text-neon-cyan transition-transform group-open:rotate-45" aria-hidden>
                  +
                </span>
              </summary>
              <p className="mt-3 font-sans leading-relaxed text-muted-foreground">{f.a}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default FaqSection;
