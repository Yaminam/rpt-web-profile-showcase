import React, { useEffect, useReducer, useRef } from "react";
import { playSound } from "@/lib/sound";

const COLS = 22;
const ROWS = 14;
const TICK = 110;
const WIN_AT = 5;

type P = { x: number; y: number };
type Dir = "U" | "D" | "L" | "R";

const rand = (n: number) => Math.floor(Math.random() * n);

type SnakeGameProps = {
  onExit: (score: number) => void;
  /** fired once when the player reaches the win threshold */
  onWin?: () => void;
};

/** A self-contained, keyboard-driven Snake that renders inside the terminal. */
const SnakeGame = ({ onExit, onWin }: SnakeGameProps) => {
  const g = useRef({
    snake: [
      { x: 10, y: 7 },
      { x: 9, y: 7 },
      { x: 8, y: 7 },
    ] as P[],
    food: { x: 15, y: 7 } as P,
    dir: "R" as Dir,
    next: "R" as Dir,
    score: 0,
    dead: false,
    won: false,
  });
  const [, force] = useReducer((x: number) => x + 1, 0);
  const [best, setBest] = useState(() => {
    try {
      return parseInt(localStorage.getItem("st_snake_best") || "0", 10) || 0;
    } catch {
      return 0;
    }
  });
  const onExitRef = useRef(onExit);
  onExitRef.current = onExit;
  const onWinRef = useRef(onWin);
  onWinRef.current = onWin;

  const place = (body: P[]): P => {
    let p: P;
    do {
      p = { x: rand(COLS), y: rand(ROWS) };
    } while (body.some((s) => s.x === p.x && s.y === p.y));
    return p;
  };

  const reset = () => {
    g.current = {
      snake: [
        { x: 10, y: 7 },
        { x: 9, y: 7 },
        { x: 8, y: 7 },
      ],
      food: { x: 15, y: 7 },
      dir: "R",
      next: "R",
      score: 0,
      dead: false,
      won: g.current.won,
    };
    playSound("start");
    force();
  };

  useEffect(() => {
    playSound("start");

    const turn = (d: Dir, opp: Dir) => {
      if (g.current.dir !== opp) g.current.next = d;
    };

    const onKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          e.preventDefault();
          turn("U", "D");
          break;
        case "ArrowDown":
        case "s":
        case "S":
          e.preventDefault();
          turn("D", "U");
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          e.preventDefault();
          turn("L", "R");
          break;
        case "ArrowRight":
        case "d":
        case "D":
          e.preventDefault();
          turn("R", "L");
          break;
        case "Escape":
          onExitRef.current(g.current.score);
          break;
        case "Enter":
          if (g.current.dead) reset();
          break;
      }
    };
    window.addEventListener("keydown", onKey);

    const id = setInterval(() => {
      const st = g.current;
      if (st.dead) return;
      st.dir = st.next;
      const head = { ...st.snake[0] };
      if (st.dir === "U") head.y -= 1;
      if (st.dir === "D") head.y += 1;
      if (st.dir === "L") head.x -= 1;
      if (st.dir === "R") head.x += 1;

      const hitWall = head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS;
      const hitSelf = st.snake.some((s) => s.x === head.x && s.y === head.y);
      if (hitWall || hitSelf) {
        st.dead = true;
        playSound("over");
        setBest((b) => {
          const nb = Math.max(b, st.score);
          try {
            localStorage.setItem("st_snake_best", String(nb));
          } catch {
            /* ignore */
          }
          return nb;
        });
        force();
        return;
      }

      const ate = head.x === st.food.x && head.y === st.food.y;
      st.snake = [head, ...st.snake];
      if (ate) {
        st.score += 1;
        playSound("eat");
        st.food = place(st.snake);
        if (!st.won && st.score >= WIN_AT) {
          st.won = true;
          onWinRef.current?.();
        }
      } else {
        st.snake.pop();
      }
      force();
    }, TICK);

    return () => {
      clearInterval(id);
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { snake, food, score, dead } = g.current;
  const headP = snake[0];

  return (
    <div className="select-none">
      <div className="mb-2 flex items-center justify-between font-mono text-xs">
        <span className="text-neon-cyan">▓ SNAKE.exe</span>
        <span className="text-muted-foreground">
          score <span className="text-neon-green">{score}</span>
          {"  ·  "}best <span className="text-neon-cyan">{Math.max(best, score)}</span>
        </span>
      </div>

      <div className="relative inline-block rounded border border-neon-cyan/25 bg-black/40 p-2">
        {Array.from({ length: ROWS }).map((_, y) => (
          <div key={y} className="flex">
            {Array.from({ length: COLS }).map((_, x) => {
              const isHead = headP.x === x && headP.y === y;
              const isBody = !isHead && snake.some((s) => s.x === x && s.y === y);
              const isFood = food.x === x && food.y === y;
              let ch = "·";
              let cls = "text-neon-cyan/10";
              if (isFood) {
                ch = "★";
                cls = "text-neon-magenta";
              }
              if (isBody) {
                ch = "▣";
                cls = "text-neon-green/70";
              }
              if (isHead) {
                ch = "█";
                cls = "text-neon-cyan";
              }
              return (
                <span
                  key={x}
                  className={`inline-flex h-3.5 w-3.5 items-center justify-center font-mono text-[11px] leading-none ${cls}`}
                >
                  {ch}
                </span>
              );
            })}
          </div>
        ))}

        {dead && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-terminal-bg/85 backdrop-blur-sm">
            <p className="font-display text-2xl font-black neon-text-green">GAME OVER</p>
            <p className="font-mono text-sm text-foreground">
              score: <span className="text-neon-cyan">{score}</span> · best:{" "}
              <span className="text-neon-green">{Math.max(best, score)}</span>
            </p>
            <p className="mt-1 font-mono text-[11px] text-muted-foreground">
              [enter] retry · [esc] exit
            </p>
          </div>
        )}
      </div>

      <p className="mt-2 font-mono text-[11px] text-muted-foreground">
        move: <span className="text-neon-cyan">arrows / wasd</span> · reach{" "}
        <span className="text-neon-green">{WIN_AT}</span> to unlock 🐍 · <span className="text-neon-cyan">esc</span> quits
      </p>
    </div>
  );
};

export default SnakeGame;
