"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation"; // <-- The missing piece!

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
    popular: true,
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
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleCheckout = async (planName: string, monthlyPrice: number, yearlyPrice: number) => {
    setIsLoading(planName);
    try {
      // 1. Load the Razorpay script dynamically
      const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        setIsLoading(null);
        return;
      }

      const price = isYearly ? yearlyPrice : monthlyPrice;
      
      // 2. Create the Order on our backend
      const orderResponse = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planName, price }),
      });

      const orderData = await orderResponse.json();

      if (orderData.error) {
        router.push("/auth");
        return;
      }

      // 3. Open the Razorpay Checkout Modal
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "AURA Fitness",
        description: `${planName} Membership`,
        order_id: orderData.id,
       // Inside the 'options' object in handleCheckout:
handler: async function (response: any) {
  // 1. Send the payment details to our backend for verification
  const verifyRes = await fetch("/api/checkout/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      razorpay_order_id: response.razorpay_order_id,
      razorpay_payment_id: response.razorpay_payment_id,
      razorpay_signature: response.razorpay_signature,
      planName: planName // Pass the plan name to upgrade the user correctly
    }),
  });

  const verifyData = await verifyRes.json();

  if (verifyRes.ok) {
    // 2. Redirect to dashboard with a success message
    router.push("/dashboard?status=success");
  } else {
    alert("Payment verification failed. Please contact support.");
  }
},
        theme: {
          color: "#00F0FF", // Matches our Neon Blue accent color!
        },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();

    } catch (error) {
      console.error("Checkout failed", error);
    } finally {
      setIsLoading(null);
    }
  };

  // Helper function to load the Razorpay script
  const loadScript = (src: string) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section className="py-32 px-6 max-w-7xl mx-auto w-full" id="memberships">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">Invest in your potential.</h2>
        
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
              animate={{ x: isYearly ? 32 : 0 }}
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

            <button 
              onClick={() => handleCheckout(plan.name, plan.monthlyPrice, plan.yearlyPrice)}
              disabled={isLoading === plan.name}
              className={`w-full py-4 rounded-full font-medium transition-all duration-300 active:scale-95 disabled:opacity-50 ${
                plan.popular 
                  ? "bg-foreground text-background hover:bg-neutral-200" 
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {isLoading === plan.name ? "Processing..." : "Select Plan"}
            </button>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}