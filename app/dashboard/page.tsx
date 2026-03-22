"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { LogOut, Crown, Activity, Settings, CreditCard } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect unauthenticated users back to the auth portal
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth");
    }
  }, [status, router]);

  // Show a cinematic loading state while checking the session
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-t-2 border-accent border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  // If authenticated, we have the session data
  if (status === "authenticated") {
    // Extract custom properties we added to the session in Step 9
    const userTier = (session.user as any)?.membershipTier || "None";
    const isElite = userTier === "Elite";

    return (
      <main className="min-h-screen bg-background text-foreground pb-20">
        
        {/* Navigation Bar */}
        <nav className="w-full border-b border-white/5 bg-background/50 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold tracking-tighter">AURA</Link>
            <button 
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text-neutral-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium"
            >
              Sign Out <LogOut size={16} />
            </button>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-6 mt-16 grid lg:grid-cols-12 gap-10">
          
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-4xl font-bold tracking-tight mb-2">
                Welcome back, {session.user?.name?.split(" ")[0]}.
              </h1>
              <p className="text-neutral-400 font-light text-lg">
                Your performance dashboard and membership details.
              </p>
            </motion.div>

            {/* Quick Stats / Modules */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="grid sm:grid-cols-2 gap-6"
            >
              <div className="p-6 rounded-3xl bg-surface border border-white/5 backdrop-blur-md hover:border-white/10 transition-colors cursor-pointer group">
                <Activity className="text-neutral-400 group-hover:text-accent transition-colors mb-4" size={24} />
                <h3 className="text-lg font-medium mb-1">Training Log</h3>
                <p className="text-sm text-neutral-500 font-light">Track your active programs and progressive overload.</p>
              </div>
              <div className="p-6 rounded-3xl bg-surface border border-white/5 backdrop-blur-md hover:border-white/10 transition-colors cursor-pointer group">
                <Settings className="text-neutral-400 group-hover:text-accent transition-colors mb-4" size={24} />
                <h3 className="text-lg font-medium mb-1">Profile Settings</h3>
                <p className="text-sm text-neutral-500 font-light">Manage your personal details and security.</p>
              </div>
            </motion.div>
          </div>

          {/* Sidebar Area (Membership Card) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4"
          >
            <div className={`p-8 rounded-[2rem] backdrop-blur-md border ${
              isElite 
                ? "bg-white/5 border-accent/40 shadow-[0_0_40px_rgba(0,240,255,0.05)]" 
                : "bg-surface border-white/10"
            }`}>
              <div className="flex items-center gap-3 mb-6">
                {isElite ? (
                  <Crown className="text-accent" size={24} />
                ) : (
                  <CreditCard className="text-neutral-400" size={24} />
                )}
                <h2 className="text-xl font-medium tracking-tight">Active Status</h2>
              </div>
              
              <div className="mb-8">
                <p className="text-sm text-neutral-400 uppercase tracking-wider mb-1">Current Tier</p>
                <p className={`text-4xl font-bold tracking-tighter ${isElite ? "text-accent" : "text-white"}`}>
                  {userTier}
                </p>
              </div>

              {userTier === "None" ? (
                <Link href="/#memberships">
                  <button className="w-full py-4 bg-foreground text-background font-medium rounded-xl hover:bg-neutral-200 transition-colors active:scale-95">
                    View Memberships
                  </button>
                </Link>
              ) : (
                <button className="w-full py-4 bg-white/10 text-white font-medium rounded-xl hover:bg-white/20 transition-colors active:scale-95">
                  Manage Billing
                </button>
              )}
            </div>
          </motion.div>

        </div>
      </main>
    );
  }

  return null; // Fallback
}