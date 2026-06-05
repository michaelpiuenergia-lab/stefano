"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Quote } from "lucide-react";

const reveal = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

export default function Trust() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Zoom + parallax dell'immagine full-bleed (range crescenti in [0,1])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.3]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["-6%", "10%"]);
  const veilOpacity = useTransform(scrollYProgress, [0, 1], [0.45, 0.7]);
  const yHaloA = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const yHaloB = useTransform(scrollYProgress, [0, 1], ["8%", "-10%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["24px", "-24px"]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] w-full items-center overflow-hidden bg-[#0b0a08] text-white"
    >
      {/* SFONDO IMMERSIVO full-bleed: foto reale + zoom/parallax allo scroll */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 overflow-hidden">
        <motion.img
          style={{ scale: bgScale }}
          src="/img/imgio1.webp"
          alt="Le persone dietro La Piramide"
          loading="lazy"
          className="h-full w-full object-cover object-top"
        />
      </motion.div>

      {/* Velatura scura cinematografica per leggibilità (si intensifica allo scroll) */}
      <motion.div
        style={{ opacity: veilOpacity }}
        className="absolute inset-0 bg-black"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0b0a08] via-[#0b0a08]/70 to-[#0b0a08]/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0b0a08] via-transparent to-[#0b0a08]/55" />
      {/* Velo oro tenue sopra l'immagine */}
      <div className="pointer-events-none absolute inset-0 bg-gold/5 mix-blend-overlay" />

      {/* Aloni oro tenui di sfondo con parallax */}
      <motion.div
        style={{ y: yHaloA }}
        className="pointer-events-none absolute -bottom-32 -left-24 h-[460px] w-[460px] rounded-full bg-gold/10 blur-[140px]"
      />
      <motion.div
        style={{ y: yHaloB }}
        className="pointer-events-none absolute -top-24 right-0 h-[420px] w-[520px] rounded-full bg-gold/10 blur-[140px]"
      />

      {/* CONTENUTO: testo grande sovrapposto, edge-to-edge ma centrato in un contenitore interno */}
      <motion.div
        style={{ y: yText }}
        className="relative mx-auto w-full max-w-6xl px-6 md:px-8"
      >
        <motion.div
          className="max-w-4xl"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Kicker */}
          <motion.span
            variants={reveal}
            className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[4px] text-gold-light"
          >
            <span className="h-px w-10 bg-gold-light" />
            Fiducia
          </motion.span>

          {/* Quote glyph */}
          <motion.div variants={reveal}>
            <Quote className="mt-8 h-14 w-14 text-gold/70 md:h-20 md:w-20" />
          </motion.div>

          {/* Dichiarazione / citazione GRANDE */}
          <motion.blockquote
            variants={reveal}
            className="mt-6 font-serif text-5xl font-medium leading-[1.02] tracking-tight text-white drop-shadow-[0_2px_30px_rgba(0,0,0,0.6)] sm:text-6xl md:text-7xl lg:text-[5.5rem]"
          >
            Dietro ogni lavoro ci siamo{" "}
            <span className="bg-gradient-to-r from-gold-light via-[#fff4cf] to-gold bg-clip-text text-transparent">
              noi
            </span>
            : persone presenti, attente e responsabili.
          </motion.blockquote>

          {/* Corpo */}
          <motion.p
            variants={reveal}
            className="mt-10 max-w-2xl text-lg leading-relaxed text-white/75 md:text-xl"
          >
            Pronte a seguire la tua comunicazione con cura reale. La trasparenza
            e la relazione umana sono alla base di ogni progetto che portiamo
            avanti.
          </motion.p>

          {/* Firma */}
          <motion.div variants={reveal} className="mt-14 flex items-center gap-5">
            <span className="h-px w-14 bg-gradient-to-r from-gold to-transparent" />
            <div className="flex flex-col">
              <span className="font-serif text-3xl italic leading-none text-gold-light md:text-4xl">
                La Piramide
              </span>
              <span className="mt-2 text-[11px] font-bold uppercase tracking-[3px] text-white/55">
                Persone vere
              </span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
