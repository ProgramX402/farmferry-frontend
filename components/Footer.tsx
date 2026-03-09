"use client";

import { motion } from "framer-motion";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { FaTiktok } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative bg-green-950 text-white py-16 px-6 sm:px-10 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12"
      >
        {/* === Column 1: Branding === */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Farm Ferry 🌿</h2>
          <p className="text-green-200 leading-relaxed">
            Empowering farmers through innovation, sustainability, and technology
            for a greener tomorrow.
          </p>
        </div>

        {/* === Column 2: Quick Links === */}
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

        {/* === Column 3: Contact === */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-3 text-green-100">Contact Us</h3>
          <ul className="space-y-3 text-green-200 text-sm">
            <li>
              <span className="font-semibold text-green-100">Address:</span><br />
              Farm Ferry Agro, Lamingo Rd, Jos 930105, Plateau State, Nigeria.
            </li>
            <li>
              <span className="font-semibold text-green-100">Phone:</span><br />
              +234 913 885 2544
            </li>
            <li>
              <span className="font-semibold text-green-100">Email:</span><br />
              farmferryagro@gmail.com
            </li>
          </ul>
        </div>

        {/* === Column 4: Social Media === */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-green-100">Follow Us</h3>

          <div className="flex gap-4 flex-wrap">
            {[
              { Icon: Facebook, href: "https://www.facebook.com/share/1DxVTdr2Zk/?mibextid=wwXIfr", name: "facebook" },
              { Icon: FaTiktok, href: "https://www.tiktok.com/@farmferry?_r=1&_t=ZS-9116FquwZN4", name: "tiktok" },
              { Icon: Instagram, href: "https://www.instagram.com/farm_ferry?igsh=MTJ4aXBpZmpmemp1cA%3D%3D&utm_source=qr", name: "instagram" },
              { Icon: Linkedin, href: "https://www.linkedin.com/company/farm-ferry/", name: "linkedin" },
              { Icon: Youtube, href: "https://youtube.com/@farmferry?si=U4WeoWkYz_YIdybN", name: "youtube" },
            ].map(({ Icon, href, name }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border border-white/20 hover:bg-white/10 transition"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Divider */}
      <div className="border-t border-green-800 mt-12 pt-6 text-center text-green-300 text-sm">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-white">Farm Ferry</span>. All rights reserved.
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 via-transparent to-transparent pointer-events-none"></div>
    </footer>
  );
}
