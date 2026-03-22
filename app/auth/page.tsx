"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation"; // <-- Add this too

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(false); // Default to Register for new users
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    if (!isLogin) {
      // Handle Registration
      try {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Something went wrong.");
        } else {
      // NEW: Handle Login with NextAuth
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError(res.error);
      } else {
        setSuccess("Authentication successful. Entering portal...");
        // Redirect to the member dashboard after a brief delay for a smooth UX
        setTimeout(() => router.push("/dashboard"), 1500); 
      }
    }

    setIsLoading(false);
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden px-6">
      {/* Background Cinematic Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Back to Home Link */}
      <Link href="/" className="absolute top-8 left-8 text-neutral-500 hover:text-white transition-colors flex items-center gap-2 text-sm">
        <ArrowLeft size={16} /> Return
      </Link>

      <div className="w-full max-w-md relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="bg-surface border border-white/10 rounded-[2rem] p-10 backdrop-blur-xl shadow-2xl"
        >
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              {isLogin ? "Welcome back." : "Define your legacy."}
            </h1>
            <p className="text-neutral-400 text-sm font-light">
              {isLogin ? "Enter your credentials to access your portal." : "Create your elite profile to begin."}
            </p>
          </div>

          {/* Status Messages */}
          <AnimatePresence mode="wait">
            {error && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mb-6 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg text-center">
                {error}
              </motion.div>
            )}
            {success && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mb-6 p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm rounded-lg text-center">
                {success}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  key="name-input"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <label className="block text-xs font-medium text-neutral-400 uppercase tracking-wider mb-2">Full Name</label>
                  <input 
                    type="text" 
                    required={!isLogin}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors"
                    placeholder="Marcus Vance"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label className="block text-xs font-medium text-neutral-400 uppercase tracking-wider mb-2">Email Address</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors"
                placeholder="marcus@example.com"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-400 uppercase tracking-wider mb-2">Password</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors"
                placeholder="••••••••"
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full group relative flex items-center justify-center gap-2 px-8 py-4 mt-8 bg-foreground text-background font-medium rounded-xl overflow-hidden transition-all hover:bg-neutral-200 active:scale-95 disabled:opacity-70 disabled:active:scale-100"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <>
                  {isLogin ? "Sign In" : "Create Profile"}
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Toggle State */}
          <div className="mt-8 text-center">
            <button 
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
                setSuccess("");
              }}
              type="button"
              className="text-sm text-neutral-500 hover:text-white transition-colors"
            >
              {isLogin ? "Don't have an elite profile? " : "Already a member? "}
              <span className="text-accent underline underline-offset-4">
                {isLogin ? "Apply here." : "Sign in."}
              </span>
            </button>
          </div>
        </motion.div>
      </div>
    </main>
  );
}