"use client";

import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import QuoteModal from "./components/QuoteModal";
import { useScrollReveal } from "./hooks/useScrollReveal";
import { useMouseGlow } from "./hooks/useMouseGlow";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  const [quoteService, setQuoteService] = useState<string | null>(null);
  useScrollReveal();
  useMouseGlow();

  return (
    <>
      <Navbar onOpenQuote={setQuoteService} />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppButton />
      <QuoteModal service={quoteService} onClose={() => setQuoteService(null)} />
    </>
  );
}
