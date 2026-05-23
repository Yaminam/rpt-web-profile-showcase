import React, { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vr: number;
  size: number;
  color: string;
  glyph: string | null;
  life: number;
};

const COLORS = ["#00f0ff", "#ff2bd6", "#39ff14", "#a855f7", "#fde047"];
const GLYPHS = ["0", "1", "</>", "★", "▣", "{}"];

/**
 * Neon confetti / glyph burst. Fires on the `fx:burst` window event
 * (dispatched on every achievement unlock). Reduced-motion → no-op.
 */
const ConfettiFX = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const raf = useRef(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canvas = canvasRef.current;
    if (!canvas || reduce) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const loop = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      const ps = particles.current;
      for (let i = ps.length - 1; i >= 0; i--) {
        const p = ps[i];
        p.vy += 0.18; // gravity
        p.vx *= 0.99;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        p.life -= 0.012;
        if (p.life <= 0 || p.y > h + 40) {
          ps.splice(i, 1);
          continue;
        }
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = Math.max(0, Math.min(1, p.life));
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        if (p.glyph) {
          ctx.font = `${p.size + 6}px "JetBrains Mono", monospace`;
          ctx.fillText(p.glyph, 0, 0);
        } else {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.5);
        }
        ctx.restore();
      }
      if (ps.length > 0) {
        raf.current = requestAnimationFrame(loop);
      } else {
        ctx.clearRect(0, 0, w, h);
        raf.current = 0;
      }
    };

    const burst = (e: Event) => {
      const detail = (e as CustomEvent).detail || {};
      const cx = detail.x ?? window.innerWidth / 2;
      const cy = detail.y ?? window.innerHeight * 0.55;
      for (let i = 0; i < 90; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 4 + Math.random() * 9;
        const useGlyph = Math.random() > 0.55;
        particles.current.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 4,
          rot: Math.random() * Math.PI,
          vr: (Math.random() - 0.5) * 0.4,
          size: 5 + Math.random() * 6,
          color: COLORS[(Math.random() * COLORS.length) | 0],
          glyph: useGlyph ? GLYPHS[(Math.random() * GLYPHS.length) | 0] : null,
          life: 1,
        });
      }
      if (!raf.current) raf.current = requestAnimationFrame(loop);
    };

    window.addEventListener("fx:burst", burst);
    return () => {
      window.removeEventListener("fx:burst", burst);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[130]"
      aria-hidden
    />
  );
};

export default ConfettiFX;
