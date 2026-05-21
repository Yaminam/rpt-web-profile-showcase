import React, { useEffect, useRef } from "react";

type MatrixRainProps = {
  className?: string;
  color?: string;
  fontSize?: number;
  /** 0..1 — fade strength of the trailing effect */
  fade?: number;
};

/**
 * Canvas "digital rain" that fills its positioned parent.
 * Pauses when scrolled out of view and respects reduced-motion.
 */
const MatrixRain = ({
  className,
  color = "#39ff14",
  fontSize = 14,
  fade = 0.08,
}: MatrixRainProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const chars = "アイウエオカキクケコ01ｱｲｳｴｵ<>/{}[]=$#*+".split("");
    let columns = 0;
    let drops: number[] = [];
    let raf = 0;
    let running = true;

    const resize = () => {
      const parent = canvas.parentElement;
      const w = parent?.clientWidth ?? window.innerWidth;
      const h = parent?.clientHeight ?? 300;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      columns = Math.floor(w / fontSize);
      drops = Array.from({ length: columns }, () => Math.random() * (h / fontSize));
    };

    const draw = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.fillStyle = `rgba(5, 6, 10, ${fade})`;
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = color;
      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        // brighter leading character
        ctx.fillStyle = Math.random() > 0.975 ? "#eafff0" : color;
        ctx.fillText(text, x, y);
        if (y > h && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);

    const io = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting;
        if (running && !reduce) {
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(draw);
        } else {
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    if (!reduce) raf = requestAnimationFrame(draw);
    else {
      // static single frame for reduced motion
      ctx.fillStyle = color;
      ctx.font = `${fontSize}px monospace`;
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      io.disconnect();
    };
  }, [color, fontSize, fade]);

  return <canvas ref={canvasRef} className={className} aria-hidden />;
};

export default MatrixRain;
