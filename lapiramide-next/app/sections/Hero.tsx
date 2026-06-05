"use client";

import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "motion/react";
import { ArrowRight } from "lucide-react";
import GoldDust from "../components/GoldDust";

const ease = [0.22, 1, 0.36, 1] as const;

type Stage = {
  img: string;
  kicker: string;
  pre: string;
  gold: string;
  final?: boolean;
  op: [number[], number[]];
  sc: [number[], number[]];
};

const stages: Stage[] = [
  {
    img: "https://images.unsplash.com/photo-1746310783422-16df7622e7c9?w=2400&q=85&auto=format&fit=crop",
    kicker: "Il viaggio", pre: "Tutto parte dal", gold: "deserto.",
    op: [[0, 0.2, 0.28], [1, 1, 0]], sc: [[0, 0.28], [1.1, 1.3]],
  },
  {
    img: "https://images.unsplash.com/photo-1764312349609-41297ede0e57?w=2400&q=85&auto=format&fit=crop",
    kicker: "Dentro", pre: "Entriamo nella", gold: "Piramide.",
    op: [[0.2, 0.3, 0.45, 0.53], [0, 1, 1, 0]], sc: [[0.2, 0.53], [1.1, 1.3]],
  },
  {
    img: "https://images.unsplash.com/photo-1764312349537-910a5b9b3a2a?w=2400&q=85&auto=format&fit=crop",
    kicker: "I corridoi", pre: "Nei", gold: "corridoi giusti.",
    op: [[0.45, 0.55, 0.7, 0.78], [0, 1, 1, 0]], sc: [[0.45, 0.78], [1.1, 1.3]],
  },
  {
    img: "https://images.unsplash.com/photo-1718728593313-1dc58f83f0ac?w=2400&q=85&auto=format&fit=crop",
    kicker: "La meta", pre: "Fino al tuo", gold: "cliente.", final: true,
    op: [[0.7, 0.82, 1], [0, 1, 1]], sc: [[0.7, 1], [1.1, 1.3]],
  },
];
const N = stages.length;

function StageImage({ p, s }: { p: MotionValue<number>; s: Stage }) {
  const opacity = useTransform(p, s.op[0], s.op[1]);
  const scale = useTransform(p, s.sc[0], s.sc[1]);
  return (
    <motion.div style={{ opacity }} className="absolute inset-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <motion.img style={{ scale }} src={s.img} alt="" className="h-full w-full object-cover" />
    </motion.div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const hintOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(N - 1, Math.max(0, Math.floor(v * N)));
    setActive((prev) => (prev === idx ? prev : idx));
  });

  const s = stages[active];

  return (
    <section ref={ref} id="top" className="relative h-[260vh] w-full bg-black text-white">
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        {/* immagini del viaggio (si fondono e zoomano = avvicinamento) */}
        <div className="absolute inset-0">
          {stages.map((st, i) => (
            <StageImage key={i} p={scrollYProgress} s={st} />
          ))}
        </div>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/65" />

        {/* polvere d'oro atmosferica (tocco unico) */}
        <GoldDust className="z-[5]" />

        {/* UNA sola didascalia per volta */}
        <div className="absolute inset-0 z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -28 }}
              transition={{ duration: 0.5, ease }}
              className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
            >
              <span className="mb-5 inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-gold-light">
                <span className="h-px w-8 bg-gold-light" />
                {s.kicker}
                <span className="h-px w-8 bg-gold-light" />
              </span>
              <h2 className="max-w-4xl font-serif text-4xl font-semibold leading-[1.05] tracking-tight [text-shadow:0_4px_40px_rgba(0,0,0,0.8)] sm:text-6xl md:text-7xl">
                {s.pre}{" "}
                <span className="bg-gradient-to-r from-gold-light via-[#fff4cf] to-gold bg-clip-text text-transparent">
                  {s.gold}
                </span>
              </h2>
              {s.final && (
                <a
                  href="https://wa.me/393457340981?text=Salve,%20vorrei%20una%20strategia%20gratuita%20per%20la%20mia%20attivita"
                  className="pointer-events-auto mt-9 inline-flex items-center gap-3 rounded-full bg-gradient-to-br from-gold-light via-gold to-gold-dark px-8 py-4 text-xs font-black uppercase tracking-widest text-dark shadow-[0_0_30px_rgba(201,168,76,0.4)] transition hover:-translate-y-0.5"
                >
                  Richiedi una strategia <ArrowRight size={15} />
                </a>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* barra di avanzamento del viaggio */}
        <div className="absolute inset-x-0 bottom-0 z-20 h-[3px] bg-white/10">
          <motion.div style={{ scaleX: scrollYProgress, transformOrigin: "left" }} className="h-full bg-gradient-to-r from-gold-light to-gold" />
        </div>

        {/* indicatore numerico tappa */}
        <div className="absolute right-5 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-3 md:flex">
          {stages.map((_, i) => (
            <span
              key={i}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${i === active ? "scale-150 bg-gold-light" : "bg-white/25"}`}
            />
          ))}
        </div>

        <motion.div
          style={{ opacity: hintOpacity }}
          className="pointer-events-none absolute bottom-8 left-1/2 z-20 -translate-x-1/2 text-[10px] font-bold uppercase tracking-[0.3em] text-white/60"
        >
          <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }} className="inline-block">
            Scorri per entrare ↓
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
}
