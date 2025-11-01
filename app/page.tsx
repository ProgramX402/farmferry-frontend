"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sprout, Tractor, Droplets, BarChart3, GraduationCap, Users, Play } from "lucide-react";
import FAQSection from "@/components/FaqSection";
import Newsletter from "@/components/Newsletter";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

// === Typewriter Effect Helper ===
interface TypewriterTextProps {
  text: string;
  speed?: number;
}

function TypewriterText({ text, speed = 40 }: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, index));
      index++;
      if (index > text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);
  return <p className="text-lg md:text-xl italic text-green-100">{displayedText}</p>;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const pageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" as const } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  useEffect(() => {
    document.body.style.overflowX = "hidden";
    return () => {
      document.body.style.overflowX = "auto";
    };
  }, []);

  const handlePlayVideo = () => {
    setIsVideoPlaying(true);
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="overflow-x-hidden w-full"
    >
      {/* === Hero Section === */}
      <section className="relative flex min-h-screen flex-col-reverse md:flex-row items-center justify-center bg-green-900 text-white px-6 sm:px-10 py-20">
        {/* Background Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-green-900 to-green-900 opacity-95 z-0"></div>

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12 w-full">
          {/* Left Text */}
          <motion.div
            className="flex-1 space-y-6 text-center md:text-left"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
              Empowering Farmers, Growing the Future 🌱
            </h1>
            <p className="text-lg text-green-100 max-w-md mx-auto md:mx-0">
              We help small-scale farmers increase productivity, access markets,
              and build sustainable livelihoods using modern agricultural
              technology and community support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a
                href="/services"
                className="bg-white text-green-900 font-semibold px-6 py-3 rounded-lg hover:bg-green-100 transition"
              >
                Get Started
              </a>
              <a
                href="/about"
                className="border border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-800 transition"
              >
                Learn More
              </a>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            className="flex-1 flex justify-center"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Image
              src="/hero-img.jpg"
              alt="Farmer illustration"
              width={500}
              height={400}
              priority
              className="w-full h-auto max-w-[450px] sm:max-w-[500px] rounded-xl shadow-2xl"
            />
          </motion.div>
        </div>
      </section>

      {/* === About Us Section === */}
      <section className="bg-white text-gray-900 py-20 px-6 sm:px-10 overflow-x-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          {/* Left Image */}
          <motion.div
            className="flex-1 flex justify-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Image
              src="/about-img.jpg"
              alt="Farmer working in the field"
              width={500}
              height={400}
              className="rounded-xl shadow-lg object-cover w-full h-auto max-w-[450px] sm:max-w-[500px]"
            />
          </motion.div>

          {/* Right Text + Tabs */}
          <motion.div
            className="flex-1 space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-green-900 text-center md:text-left">
              About Us
            </h2>

            {/* Tabs */}
            <div className="relative flex justify-center md:justify-start border-b border-gray-200 mb-4 flex-wrap">
              {["overview", "vision", "mission"].map((tab) => {
                const label =
                  tab === "overview"
                    ? "Overview"
                    : tab === "vision"
                    ? "Our Vision"
                    : "Our Mission";
                const isActive = activeTab === tab;

                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`relative px-4 py-2 font-medium capitalize transition-colors ${
                      isActive
                        ? "text-green-900"
                        : "text-gray-500 hover:text-green-800"
                    }`}
                  >
                    {label}
                    {isActive && (
                      <motion.div
                        layoutId="underline"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-green-900 rounded-full"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Animated Tab Content */}
            <div className="relative min-h-[200px]">
              <AnimatePresence mode="wait">
                {["overview", "vision", "mission"].map((tab) => {
                  if (tab !== activeTab) return null;

                  const content =
                    tab === "overview"
                      ? [
                          `At FarmFerry, we are dedicated to empowering farmers through innovation, technology, and sustainable practices. Our mission is to make agriculture more efficient, profitable, and eco-friendly — ensuring food security and prosperity for generations to come.`,
                          `We partner with local communities, agricultural experts, and NGOs to deliver training, resources, and digital tools that help farmers reach their full potential.`,
                        ]
                      : tab === "vision"
                      ? [
                          `Our vision is to create a world where every farmer — regardless of size, location, or background — has the tools, knowledge, and opportunities to thrive sustainably.`,
                          `We believe in bridging traditional wisdom with modern technology, building resilient food systems that nurture people and the planet alike.`,
                        ]
                      : [
                          `Our mission is to empower rural communities by providing access to modern farming tools, education, and fair market opportunities.`,
                          `Through innovation and collaboration, we aim to increase productivity, improve food security, and foster environmental stewardship for a greener tomorrow.`,
                        ];

                  return (
                    <motion.div
                      key={tab}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-4 md:absolute inset-0"
                    >
                      {content.map((p, i) => (
                        <p key={i} className="text-lg text-gray-700 leading-relaxed">
                          {p}
                        </p>
                      ))}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Learn More Button */}
            <motion.a
              href="/about"
              className="inline-block bg-green-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Learn More
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* === Our Services Section === */}
      <section className="bg-gray-50 py-20 px-6 sm:px-10 overflow-x-hidden">
        <div className="max-w-7xl mx-auto text-center space-y-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-green-900">Our Services</h2>
            <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
              We provide innovative agricultural solutions to help farmers thrive —
              from technology access to sustainable farming support.
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
            {[
              {
                icon: "🌾",
                title: "Smart Farming Solutions",
                text: "We offer data-driven tools that help farmers monitor crops, optimize irrigation, and increase yields sustainably.",
              },
              {
                icon: "🚜",
                title: "Modern Equipment Access",
                text: "Our platform connects farmers with affordable leasing options for tractors and other essential farming machinery.",
              },
              {
                icon: "💧",
                title: "Sustainable Agriculture",
                text: "We promote eco-friendly practices that conserve water, enrich soil health, and reduce environmental impact.",
              },
              {
                icon: "📈",
                title: "Market Access & Insights",
                text: "Get connected to local and global markets with real-time pricing data and supply chain partnerships.",
              },
              {
                icon: "🎓",
                title: "Training & Capacity Building",
                text: "Empowering farmers through education, workshops, and mentorship programs for sustainable growth.",
              },
              {
                icon: "🤝",
                title: "Community Development",
                text: "We work with cooperatives and NGOs to build strong networks that support shared prosperity.",
              },
            ].map((service, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-xl shadow-md p-8 text-left hover:shadow-lg transition transform hover:-translate-y-2"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-semibold text-green-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">{service.text}</p>
              </motion.div>
            ))}
          </div>

          {/* Learn More Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <a
              href="/services"
              className="inline-block mt-10 bg-green-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-800 transition"
            >
              Learn More
            </a>
          </motion.div>
        </div>
      </section>

      {/* === Founder Section === */}
      <section className="bg-green-900 text-white py-20 px-6 sm:px-10 overflow-x-hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="flex-1 flex justify-center"
          >
            <Image
              src="/founder2.jpg"
              alt="Founder"
              width={400}
              height={400}
              className="rounded-2xl shadow-xl object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="flex-1 text-center md:text-left space-y-6"
          >
            <h2 className="text-4xl font-bold">A Word from Our Founder</h2>
            <TypewriterText
              text={`"Farming is not just an occupation — it's a legacy. At FarmFerry, we're building a bridge between tradition and technology to ensure that every seed planted today nurtures a brighter, greener tomorrow."`}
            />
            <div className="mt-6">
              <p className="font-semibold text-green-200">— Enoch Tyulen</p>
              <p className="text-sm text-green-300">Founder & CEO, FarmFerry</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* === Testimonials Section === */}
      <section className="bg-gray-50 py-20 px-6 sm:px-10 overflow-x-hidden">
        <div className="max-w-7xl mx-auto text-center space-y-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-green-900"
          >
            What Our Farmers Say
          </motion.h2>

          <div className="w-full max-w-5xl mx-auto">
            <Swiper
              spaceBetween={30}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              autoplay={{ delay: 3500, disableOnInteraction: false }}
              loop={true}
              pagination={{ clickable: true }}
            >
              {[
                {
                  name: "John Musa",
                  location: "Kaduna, Nigeria",
                  text: "FarmFerry transformed the way I manage my farm. Their training helped me double my yields in one season!",
                },
                {
                  name: "Grace Nwosu",
                  location: "Enugu, Nigeria",
                  text: "I now sell my produce to bigger markets thanks to their market access program. Truly life-changing!",
                },
                {
                  name: "Tunde Afolabi",
                  location: "Oyo, Nigeria",
                  text: "The team really cares about farmers' growth. The community support is unmatched.",
                },
                {
                  name: "Mary Akpan",
                  location: "Cross River, Nigeria",
                  text: "Their sustainability practices have helped restore soil health on my farm — my crops have never looked better!",
                },
                {
                  name: "Samuel Danjuma",
                  location: "Plateau, Nigeria",
                  text: "Access to modern tools and guidance through FarmFerry made me more confident as a farmer.",
                },
                {
                  name: "Chinwe Okeke",
                  location: "Anambra, Nigeria",
                  text: "Thanks to their workshops, I learned how to use smart irrigation systems effectively.",
                },
              ].map((t, i) => (
                <SwiperSlide key={i}>
                  <motion.div
                    className="bg-white shadow-md rounded-xl p-8 mx-2 h-full flex flex-col justify-between"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <p className="text-gray-700 italic mb-6">"{t.text}"</p>
                    <div>
                      <h4 className="font-semibold text-green-900">{t.name}</h4>
                      <p className="text-sm text-gray-500">{t.location}</p>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
      
      {/* === Video Section === */}
      <section className="bg-white py-20 px-6 sm:px-10 overflow-x-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center space-y-6 mb-12"
          >
            <h2 className="text-4xl font-bold text-green-900">See Our Work in Action</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Watch how FarmFerry is transforming agriculture and empowering farmers across Nigeria. 
              Our innovative approach combines traditional wisdom with modern technology to create sustainable solutions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl bg-gray-100"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 to-green-700/20 z-10 pointer-events-none"></div>
            
            {/* YouTube Embed - Responsive */}
            <div className="absolute inset-0 w-full h-full">
              {!isVideoPlaying ? (
                <div className="relative w-full h-full">
                  <Image
                    src="/video-thumbnail.jpg" // Use a local image in your public folder
                    alt="FarmFerry Video Thumbnail"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30"></div>
                </div>
              ) : (
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/ofR3XAZGx9o?si=mo9mPxHFmG8E8ED0&autoplay=1&controls=1&mute=0&loop=1&playlist=ofR3XAZGx9o&modestbranding=1&rel=0"
                  title="FarmFerry - Empowering Farmers"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              )}
            </div>
            
            {/* Custom Play Button Overlay */}
            {!isVideoPlaying && (
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <motion.button
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-white/90 rounded-full p-5 shadow-lg hover:bg-white transition-colors"
                  onClick={handlePlayVideo}
                >
                  <Play size={36} className="text-green-900 fill-green-900 ml-1" />
                </motion.button>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <p className="text-gray-600 mb-6">
              Join our community of farmers and supporters. Subscribe to our YouTube channel for more updates.
            </p>
            <a
              href="https://www.youtube.com/channel/your-channel-id"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
              </svg>
              Subscribe to Our Channel
            </a>
          </motion.div>
        </div>
      </section>
      
      <FAQSection />
      <Newsletter />
    </motion.div>
  );
}