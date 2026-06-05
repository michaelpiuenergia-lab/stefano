"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { MapPin, ArrowRight } from "lucide-react";

// distribuzione-8 esclusa (immagine non valida)
const images = [1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14].map((n) => `/img/distribuzione-${n}.webp`);

const ease = [0.22, 1, 0.36, 1] as const;

const reveal = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

// Tessera full-bleed: foto grande edge-to-edge con zoom legato allo scroll
function GalleryTile({ src, i }: { src: string; i: number }) {
  const tileRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: tileRef,
    offset: ["start end", "end start"],
  });
  // Avvicinamento/zoom legato allo scroll (range crescente in [0,1])
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.28]);

  return (
    <motion.div
      ref={tileRef}
      variants={reveal}
      className="group relative aspect-[4/3] overflow-hidden bg-[#0b0a08] md:aspect-[3/2]"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <motion.img
        style={{ scale: imgScale }}
        src={src}
        alt={`Distribuzione ${i + 1}`}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
      />
      {/* Velatura scura per leggibilità della didascalia */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/30 opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-light to-transparent opacity-30 transition-opacity duration-500 group-hover:opacity-80" />
      {/* Numero progressivo ordinato */}
      <span className="pointer-events-none absolute right-6 top-4 font-serif text-7xl font-semibold leading-none text-white/10 transition-colors duration-500 group-hover:text-gold/25 md:text-8xl">
        {(i + 1).toString().padStart(2, "0")}
      </span>
      <figcaption className="absolute inset-x-6 bottom-6 flex items-center gap-2 text-sm font-medium text-white md:text-base">
        <MapPin className="h-4 w-4 shrink-0 text-gold-light" />
        Distribuzione {i + 1}
      </figcaption>
    </motion.div>
  );
}

export default function Gallery() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Zoom dello sfondo immersivo legato allo scroll (range crescente in [0,1])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.3]);
  // Parallax verticale sull'alone oro e sul testo della scena d'apertura
  const yHalo = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0px", "-60px"]);

  return (
    <section
      ref={ref}
      id="distribuzioni"
      className="relative w-full overflow-hidden bg-[#0b0a08] text-white"
    >
      {/* ── SCENA D'APERTURA: full-bleed, altezza piena, testo grande sovrapposto ── */}
      <div className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden">
        {/* Sfondo immersivo edge-to-edge con zoom allo scroll */}
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <motion.img
            style={{ scale: bgScale }}
            src={images[0]}
            alt="Distribuzione volantini sul territorio"
            className="h-full w-full object-cover"
          />
          {/* Velatura scura per leggibilità */}
          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b0a08] via-black/40 to-[#0b0a08]" />
        </div>

        {/* Alone oro in parallax */}
        <motion.div
          style={{ y: yHalo }}
          className="pointer-events-none absolute -top-24 left-1/2 h-[420px] w-[640px] -translate-x-1/2 rounded-full bg-gold/10 blur-[140px]"
        />

        {/* Contenuto interno centrato (testo in contenitore, sfondo resta full-bleed) */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          style={{ y: yText }}
          className="relative z-10 mx-auto max-w-6xl px-6 text-center"
        >
          <motion.span
            variants={reveal}
            className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[4px] text-gold-light"
          >
            <span className="h-px w-10 bg-gold-light" />
            Sul territorio
            <span className="h-px w-10 bg-gold-light" />
          </motion.span>
          <motion.h2
            variants={reveal}
            className="mt-6 font-serif text-5xl font-semibold leading-[1.05] md:text-7xl"
          >
            Le nostre{" "}
            <span className="bg-gradient-to-r from-gold-light via-[#fff4cf] to-gold bg-clip-text text-transparent">
              distribuzioni
            </span>
          </motion.h2>
          <motion.p
            variants={reveal}
            className="mx-auto mt-6 max-w-2xl text-base text-white/70 md:text-lg"
          >
            Volantini consegnati porta a porta con metodo, presenza e attenzione
            alle zone giuste. Ogni scatto è una prova del lavoro svolto.
          </motion.p>
        </motion.div>
      </div>

      {/* ── SCENA IMMERSIVA: 14 foto edge-to-edge, griglia full-bleed senza margini laterali ── */}
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="grid w-full grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3"
      >
        {images.map((src, i) => (
          <GalleryTile key={src} src={src} i={i} />
        ))}
      </motion.div>

      {/* ── SCENA DI CHIUSURA: full-bleed, altezza piena, CTA grande ── */}
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="relative flex min-h-[100svh] w-full flex-col items-center justify-center gap-8 overflow-hidden px-6 text-center"
      >
        {/* Alone oro di chiusura */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[480px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[150px]" />

        <motion.p
          variants={reveal}
          className="relative z-10 font-serif text-5xl font-semibold leading-[1.05] md:text-7xl"
        >
          14 zone.{" "}
          <span className="bg-gradient-to-r from-gold-light via-[#fff4cf] to-gold bg-clip-text text-transparent">
            Un solo metodo.
          </span>
        </motion.p>
        <motion.a
          variants={reveal}
          whileHover={{ y: -2 }}
          href="https://wa.me/393457340981?text=Salve,%20vorrei%20informazioni%20sulla%20distribuzione%20volantini"
          className="relative z-10 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-br from-gold-light via-gold to-gold-dark px-8 py-4 text-xs font-bold uppercase tracking-wide text-dark shadow-lg transition hover:-translate-y-0.5 md:text-sm"
        >
          Distribuisci con noi
          <ArrowRight className="h-4 w-4" />
        </motion.a>
      </motion.div>
    </section>
  );
}
