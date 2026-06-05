"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "motion/react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const images = [
  "/img/lavoro1.webp",
  "/img/lavoro2.webp",
  "/img/lavoro3.webp",
  "/img/lavoro4.webp",
  "/img/lavoro5.webp",
  "/img/lavoro6.webp",
  "/img/lavoro7.webp",
  "/img/lavoro8.webp",
];

const ease = [0.22, 1, 0.36, 1] as const;

const slideVariants = {
  enter: (dir: number) => ({ opacity: 0, scale: 1.08, x: dir > 0 ? 80 : -80 }),
  center: { opacity: 1, scale: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, scale: 1.03, x: dir > 0 ? -80 : 80 }),
};

export default function Works() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Zoom + parallax legati allo scroll (coerente con la Hero-viaggio).
  // RANGE SEMPRE CRESCENTI in [0,1].
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.3]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.18]);
  const mediaY = useTransform(scrollYProgress, [0, 1], ["24px", "-24px"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["28px", "-28px"]);
  const haloY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  const [[current, dir], setCurrent] = useState<[number, number]>([0, 0]);

  const paginate = (delta: number) =>
    setCurrent(([c]) => [(c + delta + images.length) % images.length, delta]);

  const goTo = (i: number) => setCurrent(([c]) => [i, i > c ? 1 : -1]);

  return (
    <section
      ref={ref}
      id="lavori"
      className="relative flex min-h-[100svh] w-full items-center overflow-hidden bg-[#0b0a08] py-24 text-white md:py-28"
    >
      {/* SFONDO IMMERSIVO full-bleed: l'immagine corrente sfocata riempie lo schermo */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.img
            key={`bg-${images[current]}`}
            src={images[current]}
            alt=""
            aria-hidden="true"
            loading="lazy"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease }}
            style={{ scale: bgScale, y: bgY }}
            className="absolute inset-0 h-full w-full scale-110 object-cover blur-2xl"
          />
        </AnimatePresence>
      </div>

      {/* Velatura scura per leggibilità (gradiente nero continuo) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-black/80" />
      <div className="pointer-events-none absolute inset-0 bg-black/45" />

      {/* Alone oro tenue (accenti di brand) */}
      <motion.div
        style={{ y: haloY }}
        className="pointer-events-none absolute -top-24 left-1/2 h-[460px] w-[680px] -translate-x-1/2 rounded-full bg-gold/10 blur-[150px]"
      />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[380px] w-[460px] translate-x-1/4 translate-y-1/4 rounded-full bg-gold-dark/10 blur-[160px]" />

      {/* CONTENUTO: testo full-bleed, immagine grande protagonista */}
      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        {/* Colonna testo editoriale grande, sovrapposta */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          style={{ y: textY }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12 } },
          }}
          className="max-w-xl"
        >
          <motion.span
            variants={{
              hidden: { opacity: 0, y: 30 },
              show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
            }}
            className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-gold-light"
          >
            <span className="h-px w-10 bg-gold-light" />
            Lavori e grafiche
          </motion.span>

          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 30 },
              show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
            }}
            className="mt-6 font-serif text-5xl font-semibold leading-[1.03] tracking-tight [text-shadow:0_4px_40px_rgba(0,0,0,0.8)] md:text-7xl"
          >
            I nostri lavori sul{" "}
            <span className="bg-gradient-to-r from-gold-light via-[#fff4cf] to-gold bg-clip-text text-transparent">
              territorio
            </span>
          </motion.h2>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 30 },
              show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
            }}
            className="mt-6 max-w-md text-lg leading-relaxed text-white/70 md:text-xl"
          >
            Una selezione di grafiche e materiali realizzati per campagne locali.
          </motion.p>

          {/* Controlli + contatore */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
            }}
            className="mt-10 flex items-center gap-6"
          >
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => paginate(-1)}
                aria-label="Lavoro precedente"
                className="inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-gold-light/40 bg-white/5 text-gold-light backdrop-blur transition hover:-translate-y-0.5 hover:border-gold-light hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-light"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => paginate(1)}
                aria-label="Lavoro successivo"
                className="inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-gold-light/40 bg-white/5 text-gold-light backdrop-blur transition hover:-translate-y-0.5 hover:border-gold-light hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-light"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <div className="font-serif text-sm tracking-[3px] text-white/45">
              <span className="text-2xl text-gold-light">
                {String(current + 1).padStart(2, "0")}
              </span>
              <span className="mx-2 text-white/25">/</span>
              {String(images.length).padStart(2, "0")}
            </div>
          </motion.div>

          {/* Progress bar segmentata */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
            }}
            className="mt-7 flex gap-2"
          >
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Vai al lavoro ${i + 1}`}
                className="group cursor-pointer py-2 focus:outline-none"
              >
                <span
                  className={`block h-[3px] rounded-full transition-all duration-500 ${
                    i === current
                      ? "w-10 bg-gradient-to-r from-gold-light to-gold shadow-[0_0_10px_rgba(201,168,76,0.5)]"
                      : "w-5 bg-white/20 group-hover:bg-white/40"
                  }`}
                />
              </button>
            ))}
          </motion.div>
        </motion.div>

        {/* Vetrina: immagine GRANDE protagonista, con zoom allo scroll */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease }}
          className="relative"
        >
          {/* Linea oro decorativa in alto */}
          <div className="pointer-events-none absolute -top-4 left-0 right-0 z-20 h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-60" />

          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-gold/15 bg-white/[0.04] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.85)] backdrop-blur transition hover:border-gold/35 md:aspect-[5/6]">
            {/* Wrapper con zoom + parallax legati allo scroll (avvicinamento) */}
            <motion.div
              style={{ scale: mediaScale, y: mediaY }}
              className="absolute inset-0"
            >
              <AnimatePresence initial={false} custom={dir} mode="popLayout">
                <motion.img
                  key={images[current]}
                  src={images[current]}
                  alt={`Lavoro grafico ${current + 1}`}
                  loading="lazy"
                  custom={dir}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.7, ease }}
                  className="absolute inset-0 h-full w-full object-contain p-3 md:p-4"
                />
              </AnimatePresence>
            </motion.div>

            {/* Overlay scuro per leggibilità didascalia */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

            {/* Cornice oro sottile interna */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-gold/15" />

            {/* Didascalia editoriale in overlay */}
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 md:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.5, ease }}
                >
                  <span className="text-[10px] font-bold uppercase tracking-[4px] text-gold-light">
                    Campagna locale
                  </span>
                  <p className="mt-1 font-serif text-2xl leading-tight text-white md:text-3xl">
                    Lavoro {String(current + 1).padStart(2, "0")}
                  </p>
                </motion.div>
              </AnimatePresence>

              <span className="hidden shrink-0 items-center gap-2 text-[10px] font-bold uppercase tracking-[3px] text-white/60 sm:inline-flex">
                Grafica
                <ArrowRight className="h-3.5 w-3.5 text-gold-light" />
              </span>
            </div>

            {/* Frecce su immagine (mobile) */}
            <button
              type="button"
              onClick={() => paginate(-1)}
              aria-label="Lavoro precedente"
              className="absolute left-3 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-gold-light/30 bg-black/40 text-gold-light backdrop-blur transition hover:border-gold-light hover:bg-black/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-light lg:hidden"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => paginate(1)}
              aria-label="Lavoro successivo"
              className="absolute right-3 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-gold-light/30 bg-black/40 text-gold-light backdrop-blur transition hover:border-gold-light hover:bg-black/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-light lg:hidden"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
