"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { MapPin, Palette, Smartphone, Globe, CheckCircle, ArrowRight } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const services = [
  {
    id: "volantinaggio",
    icon: MapPin,
    num: "01",
    title: "Volantinaggio mirato",
    short: "Distribuzione strategica nel tuo territorio",
    description:
      "Non spariamo volantini a caso. Studiamo la tua zona, identifichiamo le aree con maggiore concentrazione del tuo target e pianifichiamo ogni passaggio. Ricevi foto e video della distribuzione, con possibilità di tracciamento GPS per il massimo controllo.",
    features: [
      "Mappatura delle zone più redditizie",
      "Distribuzione controllata e verificabile",
      "Foto e video della consegna",
      "Report dettagliato post-campagna",
    ],
    img: "/img/distribuzione-1.webp",
  },
  {
    id: "grafica",
    icon: Palette,
    num: "02",
    title: "Grafica pubblicitaria",
    short: "Design che colpisce e vende",
    description:
      "Un volantino deve fermare lo sguardo in 3 secondi. I nostri grafici creano layout unici, coerenti con il tuo brand e studiati per convertire: gerarchia visiva chiara, colori accattivanti, call to action irresistibili. Niente template, solo creatività su misura.",
    features: [
      "Volantini, flyer e locandine su misura",
      "Brand identity coerente",
      "Copywriting persuasivo",
      "File pronti per stampa e digitale",
    ],
    img: "/img/lavoro2.webp",
  },
  {
    id: "social",
    icon: Smartphone,
    num: "03",
    title: "Pubblicità social",
    short: "Presenza online che lascia il segno",
    description:
      "I social non sono un megafono, sono un dialogo. Gestiamo pagine Facebook, Instagram e TikTok con contenuti pensati per coinvolgere il tuo pubblico locale. Sponsorizzazioni mirate, post coordinati con le campagne offline e risposta ai messaggi per non perdere nemmeno un contatto.",
    features: [
      "Gestione completa Facebook & Instagram",
      "Contenuti grafici e video",
      "Campagne sponsorizzate locali",
      "Report mensili di crescita",
    ],
    img: "/img/lavoro5.webp",
  },
  {
    id: "siti",
    icon: Globe,
    num: "04",
    title: "Creazione siti web",
    short: "Il tuo vetrino digitale professionale",
    description:
      "Oggi il primo contatto avviene online. Realizziamo siti web moderni, veloci e ottimizzati per mobile: vetrine, landing page e siti aziendali che trasformano la visita in una telefonata o un messaggio WhatsApp. Design elegante, testi persuasivi e tecnologia all'avanguardia.",
    features: [
      "Siti responsive e veloci",
      "Ottimizzazione SEO locale",
      "Integrazione WhatsApp e form contatti",
      "Gestione autonoma e supporto",
    ],
    img: "/img/lavoro7.webp",
  },
];

const HERO_IMG =
  "https://images.unsplash.com/photo-1746310783422-16df7622e7c9?w=2400&q=85&auto=format&fit=crop";

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

/* HERO di pagina a tutto schermo: sfondo full-bleed + zoom allo scroll */
function ServiziHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.3]);
  const yImg = useTransform(scrollYProgress, [0, 1], ["-6%", "8%"]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.4, 1], [1, 0.2, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-black pt-24 text-white"
    >
      {/* Sfondo immersivo edge-to-edge con zoom + parallax */}
      <motion.div style={{ scale: bgScale, y: yImg }} className="pointer-events-none absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <motion.img
          src={HERO_IMG}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
        />
      </motion.div>
      {/* Velature scure per leggibilità e flusso nero continuo */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-[#0b0a08]" />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-[520px] w-[760px] -translate-x-1/2 rounded-full bg-gold/10 blur-[150px]" />

      {/* Titolo ENORME */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto max-w-6xl px-6 text-center"
      >
        <motion.span
          variants={reveal}
          className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-gold-light"
        >
          <span className="h-px w-10 bg-gold-light" />
          Servizi
          <span className="h-px w-10 bg-gold-light" />
        </motion.span>
        <motion.h1
          variants={reveal}
          className="mt-6 font-serif text-5xl font-semibold leading-[1.04] tracking-tight [text-shadow:0_4px_40px_rgba(0,0,0,0.8)] md:text-7xl"
        >
          Tutto ciò che serve per{" "}
          <span className="bg-gradient-to-r from-gold-light via-[#fff4cf] to-gold bg-clip-text text-transparent">
            crescere
          </span>
        </motion.h1>
        <motion.p
          variants={reveal}
          className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-white/70 md:text-xl"
        >
          Una suite completa di strumenti di marketing territoriale, progettati per lavorare
          insieme e moltiplicare i risultati della tua attività.
        </motion.p>
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
          Scorri per scoprire ↓
        </motion.span>
      </motion.div>
    </section>
  );
}

/* Sfondo full-bleed con zoom/parallax per la scena dettaglio del servizio */
function SceneBackground({
  src,
  progress,
}: {
  src: string;
  progress: MotionValue<number>;
}) {
  const scale = useTransform(progress, [0, 1], [1.1, 1.3]);
  const y = useTransform(progress, [0, 1], ["-8%", "8%"]);
  return (
    <motion.div style={{ scale, y }} className="pointer-events-none absolute inset-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <motion.img
        src={src}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="h-full w-full object-cover"
      />
    </motion.div>
  );
}

export default function ServiziPage() {
  const [active, setActive] = useState("volantinaggio");
  const current = services.find((s) => s.id === active)!;

  // Scena dettaglio servizio: sfondo immersivo con zoom legato allo scroll
  const detailRef = useRef<HTMLElement>(null);
  const { scrollYProgress: detailProgress } = useScroll({
    target: detailRef,
    offset: ["start end", "end start"],
  });

  // Scena CTA finale: zoom dello sfondo full-bleed
  const ctaRef = useRef<HTMLElement>(null);
  const { scrollYProgress: ctaProgress } = useScroll({
    target: ctaRef,
    offset: ["start end", "end start"],
  });
  const ctaScale = useTransform(ctaProgress, [0, 1], [1.1, 1.3]);
  const ctaY = useTransform(ctaProgress, [0, 1], ["-8%", "8%"]);

  return (
    <div className="relative w-full overflow-hidden bg-[#0b0a08] text-white">
      {/* SCENA 1 — Hero di pagina a tutto schermo */}
      <ServiziHero />

      {/* SCENA 2 — Selettore servizi a tutto schermo, card grandi su nero */}
      <section className="relative flex min-h-[100svh] w-full items-center overflow-hidden bg-[#0b0a08] py-24 md:py-28">
        {/* Sfondo immersivo: alone oro tenue + griglia leggera, full-bleed */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-1/2 h-[520px] w-[760px] -translate-x-1/2 rounded-full bg-gold/10 blur-[150px]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(201,168,76,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(201,168,76,0.04)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="mb-12 max-w-3xl md:mb-16"
          >
            <motion.span
              variants={reveal}
              className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[4px] text-gold-light"
            >
              <span className="h-px w-10 bg-gold-light" />
              Scegli il servizio
            </motion.span>
            <motion.h2
              variants={reveal}
              className="mt-6 font-serif text-5xl font-semibold leading-[1.02] tracking-tight text-white md:text-7xl"
            >
              Quattro modi per farti{" "}
              <span className="bg-gradient-to-r from-gold-light via-[#fff4cf] to-gold bg-clip-text text-transparent">
                notare
              </span>
            </motion.h2>
            <motion.p
              variants={reveal}
              className="mt-6 max-w-xl text-lg leading-relaxed text-white/65 md:text-xl"
            >
              Tocca un servizio per vederne il dettaglio. Ogni strumento può lavorare da solo o
              combinarsi con gli altri per moltiplicare i risultati.
            </motion.p>
          </motion.div>

          {/* Card servizio grandi su nero */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid gap-5 sm:grid-cols-2"
          >
            {services.map((s) => {
              const isActive = active === s.id;
              return (
                <motion.button
                  key={s.id}
                  variants={reveal}
                  whileHover={{ y: -6 }}
                  onClick={() => setActive(s.id)}
                  aria-pressed={isActive}
                  className={`group relative cursor-pointer overflow-hidden rounded-3xl border p-8 text-left backdrop-blur transition duration-300 md:p-10 ${
                    isActive
                      ? "border-gold/40 bg-white/[0.07] shadow-[0_0_50px_rgba(201,168,76,0.18)]"
                      : "border-gold/15 bg-white/[0.04] hover:border-gold/35"
                  }`}
                >
                  {/* Linea oro in alto */}
                  <span
                    className={`pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent transition-opacity duration-300 ${
                      isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    }`}
                  />
                  <div className="mb-6 flex items-center justify-between">
                    <span
                      className={`flex h-14 w-14 items-center justify-center rounded-full border font-serif text-lg font-bold transition-colors ${
                        isActive
                          ? "border-gold bg-gradient-to-br from-gold-light via-gold to-gold-dark text-dark"
                          : "border-gold/30 bg-gold/10 text-gold-light"
                      }`}
                    >
                      {s.num}
                    </span>
                    <s.icon
                      className={`h-7 w-7 transition-colors ${
                        isActive ? "text-gold-light" : "text-gold/60 group-hover:text-gold-light"
                      }`}
                    />
                  </div>
                  <h3
                    className={`mb-2 font-serif text-3xl font-semibold leading-[1.1] tracking-tight transition-colors md:text-4xl ${
                      isActive
                        ? "bg-gradient-to-r from-gold-light via-[#fff4cf] to-gold bg-clip-text text-transparent"
                        : "text-white group-hover:text-white"
                    }`}
                  >
                    {s.title}
                  </h3>
                  <p className="text-base text-white/55 md:text-lg">{s.short}</p>
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* SCENA 3 — Dettaglio servizio a tutto schermo con foto full-bleed + zoom */}
      <section
        ref={detailRef}
        className="relative flex min-h-[100svh] w-full items-center overflow-hidden bg-[#0b0a08] py-24 md:py-28"
      >
        {/* Sfondo immersivo full-bleed: foto del servizio attivo con zoom allo scroll */}
        <SceneBackground key={current.id} src={current.img} progress={detailProgress} />
        {/* Velature scure per leggibilità e flusso nero continuo */}
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0a08] via-[#0b0a08]/85 to-[#0b0a08]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0a08] via-transparent to-[#0b0a08]/70" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[4px] text-gold-light">
              <span className="h-px w-10 bg-gold-light" />
              Dettaglio servizio · {current.num}
            </span>
            <h2 className="mt-6 font-serif text-5xl font-semibold leading-[1.02] tracking-tight text-white md:text-7xl">
              {current.title}
            </h2>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/70 md:text-xl">
              {current.description}
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {current.features.map((f, i) => (
                <motion.div
                  key={f}
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.08 * i, ease }}
                  className="flex items-start gap-3 rounded-2xl border border-gold/12 bg-black/40 px-5 py-4 backdrop-blur transition hover:border-gold/35"
                >
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <span className="text-base text-white/75 md:text-lg">{f}</span>
                </motion.div>
              ))}
            </div>

            <a
              href={`https://wa.me/393457340981?text=Salve,%20vorrei%20informazioni%20su%20${encodeURIComponent(
                current.title
              )}`}
              className="mt-10 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-br from-gold-light via-gold to-gold-dark px-8 py-4 text-xs font-bold uppercase tracking-wide text-dark shadow-[0_0_30px_rgba(201,168,76,0.4)] transition hover:-translate-y-0.5 md:text-sm"
            >
              Richiedi preventivo <ArrowRight size={15} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* SCENA 4 — CTA finale a tutto schermo */}
      <section
        ref={ctaRef}
        className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-black py-24 text-center md:py-28"
      >
        {/* Sfondo immersivo edge-to-edge con zoom + parallax */}
        <motion.div style={{ scale: ctaScale, y: ctaY }} className="pointer-events-none absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <motion.img
            src={HERO_IMG}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="h-full w-full object-cover opacity-60"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0a08] via-black/70 to-[#0b0a08]" />
        <div className="pointer-events-none absolute top-1/2 left-1/2 h-[520px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[150px]" />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="relative z-10 mx-auto max-w-3xl px-6"
        >
          <motion.h2
            variants={reveal}
            className="font-serif text-4xl font-semibold leading-[1.05] tracking-tight [text-shadow:0_4px_40px_rgba(0,0,0,0.8)] md:text-6xl"
          >
            Non sai da dove{" "}
            <span className="bg-gradient-to-r from-gold-light via-[#fff4cf] to-gold bg-clip-text text-transparent">
              iniziare?
            </span>
          </motion.h2>
          <motion.p
            variants={reveal}
            className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-white/65 md:text-xl"
          >
            Scrivici su WhatsApp descrivendo la tua attività. Ti aiutiamo noi a capire qual è il
            servizio giusto per te, anche se è una combinazione di più servizi.
          </motion.p>
          <motion.div variants={reveal} className="mt-10 flex justify-center">
            <a
              href="https://wa.me/393457340981?text=Salve,%20vorrei%20un%20consiglio%20su%20quali%20servizi%20fare%20per%20la%20mia%20attivita"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-br from-gold-light via-gold to-gold-dark px-9 py-4 text-xs font-bold uppercase tracking-wide text-dark shadow-[0_0_30px_rgba(201,168,76,0.4)] transition hover:-translate-y-0.5 md:text-sm"
            >
              Chiedi un consiglio gratuito <ArrowRight size={15} />
            </a>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
