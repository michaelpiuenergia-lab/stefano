"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface QuoteModalProps {
  service: string | null;
  onClose: () => void;
}

const WHATSAPP_NUMBER = "393457340981";

export default function QuoteModal({ service, onClose }: QuoteModalProps) {
  const [haVolantino, setHaVolantino] = useState("");
  const [haSito, setHaSito] = useState("");

  if (!service) return null;

  const isSocial = service === "social";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    if (isSocial) {
      const msg = [
        "NUOVA RICHIESTA DAL SITO LA PIRAMIDE",
        "",
        "PUBBLICITÀ SOCIAL",
        "",
        "DATI CLIENTE",
        `Nome: ${fd.get("socialNome")}`,
        `Attività: ${fd.get("socialAttivita")}`,
        `Telefono: ${fd.get("socialTelefono")}`,
        "",
        "DETTAGLI SOCIAL",
        `Pagine da gestire: ${fd.get("socialPagine")}`,
        `Numero pagine/profili: ${fd.get("socialNumeroPagine")}`,
        `Pagine già create: ${fd.get("socialPagineCreate")}`,
        `Contenuti richiesti: ${fd.get("socialContenuti")}`,
        `Pubblicazioni a settimana: ${fd.get("socialFrequenza")}`,
        `Obiettivo principale: ${fd.get("socialObiettivo")}`,
        `Foto/video già pronti: ${fd.get("socialMaterialiPronti")}`,
        `Note: ${fd.get("socialNote")}`,
      ].join("\n");
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
      return;
    }

    const nome = fd.get("nome");
    const attivita = fd.get("attivita");
    const telefono = fd.get("telefono");
    const pezzi = fd.get("pezzi");
    const zone = fd.get("zone");
    const volantino = fd.get("haVolantino");
    const tipoAttivita = fd.get("tipoAttivita");
    const messaggioVolantino = fd.get("messaggioVolantino");
    const puntiForti = fd.get("puntiForti");
    const sito = fd.get("haSito");
    const tipoSito = fd.get("tipoSito");
    const funzioniSito = fd.get("funzioniSito");

    let message = `NUOVA RICHIESTA DAL SITO LA PIRAMIDE\n\nDATI CLIENTE\nNome: ${nome}\nAttività: ${attivita}\nTelefono: ${telefono}\n\nDISTRIBUZIONE VOLANTINI\nNumero volantini: ${pezzi}\nZone richieste: ${zone}\nHa già il volantino: ${volantino}\n\n`;

    if (volantino === "no") {
      message += `GRAFICA VOLANTINO\nTipo attività: ${tipoAttivita}\nCosa vuole comunicare: ${messaggioVolantino}\nPunti forti: ${puntiForti}\nHa già un sito web: ${sito}\n\n`;
    }
    if (sito === "no") {
      message += `SITO WEB\nTipo sito richiesto: ${tipoSito}\nFunzioni desiderate: ${funzioniSito}\n`;
    }

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-background border border-border rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 md:p-8 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted hover:text-foreground transition"
          aria-label="Chiudi"
        >
          <X size={28} />
        </button>

        <h2 className="font-serif text-2xl font-semibold mb-1">Richiedi il tuo preventivo gratuito</h2>
        <p className="text-muted text-sm mb-6">Compila i dettagli: riceveremo la richiesta direttamente su WhatsApp.</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isSocial && (
            <div>
              <h3 className="font-serif text-lg mb-3">Distribuzione volantini</h3>
              <div className="grid gap-3">
                <input name="nome" placeholder="Nome e cognome" className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-gold/40" />
                <input name="attivita" placeholder="Nome attività" className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-gold/40" />
                <input name="telefono" placeholder="Numero WhatsApp" className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-gold/40" />
                <input name="pezzi" type="number" placeholder="Quanti volantini vuoi distribuire?" className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-gold/40" />
                <textarea name="zone" placeholder="In quali zone vuoi distribuire?" className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 min-h-[80px] resize-y" />
                <label className="text-xs font-bold uppercase tracking-wider text-gold-dark mt-1">Hai già il volantino?</label>
                <select
                  name="haVolantino"
                  value={haVolantino}
                  onChange={(e) => setHaVolantino(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
                >
                  <option value="">Seleziona</option>
                  <option value="si">Sì, ho già il volantino</option>
                  <option value="no">No, mi serve anche la grafica</option>
                </select>
              </div>

              {haVolantino === "no" && (
                <div className="mt-5">
                  <h3 className="font-serif text-lg mb-3">Grafica volantino</h3>
                  <div className="grid gap-3">
                    <textarea name="tipoAttivita" placeholder="Che tipo di attività svolgi?" className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 min-h-[80px] resize-y" />
                    <textarea name="messaggioVolantino" placeholder="Cosa vuoi comunicare nel volantino?" className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 min-h-[80px] resize-y" />
                    <textarea name="puntiForti" placeholder="Quali sono i punti forti della tua attività?" className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 min-h-[80px] resize-y" />
                    <label className="text-xs font-bold uppercase tracking-wider text-gold-dark mt-1">Hai già un sito web?</label>
                    <select
                      name="haSito"
                      value={haSito}
                      onChange={(e) => setHaSito(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
                    >
                      <option value="">Seleziona</option>
                      <option value="si">Sì, ho già un sito</option>
                      <option value="no">No, vorrei valutare anche un sito web</option>
                    </select>
                  </div>
                </div>
              )}

              {haSito === "no" && (
                <div className="mt-5">
                  <h3 className="font-serif text-lg mb-3">Sito web</h3>
                  <div className="grid gap-3">
                    <textarea name="tipoSito" placeholder="Che tipo di sito vorresti? Esempio: vetrina, ristorante, aziendale, prenotazioni..." className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 min-h-[80px] resize-y" />
                    <textarea name="funzioniSito" placeholder="Che funzioni ti servono? WhatsApp, galleria, menu, form contatti, prenotazioni..." className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 min-h-[80px] resize-y" />
                  </div>
                </div>
              )}
            </div>
          )}

          {isSocial && (
            <div>
              <h3 className="font-serif text-lg mb-3">Pubblicità Social</h3>
              <div className="grid gap-3">
                <input name="socialNome" placeholder="Nome e cognome" className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-gold/40" />
                <input name="socialAttivita" placeholder="Nome attività" className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-gold/40" />
                <input name="socialTelefono" placeholder="Numero WhatsApp" className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-gold/40" />
                <textarea name="socialPagine" placeholder="Che pagine vuoi gestire? Facebook, Instagram, TikTok, Google Business, altro" className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 min-h-[80px] resize-y" />
                <input name="socialNumeroPagine" type="number" placeholder="Quante pagine/profili sono?" className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-gold/40" />
                <label className="text-xs font-bold uppercase tracking-wider text-gold-dark mt-1">Hai già le pagine create?</label>
                <select name="socialPagineCreate" className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-gold/40">
                  <option value="">Seleziona</option>
                  <option value="si">Sì</option>
                  <option value="no">No</option>
                </select>
                <textarea name="socialContenuti" placeholder="Che tipo di contenuti ti servono? Post, storie, reel, video, foto, campagne sponsorizzate" className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 min-h-[80px] resize-y" />
                <input name="socialFrequenza" placeholder="Quante volte vorresti pubblicare a settimana?" className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-gold/40" />
                <textarea name="socialObiettivo" placeholder="Qual è il tuo obiettivo principale? Più clienti, più visibilità, promozioni, gestione immagine, altro" className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 min-h-[80px] resize-y" />
                <label className="text-xs font-bold uppercase tracking-wider text-gold-dark mt-1">Hai foto/video già pronti?</label>
                <select name="socialMaterialiPronti" className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-gold/40">
                  <option value="">Seleziona</option>
                  <option value="si">Sì</option>
                  <option value="no">No</option>
                </select>
                <textarea name="socialNote" placeholder="Note o richieste particolari" className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 min-h-[80px] resize-y" />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full mt-2 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold uppercase tracking-wide bg-gradient-to-br from-gold-light via-gold to-gold-dark text-dark shadow-md hover:shadow-lg hover:-translate-y-0.5 transition"
          >
            Invia richiesta su WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
}
