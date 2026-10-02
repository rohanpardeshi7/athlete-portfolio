import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { testimonials } from "../data/data";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

function initials(name) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = () =>
    setCurrent((p) => (p + 1) % testimonials.length);
  const prev = () =>
    setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [paused]);

  const active = testimonials[current];

  return (
    <section
      className="relative py-24 lg:py-32 overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[420px] rounded-full blur-3xl opacity-[0.06] pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--accent-gold) 0%, transparent 70%)" }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <span className="text-accent text-sm font-semibold tracking-widest uppercase">
            Testimonials
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-ink mt-3">
            What <span className="text-gradient">Athletes Say</span>
          </h2>
        </motion.div>

        {/* Testimonial card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="glass rounded-3xl p-8 sm:p-12 relative"
        >
          <Quote
            className="w-10 h-10 text-accent/30 absolute top-8 right-8"
            aria-hidden="true"
          />

          <div className="min-h-[220px] sm:min-h-[190px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, x: 36 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -36 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-ink text-lg sm:text-xl leading-relaxed font-medium text-balance">
                  &ldquo;{active.text}&rdquo;
                </p>

                <div className="mt-8 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-accent-gold flex items-center justify-center text-on-accent font-heading font-bold text-sm shrink-0">
                    {initials(active.name)}
                  </div>
                  <div>
                    <p className="text-ink font-semibold">{active.name}</p>
                    <p className="text-ink-mute text-sm">{active.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-1 mt-6">
            {Array.from({ length: active.rating }).map((_, j) => (
              <Star
                key={j}
                className="w-4 h-4 text-accent-gold fill-accent-gold"
              />
            ))}
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-5 mt-8">
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="w-11 h-11 rounded-full border border-edge-strong flex items-center justify-center text-ink-soft hover:text-accent hover:border-accent transition-all duration-300"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                onClick={() => setCurrent(i)}
                aria-label={`Show testimonial from ${t.name}`}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === current ? "w-8 bg-gradient-to-r from-accent to-accent-gold" : "w-2 bg-edge-strong hover:bg-ink-mute"
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Next testimonial"
            className="w-11 h-11 rounded-full border border-edge-strong flex items-center justify-center text-ink-soft hover:text-accent hover:border-accent transition-all duration-300"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}