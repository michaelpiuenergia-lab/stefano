import SectionHead from "../components/SectionHead";
import { Search, Target, Rocket, ShieldCheck } from "lucide-react";

const steps = [
  {
    num: "1",
    title: "Analisi",
    desc: "Capire attività, obiettivi, zona e clienti ideali prima di proporre qualsiasi soluzione.",
    icon: Search,
  },
  {
    num: "2",
    title: "Strategia",
    desc: "Costruire un messaggio chiaro e scegliere i canali più efficaci tra territorio e digitale.",
    icon: Target,
  },
  {
    num: "3",
    title: "Esecuzione",
    desc: "Gestire distribuzione, grafica e comunicazione con ordine, presenza e controllo operativo.",
    icon: Rocket,
  },
  {
    num: "4",
    title: "Fiducia",
    desc: "Mostrare il lavoro svolto con foto, video e controlli per dare sicurezza al cliente.",
    icon: ShieldCheck,
  },
];

export default function Method() {
  return (
    <section id="metodo" className="py-10 md:py-16 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-8 bg-gradient-to-b from-gold/60 to-transparent" />
      <div className="max-w-7xl mx-auto px-6">
        <SectionHead
          kicker="Metodo La Piramide"
          title="Una campagna efficace nasce prima della distribuzione."
          description="Studiamo pubblico, messaggio e zone più adatte prima di muoverci sul territorio. Così ogni azione ha una logica precisa."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((s) => (
            <article key={s.num} className="glow-card bg-surface border border-border rounded-2xl p-6 hover:-translate-y-1 hover:shadow-xl hover:border-gold/30 transition-all reveal relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold/60 via-gold to-gold/60 opacity-0 hover:opacity-100 transition-opacity" />
              <div className="flex items-center justify-between mb-4">
                <b className="block font-serif text-5xl text-gold/20 leading-none">{s.num}</b>
                <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center">
                  <s.icon className="w-5 h-5 text-gold" />
                </div>
              </div>
              <h3 className="font-serif text-xl font-semibold mb-2">{s.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{s.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
