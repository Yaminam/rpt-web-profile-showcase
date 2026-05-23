import React, { useEffect, useState } from "react";
import { X, Keyboard } from "lucide-react";

type Group = { title: string; rows: [string, string][] };

const GROUPS: Group[] = [
  {
    title: "shortcuts",
    rows: [
      ["⌘K / Ctrl+K", "open / close terminal"],
      ["`  (backtick)", "toggle terminal"],
      ["?", "this manual"],
      ["Esc", "close any overlay"],
    ],
  },
  {
    title: "mini-games (in terminal)",
    rows: [
      ["snake", "classic snake — score 5 🐍"],
      ["type", "speed test — 40 wpm ⚡"],
      ["quiz", "tech trivia — ace it 🧠"],
      ["simon", "memory pads — round 5 🧩"],
      ["hack", "decrypt the key 💀"],
    ],
  },
  {
    title: "easter eggs",
    rows: [
      ["↑↑↓↓←→←→ B A", "Konami god-mode 🎮"],
      ["crt", "CRT retro mode 📺"],
      ["matrix", "enter the matrix 🐇"],
      ["sudo / cowsay", "try them 😏"],
    ],
  },
  {
    title: "progress",
    rows: [
      ["🏆 (bottom-left)", "11 achievements + XP"],
      ["share", "download your score card 📸"],
      ["🔊 (in terminal)", "toggle sound FX"],
      ["drag title bar", "move the terminal window"],
    ],
  },
];

/** "Operator Manual" cheat-sheet. Opens on `?` or the `help:open` event. */
const HelpOverlay = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      const typing = tag === "INPUT" || tag === "TEXTAREA";
      if (e.key === "?" && !typing) {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("help:open", onOpen);
    if (window.location.hash === "#help") setOpen(true);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("help:open", onOpen);
    };
  }, []);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={() => setOpen(false)}
      role="presentation"
    >
      <div
        className="terminal-window animated-border w-full max-w-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="terminal-bar">
          <span className="terminal-dot bg-red-500/80" />
          <span className="terminal-dot bg-yellow-400/80" />
          <span className="terminal-dot bg-green-500/80" />
          <span className="ml-3 flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
            <Keyboard className="h-3.5 w-3.5" /> operator_manual.txt
          </span>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close manual"
            className="ml-auto text-muted-foreground transition-colors hover:text-neon-magenta"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto p-5 font-mono text-sm">
          <p className="mb-4 text-muted-foreground">
            <span className="text-neon-green">$</span> man portfolio —{" "}
            <span className="text-neon-cyan">everything you can do here</span>
          </p>

          <div className="grid gap-5 sm:grid-cols-2">
            {GROUPS.map((g) => (
              <div key={g.title}>
                <p className="mb-2 text-xs uppercase tracking-widest text-neon-magenta">
                  ./{g.title}
                </p>
                <ul className="space-y-1.5">
                  {g.rows.map(([k, v]) => (
                    <li key={k} className="flex items-start gap-2 text-xs">
                      <kbd className="shrink-0 rounded border border-neon-cyan/30 bg-neon-cyan/5 px-1.5 py-0.5 text-[11px] text-neon-cyan">
                        {k}
                      </kbd>
                      <span className="pt-0.5 text-muted-foreground">{v}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="mt-5 border-t border-neon-cyan/10 pt-3 text-[11px] text-muted-foreground">
            tip: open the terminal and type <span className="text-neon-cyan">help</span> for the full
            command list · press <span className="text-neon-cyan">?</span> or{" "}
            <span className="text-neon-cyan">esc</span> to close
          </p>
        </div>
      </div>
    </div>
  );
};

export default HelpOverlay;
