import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { toast } from "sonner";
import { playSound } from "@/lib/sound";

export type Achievement = {
  id: string;
  title: string;
  desc: string;
  icon: string;
};

/** All unlockable achievements. Order = display order. */
export const ACHIEVEMENTS: Achievement[] = [
  { id: "boot", title: "First Contact", desc: "Open the command terminal", icon: "🖥️" },
  { id: "command", title: "Script Kiddie", desc: "Run your first command", icon: "⌨️" },
  { id: "explorer", title: "Wanderer", desc: "Scroll through every section", icon: "🧭" },
  { id: "hacker", title: "Mainframe Breached", desc: "Beat the hack mini-game", icon: "💀" },
  { id: "konami", title: "1337 H4X0R", desc: "Enter the secret code", icon: "🎮" },
  { id: "recruiter", title: "Headhunter", desc: "Grab the résumé", icon: "📄" },
  { id: "snake", title: "Snake Charmer", desc: "Score 5+ in terminal Snake", icon: "🐍" },
  { id: "quiz", title: "Big Brain", desc: "Ace the tech quiz", icon: "🧠" },
  { id: "typing", title: "Fast Fingers", desc: "Type 40+ WPM in the speed test", icon: "⚡" },
  { id: "crt", title: "Analog Soul", desc: "Switch on CRT retro mode", icon: "📺" },
  { id: "memory", title: "Total Recall", desc: "Reach round 5 in Simon", icon: "🧩" },
];

const STORAGE_KEY = "st_achievements_v1";

const TOAST_STYLE: React.CSSProperties = {
  background: "#0a0e16",
  border: "1px solid rgba(0,240,255,0.4)",
  color: "#eafff0",
  fontFamily: '"JetBrains Mono", monospace',
  boxShadow: "0 0 24px -6px rgba(0,240,255,0.45)",
};

type Ctx = {
  unlocked: Set<string>;
  unlock: (id: string) => void;
  reset: () => void;
  list: Achievement[];
  count: number;
  total: number;
};

const AchievementsContext = createContext<Ctx | null>(null);

const load = (): Set<string> => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return new Set<string>(raw ? JSON.parse(raw) : []);
  } catch {
    return new Set<string>();
  }
};

export const AchievementsProvider = ({ children }: { children: React.ReactNode }) => {
  const [unlocked, setUnlocked] = useState<Set<string>>(load);

  const persist = (s: Set<string>) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...s]));
    } catch {
      /* ignore */
    }
  };

  const unlock = useCallback((id: string) => {
    const meta = ACHIEVEMENTS.find((a) => a.id === id);
    if (!meta) return;
    setUnlocked((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      persist(next);

      playSound("achv");
      try {
        window.dispatchEvent(new CustomEvent("fx:burst"));
      } catch {
        /* ignore */
      }
      toast(`${meta.icon}  Achievement Unlocked`, {
        description: `${meta.title} — ${meta.desc}`,
        duration: 4500,
        style: TOAST_STYLE,
      });

      if (next.size === ACHIEVEMENTS.length) {
        setTimeout(
          () =>
            toast("🏆  100% SYNC", {
              description: "Every achievement unlocked. Absolute legend.",
              duration: 6000,
              style: { ...TOAST_STYLE, border: "1px solid rgba(57,255,20,0.5)" },
            }),
          700
        );
      }
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setUnlocked(new Set());
    persist(new Set());
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      unlocked,
      unlock,
      reset,
      list: ACHIEVEMENTS,
      count: unlocked.size,
      total: ACHIEVEMENTS.length,
    }),
    [unlocked, unlock, reset]
  );

  return (
    <AchievementsContext.Provider value={value}>{children}</AchievementsContext.Provider>
  );
};

export function useAchievements() {
  const ctx = useContext(AchievementsContext);
  if (!ctx) throw new Error("useAchievements must be used within AchievementsProvider");
  return ctx;
}
