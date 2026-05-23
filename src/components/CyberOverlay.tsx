import React, { useCallback, useEffect, useRef, useState } from "react";
import MatrixRain from "@/components/MatrixRain";
import { useKonami } from "@/hooks/use-konami";
import { useAchievements } from "@/hooks/use-achievements";

type OverlayState = { title: string; subtitle: string } | null;

/**
 * Full-screen "matrix takeover" easter-egg overlay.
 * Triggered by the Konami code or a `cyber:overlay` window event
 * (e.g. the terminal's `matrix` command). Auto-dismisses; click to skip.
 */
const CyberOverlay = () => {
  const { unlock } = useAchievements();
  const [state, setState] = useState<OverlayState>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const show = useCallback((title: string, subtitle: string, ms = 5200) => {
    setState({ title, subtitle });
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState(null), ms);
  }, []);

  const onKonami = useCallback(() => {
    unlock("konami");
    show("ACCESS OVERRIDE", "// god mode engaged — you found the secret");
  }, [unlock, show]);

  useKonami(onKonami);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail || {};
      show(detail.title || "WAKE UP, NEO", detail.subtitle || "// follow the white rabbit");
    };
    window.addEventListener("cyber:overlay", handler);
    return () => {
      window.removeEventListener("cyber:overlay", handler);
      clearTimeout(timer.current);
    };
  }, [show]);

  if (!state) return null;

  return (
    <div
      className="fixed inset-0 z-[120] flex cursor-pointer items-center justify-center overflow-hidden bg-terminal-bg/85 backdrop-blur-sm"
      onClick={() => setState(null)}
      role="presentation"
    >
      <MatrixRain className="absolute inset-0 h-full w-full" color="#39ff14" fade={0.07} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.65)_100%)]" />
      <div className="relative px-6 text-center">
        <p className="font-display text-4xl font-black neon-text-green animate-flicker md:text-7xl">
          {state.title}
        </p>
        <p className="mt-4 font-mono text-sm text-neon-cyan md:text-base">{state.subtitle}</p>
        <p className="mt-8 font-mono text-[11px] text-muted-foreground">[ click anywhere to exit ]</p>
      </div>
    </div>
  );
};

export default CyberOverlay;
