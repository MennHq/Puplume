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
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-32">
          <motion.div 
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-40 -right-40 w-96 h-96 bg-[#E9B89C]/30 blur-[100px] rounded-full -z-10" 
          />
          <motion.div 
            animate={{ scale: [1, 1.2, 1], rotate: [0, -5, 5, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute top-40 -left-40 w-96 h-96 bg-[#A8B59A]/20 blur-[100px] rounded-full -z-10" 
          />
          
          <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="flex-1 space-y-8 text-center md:text-left z-10"
            >
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E8DDD3] text-[#8B5E3C] text-xs font-black uppercase tracking-widest shadow-sm hover:shadow-md transition-shadow">
                <span className="text-sm animate-pulse">✨</span> Smart Assistant
              </motion.div>
              <motion.h1 variants={fadeUp} className="font-[family-name:var(--font-brand)] text-5xl md:text-7xl font-black tracking-tight leading-[1.1] text-[#2C211B]">
                Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5E3C] to-[#E9B89C]">puppy's</span> digital home.<br />Raise them without the stress.
              </motion.h1>
              <motion.p variants={fadeUp} className="text-lg md:text-xl text-[#766A63] max-w-xl mx-auto md:mx-0 leading-relaxed font-medium">
                The ultimate puppy management app. Track routines, predict potty breaks, and get AI training advice instantly.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start pt-4">
                {isLoaded ? (
                  isLoggedIn ? (
                    <a href="http://localhost:3000/?login=true" className="font-[family-name:var(--font-brand)] w-full sm:w-auto px-8 py-4 text-lg font-bold text-white bg-[#8B5E3C] rounded-full hover:bg-[#5F3E29] transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 active:scale-95 text-center">
                      Open Dashboard
                    </a>
                  ) : (
                    <>
                      <a href="http://localhost:3000/?login=true" className="font-[family-name:var(--font-brand)] w-full sm:w-auto px-8 py-4 text-lg font-bold text-white bg-[#8B5E3C] rounded-full hover:bg-[#5F3E29] transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 active:scale-95 text-center">
                        Sign Up for Free for Free
                      </a>
                      <a href="/features" className="font-[family-name:var(--font-brand)] w-full sm:w-auto px-8 py-4 text-lg font-bold text-[#8B5E3C] bg-white rounded-full hover:bg-[#F3E7DA] transition-all shadow-md active:scale-95 text-center">
                        See Features
                      </a>
                    </>
                  )
                ) : (
                  <div className="w-48 h-14 bg-[#E8DDD3] animate-pulse rounded-full" />
                )}
              </motion.div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="flex-1 w-full max-w-[340px] relative z-10 lg:ml-auto"
            >
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative mx-auto w-full aspect-[9/16] bg-white rounded-[3rem] border-[12px] border-[#2C211B] shadow-2xl overflow-hidden flex flex-col"
              >
                                                                <div className="flex-1 bg-[#FAF6F0] flex flex-col w-full h-full relative overflow-hidden">
                  {/* App Header */}
                  <div className="bg-white px-5 pt-10 pb-4 border-b border-[#E8DDD3] flex items-center justify-between shadow-xs relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#F3E7DA] border-2 border-[#8B5E3C] overflow-hidden flex items-center justify-center text-xl">
                        🐶
                      </div>
                      <div>
                        <h3 className="font-extrabold text-[#2C211B] leading-none text-lg">Bella</h3>
                        <p className="text-[11px] text-[#766A63] font-medium mt-1">13 Weeks Old</p>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center">
                      <svg className="w-4 h-4 text-[#2C211B]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                    </div>
                  </div>

                  {/* Main Content Scroll Area */}
                  <div className="flex-1 overflow-hidden p-4 space-y-4">
                    {/* Next Up Card */}
                    <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-br from-[#FFF9F2] to-[#F3E7DA] rounded-2xl border border-[#8B5E3C]/30 p-4 shadow-sm relative overflow-hidden">
                      <div className="flex justify-between items-center mb-2">
                        <span className="px-2 py-0.5 bg-[#8B5E3C] text-white text-[9px] font-bold uppercase rounded-full tracking-wider">Next Up</span>
                        <span className="text-xs text-[#5F3E29] font-bold flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          10:00 AM
                        </span>
                      </div>
                      <h4 className="text-lg font-black text-[#2C211B] mb-1">Crate Training</h4>
                      <p className="text-[11px] text-[#766A63] mb-3 leading-relaxed">Keep Bella in the crate for 30 minutes to build independence.</p>
                      <div className="flex gap-2">
                        <button className="flex-1 bg-[#8B5E3C] text-white text-xs font-bold py-2 rounded-xl shadow-sm hover:bg-[#73492D]">Start Timer</button>
                        <button className="px-3 bg-white border border-[#E8DDD3] text-[#766A63] rounded-xl hover:bg-zinc-50"><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg></button>
                      </div>
                    </motion.div>

                    {/* Quick Actions Grid */}
                    <div className="flex items-center justify-between mt-2 mb-1">
                      <h5 className="text-xs font-black text-[#2C211B] uppercase tracking-wider">Quick Log</h5>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-3 rounded-2xl border border-[#E8DDD3] shadow-xs flex items-center gap-3 cursor-pointer">
                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-sm">💦</div>
                        <span className="text-[11px] font-bold text-[#2C211B]">Potty</span>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-3 rounded-2xl border border-[#E8DDD3] shadow-xs flex items-center gap-3 cursor-pointer">
                        <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-sm">🍗</div>
                        <span className="text-[11px] font-bold text-[#2C211B]">Meal</span>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-3 rounded-2xl border border-[#E8DDD3] shadow-xs flex items-center gap-3 cursor-pointer">
                        <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-sm">🎾</div>
                        <span className="text-[11px] font-bold text-[#2C211B]">Play</span>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-3 rounded-2xl border border-[#E8DDD3] shadow-xs flex items-center gap-3 cursor-pointer">
                        <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-sm">✨</div>
                        <span className="text-[11px] font-bold text-[#2C211B]">Ask AI</span>
                      </motion.div>
                    </div>

                    {/* Smart Insight */}
                    <motion.div whileHover={{ scale: 1.02 }} className="bg-white rounded-2xl border border-[#E8DDD3] p-3 shadow-xs flex gap-3 mt-2 cursor-pointer">
                      <div className="w-8 h-8 rounded-full bg-yellow-50 flex items-center justify-center text-sm shrink-0">💡</div>
                      <div>
                        <p className="text-[10px] font-bold text-[#8B5E3C] uppercase mb-0.5 tracking-wider">Daily Insight</p>
                        <p className="text-[11px] text-[#766A63] leading-snug">Bella is having fewer accidents this week! Consistent morning routines are paying off.</p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Variant 7: Uniform & Clean Tab Bar */}
                  <div className="absolute bottom-0 w-full z-30 bg-white/95 backdrop-blur-lg border-t border-[#E8DDD3]/60 shadow-[0_-4px_20px_rgba(0,0,0,0.02)]">
                    <div className="grid grid-cols-5 h-[68px] w-full items-center px-1 pb-3 pt-1 relative">
                      
                      {/* Home (Active) */}
                      <div className="flex flex-col items-center justify-center cursor-pointer transition-all text-[#8B5E3C] -translate-y-0.5">
                        <div className="p-1.5 rounded-xl transition-all mb-0.5 bg-[#FFF9F2] shadow-sm border border-[#E8DDD3]/50">
                          <svg className="w-[20px] h-[20px]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                        </div>
                        <span className="text-[9px] font-bold tracking-wide">Home</span>
                      </div>
                      
                      {/* Plan */}
                      <div className="flex flex-col items-center justify-center cursor-pointer transition-all text-[#A39B96] hover:text-[#8B5E3C]">
                        <div className="p-1.5 rounded-xl transition-all mb-0.5 bg-transparent border border-transparent">
                          <svg className="w-[20px] h-[20px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line><path d="M9 16l2 2 4-4"></path></svg>
                        </div>
                        <span className="text-[9px] font-medium tracking-wide">Plan</span>
                      </div>
                      
                      {/* Ask AI */}
                      <div className="flex flex-col items-center justify-center cursor-pointer transition-all text-[#A39B96] hover:text-[#8B5E3C]">
                        <div className="p-1.5 rounded-xl transition-all mb-0.5 bg-transparent border border-transparent relative">
                          <svg className="w-[20px] h-[20px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
                          <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#8B5E3C]" />
                        </div>
                        <span className="text-[9px] font-medium tracking-wide">Ask AI</span>
                      </div>
                      
                      {/* Academy */}
                      <div className="flex flex-col items-center justify-center cursor-pointer transition-all text-[#A39B96] hover:text-[#8B5E3C]">
                        <div className="p-1.5 rounded-xl transition-all mb-0.5 bg-transparent border border-transparent">
                          <svg className="w-[20px] h-[20px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
                        </div>
                        <span className="text-[9px] font-medium tracking-wide">Academy</span>
                      </div>
                      
                      {/* More */}
                      <div className="flex flex-col items-center justify-center cursor-pointer transition-all text-[#A39B96] hover:text-[#8B5E3C]">
                        <div className="p-1.5 rounded-xl transition-all mb-0.5 bg-transparent border border-transparent">
                          <svg className="w-[20px] h-[20px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
                        </div>
                        <span className="text-[9px] font-medium tracking-wide">More</span>
                      </div>
                    </div>
                    {/* iOS Home Indicator */}
                    <div className="absolute bottom-2 w-1/3 h-1 bg-zinc-300 rounded-full left-1/2 -translate-x-1/2 z-20"></div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      

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

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-[#FFF9F2] relative">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-black text-[#2C211B] text-center tracking-tight mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-[#E8DDD3] shadow-sm">
              <h3 className="text-xl font-bold text-[#2C211B] mb-3">Is PupLume a subscription?</h3>
              <p className="text-[#766A63] text-sm leading-relaxed">No! We hate pet subscriptions as much as you do. PupLume is a one-time purchase of $24.99 for lifetime access. You get all features, AI insights, and future updates forever.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-[#E8DDD3] shadow-sm">
              <h3 className="text-xl font-bold text-[#2C211B] mb-3">Can I share my account with my family?</h3>
              <p className="text-[#766A63] text-sm leading-relaxed">Yes. Family Sync is included. You can invite your partner, kids, or dog walker to your puppy's profile so everyone receives real-time potty and feeding updates.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-[#E8DDD3] shadow-sm">
              <h3 className="text-xl font-bold text-[#2C211B] mb-3">How does the AI Co-Pilot work?</h3>
              <p className="text-[#766A63] text-sm leading-relaxed">Our AI analyzes your puppy's specific breed traits, age in weeks, and the logs you submit. It provides tailored advice on biting inhibition, crate training, and sleep regression, acting like a dog trainer in your pocket.</p>
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
              <a href="mailto:support@puplume.pet" className="hover:text-[#8B5E3C] transition-colors">Contact Support</a>
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
