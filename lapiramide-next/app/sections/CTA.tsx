"use client";

import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

/* Piramidi al tramonto — scena finale epica full-bleed (Unsplash, verificata) */
const SILHOUETTE =
  "https://images.unsplash.com/photo-1746310783422-16df7622e7c9?w=2400&q=85&auto=format&fit=crop";

const reveal = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
};

export default function CTA() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Zoom dello sfondo deserto allo scroll (avvicinamento cinematografico) — range crescente in [0,1]
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.3]);
  // Parallax verticale dell'immagine full-bleed
  const yImg = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  // Velatura che si intensifica avvicinandosi (più immersiva al centro scena)
  const veilOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.45, 0.6, 0.75]);
  // Parallax dell'alone oro di sfondo
  const yHalo = useTransform(scrollYProgress, [0, 1], ["-14%", "14%"]);
  // Leggero parallax del blocco testo
  const yText = useTransform(scrollYProgress, [0, 1], ["28px", "-28px"]);

  return (
    <section
      ref={ref}
      id="contatti"
      className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-[#0b0a08] text-white"
    >
      {/* SFONDO IMMERSIVO full-bleed: piramidi al tramonto edge-to-edge con zoom + parallax allo scroll */}
      <motion.div style={{ y: yImg }} className="absolute inset-0 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <motion.img
          style={{ scale: bgScale }}
          src={SILHOUETTE}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* Velatura scura dinamica per leggibilità — si intensifica allo scroll */}
      <motion.div style={{ opacity: veilOpacity }} className="absolute inset-0 bg-black" />
      {/* Gradienti caldi per fondere i bordi nel nero continuo #0b0a08 */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0b0a08] via-[#0b0a08]/70 to-[#0b0a08]/30" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-[#0b0a08] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-80 bg-gradient-to-t from-[#0b0a08] to-transparent" />

      {/* Alone oro tenue di sfondo con parallax verticale */}
      <motion.div
        style={{ y: yHalo }}
        className="pointer-events-none absolute -top-24 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-gold/10 blur-[150px]"
      />

      {/* Linea oro in alto */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-50" />

      {/* CONTENUTO: testo ENORME sovrapposto, centrato verticalmente */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        style={{ y: yText }}
        className="relative z-10 mx-auto w-full max-w-6xl px-6 py-28 text-center md:py-36"
      >
        <motion.span
          variants={reveal}
          className="mb-8 inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[4px] text-gold-light"
        >
          <span className="h-px w-10 bg-gold-light" />
          Iniziamo
          <span className="h-px w-10 bg-gold-light" />
        </motion.span>

        <motion.h2
          variants={reveal}
          className="font-serif text-5xl font-semibold leading-[1.0] tracking-tight [text-shadow:0_4px_50px_rgba(0,0,0,0.8)] sm:text-6xl md:text-7xl lg:text-8xl"
        >
          Ogni giorno senza{" "}
          <span className="bg-gradient-to-r from-gold-light via-[#fff4cf] to-gold bg-clip-text text-transparent">
            visibilità
          </span>{" "}
          è un cliente perso.
        </motion.h2>

        <motion.p
          variants={reveal}
          className="mx-auto mt-10 mb-14 max-w-xl text-lg text-white/75 [text-shadow:0_2px_18px_rgba(0,0,0,0.9)] md:text-xl"
        >
          Noi ti aiutiamo a trovarlo.
        </motion.p>

        <motion.div variants={reveal}>
          <motion.a
            whileHover={{ y: -4 }}
            href="https://wa.me/393457340981?text=Salve,%20vorrei%20un%20preventivo%20gratuito%20per%20pubblicita%20e%20distribuzione%20volantini"
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-gradient-to-br from-gold-light via-gold to-gold-dark px-8 py-4 text-xs font-bold uppercase tracking-widest text-dark shadow-lg shadow-gold/20 transition hover:-translate-y-0.5 hover:shadow-[0_0_55px_rgba(201,168,76,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0a08] md:text-sm"
          >
            Richiedi una strategia gratuita <ArrowRight size={16} />
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
