import React, { useEffect, useState } from "react";

/** Thin neon bar pinned to the very top that fills as you scroll. */
const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
      setProgress(Math.min(1, Math.max(0, scrolled)) * 100);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-0.5 bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-magenta transition-[width] duration-150 ease-out"
        style={{
          width: `${progress}%`,
          boxShadow: "0 0 10px rgba(0,240,255,0.8), 0 0 4px rgba(255,43,214,0.6)",
        }}
      />
    </div>
  );
};

export default ScrollProgress;
