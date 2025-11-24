"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const BACKGROUND = '/produce.jpg'

const teamMembers = [
  {
    name: "Enoch Tyulen",
    role: "Founder & CEO",
    image: "/founder.jpg",
  },
  {
    name: "Tersoo Aga PhD",
    role: "Principal Advisor",
    image: "/founder.jpg",
  },
  {
    name: "Jacob Ishaya",
    role: "General Manager",
    image: "/founder.jpg",
  },
  {
    name: "Lilian Luka",
    role: "Administrative Director",
    image: "/founder.jpg",
  },
  {
    name: "Nanwal Peter",
    role: "Greenhouse Manager",
    image: "/founder.jpg",
  },
  {
    name: "Jedidiah Nansel",
    role: "Production Officer",
    image: "/founder.jpg",
  },
  {
    name: "Glory Kogi",
    role: "Research and Development Agronomist",
    image: "/founder.jpg",
  },
  {
    name: "Juliet John",
    role: "Finance and Accounts Clerk",
    image: "/founder.jpg",
  },
  {
    name: "Daniel Sule",
    role: "Lead Programmer",
    image: "/founder.jpg",
  },
  {
    name: "Seth Ozigi",
    role: "Marketing and Brand Specialist",
    image: "/founder.jpg",
  },
  {
    name: "Fortress Michael",
    role: "Web/e-commerce developer",
    image: "/founder.jpg",
  },
   {
    name: "Peter Ishaya",
    role: "Agri-data & Performance Analyst",
    image: "/founder.jpg",
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
     {/* === Hero Section (Clean & Fixed) === */}
<section className="relative text-white py-32 md:py-52 px-8 text-center overflow-hidden min-h-[70vh] flex items-center justify-center">

  {/* Background */}
  <div
    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
    style={{
      backgroundImage: `url(${BACKGROUND})`,
    }}
  >
    <div className="absolute inset-0 bg-green-900/70"></div>
  </div>

  {/* FLOATING CIRCLES */}
  <motion.div
    className="absolute top-1/4 left-[5%] h-16 w-16 bg-white/10 rounded-full z-10"
    animate={{ y: [0, -20, 0] }}
    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
  />

  <motion.div
    className="absolute bottom-1/4 right-[10%] h-8 w-8 bg-white/10 rounded-full z-10"
    animate={{ y: [0, -15, 0] }}
    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
  />

  <motion.div
    className="absolute top-[10%] right-[30%] h-10 w-10 bg-white/10 rounded-full z-10"
    animate={{ y: [0, -12, 0] }}
    transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
  />

  <motion.div
    className="absolute bottom-[5%] left-[20%] h-24 w-24 bg-white/10 rounded-full z-10"
    animate={{ y: [0, -25, 0] }}
    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
  />

  {/* CONTENT */}
  <div className="relative z-20 max-w-4xl mx-auto">
    <motion.h1
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-5xl md:text-8xl font-extrabold mb-6"
    >
      About Us
    </motion.h1>

    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.8 }}
      className="max-w-3xl mx-auto text-lg md:text-2xl text-green-100 font-medium"
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
           At Farm Ferry, we are committed to redefining agriculture through innovation, inclusion, and 
           empowerment. We provide farm-fresh produce, greenhouse setups, high-quality seedlings, and reliable 
           farm inputs. Through our hands-on training and expert consultancy, we equip young farmers and 
           agripreneurs with the knowledge, tools, and opportunities to drive food security, create jobs, and build a sustainable agricultural future.
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
            To be Africa’s leading youth-driven hub for sustainable agriculture — empowering young people, transforming communities, and 
            ensuring access to safe, fresh, and nutritious food for all.
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
            transition={{ duration: 0.2 }}
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