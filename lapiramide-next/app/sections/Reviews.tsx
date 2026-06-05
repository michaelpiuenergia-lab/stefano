"use client";

import React from "react";
import { motion } from "motion/react";
import { Star } from "lucide-react";

interface Review {
  text: string;
  author: string;
  role: string;
}

const reviews: Review[] = [
  { text: "Distribuzione veloce e precisa. Ottimo servizio, i volantini sono arrivati puntuali e la grafica era impeccabile.", author: "Claudia Adanti", role: "Negozio abbigliamento" },
  { text: "Serietà, cortesia e professionalità. Consiglio vivamente a chiunque cerchi visibilità locale con risultati concreti.", author: "Davide Temperoni", role: "Ristoratore" },
  { text: "Abbiamo fatto una campagna per il nostro centro estetico e i risultati si sono visti subito. Cliente per cliente.", author: "Martina Rossi", role: "Centro estetico" },
  { text: "Ha curato ogni dettaglio: dalla grafica alla distribuzione, tutto impeccabile. Rifaremo sicuramente.", author: "Luca Bianchi", role: "Officina meccanica" },
  { text: "Finalmente un team che capisce cosa serve a un negozio locale. Più clienti, più visibilità, zero preoccupazioni.", author: "Giulia Neri", role: "Boutique" },
  { text: "Ho apprezzato soprattutto i controlli con foto: vedere il lavoro fatto mi ha dato fiducia totale nel servizio.", author: "Alessandro Verdi", role: "Palestra" },
];

const col1 = reviews.slice(0, 2);
const col2 = reviews.slice(2, 4);
const col3 = reviews.slice(4, 6);

function Column({
  items,
  duration,
  className = "",
}: {
  items: Review[];
  duration: number;
  className?: string;
}) {
  return (
    <div className={className}>
      <motion.ul
        animate={{ translateY: "-50%" }}
        transition={{ duration, repeat: Infinity, ease: "linear", repeatType: "loop" }}
        className="m-0 flex list-none flex-col gap-6 p-0"
      >
        {[0, 1].map((dup) => (
          <React.Fragment key={dup}>
            {items.map((r, i) => (
              <li
                key={`${dup}-${i}`}
                className="w-full max-w-sm rounded-2xl border border-gold/15 bg-white/[0.035] p-7 backdrop-blur transition-colors hover:border-gold/35"
              >
                <div className="mb-4 flex gap-1 text-gold">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} size={15} fill="currentColor" />
                  ))}
                </div>
                <p className="font-serif text-lg leading-snug text-white/90">&ldquo;{r.text}&rdquo;</p>
                <div className="mt-6 flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 bg-gold/10 font-serif text-base font-semibold text-gold-light">
                    {r.author.charAt(0)}
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-white">{r.author}</div>
                    <div className="text-xs uppercase tracking-wide text-white/45">{r.role}</div>
                  </div>
                </div>
              </li>
            ))}
          </React.Fragment>
        ))}
      </motion.ul>
    </div>
  );
}

export default function Reviews() {
  return (
    <section id="recensioni" className="relative overflow-hidden bg-[#0b0a08] py-24 text-white md:py-32">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-[420px] w-[640px] -translate-x-1/2 rounded-full bg-gold/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-6">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[4px] text-gold-light">
            <span className="h-px w-10 bg-gold-light" />
            Recensioni
            <span className="h-px w-10 bg-gold-light" />
          </span>
          <h2 className="mt-6 font-serif text-4xl font-semibold leading-tight md:text-6xl">
            Cosa dicono i nostri{" "}
            <span className="bg-gradient-to-r from-gold-light via-[#fff4cf] to-gold bg-clip-text text-transparent">
              clienti
            </span>
          </h2>
          <p className="mt-5 text-white/55">
            Recensioni reali di attività che hanno scelto La Piramide per la loro
            comunicazione locale.
          </p>
        </div>

        <div
          className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]"
          style={{ maxHeight: 620, overflow: "hidden" }}
        >
          <Column items={col1} duration={20} />
          <Column items={col2} duration={26} className="hidden md:block" />
          <Column items={col3} duration={22} className="hidden lg:block" />
        </div>
      </div>
    </section>
  );
}
