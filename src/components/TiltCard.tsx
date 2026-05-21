import React, { useRef } from "react";
import { cn } from "@/lib/utils";

type TiltCardProps = {
  children: React.ReactNode;
  className?: string;
  /** max tilt in degrees */
  max?: number;
};

/**
 * Wraps content with a subtle mouse-driven 3D tilt + glare.
 * No-ops on coarse pointers.
 */
const TiltCard = ({ children, className, max = 8 }: TiltCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef(0);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rx = (py - 0.5) * -2 * max;
    const ry = (px - 0.5) * 2 * max;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
      el.style.setProperty("--mx", `${px * 100}%`);
      el.style.setProperty("--my", `${py * 100}%`);
    });
  };

  const reset = () => {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(raf.current);
    el.style.transform = "perspective(900px) rotateX(0) rotateY(0) scale(1)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={cn(
        "relative h-full transition-transform duration-200 ease-out [transform-style:preserve-3d] will-change-transform",
        className
      )}
    >
      {/* glare */}
      <div
        className="pointer-events-none absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 [background:radial-gradient(300px_circle_at_var(--mx,50%)_var(--my,50%),rgba(0,240,255,0.12),transparent_60%)] group-hover/tilt:opacity-100"
        aria-hidden
      />
      {children}
    </div>
  );
};

export default TiltCard;
