"use client";

import { motion } from "framer-motion";
import {
  Tractor,
  Sprout,
  CloudSun,
  ShoppingBag,
  Leaf,
  BarChart3,
} from "lucide-react";
import Image from "next/image"; // Import Image for custom farm elements

const services = [
  {
    icon: Tractor,
    title: "Modern Farm Equipment",
    description:
      "We provide access to affordable, efficient farming equipment that helps increase productivity and reduce labor costs.",
  },
  {
    icon: Sprout,
    title: "Sustainable Agriculture",
    description:
      "We promote eco-friendly practices that preserve the environment and ensure long-term food security.",
  },
  {
    icon: CloudSun,
    title: "Weather & Crop Insights",
    description:
      "Get real-time weather forecasts and crop health analytics powered by data and technology.",
  },
  {
    icon: ShoppingBag,
    title: "Market Access",
    description:
      "We connect farmers directly with buyers and cooperatives, ensuring fair prices and transparent transactions.",
  },
  {
    icon: Leaf,
    title: "Training & Education",
    description:
      "Our platform provides expert-led workshops, videos, and guides on modern agricultural techniques.",
  },
  {
    icon: BarChart3,
    title: "Financial Support",
    description:
      "We partner with financial institutions to provide loans and grants to small-scale farmers.",
  },
];

// Animation variant for the floating farm elements
const floatFarmVariant = {
  animate: {
    y: ["-15%", "15%", "-15%"], // Floats up and down
    x: ["0%", "10%", "-10%", "0%"], // Moves slightly side to side
    rotate: [0, 3, -3, 0], // Subtle rotation
    transition: {
      y: { duration: 10, repeat: Infinity, ease: "easeInOut" },
      x: { duration: 15, repeat: Infinity, ease: "easeInOut" },
      rotate: { duration: 20, repeat: Infinity, ease: "easeInOut" },
    },
  },
};

export default function ServicesPage() {
  return (
    <main className="bg-white text-gray-900 overflow-hidden">
      {/* === Hero Section (Modified) === */}
      <section className="relative bg-green-900 text-white py-24 px-8 text-center overflow-hidden">
        {/* Animated Farm Elements */}
        <motion.div
          className="absolute top-[10%] left-[5%] opacity-20"
          variants={floatFarmVariant}
          animate="animate"
        >
          <Tractor size={60} className="text-green-300" />
        </motion.div>
        <motion.div
          className="absolute bottom-[15%] right-[8%] opacity-20"
          variants={floatFarmVariant}
          animate="animate"
          transition={{ ...floatFarmVariant.animate.transition, duration: 12, delay: 0.5 }}
        >
          <Sprout size={50} className="text-green-300" />
        </motion.div>
        <motion.div
          className="absolute top-[30%] right-[15%] opacity-20"
          variants={floatFarmVariant}
          animate="animate"
          transition={{ ...floatFarmVariant.animate.transition, duration: 18, delay: 1 }}
        >
          <Leaf size={40} className="text-green-300" />
        </motion.div>
        <motion.div
          className="absolute bottom-[5%] left-[20%] opacity-20"
          variants={floatFarmVariant}
          animate="animate"
          transition={{ ...floatFarmVariant.animate.transition, duration: 14, delay: 0.2 }}
        >
          <CloudSun size={70} className="text-green-300" />
        </motion.div>

        {/* Content - Set relative z-index to ensure it sits on top of the elements */}
        <div className="relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold mb-4"
          >
            Our Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="max-w-2xl mx-auto text-lg text-green-100"
          >
            Empowering farmers with the tools, training, and technology they need to
            succeed in a modern world.
          </motion.p>
        </div>
      </section>

      {/* --- */}

      {/* === Services Grid === */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="bg-green-50 rounded-xl shadow-md hover:shadow-lg p-8 flex flex-col items-center text-center transition transform hover:-translate-y-2"
              >
                <div className="bg-green-900 text-white p-4 rounded-full mb-6">
                  <Icon size={32} />
                </div>
                <h3 className="text-2xl font-semibold text-green-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-700">{service.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* --- */}

      {/* === Call to Action === */}
      <section className="bg-green-900 text-white py-20 px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold mb-6"
        >
          Ready to Transform Your Farming Journey?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="max-w-2xl mx-auto text-green-100 mb-10"
        >
          Join thousands of farmers already benefiting from our platform’s tools,
          training, and community support.
        </motion.p>

        <motion.a
          href="/contact"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="inline-block bg-white text-green-900 font-semibold px-8 py-4 rounded-lg hover:bg-green-100 transition"
        >
          Contact Us
        </motion.a>
      </section>
    </main>
  );
}