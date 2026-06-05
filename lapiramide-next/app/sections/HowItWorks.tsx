import SectionHead from "../components/SectionHead";
import { Phone, FileSearch, Truck, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: Phone,
    title: "Contatto",
    desc: "Ci racconti la tua attività, i tuoi obiettivi e il tuo budget. In 10 minuti capiamo se possiamo aiutarti e come.",
  },
  {
    icon: FileSearch,
    title: "Analisi & Strategia",
    desc: "Studiamo il tuo territorio, il tuo pubblico e la concorrenza. Ti presentiamo un piano d'azione personalizzato con tempi e costi.",
  },
  {
    icon: Truck,
    title: "Esecuzione",
    desc: "Progettiamo la grafica, stampiamo i materiali e distribuiamo nei giorni e nelle zone concordate. Tutto controllato e documentato.",
  },
  {
    icon: TrendingUp,
    title: "Risultati",
    desc: "Ricevi il report finale con foto, dati e consigli per la prossima campagna. Il nostro obiettivo è farvi crescere insieme.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHead
          kicker="Come funziona"
          title="Da zero a risultati in 4 passaggi"
          description="Un processo collaudato che parte dall'ascolto e arriva a clienti reali. Nessuna sorpresa, solo trasparenza."
          center
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((s, i) => (
            <div
              key={i}
              className="glow-card relative bg-surface border border-border rounded-2xl p-6 hover:-translate-y-1 hover:shadow-xl hover:border-gold/30 transition-all reveal"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold/60 via-gold to-gold/60 rounded-t-2xl opacity-0 hover:opacity-100 transition-opacity" />
              <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center mb-4">
                <s.icon className="w-5 h-5 text-gold" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-2">{s.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
