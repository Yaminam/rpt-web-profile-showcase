import React, { Suspense, lazy, useEffect } from "react";
import ScrollProgress from "@/components/ScrollProgress";
import Spotlight from "@/components/Spotlight";
import CyberBackground from "@/components/CyberBackground";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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

const content: Record<SectionPageId, React.ReactNode> = {
  about: (
    <>
      <AboutSection />
      <TestimonialsSection />
    </>
  ),
  experience: <ExperienceSection />,
  skills: <SkillsSection />,
  projects: <ProjectsSection />,
  education: <EducationSection />,
  contact: (
    <>
      <ContactSection />
      <FaqSection />
    </>
  ),
};

/**
 * One section of the portfolio on its own page (/about, /experience, /skills, /projects,
 * /education, /contact). Prerendered by scripts/prerender.mjs with its own title, description
 * and JSON-LD from lib/seo.ts → sectionPageSeo.
 */
const SectionPage = ({ id }: { id: SectionPageId }) => {
  const interactive = useIdleMount();

  useEffect(() => {
    document.title = sectionPages[id].title;
  }, [id]);

  return (
    <div className="relative min-h-screen text-foreground">
      <ScrollProgress />
      <Spotlight />
      <CyberBackground />
      <Navbar />
      <main className="pt-16">{content[id]}</main>
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
