"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { PupLumeLogo } from "@/components/common/PupLumeLogo";
import { Check, Shield, ArrowRight, Dog } from "lucide-react";

export default function PricingPage() {
  const loginUrl = "http://localhost:3000/?login=true";

  return (
    <div className="flex flex-col min-h-screen bg-[#FFF9F2] text-[#2C211B] font-sans selection:bg-[#8B5E3C] selection:text-white">
      {/* Simple Navbar */}
      <header className="fixed top-0 z-50 w-full bg-[#FFF9F2]/90 backdrop-blur-lg border-b border-[#E8DDD3]">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center cursor-pointer transform hover:scale-105 transition-transform origin-left">
              <PupLumeLogo variant="full" size="lg" />
            </div>
          </Link>
          <nav className="flex gap-4">
            <a 
              href={loginUrl} 
              className="px-6 py-2.5 text-sm font-bold text-white bg-[#8B5E3C] rounded-full hover:bg-[#5F3E29] transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-95"
            >
              Get PupLume
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-32 pb-24 px-6 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-10 left-[-10%] w-[600px] h-[600px] bg-[#8B5E3C] rounded-full blur-[120px] opacity-[0.03] pointer-events-none" />
        <div className="absolute bottom-10 right-[-10%] w-[500px] h-[500px] bg-[#F59E0B] rounded-full blur-[100px] opacity-[0.03] pointer-events-none" />

        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8B5E3C]/10 text-[#8B5E3C] font-bold text-sm mb-6 border border-[#8B5E3C]/20">
              <Shield className="w-4 h-4" /> Simple, Transparent Pricing
            </div>
            
            <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight leading-tight">
              One Price.<br className="md:hidden" /> A Lifetime of Care.
            </h1>
            <p className="text-xl text-[#766A63] mb-12 max-w-2xl mx-auto font-medium">
              No hidden fees. No recurring subscriptions. Just full access to everything you need to raise a healthy, happy puppy.
            </p>
          </motion.div>

          {/* Pricing Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-md mx-auto bg-white rounded-[40px] shadow-2xl border border-[#E8DDD3] overflow-hidden"
          >
            {/* Card Header */}
            <div className="bg-[#2C211B] p-10 relative overflow-hidden text-center text-white">
              <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
              
              <div className="relative z-10 mx-auto w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 border border-white/20 backdrop-blur-md">
                <Dog className="w-8 h-8 text-[#F3E7DA]" />
              </div>
              
              <h3 className="text-2xl font-bold mb-2">Lifetime Access</h3>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-6xl font-black">$24.99</span>
                <span className="text-lg text-white/60 font-medium">USD</span>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-8">
              <ul className="space-y-4 mb-8 text-left">
                <FeatureItem text="Unlimited AI Co-Pilot Chat" />
                <FeatureItem text="Full Training Academy Access" />
                <FeatureItem text="Advanced Health & Growth Analytics" />
                <FeatureItem text="Complete Medical & Vaccine Vault" />
                <FeatureItem text="Potty & Sleep Tracking Tools" />
                <FeatureItem text="Free Future Updates" />
              </ul>

              <a href={loginUrl} className="block w-full">
                <button className="w-full h-14 text-lg font-bold text-white bg-[#8B5E3C] rounded-2xl hover:bg-[#5F3E29] transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-2">
                  Get Started Now
                  <ArrowRight className="w-5 h-5" />
                </button>
              </a>
              
              <p className="text-center text-xs font-semibold text-[#8B5E3C]/60 mt-4 uppercase tracking-wider">
                100% Fully Paid. No Freemium.
              </p>
            </div>
          </motion.div>

        </div>
      </main>

      {/* Simple Footer */}
      <footer className="bg-[#2C211B] py-12 text-center text-white/60">
        <div className="container mx-auto px-6">
          <PupLumeLogo variant="icon" size="sm" className="mx-auto mb-6 opacity-50 grayscale" />
          <p className="text-sm font-medium mb-4">
            © {new Date().getFullYear()} PupLume. All rights reserved.
          </p>
          <div className="flex justify-center gap-6 text-sm">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/legal/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/legal/terms" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

const FeatureItem = ({ text }: { text: string }) => (
  <li className="flex items-center gap-3">
    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#E5F6DF] flex items-center justify-center border border-[#C6E9BA]">
      <Check className="w-3.5 h-3.5 text-[#4CAF50] font-bold" />
    </div>
    <span className="text-[#2C211B] font-semibold">{text}</span>
  </li>
);
