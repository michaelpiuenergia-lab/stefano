"use client";

import { useEffect } from "react";

export function useScrollReveal(threshold = 0.12) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const items = document.querySelectorAll<HTMLElement>(".reveal");
    if (!items.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [threshold]);
}
