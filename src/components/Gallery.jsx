import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Camera } from "lucide-react";
import { galleryItems } from "../data/data";

const filters = ["All", "Marathons", "Medals", "Coaching"];

export default function Gallery() {
  const [active, setActive] = useState("All");
  const scrollerRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const filtered =
    active === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === active);

  const updateArrows = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  };

  const scrollBy = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({
      left: dir * Math.min(el.clientWidth * 0.85, 720),
      behavior: "smooth",
    });
  };

  const handleFilter = (f) => {
    setActive(f);
    scrollerRef.current?.scrollTo({ left: 0, behavior: "smooth" });
  };

  return (
    <section id="gallery" className="relative py-24 lg:py-32 bg-bg-alt overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-accent text-sm font-semibold tracking-widest uppercase">
              Photo Gallery
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-ink mt-3">
              Moments of <span className="text-gradient">Glory</span>
            </h2>
            <p className="text-ink-soft mt-3 max-w-xl">
              Races, medals and training days — scroll sideways to explore the
              archive. New photos are added every season.
            </p>
          </motion.div>

          {/* Scroll arrows + count */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex items-center gap-3"
          >
            <span className="chip inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium text-ink-soft">
              <Camera className="w-4 h-4 text-accent" />
              {filtered.length} photos
            </span>
            <button
              onClick={() => scrollBy(-1)}
              disabled={!canPrev}
              aria-label="Scroll gallery left"
              className="w-11 h-11 rounded-full border border-edge-strong flex items-center justify-center text-ink transition-all duration-300 hover:border-accent hover:text-accent disabled:opacity-35 disabled:hover:border-edge-strong disabled:hover:text-ink"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollBy(1)}
              disabled={!canNext}
              aria-label="Scroll gallery right"
              className="w-11 h-11 rounded-full border border-edge-strong flex items-center justify-center text-ink transition-all duration-300 hover:border-accent hover:text-accent disabled:opacity-35 disabled:hover:border-edge-strong disabled:hover:text-ink"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => handleFilter(f)}
              className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-colors duration-300 ${
                active === f ? "text-on-accent" : "text-ink-soft hover:text-ink"
              }`}
            >
              {active === f && (
                <motion.span
                  layoutId="gallery-filter-pill"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-accent to-accent-gold"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative z-10">{f}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Horizontal side-scroller */}
      <div
        ref={scrollerRef}
        onScroll={updateArrows}
        className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-6 px-4 sm:px-6 lg:px-[max(1.5rem,calc((100vw-80rem)/2))] scrollbar-hide"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((item, i) => (
            <motion.article
              key={item.id}
              layout
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{
                duration: 0.45,
                delay: Math.min(i * 0.05, 0.35),
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative snap-start shrink-0 w-[80vw] sm:w-[400px] lg:w-[440px] aspect-[4/3] rounded-3xl overflow-hidden border border-edge bg-card"
            >
              <img
                src={item.image}
                alt={item.alt}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.07]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

              <span className="chip absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase text-accent">
                {item.category}
              </span>
              <span className="absolute top-4 right-4 font-heading text-sm font-bold text-white/70">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="absolute bottom-0 inset-x-0 p-5">
                <p className="text-white font-heading font-semibold text-lg leading-snug">
                  {item.title}
                </p>
                <div className="h-0.5 w-10 mt-2 rounded-full bg-gradient-to-r from-accent to-accent-gold transition-all duration-500 group-hover:w-24" />
              </div>
            </motion.article>
          ))}
        </AnimatePresence>

        {/* End cap */}
        <div className="snap-start shrink-0 w-[70vw] sm:w-[300px] aspect-[4/3] rounded-3xl border border-dashed border-edge flex flex-col items-center justify-center gap-3 text-center px-6">
          <Camera className="w-8 h-8 text-accent" />
          <p className="text-ink-soft text-sm leading-relaxed">
            More memories coming soon — drag, swipe or use the arrows to keep
            exploring.
          </p>
        </div>
      </div>
    </section>
  );
}