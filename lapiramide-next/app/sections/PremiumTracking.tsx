"use client";

import { MapPin, Clock, BadgeCheck } from "lucide-react";

interface PremiumTrackingProps {
  onOpenQuote: (service: string) => void;
}

export default function PremiumTracking({ onOpenQuote }: PremiumTrackingProps) {
  return (
    <section id="tracciamento-premium" className="py-10 md:py-16 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-dark text-[#e7e5e4] rounded-[28px] px-6 py-16 md:px-12 md:py-20 text-center reveal relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gold/8 blur-[100px] rounded-full" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(201,168,76,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(201,168,76,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
          </div>

          <div className="relative">
            <span className="inline-flex items-center gap-3 text-[11px] font-bold tracking-[2px] uppercase text-gold-light mb-4">
              <span className="w-6 h-px bg-gold-light" />
              Servizio premium
              <span className="w-6 h-px bg-gold-light" />
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-[40px] font-semibold text-gold-light mb-4">
              Distribuzione tracciata e verificata
            </h2>
            <p className="max-w-2xl mx-auto text-stone-400 mb-10">
              Oltre alla distribuzione classica, La Piramide offre un servizio avanzato di tracciamento per chi desidera il massimo controllo sul lavoro svolto.
            </p>

            <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-8">
              <div className="glow-card bg-white/5 border border-gold/20 rounded-2xl p-6 text-left reveal">
                <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center mb-4">
                  <MapPin className="w-5 h-5 text-gold" />
                </div>
                <h3 className="font-serif text-lg text-gold-light mb-2">Foto geolocalizzate</h3>
                <p className="text-sm text-stone-400 leading-relaxed">
                  Possibilità di ricevere foto con posizione reale della distribuzione.
                </p>
              </div>
              <div className="glow-card bg-white/5 border border-gold/20 rounded-2xl p-6 text-left reveal">
                <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center mb-4">
                  <Clock className="w-5 h-5 text-gold" />
                </div>
                <h3 className="font-serif text-lg text-gold-light mb-2">Data e ora</h3>
                <p className="text-sm text-stone-400 leading-relaxed">
                  Ogni prova può mostrare quando e dove è stata effettuata l'attività.
                </p>
              </div>
              <div className="glow-card bg-white/5 border border-gold/20 rounded-2xl p-6 text-left reveal">
                <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center mb-4">
                  <BadgeCheck className="w-5 h-5 text-gold" />
                </div>
                <h3 className="font-serif text-lg text-gold-light mb-2">Controllo qualità</h3>
                <p className="text-sm text-stone-400 leading-relaxed">
                  Un livello extra di trasparenza per clienti che vogliono più sicurezza.
                </p>
              </div>
            </div>

            <p className="text-sm text-stone-500 mb-6">
              Il servizio di distribuzione tracciata è disponibile su richiesta e viene valutato in fase di preventivo.
            </p>
            <button
              onClick={() => onOpenQuote("volantinaggio")}
              className="shimmer-border inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold uppercase tracking-wide bg-gradient-to-br from-gold-light via-gold to-gold-dark text-dark shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition"
            >
              Richiedi distribuzione tracciata
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
