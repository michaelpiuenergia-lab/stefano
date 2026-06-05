"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, Check } from "lucide-react";

const SILHOUETTE =
  "https://images.unsplash.com/photo-1746310783422-16df7622e7c9?w=2000&q=82&auto=format&fit=crop";

const services = [
  {
    id: "volantinaggio",
    num: "01",
    title: "Volantinaggio mirato",
    desc: "Distribuzione mirata nelle zone giuste per intercettare clienti reali e aumentare presenza nel tuo territorio.",
    label: "Sistema operativo",
    detailTitle: "Distribuzione strategica",
    detailBody:
      "Partiamo da zona, pubblico e obiettivo commerciale. Il volantinaggio mirato diventa un'azione controllata, coordinata con la grafica e pensata per portare clienti reali verso la tua attività.",
    points: [
      "Mappatura delle aree più utili per la tua attività.",
      "Messaggio chiaro, leggibile e coerente con il brand.",
      "Controllo operativo con materiali foto e video dove previsto.",
    ],
  },
  {
    id: "grafica",
    num: "02",
    title: "Grafica pubblicitaria",
    desc: "Volantini, locandine e contenuti creati per attirare clienti, comunicare valore e rendere la tua offerta immediata.",
    label: "Identità visiva",
    detailTitle: "Grafica pubblicitaria che vende",
    detailBody:
      "Realizziamo materiali chiari, eleganti e creati per attirare clienti: volantini, locandine, contenuti social e comunicazioni promozionali con gerarchia, contrasto e chiamata all'azione.",
    points: [
      "Layout premium coerente con settore, offerta e target.",
      "Testi sintetici per far capire subito il valore.",
      "Formati pronti per stampa, social e campagne locali.",
    ],
  },
  {
    id: "social",
    num: "03",
    title: "Pubblicità social",
    desc: "Presenza online mentre lavori offline: campagne e contenuti che mantengono vivo il contatto con il tuo pubblico.",
    label: "Amplificazione digitale",
    detailTitle: "Pubblicità social e presenza online",
    detailBody:
      "Aiutiamo le attività a restare presenti online mentre lavorano offline, con contenuti e campagne su Facebook, Instagram e TikTok collegati alla presenza locale.",
    points: [
      "Creatività coordinate con volantini e offerte attive.",
      "Campagne pensate per visibilità, messaggi e contatti.",
      "Comunicazione più riconoscibile nel tempo.",
    ],
  },
  {
    id: "siti",
    num: "04",
    title: "Creazione siti web",
    desc: "Siti moderni, veloci e chiari per presentare il brand e trasformare visite in contatti concreti.",
    label: "Base digitale",
    detailTitle: "Creazione siti web premium",
    detailBody:
      "Costruiamo siti moderni, responsive e orientati al contatto: una pagina chiara dove raccontare servizi, mostrare lavori e portare il cliente verso WhatsApp o richiesta preventivo.",
    points: [
      "Struttura veloce da consultare su telefono e desktop.",
      "Design coerente con immagine, settore e obiettivo.",
      "Percorsi semplici verso contatto, preventivo e fiducia.",
    ],
  },
];

const reveal = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

// Comparsa card con leggero scale/translate all'ingresso
const cardReveal = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

interface ServicesProps {
  onOpenQuote?: (service: string) => void;
}

export default function Services({ onOpenQuote }: ServicesProps) {
  const [active, setActive] = useState("volantinaggio");
  const current = services.find((s) => s.id === active)!;

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Zoom cinematografico dello sfondo legato allo scroll (range crescenti in [0,1])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.3]);
  // Parallax verticale dell'immagine full-bleed
  const yImg = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  // Parallax verticale dell'alone oro di sfondo
  const yHalo = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  // Leggero parallax verticale del blocco testo/contenuto
  const yContent = useTransform(scrollYProgress, [0, 1], ["24px", "-24px"]);

  const select = (id: string) => setActive(id);

  return (
    <section
      ref={ref}
      id="servizi"
      className="relative flex min-h-[100svh] w-full items-center overflow-hidden bg-[#0b0a08] py-24 text-white md:py-28"
    >
      {/* SFONDO IMMERSIVO full-bleed edge-to-edge con zoom legato allo scroll */}
      <motion.div
        style={{ y: yImg, scale: bgScale }}
        className="pointer-events-none absolute inset-0"
      >
        <motion.img
          src={SILHOUETTE}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="h-full w-full object-cover opacity-[0.18]"
        />
      </motion.div>
      {/* Velature scure per leggibilità e flusso nero continuo */}
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0b0a08] via-[#0b0a08]/85 to-[#0b0a08]/45" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0b0a08] via-transparent to-[#0b0a08]/70" />
      {/* Alone oro tenue di sfondo con parallax verticale */}
      <motion.div
        style={{ y: yHalo }}
        className="pointer-events-none absolute -top-24 left-1/2 h-[520px] w-[760px] -translate-x-1/2 rounded-full bg-gold/10 blur-[150px]"
      />

      {/* Contenuto centrato in un contenitore interno: lo sfondo resta full-bleed */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
        {/* Intestazione editoriale con leggero parallax verticale */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          style={{ y: yContent }}
          className="mb-12 max-w-4xl md:mb-16"
        >
          <motion.span
            variants={reveal}
            className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[4px] text-gold-light"
          >
            <span className="h-px w-10 bg-gold-light" />
            Servizi
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
            Scegli il servizio di cui hai bisogno e compila la richiesta guidata:
            riceveremo direttamente tutti i dettagli su WhatsApp per prepararti un
            preventivo gratuito.
          </motion.p>
        </motion.div>

        <div className="grid gap-x-12 gap-y-10 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Card servizio grandi su nero: selezionabili */}
          <motion.ul
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col gap-4"
          >
            {services.map((s) => {
              const isActive = active === s.id;
              return (
                <motion.li key={s.id} variants={cardReveal}>
                  <motion.button
                    type="button"
                    onClick={() => select(s.id)}
                    aria-pressed={isActive}
                    whileHover={{ y: -4 }}
                    className={`group flex w-full items-start gap-5 rounded-2xl border p-6 text-left backdrop-blur transition focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-light md:gap-6 md:p-7 ${
                      isActive
                        ? "border-gold/40 bg-white/[0.06] shadow-[0_0_40px_rgba(201,168,76,0.18)]"
                        : "border-gold/15 bg-white/[0.04] hover:border-gold/35"
                    }`}
                  >
                    <span
                      className={`font-serif text-base font-bold tabular-nums transition-colors md:text-lg ${
                        isActive
                          ? "text-gold-light"
                          : "text-white/35 group-hover:text-gold-light/70"
                      }`}
                    >
                      {s.num}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span
                        className={`block font-serif text-3xl font-semibold leading-[1.1] tracking-tight transition-colors sm:text-4xl ${
                          isActive
                            ? "bg-gradient-to-r from-gold-light via-[#fff4cf] to-gold bg-clip-text text-transparent"
                            : "text-white/80 group-hover:text-white"
                        }`}
                      >
                        {s.title}
                      </span>
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.span
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{
                              duration: 0.4,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="block overflow-hidden"
                          >
                            <span className="mt-3 block max-w-md text-base leading-relaxed text-white/60 md:text-lg">
                              {s.desc}
                            </span>
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </span>
                    <ArrowUpRight
                      className={`mt-1 h-6 w-6 shrink-0 transition-all ${
                        isActive
                          ? "translate-x-0 text-gold-light opacity-100"
                          : "-translate-x-2 text-white/35 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                      }`}
                    />
                  </motion.button>
                </motion.li>
              );
            })}
          </motion.ul>

          {/* Pannello dettaglio: card glass premium con punti e CTA */}
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <div className="rounded-2xl border border-gold/15 bg-white/[0.04] p-6 backdrop-blur md:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[4px] text-gold-light">
                    <span className="h-px w-8 bg-gold-light" />
                    {current.label}
                  </span>
                  <h3 className="mt-4 font-serif text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
                    {current.detailTitle}
                  </h3>
                  <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/65 md:text-xl">
                    {current.detailBody}
                  </p>

                  <ul className="mt-8 flex flex-col gap-4">
                    {current.points.map((p, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-4 border-t border-gold/10 pt-4 text-base text-white/70 md:text-lg"
                      >
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold-light shadow-[0_0_10px_rgba(201,168,76,0.4)]">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                        {p}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-10">
                    {onOpenQuote ? (
                      <button
                        type="button"
                        onClick={() => onOpenQuote(current.id)}
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-br from-gold-light via-gold to-gold-dark px-7 py-3.5 text-xs font-bold uppercase tracking-wide text-dark shadow-lg transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0a08] md:text-sm"
                      >
                        Richiedi
                        <ArrowUpRight className="h-4 w-4" />
                      </button>
                    ) : (
                      <a
                        href={`https://wa.me/393457340981?text=Salve,%20vorrei%20un%20preventivo%20per%20${encodeURIComponent(current.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-br from-gold-light via-gold to-gold-dark px-7 py-3.5 text-xs font-bold uppercase tracking-wide text-dark shadow-lg transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0a08] md:text-sm"
                      >
                        Richiedi
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
