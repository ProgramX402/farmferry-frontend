"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "Enoch Tyulen",
    role: "Founder & CEO",
    image: "/founder.jpg",
  },
  {
    name: "Sarah Johnson",
    role: "Chief Operations Officer",
    image: "/founder.jpg",
  },
  {
    name: "David Kim",
    role: "Head of Innovation",
    image: "/founder.jpg",
  },
  {
    name: "Aisha Bello",
    role: "Community Manager",
    image: "/team4.jpg",
  },
];

// Animation variant for the floating circles - Fixed with proper typing
const floatVariant = {
  animate: {
    y: ["-10%", "10%", "-10%"], // Moves up and down
    x: ["0%", "5%", "0%"], // Also moves slightly side to side
    rotate: [0, 5, 0], // Subtle rotation
    transition: {
      y: { duration: 8, repeat: Infinity, ease: "easeInOut" as const },
      x: { duration: 10, repeat: Infinity, ease: "easeInOut" as const },
      rotate: { duration: 12, repeat: Infinity, ease: "easeInOut" as const },
    },
  },
};

export default function AboutPage() {
  return (
    <main className="bg-white text-gray-900 overflow-hidden">
      {/* === Hero Section (Modified) === */}
      <section className="relative bg-green-900 text-white py-24 px-8 text-center overflow-hidden">
        {/* Floating Circles - Positioned absolutely to float over the background */}
        <motion.div
          className="absolute top-1/4 left-[5%] h-16 w-16 bg-white opacity-10 rounded-full"
          variants={floatVariant}
          animate="animate"
        />
        <motion.div
          className="absolute bottom-1/4 right-[10%] h-8 w-8 bg-white opacity-10 rounded-full"
          variants={floatVariant}
          animate="animate"
          transition={{ ...floatVariant.animate.transition, y: { duration: 12, repeat: Infinity, ease: "easeInOut" as const } }}
        />
        <motion.div
          className="absolute top-[10%] right-[30%] h-10 w-10 bg-white opacity-10 rounded-full"
          variants={floatVariant}
          animate="animate"
          transition={{ ...floatVariant.animate.transition, y: { duration: 9, repeat: Infinity, ease: "easeInOut" as const } }}
        />
        <motion.div
          className="absolute bottom-[5%] left-[20%] h-24 w-24 bg-white opacity-10 rounded-full"
          variants={floatVariant}
          animate="animate"
          transition={{ ...floatVariant.animate.transition, y: { duration: 15, repeat: Infinity, ease: "easeInOut" as const } }}
        />
        
        {/* Content - Set relative z-index to ensure it sits on top of the circles */}
        <div className="relative z-10"> 
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold mb-4"
          >
            About Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="max-w-2xl mx-auto text-lg text-green-100"
          >
            Empowering farmers, transforming agriculture, and building a sustainable future for all.
          </motion.p>
        </div>
      </section>

      {/* --- */}

      {/* === Overview Section === */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 space-y-6"
          >
            <h2 className="text-4xl font-bold text-green-900">Our Story</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Founded with the vision of uplifting small-scale farmers, we aim to bridge
              the gap between traditional agriculture and modern innovation. Our platform
              connects farmers with technology, resources, and markets — ensuring
              sustainable growth for communities.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We believe that agriculture is more than just food production — it's about
              community, empowerment, and the future of our planet.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 flex justify-center"
          >
            <Image
              src="/founder.jpg"
              alt="Farmers working together"
              width={500}
              height={400}
              className="rounded-xl shadow-lg object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* --- */}

      {/* === Mission Section === */}
      <section className="bg-green-50 py-20 px-8">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-green-900"
          >
            Our Mission
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed"
          >
            To empower rural communities through technology, education, and collaboration —
            ensuring every farmer has access to the tools and support needed to thrive.
          </motion.p>
        </div>
      </section>

      {/* --- */}

      {/* === Vision Section === */}
      <section className="py-20 px-8">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-green-900"
          >
            Our Vision
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed"
          >
            To create a world where agriculture is sustainable, inclusive, and driven by innovation —
            where farmers are leaders of positive change in their communities.
          </motion.p>
        </div>
      </section>

      {/* --- */}

      {/* === Values Section === */}
      <section className="bg-green-50 py-20 px-8">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-green-900 mb-12"
          >
            Our Core Values
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {["Integrity", "Sustainability", "Innovation", "Community"].map((value, i) => (
              <motion.div
                key={value}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold text-green-900 mb-2">{value}</h3>
                <p className="text-gray-700">
                  {value === "Integrity" &&
                    "We uphold honesty and transparency in every relationship and action."}
                  {value === "Sustainability" &&
                    "We promote practices that preserve the environment and ensure long-term growth."}
                  {value === "Innovation" &&
                    "We embrace new ideas and technologies to drive progress in agriculture."}
                  {value === "Community" &&
                    "We believe in collective empowerment and collaboration for shared success."}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- */}

      {/* === Team Section === */}
      <section className="py-20 px-8">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-green-900 mb-12"
          >
            Meet Our Team
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
            {teamMembers.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                className="flex flex-col items-center bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition"
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  width={150}
                  height={150}
                  className="rounded-full object-cover mb-4"
                />
                <h3 className="text-lg font-semibold text-green-900">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}