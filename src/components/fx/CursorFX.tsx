import React, { useEffect, useRef } from "react";

/**
 * Neon "comet" cursor: a precise core dot, a smoothed glow ring that
 * lerps behind the pointer and grows over interactive elements, plus a
 * fading particle trail. Native cursor is kept for accuracy.
 * No-ops on coarse pointers / reduced-motion.
 */
const CursorFX = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (coarse || reduce) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    const target = { x: w / 2, y: h / 2 };
    const ring = { x: w / 2, y: h / 2 };
    let radius = 16;
    let targetRadius = 16;
    let hue = 0;
    let visible = false;
    const trail: { x: number; y: number; life: number }[] = [];

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      visible = true;
      trail.push({ x: e.clientX, y: e.clientY, life: 1 });
      if (trail.length > 22) trail.shift();
      const interactive = (e.target as HTMLElement)?.closest?.("a,button,input,[role='button']");
      targetRadius = interactive ? 30 : 16;
    };
    const onLeave = () => (visible = false);
    const onDown = () => (targetRadius = 10);
    const onUp = () => (targetRadius = 16);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("resize", resize);

    let raf = 0;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      hue = (hue + 1.4) % 360;

      if (visible) {
        ring.x += (target.x - ring.x) * 0.18;
        ring.y += (target.y - ring.y) * 0.18;
        radius += (targetRadius - radius) * 0.2;

        ctx.globalCompositeOperation = "lighter";

        // trail
        for (let i = 0; i < trail.length; i++) {
          const p = trail[i];
          p.life *= 0.9;
          const r = 5 * p.life;
          if (r < 0.3) continue;
          ctx.beginPath();
          ctx.fillStyle = `hsla(${(hue + i * 6) % 360}, 100%, 65%, ${p.life * 0.5})`;
          ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
          ctx.fill();
        }

        // smoothed ring
        ctx.beginPath();
        ctx.strokeStyle = `hsla(${hue}, 100%, 62%, 0.8)`;
        ctx.lineWidth = 1.5;
        ctx.arc(ring.x, ring.y, radius, 0, Math.PI * 2);
        ctx.stroke();

        // core dot at exact pointer
        ctx.beginPath();
        ctx.fillStyle = `hsla(${(hue + 180) % 360}, 100%, 70%, 0.95)`;
        ctx.arc(target.x, target.y, 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalCompositeOperation = "source-over";
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[60] hidden md:block"
      aria-hidden
    />
  );
};

export default CursorFX;
