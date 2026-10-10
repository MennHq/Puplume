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
        {/* Features Section */}
      <section id="features" className="py-24 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-[#2C211B] tracking-tight mb-4">Everything your puppy needs.</h2>
            <p className="text-[#766A63] font-medium text-lg max-w-2xl mx-auto">PupLume replaces your messy notebooks with an elegant, AI-powered system designed specifically for the chaotic first year of puppyhood.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div whileHover={{ y: -5 }} className="bg-[#FFF9F2] p-8 rounded-3xl border border-[#E8DDD3] shadow-sm">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm mb-6 border border-[#E8DDD3]">🐾</div>
              <h3 className="text-xl font-bold text-[#2C211B] mb-3">Smart Logging</h3>
              <p className="text-[#766A63] text-sm leading-relaxed">Log potty breaks, meals, and naps in one tap. We track the patterns so you don't have to guess when they need to go out.</p>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="bg-[#FFF9F2] p-8 rounded-3xl border border-[#E8DDD3] shadow-sm">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#8B5E3C] shadow-sm mb-6 border border-[#E8DDD3]"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg></div>
              <h3 className="text-xl font-bold text-[#2C211B] mb-3">AI Insights</h3>
              <p className="text-[#766A63] text-sm leading-relaxed">Our AI analyzes your puppy's routine and tells you exactly what to expect. Get personalized tips based on their age and breed.</p>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="bg-[#FFF9F2] p-8 rounded-3xl border border-[#E8DDD3] shadow-sm">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#8B5E3C] shadow-sm mb-6 border border-[#E8DDD3]"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></div>
              <h3 className="text-xl font-bold text-[#2C211B] mb-3">Family Sync</h3>
              <p className="text-[#766A63] text-sm leading-relaxed">Share access with your partner or dog walker. Everyone stays perfectly in sync with instant updates and push notifications.</p>
            </motion.div>
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
