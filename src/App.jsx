import { motion, useScroll, useSpring } from "framer-motion";
import { Star } from "lucide-react";
import { ThemeProvider } from "./theme/ThemeContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Achievements from "./components/Achievements";
import Coching from "./components/Coching";
import Gallery from "./components/Gallery";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 130,
    damping: 28,
    restDelta: 0.001,
  });
  return (
    <motion.div
      style={{ scaleX, originX: 0 }}
      className="fixed top-0 left-0 right-0 h-[3px] z-[60] bg-gradient-to-r from-accent via-accent-gold to-accent"
      aria-hidden="true"
    />
  );
}

const marqueeItems = [
  "Endurance",
  "Discipline",
  "Victory",
  "50+ Medals",
  // "500+ Students Trained",
  "National Records",
  "Sauth Africa · Mumbai · Delhi",
];

function MarqueeRow({ hidden = false }) {
  return (
    <div className="flex items-center gap-10 pr-10" aria-hidden={hidden}>
      {marqueeItems.map((text, i) => (
        <span key={text} className="flex items-center gap-10">
          <span
            className={`font-heading text-2xl lg:text-3xl font-bold tracking-tight whitespace-nowrap ${
              i % 3 === 1 ? "text-gradient" : "text-ink-mute"
            }`}
          >
            {text}
          </span>
          <Star className="w-4 h-4 text-accent shrink-0" fill="currentColor" />
        </span>
      ))}
    </div>
  );
}

function Marquee() {
  return (
    <div className="relative bg-bg-alt border-y border-edge py-5 overflow-hidden select-none">
      <div className="marquee-track flex w-max">
        <MarqueeRow />
        <MarqueeRow hidden />
      </div>
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32"
        style={{ background: "linear-gradient(to right, var(--bg-alt), transparent)" }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32"
        style={{ background: "linear-gradient(to left, var(--bg-alt), transparent)" }}
      />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-bg text-ink font-body">
        <ScrollProgress />
        <Navbar />
        <main>
          <Hero />
          <Marquee />
          <About />
          <Achievements />
          <Coching />
          <Gallery />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </ThemeProvider>
  );
}

export default App;