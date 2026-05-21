import React, { useEffect, useRef } from "react";

/**
 * Full-screen radial glow that follows the cursor.
 * Disabled on touch / coarse pointers to avoid jank.
 */
const Spotlight = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        el.style.setProperty("--mx", `${e.clientX}px`);
        el.style.setProperty("--my", `${e.clientY}px`);
      });
    };

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="spotlight pointer-events-none fixed inset-0 z-30 hidden md:block"
      aria-hidden
    />
  );
};

export default Spotlight;
