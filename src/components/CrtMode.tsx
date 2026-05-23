import React, { useEffect, useState } from "react";
import { Monitor } from "lucide-react";
import { useAchievements } from "@/hooks/use-achievements";
import { playSound } from "@/lib/sound";

const KEY = "st_crt_on";

/**
 * Toggleable CRT "retro mode": full-screen scanlines + flicker + vignette.
 * Controlled by a floating button and the terminal's `crt` command
 * (window event `crt:toggle`). Choice is persisted.
 */
const CrtMode = () => {
  const { unlock } = useAchievements();
  const [on, setOn] = useState(() => {
    try {
      return localStorage.getItem(KEY) === "1";
    } catch {
      return false;
    }
  });

  const apply = (v: boolean) => {
    setOn(v);
    try {
      localStorage.setItem(KEY, v ? "1" : "0");
    } catch {
      /* ignore */
    }
    if (v) {
      unlock("crt");
      playSound("start");
    } else {
      playSound("toggle");
    }
  };

  useEffect(() => {
    const toggle = () => apply(!(localStorage.getItem(KEY) === "1"));
    window.addEventListener("crt:toggle", toggle);
    return () => window.removeEventListener("crt:toggle", toggle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {on && (
        <div className="pointer-events-none fixed inset-0 z-[55]" aria-hidden>
          <div className="crt-overlay absolute inset-0" />
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/[0.06] to-transparent animate-scanline" />
          <div className="absolute inset-0 animate-flicker bg-neon-cyan/[0.012]" />
        </div>
      )}

      <button
        onClick={() => apply(!on)}
        aria-label="Toggle CRT retro mode"
        title="CRT retro mode"
        className={`group fixed bottom-[4.75rem] right-5 z-40 flex items-center gap-2 rounded-full border px-3.5 py-2 font-mono text-xs backdrop-blur transition-all hover:-translate-y-0.5 ${
          on
            ? "border-neon-green/50 bg-neon-green/10 text-neon-green shadow-neon-green"
            : "border-neon-cyan/30 bg-terminal-panel/90 text-muted-foreground hover:text-neon-cyan"
        }`}
      >
        <Monitor className="h-4 w-4 transition-transform group-hover:scale-110" />
        <span className="hidden sm:inline">crt {on ? "on" : "off"}</span>
      </button>
    </>
  );
};

export default CrtMode;
