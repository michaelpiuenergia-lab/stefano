"use client";

import { useRef } from "react";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, ChevronRight, ArrowDown } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";

const reveal = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const contatti = [
  {
    icon: Phone,
    label: "Telefono",
    value: "+39 345 734 0981",
    href: "tel:+393457340981",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Scrivici subito",
    href: "https://wa.me/393457340981",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@lapiramide.it",
    href: "mailto:info@lapiramide.it",
  },
  {
    icon: Clock,
    label: "Orari",
    value: "Lun — Ven: 9:00 - 18:00",
    href: null,
  },
  {
    icon: MapPin,
    label: "Copertura",
    value: "Tutta Italia",
    href: null,
  },
];

const faq = [
  {
    q: "Quanto tempo ci vuole per una risposta?",
    a: "Di solito rispondiamo entro 1-2 ore in orario lavorativo. Mai più di 24h.",
  },
  {
    q: "Fate sopralluoghi gratuiti?",
    a: "Per grandi campagne sì, valutiamo insieme il territorio prima di partire.",
  },
  {
    q: "Lavorate solo in alcune città?",
    a: "Copriamo tutta Italia, con particolare presenza nel Centro-Nord.",
  },
  {
    q: "È possibile fare una prova?",
    a: "Sì, possiamo concordare una campagna pilota su una zona ridotta.",
  },
];

/* Piramidi al tramonto — sfondo cinematografico full-bleed (Unsplash, verificata) */
const HERO_BG =
  "https://images.unsplash.com/photo-1746310783422-16df7622e7c9?w=2400&q=85&auto=format&fit=crop";

/* ───────────────────────── SCENA 1 — HERO FULL-SCREEN ───────────────────────── */
function HeroScene() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  // Zoom dello sfondo allo scroll (avvicinamento) — range crescente in [0,1]
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.3]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const veilOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 0.6, 0.78]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0px", "-60px"]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-[#0b0a08] text-white"
    >
      {/* SFONDO IMMERSIVO full-bleed: piramidi al tramonto edge-to-edge + zoom/parallax */}
      <div className="absolute inset-0 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <motion.img
          style={{ scale: bgScale, y: bgY }}
          src={HERO_BG}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Velatura scura dinamica per leggibilità */}
      <motion.div style={{ opacity: veilOpacity }} className="absolute inset-0 bg-black" />
      {/* Gradienti per fondere i bordi nel nero continuo #0b0a08 */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-[#0b0a08]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-80 bg-gradient-to-t from-[#0b0a08] to-transparent" />

      {/* Alone oro tenue di sfondo */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-gold/10 blur-[150px]" />

      {/* Linea oro in alto */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-50" />

      {/* CONTENUTO: titolo ENORME centrato (con padding-top per la navbar fissa) */}
      <motion.div
        style={{ y: textY }}
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-24 text-center"
      >
        <motion.span
          variants={reveal}
          className="mb-8 inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[4px] text-gold-light"
        >
          <span className="h-px w-10 bg-gold-light" />
          Contatti
          <span className="h-px w-10 bg-gold-light" />
        </motion.span>

        <motion.h1
          variants={reveal}
          className="font-serif text-5xl font-semibold leading-[1.02] tracking-tight [text-shadow:0_4px_50px_rgba(0,0,0,0.85)] sm:text-6xl md:text-7xl lg:text-8xl"
        >
          Parliamo del{" "}
          <span className="bg-gradient-to-r from-gold-light via-[#fff4cf] to-gold bg-clip-text text-transparent">
            tuo progetto
          </span>
        </motion.h1>

        <motion.p
          variants={reveal}
          className="mx-auto mt-10 max-w-2xl text-lg leading-relaxed text-white/75 [text-shadow:0_2px_18px_rgba(0,0,0,0.9)] md:text-xl"
        >
          Siamo a disposizione per studiare insieme la strategia più adatta alla tua attività. Un
          messaggio o una telefonata, e iniziamo.
        </motion.p>
      </motion.div>

      {/* Hint di scroll */}
      <motion.div
        style={{ opacity: hintOpacity }}
        className="pointer-events-none absolute bottom-8 left-1/2 z-20 -translate-x-1/2 text-[10px] font-bold uppercase tracking-[0.3em] text-white/60"
      >
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="inline-flex items-center gap-2"
        >
          Scorri per contattarci <ArrowDown size={12} />
        </motion.span>
      </motion.div>
    </section>
  );
}

/* ─────────────────── SCENA 2 — CONTATTI + STRATEGIA (full-bleed) ─────────────────── */
function ContattiScene() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.3]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const veilOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 0.6, 0.8]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["28px", "-28px"]);

  return (
    <section
      id="contatti"
      ref={ref}
      className="relative flex min-h-[100svh] w-full items-center overflow-hidden bg-[#0b0a08] py-28 text-white md:py-36"
    >
      {/* Sfondo immersivo full-bleed con zoom allo scroll */}
      <div className="absolute inset-0 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <motion.img
          style={{ scale: bgScale, y: bgY }}
          src={HERO_BG}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <motion.div style={{ opacity: veilOpacity }} className="pointer-events-none absolute inset-0 bg-black" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0b0a08] via-black/50 to-[#0b0a08]" />
      </div>

      {/* Aloni oro tenui */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-[420px] w-[640px] -translate-x-1/2 rounded-full bg-gold/10 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[360px] w-[460px] translate-x-1/3 translate-y-1/4 rounded-full bg-gold/5 blur-[150px]" />

      <motion.div style={{ y: contentY }} className="relative z-10 mx-auto w-full max-w-6xl px-6">
        {/* Card principali grandi */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-8 md:grid-cols-2"
        >
          {/* Contatti diretti */}
          <motion.div
            variants={reveal}
            whileHover={{ y: -6 }}
            className="group relative overflow-hidden rounded-3xl border border-gold/15 bg-white/[0.04] p-8 backdrop-blur-md transition hover:border-gold/35 md:p-10"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
            <h2 className="mb-8 font-serif text-3xl font-semibold text-white md:text-4xl">
              Contatti diretti
            </h2>
            <div className="space-y-5">
              {contatti.map(({ icon: Icon, label, value, href }) => {
                const inner = (
                  <>
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gold/25 bg-gold/10 transition group-hover/item:border-gold group-hover/item:bg-gold">
                      <Icon className="h-6 w-6 text-gold transition group-hover/item:text-dark" />
                    </div>
                    <div>
                      <span className="block text-[11px] font-bold uppercase tracking-wide text-white/45">
                        {label}
                      </span>
                      <span className="text-lg font-medium text-white/90 transition group-hover/item:text-gold-light">
                        {value}
                      </span>
                    </div>
                  </>
                );

                return href ? (
                  <a
                    key={label}
                    href={href}
                    className="group/item flex cursor-pointer items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-3 transition hover:border-gold/25 hover:bg-white/[0.04]"
                  >
                    {inner}
                  </a>
                ) : (
                  <div
                    key={label}
                    className="group/item flex items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-3"
                  >
                    {inner}
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Richiedi una strategia gratuita */}
          <motion.div
            variants={reveal}
            whileHover={{ y: -6 }}
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-gold/30 bg-white/[0.04] p-8 backdrop-blur-md transition hover:border-gold/45 md:p-10"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
            <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-gold/15 blur-[60px]" />
            <div className="relative flex h-full flex-col">
              <span className="mb-6 inline-flex w-fit items-center gap-3 text-[11px] font-bold uppercase tracking-[4px] text-gold-light">
                <span className="h-px w-10 bg-gold-light" />
                Senza impegno
              </span>
              <h2 className="mb-4 font-serif text-3xl font-semibold text-gold-light md:text-4xl">
                Richiedi una strategia gratuita
              </h2>
              <p className="mb-8 text-lg leading-relaxed text-white/65">
                Raccontaci la tua attività. Ti risponderemo entro poche ore con un piano d&apos;azione
                personalizzato e un preventivo senza impegno.
              </p>
              <motion.a
                whileHover={{ y: -2 }}
                href="https://wa.me/393457340981?text=Salve,%20vorrei%20una%20strategia%20gratuita%20per%20la%20mia%20attivita"
                className="shimmer-border mt-auto inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-gradient-to-br from-gold-light via-gold to-gold-dark px-8 py-4 text-xs font-bold uppercase tracking-wide text-dark shadow-lg shadow-gold/20 transition hover:-translate-y-0.5 hover:shadow-[0_0_55px_rgba(201,168,76,0.5)] md:text-sm"
              >
                <Send size={16} /> Scrivici su WhatsApp
              </motion.a>
              <p className="mt-4 text-center text-sm text-white/45">
                Oppure chiamaci al{" "}
                <a href="tel:+393457340981" className="text-gold-light transition hover:text-white">
                  +39 345 734 0981
                </a>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ───────────────────────── SCENA 3 — FAQ (full-bleed) ───────────────────────── */
function FaqScene() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.3]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const veilOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.72, 0.66, 0.82]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["28px", "-28px"]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] w-full items-center overflow-hidden bg-[#0b0a08] py-28 text-white md:py-36"
    >
      {/* Sfondo immersivo full-bleed con zoom allo scroll */}
      <div className="absolute inset-0 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <motion.img
          style={{ scale: bgScale, y: bgY }}
          src={HERO_BG}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <motion.div style={{ opacity: veilOpacity }} className="pointer-events-none absolute inset-0 bg-black" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0b0a08] via-black/55 to-[#0b0a08]" />
      </div>

      {/* Alone oro tenue */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[420px] w-[640px] -translate-x-1/2 rounded-full bg-gold/10 blur-[140px]" />

      <motion.div style={{ y: contentY }} className="relative z-10 mx-auto w-full max-w-6xl px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-14 text-center md:mb-16"
        >
          <motion.span
            variants={reveal}
            className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[4px] text-gold-light"
          >
            <span className="h-px w-10 bg-gold-light" />
            FAQ
            <span className="h-px w-10 bg-gold-light" />
          </motion.span>
          <motion.h2
            variants={reveal}
            className="mt-6 font-serif text-4xl font-semibold leading-[1.05] [text-shadow:0_4px_40px_rgba(0,0,0,0.85)] md:text-6xl"
          >
            Domande frequenti sui{" "}
            <span className="bg-gradient-to-r from-gold-light via-[#fff4cf] to-gold bg-clip-text text-transparent">
              contatti
            </span>
          </motion.h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-6 md:grid-cols-2"
        >
          {faq.map(({ q, a }) => (
            <motion.div
              key={q}
              variants={reveal}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-3xl border border-gold/15 bg-white/[0.04] p-8 backdrop-blur-md transition hover:border-gold/35 md:p-10"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
              <strong className="mb-3 flex items-start gap-3 font-serif text-xl font-semibold text-gold-light md:text-2xl">
                <ChevronRight className="mt-1 h-5 w-5 shrink-0 text-gold transition group-hover:translate-x-1" />
                {q}
              </strong>
              <p className="pl-8 text-lg leading-relaxed text-white/65">{a}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

export default function ContattiPage() {
  return (
    <main className="bg-[#0b0a08]">
      <HeroScene />
      <ContattiScene />
      <FaqScene />
    </main>
  );
}
