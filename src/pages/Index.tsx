import React from "react";
import BootScreen from "@/components/BootScreen";
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
import Footer from "@/components/Footer";
import CommandTerminal from "@/components/CommandTerminal";
import AchievementsHud from "@/components/AchievementsHud";
import CyberOverlay from "@/components/CyberOverlay";
import CursorFX from "@/components/fx/CursorFX";
import ConfettiFX from "@/components/fx/ConfettiFX";
import CrtMode from "@/components/CrtMode";
import WelcomeHint from "@/components/WelcomeHint";
import HelpOverlay from "@/components/HelpOverlay";
import MailModal from "@/components/MailModal";

const Index = () => {
  return (
    <div className="relative min-h-screen text-foreground">
      <BootScreen />
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
      </main>
      <Footer />

      {/* Interactive / gamified layer */}
      <CommandTerminal />
      <AchievementsHud />
      <CyberOverlay />
      <CursorFX />
      <ConfettiFX />
      <CrtMode />
      <WelcomeHint />
      <HelpOverlay />
      <MailModal />
    </div>
  );
};

export default Index;
