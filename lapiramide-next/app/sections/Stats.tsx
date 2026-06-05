"use client";

import { Users, MapPin, Package, ThumbsUp } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const stats = [
  { icon: Users, value: "250+", label: "Clienti soddisfatti" },
  { icon: MapPin, value: "18", label: "Regioni italiane" },
  { icon: Package, value: "3M+", label: "Volantini distribuiti" },
  { icon: ThumbsUp, value: "98%", label: "Clienti che rinnovano" },
];

const reveal = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14 } },
};

export default function Stats() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Zoom dello sfondo legato allo scroll (range sempre crescenti in [0,1])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.3]);
  // Parallax verticale leggero dell'immagine
  const bgY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  // Il blocco contenuti scorre dolcemente verso l'alto
  const contentY = useTransform(scrollYProgress, [0, 1], ["40px", "-40px"]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] w-full items-center overflow-hidden bg-[#0b0a08] py-24 text-white md:py-32"
    >
      {/* Sfondo immersivo full-bleed con zoom allo scroll */}
      <motion.div
        style={{ scale: bgScale, y: bgY }}
        className="absolute inset-0 will-change-transform"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1764312349609-41297ede0e57?w=2400&q=85&auto=format&fit=crop"
          alt=""
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* Velatura scura per leggibilita */}
      <div className="pointer-events-none absolute inset-0 bg-black/75" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0b0a08] via-transparent to-[#0b0a08]" />

      {/* Alone oro tenue di sfondo */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[160px]" />

      {/* Contenuto centrato — sfondo resta full-bleed */}
      <motion.div
        style={{ y: contentY }}
        className="relative z-10 mx-auto w-full max-w-6xl px-6"
      >
        {/* Intestazione */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-16 max-w-3xl text-center md:mb-24"
        >
          <span className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[4px] text-gold-light">
            <span className="h-px w-10 bg-gold-light" />
            I nostri numeri
            <span className="h-px w-10 bg-gold-light" />
          </span>
          <h2 className="mt-7 font-serif text-5xl font-semibold leading-[1.05] tracking-tight [text-shadow:0_4px_40px_rgba(0,0,0,0.8)] md:text-7xl">
            Risultati che parlano da{" "}
            <span className="bg-gradient-to-r from-gold-light via-[#fff4cf] to-gold bg-clip-text text-transparent">
              soli
            </span>
          </h2>
          <p className="mt-6 text-lg text-white/65">
            Anni di campagne sul territorio, raccontati in quattro numeri.
          </p>
        </motion.div>

        {/* 4 numeri ENORMI in oro, centrati */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-12 text-center sm:grid-cols-2 lg:grid-cols-4 lg:gap-8"
        >
          {stats.map((s) => (
            <motion.div
              key={s.label}
              variants={reveal}
              className="group flex flex-col items-center"
            >
              {/* Icona in cerchio oro */}
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/30 bg-white/[0.04] text-gold-light backdrop-blur transition group-hover:border-gold/50">
                <s.icon className="h-6 w-6" strokeWidth={1.5} />
              </span>

              {/* Numero enorme in oro */}
              <strong className="mt-7 block bg-gradient-to-b from-[#fff4cf] via-gold-light to-gold-dark bg-clip-text font-serif text-7xl font-semibold leading-none tracking-tight text-transparent [text-shadow:0_8px_50px_rgba(0,0,0,0.6)] md:text-8xl">
                {s.value}
              </strong>

              {/* Etichetta */}
              <span className="mt-5 block text-xs font-medium uppercase tracking-[3px] text-white/65 md:text-sm">
                {s.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
