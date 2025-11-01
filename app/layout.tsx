import "./globals.css";
import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

export const metadata: Metadata = {
  title: "My Next.js Site",
  description: "Built with Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <Navbar />
        <main>{children}</main> {/* 👈 Add padding-top */}
        <ChatWidget />
        <Footer />
      </body>
    </html>
  );
}
