import SectionHead from "../components/SectionHead";
import { Store, UtensilsCrossed, Shirt, Car, Scissors, Dumbbell } from "lucide-react";

const targets = [
  { icon: Store, label: "Negozi al dettaglio" },
  { icon: UtensilsCrossed, label: "Ristoranti & Bar" },
  { icon: Shirt, label: "Boutique & Moda" },
  { icon: Car, label: "Officine & Autofficine" },
  { icon: Scissors, label: "Centri estetici & Parrucchieri" },
  { icon: Dumbbell, label: "Palestre & Centri sportivi" },
];

export default function WhoFor() {
  return (
    <section className="py-10 md:py-16 bg-surface border-y border-border">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHead
          kicker="A chi ci rivolgiamo"
          title="Se hai un'attività locale, siamo la scelta giusta"
          description="Lavoriamo con ogni tipo di realtà che vuole farsi conoscere nel proprio territorio. Dal piccolo negozio alla catena in espansione."
          center
        />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {targets.map((t, i) => (
            <div
              key={i}
              className="glow-card flex items-center gap-4 bg-background border border-border rounded-2xl p-5 hover:-translate-y-1 hover:shadow-lg hover:border-gold/30 transition-all reveal"
            >
              <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
                <t.icon className="w-5 h-5 text-gold" />
              </div>
              <span className="font-semibold text-sm md:text-base">{t.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
