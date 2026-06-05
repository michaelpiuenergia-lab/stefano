"use client";

import { motion } from "motion/react";

interface SectionHeadProps {
  kicker: string;
  title: string;
  description?: string;
  center?: boolean;
  dark?: boolean;
}

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

export default function SectionHead({
  kicker,
  title,
  description,
  center = false,
  dark = false,
}: SectionHeadProps) {
  // Evidenzia l'ultima parola del titolo con il gradiente oro, senza alterare il testo.
  const words = title.trim().split(/\s+/);
  const lastWord = words.length > 1 ? words.pop() : null;
  const leadWords = lastWord ? words.join(" ") : title;

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className={`mb-12 md:mb-14 max-w-2xl ${center ? "mx-auto text-center" : ""}`}
    >
      {/* Kicker: oro + lineetta, coerente con la sezione Recensioni */}
      <motion.span
        variants={reveal}
        className={`inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[4px] ${
          dark ? "text-gold-light" : "text-gold-dark"
        }`}
      >
        <span className="h-px w-10 bg-gold-light" />
        {kicker}
        {center && <span className="h-px w-10 bg-gold-light" />}
      </motion.span>

      {/* Titolo serif elegante con una parola in gradiente oro */}
      <motion.h2
        variants={reveal}
        className={`mt-4 mb-4 font-serif text-3xl md:text-5xl lg:text-6xl font-semibold leading-[1.08] tracking-tight ${
          dark ? "text-white" : "text-[#1a1712]"
        }`}
      >
        {leadWords}
        {lastWord && (
          <>
            {" "}
            <span className="bg-gradient-to-r from-gold-light via-[#fff4cf] to-gold bg-clip-text text-transparent">
              {lastWord}
            </span>
          </>
        )}
      </motion.h2>

      {description && (
        <motion.p
          variants={reveal}
          className={`max-w-xl text-[15px] md:text-base leading-relaxed ${
            center ? "mx-auto" : ""
          } ${dark ? "text-white/55" : "text-[#1a1712]/60"}`}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
