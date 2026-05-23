import React, { useEffect, useRef, useState } from "react";
import { playSound } from "@/lib/sound";

const SENTENCES = [
  "const greatness = skill + consistency;",
  "ship fast, refactor faster, never stop learning",
  "while (alive) { build(); learn(); repeat(); }",
  "clean code looks like it was easy to write",
  "first solve the problem, then write the code",
  "talk is cheap, show me the working commit",
];

const WIN_WPM = 40;
const WIN_ACC = 90;

type TypeTestProps = {
  onExit: (wpm: number) => void;
  onWin?: () => void;
};

/** Type-the-sentence speed test with live WPM + accuracy. */
const TypeTest = ({ onExit, onWin }: TypeTestProps) => {
  const [target, setTarget] = useState(
    () => SENTENCES[(Math.random() * SENTENCES.length) | 0]
  );
  const [value, setValue] = useState("");
  const [result, setResult] = useState<{ wpm: number; acc: number } | null>(null);
  const startRef = useRef<number | null>(null);
  const wonRef = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [target]);

  const finish = (typed: string) => {
    const end = Date.now();
    const mins = Math.max((end - (startRef.current ?? end)) / 60000, 1 / 600);
    const words = target.length / 5;
    const wpm = Math.round(words / mins);
    let correct = 0;
    for (let i = 0; i < target.length; i++) if (typed[i] === target[i]) correct++;
    const acc = Math.round((correct / target.length) * 100);
    setResult({ wpm, acc });
    if (wpm >= WIN_WPM && acc >= WIN_ACC) {
      playSound("win");
      if (!wonRef.current) {
        wonRef.current = true;
        onWin?.();
      }
    } else {
      playSound("over");
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (result) return;
    const v = e.target.value;
    if (startRef.current === null && v.length > 0) startRef.current = Date.now();
    playSound("key");
    setValue(v);
    if (v.length >= target.length) finish(v);
  };

  const reset = () => {
    setTarget(SENTENCES[(Math.random() * SENTENCES.length) | 0]);
    setValue("");
    setResult(null);
    startRef.current = null;
    setTimeout(() => inputRef.current?.focus(), 30);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onExit(result?.wpm ?? 0);
    else if (e.key === "Enter" && result) reset();
  };

  return (
    <div className="select-none" onClick={() => inputRef.current?.focus()}>
      <div className="mb-2 flex items-center justify-between font-mono text-xs">
        <span className="text-neon-cyan">▓ TYPE.test</span>
        <span className="text-muted-foreground">
          target <span className="text-neon-green">{WIN_WPM}</span> wpm
        </span>
      </div>

      <p className="rounded border border-neon-cyan/20 bg-black/30 p-3 font-mono text-sm leading-relaxed tracking-wide">
        {target.split("").map((ch, i) => {
          let cls = "text-muted-foreground/60";
          if (i < value.length) cls = value[i] === ch ? "text-neon-green" : "text-destructive underline";
          else if (i === value.length) cls = "bg-neon-cyan/30 text-foreground";
          return (
            <span key={i} className={cls}>
              {ch}
            </span>
          );
        })}
      </p>

      <input
        ref={inputRef}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        spellCheck={false}
        autoComplete="off"
        disabled={!!result}
        className="mt-2 w-full rounded border border-border bg-transparent px-3 py-2 font-mono text-sm text-foreground caret-neon-cyan outline-none focus:border-neon-cyan/50"
        placeholder="start typing..."
        aria-label="typing test input"
      />

      {result ? (
        <div className="mt-3 font-mono text-sm">
          <p>
            <span className="text-neon-cyan">{result.wpm}</span> wpm ·{" "}
            <span className="text-neon-cyan">{result.acc}%</span> accuracy{" "}
            {result.wpm >= WIN_WPM && result.acc >= WIN_ACC ? (
              <span className="text-neon-green">— ⚡ Fast Fingers!</span>
            ) : (
              <span className="text-muted-foreground">— keep practicing</span>
            )}
          </p>
          <p className="mt-1 text-[11px] text-muted-foreground">[enter] retry · [esc] exit</p>
        </div>
      ) : (
        <p className="mt-2 font-mono text-[11px] text-muted-foreground">
          type the line exactly · <span className="text-neon-cyan">esc</span> quits
        </p>
      )}
    </div>
  );
};

export default TypeTest;
