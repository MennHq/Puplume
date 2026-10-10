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
        {/* Academy Section */}
      <section id="academy" className="py-24 bg-[#2C211B] text-white relative">
        <div className="container mx-auto px-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#5F3E29] text-white mb-8 shadow-lg"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg></div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6">Expert training, built-in.</h2>
          <p className="text-zinc-400 font-medium text-lg max-w-2xl mx-auto mb-10">Unlock the PupLume Academy to get step-by-step guides on crate training, biting, and basic obedience. Tailored exactly to your puppy's current age.</p>
          <a href="http://localhost:3000/?login=true" className="inline-flex px-8 py-3.5 text-sm font-bold text-[#2C211B] bg-[#FFF9F2] rounded-full hover:bg-white transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-95">
            Explore the Academy
          </a>
        </div>
      </section>

      </main>`n      {/* Footer */}
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
