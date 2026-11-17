import React from "react";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { sectionPages, type SectionPageId } from "@/data/portfolio";

const order: SectionPageId[] = ["about", "experience", "skills", "projects", "education", "contact"];

/** Home-page link strip to the full section pages (internal links for visitors and crawlers). */
const ExploreLinks = () => (
  <section aria-label="Explore the portfolio" className="section-padding pt-0">
    <div className="container mx-auto">
      <Reveal>
        <p className="mb-4 font-mono text-xs text-muted-foreground">
          <span className="text-neon-green">$</span> ls ~/portfolio
        </p>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {order.map((id) => (
            <li key={id}>
              <a
                href={`/${id}`}
                className="cyber-card group flex items-center justify-between gap-3 p-4 transition-colors hover:border-neon-cyan/60"
              >
                <span>
                  <span className="font-mono text-sm text-neon-cyan">/{id}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">{sectionPages[id].blurb}</span>
                </span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neon-cyan" />
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  </section>
);

export default ExploreLinks;
