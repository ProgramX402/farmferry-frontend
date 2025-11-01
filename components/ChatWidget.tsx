"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Phone, Mail } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* === Chat Options Popup === */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="mb-4 bg-white shadow-xl rounded-2xl border border-gray-200 w-64 p-4 space-y-3"
          >
            <h3 className="text-green-900 font-semibold text-lg mb-2">Contact Us</h3>

            {/* WhatsApp */}
            <a
              href="https://wa.me/2348068456855"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-green-50 transition"
            >
              <div className="p-2 bg-green-100 rounded-full">
                <FaWhatsapp className="text-green-700" size={18} />
              </div>
              <span className="text-gray-700 text-sm font-medium">Chat on WhatsApp</span>
            </a>

            {/* Email */}
            <a
              href="mailto:enochtyulen@gmail.com"
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-green-50 transition"
            >
              <div className="p-2 bg-green-100 rounded-full">
                <Mail className="text-green-700" size={18} />
              </div>
              <span className="text-gray-700 text-sm font-medium">Send an Email</span>
            </a>

            {/* Phone */}
            <a
              href="tel:2348068456855"
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-green-50 transition"
            >
              <div className="p-2 bg-green-100 rounded-full">
                <Phone className="text-green-700" size={18} />
              </div>
              <span className="text-gray-700 text-sm font-medium">Call Us</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* === Floating Button === */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="bg-green-900 text-white rounded-full p-4 shadow-lg hover:bg-green-800 transition"
      >
        <MessageCircle size={26} />
      </motion.button>
    </div>
  );
}
