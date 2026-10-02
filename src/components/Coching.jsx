import { motion } from "framer-motion";
import { programs } from "../data/data";
import { Check, ArrowRight } from "lucide-react";

export default function Coching() {
  return (
    <section id="coaching" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Ambient glow behind popular plan */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[560px] h-[560px] rounded-full blur-3xl opacity-[0.07] pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm font-semibold tracking-widest uppercase">
            Training Programs
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-ink mt-3">
            Choose Your <span className="text-gradient">Path</span>
          </h2>
          <p className="text-ink-soft mt-4 max-w-2xl mx-auto">
            Structured coaching programs designed for every level — from
            first-time joggers to competitive marathoners.
          </p>
        </motion.div>

        {/* Program Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {programs.map((program, i) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`glass rounded-3xl p-8 relative overflow-hidden group transition-all duration-300 hover:-translate-y-2 ${
                i === 1
                  ? "border-accent md:-translate-y-4 md:hover:-translate-y-6 shadow-[0_30px_80px_-30px_var(--accent)]"
                  : "hover:border-accent"
              }`}
            >
              {/* Popular badge */}
              {i === 1 && (
                <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-accent to-accent-gold text-on-accent text-xs font-bold rounded-full">
                  Popular
                </div>
              )}

              {/* Gradient top bar */}
              <div
                className={`w-full h-1 rounded-full bg-gradient-to-r ${program.color} mb-6`}
              />

              {/* Title */}
              <h3 className="font-heading text-xl font-bold text-ink mb-1 pr-16">
                {program.title}
              </h3>
              <p className="text-ink-mute text-sm mb-4">{program.subtitle}</p>

              {/* Price */}
              <div className="flex items-baseline gap-1 mb-6">
                <span className="font-heading text-3xl font-bold text-ink">
                  {program.price}
                </span>
                <span className="text-ink-mute text-sm">{program.period}</span>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {program.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-ink-soft text-sm"
                  >
                    <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#contact"
                className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 group/cta ${
                  i === 1
                    ? "bg-gradient-to-r from-accent to-accent-gold text-on-accent hover:shadow-[0_16px_40px_-12px_var(--accent)]"
                    : "border border-edge-strong text-ink hover:bg-card hover:border-accent"
                }`}
              >
                Book a Session
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
