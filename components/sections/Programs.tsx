"use client";

import { motion } from "framer-motion";
import { Dumbbell, Flame, Activity } from "lucide-react";

const programs = [
  { 
    title: "Strength & Hypertrophy", 
    icon: <Dumbbell size={32} strokeWidth={1.5} />, 
    desc: "Build raw power and muscle density with elite equipment and focused, progressive overload protocols." 
  },
  { 
    title: "Endurance & Conditioning", 
    icon: <Activity size={32} strokeWidth={1.5} />, 
    desc: "Push your cardiovascular limits, increase your VO2 max, and build the engine to outlast the competition." 
  },
  { 
    title: "High-Intensity Shred", 
    icon: <Flame size={32} strokeWidth={1.5} />, 
    desc: "Metabolic conditioning engineered for maximal fat loss, definition, and explosive athletic movement." 
  }
];

export default function Programs() {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <section className="py-32 px-6 max-w-7xl mx-auto w-full">
      {/* Section Header */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUp}
        className="mb-20 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Master your discipline.</h2>
        <p className="text-neutral-400 text-lg max-w-2xl mx-auto font-light">
          We don't do generic workouts. Select a pathway designed for definitive, measurable results.
        </p>
      </motion.div>

      {/* Interactive Cards Grid */}
      <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
        {programs.map((program, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -8 }}
            className="group relative p-8 rounded-[2rem] bg-surface border border-white/5 backdrop-blur-md transition-all duration-500 hover:bg-surface-hover hover:border-accent/30 cursor-pointer overflow-hidden"
          >
            {/* Subtle background glow on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/0 group-hover:from-accent/5 group-hover:to-transparent transition-colors duration-500" />
            
            <div className="relative z-10">
              <div className="text-neutral-400 group-hover:text-accent transition-colors duration-500 mb-8">
                {program.icon}
              </div>
              <h3 className="text-2xl font-semibold mb-3 tracking-tight">{program.title}</h3>
              <p className="text-neutral-400 leading-relaxed font-light text-sm md:text-base">
                {program.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}