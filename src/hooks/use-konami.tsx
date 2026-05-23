import { useEffect, useRef } from "react";

const SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

/** Fires `onUnlock` when the classic Konami code is entered. */
export function useKonami(onUnlock: () => void) {
  const idx = useRef(0);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === SEQUENCE[idx.current]) {
        idx.current += 1;
        if (idx.current === SEQUENCE.length) {
          idx.current = 0;
          onUnlock();
        }
      } else {
        idx.current = key === SEQUENCE[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onUnlock]);
}
