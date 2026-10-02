import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { timeline } from "../data/data";
import {
  Footprints,
  GraduationCap,
  Flag,
  Globe,
  BookOpen,
  Dumbbell,
  Medal,
} from "lucide-react";

const icons = [Footprints, Medal, Flag, Globe, GraduationCap, Dumbbell, Medal];

export default function About() {
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 78%", "end 45%"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <section id="about" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Subtle section divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-accent/40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm font-semibold tracking-widest uppercase">
            My Journey
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-ink mt-3 text-balance">
            From School Tracks to <span className="text-gradient">Global Marathons</span>
          </h2>
          <p className="text-ink-soft mt-4 max-w-2xl mx-auto">
            Every champion has a story. Here's how a passion for running became a
            mission to build the next generation of athletes.
          </p>
        </motion.div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative max-w-5xl mx-auto">
          {/* Base line */}
          <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-edge" />
          {/* Animated progress line */}
          <motion.div
            style={{ scaleY, originY: 0 }}
            className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-accent via-accent-gold to-transparent"
          />

          {timeline.map((milestone, i) => {
            const Icon = icons[i % icons.length];
            const isLeft = i % 2 === 0;

            return (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, y: 44 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className={`relative flex flex-col lg:flex-row items-start gap-6 lg:gap-0 mb-14 last:mb-0 ${
                  isLeft ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                {/* Node on timeline */}
                <div className="absolute left-6 lg:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-bg border-2 border-accent flex items-center justify-center z-10 shadow-[0_0_0_7px_rgba(249,115,22,0.08)]">
                  <Icon className="w-4 h-4 text-accent" />
                </div>

                {/* Milestone card with image */}
                <div
                  className={`ml-16 lg:ml-0 lg:w-[calc(50%-2.75rem)] ${
                    isLeft ? "lg:pr-2 lg:text-right" : "lg:pl-2"
                  }`}
                >
                  <div className="glass rounded-3xl overflow-hidden group transition-all duration-300 hover:-translate-y-1.5 hover:border-accent">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={milestone.image}
                        alt={milestone.alt}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.07]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      <span className="chip absolute top-4 left-4 px-3.5 py-1 rounded-full text-xs font-bold tracking-widest text-accent">
                        {milestone.year}
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="font-heading text-lg font-semibold text-ink mb-2 group-hover:text-accent transition-colors">
                        {milestone.title}
                      </h3>
                      <p className="text-ink-soft text-sm leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Coaching Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 glass rounded-3xl p-8 sm:p-12 max-w-4xl mx-auto text-center relative overflow-hidden"
        >
          <span
            className="absolute -top-8 left-1/2 -translate-x-1/2 font-heading text-[160px] leading-none font-bold pointer-events-none select-none"
            style={{ color: "var(--edge)" }}
            aria-hidden="true"
          >
            &rdquo;
          </span>
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-accent-gold flex items-center justify-center mx-auto mb-6 relative">
            <BookOpen className="w-7 h-7 text-white" />
          </div>
          <h3 className="font-heading text-2xl font-bold text-ink mb-4 relative">
            Coaching Philosophy
          </h3>
          <p className="text-ink-soft leading-relaxed max-w-2xl mx-auto relative">
            "Every runner has a unique rhythm. My job isn't to create copies of
            myself — it's to find your stride, sharpen your edge, and build the
            mental fortitude that carries you past the finish line. Whether
            you're a first-time jogger or an elite marathoner, the principles
            remain the same: consistency, resilience, and joy in the journey."
          </p>
        </motion.div>
      </div>
    </section>
  );
}