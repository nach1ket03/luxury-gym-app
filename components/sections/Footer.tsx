import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-background pt-20 pb-10 px-6 mt-20">
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-start gap-10 md:gap-0">
        
        {/* Brand */}
        <div>
          <h2 className="text-3xl font-bold tracking-tighter mb-4">AURA</h2>
          <p className="text-neutral-500 font-light text-sm max-w-xs">
            Redefining the standards of elite performance and human potential.
          </p>
        </div>

        {/* Links */}
        <div className="flex gap-16">
          <div className="flex flex-col gap-4">
            <span className="text-white font-medium mb-2">Explore</span>
            {["Facility", "Programs", "Memberships", "Trainers"].map((link) => (
              <a key={link} href="#" className="text-neutral-500 hover:text-white text-sm transition-colors flex items-center gap-1 group">
                {link} <ArrowUpRight size={12} className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-white font-medium mb-2">Legal</span>
            {["Privacy Policy", "Terms of Service", "Contact"].map((link) => (
              <a key={link} href="#" className="text-neutral-500 hover:text-white text-sm transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-center mt-20 pt-8 border-t border-white/5 text-xs text-neutral-600">
        <p>© {new Date().getFullYear()} AURA Fitness. All rights reserved.</p>
        <p className="mt-2 md:mt-0">Designed for Elite Performance.</p>
      </div>
    </footer>
  );
}