import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://myportfoliome.vercel.app"),
  title: "Uzair Afridi | AI/ML Engineer",
  description:
    "Self-taught software engineer and entrepreneur, specializing in Machine Learning and Artificial Intelligence.",
  keywords: [
    "AI Engineer",
    "ML Engineer",
    "Uzair Afridi",
    "Uzair",
    "Afridi",
    "AI",
    "ML",
    "Machine Learning",
    "Artificial Intelligence",
    "AI/ML Engineer",
    "AI/ML",
  ],
  authors: [{ name: "Uzair Afridi" }],
  creator: "Uzair Afridi",
  publisher: "Uzair Afridi",
  formatDetection: { email: false, address: false, telephone: false },
  icons: {
    icon: "/profile-image.jpg",
    shortcut: "/profile-image.jpg",
    apple: "/profile-image.jpg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://myportfoliome.vercel.app",
    siteName: "Uzair Afridi Portfolio",
    title: "Uzair Afridi | AI/ML Engineer",
    description:
      "Self-taught software engineer and entrepreneur, specializing in Machine Learning and Artificial Intelligence.",
    images: [
      {
        url: "https://myportfoliome.vercel.app/img/profile-pic.jpg",
        width: 1200,
        height: 630,
        alt: "Uzair Afridi | AI/ML Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Uzair Afridi | AI/ML Engineer",
    description:
      "Self-taught software engineer and entrepreneur, specializing in Machine Learning and Artificial Intelligence.",
    creator: "@uzair__afridi",
    images: ["https://myportfoliome.vercel.app/img/profile-pic.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google -verification-code",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Uzair Afridi",
  },
};

<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Uzair Afridi",
      url: "https://myportfoliome.vercel.app",
      image: "https://myportfoliome.vercel.app/img/profile-pic.jpg",
      sameAs: [
        "https://github.com/uzairafridi00",
        "https://x.com/uzair__afridi",
      ],
      jobTitle: "AI/ML Engineer",
      worksFor: {
        "@type": "Organization",
        name: "StartupFounder",
      },
    }),
  }}
/>;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>
        <main className="font-sans border-b border-l border-r max-w-3xl mx-auto">
          <Navbar />
          {children}
          <Footer />
        </main>
        <Toaster />
      </body>
    </html>
  );
}
