import React, { Suspense, lazy } from "react";
import ScrollProgress from "@/components/ScrollProgress";
import Spotlight from "@/components/Spotlight";
import CyberBackground from "@/components/CyberBackground";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TechMarquee from "@/components/TechMarquee";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import FaqSection from "@/components/FaqSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import BooksSection from "@/components/BooksSection";
import ExploreLinks from "@/components/ExploreLinks";
import Footer from "@/components/Footer";
import { useIdleMount } from "@/hooks/use-idle-mount";

const InteractiveLayer = lazy(() => import("@/components/InteractiveLayer"));

/** Home: a short overview. Experience, skills, education and contact have their own pages (pages/SectionPage). */
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
        <ProjectsSection limit={3} />
        <ExploreLinks />
        <BooksSection />
        <TestimonialsSection />
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
