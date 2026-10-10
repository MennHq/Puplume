import type { Metadata } from "next";
import { Geist, Geist_Mono, Grandstander } from "next/font/google";

const grandstander = Grandstander({
  variable: "--font-grandstander",
  subsets: ["latin"],
});
import { ClientClerkProvider } from '../components/ClientClerkProvider';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://puplume.pet"),
  title: "PupLume | Puppy Training App & Digital Organizer",
  description: "The ultimate intelligent companion for new dog parents. Track potty training, manage health records, and get AI-powered puppy training advice all in one app.",
  openGraph: {
    title: "PupLume | Puppy Training App & Digital Organizer",
    description: "The ultimate intelligent companion for new dog parents.",
    url: "https://puplume.pet",
    siteName: "PupLume",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PupLume App Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PupLume | Puppy Training App",
    description: "The ultimate intelligent companion for new dog parents.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Schema.org JSON-LD for Software Application
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "PupLume",
    "operatingSystem": "Web, iOS, Android",
    "applicationCategory": "LifestyleApplication",
    "offers": {
      "@type": "Offer",
      "price": "24.99",
      "priceCurrency": "USD"
    },
    "description": "The ultimate intelligent companion for new dog parents. Track potty training, manage health records, and get AI-powered puppy training advice."
  };

  return (
    <ClientClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} ${grandstander.variable} h-full antialiased font-grandstander`}
        suppressHydrationWarning
      >
        <body className={`${grandstander.className} min-h-full flex flex-col`} suppressHydrationWarning>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                if ('serviceWorker' in navigator) {
                  navigator.serviceWorker.getRegistrations().then(function(registrations) {
                    for(let registration of registrations) {
                      registration.unregister();
                    }
                  });
                }
              `,
            }}
          />
          {children}
        </body>
      </html>
    </ClientClerkProvider>
  );
}
