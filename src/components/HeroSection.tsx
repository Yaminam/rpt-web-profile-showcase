
import React from "react";
import { ArrowDown, Github, Linkedin, Mail, Phone } from "lucide-react";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center pt-16 bg-gradient-to-br from-background to-muted"
    >
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-lg text-muted-foreground mb-3 opacity-0 animate-fade-in">
              Hello, I'm
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 opacity-0 animate-fade-in-delay-1">
              Shreyash Tripathi
            </h1>
            <h2 className="text-2xl md:text-3xl font-medium gradient-text mb-6 opacity-0 animate-fade-in-delay-2">
              MERN Stack Developer
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-md opacity-0 animate-fade-in-delay-3">
              Aspiring software developer with a passion for building web applications.
              Currently pursuing Bachelor's degree at JECRC University, Jaipur.
            </p>
            <div className="flex flex-wrap gap-4 opacity-0 animate-fade-in-delay-3">
              <a
                href="#contact"
                className="btn-primary flex items-center gap-2"
              >
                <Mail size={18} /> Contact Me
              </a>
              <a
                href="#projects"
                className="btn-outline flex items-center gap-2"
              >
                View Projects
              </a>
            </div>
            <div className="mt-8 flex space-x-6 opacity-0 animate-fade-in-delay-3">
              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com/in/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-portfolio-blue hover:text-portfolio-blue/80"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:rpt2242@gmail.com"
                className="text-muted-foreground hover:text-foreground"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
              <a
                href="tel:+918160890957"
                className="text-muted-foreground hover:text-foreground"
                aria-label="Phone"
              >
                <Phone size={20} />
              </a>
            </div>
          </div>
          <div className="hidden md:flex justify-center items-center">
            <div className="bg-gradient-to-br from-portfolio-blue to-portfolio-teal rounded-full p-1">
              <div className="bg-background rounded-full p-1">
                <div className="w-64 h-64 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-6xl">👨‍💻</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden md:block animate-bounce">
          <a href="#about" aria-label="Scroll down">
            <ArrowDown className="text-muted-foreground" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
