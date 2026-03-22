"use client";

import { motion } from "framer-motion";
import { Instagram, Twitter } from "lucide-react";

const trainers = [
  {
    name: "Marcus Vance",
    specialty: "Strength & Conditioning",
    // Using high-res Unsplash placeholders - replace with your actual trainer images
    image: "https://images.unsplash.com/photo-1567013127542-490d732e6b73?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Elena Rostova",
    specialty: "High-Intensity & Mobility",
    image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Julian Cross",
    specialty: "Hypertrophy & Biomechanics",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop",
  }
];

export default function Trainers() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section className="py-32 px-6 max-w-7xl mx-auto w-full">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Architects of form.</h2>
        <p className="text-neutral-400 text-lg max-w-2xl mx-auto font-light">
          Guided by elite specialists dedicated to your absolute transformation.
        </p>
      </div>

      <motion.div 
        className="grid md:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {trainers.map((trainer, i) => (
          <motion.div key={i} variants={itemVariants} className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-[2rem] aspect-[3/4] mb-6 bg-surface">
              {/* Premium Grayscale to Color Hover Effect */}
              <img 
                src={trainer.image} 
                alt={trainer.name}
                className="object-cover w-full h-full transition-all duration-700 ease-apple grayscale group-hover:grayscale-0 group-hover:scale-105"
              />
              {/* Subtle gradient overlay for text readability if we wanted text inside, but we'll keep it clean outside */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            
            <div className="flex justify-between items-start px-2">
              <div>
                <h3 className="text-2xl font-medium tracking-tight mb-1">{trainer.name}</h3>
                <p className="text-accent text-sm font-medium tracking-wide uppercase">{trainer.specialty}</p>
              </div>
              <div className="flex gap-3 text-neutral-500">
                <Instagram size={18} className="hover:text-white transition-colors" />
                <Twitter size={18} className="hover:text-white transition-colors" />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}   