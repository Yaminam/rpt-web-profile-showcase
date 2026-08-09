import React, { useEffect, useState } from "react";
import { Trophy, X, Lock, Check, Share2 } from "lucide-react";
import { useAchievements } from "@/hooks/use-achievements";
import { downloadScoreCard } from "@/lib/scorecard";
import { navItems } from "@/data/portfolio";

/**
 * Floating progress HUD (bottom-left) that tracks gamified achievements.
 * Also hosts the global watchers for "explorer" (seen every section)
 * and "recruiter" (grabbed the résumé / opened email).
 */
const AchievementsHud = () => {
  const { list, unlocked, count, total, unlock } = useAchievements();
  const [open, setOpen] = useState(false);

  // explorer: unlock once every section has scrolled into view
  useEffect(() => {
    if (unlocked.has("explorer")) return;
    const ids = navItems.map((n) => n.id);
    const seen = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) seen.add(e.target.id);
        });
        if (ids.every((id) => seen.has(id))) {
          unlock("explorer");
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [unlock, unlocked]);

  // recruiter: clicking any résumé download, or opening the mail composer
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest?.("a");
      if (!a) return;
      if (a.hasAttribute("download")) unlock("recruiter");
    };
    const onMailOpen = () => unlock("recruiter");
    document.addEventListener("click", handler);
    window.addEventListener("mail:open", onMailOpen);
    return () => {
      document.removeEventListener("click", handler);
      window.removeEventListener("mail:open", onMailOpen);
    };
  }, [unlock]);

  const pct = Math.round((count / total) * 100);

  return (
    <div className="fixed bottom-5 left-5 z-40 hidden sm:block">
      {open && (
        <div className="mb-3 w-72 origin-bottom-left rounded-lg border border-neon-cyan/30 bg-terminal-panel/95 p-4 shadow-neon-cyan backdrop-blur-md animate-fade-in">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-widest text-neon-cyan">
              ./achievements
            </span>
            <div className="flex items-center gap-2">
              <span className="rounded border border-neon-magenta/40 bg-neon-magenta/10 px-1.5 py-0.5 font-mono text-[10px] font-bold text-neon-magenta">
                LVL {count}
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close achievements"
                className="text-muted-foreground transition-colors hover:text-neon-magenta"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* xp bar */}
          <div className="mb-1 flex items-center justify-between font-mono text-[11px] text-muted-foreground">
            <span>xp</span>
            <span className="text-neon-cyan">
              {count}/{total} · {pct}%
            </span>
          </div>
          <div className="mb-4 h-1.5 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-gradient-to-r from-neon-cyan to-neon-magenta transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>

          <ul className="space-y-2">
            {list.map((a) => {
              const got = unlocked.has(a.id);
              return (
                <li
                  key={a.id}
                  className={`flex items-start gap-2.5 rounded-md border p-2 transition-colors ${
                    got
                      ? "border-neon-cyan/30 bg-neon-cyan/5"
                      : "border-border/60 bg-muted/20 opacity-70"
                  }`}
                >
                  <span className={`text-base leading-none ${got ? "" : "grayscale"}`}>
                    {a.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p
                      className={`font-mono text-xs font-semibold ${
                        got ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {a.title}
                    </p>
                    <p className="text-[11px] leading-tight text-muted-foreground">
                      {got ? a.desc : "??? — keep exploring"}
                    </p>
                  </div>
                  {got ? (
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-neon-green" />
                  ) : (
                    <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                  )}
                </li>
              );
            })}
          </ul>
          <button
            onClick={() => downloadScoreCard(unlocked)}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-md border border-neon-magenta/40 bg-neon-magenta/5 py-2 font-mono text-[11px] text-neon-magenta transition-colors hover:bg-neon-magenta/15"
          >
            <Share2 className="h-3.5 w-3.5" /> download score card
          </button>
          <p className="mt-2 font-mono text-[10px] text-muted-foreground">
            hint: try the terminal, scroll around, and remember old cheat codes ↑↑↓↓
          </p>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle achievements"
        className="group flex items-center gap-2 rounded-full border border-neon-cyan/40 bg-terminal-panel/90 px-3.5 py-2 font-mono text-xs text-neon-cyan shadow-neon-cyan backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-neon-cyan/10"
      >
        <Trophy className="h-4 w-4 transition-transform group-hover:scale-110" />
        <span className="tabular-nums">
          {count}/{total}
        </span>
      </button>
    </div>
  );
};

export default AchievementsHud;
