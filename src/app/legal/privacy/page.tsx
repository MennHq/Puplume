export const metadata = { title: "Privacy Policy | PupLume" };

export default function PrivacyPolicy() {
  return (
    <article className="max-w-3xl mx-auto text-zinc-600 leading-relaxed text-[15px]">
      <header className="mb-12 border-b border-zinc-100 pb-8">
        <h1 className="text-3xl md:text-4xl font-black text-zinc-900 mb-3 tracking-tight">Privacy Policy</h1>
        <p className="text-sm font-semibold text-zinc-400">Effective Date: {new Date().toLocaleDateString()}</p>
      </header>
      
      <p className="mb-8 text-lg font-medium text-zinc-800 leading-snug">
        At PupLume, your privacy is our top priority. We believe in being fully transparent about how we handle the information you entrust to us when using our application and services.
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-zinc-900 mb-4 tracking-tight">1. Information We Collect</h2>
        <p className="mb-4">We collect information that you actively provide to us to make the PupLume experience magical for you and your puppy. This includes:</p>
        <ul className="list-disc pl-5 space-y-2 mb-6">
          <li><strong>Account Data:</strong> Your name and email address, which are securely processed by our authentication provider (Clerk).</li>
          <li><strong>Puppy Profiles:</strong> Names, breeds, birthdays, and photos you upload.</li>
          <li><strong>Activity Logs:</strong> Data regarding potty breaks, meals, and training sessions.</li>
          <li><strong>Health Data:</strong> Vaccine records and weight tracking logs that you choose to store within the application.</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-zinc-900 mb-4 tracking-tight">2. How We Use Your Information</h2>
        <p className="mb-4">Your data is strictly used to provide, maintain, and improve the PupLume service. Specifically, we use it to:</p>
        <ul className="list-disc pl-5 space-y-2 mb-6">
          <li>Generate AI-driven insights regarding your puppy's routine and behavior patterns.</li>
          <li>Schedule push notifications and automated vet reminders.</li>
          <li>Sync your puppy's profile seamlessly across devices for family members and dog walkers.</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-zinc-900 mb-4 tracking-tight">3. Data Sharing and Third Parties</h2>
        <p className="mb-4">
          <strong>We will never sell your personal data.</strong> We only share information with strictly vetted, essential third-party service providers (such as secure cloud hosting and authentication services) that are legally bound to protect your data and are required for the app to function.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-zinc-900 mb-4 tracking-tight">4. Children's Privacy</h2>
        <p className="mb-4">
          While PupLume is a family-friendly tool designed for raising puppies, our Terms of Service require account creators to be at least 13 years of age (or 16 in certain jurisdictions, as required by law). Parents or legal guardians are encouraged to manage profiles on behalf of younger children. We do not knowingly collect personal information from children under 13 without verifiable parental consent.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-zinc-900 mb-4 tracking-tight">5. Contact Us</h2>
        <p className="mb-4">
          If you have any questions, concerns, or requests regarding your data and this Privacy Policy, please reach out to our privacy team at:
        </p>
        <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-100 inline-block">
          <p className="font-bold text-zinc-900">Email: <a href="mailto:support@puplume.pet" className="text-[#8B5E3C] hover:underline">support@puplume.pet</a></p>
        </div>
      </section>
    </article>
  );
}
