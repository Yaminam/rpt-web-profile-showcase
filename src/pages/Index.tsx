import React, { Suspense, lazy, useEffect, useState } from "react";
import ScrollProgress from "@/components/ScrollProgress";
import Spotlight from "@/components/Spotlight";
import CyberBackground from "@/components/CyberBackground";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TechMarquee from "@/components/TechMarquee";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import EducationSection from "@/components/EducationSection";
import ContactSection from "@/components/ContactSection";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";

const InteractiveLayer = lazy(() => import("@/components/InteractiveLayer"));

/** Mount the terminal/games/FX layer only once the browser is idle (never during SSR). */
const useIdleMount = () => {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const ric = window.requestIdleCallback;
    if (ric) {
      const id = ric(() => setReady(true), { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }
    const t = setTimeout(() => setReady(true), 1200);
    return () => clearTimeout(t);
  }, []);
  return ready;
};

const Index = () => {
  const interactive = useIdleMount();

  return (
    <div className="relative min-h-screen text-foreground">
      <ScrollProgress />
      <Spotlight />
      <CyberBackground />
      <Navbar />
      <main>
        <HeroSection />
        <TechMarquee />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <EducationSection />
        <ContactSection />
        <FaqSection />
      </main>
      <Footer />

      {/* Interactive / gamified layer */}
      {interactive && (
        <Suspense fallback={null}>
          <InteractiveLayer />
        </Suspense>
      )}
    </div>
  );
};

export default Index;
