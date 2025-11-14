"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tractor,
  Sprout,
  CloudSun,
  ShoppingBag,
  Leaf,
  BarChart3,
  X,
  Wheat,
} from "lucide-react";

const services = [
  {
    icon: Sprout,
    title: "Fresh Farm Service",
    description:
      "Access freshly harvested produce directly from trusted local farmers.",
    details:
      "We connect consumers and retailers to high-quality farm produce straight from partner farms. Our logistics network ensures freshness, food safety, and fair pricing for both farmers and buyers.",
  },
  {
    icon: CloudSun,
    title: "Greenhouse Set Up",
    description:
      "Design and build greenhouse systems for all-season farming.",
    details:
      "We handle end-to-end greenhouse installation — from structure design to irrigation and automation setup. Whether small-scale or commercial, we ensure climate efficiency and high productivity.",
  },
  {
    icon: Wheat,
    title: "Seedlings",
    description:
      "Certified, disease-resistant seedlings for optimal crop performance.",
    details:
      "Our nurseries supply improved seedlings tailored for various soils and climates. We ensure access to high-yield vegetable, fruit, and cash crop varieties for consistent growth results.",
  },
  {
    icon: ShoppingBag,
    title: "Farm Inputs",
    description:
      "Affordable fertilizers, pesticides, and quality agricultural tools.",
    details:
      "We connect farmers with reliable suppliers for fertilizers, organic manure, irrigation systems, and protective equipment — all verified to ensure quality and value for money.",
  },
  {
    icon: Leaf,
    title: "Training",
    description:
      "Empowering farmers with modern agricultural knowledge and skills.",
    details:
      "We organize field workshops, demo sessions, and agribusiness mentorships covering crop management, pest control, greenhouse farming, and digital tools for farm efficiency.",
  },
  {
    icon: BarChart3,
    title: "Consultancy",
    description:
      "Expert guidance for agribusiness startups and farm expansion.",
    details:
      "Our agronomists and consultants provide in-depth support for farm planning, irrigation design, crop selection, and business strategy — ensuring data-driven growth decisions.",
  },
];

const floatFarmVariant = {
  animate: {
    y: ["-15%", "15%", "-15%"],
    x: ["0%", "10%", "-10%", "0%"],
    rotate: [0, 3, -3, 0],
    transition: {
      y: { duration: 10, repeat: Infinity, ease: "easeInOut" as const },
      x: { duration: 15, repeat: Infinity, ease: "easeInOut" as const },
      rotate: { duration: 20, repeat: Infinity, ease: "easeInOut" as const },
    },
  },
};

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<any>(null);

  return (
    <main className="bg-white text-gray-900 overflow-hidden relative">
      {/* === Hero Section === */}
      <section className="relative bg-green-900 text-white py-24 px-8 text-center overflow-hidden">
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
        >
          <Sprout size={50} className="text-green-300" />
        </motion.div>
        <motion.div
          className="absolute top-[30%] right-[15%] opacity-20"
          variants={floatFarmVariant}
          animate="animate"
        >
          <Leaf size={40} className="text-green-300" />
        </motion.div>

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
            Empowering agribusinesses and farmers with modern tools, training,
            and expert support to grow sustainably.
          </motion.p>
        </div>
      </section>

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
                onClick={() => setSelectedService(service)}
                className="bg-green-50 rounded-xl shadow-md hover:shadow-lg p-8 flex flex-col items-center text-center transition transform hover:-translate-y-2 cursor-pointer"
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

      {/* === Modal === */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl p-8 max-w-lg mx-4 text-center relative shadow-xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 text-gray-600 hover:text-green-700"
              >
                <X size={24} />
              </button>

              <div className="flex flex-col items-center">
                <div className="bg-green-900 text-white p-4 rounded-full mb-4">
                  <selectedService.icon size={40} />
                </div>
                <h3 className="text-2xl font-bold text-green-900 mb-4">
                  {selectedService.title}
                </h3>
                <p className="text-gray-700 mb-6">{selectedService.details}</p>
                <button
                  onClick={() => setSelectedService(null)}
                  className="bg-green-900 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* === CTA === */}
      <section className="bg-green-900 text-white py-20 px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold mb-6"
        >
          Ready to Grow Your Agribusiness?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="max-w-2xl mx-auto text-green-100 mb-10"
        >
          Join our network of forward-thinking farmers, agribusiness owners,
          and experts building a sustainable agricultural future.
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
