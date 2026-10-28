import React, { useEffect, useState } from "react";
import { Menu, X, Terminal, FileDown, BookOpen } from "lucide-react";
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
        <a href="#home" className="group flex shrink-0 items-center gap-2 whitespace-nowrap font-mono font-bold">
          <Terminal className="h-5 w-5 text-neon-cyan transition-transform group-hover:rotate-12" />
          <span className="text-foreground">
            Shreyash <span className="text-neon-cyan">Tripathi</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="ml-8 hidden items-center gap-5 lg:flex 2xl:gap-6">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={cn("nav-link", active === item.id && "active", (item.id === "experience" || item.id === "education") && "hidden 2xl:inline")}
            >
              <span className="text-neon-magenta/70">#</span>
              {item.label}
            </a>
          ))}
          <button
            onClick={() => window.dispatchEvent(new Event("help:open"))}
            aria-label="Open shortcuts manual"
            title="Shortcuts & secrets (?)"
            className="hidden h-7 w-7 items-center 2xl:flex justify-center rounded-md border border-neon-cyan/30 font-mono text-xs text-neon-cyan transition-all hover:bg-neon-cyan/10 hover:shadow-neon-cyan"
          >
            ?
          </button>
          <span className="h-6 w-px bg-neon-cyan/20" aria-hidden />
          <a
            href="/books"
            title="The Job-Ready Series: free chapter previews"
            className="group relative flex items-center gap-2 rounded-md border border-neon-magenta/40 bg-neon-magenta/5 px-3 py-1.5 font-mono text-xs text-foreground transition-all hover:-translate-y-0.5 hover:border-neon-magenta hover:bg-neon-magenta/10 hover:shadow-neon-magenta"
          >
            <BookOpen className="h-4 w-4 text-neon-magenta transition-transform group-hover:-rotate-6" aria-hidden />
            <span>
              <span className="text-neon-magenta">/</span>books
            </span>
            <span className="relative rounded border border-neon-green/50 bg-neon-green/10 px-1 text-[10px] font-bold uppercase leading-4 tracking-wider text-neon-green">
              free
              <span className="absolute -right-1 -top-1 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-green opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-green" />
              </span>
            </span>
          </a>
          {/* Hire page hidden for now
          <a href="/hire" className="btn-ghost py-2 text-xs">
            hire_me
          </a> */}
          <a href={profile.resume} download className="btn-neon py-2 text-xs">
            <FileDown className="h-4 w-4" /> resume
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          className="text-neon-cyan lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav className="border-t border-neon-cyan/15 bg-terminal-bg/95 backdrop-blur-md lg:hidden">
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
            <li>
              <a
                href="/books"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-md border border-neon-magenta/40 bg-neon-magenta/5 px-3 py-2 font-mono text-sm text-foreground transition-colors hover:bg-neon-magenta/10"
              >
                <BookOpen className="h-4 w-4 text-neon-magenta" aria-hidden />
                <span>
                  <span className="text-neon-magenta">/</span>books
                </span>
                <span className="rounded border border-neon-green/50 bg-neon-green/10 px-1 text-[10px] font-bold uppercase tracking-wider text-neon-green">
                  free previews
                </span>
              </a>
            </li>
            {/* Hire page hidden for now
            <li className="px-3 pt-2">
              <a href="/hire" className="btn-ghost w-full py-2 text-xs" onClick={() => setOpen(false)}>
                hire_me: full-time &amp; freelance
              </a>
            </li> */}
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
