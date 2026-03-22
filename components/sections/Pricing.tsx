"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Foundation",
    monthlyPrice: 149,
    yearlyPrice: 1490,
    features: ["Access to main gym floor", "Locker room access", "1 Group class per month"],
    popular: false,
  },
  {
    name: "Elite",
    monthlyPrice: 249,
    yearlyPrice: 2490,
    features: ["Unlimited 24/7 access", "Unlimited group classes", "Sauna & recovery zone", "1 PT session/month"],
    popular: true, // This plan gets the premium styling treatment
  },
  {
    name: "Pro",
    monthlyPrice: 189,
    yearlyPrice: 1890,
    features: ["Access to main gym floor", "Locker room access", "5 Group classes per month"],
    popular: false,
  },
];

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  // Staggered fade-up animation for the cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section className="py-32 px-6 max-w-7xl mx-auto w-full" id="memberships">
      
      {/* Header & Toggle */}
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">Invest in your potential.</h2>
        
        {/* Apple-style Interactive Toggle */}
        <div className="flex items-center justify-center gap-5">
          <span className={`text-sm font-medium transition-colors ${!isYearly ? "text-white" : "text-neutral-500"}`}>
            Monthly
          </span>
          
          <button 
            onClick={() => setIsYearly(!isYearly)}
            className="relative w-16 h-8 bg-surface-hover border border-white/10 rounded-full p-1 flex items-center cursor-pointer transition-colors"
            aria-label="Toggle yearly pricing"
          >
            <motion.div 
              className="w-6 h-6 bg-white rounded-full shadow-md"
              animate={{ x: isYearly ? 32 : 0 }} // 32px is the difference to slide across the 16rem button
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </button>
          
          <span className={`text-sm font-medium transition-colors flex items-center gap-2 ${isYearly ? "text-white" : "text-neutral-500"}`}>
            Yearly
            <span className="text-accent text-[10px] uppercase tracking-wider bg-accent/10 px-2 py-0.5 rounded-full border border-accent/20">
              Save 16%
            </span>
          </span>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <motion.div 
        className="grid md:grid-cols-3 gap-8 items-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {plans.map((plan) => (
          <motion.div
            key={plan.name}
            variants={itemVariants}
            className={`relative p-8 rounded-[2rem] backdrop-blur-md transition-all duration-300 ${
              plan.popular 
                ? "bg-white/5 border border-accent/40 shadow-[0_0_40px_rgba(0,240,255,0.1)] py-12 z-10 scale-105" 
                : "bg-surface border border-white/5 hover:border-white/10"
            }`}
          >
            {/* "Most Popular" Badge */}
            {plan.popular && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-black px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(0,240,255,0.4)]">
                Most Popular
              </div>
            )}
            
            <h3 className="text-2xl font-medium mb-2 tracking-tight">{plan.name}</h3>
            
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-5xl font-bold tracking-tighter">
                ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
              </span>
              <span className="text-neutral-500 font-light">/{isYearly ? 'yr' : 'mo'}</span>
            </div>

            <ul className="space-y-4 mb-10">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3 text-neutral-300">
                  <Check size={16} className="text-accent shrink-0" strokeWidth={3} />
                  <span className="text-sm font-light leading-tight">{feature}</span>
                </li>
              ))}
            </ul>

            <button className={`w-full py-4 rounded-full font-medium transition-all duration-300 active:scale-95 ${
              plan.popular 
                ? "bg-foreground text-background hover:bg-neutral-200" 
                : "bg-white/10 text-white hover:bg-white/20"
            }`}>
              Select Plan
            </button>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}