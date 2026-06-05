"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ShieldCheck, PenTool, MapPin, ChevronLeft, ChevronRight } from "lucide-react";

const works = [
  "/img/lavoro1.webp",
  "/img/lavoro2.webp",
  "/img/lavoro3.webp",
  "/img/lavoro4.webp",
  "/img/lavoro5.webp",
  "/img/lavoro6.webp",
  "/img/lavoro7.webp",
  "/img/lavoro8.webp",
];

// distribuzione-8 esclusa (immagine non valida)
const distribuzioni = [1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14].map((n) => `/img/distribuzione-${n}.webp`);

const ease = [0.22, 1, 0.36, 1] as const;

const reveal = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease },
  },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

// Tessera full-bleed: foto distribuzione edge-to-edge con zoom legato allo scroll
function DistribuzioneTile({ src, i }: { src: string; i: number }) {
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

export default function LavoriPage() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % works.length), 4000);
    return () => clearInterval(t);
  }, []);

  const goPrev = () => setCurrent((c) => (c - 1 + works.length) % works.length);
  const goNext = () => setCurrent((c) => (c + 1) % works.length);

  // ── HERO di pagina full-screen: zoom + parallax sull'immagine corrente ──
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProg } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"],
  });
  // Range SEMPRE crescenti in [0,1]
  const heroBgScale = useTransform(heroProg, [0, 1], [1.1, 1.3]);
  const heroHaloY = useTransform(heroProg, [0, 1], ["-10%", "10%"]);
  const heroTextY = useTransform(heroProg, [0, 1], ["0px", "-60px"]);
  const heroHint = useTransform(heroProg, [0, 0.08], [1, 0]);

  // ── Scena grafiche: zoom dello sfondo immersivo legato allo scroll ──
  const grafRef = useRef<HTMLElement>(null);
  const { scrollYProgress: grafProg } = useScroll({
    target: grafRef,
    offset: ["start end", "end start"],
  });
  const grafBgScale = useTransform(grafProg, [0, 1], [1.1, 1.3]);
  const grafHaloY = useTransform(grafProg, [0, 1], ["-8%", "8%"]);
  const grafMediaScale = useTransform(grafProg, [0, 1], [1.04, 1.18]);
  const grafMediaY = useTransform(grafProg, [0, 1], ["28px", "-28px"]);

  // ── Scena distribuzioni: zoom dello sfondo d'apertura ──
  const distRef = useRef<HTMLElement>(null);
  const { scrollYProgress: distProg } = useScroll({
    target: distRef,
    offset: ["start end", "end start"],
  });
  const distBgScale = useTransform(distProg, [0, 1], [1.1, 1.3]);
  const distHaloY = useTransform(distProg, [0, 1], ["-12%", "12%"]);
  const distTextY = useTransform(distProg, [0, 1], ["0px", "-60px"]);

  // ── Scena video: zoom dello sfondo immersivo legato allo scroll ──
  const videoRef = useRef<HTMLElement>(null);
  const { scrollYProgress: videoProg } = useScroll({
    target: videoRef,
    offset: ["start end", "end start"],
  });
  const videoBgScale = useTransform(videoProg, [0, 1], [1.1, 1.3]);
  const videoHaloY = useTransform(videoProg, [0, 1], ["-10%", "10%"]);

  return (
    <div className="relative w-full overflow-hidden bg-[#0b0a08] text-white">
      {/* ════════════ HERO DI PAGINA A TUTTO SCHERMO ════════════ */}
      <section
        ref={heroRef}
        className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden pt-24"
      >
        {/* Sfondo immersivo edge-to-edge: immagine corrente con zoom allo scroll */}
        <div className="absolute inset-0">
          <motion.img
            style={{ scale: heroBgScale }}
            src={works[current]}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover blur-2xl"
          />
          {/* Velatura scura per leggibilità (flusso nero continuo) */}
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b0a08] via-black/45 to-[#0b0a08]" />
        </div>

        {/* Alone oro in parallax */}
        <motion.div
          style={{ y: heroHaloY }}
          className="pointer-events-none absolute -top-24 left-1/2 h-[460px] w-[680px] -translate-x-1/2 rounded-full bg-gold/10 blur-[150px]"
        />

        {/* Titolo ENORME in contenitore interno */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          style={{ y: heroTextY }}
          className="relative z-10 mx-auto max-w-6xl px-6 text-center"
        >
          <motion.span
            variants={reveal}
            className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[4px] text-gold-light"
          >
            <span className="h-px w-10 bg-gold-light" />
            Portfolio
            <span className="h-px w-10 bg-gold-light" />
          </motion.span>
          <motion.h1
            variants={reveal}
            className="mt-6 font-serif text-5xl font-semibold leading-[1.04] tracking-tight [text-shadow:0_4px_40px_rgba(0,0,0,0.8)] md:text-7xl"
          >
            I nostri lavori sul{" "}
            <span className="bg-gradient-to-r from-gold-light via-[#fff4cf] to-gold bg-clip-text text-transparent">
              territorio
            </span>
          </motion.h1>
          <motion.p
            variants={reveal}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg"
          >
            Dalla grafica alla distribuzione, ogni progetto racconta una storia di
            cura, precisione e risultati concreti per le attività che ci hanno scelto.
          </motion.p>
        </motion.div>

        {/* Hint di scroll */}
        <motion.div
          style={{ opacity: heroHint }}
          className="pointer-events-none absolute bottom-8 left-1/2 z-20 -translate-x-1/2 text-[10px] font-bold uppercase tracking-[0.3em] text-white/60"
        >
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block"
          >
            Scorri per esplorare ↓
          </motion.span>
        </motion.div>
      </section>

      {/* ════════════ SCENA: GRAFICHE E VOLANTINI (carosello full-screen) ════════════ */}
      <section
        ref={grafRef}
        className="relative flex min-h-[100svh] w-full items-center overflow-hidden bg-[#0b0a08] py-24 md:py-28"
      >
        {/* Sfondo immersivo: immagine corrente sfocata a tutto schermo, zoom allo scroll */}
        <div className="absolute inset-0">
          <motion.img
            style={{ scale: grafBgScale }}
            src={works[current]}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="h-full w-full object-cover blur-3xl"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0b0a08] via-black/55 to-[#0b0a08]" />
          <div className="pointer-events-none absolute inset-0 bg-black/45" />
        </div>

        {/* Alone oro tenue in parallax */}
        <motion.div
          style={{ y: grafHaloY }}
          className="pointer-events-none absolute -top-24 left-1/2 h-[460px] w-[680px] -translate-x-1/2 rounded-full bg-gold/10 blur-[150px]"
        />

        <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Colonna testo editoriale grande */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-xl"
          >
            <motion.span
              variants={reveal}
              className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[4px] text-gold-light"
            >
              <span className="h-px w-10 bg-gold-light" />
              <PenTool className="h-4 w-4" />
              Creatività
            </motion.span>
            <motion.h2
              variants={reveal}
              className="mt-6 font-serif text-5xl font-semibold leading-[1.04] tracking-tight [text-shadow:0_4px_40px_rgba(0,0,0,0.8)] md:text-6xl"
            >
              Grafiche e{" "}
              <span className="bg-gradient-to-r from-gold-light via-[#fff4cf] to-gold bg-clip-text text-transparent">
                volantini
              </span>
            </motion.h2>
            <motion.p
              variants={reveal}
              className="mt-6 max-w-md text-base leading-relaxed text-white/70 md:text-lg"
            >
              Ogni volantino è progettato per catturare l&apos;attenzione in pochi
              secondi. Colori, font, immagini e call to action sono studiati per il
              tuo settore e il tuo pubblico.
            </motion.p>

            {/* Controlli + contatore */}
            <motion.div variants={reveal} className="mt-10 flex items-center gap-6">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={goPrev}
                  aria-label="Lavoro precedente"
                  className="inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-gold-light/40 bg-white/5 text-gold-light backdrop-blur transition hover:-translate-y-0.5 hover:border-gold-light hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-light"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={goNext}
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
                {String(works.length).padStart(2, "0")}
              </div>
            </motion.div>

            {/* Dots / progress segmentata */}
            <motion.div variants={reveal} className="mt-7 flex flex-wrap gap-2">
              {works.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setCurrent(i)}
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

          {/* Vetrina: immagine GRANDE protagonista con zoom allo scroll */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease }}
            className="relative"
          >
            {/* Linea oro decorativa in alto */}
            <div className="pointer-events-none absolute -top-4 left-0 right-0 z-20 h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-60" />

            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-gold/15 bg-[#0a0907] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.85)] backdrop-blur transition hover:border-gold/35 md:aspect-[5/6]">
              {/* Wrapper con zoom + parallax legati allo scroll */}
              <motion.div
                style={{ scale: grafMediaScale, y: grafMediaY }}
                className="absolute inset-0"
              >
                {works.map((src, i) => (
                  <img
                    key={src}
                    src={src}
                    alt={`Lavoro grafico ${i + 1}`}
                    loading="lazy"
                    className={`absolute inset-0 h-full w-full object-contain p-5 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] md:p-8 ${
                      i === current ? "scale-100 opacity-100" : "scale-[1.03] opacity-0"
                    }`}
                  />
                ))}
              </motion.div>

              {/* Cornice oro sottile interna */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-gold/15" />

              {/* Cornici angolari oro */}
              <div className="pointer-events-none absolute left-4 top-4 h-7 w-7 rounded-tl-lg border-l-2 border-t-2 border-gold/50" />
              <div className="pointer-events-none absolute right-4 top-4 h-7 w-7 rounded-tr-lg border-r-2 border-t-2 border-gold/50" />
              <div className="pointer-events-none absolute bottom-4 left-4 h-7 w-7 rounded-bl-lg border-b-2 border-l-2 border-gold/50" />
              <div className="pointer-events-none absolute bottom-4 right-4 h-7 w-7 rounded-br-lg border-b-2 border-r-2 border-gold/50" />

              {/* Frecce di navigazione su immagine */}
              <button
                onClick={goPrev}
                aria-label="Lavoro precedente"
                className="absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-gold/30 bg-black/40 text-gold-light backdrop-blur transition hover:border-gold/60 hover:bg-black/60"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={goNext}
                aria-label="Lavoro successivo"
                className="absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-gold/30 bg-black/40 text-gold-light backdrop-blur transition hover:border-gold/60 hover:bg-black/60"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════ SCENA: LE NOSTRE DISTRIBUZIONI ════════════ */}
      <section
        ref={distRef}
        id="distribuzioni"
        className="relative w-full overflow-hidden bg-[#0b0a08] text-white"
      >
        {/* ── Apertura full-bleed, altezza piena, testo grande ── */}
        <div className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden">
          {/* Sfondo immersivo edge-to-edge con zoom allo scroll */}
          <div className="absolute inset-0">
            <motion.img
              style={{ scale: distBgScale }}
              src={distribuzioni[0]}
              alt="Distribuzione volantini sul territorio"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/55" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0b0a08] via-black/40 to-[#0b0a08]" />
          </div>

          {/* Alone oro in parallax */}
          <motion.div
            style={{ y: distHaloY }}
            className="pointer-events-none absolute -top-24 left-1/2 h-[420px] w-[640px] -translate-x-1/2 rounded-full bg-gold/10 blur-[140px]"
          />

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            style={{ y: distTextY }}
            className="relative z-10 mx-auto max-w-6xl px-6 text-center"
          >
            <motion.span
              variants={reveal}
              className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[4px] text-gold-light"
            >
              <span className="h-px w-10 bg-gold-light" />
              <MapPin className="h-4 w-4" />
              Sul campo
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
              className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg"
            >
              Alcuni scatti dal campo: volantini consegnati porta a porta con metodo,
              presenza e attenzione alle zone più strategiche per ogni attività. Ogni
              foto è una prova del lavoro svolto.
            </motion.p>
          </motion.div>
        </div>

        {/* ── Griglia full-bleed: 14 foto edge-to-edge, senza margini laterali ── */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid w-full grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3"
        >
          {distribuzioni.map((src, i) => (
            <DistribuzioneTile key={src} src={src} i={i} />
          ))}
        </motion.div>
      </section>

      {/* ════════════ SCENA: TRASPARENZA NELLA DISTRIBUZIONE (video full-screen) ════════════ */}
      <section
        ref={videoRef}
        className="relative flex min-h-[100svh] w-full items-center overflow-hidden bg-[#0b0a08] py-24 md:py-28"
      >
        {/* Sfondo immersivo: ultimo scatto distribuzione sfocato, zoom allo scroll */}
        <div className="absolute inset-0">
          <motion.img
            style={{ scale: videoBgScale }}
            src={distribuzioni[distribuzioni.length - 1]}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="h-full w-full object-cover blur-3xl"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0b0a08] via-black/55 to-[#0b0a08]" />
          <div className="pointer-events-none absolute inset-0 bg-black/50" />
        </div>

        {/* Alone oro in parallax */}
        <motion.div
          style={{ y: videoHaloY }}
          className="pointer-events-none absolute -top-24 left-1/2 h-[460px] w-[680px] -translate-x-1/2 rounded-full bg-gold/10 blur-[150px]"
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="relative z-10 mx-auto w-full max-w-6xl px-6"
        >
          <motion.div variants={reveal} className="mb-10 text-center">
            <span className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[4px] text-gold-light">
              <span className="h-px w-10 bg-gold-light" />
              <ShieldCheck className="h-4 w-4" />
              Garanzia
              <span className="h-px w-10 bg-gold-light" />
            </span>
            <h2 className="mt-6 font-serif text-5xl font-semibold leading-[1.05] tracking-tight [text-shadow:0_4px_40px_rgba(0,0,0,0.8)] md:text-7xl">
              Trasparenza nella{" "}
              <span className="bg-gradient-to-r from-gold-light via-[#fff4cf] to-gold bg-clip-text text-transparent">
                distribuzione
              </span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
              Verifichiamo ogni singola consegna con controlli video, per garantirti
              che il lavoro venga fatto con la massima cura e professionalità. Questo
              è il nostro impegno concreto verso di te.
            </p>
          </motion.div>

          <motion.div
            variants={reveal}
            className="relative overflow-hidden rounded-3xl border border-gold/20 bg-white/[0.04] p-3 backdrop-blur md:p-4"
          >
            {/* Linea oro in alto */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

            {/* Cornici angolari oro */}
            <div className="pointer-events-none absolute left-0 top-0 h-8 w-8 rounded-tl-3xl border-l-2 border-t-2 border-gold" />
            <div className="pointer-events-none absolute right-0 top-0 h-8 w-8 rounded-tr-3xl border-r-2 border-t-2 border-gold" />
            <div className="pointer-events-none absolute bottom-0 left-0 h-8 w-8 rounded-bl-3xl border-b-2 border-l-2 border-gold" />
            <div className="pointer-events-none absolute bottom-0 right-0 h-8 w-8 rounded-br-3xl border-b-2 border-r-2 border-gold" />

            <div className="relative overflow-hidden rounded-2xl bg-[#0a0907]">
              <video controls preload="metadata" className="block aspect-video w-full">
                <source src="/controlli1.mp4" type="video/mp4" />
                Il tuo browser non supporta la riproduzione del video.
              </video>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
