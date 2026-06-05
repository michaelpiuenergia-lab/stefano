"use client";

import { useEffect, useRef } from "react";

/**
 * Polvere d'oro atmosferica — particelle dorate che fluttuano verso l'alto.
 * Canvas puro, nessuna dipendenza esterna. Si adatta al contenitore (absolute inset-0).
 * Rispetta prefers-reduced-motion.
 */
export default function GoldDust({
  density = 0.00006,
  className = "",
}: {
  density?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const parent = canvas.parentElement ?? canvas;
    let w = 0;
    let h = 0;
    let raf = 0;
    type P = { x: number; y: number; r: number; vx: number; vy: number; a: number; tw: number; tp: number };
    let particles: P[] = [];

    const init = () => {
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(140, Math.max(24, Math.round(w * h * density)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.6 + 0.4,
        vx: (Math.random() - 0.5) * 0.12,
        vy: -(Math.random() * 0.28 + 0.05),
        a: Math.random() * 0.5 + 0.2,
        tw: Math.random() * 0.02 + 0.004,
        tp: Math.random() * Math.PI * 2,
      }));
    };

    init();
    const ro = new ResizeObserver(init);
    ro.observe(parent);

    const loop = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.y += p.vy;
        p.x += p.vx;
        p.tp += p.tw;
        if (p.y < -6) { p.y = h + 6; p.x = Math.random() * w; }
        if (p.x < -6) p.x = w + 6;
        else if (p.x > w + 6) p.x = -6;
        const alpha = p.a * (0.55 + 0.45 * Math.sin(p.tp));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(224, 198, 120, ${alpha})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
