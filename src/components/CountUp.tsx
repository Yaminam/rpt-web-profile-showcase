import React, { useEffect, useState } from "react";
import { useReveal } from "@/hooks/use-reveal";

type CountUpProps = {
  end: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
};

/**
 * Counts from 0 to `end` once it scrolls into view. The prerendered HTML (and crawlers) get the real
 * number; only after hydration does an off-screen counter reset to 0 so it can count up when seen.
 */
const CountUp = ({ end, prefix = "", suffix = "", duration = 1400, className }: CountUpProps) => {
  const { ref, isVisible } = useReveal<HTMLSpanElement>({ threshold: 0.4 });
  const [value, setValue] = useState(end);

  // Hydrated and not yet on screen: start from 0 so the count-up plays when it scrolls in.
  useEffect(() => {
    if (!isVisible) setValue(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * end));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isVisible, end, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
};

export default CountUp;
