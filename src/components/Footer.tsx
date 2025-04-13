
import React from "react";
import { ArrowUp } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted border-t border-border">
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold text-primary">Shreyash Tripathi</h2>
            <p className="text-muted-foreground">MERN Stack Developer</p>
          </div>

          <div className="flex items-center space-x-6">
            <a
              href="mailto:rpt2242@gmail.com"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              rpt2242@gmail.com
            </a>
            <a
              href="tel:+918160890957"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              +91 8160890957
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Shreyash Tripathi. All rights reserved.
          </p>

          <div className="mt-4 md:mt-0 flex items-center">
            <a
              href="#home"
              className="p-2 bg-primary/10 rounded-full text-primary hover:bg-primary/20 transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
