"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Phone, MessageCircle, MapPin, ArrowUpRight } from "lucide-react";
import Logo from "./Logo";

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

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/chi-siamo", label: "Chi siamo" },
  { href: "/servizi", label: "Servizi" },
  { href: "/lavori", label: "Lavori" },
  { href: "/recensioni", label: "Recensioni" },
  { href: "/contatti", label: "Contatti" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0b0a08] text-white">
      {/* Sfondo atmosferico: alone oro + griglia tenue */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-[420px] w-[640px] -translate-x-1/2 rounded-full bg-gold/10 blur-[140px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(201,168,76,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(201,168,76,0.04)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]" />
      </div>

      {/* Linea oro superiore */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-60" />

      <div className="relative mx-auto max-w-7xl px-5 py-20 md:px-6 md:py-24">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-12 md:grid-cols-12"
        >
          {/* Brand */}
          <motion.div variants={reveal} className="md:col-span-5">
            <Link
              href="/"
              className="inline-flex cursor-pointer items-center gap-3 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0a08]"
            >
              <Logo className="h-10 w-auto" />
              <span className="font-serif text-xl font-semibold tracking-wide text-white">
                La Piramide
              </span>
            </Link>
            <p className="mt-5 max-w-sm leading-relaxed text-white/60">
              Distribuzione e promozione locale: volantinaggio, grafica
              pubblicitaria, social e siti web. Portiamo il tuo brand dritto al
              cuore del territorio.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="tel:+393457340981"
                className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-gold-light/40 bg-white/5 px-5 py-3 text-xs font-bold uppercase tracking-wide text-gold-light backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0a08]"
              >
                <Phone size={15} className="transition group-hover:-translate-y-0.5" />
                +39 345 734 0981
              </a>
              <a
                href="https://wa.me/393457340981"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-gradient-to-br from-gold-light via-gold to-gold-dark px-5 py-3 text-xs font-bold uppercase tracking-wide text-dark shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0a08]"
              >
                <MessageCircle size={15} />
                WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Navigazione */}
          <motion.div variants={reveal} className="md:col-span-3">
            <span className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[4px] text-gold-light">
              <span className="h-px w-10 bg-gold-light" />
              Naviga
            </span>
            <ul className="mt-5 space-y-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="group inline-flex cursor-pointer items-center gap-1.5 text-sm text-white/55 transition hover:text-gold-light focus-visible:text-gold-light focus-visible:outline-none"
                  >
                    <span className="h-px w-0 bg-gold-light transition-all duration-300 group-hover:w-5" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contatti */}
          <motion.div variants={reveal} className="md:col-span-4">
            <span className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[4px] text-gold-light">
              <span className="h-px w-10 bg-gold-light" />
              Contatti
            </span>
            <ul className="mt-5 space-y-4">
              <li>
                <a
                  href="tel:+393457340981"
                  className="group flex cursor-pointer items-start gap-3 text-sm text-white/60 transition hover:text-white focus-visible:text-white focus-visible:outline-none"
                >
                  <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/20 bg-white/[0.04] text-gold-light backdrop-blur transition group-hover:border-gold/40">
                    <Phone size={15} />
                  </span>
                  <span>
                    <span className="block text-[11px] font-bold uppercase tracking-[2px] text-white/40">
                      Telefono
                    </span>
                    +39 345 734 0981
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/393457340981"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex cursor-pointer items-start gap-3 text-sm text-white/60 transition hover:text-white focus-visible:text-white focus-visible:outline-none"
                >
                  <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/20 bg-white/[0.04] text-gold-light backdrop-blur transition group-hover:border-gold/40">
                    <MessageCircle size={15} />
                  </span>
                  <span>
                    <span className="block text-[11px] font-bold uppercase tracking-[2px] text-white/40">
                      WhatsApp
                    </span>
                    <span className="inline-flex items-center gap-1">
                      Scrivici ora
                      <ArrowUpRight
                        size={13}
                        className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </span>
                  </span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-sm text-white/60">
                  <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/20 bg-white/[0.04] text-gold-light backdrop-blur">
                    <MapPin size={15} />
                  </span>
                  <span>
                    <span className="block text-[11px] font-bold uppercase tracking-[2px] text-white/40">
                      Zona
                    </span>
                    Distribuzione e promozione locale
                  </span>
                </div>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Barra inferiore */}
        <div className="mt-14 border-t border-gold/15 pt-7">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-white/45">
              © {new Date().getFullYear()} La Piramide. Tutti i diritti
              riservati.
            </p>
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[2px] text-white/45">
              <span className="h-px w-6 bg-gold-light/60" />
              Distribuzione &amp; Promozione Locale
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
