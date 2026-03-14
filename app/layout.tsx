// ./app/layout.tsx

import "./globals.css";
import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

// Enhanced metadata for better SEO
export const metadata: Metadata = {
  title: "Farm Ferry - Fresh Local Produce Delivered",
  description: "Discover the freshest, locally-sourced produce and artisan goods with Farm Ferry. We connect you directly with fresh farm produce and quality farm inputs. Order online today!",
  keywords: ["farm ferry", "local farm", "fresh produce", "organic food", "farm to table", "local delivery", "sustainable agriculture", "farmferry"],
  // Open Graph tags for social media sharing (Facebook, LinkedIn, etc.)
  openGraph: {
    title: "Farm Ferry - Fresh Local Produce Delivered",
    description: "Connecting you with the best local farms. Get fresh, sustainable produce delivered right to your door.",
    url: "https://farmferry.netlify.app", // IMPORTANT: Use your live domain here
    siteName: "Farm Ferry",
    images: [
      {
        url: "/public/logo.jpg", // IMPORTANT: Create an image for this (e.g., 1200x630px)
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  // Twitter Card tags for sharing on Twitter
  twitter: {
    card: "summary_large_image",
    title: "Farm Ferry - Fresh Local Produce Delivered",
    description: "Connecting you with the best farm produce. Get fresh, sustainable produce delivered right to you.",
    images: ["/public/logo.jpeg"], // Same image as Open Graph
  },
  // Tell search engines how to crawl your site
  robots: {
    index: true, // Allows search engines to index this page
    follow: true, // Allows search engines to follow links on this page
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Verify your site with search engines (optional but recommended)
  // verification: {
  //   google: 'your-google-verification-code',
  //   yandex: 'your-yandex-verification-code',
  //   yahoo: 'your-yahoo-verification-code',
  // },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Define the structured data (JSON-LD) for your business
  // This helps Google understand your business and can lead to rich results in search
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization", // Or "LocalBusiness" if you have a physical location
    name: "Farm Ferry",
    description: "A service connecting local farms with consumers for fresh produce delivery.",
    url: "https://farmferry.netlify.app",
    logo: "https://farmferry.netlify.app/images/logo.png", // IMPORTANT: Create a logo for this
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+234 913 885 2544", // Add your phone number
      contactType: "customer service",
      email: "farmferryagro@gmail.com",
      areaServed: "Nigeria", // Change to your service area
      availableLanguage: "English",
    },
    // Add social media profiles if you have them
    sameAs: [
      "https://www.facebook.com/61572979527572/",
      "https://www.instagram.com/farm_ferry/",
      "https://www.youtube.com/@FarmFerry"
    ],
  };

  return (
    <html lang="en">
      <head>
        {/* Inject Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="bg-gray-50">
        <Navbar />
        {/* Use semantic HTML tags like <main> for better SEO */}
        <main className="min-h-screen">{children}</main>
        <ChatWidget />
        <Footer />
      </body>
    </html>
  );
}