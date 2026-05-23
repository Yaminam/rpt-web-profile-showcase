import { useEffect } from "react";
import { toast } from "sonner";

const KEY = "st_welcomed_v1";

/** One-time, dismissible orientation toast so the hidden features get discovered. */
const WelcomeHint = () => {
  useEffect(() => {
    try {
      if (localStorage.getItem(KEY) === "1") return;
    } catch {
      return;
    }
    const t = setTimeout(() => {
      toast("👋  Welcome, operator", {
        description:
          "Press ⌘K / ` for the live terminal · 11 hidden achievements 🏆 · games, CRT mode & a secret code await.",
        duration: 9000,
        style: {
          background: "#0a0e16",
          border: "1px solid rgba(0,240,255,0.4)",
          color: "#eafff0",
          fontFamily: '"JetBrains Mono", monospace',
          boxShadow: "0 0 24px -6px rgba(0,240,255,0.45)",
        },
      });
      try {
        localStorage.setItem(KEY, "1");
      } catch {
        /* ignore */
      }
    }, 2800);
    return () => clearTimeout(t);
  }, []);

  return null;
};

export default WelcomeHint;
