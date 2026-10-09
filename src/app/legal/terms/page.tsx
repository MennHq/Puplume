export const metadata = { title: "Terms of Service | PupLume" };

export default function TermsOfService() {
  return (
    <article className="max-w-3xl mx-auto text-zinc-600 leading-relaxed text-[15px]">
      <header className="mb-12 border-b border-zinc-100 pb-8">
        <h1 className="text-3xl md:text-4xl font-black text-zinc-900 mb-3 tracking-tight">Terms of Service</h1>
        <p className="text-sm font-semibold text-zinc-400">Effective Date: {new Date().toLocaleDateString()}</p>
      </header>
      
      <p className="mb-8 text-lg font-medium text-zinc-800 leading-snug">
        Welcome to PupLume. By accessing or using our application, website, or services, you agree to be bound by these Terms of Service.
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-zinc-900 mb-4 tracking-tight">1. Acceptance of Terms</h2>
        <p className="mb-4">By creating an account, you agree to comply with and be bound by these terms. If you do not agree, you may not access or use the service.</p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-zinc-900 mb-4 tracking-tight">2. Medical and Training Disclaimer</h2>
        <div className="bg-[#FFF9F2] border-l-4 border-[#8B5E3C] p-5 rounded-r-xl mb-6">
          <p className="font-bold text-[#8B5E3C] mb-2">Important Notice</p>
          <p className="text-sm text-zinc-700">
            PupLume provides AI-generated insights, training guides, and tracking tools for informational purposes only. <strong>We are not veterinarians or certified animal behaviorists.</strong> Our service is not a substitute for professional veterinary advice, diagnosis, or treatment. Always consult with a qualified professional regarding your pet's health.
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-zinc-900 mb-4 tracking-tight">3. User Accounts</h2>
        <p className="mb-4">You are responsible for safeguarding your account credentials and for all activities that occur under your account. You must immediately notify us of any unauthorized use of your account.</p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-zinc-900 mb-4 tracking-tight">4. Prohibited Conduct</h2>
        <p className="mb-4">You agree not to:</p>
        <ul className="list-disc pl-5 space-y-2 mb-6">
          <li>Use the service for any illegal or unauthorized purpose.</li>
          <li>Attempt to reverse engineer, decompile, or hack the service.</li>
          <li>Upload malicious code, viruses, or harmful data.</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-zinc-900 mb-4 tracking-tight">5. Contact</h2>
        <p className="mb-4">For questions regarding these Terms, please contact <strong>support@puplume.com</strong>.</p>
      </section>
    </article>
  );
}