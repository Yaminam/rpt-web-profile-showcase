import React, { useEffect, useRef, useState } from "react";
import { tone, playSound } from "@/lib/sound";

// static class strings so Tailwind keeps them
const PADS = [
  { idle: "bg-neon-cyan/15 border-neon-cyan/30", on: "bg-neon-cyan shadow-neon-cyan", freq: 330 },
  { idle: "bg-neon-magenta/15 border-neon-magenta/30", on: "bg-neon-magenta shadow-neon-magenta", freq: 415 },
  { idle: "bg-neon-green/15 border-neon-green/30", on: "bg-neon-green shadow-neon-green", freq: 494 },
  { idle: "bg-neon-yellow/15 border-neon-yellow/30", on: "bg-neon-yellow", freq: 587 },
];
const WIN_ROUND = 5;

type SimonGameProps = {
  onExit: (round: number) => void;
  onWin?: () => void;
};

/** Simon-says memory game: repeat the growing neon sequence. */
const SimonGame = ({ onExit, onWin }: SimonGameProps) => {
  const [seq, setSeq] = useState<number[]>([]);
  const [phase, setPhase] = useState<"show" | "input" | "over">("show");
  const [active, setActive] = useState<number | null>(null);
  const [round, setRound] = useState(0);
  const [best, setBest] = useState(() => {
    try {
      return parseInt(localStorage.getItem("st_simon_best") || "0", 10) || 0;
    } catch {
      return 0;
    }
  });

  const inputIdx = useRef(0);
  const wonRef = useRef(false);
  const timers = useRef<number[]>([]);
  const seqRef = useRef<number[]>([]);
  seqRef.current = seq;
  const onExitRef = useRef(onExit);
  onExitRef.current = onExit;
  const onWinRef = useRef(onWin);
  onWinRef.current = onWin;

  const clearTimers = () => {
    timers.current.forEach((t) => clearTimeout(t));
    timers.current = [];
  };

  const flash = (id: number) => {
    setActive(id);
    tone(PADS[id].freq);
    timers.current.push(window.setTimeout(() => setActive(null), 280));
  };

  const playSeq = (s: number[]) => {
    setPhase("show");
    clearTimers();
    s.forEach((id, i) => {
      timers.current.push(window.setTimeout(() => flash(id), 600 * (i + 1)));
    });
    timers.current.push(
      window.setTimeout(() => {
        setPhase("input");
        inputIdx.current = 0;
      }, 600 * (s.length + 1))
    );
  };

  const start = () => {
    clearTimers();
    wonRef.current = false;
    const s = [Math.floor(Math.random() * 4)];
    setSeq(s);
    setRound(1);
    playSeq(s);
  };

  useEffect(() => {
    start();
    return clearTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onExitRef.current(round);
      else if (e.key === "Enter" && phase === "over") start();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, round]);

  const press = (id: number) => {
    if (phase !== "input") return;
    flash(id);
    const s = seqRef.current;
    if (id === s[inputIdx.current]) {
      inputIdx.current += 1;
      if (inputIdx.current === s.length) {
        if (s.length >= WIN_ROUND && !wonRef.current) {
          wonRef.current = true;
          onWinRef.current?.();
        }
        const next = [...s, Math.floor(Math.random() * 4)];
        setRound(next.length);
        setPhase("show");
        timers.current.push(
          window.setTimeout(() => {
            setSeq(next);
            playSeq(next);
          }, 700)
        );
      }
    } else {
      setPhase("over");
      playSound("over");
      setBest((b) => {
        const nb = Math.max(b, s.length);
        try {
          localStorage.setItem("st_simon_best", String(nb));
        } catch {
          /* ignore */
        }
        return nb;
      });
    }
  };

  const status =
    phase === "show" ? "watch the sequence..." : phase === "input" ? "your turn — repeat it" : "sequence broken";

  return (
    <div className="select-none">
      <div className="mb-2 flex items-center justify-between font-mono text-xs">
        <span className="text-neon-cyan">▓ SIMON.exe</span>
        <span className="text-muted-foreground">
          round <span className="text-neon-green">{round}</span>
          {"  ·  "}best <span className="text-neon-cyan">{Math.max(best, round - 1)}</span>
        </span>
      </div>

      <div className="relative mx-auto grid max-w-[260px] grid-cols-2 gap-3">
        {PADS.map((p, i) => (
          <button
            key={i}
            onClick={() => press(i)}
            aria-label={`pad ${i + 1}`}
            className={`h-24 rounded-lg border transition-all duration-150 ${
              active === i ? `${p.on} scale-95` : p.idle
            }`}
          />
        ))}

        {phase === "over" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 rounded-lg bg-terminal-bg/85 backdrop-blur-sm">
            <p className="font-display text-2xl font-black neon-text-green">GAME OVER</p>
            <p className="font-mono text-sm text-foreground">
              round: <span className="text-neon-cyan">{round}</span> · best:{" "}
              <span className="text-neon-green">{Math.max(best, round - 1)}</span>
            </p>
            <p className="mt-1 font-mono text-[11px] text-muted-foreground">[enter] retry · [esc] exit</p>
          </div>
        )}
      </div>

      <p className="mt-2 text-center font-mono text-[11px] text-muted-foreground">
        {status} · reach <span className="text-neon-green">{WIN_ROUND}</span> to unlock 🧩 ·{" "}
        <span className="text-neon-cyan">esc</span> quits
      </p>
    </div>
  );
};

export default SimonGame;
