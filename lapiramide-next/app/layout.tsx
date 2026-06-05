import type { Metadata } from "next";
import { Jost, Bodoni_Moda } from "next/font/google";
import "./globals.css";
import ClientProviders from "./ClientProviders";

// Jost: sans geometrico elegante — testo (raccomandato da UI/UX Pro Max per brand luxury)
const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// Bodoni Moda: serif didone alto contrasto, alta moda editoriale — titoli cinematografici
const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "La Piramide | Marketing locale",
  description:
    "La Piramide aiuta aziende e negozi in Italia con volantinaggio mirato, grafica pubblicitaria e social media marketing.",
  keywords: [
    "volantinaggio Italia",
    "grafica pubblicitaria",
    "social media marketing",
    "pubblicità locale",
    "La Piramide",
  ],
  openGraph: {
    title: "La Piramide | Volantinaggio, grafica e social media marketing",
    description:
      "Campagne locali e digitali per aziende che vogliono più visibilità, fiducia e clienti reali.",
    type: "website",
    images: ["/img/logo-brand.png"],
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      className={`${jost.variable} ${bodoni.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
