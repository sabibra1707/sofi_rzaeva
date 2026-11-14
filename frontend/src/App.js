import { useEffect } from "react";
import Lenis from "lenis";
import "@/App.css";
import { Toaster } from "./components/ui/sonner";
import { Header } from "./components/site/Header";
import { Hero } from "./components/site/Hero";
import { Marquee } from "./components/site/Marquee";
import { AboutSofi } from "./components/site/AboutSofi";
import { Approach } from "./components/site/Approach";
import { Coaching } from "./components/site/Coaching";
import { ClientResults } from "./components/site/ClientResults";
import { Reviews } from "./components/site/Reviews";
import { Process } from "./components/site/Process";
import { Contact } from "./components/site/Contact";
import { Footer } from "./components/site/Footer";
import { MobileCta } from "./components/site/MobileCta";
import { QuoteMarquee } from "./components/site/QuoteMarquee";
import { Faq } from "./components/site/Faq";

const useLenis = () => {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    window.__lenis = lenis;
    let id;
    const raf = (t) => { lenis.raf(t); id = requestAnimationFrame(raf); };
    id = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(id); lenis.destroy(); window.__lenis = null; };
  }, []);
};

function App() {
  useLenis();
  return (
    <div className="App grain">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:bg-neon focus:text-ink focus:px-4 focus:py-2 focus:rounded-full">Перейти к содержимому</a>
      <Header />
      <main id="main">
        <Hero />
        <Marquee />
        <AboutSofi />
        <Approach />
        <Coaching />
        <ClientResults />
        <QuoteMarquee />
        <Reviews />
        <Process />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <MobileCta />
      <Toaster theme="dark" position="bottom-center" />
    </div>
  );
}

export default App;
