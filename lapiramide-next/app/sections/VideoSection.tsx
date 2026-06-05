import SectionHead from "../components/SectionHead";
import { Play } from "lucide-react";

export default function VideoSection() {
  return (
    <section className="py-10 md:py-16 bg-surface border-y border-border relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-gold/60 to-transparent" />
      <div className="max-w-7xl mx-auto px-6">
        <SectionHead
          kicker="Controlli"
          title="Trasparenza nella distribuzione"
          description="Verifichiamo il lavoro sul territorio con attenzione, per offrire un servizio ordinato, concreto e controllabile."
          center
        />
        <div className="max-w-4xl mx-auto reveal">
          <div className="relative bg-dark border-2 border-gold/20 rounded-3xl p-3 md:p-4 shadow-2xl shadow-gold/10 overflow-hidden group">
            {/* Angoli dorati */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold rounded-tl-3xl" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gold rounded-tr-3xl" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gold rounded-bl-3xl" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gold rounded-br-3xl" />

            <div className="relative rounded-2xl overflow-hidden">
              <video controls preload="metadata" className="w-full aspect-video block">
                <source src="/controlli1.mp4" type="video/mp4" />
                Il tuo browser non supporta la riproduzione del video.
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
