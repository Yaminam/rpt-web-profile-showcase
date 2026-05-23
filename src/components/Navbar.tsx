import React, { useEffect, useState } from "react";
import { Menu, X, Terminal, FileDown } from "lucide-react";
import { navItems, profile } from "@/data/portfolio";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";

const sectionIds = navItems.map((n) => n.id);

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-neon-cyan/15 bg-terminal-bg/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between">
        {/* Logo */}
        <a href="#home" className="group flex items-center gap-2 font-mono font-bold">
          <Terminal className="h-5 w-5 text-neon-cyan transition-transform group-hover:rotate-12" />
          <span className="text-foreground">
            Shreyash <span className="text-neon-cyan">Tripathi</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={cn("nav-link", active === item.id && "active")}
            >
              <span className="text-neon-magenta/70">#</span>
              {item.label}
            </a>
          ))}
          <button
            onClick={() => window.dispatchEvent(new Event("help:open"))}
            aria-label="Open shortcuts manual"
            title="Shortcuts & secrets (?)"
            className="flex h-7 w-7 items-center justify-center rounded-md border border-neon-cyan/30 font-mono text-xs text-neon-cyan transition-all hover:bg-neon-cyan/10 hover:shadow-neon-cyan"
          >
            ?
          </button>
          <a href={profile.resume} download className="btn-neon py-2 text-xs">
            <FileDown className="h-4 w-4" /> resume
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          className="text-neon-cyan md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav className="border-t border-neon-cyan/15 bg-terminal-bg/95 backdrop-blur-md md:hidden">
          <ul className="container mx-auto flex flex-col gap-1 py-4">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block rounded-md px-3 py-2 font-mono text-sm text-muted-foreground transition-colors hover:bg-neon-cyan/5 hover:text-neon-cyan",
                    active === item.id && "bg-neon-cyan/5 text-neon-cyan"
                  )}
                >
                  <span className="text-neon-magenta/70">#</span>
                  {item.label}
                </a>
              </li>
            ))}
            <li className="px-3 pt-2">
              <a
                href={profile.resume}
                download
                className="btn-neon w-full py-2 text-xs"
                onClick={() => setOpen(false)}
              >
                <FileDown className="h-4 w-4" /> download resume
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
