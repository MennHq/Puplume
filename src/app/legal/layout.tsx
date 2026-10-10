import Link from "next/link";
import { PupLumeLogo } from "@/components/common/PupLumeLogo";

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#1A1A1A] font-sans selection:bg-[#8B5E3C] selection:text-white">
      {/* Navbar */}
      <header className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-zinc-200">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center cursor-pointer transform hover:scale-105 transition-transform origin-left">
            <PupLumeLogo variant="full" size="md" />
          </Link>
          <div className="text-sm font-bold text-zinc-500">
            Legal Center
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="container mx-auto px-6 pt-24 pb-24 max-w-6xl flex flex-col md:flex-row gap-12">
        
        {/* Left Sidebar Menu */}
        <aside className="w-full md:w-64 shrink-0 hidden md:block">
          <div className="sticky top-28">
            <h3 className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-6">Agreements & Policies</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/legal/privacy" className="px-4 py-2.5 rounded-lg text-sm font-bold text-zinc-600 hover:text-[#8B5E3C] hover:bg-[#FFF9F2] transition-all">Privacy Policy</Link>
              <Link href="/legal/terms" className="px-4 py-2.5 rounded-lg text-sm font-bold text-zinc-600 hover:text-[#8B5E3C] hover:bg-[#FFF9F2] transition-all">Terms of Service</Link>
              <Link href="/legal/refund" className="px-4 py-2.5 rounded-lg text-sm font-bold text-zinc-600 hover:text-[#8B5E3C] hover:bg-[#FFF9F2] transition-all">Refund Policy</Link>
              <Link href="/legal/cookies" className="px-4 py-2.5 rounded-lg text-sm font-bold text-zinc-600 hover:text-[#8B5E3C] hover:bg-[#FFF9F2] transition-all">Cookie Policy</Link>
            </nav>
            
            <h3 className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-4 mt-10">Contact</h3>
            <a href="mailto:support@puplume.pet" className="px-4 py-2.5 rounded-lg text-sm font-bold text-zinc-600 hover:text-[#8B5E3C] hover:bg-[#FFF9F2] transition-all block">support@puplume.pet</a>
          </div>
        </aside>

        {/* Mobile Navigation Dropdown (Visible only on small screens) */}
        <div className="md:hidden mb-8 border-b border-zinc-200 pb-4">
           <h3 className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-4">Legal Directory</h3>
           <div className="flex flex-wrap gap-2">
              <Link href="/legal/privacy" className="px-4 py-2 rounded-full text-xs font-bold bg-white border border-zinc-200 text-zinc-600">Privacy</Link>
              <Link href="/legal/terms" className="px-4 py-2 rounded-full text-xs font-bold bg-white border border-zinc-200 text-zinc-600">Terms</Link>
              <Link href="/legal/refund" className="px-4 py-2 rounded-full text-xs font-bold bg-white border border-zinc-200 text-zinc-600">Refunds</Link>
              <Link href="/legal/cookies" className="px-4 py-2 rounded-full text-xs font-bold bg-white border border-zinc-200 text-zinc-600">Cookies</Link>
           </div>
        </div>

        {/* Document Content */}
        <main className="flex-1 min-w-0">
          <div className="bg-white p-8 md:p-14 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-zinc-100">
            {children}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-white py-12">
        <div className="container mx-auto px-6 text-center text-sm font-medium text-zinc-400">
          Built for puppies and their humans.
        </div>
      </footer>
    </div>
  );
}
