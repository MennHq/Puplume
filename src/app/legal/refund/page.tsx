export const metadata = { title: "Refund Policy | PupLume" };

export default function RefundPolicy() {
  return (
    <article className="max-w-3xl mx-auto text-zinc-600 leading-relaxed text-[15px]">
      <header className="mb-12 border-b border-zinc-100 pb-8">
        <h1 className="text-3xl md:text-4xl font-black text-zinc-900 mb-3 tracking-tight">Refund Policy</h1>
        <p className="text-sm font-semibold text-zinc-400">Effective Date: {new Date().toLocaleDateString()}</p>
      </header>
      
      <p className="mb-8 text-lg font-medium text-zinc-800 leading-snug">
        At PupLume, we strive to deliver the highest quality experience for you and your puppy. Please review our strict refund policy below before purchasing a premium subscription.
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-zinc-900 mb-4 tracking-tight">1. General Rule: No Refunds</h2>
        <p className="mb-4">
          Because of the nature of digital goods and the immediate availability of our AI features and premium training content, <strong>all sales are final. We do not offer standard refunds, prorated refunds, or returns for buyer's remorse.</strong>
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-zinc-900 mb-4 tracking-tight">2. Exceptions for Harsh Circumstances</h2>
        <p className="mb-4">
          We understand that life happens. We may, at our sole and absolute discretion, grant a refund in cases involving severe, unforeseen, or harsh circumstances (e.g., the tragic loss of your puppy, or a verified technical failure that completely prevents you from using the app). 
        </p>
        <p className="mb-4">
          To be considered for an exception, you must:
        </p>
        <ul className="list-disc pl-5 space-y-2 mb-6">
          <li>Contact support within 14 days of the charge.</li>
          <li>Provide a strong, valid reason.</li>
          <li>Provide verifiable proof supporting your claim (where applicable).</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-zinc-900 mb-4 tracking-tight">3. How to Request an Exception</h2>
        <p className="mb-4">
          If you believe your situation qualifies for an exception, please email us directly at:
        </p>
        <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-100 inline-block">
          <p className="font-bold text-zinc-900"><a href="mailto:support@puplume.com" className="text-[#8B5E3C] hover:underline">support@puplume.com</a></p>
        </div>
      </section>
    </article>
  );
}