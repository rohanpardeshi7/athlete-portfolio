import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Timer, Award, Users, Globe, ArrowRight, ChevronDown } from "lucide-react";
import { heroSlides } from "../data/data";

const stats = [
  { icon: Timer, value: 15, suffix: "+", label: "Years Running" },
  { icon: Award, value: 50, suffix: "+", label: "Medals Won" },
  { icon: Users, value: 500, suffix: "+", label: "Students Trained" },
  { icon: Globe, value: 10, suffix: "+", label: "International & National Marathons" },
];

const SLIDE_MS = 3000;

function CountUp({ end, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const duration = 2000;
          const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <div ref={ref} className="font-heading text-4xl sm:text-5xl font-bold text-ink">
      {count}
      <span className="text-accent">{suffix}</span>
    </div>
  );
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 34 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((p) => (p + 1) % heroSlides.length),
      SLIDE_MS
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image slider */}
      {heroSlides.map((slide, i) => (
        <div
          key={slide.image}
          className={`absolute inset-0 transition-opacity duration-[1200ms] ease-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={i !== index}
        >
          <img
            key={i === index ? `active-${index}` : slide.image}
            src={slide.image}
            alt={slide.alt}
            loading={i === 0 ? "eager" : "lazy"}
            className={`h-full w-full object-cover ${
              i === index ? "ken-burns" : "scale-[1.04]"
            }`}
          />
        </div>
      ))}

      {/* Readability veil + film grain */}
      <div className="absolute inset-0 hero-veil" />
      <div className="noise-overlay" />

      {/* Decorative glow orbs */}
      <div
        className="absolute top-24 right-[-6rem] w-96 h-96 rounded-full blur-3xl opacity-40 pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-24 left-[-4rem] w-72 h-72 rounded-full blur-3xl opacity-25 pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--accent-gold) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24 lg:pt-32 lg:pb-28">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-4xl"
        >
          {/* Badge */}
          <motion.div variants={item} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex w-full h-full rounded-full bg-accent opacity-75 animate-ping" />
              <span className="relative inline-flex w-2 h-2 rounded-full bg-accent" />
            </span>
            <span className="text-accent text-sm font-semibold tracking-wide">
              National Marathon Runner &amp; PE Coach
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.95] tracking-tight mb-6">
            <motion.span variants={item} className="block text-ink">
              Endurance.
            </motion.span>
            <motion.span variants={item} className="block text-ink">
              Discipline.
            </motion.span>
            <motion.span variants={item} className="block text-gradient">
              Victory.
            </motion.span>
          </h1>

          {/* Subtitle */}
          <motion.p
            variants={item}
            className="text-ink-soft text-lg sm:text-xl max-w-2xl leading-relaxed mb-10 text-balance"
          >
            National Marathon Runner &amp; Certified Physical Education Coach
            helping athletes break boundaries. From school tracks to
            international marathons — building champions, one stride at a time.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={item} className="flex flex-wrap gap-4 mb-16">
            <a
              href="#coaching"
              className="group px-8 py-4 bg-gradient-to-r from-accent to-accent-gold text-on-accent font-semibold rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-15px_var(--accent)] text-base inline-flex items-center gap-2"
            >
              Explore Programs
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#achievements"
              className="px-8 py-4 border border-edge-strong text-ink font-semibold rounded-xl hover:bg-card hover:border-accent transition-all duration-300 text-base"
            >
              View Medals
            </a>
          </motion.div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="glass rounded-2xl p-5 sm:p-6 group transition-all duration-300 hover:-translate-y-1 hover:border-accent"
            >
              <stat.icon className="w-6 h-6 text-accent mb-3 transition-transform duration-300 group-hover:scale-110" />
              <CountUp end={stat.value} suffix={stat.suffix} />
              <p className="text-ink-mute text-sm mt-1 leading-snug">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Slider indicators */}
      <div className="absolute bottom-10 lg:bottom-12 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2.5">
        {heroSlides.map((slide, i) => (
          <button
            key={slide.image}
            onClick={() => setIndex(i)}
            aria-label={`Show slide ${i + 1}`}
            className="relative h-1.5 rounded-full overflow-hidden transition-all duration-500"
            style={{
              width: i === index ? 46 : 14,
              background: "var(--edge-strong)",
            }}
          >
            {i === index && (
              <span
                key={`progress-${index}`}
                className="slide-progress absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-accent to-accent-gold"
              />
            )}
          </button>
        ))}
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-9 right-6 lg:right-10 z-10 hidden sm:flex flex-col items-center gap-1.5 text-ink-mute hover:text-accent transition-colors"
        aria-label="Scroll to about section"
      >
        <span className="text-[11px] font-semibold tracking-[0.25em] uppercase">Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </motion.a>
    </section>
  );
}