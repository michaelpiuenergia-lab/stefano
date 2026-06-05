"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Star, Quote, MessageCircle } from "lucide-react";

const reviews = [
  {
    stars: 5,
    text: "Distribuzione veloce e precisa. Ottimo servizio. Ho visto aumentare i clienti in negozio già dalla prima settimana.",
    author: "Claudia Adanti",
    role: "Negozio alimentari, Bologna",
    img: "/img/distribuzione-1.webp",
  },
  {
    stars: 5,
    text: "Serietà, cortesia e professionalità. Consiglio vivamente. La grafica del volantino era stupenda e i risultati si sono visti.",
    author: "Davide Temperoni",
    role: "Ristorante, Milano",
    img: "/img/distribuzione-5.webp",
  },
  {
    stars: 5,
    text: "Hanno curato ogni dettaglio della campagna, dalla grafica alla consegna. Risultati visibili dopo pochi giorni. Eccellenti!",
    author: "Marina Bianchi",
    role: "Centro estetico, Firenze",
    img: "/img/distribuzione-6.webp",
  },
  {
    stars: 5,
    text: "Finalmente un team che ascolta le esigenze del cliente e non propone soluzioni standard. Grafica top e distribuzione puntuale.",
    author: "Luca Ferrini",
    role: "Officina meccanica, Verona",
    img: "/img/distribuzione-11.webp",
  },
  {
    stars: 5,
    text: "Volantini consegnati con precisione chirurgica. Il report con le foto mi ha dato grande tranquillità. Rifarerò sicuramente.",
    author: "Giulia Rossi",
    role: "Palestra, Roma",
    img: "/img/distribuzione-13.webp",
  },
  {
    stars: 5,
    text: "Collaborazione continuativa ormai da due anni. Affidabili, puntuali e creativi. Non li cambierei per nessun motivo.",
    author: "Paolo Martini",
    role: "Showroom arredamenti, Torino",
    img: "/img/distribuzione-3.webp",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

const HERO_IMG = "/img/distribuzione-2.webp";

/* ─────────────────────────  HERO DI PAGINA  ───────────────────────── */

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.35]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-[#0b0a08] pt-24 text-white"
    >
      {/* sfondo immersivo full-bleed con zoom + parallax allo scroll */}
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <motion.img
          style={{ scale: bgScale }}
          src={HERO_IMG}
          alt=""
          className="h-full w-full object-cover"
        />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-[#0b0a08]" />

      {/* faint pyramid + alone oro atmosferico */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-[420px] w-[640px] -translate-x-1/2 rounded-full bg-gold/10 blur-[140px]" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/img/logo-piramide.png"
          alt=""
          className="absolute bottom-[-6%] left-1/2 w-[70vw] max-w-[760px] -translate-x-1/2 opacity-[0.06] mix-blend-screen"
        />
      </div>

      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-6 text-center"
      >
        <motion.span
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="mb-6 inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-gold-light"
        >
          <span className="h-px w-10 bg-gold-light" />
          Testimonianze
          <span className="h-px w-10 bg-gold-light" />
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease, delay: 0.08 }}
          className="max-w-5xl font-serif text-5xl font-semibold leading-[1.04] tracking-tight [text-shadow:0_4px_40px_rgba(0,0,0,0.85)] md:text-7xl"
        >
          Cosa dicono i nostri{" "}
          <span className="bg-gradient-to-r from-gold-light via-[#fff4cf] to-gold bg-clip-text text-transparent">
            clienti
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease, delay: 0.18 }}
          className="mt-7 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg"
        >
          Feedback reali raccolti nel tempo da attività che hanno scelto di
          investire sulla comunicazione locale con noi.
        </motion.p>

        {/* fila di stelle oro grandi */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease, delay: 0.28 }}
          className="mt-9 flex items-center gap-2 text-gold"
        >
          {Array.from({ length: 5 }).map((_, si) => (
            <Star key={si} size={30} fill="currentColor" className="md:h-9 md:w-9" />
          ))}
        </motion.div>
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease, delay: 0.4 }}
          className="mt-4 text-xs font-bold uppercase tracking-[0.25em] text-white/55"
        >
          5,0 su 5 — recensioni verificate
        </motion.span>
      </motion.div>

      <motion.div
        style={{ opacity: hintOpacity }}
        className="pointer-events-none absolute bottom-8 left-1/2 z-20 -translate-x-1/2 text-[10px] font-bold uppercase tracking-[0.3em] text-white/60"
      >
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="inline-block"
        >
          Scorri per leggere ↓
        </motion.span>
      </motion.div>
    </section>
  );
}

/* ─────────────────────────  SCENA RECENSIONE  ───────────────────────── */

function ReviewScene({
  r,
  i,
}: {
  r: (typeof reviews)[number];
  i: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.15, 1.35]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  const reverse = i % 2 === 1;

  return (
    <section
      ref={ref}
      className="relative flex min-h-[90svh] w-full items-center overflow-hidden bg-[#0b0a08] py-24 text-white"
    >
      {/* foto edge-to-edge con zoom/parallax */}
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <motion.img
          style={{ scale: bgScale }}
          src={r.img}
          alt=""
          className="h-full w-full object-cover"
        />
      </motion.div>
      {/* velatura direzionale: lascia respirare la foto dal lato opposto al testo */}
      <div
        className={`pointer-events-none absolute inset-0 ${
          reverse
            ? "bg-gradient-to-l from-black/90 via-black/65 to-black/35"
            : "bg-gradient-to-r from-black/90 via-black/65 to-black/35"
        }`}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0b0a08]/70 via-transparent to-[#0b0a08]/70" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.8, ease }}
          className={`max-w-2xl ${reverse ? "ml-auto text-right" : "text-left"}`}
        >
          {/* numero scena grande in oro */}
          <span className="block font-serif text-7xl font-semibold leading-none text-gold/25 md:text-8xl">
            {String(i + 1).padStart(2, "0")}
          </span>

          {/* stelle oro grandi */}
          <div
            className={`mt-6 flex gap-1.5 text-gold ${
              reverse ? "justify-end" : "justify-start"
            }`}
          >
            {Array.from({ length: r.stars }).map((_, si) => (
              <Star key={si} size={26} fill="currentColor" />
            ))}
          </div>

          <Quote
            size={56}
            className={`mt-7 text-gold/40 ${reverse ? "ml-auto" : ""}`}
            aria-hidden
          />

          {/* testo grande della recensione */}
          <p className="mt-4 font-serif text-2xl font-medium leading-snug text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.7)] md:text-4xl">
            &ldquo;{r.text}&rdquo;
          </p>

          {/* autore */}
          <div
            className={`mt-9 flex items-center gap-4 ${
              reverse ? "justify-end" : "justify-start"
            }`}
          >
            {reverse ? (
              <>
                <div className="text-right">
                  <span className="block text-base font-semibold text-white">
                    {r.author}
                  </span>
                  <span className="text-xs uppercase tracking-wide text-white/55">
                    {r.role}
                  </span>
                </div>
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 bg-gradient-to-br from-gold/25 to-transparent font-serif text-xl font-semibold text-gold-light">
                  {r.author.charAt(0)}
                </span>
              </>
            ) : (
              <>
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 bg-gradient-to-br from-gold/25 to-transparent font-serif text-xl font-semibold text-gold-light">
                  {r.author.charAt(0)}
                </span>
                <div>
                  <span className="block text-base font-semibold text-white">
                    {r.author}
                  </span>
                  <span className="text-xs uppercase tracking-wide text-white/55">
                    {r.role}
                  </span>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────  CTA FINALE  ───────────────────────── */

function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.25]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-[#0b0a08] py-24 text-white"
    >
      <motion.div style={{ scale: bgScale }} className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/img/distribuzione-9.webp"
          alt=""
          className="h-full w-full object-cover"
        />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0b0a08]/85 via-black/75 to-[#0b0a08]" />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[460px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[150px]" />
        {/* faint pyramid */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/img/logo-piramide.png"
          alt=""
          className="absolute bottom-[-8%] left-1/2 w-[64vw] max-w-[700px] -translate-x-1/2 opacity-[0.07] mix-blend-screen"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease }}
        className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 text-center"
      >
        <span className="mb-7 inline-flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 bg-gradient-to-br from-gold/25 to-transparent text-gold-light">
          <MessageCircle size={30} />
        </span>

        <h2 className="font-serif text-4xl font-semibold leading-[1.06] tracking-tight [text-shadow:0_4px_40px_rgba(0,0,0,0.85)] md:text-6xl">
          Vuoi lasciare una{" "}
          <span className="bg-gradient-to-r from-gold-light via-[#fff4cf] to-gold bg-clip-text text-transparent">
            recensione?
          </span>
        </h2>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
          Siamo grati a ogni cliente che dedica un minuto per raccontare la
          propria esperienza. La tua opinione ci aiuta a crescere.
        </p>

        <a
          href="https://wa.me/393457340981?text=Salve,%20vorrei%20lasciare%20una%20recensione"
          className="mt-10 inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-gradient-to-br from-gold-light via-gold to-gold-dark px-9 py-4 text-xs font-black uppercase tracking-widest text-dark shadow-[0_0_30px_rgba(201,168,76,0.4)] transition hover:-translate-y-0.5 md:text-sm"
        >
          <MessageCircle size={18} />
          Scrivici su WhatsApp
        </a>
      </motion.div>
    </section>
  );
}

/* ─────────────────────────  PAGINA  ───────────────────────── */

export default function RecensioniPage() {
  return (
    <main className="relative w-full overflow-hidden bg-[#0b0a08] text-white">
      <Hero />

      {reviews.map((r, i) => (
        <ReviewScene key={i} r={r} i={i} />
      ))}

      <FinalCTA />
    </main>
  );
}
