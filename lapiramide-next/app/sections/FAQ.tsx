"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { Plus } from "lucide-react";

const faqs = [
  {
    q: "Quanto costa una campagna di volantinaggio?",
    a: "Il costo dipende dal numero di pezzi, dalle zone scelte e se includi anche la grafica. I nostri pacchetti partono da pochi centesimi a volantino, con preventivi chiari e senza costi nascosti. Contattaci su WhatsApp per un'offerta su misura.",
  },
  {
    q: "In quanto tempo viene consegnata la distribuzione?",
    a: "Dalla conferma del preventivo e dell'approvazione grafica, in genere impieghiamo 3-7 giorni lavorativi. Se hai urgenze, possiamo studiare insieme una tempistica più rapida.",
  },
  {
    q: "Posso vedere dove vengono distribuiti i volantini?",
    a: "Assolutamente sì. Offriamo un servizio di tracciamento con foto geolocalizzate e video dei controlli. Ricevi la prova del lavoro svolto direttamente su WhatsApp o email.",
  },
  {
    q: "Fate anche la grafica o devo averla già pronta?",
    a: "Facciamo entrambe le cose. Se hai già il volantino, lo stampiamo e distribuiamo. Se non ce l'hai, i nostri grafici lo creano su misura per la tua attività, settore e target.",
  },
  {
    q: "Lavorate solo con attività locali o anche online?",
    a: "Il nostro core è il marketing territoriale, ma gestiamo anche siti web, social media e campagne sponsorizzate. L'ideale è combinare offline e online per risultati superiori.",
  },
  {
    q: "Quali sono le zone coperte?",
    a: "Operiamo in tutta Italia, con una rete consolidata nel Centro-Nord. Se hai un progetto al Sud o nelle isole, contattaci: valutiamo insieme la fattibilità.",
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

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  // Effetti di scroll (movimento dolce, coerente con la Hero-viaggio)
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Flusso nero immersivo: aloni oro che respirano in parallax (range crescenti in [0,1])
  const yHaloTop = useTransform(scrollYProgress, [0, 1], ["-18%", "18%"]);
  const yHaloBottom = useTransform(scrollYProgress, [0, 1], ["18%", "-18%"]);
  const haloScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.3]);
  const haloOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 1, 0.4]);
  // Parallax leggero del blocco contenuto (range crescente in [0,1])
  const yContent = useTransform(scrollYProgress, [0, 1], ["40px", "-40px"]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] w-full items-center overflow-hidden bg-[#0b0a08] py-24 text-white md:py-32"
    >
      {/* Sfondo immersivo full-bleed: flusso nero continuo + aloni oro in parallax */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          style={{ y: yHaloTop, scale: haloScale, opacity: haloOpacity }}
          className="absolute -top-32 left-1/2 h-[60vh] w-[80vw] -translate-x-1/2 rounded-full bg-gold/10 blur-[160px]"
        />
        <motion.div
          style={{ y: yHaloBottom, scale: haloScale, opacity: haloOpacity }}
          className="absolute -bottom-32 right-0 h-[55vh] w-[60vw] translate-x-1/4 rounded-full bg-gold/[0.07] blur-[170px]"
        />
        {/* Velatura per profondità e leggibilità, senza stacchi */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0a08] via-transparent to-[#0b0a08]" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Contenuto grande e centrato — sfondo full-bleed, testo in colonna stretta */}
      <motion.div
        style={{ y: yContent }}
        className="relative z-10 mx-auto w-full max-w-6xl px-6"
      >
        {/* Intestazione: titolo enorme che entra allo scroll */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto mb-16 max-w-3xl text-center md:mb-20"
        >
          <motion.span
            variants={reveal}
            className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[4px] text-gold-light"
          >
            <span className="h-px w-10 bg-gold-light" />
            Domande frequenti
            <span className="h-px w-10 bg-gold-light" />
          </motion.span>

          <motion.h2
            variants={reveal}
            className="mt-8 font-serif text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl"
          >
            Tutto quello che devi{" "}
            <span className="bg-gradient-to-r from-gold-light via-[#fff4cf] to-gold bg-clip-text text-transparent">
              sapere
            </span>
          </motion.h2>

          <motion.p
            variants={reveal}
            className="mx-auto mt-6 max-w-xl text-lg text-white/55 md:text-xl"
          >
            Se non trovi la risposta che cerchi, scrivici su WhatsApp. Ti
            rispondiamo in pochi minuti.
          </motion.p>
        </motion.div>

        {/* Accordion immersivo — tutte le Q/A mantenute */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto flex max-w-3xl flex-col gap-4"
        >
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={i}
                variants={reveal}
                className={`group overflow-hidden rounded-2xl border backdrop-blur transition ${
                  isOpen
                    ? "border-gold/45 bg-white/[0.06] shadow-[0_0_60px_-12px_rgba(201,168,76,0.4)]"
                    : "border-gold/15 bg-white/[0.04] hover:border-gold/35"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full cursor-pointer items-center justify-between gap-5 px-6 py-6 text-left transition-colors focus:outline-none md:px-8 md:py-7"
                >
                  <span className="flex items-center gap-4 md:gap-6">
                    <span
                      className={`hidden font-serif text-sm tabular-nums tracking-widest transition-colors sm:block ${
                        isOpen
                          ? "text-gold-light"
                          : "text-white/35 group-hover:text-gold"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`font-serif text-xl font-medium leading-snug tracking-tight transition-colors md:text-2xl ${
                        isOpen ? "text-white" : "text-white/85 group-hover:text-white"
                      }`}
                    >
                      {f.q}
                    </span>
                  </span>

                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors ${
                      isOpen
                        ? "border-gold/60 bg-gold/15 text-gold-light"
                        : "border-gold/20 bg-white/5 text-gold group-hover:border-gold/40"
                    }`}
                  >
                    <motion.span
                      animate={{ rotate: isOpen ? 135 : 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
                      className="flex"
                    >
                      <Plus className="h-5 w-5" strokeWidth={1.5} />
                    </motion.span>
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 md:px-8">
                        <div className="h-px w-full bg-gradient-to-r from-gold/40 via-gold/15 to-transparent" />
                        <p className="max-w-2xl py-6 text-base font-light leading-relaxed text-white/60 sm:pl-10 md:text-lg md:pl-12">
                          {f.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
