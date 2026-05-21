import React, { useEffect, useState } from "react";
import { profile } from "@/data/portfolio";

const lines = [
  "> initializing portfolio.sys ...",
  "> loading modules: react · vite · tailwind  [OK]",
  "> mounting profile: shreyash_tripathi  [OK]",
  "> establishing secure connection ...  [OK]",
  "> boot complete. welcome.",
];

/**
 * One-time terminal boot intro. Shows on first load of a session,
 * types a few lines, then fades away revealing the site.
 */
const BootScreen = () => {
  const [done, setDone] = useState(
    () => typeof sessionStorage !== "undefined" && sessionStorage.getItem("booted") === "1"
  );
  const [shown, setShown] = useState(0);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    if (done) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish();
      return;
    }
    if (shown < lines.length) {
      const t = setTimeout(() => setShown((n) => n + 1), 320);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setHide(true), 550);
    const t2 = setTimeout(finish, 1150);
    return () => {
      clearTimeout(t);
      clearTimeout(t2);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shown, done]);

  function finish() {
    try {
      sessionStorage.setItem("booted", "1");
    } catch {
      /* ignore */
    }
    setDone(true);
  }

  if (done) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-terminal-bg transition-opacity duration-500 ${
        hide ? "opacity-0" : "opacity-100"
      }`}
      onClick={finish}
      role="presentation"
    >
      <div className="bg-grid-lines absolute inset-0 bg-[length:40px_40px] opacity-30" />
      <div className="relative w-full max-w-md px-6 font-mono text-sm">
        <p className="mb-4 font-display text-2xl font-bold gradient-text">{profile.name}</p>
        {lines.slice(0, shown).map((l, i) => (
          <p key={i} className="text-neon-green/90">
            {l}
          </p>
        ))}
        {shown < lines.length && (
          <span className="inline-block h-4 w-2 translate-y-0.5 bg-neon-cyan animate-blink" />
        )}
        <p className="mt-6 text-[11px] text-muted-foreground">[ click to skip ]</p>
      </div>
    </div>
  );
};

export default BootScreen;
