export const metadata = { title: "Cookie Policy | PupLume" };

export default function CookiePolicy() {
  return (
    <article className="max-w-3xl mx-auto text-zinc-600 leading-relaxed text-[15px]">
      <header className="mb-12 border-b border-zinc-100 pb-8">
        <h1 className="text-3xl md:text-4xl font-black text-zinc-900 mb-3 tracking-tight">Cookie Policy</h1>
        <p className="text-sm font-semibold text-zinc-400">Effective Date: {new Date().toLocaleDateString()}</p>
      </header>
      
      <p className="mb-8 text-lg font-medium text-zinc-800 leading-snug">
        This Cookie Policy explains how PupLume uses cookies and similar tracking technologies when you visit our website or use our application.
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-zinc-900 mb-4 tracking-tight">1. What are Cookies?</h2>
        <p className="mb-4">Cookies are small data files placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide essential functional data.</p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-zinc-900 mb-4 tracking-tight">2. How We Use Cookies</h2>
        <ul className="list-disc pl-5 space-y-4 mb-6">
          <li><strong>Essential Cookies:</strong> Required for the app to function, such as maintaining your authenticated session via Clerk.</li>
          <li><strong>Analytics Cookies:</strong> Help us understand how users interact with our app, allowing us to improve performance and UI design.</li>
          <li><strong>Preference Cookies:</strong> Allow the app to remember choices you make, such as dark mode settings or language preferences.</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-zinc-900 mb-4 tracking-tight">3. Managing Cookies</h2>
        <p className="mb-4">Most web browsers allow you to control cookies through their settings preferences. Please note that disabling essential cookies may prevent you from logging into PupLume.</p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-zinc-900 mb-4 tracking-tight">4. Contact Us</h2>
        <p className="mb-4">If you have questions about our use of cookies, contact us at <strong>support@puplume.com</strong>.</p>
      </section>
    </article>
  );
}