import { motion } from "framer-motion";
import { achievements } from "../data/data";
import { Trophy, Medal } from "lucide-react";

const medalColors = {
  gold: {
    bg: "from-yellow-400 to-amber-500",
    label: "Gold",
  },
  silver: {
    bg: "from-gray-200 to-gray-400",
    label: "Silver",
  },
  bronze: {
    bg: "from-amber-600 to-orange-700",
    label: "Bronze",
  },
};

export default function Achievements() {
  return (
    <section id="achievements" className="relative py-24 lg:py-32 bg-bg-alt">
      {/* Decorative accent line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

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
            Wall of Fame
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-ink mt-3">
            Achievements &amp; <span className="text-gradient">Records</span>
          </h2>
          <p className="text-ink-soft mt-4 max-w-2xl mx-auto">
            A legacy built on sweat, grit, and countless early morning miles.
          </p>
        </motion.div>

        {/* Achievement Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {achievements.map((item, i) => {
            const medal = medalColors[item.medal];
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.55,
                  delay: (i % 4) * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="glass shine rounded-2xl p-6 group transition-all duration-300 hover:-translate-y-1.5 hover:border-accent flex flex-col"
              >
                {/* Medal badge */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r ${medal.bg} text-[#1c1917] text-xs font-bold`}
                  >
                    <Medal className="w-3 h-3" />
                    {medal.label}
                  </span>
                  <span className="text-ink-mute text-xs font-medium">
                    {item.year}
                  </span>
                </div>

                {/* Event */}
                <h3 className="font-heading text-base font-bold text-ink mb-1 group-hover:text-accent transition-colors">
                  {item.event}
                </h3>
                <p className="text-ink-mute text-xs mb-3">{item.category}</p>

                {/* Timing */}
                <div className="flex items-center gap-2 mb-3">
                  <Trophy className="w-4 h-4 text-accent" />
                  <span className="font-heading text-xl font-bold text-ink">
                    {item.timing}
                  </span>
                </div>

                {/* Placement */}
                <p className="text-ink-soft text-sm mt-auto">{item.placement}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}