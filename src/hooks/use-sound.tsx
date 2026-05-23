import { useSyncExternalStore } from "react";
import { isSoundOn, setSoundOn, playSound } from "@/lib/sound";

const subscribe = (cb: () => void) => {
  window.addEventListener("sound:change", cb);
  return () => window.removeEventListener("sound:change", cb);
};

/** Reactive view of the global sound toggle. */
export function useSound() {
  const enabled = useSyncExternalStore(subscribe, isSoundOn, () => false);
  const toggle = () => {
    const next = !isSoundOn();
    setSoundOn(next);
    if (next) playSound("toggle");
  };
  return { enabled, toggle };
}
