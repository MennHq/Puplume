"use client";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { useAuth } from "@clerk/react";
import { PupLumeLogo } from "@/components/common/PupLumeLogo";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export default function Home() {
  const { userId, isLoaded } = useAuth();
  const isLoggedIn = !!userId;

  return (
    <div className="flex flex-col min-h-screen bg-[#FFF9F2] text-[#2C211B] selection:bg-[#8B5E3C] selection:text-white overflow-x-hidden">
      {/* Navbar */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 z-50 w-full bg-[#FFF9F2]/90 backdrop-blur-lg border-b border-[#E8DDD3] transition-all"
      >
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center cursor-pointer transform hover:scale-105 transition-transform origin-left">
            <PupLumeLogo variant="full" size="lg" />
          </div>
          <nav className="hidden md:flex gap-10 text-sm font-bold text-[#766A63]">
            <a href="/features" className="hover:text-[#8B5E3C] hover:scale-105 transition-all">Features</a>
            <a href="/academy" className="hover:text-[#8B5E3C] hover:scale-105 transition-all">Academy</a>
            <a href="/health" className="hover:text-[#8B5E3C] hover:scale-105 transition-all">Health Center</a>
            <Link href="/pricing" className="hover:text-[#8B5E3C] hover:scale-105 transition-all">Pricing</Link>
          </nav>
          <div className="flex gap-4 items-center">
            {isLoaded ? (
              isLoggedIn ? (
                <a href="http://localhost:3000/?login=true" className="px-6 py-2.5 text-sm font-bold text-white bg-[#8B5E3C] rounded-full hover:bg-[#5F3E29] transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-95">
                  Open Dashboard
                </a>
              ) : (
                <>
                  <a href="http://localhost:3000/?login=true" className="hidden sm:inline-flex px-5 py-2.5 text-sm font-bold text-[#8B5E3C] hover:text-[#5F3E29] transition-colors">
                    Log In
                  </a>
                  <a href="http://localhost:3000/?login=true" className="px-6 py-2.5 text-sm font-bold text-white bg-[#8B5E3C] rounded-full hover:bg-[#5F3E29] transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-95">
                    Sign Up for Free
                  </a>
                </>
              )
            ) : (
              <div className="w-24 h-10 bg-[#E8DDD3] animate-pulse rounded-full" />
            )}
          </div>
        </div>
      </motion.header>

      <main className="flex-1 pt-20">
        {/* Health Center Section */}
      <section id="health" className="py-24 bg-[#FAF6F0] border-y border-[#E8DDD3] relative overflow-hidden">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
            <h2 className="text-3xl md:text-5xl font-black text-[#2C211B] tracking-tight mb-6">Never miss a<br/><span className="text-[#8B5E3C]">vaccine again.</span></h2>
            <p className="text-[#766A63] font-medium text-lg mb-8 leading-relaxed">Keep your puppy's medical records, weight history, and vaccine schedule safely stored in the cloud. We'll automatically remind you when the next booster is due.</p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-[#2C211B] font-bold text-sm"><span className="w-6 h-6 rounded-full bg-[#8B5E3C] text-white flex items-center justify-center text-xs">🐾</span> Automated Vet Reminders</li>
              <li className="flex items-center gap-3 text-[#2C211B] font-bold text-sm"><span className="w-6 h-6 rounded-full bg-[#8B5E3C] text-white flex items-center justify-center text-xs">🐾</span> Weight Tracking Charts</li>
              <li className="flex items-center gap-3 text-[#2C211B] font-bold text-sm"><span className="w-6 h-6 rounded-full bg-[#8B5E3C] text-white flex items-center justify-center text-xs">🐾</span> Secure Medical Logs</li>
            </ul>
          </div>
          <div className="flex-1 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#8B5E3C]/20 to-transparent rounded-full blur-3xl transform scale-150"></div>
            <div className="bg-white p-6 rounded-[2rem] border border-[#E8DDD3] shadow-xl relative z-10">
              <div className="flex items-center justify-between border-b border-[#E8DDD3] pb-4 mb-4">
                <div>
                  <h4 className="font-bold text-[#2C211B]">DHPP Booster</h4>
                  <p className="text-[10px] text-amber-600 font-bold uppercase tracking-wider mt-1">Due in 3 Days</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 2 4 4"/><path d="m17 7 3-3"/><path d="M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-1-0-3.4L15 5"/><path d="m9 11 4 4"/><path d="m5 19-3 3"/><path d="m14 4 6 6"/></svg></div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-[#2C211B]">Rabies Vaccine</h4>
                  <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider mt-1">Completed</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">🐾</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#E8DDD3] bg-[#FFF9F2] pt-16 pb-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16">
            <div className="flex items-center cursor-pointer transform hover:scale-105 transition-transform origin-left">
              <PupLumeLogo variant="full" size="md" />
            </div>
            <div className="flex flex-wrap gap-4 md:gap-8 text-sm font-bold text-[#766A63] items-center justify-center">
              <Link href="/legal/privacy" className="hover:text-[#8B5E3C] transition-colors">Privacy Policy</Link>
              <Link href="/legal/terms" className="hover:text-[#8B5E3C] transition-colors">Terms of Service</Link>
              <Link href="/legal/refund" className="hover:text-[#8B5E3C] transition-colors">Refund Policy</Link>
              <Link href="/legal/cookies" className="hover:text-[#8B5E3C] transition-colors">Cookie Policy</Link>
              <a href="mailto:support@puplume.com" className="hover:text-[#8B5E3C] transition-colors">Contact Support</a>
            </div>
          </div>
          <div className="text-center text-sm font-medium text-zinc-400">
            &copy; {new Date().getFullYear()} PupLume. Built for puppies and their humans.
          </div>
        </div>
      </footer>
    </div>
  );
}
