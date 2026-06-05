"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ExternalLink, Users, MapPin, Award, Target, HeartHandshake, Check } from "lucide-react";

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
  show: { transition: { staggerChildren: 0.1 } },
};

const stats = [
  { icon: Users, value: "250+", label: "Clienti soddisfatti" },
  { icon: MapPin, value: "18", label: "Regioni italiane coperte" },
  { icon: Award, value: "8 anni", label: "Di esperienza sul campo" },
];

const valori = [
  {
    icon: Target,
    title: "Precisione",
    text: "Ogni campagna è studiata nei minimi dettagli, dalle zone di distribuzione al messaggio grafico.",
  },
  {
    icon: HeartHandshake,
    title: "Trasparenza",
    text: "Ti mostriamo il lavoro svolto con foto, video e report. Nessun costo nascosto.",
  },
];

const motivi = [
  {
    strong: "Trasparenza totale",
    rest: "ricevi foto, video e report della distribuzione",
  },
  {
    strong: "Grafica premium",
    rest: "niente template, ogni volantino è disegnato su misura",
  },
  {
    strong: "Supporto continuativo",
    rest: "restiamo al tuo fianco anche dopo la campagna",
  },
  {
    strong: "Risultati concreti",
    rest: "più visibilità, più contatti, più vendite",
  },
];

/* ---------------------------------------------------------------------------
   HERO DI PAGINA A TUTTO SCHERMO
   Sfondo geroglifici full-bleed + zoom allo scroll + titolo enorme.
--------------------------------------------------------------------------- */
function ChiSiamoHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Range SEMPRE crescenti in [0,1]
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.3]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const veilOpacity = useTransform(scrollYProgress, [0, 1], [0.55, 0.85]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0px", "-60px"]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-[170vh] w-full bg-black text-white"
    >
      <div className="sticky top-0 flex h-[100svh] w-full items-center justify-center overflow-hidden">
        {/* Sfondo immersivo full-bleed: geroglifici + zoom allo scroll */}
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <motion.img
            style={{ scale: bgScale, y: bgY }}
            src="https://images.unsplash.com/photo-1718728593313-1dc58f83f0ac?w=2400&q=85&auto=format&fit=crop"
            alt=""
            className="h-full w-full object-cover"
          />
          {/* Velatura scura che si intensifica allo scroll */}
          <motion.div
            style={{ opacity: veilOpacity }}
            className="pointer-events-none absolute inset-0 bg-black"
          />
          {/* Gradiente per fondersi nel flusso nero continuo */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-[#0b0a08]" />
        </div>

        {/* Alone oro tenue */}
        <div className="pointer-events-none absolute left-1/2 top-1/3 h-[460px] w-[680px] -translate-x-1/2 rounded-full bg-gold/10 blur-[150px]" />

        {/* Titolo ENORME della storia */}
        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-6 pt-24 text-center"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-gold-light"
          >
            <span className="h-px w-10 bg-gold-light" />
            Chi siamo
            <span className="h-px w-10 bg-gold-light" />
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-5xl font-serif text-5xl font-semibold leading-[1.04] tracking-tight [text-shadow:0_4px_50px_rgba(0,0,0,0.85)] md:text-7xl lg:text-8xl"
          >
            La storia de{" "}
            <span className="bg-gradient-to-r from-gold-light via-[#fff4cf] to-gold bg-clip-text text-transparent">
              La Piramide
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 max-w-2xl text-lg leading-relaxed text-white/70 [text-shadow:0_2px_24px_rgba(0,0,0,0.8)] md:text-xl"
          >
            Nasciamo dalla convinzione che il marketing locale meritasse più cura, più attenzione e risultati concreti misurabili.
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
            className="inline-block"
          >
            Scorri per scoprire ↓
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   SCENA STORIA + APPROCCIO
   Full-bleed dark con immagine geroglifici in parallax e testo grande.
--------------------------------------------------------------------------- */
function StoriaScene() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.3]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const veilOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.78, 0.7, 0.85]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["28px", "-28px"]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] w-full items-center overflow-hidden bg-[#0b0a08] py-28 text-white md:py-36"
    >
      {/* Sfondo full-bleed con zoom/parallax */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <motion.img
          style={{ scale: bgScale, y: bgY }}
          src="https://images.unsplash.com/photo-1718728593313-1dc58f83f0ac?w=2400&q=85&auto=format&fit=crop"
          alt=""
          className="h-full w-full object-cover opacity-70"
        />
        <motion.div
          style={{ opacity: veilOpacity }}
          className="pointer-events-none absolute inset-0 bg-black"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0b0a08] via-black/40 to-[#0b0a08]" />
      </div>

      <div className="pointer-events-none absolute left-1/4 top-1/2 h-[420px] w-[560px] -translate-y-1/2 rounded-full bg-gold/10 blur-[150px]" />

      <motion.div
        style={{ y: contentY }}
        className="relative z-10 mx-auto w-full max-w-6xl px-6"
      >
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.span
            variants={reveal}
            className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[4px] text-gold-light"
          >
            <span className="h-px w-10 bg-gold-light" />
            Chi siamo
          </motion.span>

          <motion.h2
            variants={reveal}
            className="mt-6 max-w-4xl font-serif text-4xl font-semibold leading-[1.06] tracking-tight [text-shadow:0_4px_40px_rgba(0,0,0,0.85)] md:text-6xl"
          >
            Marketing locale{" "}
            <span className="bg-gradient-to-r from-gold-light via-[#fff4cf] to-gold bg-clip-text text-transparent">
              fatto con cura
            </span>
          </motion.h2>

          <motion.p
            variants={reveal}
            className="mt-8 max-w-3xl text-lg leading-relaxed text-white/75 [text-shadow:0_2px_24px_rgba(0,0,0,0.8)] md:text-xl"
          >
            La Piramide è un team di professionisti del marketing territoriale che ha deciso di fare le cose in modo diverso. Non crediamo nelle campagne generiche, nei volantini sparati a caso o nei social gestiti con copia-incolla. Crediamo nel{" "}
            <strong className="font-semibold text-gold-light">lavoro su misura</strong>, nel{" "}
            <strong className="font-semibold text-gold-light">rapporto umano</strong> e nei{" "}
            <strong className="font-semibold text-gold-light">risultati misurabili</strong>.
          </motion.p>
        </motion.div>

        {/* Il nostro approccio */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="relative mt-12 max-w-3xl overflow-hidden rounded-2xl border border-gold/15 bg-white/[0.04] p-6 backdrop-blur-md transition hover:border-gold/35 md:p-8"
        >
          <span className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-gold-light/60 to-transparent" />
          <motion.span
            variants={reveal}
            className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[4px] text-gold-light"
          >
            <span className="h-px w-10 bg-gold-light" />
            Il nostro approccio
          </motion.span>
          <motion.h3
            variants={reveal}
            className="mt-4 mb-4 font-serif text-2xl font-semibold text-white md:text-3xl"
          >
            Ascolto, strategia, risultati
          </motion.h3>
          <motion.p variants={reveal} className="mb-4 leading-relaxed text-white/70">
            Ogni attività ha una storia, un pubblico diverso e una zona specifica in cui opera. Per questo il primo passo del nostro lavoro è sempre l&apos;ascolto: capire chi sei, cosa vendi, chi sono i tuoi clienti ideali e dove si trovano. Solo dopo costruiamo una strategia coordinata che unisce{" "}
            <strong className="font-semibold text-gold-light">volantinaggio mirato</strong>,{" "}
            <strong className="font-semibold text-gold-light">grafica professionale</strong> e{" "}
            <strong className="font-semibold text-gold-light">presenza digitale</strong>.
          </motion.p>
          <motion.p variants={reveal} className="leading-relaxed text-white/70">
            Non lasciamo nulla al caso. Mappiamo le zone di distribuzione, curiamo ogni dettaglio grafico, verifichiamo il lavoro sul campo con foto e video. Il nostro obiettivo è uno solo: portare clienti reali alla tua porta.
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   SCENA STATISTICHE — numeri enormi in oro, full-bleed dark.
--------------------------------------------------------------------------- */
function StatsScene() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], ["24px", "-24px"]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[90svh] w-full items-center overflow-hidden bg-black py-24 text-white md:py-32"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[480px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[160px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(201,168,76,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(201,168,76,0.04)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]" />
      </div>

      <motion.div
        style={{ y: contentY }}
        className="relative z-10 mx-auto w-full max-w-6xl px-6 text-center"
      >
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 font-serif text-4xl font-semibold leading-[1.06] tracking-tight md:text-6xl"
        >
          I numeri che ci{" "}
          <span className="bg-gradient-to-r from-gold-light via-[#fff4cf] to-gold bg-clip-text text-transparent">
            raccontano
          </span>
        </motion.h2>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-8 sm:grid-cols-3"
        >
          {stats.map((s) => (
            <motion.div
              key={s.label}
              variants={reveal}
              whileHover={{ y: -6 }}
              className="group relative flex flex-col items-center"
            >
              <span className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-gold/30 bg-gold/10">
                <s.icon className="h-7 w-7 text-gold-light" />
              </span>
              <strong className="block bg-gradient-to-r from-gold-light via-[#fff4cf] to-gold bg-clip-text font-serif text-6xl font-semibold text-transparent md:text-7xl">
                {s.value}
              </strong>
              <span className="mt-3 text-base text-white/55 md:text-lg">{s.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   SCENA VALORI — pannelli glass grandi, full-bleed dark.
--------------------------------------------------------------------------- */
function ValoriScene() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], ["28px", "-28px"]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[90svh] w-full items-center overflow-hidden bg-[#0b0a08] py-24 text-white md:py-32"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-1/3 h-[420px] w-[560px] rounded-full bg-gold/10 blur-[150px]" />
      </div>

      <motion.div
        style={{ y: contentY }}
        className="relative z-10 mx-auto w-full max-w-6xl px-6"
      >
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 font-serif text-4xl font-semibold leading-[1.06] tracking-tight md:text-6xl"
        >
          I nostri{" "}
          <span className="bg-gradient-to-r from-gold-light via-[#fff4cf] to-gold bg-clip-text text-transparent">
            valori
          </span>
        </motion.h2>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-6 md:grid-cols-2"
        >
          {valori.map((v) => (
            <motion.div
              key={v.title}
              variants={reveal}
              whileHover={{ y: -6 }}
              className="group relative flex items-start gap-5 overflow-hidden rounded-2xl border border-gold/15 bg-white/[0.04] p-8 backdrop-blur-md transition hover:-translate-y-1 hover:border-gold/35 md:p-10"
            >
              <span className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-gold-light/60 to-transparent" />
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/10">
                <v.icon className="h-6 w-6 text-gold-light" />
              </div>
              <div>
                <strong className="mb-2 block font-serif text-2xl text-white md:text-3xl">{v.title}</strong>
                <p className="text-base leading-relaxed text-white/60 md:text-lg">{v.text}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   SCENA "PERCHÉ SCEGLIERCI" — lista grande full-bleed dark.
--------------------------------------------------------------------------- */
function SceglierciScene() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], ["28px", "-28px"]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[90svh] w-full items-center overflow-hidden bg-black py-24 text-white md:py-32"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-1/2 h-[460px] w-[600px] -translate-y-1/2 rounded-full bg-gold/10 blur-[150px]" />
      </div>

      <motion.div
        style={{ y: contentY }}
        className="relative z-10 mx-auto w-full max-w-6xl px-6"
      >
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 font-serif text-4xl font-semibold leading-[1.06] tracking-tight md:text-6xl"
        >
          Perché{" "}
          <span className="bg-gradient-to-r from-gold-light via-[#fff4cf] to-gold bg-clip-text text-transparent">
            sceglierci
          </span>
        </motion.h2>

        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-5 md:grid-cols-2"
        >
          {motivi.map((m) => (
            <motion.li
              key={m.strong}
              variants={reveal}
              whileHover={{ y: -6 }}
              className="group relative flex items-start gap-4 rounded-2xl border border-gold/15 bg-white/[0.04] p-6 backdrop-blur-md transition hover:-translate-y-1 hover:border-gold/35 md:p-8"
            >
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/10 transition group-hover:scale-110">
                <Check className="h-4 w-4 text-gold-light" />
              </span>
              <span className="text-base leading-relaxed text-white/70 md:text-lg">
                <strong className="font-semibold text-white">{m.strong}</strong> — {m.rest}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   SCENA FINALE — scarica presentazione, full-bleed dark con alone oro.
--------------------------------------------------------------------------- */
function DownloadScene() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const haloScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[90svh] w-full items-center justify-center overflow-hidden bg-[#0b0a08] py-24 text-white md:py-32"
    >
      <motion.div
        style={{ scale: haloScale }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/15 blur-[160px]"
      />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 mx-auto w-full max-w-3xl px-6 text-center"
      >
        <motion.h2
          variants={reveal}
          className="font-serif text-4xl font-semibold leading-[1.06] tracking-tight [text-shadow:0_4px_40px_rgba(0,0,0,0.85)] md:text-6xl"
        >
          Scarica la nostra{" "}
          <span className="bg-gradient-to-r from-gold-light via-[#fff4cf] to-gold bg-clip-text text-transparent">
            presentazione
          </span>
        </motion.h2>
        <motion.p
          variants={reveal}
          className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-white/65 md:text-xl"
        >
          Tutti i dettagli sui nostri servizi, i numeri e i casi di successo in un unico documento.
        </motion.p>
        <motion.div variants={reveal} className="mt-10">
          <motion.a
            href="/pdf/presentazione.pdf"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -4 }}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-br from-gold-light via-gold to-gold-dark px-9 py-4 text-sm font-bold uppercase tracking-wide text-dark shadow-[0_0_40px_rgba(201,168,76,0.4)] transition hover:-translate-y-0.5"
          >
            Apri presentazione <ExternalLink size={16} />
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default function ChiSiamoPage() {
  return (
    <main className="w-full bg-[#0b0a08] text-white">
      <ChiSiamoHero />
      <StoriaScene />
      <StatsScene />
      <ValoriScene />
      <SceglierciScene />
      <DownloadScene />
    </main>
  );
}
