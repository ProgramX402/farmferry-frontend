"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import Image from "next/image";
import { useState, ChangeEvent, FormEvent } from "react";

// Define the form data type
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

// Define the status type
interface Status {
  success: boolean | null;
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<Status>({ success: null, message: "" });

  // Handle form inputs with proper typing
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit handler with proper typing
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ success: null, message: "" });

    try {
      // ✅ Call internal Next.js API (no env vars)
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to send message.");

      setStatus({ success: true, message: data.message });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      setStatus({
        success: false,
        message: err instanceof Error ? err.message : "❌ Something went wrong. Try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* === Hero Section === */}
      <section className="relative w-full h-[65vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/contact-hero.jpg"
          alt="Contact Us"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-green-900 opacity-100" />
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 text-center text-white px-4"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
            Get in Touch 🌱
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            We'd love to hear from you — whether you're a farmer, partner, or
            simply curious about what we do.
          </p>
        </motion.div>
      </section>

      {/* === Contact Form Section === */}
      <section className="max-w-7xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-12 items-center">
        {/* Left: Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-green-900 mb-6">
            Let's Connect
          </h2>
          <p className="text-gray-700 mb-8">
            Have questions, feedback, or collaboration ideas? Reach out to us — 
            we'll respond as soon as possible.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-700">
              <Phone className="text-green-700" />
              <span>+234 800 123 4567</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <MessageCircle className="text-green-700" />
              <span>WhatsApp: +234 800 987 6543</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Mail className="text-green-700" />
              <span>hello@greenfarm.com</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <MapPin className="text-green-700" />
              <span>23 Green Valley Road, Abuja, Nigeria</span>
            </div>
          </div>
        </motion.div>

        {/* Right: Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white shadow-lg rounded-2xl p-8"
        >
          <h3 className="text-2xl font-semibold text-green-900 mb-6">
            Send Us a Message
          </h3>

          {status.message && (
            <p
              className={`text-center mb-4 font-medium ${
                status.success ? "text-green-700" : "text-red-600"
              }`}
            >
              {status.message}
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col">
              <label htmlFor="firstName" className="text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter your first name"
                required
                className="border border-gray-300 rounded-md p-3 text-black focus:ring-2 focus:ring-green-700 outline-none"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="lastName" className="text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
                required
                className="border border-gray-300 rounded-md p-3 text-black focus:ring-2 focus:ring-green-700 outline-none"
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@domain.com"
              required
              className="w-full border border-gray-300 rounded-md p-3 text-black focus:ring-2 focus:ring-green-700 outline-none"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="subject" className="text-sm font-medium text-gray-700 mb-1">
              Subject
            </label>
            <input
              id="subject"
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="What's your message about?"
              required
              className="w-full border border-gray-300 rounded-md p-3 text-black focus:ring-2 focus:ring-green-700 outline-none"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4} // Changed from string "4" to number 4
              placeholder="Write your message here..."
              required
              className="w-full border border-gray-300 rounded-md p-3 text-black focus:ring-2 focus:ring-green-700 outline-none resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-800 text-white py-3 rounded-md hover:bg-green-900 transition-all font-medium disabled:opacity-70"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </motion.form>
      </section>
    </div>
  );
}