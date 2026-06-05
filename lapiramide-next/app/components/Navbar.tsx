"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/chi-siamo", label: "Chi siamo" },
  { href: "/servizi", label: "Servizi" },
  { href: "/lavori", label: "Lavori" },
  { href: "/recensioni", label: "Recensioni" },
  { href: "/contatti", label: "Contatti" },
];

interface NavbarProps {
  onOpenQuote: (service: string) => void;
}

export default function Navbar({ onOpenQuote }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => pathname === href;
  // testo chiaro quando: sopra la hero scura OPPURE navbar scura da scroll
  const lightText = scrolled || pathname === "/";

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-gold/15 bg-[#0a0a0a]/85 text-white shadow-lg shadow-black/30 backdrop-blur-md"
            : pathname === "/"
            ? "text-white"
            : "border-b border-border/50 text-foreground"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:h-20">
          <Link href="/" className="flex items-center gap-3 font-serif text-lg font-bold tracking-wide">
            <Logo className="h-8 w-auto md:h-9" />
            <span className="hidden sm:inline">La Piramide</span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
                  isActive(l.href)
                    ? lightText
                      ? "bg-white/10 text-gold-light"
                      : "bg-gold/20 text-dark"
                    : lightText
                    ? "text-white/70 hover:bg-white/10 hover:text-white"
                    : "text-muted hover:bg-black/5 hover:text-foreground"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenQuote("volantinaggio")}
              className="hidden items-center justify-center gap-2 rounded-full bg-gradient-to-br from-gold-light via-gold to-gold-dark px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-dark shadow-md transition hover:-translate-y-0.5 hover:shadow-lg md:inline-flex"
            >
              Preventivo
            </button>
            <button
              className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition md:hidden ${
                lightText ? "border-white/20 bg-white/10 text-white" : "border-border bg-surface"
              }`}
              onClick={() => setOpen(!open)}
              aria-label={open ? "Chiudi menu" : "Apri menu"}
              aria-expanded={open}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-x-4 top-20 z-40 rounded-2xl border border-gold/20 bg-dark p-6 shadow-xl shadow-gold/10 md:hidden">
          <div className="mb-5 flex items-center justify-center border-b border-white/10 pb-5">
            <Logo className="h-14 w-auto" showText />
          </div>
          <div className="grid gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`block rounded-xl px-4 py-3 text-sm font-bold uppercase tracking-wide transition ${
                  isActive(l.href)
                    ? "bg-white/10 text-gold-light"
                    : "text-white/70 hover:bg-white/5 hover:text-gold-light"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <button
              onClick={() => {
                setOpen(false);
                onOpenQuote("volantinaggio");
              }}
              className="mt-2 w-full rounded-xl bg-gold px-4 py-3 text-center text-sm font-bold uppercase tracking-wide text-dark"
            >
              Richiedi preventivo
            </button>
          </div>
        </div>
      )}
    </>
  );
}
