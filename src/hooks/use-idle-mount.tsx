import { useEffect, useState } from "react";

/** True once the browser is idle (never during SSR). Used to mount the terminal/games/FX layer late. */
export const useIdleMount = () => {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const ric = window.requestIdleCallback;
    if (ric) {
      const id = ric(() => setReady(true), { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }
    const t = setTimeout(() => setReady(true), 1200);
    return () => clearTimeout(t);
  }, []);
  return ready;
};
