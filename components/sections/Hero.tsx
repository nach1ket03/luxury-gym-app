"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  // Apple-style smooth, staggered animation sequence
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 1.2, 
        ease: [0.16, 1, 0.3, 1] // The custom Apple ease we defined
      } 
    },
  };

  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-background text-foreground">
      
      {/* Cinematic Ambient Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/15 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <span className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-medium tracking-[0.2em] uppercase text-neutral-300 backdrop-blur-md">
            The New Standard
          </span>
        </motion.div>

        <motion.h1 
          variants={itemVariants}
          className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-8 leading-[0.85]"
        >
          Define your <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-600">
            legacy.
          </span>
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="text-lg md:text-2xl text-neutral-400 mb-12 font-light max-w-2xl mx-auto leading-relaxed"
        >
          More than a facility. An ecosystem engineered for elite performance, 
          unwavering focus, and absolute transformation.
        </motion.p>
        
        <motion.div variants={itemVariants}>
          <button className="group relative flex items-center gap-2 px-8 py-4 bg-foreground text-background font-medium rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95">
            Start Your Journey 
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}