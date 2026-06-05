import Hero from "./sections/Hero";
import About from "./sections/About";
import Services from "./sections/Services";
import Stats from "./sections/Stats";
import Works from "./sections/Works";
import Gallery from "./sections/Gallery";
import Reviews from "./sections/Reviews";
import Trust from "./sections/Trust";
import FAQ from "./sections/FAQ";
import CTA from "./sections/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Stats />
      <Works />
      <Gallery />
      <Reviews />
      <Trust />
      <FAQ />
      <CTA />
    </>
  );
}
