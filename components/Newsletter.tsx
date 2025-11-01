"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null); // Explicitly type as string or null
  const [status, setStatus] = useState<"success" | "error" | null>(null); // Explicitly type as success, error, or null
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
    <section className="relative py-20 px-6 sm:px-10 overflow-x-hidden bg-gradient-to-br from-green-900 via-green-800 to-green-700 text-white">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold">Stay Updated 🌿</h2>
          <p className="mt-3 text-lg text-green-100 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest updates on sustainable farming,
            innovations, and community stories.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
        >
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isSubmitting}
            className="w-full sm:w-2/3 px-5 py-3 rounded-full text-gray-900 border border-white bg-white/90 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition disabled:opacity-70"
          />
          <motion.button
            type="submit"
            whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
            disabled={isSubmitting || !email}
            className="bg-white text-green-900 font-semibold px-8 py-3 rounded-full shadow-md hover:bg-green-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </motion.button>
        </motion.form>

        {/* Message Feedback */}
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`mt-6 p-4 rounded-md text-sm max-w-md mx-auto ${
              status === 'success' 
                ? 'bg-green-100/20 text-green-100 border border-green-100/30' 
                : 'bg-red-100/20 text-red-100 border border-red-100/30'
            }`}
          >
            {status === 'success' ? (
              <div className="flex items-center justify-center gap-2">
                <span>🎉</span>
                <span>{message}</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <span>⚠️</span>
                <span>{message}</span>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Decorative Overlay */}
      <div className="absolute inset-0 bg-green-950/20 pointer-events-none"></div>
    </section>
  );
}