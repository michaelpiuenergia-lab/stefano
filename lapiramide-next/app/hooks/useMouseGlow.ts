"use client";

import { useEffect } from "react";

export function useMouseGlow(selector = ".glow-card") {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const cards = document.querySelectorAll<HTMLElement>(selector);
    if (!cards.length) return;

    const onMove = (e: MouseEvent, card: HTMLElement) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty("--mouse-x", `${x}%`);
      card.style.setProperty("--mouse-y", `${y}%`);
    };

    const listeners: Array<{ el: HTMLElement; fn: (e: MouseEvent) => void }> = [];

    cards.forEach((card) => {
      const fn = (e: MouseEvent) => onMove(e, card);
      card.addEventListener("mousemove", fn);
      listeners.push({ el: card, fn });
    });

    return () => {
      listeners.forEach(({ el, fn }) => el.removeEventListener("mousemove", fn));
    };
  }, [selector]);
}
