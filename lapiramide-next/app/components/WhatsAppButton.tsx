"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/393457340981?text=Salve,%20vorrei%20informazioni%20su%20La%20Piramide"
      aria-label="Contatta La Piramide su WhatsApp"
      className="fixed right-5 bottom-5 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-gold-light via-gold to-gold-dark text-dark flex items-center justify-center shadow-lg hover:scale-105 transition"
    >
      <MessageCircle size={26} strokeWidth={2.5} />
    </a>
  );
}
