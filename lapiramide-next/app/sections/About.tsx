"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowUpRight, ExternalLink, Check, MapPin } from "lucide-react";

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

const motivi = [
  "Distribuzione controllata con foto e video",
  "Grafica professionale coordinata offline e online",
  "Copertura nazionale con operatori locali qualificati",
  "Preventivi chiari, tempi certi, nessun costo nascosto",
];

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Zoom dello sfondo full-bleed legato allo scroll (range crescente in [0,1])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.3]);
  // Parallax verticale leggero dell'immagine
  const bgY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  // Velatura che si intensifica leggermente uscendo dalla scena
  const veilOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 0.5, 0.75]);
  // Parallax morbido del blocco testo
  const contentY = useTransform(scrollYProgress, [0, 1], ["24px", "-24px"]);

  return (
    <section
      ref={ref}
      id="chi-siamo"
      className="relative flex min-h-[100svh] w-full items-center overflow-hidden bg-[#0b0a08] py-24 text-white md:py-32"
    >
      {/* Sfondo immersivo full-bleed: geroglifici scuri + zoom allo scroll */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <motion.img
          style={{ scale: bgScale, y: bgY }}
          src="https://images.unsplash.com/photo-1718728593313-1dc58f83f0ac?w=2400&q=85&auto=format&fit=crop"
          alt=""
          className="h-full w-full object-cover"
        />
        {/* Velatura scura forte per leggibilità */}
        <motion.div
          style={{ opacity: veilOpacity }}
          className="pointer-events-none absolute inset-0 bg-black"
        />
        {/* Gradiente per fondersi nel flusso nero continuo */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0b0a08] via-black/40 to-[#0b0a08]" />
      </div>

      {/* Alone oro tenue sopra l'immagine */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[420px] w-[640px] -translate-x-1/2 rounded-full bg-gold/10 blur-[140px]" />

      <motion.div
        style={{ y: contentY }}
        className="relative z-10 mx-auto w-full max-w-6xl px-6"
      >
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Colonna testo */}
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
              className="mt-6 font-serif text-5xl font-semibold leading-[1.05] tracking-tight [text-shadow:0_4px_40px_rgba(0,0,0,0.8)] md:text-7xl"
            >
              Un partner per la tua comunicazione{" "}
              <span className="bg-gradient-to-r from-gold-light via-[#fff4cf] to-gold bg-clip-text text-transparent">
                locale
              </span>
            </motion.h2>

            <motion.p
              variants={reveal}
              className="mt-8 max-w-xl text-base leading-relaxed text-white/75 [text-shadow:0_2px_24px_rgba(0,0,0,0.7)] md:text-lg"
            >
              La Piramide nasce dall&apos;idea che la pubblicità locale debba
              essere fatta con metodo, presenza e attenzione al dettaglio. Non ci
              limitiamo a distribuire volantini: studiamo il territorio, creiamo
              messaggi efficaci e verifichiamo ogni passaggio.
            </motion.p>
            <motion.p
              variants={reveal}
              className="mt-5 max-w-xl leading-relaxed text-white/60 [text-shadow:0_2px_24px_rgba(0,0,0,0.7)]"
            >
              Operiamo in 18 regioni italiane con una rete consolidata di
              operatori qualificati. Ogni campagna è seguita personalmente, con
              report fotografici, controlli di qualità e la possibilità di
              tracciare il lavoro svolto in tempo reale.
            </motion.p>

            <motion.div
              variants={reveal}
              className="mt-12 flex flex-wrap items-center gap-4"
            >
              <motion.a
                href="/chi-siamo"
                whileHover={{ y: -4 }}
                className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-gradient-to-br from-gold-light via-gold to-gold-dark px-7 py-3.5 text-xs font-bold uppercase tracking-wide text-dark shadow-[0_0_30px_rgba(201,168,76,0.35)] transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0a08] md:text-sm"
              >
                Scopri di più
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </motion.a>
              <motion.a
                href="/pdf/presentazione.pdf"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4 }}
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-gold-light/40 bg-white/5 px-7 py-3.5 text-xs font-bold uppercase tracking-wide text-gold-light backdrop-blur transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0a08] md:text-sm"
              >
                Presentazione PDF <ExternalLink size={14} />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Colonna "Perché scegliere" su pannello glass */}
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="rounded-2xl border border-gold/15 bg-white/[0.04] p-6 backdrop-blur-md transition hover:-translate-y-1 hover:border-gold/35 md:p-8"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[3px] text-gold-light">
              <MapPin size={13} />
              18 regioni italiane
            </span>

            <p className="mt-6 font-serif text-2xl text-white md:text-3xl">
              Perché scegliere{" "}
              <span className="bg-gradient-to-r from-gold-light via-[#fff4cf] to-gold bg-clip-text text-transparent">
                La Piramide
              </span>
            </p>

            <motion.ul
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="mt-8 space-y-4"
            >
              {motivi.map((motivo) => (
                <motion.li
                  key={motivo}
                  variants={reveal}
                  className="group flex items-start gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4 transition hover:border-gold/25 hover:bg-white/[0.04]"
                >
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold-light transition group-hover:scale-110">
                    <Check size={15} />
                  </span>
                  <span className="text-base leading-relaxed text-white/70 transition-colors group-hover:text-white md:text-lg">
                    {motivo}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
