import React, { Suspense, lazy, useEffect } from "react";
import ScrollProgress from "@/components/ScrollProgress";
import Spotlight from "@/components/Spotlight";
import CyberBackground from "@/components/CyberBackground";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { PageNav, pageExtras } from "@/components/PageExtras";
import { HideSectionHeading } from "@/components/SectionHeading";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import EducationSection from "@/components/EducationSection";
import ContactSection from "@/components/ContactSection";
import FaqSection from "@/components/FaqSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import { sectionPages, type SectionPageId } from "@/data/portfolio";
import { useIdleMount } from "@/hooks/use-idle-mount";

const InteractiveLayer = lazy(() => import("@/components/InteractiveLayer"));

/** The section itself (its heading is hidden: PageHero carries the page's <h1>). */
const sectionFor: Record<SectionPageId, React.ReactNode> = {
  about: <AboutSection />,
  experience: <ExperienceSection />,
  skills: <SkillsSection />,
  projects: <ProjectsSection filterable />,
  education: <EducationSection />,
  contact: <ContactSection />,
};

/** Sections that follow, with their own visible headings. */
const afterFor: Partial<Record<SectionPageId, React.ReactNode>> = {
  about: <TestimonialsSection />,
  contact: <FaqSection />,
};

/**
 * One section of the portfolio on its own page (/about, /experience, /skills, /projects,
 * /education, /contact): an animated hero with the page's <h1>, the section, extra detail
 * blocks and previous/next links. Prerendered by scripts/prerender.mjs (lib/seo.ts → sectionPageSeo).
 */
const SectionPage = ({ id }: { id: SectionPageId }) => {
  const interactive = useIdleMount();
  const page = sectionPages[id];
  const Extras = pageExtras[id];

  useEffect(() => {
    document.title = page.title;
  }, [page.title]);

  return (
    <div className="relative min-h-screen text-foreground">
      <ScrollProgress />
      <Spotlight />
      <CyberBackground />
      <Navbar />
      <main>
        <PageHero
          crumb={id}
          command={page.hero.command}
          title={page.hero.h1}
          lead={page.hero.lead}
          stats={page.hero.stats}
          accent={page.hero.accent}
        />
        <HideSectionHeading>{sectionFor[id]}</HideSectionHeading>
        {Extras && <Extras />}
        {afterFor[id]}
        <PageNav id={id} />
      </main>
      <Footer />

      {interactive && (
        <Suspense fallback={null}>
          <InteractiveLayer />
        </Suspense>
      )}
    </div>
  );
};

export default SectionPage;
