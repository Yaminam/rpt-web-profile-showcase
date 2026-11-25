import React, { useCallback, useEffect, useRef, useState } from "react";
import { FileDown, BookOpen, Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { navItems, profile, sectionPages, type SectionPageId } from "@/data/portfolio";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const pathFor = (id: string) => (id === "home" ? "/" : `/${id}`);
const blurbFor = (id: string) => (id === "home" ? "Start here: the overview" : sectionPages[id as SectionPageId]?.blurb ?? "");

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
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.classList.add("menu-open");
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.body.classList.remove("menu-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={cn("fixed inset-x-0 top-0 px-3 pt-3", open ? "z-[90]" : "z-50")}>
      <div
        className={cn(
          "container relative z-[70] mx-auto flex h-14 items-center justify-between gap-4 rounded-2xl border px-4 transition-all duration-500",
          scrolled
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

        {/* Mobile toggle: three lines that morph into an X */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-neon-cyan/40 bg-terminal-bg/60 text-neon-cyan backdrop-blur transition-shadow hover:shadow-neon-cyan lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <span className="relative block h-3.5 w-5" aria-hidden>
            <span className={cn("absolute left-0 top-0 h-0.5 w-5 rounded bg-current transition-all duration-300", open && "top-1.5 rotate-45")} />
            <span className={cn("absolute left-0 top-1.5 h-0.5 w-3.5 rounded bg-current transition-all duration-300", open && "w-0 opacity-0")} />
            <span className={cn("absolute left-0 top-3 h-0.5 w-5 rounded bg-current transition-all duration-300", open && "top-1.5 -rotate-45")} />
          </span>
        </button>
      </div>

      {/* Mobile menu: full-screen sheet */}
      {open && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="menu-sheet-in fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-terminal-bg/95 backdrop-blur-2xl lg:hidden"
        >
          <div className="bg-grid-lines pointer-events-none absolute inset-0 bg-[length:40px_40px] opacity-20" aria-hidden />
          <div
            className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 animate-aurora"
            style={{ background: "radial-gradient(circle, rgba(0,240,255,0.22) 0%, transparent 65%)" }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-40 -left-32 h-[28rem] w-[28rem] animate-aurora [animation-delay:-8s]"
            style={{ background: "radial-gradient(circle, rgba(255,43,214,0.18) 0%, transparent 65%)" }}
            aria-hidden
          />

          <div className="relative shrink-0 px-6 pt-[5.25rem]">
            <p className="font-mono text-xs text-muted-foreground">
              <span className="text-neon-green">~/portfolio</span>
              <span className="text-neon-cyan"> $ </span>ls ./pages
              <span className="ml-1 inline-block h-3.5 w-1.5 translate-y-0.5 bg-neon-cyan animate-blink" />
            </p>
          </div>

          <nav aria-label="Main" className="relative flex-1 px-4 pt-2">
            <ul className="space-y-0.5">
              {navItems.map((item, i) => {
                const current = active === item.id;
                return (
                  <li key={item.id} className="menu-item-in" style={{ animationDelay: `${120 + i * 55}ms` }}>
                    <a
                      href={pathFor(item.id)}
                      onClick={() => setOpen(false)}
                      aria-current={current ? "page" : undefined}
                      className={cn(
                        "group relative flex items-center gap-4 overflow-hidden rounded-2xl border px-4 py-2.5 transition-all duration-300",
                        current
                          ? "border-neon-cyan/50 bg-gradient-to-r from-neon-cyan/15 via-neon-purple/10 to-transparent shadow-[0_0_30px_-12px_rgba(0,240,255,0.7)]"
                          : "border-transparent hover:border-border hover:bg-muted/20 active:bg-muted/30"
                      )}
                    >
                      {current && <span className="absolute inset-y-3 left-0 w-1 rounded-r bg-neon-cyan shadow-neon-cyan" aria-hidden />}
                      <span className={cn("w-6 font-mono text-xs", current ? "text-neon-cyan" : "text-muted-foreground/60")}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className={cn("block font-display text-2xl font-bold leading-tight", current ? "text-neon-cyan" : "text-foreground")}>
                          <span className="text-neon-magenta/80">/</span>
                          {item.label}
                        </span>
                        <span className="block truncate text-xs text-muted-foreground">{blurbFor(item.id)}</span>
                      </span>
                      <ArrowUpRight
                        className={cn(
                          "h-5 w-5 shrink-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
                          current ? "text-neon-cyan" : "text-muted-foreground/50"
                        )}
                        aria-hidden
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="menu-item-in relative space-y-3 px-4 pb-8 pt-6" style={{ animationDelay: `${120 + navItems.length * 55}ms` }}>
            <div className="grid grid-cols-2 gap-3">
              <a
                href="/books"
                onClick={() => setOpen(false)}
                className="flex flex-col gap-1 rounded-2xl border border-neon-magenta/40 bg-neon-magenta/10 p-4"
              >
                <span className="flex items-center justify-between">
                  <BookOpen className="h-5 w-5 text-neon-magenta" aria-hidden />
                  <span className="rounded-full border border-neon-green/50 bg-neon-green/10 px-1.5 text-[10px] font-bold uppercase tracking-wider text-neon-green">
                    free
                  </span>
                </span>
                <span className="mt-1 font-mono text-sm font-semibold">
                  <span className="text-neon-magenta">/</span>books
                </span>
                <span className="text-[11px] text-muted-foreground">14 interview books</span>
              </a>
              <a
                href={profile.resume}
                download
                onClick={() => setOpen(false)}
                className="flex flex-col gap-1 rounded-2xl border border-neon-cyan/50 bg-neon-cyan/10 p-4"
              >
                <FileDown className="h-5 w-5 text-neon-cyan" aria-hidden />
                <span className="mt-1 font-mono text-sm font-semibold text-neon-cyan">resume.pdf</span>
                <span className="text-[11px] text-muted-foreground">download CV</span>
              </a>
            </div>
            {/* hire_me button hidden from the navbar; the /hire page itself is still live */}
            <div className="flex items-center justify-between rounded-2xl border border-border bg-muted/10 px-4 py-3">
              <span className="flex items-center gap-2 font-mono text-[11px] text-neon-green">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-green opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-green" />
                </span>
                open to work
              </span>
              <span className="flex items-center gap-2">
                {[
                  { href: profile.github, icon: Github, label: "GitHub" },
                  { href: profile.linkedin, icon: Linkedin, label: "LinkedIn" },
                  { href: `mailto:${profile.email}`, icon: Mail, label: "Email" },
                ].map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    aria-label={l.label}
                    {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-neon-cyan/60 hover:text-neon-cyan"
                  >
                    <l.icon className="h-4 w-4" />
                  </a>
                ))}
              </span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
