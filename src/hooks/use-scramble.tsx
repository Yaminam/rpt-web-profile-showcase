import { useEffect, useRef, useState } from "react";

const GLYPHS = "ABCDEFGHJKLMNPRSTUVWXYZ0123456789!<>-_\\/[]{}=+*^?#@%";

type ScrambleOpts = {
  /** ms between frames */
  speed?: number;
  /** frames to wait before locking each next character */
  revealEvery?: number;
  /** set false to hold the final text without animating (e.g. before in-view) */
  active?: boolean;
};

/**
 * "Decrypt" reveal: starts as random glyphs and resolves left-to-right
 * into the target text. Respects prefers-reduced-motion.
 */
export function useScramble(
  text: string,
  { speed = 30, revealEvery = 2, active = true }: ScrambleOpts = {}
) {
  const [output, setOutput] = useState(active ? "" : text);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (!active) {
      setOutput(text);
      return;
    }
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setOutput(text);
      return;
    }

    let revealed = 0;
    let tick = 0;

    const run = () => {
      let out = "";
      for (let i = 0; i < text.length; i++) {
        if (i < revealed || text[i] === " ") out += text[i];
        else out += GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      setOutput(out);

      tick++;
      if (tick % revealEvery === 0) revealed++;

      if (revealed <= text.length) {
        timer.current = setTimeout(run, speed);
      } else {
        setOutput(text);
      }
    };

    run();
    return () => clearTimeout(timer.current);
  }, [text, speed, revealEvery, active]);

  return output;
}
