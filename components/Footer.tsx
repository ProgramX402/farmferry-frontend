"use client";

import { motion } from "framer-motion";
import { Facebook, Instagram, Linkedin, Youtube, Music } from "lucide-react";
import { FaTiktok } from "react-icons/fa";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [status, setStatus] = useState(null); // 'success' or 'error'
  const [isSubmitting, setIsSubmitting] = useState(false);

  const API_URL = 'https://farmferry-backend-n04p.onrender.com/api/newsletter/subscribe';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    setMessage(null);
    setStatus(null);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || 'Thank you for subscribing!');
        setStatus('success');
        setEmail(''); // Clear the input on success
      } else {
        // Handle server errors (e.g., "Already subscribed" 409)
        setMessage(data.error || 'Subscription failed. Please try again.');
        setStatus('error');
      }
    } catch (err) {
      console.error("Subscription error:", err);
      setMessage('Network error. Could not connect to the server.');
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="relative bg-green-950 text-white py-16 px-6 sm:px-10 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12"
      >
        {/* === Left Column === */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">FarmFerry 🌿</h2>
          <p className="text-green-200 leading-relaxed">
            Empowering farmers through innovation, sustainability, and technology for a greener tomorrow.
          </p>
        </div>

        {/* === Middle Column: Links === */}
        <div className="flex flex-col sm:flex-row md:flex-col gap-6 sm:gap-10 md:gap-6 justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-3 text-green-100">Quick Links</h3>
            <ul className="space-y-2 text-green-200">
              {["Home", "About", "Services", "Blog", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href={`/${link.toLowerCase()}`}
                    className="hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* === Right Column: Newsletter + Socials === */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-green-100">Stay Connected</h3>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSubmitting}
              className="flex-1 px-4 py-3 rounded-full bg-green-900 border border-white/20 text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 disabled:opacity-70"
            />
            <button
              type="submit"
              disabled={isSubmitting || !email}
              className="bg-white text-green-900 font-semibold px-6 py-3 rounded-full hover:bg-green-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Joining..." : "Join"}
            </button>
          </form>

          {/* Message Feedback */}
          {message && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`p-3 rounded-md text-sm ${
                status === 'success' 
                  ? 'bg-green-100/20 text-green-100 border border-green-100/30' 
                  : 'bg-red-100/20 text-red-100 border border-red-100/30'
              }`}
            >
              {status === 'success' ? (
                <div className="flex items-center gap-2">
                  <span>🎉</span>
                  <span>{message}</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span>⚠️</span>
                  <span>{message}</span>
                </div>
              )}
            </motion.div>
          )}

          {/* Social Icons */}
          <div className="flex gap-5 mt-6">
            {[
              { Icon: Facebook, href: "https://www.facebook.com/share/1DxVTdr2Zk/?mibextid=wwXIfr", name: "facebook" },
              { 
                Icon: FaTiktok, 
                href: "https://www.tiktok.com/@farmferry?_r=1&_t=ZS-9116FquwZN4", 
                name: "tiktok",
                label: "TikTok"
              },
              { Icon: Instagram, href: "https://www.instagram.com/farm_ferry?igsh=MTJ4aXBpZmpmemp1cA%3D%3D&utm_source=qr", name: "instagram" },
              { Icon: Linkedin, href: "https://www.linkedin.com/company/farm-ferry/", name: "linkedin" },
              { Icon: Youtube, href: "https://youtube.com/@farmferry?si=U4WeoWkYz_YIdybN", name: "youtube" },
            ].map(({ Icon, href, name, label }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border border-white/20 hover:bg-white/10 transition"
                aria-label={label || name}
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Divider Line */}
      <div className="border-t border-green-800 mt-12 pt-6 text-center text-green-300 text-sm">
        © {new Date().getFullYear()} <span className="font-semibold text-white">FarmFerry</span>.  
        All rights reserved.
      </div>

      {/* Background Accent */}
      <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 via-transparent to-transparent pointer-events-none"></div>
    </footer>
  );
}