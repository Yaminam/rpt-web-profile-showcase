import React, { useCallback, useEffect, useRef, useState } from "react";
import { Menu, X, FileDown, BookOpen } from "lucide-react";
import { navItems, profile } from "@/data/portfolio";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const pathFor = (id: string) => (id === "home" ? "/" : `/${id}`);

/** Floating glass navbar: a pill whose glowing highlight slides to the hovered or current page. */
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const active = navItems.find((item) => pathFor(item.id) === pathname)?.id;

  // Sliding highlight: measured from the hovered link, or the current page's link.
  const listRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [hovered, setHovered] = useState<string | null>(null);
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null);

  const measure = useCallback(() => {
    const id = hovered ?? active;
    const el = id ? linkRefs.current[id] : null;
    const list = listRef.current;
    if (!el || !list || el.offsetParent === null) return setPill(null);
    const a = el.getBoundingClientRect();
    const b = list.getBoundingClientRect();
    setPill({ left: a.left - b.left, width: a.width });
  }, [hovered, active]);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3">
      <div
        className={cn(
          "container mx-auto flex h-14 items-center justify-between gap-4 rounded-2xl border px-4 transition-all duration-500",
          scrolled || open
            ? "border-neon-cyan/20 bg-terminal-bg/75 shadow-[0_10px_40px_-15px_rgba(0,240,255,0.35)] backdrop-blur-xl"
            : "border-transparent bg-transparent"
        )}
      >
        {/* Logo */}
        <a href="/" className="group flex shrink-0 items-center gap-2 whitespace-nowrap font-mono font-bold">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-neon-cyan/40 bg-neon-cyan/10 text-sm text-neon-cyan transition-all duration-300 group-hover:rotate-6 group-hover:shadow-neon-cyan">
            &gt;_
          </span>
          <span className="text-foreground">
            Shreyash <span className="text-neon-cyan">Tripathi</span>
          </span>
        </a>

        {/* Desktop nav: glass pill with a sliding highlight */}
        <nav aria-label="Main" className="hidden lg:block">
          <div
            ref={listRef}
            onMouseLeave={() => setHovered(null)}
            className="relative flex items-center gap-0.5 rounded-full border border-border/60 bg-muted/20 p-1 backdrop-blur"
          >
            <span
              aria-hidden
              className={cn(
                "pointer-events-none absolute inset-y-1 rounded-full border border-neon-cyan/40 bg-gradient-to-r from-neon-cyan/20 via-neon-purple/15 to-neon-magenta/20 shadow-[0_0_18px_-4px_rgba(0,240,255,0.6)] transition-all duration-300 ease-out",
                pill ? "opacity-100" : "opacity-0"
              )}
              style={pill ? { left: pill.left, width: pill.width } : undefined}
            />
            {navItems.map((item) => (
              <a
                key={item.id}
                ref={(el) => (linkRefs.current[item.id] = el)}
                href={pathFor(item.id)}
                onMouseEnter={() => setHovered(item.id)}
                aria-current={active === item.id ? "page" : undefined}
                className={cn(
                  "relative z-10 rounded-full px-3 py-1.5 font-mono text-xs transition-colors duration-300 2xl:px-3.5",
                  active === item.id ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                  (item.id === "experience" || item.id === "education") && "hidden 2xl:inline-block"
                )}
              >
                <span className={active === item.id ? "text-neon-cyan" : "text-neon-magenta/70"}>/</span>
                {item.label}
              </a>
            ))}
          </div>
        </nav>

        {/* Right actions */}
        <div className="hidden items-center gap-2 lg:flex">
          <button
            onClick={() => window.dispatchEvent(new Event("help:open"))}
            aria-label="Open shortcuts manual"
            title="Shortcuts & secrets (?)"
            className="hidden h-8 w-8 items-center justify-center rounded-full border border-neon-cyan/30 font-mono text-xs text-neon-cyan transition-all hover:bg-neon-cyan/10 hover:shadow-neon-cyan 2xl:flex"
          >
            ?
          </button>
          <a
            href="/books"
            title="The Job-Ready Series: free chapter previews"
            aria-current={pathname.startsWith("/books") ? "page" : undefined}
            className="group relative flex items-center gap-2 rounded-full border border-neon-magenta/40 bg-neon-magenta/5 px-3 py-1.5 font-mono text-xs text-foreground transition-all hover:-translate-y-0.5 hover:border-neon-magenta hover:bg-neon-magenta/10 hover:shadow-neon-magenta"
          >
            <BookOpen className="h-4 w-4 text-neon-magenta transition-transform group-hover:-rotate-6" aria-hidden />
            <span>
              <span className="text-neon-magenta">/</span>books
            </span>
            <span className="relative rounded-full border border-neon-green/50 bg-neon-green/10 px-1.5 text-[10px] font-bold uppercase leading-4 tracking-wider text-neon-green">
              free
              <span className="absolute -right-1 -top-1 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-green opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-green" />
              </span>
            </span>
          </a>
          {/* hire_me button hidden from the navbar; the /hire page itself is still live
          <a href="/hire" className="btn-ghost py-2 text-xs">
            hire_me
          </a> */}
          <a
            href={profile.resume}
            download
            className="group relative flex items-center gap-1.5 overflow-hidden rounded-full border border-neon-cyan/60 bg-neon-cyan/10 px-4 py-1.5 font-mono text-xs font-semibold text-neon-cyan transition-all hover:-translate-y-0.5 hover:bg-neon-cyan/20 hover:shadow-neon-cyan"
          >
            <FileDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" /> resume
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-neon-cyan/30 text-neon-cyan lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav
          aria-label="Main"
          className="container mx-auto mt-2 rounded-2xl border border-neon-cyan/20 bg-terminal-bg/95 p-3 shadow-[0_20px_50px_-20px_rgba(0,240,255,0.4)] backdrop-blur-xl lg:hidden"
        >
          <ul className="grid grid-cols-2 gap-2">
            {navItems.map((item, i) => (
              <li key={item.id} className="opacity-0 animate-fade-in" style={{ animationDelay: `${i * 40}ms` }}>
                <a
                  href={pathFor(item.id)}
                  onClick={() => setOpen(false)}
                  aria-current={active === item.id ? "page" : undefined}
                  className={cn(
                    "block rounded-xl border px-3 py-2.5 font-mono text-sm transition-colors",
                    active === item.id
                      ? "border-neon-cyan/50 bg-neon-cyan/10 text-neon-cyan"
                      : "border-border/60 text-muted-foreground hover:border-neon-cyan/40 hover:text-foreground"
                  )}
                >
                  <span className="text-neon-magenta/70">/</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-3 grid gap-2">
            <a
              href="/books"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-xl border border-neon-magenta/40 bg-neon-magenta/5 px-3 py-2.5 font-mono text-sm text-foreground"
            >
              <BookOpen className="h-4 w-4 text-neon-magenta" aria-hidden />
              <span>
                <span className="text-neon-magenta">/</span>books
              </span>
              <span className="rounded-full border border-neon-green/50 bg-neon-green/10 px-1.5 text-[10px] font-bold uppercase tracking-wider text-neon-green">
                free previews
              </span>
            </a>
            {/* hire_me button hidden from the navbar; the /hire page itself is still live */}
            <a
              href={profile.resume}
              download
              onClick={() => setOpen(false)}
              className="btn-neon w-full py-2.5 text-xs"
            >
              <FileDown className="h-4 w-4" /> download resume
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
