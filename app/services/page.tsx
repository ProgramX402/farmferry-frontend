"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tractor,
  Sprout,
  Leaf,
  X,
  ChevronLeft,
  ChevronRight,
  Send,
  Clock,
  MapPin,
  UserCheck,
  ArrowRight,
} from "lucide-react";

// *** IMAGE PLACEHOLDER GUIDES - REPLACE THESE WITH YOUR ACTUAL IMAGE URLs ***
const PLACEHOLDERS = {
  HERO_BACKGROUND: "/people.jpg",
  GREENHOUSE_1: "/gh1.jpg",
  GREENHOUSE_2: "/gh2.jpg",
  GREENHOUSE_3: "/gh3.jpg",
  SEEDLINGS_1: "/seed1.jpg",
  SEEDLINGS_2: "/seed2.jpg",
  SEEDLINGS_3: "/seed3.jpg",
  TRAINING_1: "/training1.jpg",
  TRAINING_2: "/training2.jpg",
  TRAINING_3: "/training3.jpg",
  CONSULTANCY_1: "/con1.jpg",
  CONSULTANCY_2: "/con2.jpg",
  CONSULTANCY_3: "/con3.jpg",
};

// *** FORMSPREE INTEGRATION ***
// Replace this with your actual Formspree form endpoint
// Create different forms for different service types if needed
const FORMSPREE_ENDPOINTS = {
  order: "https://formspree.io/f/xqajqdag", // Replace with your actual form ID
  consultation: "https://formspree.io/f/xqajqdag", // Replace with your actual form ID
  inquiry: "https://formspree.io/f/xqajqdag", // Replace with your actual form ID
  registration: "https://formspree.io/f/xqajqdag", // Replace with your actual form ID
};

// Interface for type safety
interface Service {
  icon: any;
  title: string;
  description: string;
  details: string;
  images: string[];
  formType: "order" | "consultation" | "inquiry" | "registration";
  packages?: { title: string; items: { name: string; price: string; icon: any }[] }[];
}

// --- STRUCTURED PACKAGE DATA ---
const consultancyPackages = [
  {
    title: "Virtual Consultation (Online)",
    items: [
      { name: "30 Minutes", price: "₦15,000", icon: Clock },
      { name: "1 Hour", price: "₦25,000", icon: Clock },
      { name: "2 Hours", price: "₦35,000", icon: Clock },
      { name: "Flexible Session", price: "₦40,000", icon: Clock },
    ],
  },
  {
    title: "Physical Consultation & Assessment",
    items: [
      { name: "Base Visit (Within City)", price: "₦50,000", icon: MapPin },
      { name: "Extended Visit (Outside City)", price: "₦150,000 + Logistics", icon: MapPin },
      { name: "Comprehensive Farm Assessment & Report", price: "₦150,000", icon: UserCheck },
    ],
  },
];

const trainingPackages = [
  {
    title: "Physical Trainings (Greenhouse Focus)",
    items: [
      { name: "3-Day Comprehensive Training (Per Participant)", price: "₦150,000", icon: UserCheck },
      { name: "Group Package (5+ participants)", price: "Negotiable", icon: UserCheck },
    ],
  },
  {
    title: "Online Trainings (Modules)",
    items: [
      { name: "Single Module (1.5 hours)", price: "₦30,000", icon: Clock },
      { name: "3-Module Package", price: "₦50,000", icon: Clock },
      { name: "Full Course (6 Modules + Certificate)", price: "₦100,000", icon: Clock },
    ],
  },
  {
    title: "Intensive Internships",
    items: [
      { name: "1-Month Internship Program", price: "₦250,000", icon: UserCheck },
      { name: "3-Month Internship Program", price: "₦350,000", icon: UserCheck },
    ],
  },
];

// *** SERVICES LIST (UPDATED - Removed Fresh Farm Produce and Farm Inputs) ***
const services: Service[] = [
  {
    icon: Sprout,
    title: "Greenhouse Set Up",
    description: "Full-service design and construction of modern greenhouse systems.",
    details: "We handle end-to-end greenhouse installation. Options include: **Wooden Structures** and **Galvanized Structures**. We ensure climate efficiency for year-round, high productivity. Request a quote below for a customized installation plan.",
    images: [PLACEHOLDERS.GREENHOUSE_1, PLACEHOLDERS.GREENHOUSE_2, PLACEHOLDERS.GREENHOUSE_3],
    formType: "inquiry",
  },
  {
    icon: Sprout,
    title: "High-Quality Seedlings",
    description: "Certified, disease-resistant seedlings for optimal crop performance.",
    details: "Our nurseries supply improved seedlings. Available varieties include: **Bellpeppers**, **Habaneros**, **Chilis**, and **Tomatoes**. We ensure strong germination and consistent growth results.",
    images: [PLACEHOLDERS.SEEDLINGS_1, PLACEHOLDERS.SEEDLINGS_2, PLACEHOLDERS.SEEDLINGS_3],
    formType: "order",
  },
  {
    icon: Sprout,
    title: "Training Programs",
    description: "Empowering farmers with modern agricultural knowledge and skills.",
    details: "We organize field workshops, demo sessions, and agribusiness mentorships covering crop management, greenhouse farming, and efficiency. See our detailed packages below for online, physical, and intensive internship options.",
    images: [PLACEHOLDERS.TRAINING_1, PLACEHOLDERS.TRAINING_2, PLACEHOLDERS.TRAINING_3],
    formType: "registration",
    packages: trainingPackages,
  },
  {
    icon: Sprout,
    title: "Consultancy Services",
    description: "Expert guidance for agribusiness startups and farm expansion.",
    details: "Our agronomists and consultants provide in-depth support for farm planning, irrigation design, crop selection, and business strategy—ensuring data-driven growth decisions. See our fixed-rate virtual and on-site packages below.",
    images: [PLACEHOLDERS.CONSULTANCY_1, PLACEHOLDERS.CONSULTANCY_2, PLACEHOLDERS.CONSULTANCY_3],
    formType: "consultation",
    packages: consultancyPackages,
  },
];

// --- DYNAMIC FORM COMPONENT WITH FORMSPREE INTEGRATION ---
const ServiceForm: React.FC<{ serviceTitle: string; formType: Service["formType"]; packages?: Service["packages"] }> = ({
  serviceTitle,
  formType,
  packages,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");
    setSubmitError("");

    const formData = new FormData(e.target as HTMLFormElement);
    
    // Add service type to form data
    formData.append("service_type", serviceTitle);
    formData.append("form_type", formType);

    try {
      const response = await fetch(FORMSPREE_ENDPOINTS[formType], {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setSubmitMessage(`Success! Your request for "${serviceTitle}" has been received. We'll be in touch.`);
        (e.target as HTMLFormElement).reset();
      } else {
        const data = await response.json();
        if (data.errors) {
          setSubmitError(data.errors.map((error: any) => error.message).join(", "));
        } else {
          setSubmitError("Oops! There was a problem submitting your form. Please try again.");
        }
      }
    } catch (error) {
      setSubmitError("Oops! There was a problem submitting your form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFormSpecifics = () => {
    switch (formType) {
      case "order":
        return {
          heading: `Place Your Order for ${serviceTitle}`,
          buttonText: "Place Order",
          specificFields: (
            <>
              <input
                type="text"
                name="product_quantity"
                placeholder="Product/Quantity (e.g., 50kg Bellpeppers)"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              />
              <textarea
                name="notes"
                placeholder="Delivery Address / Additional Notes"
                rows={2}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              ></textarea>
            </>
          ),
        };
      case "consultation":
        return {
          heading: "Book Your Expert Consultation",
          buttonText: "Book Consultation",
          specificFields: (
            <>
              {packages && (
                <select
                  name="package_selection"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 appearance-none"
                >
                  <option value="">Select a Consultation Package *</option>
                  {packages.map((group) => (
                    <optgroup label={group.title} key={group.title}>
                      {group.items.map((item) => (
                        <option key={item.name} value={`${item.name} - ${item.price}`}>
                          {item.name} - {item.price}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              )}
              <input
                type="date"
                name="preferred_date"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              />
            </>
          ),
        };
      case "registration":
        return {
          heading: `Register for ${serviceTitle}`,
          buttonText: "Register Now",
          specificFields: (
            <>
              {packages && (
                <select
                  name="package_selection"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 appearance-none"
                >
                  <option value="">Select a Training Program *</option>
                  {packages.map((group) => (
                    <optgroup label={group.title} key={group.title}>
                      {group.items.map((item) => (
                        <option key={item.name} value={`${item.name} - ${item.price}`}>
                          {item.name} - {item.price}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              )}
              <input
                type="number"
                name="attendees"
                placeholder="Number of Attendees"
                min="1"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              />
            </>
          ),
        };
      case "inquiry":
      default:
        return {
          heading: `Request a Quote for ${serviceTitle}`,
          buttonText: "Send Inquiry",
          specificFields: (
            <>
              <input
                type="text"
                name="project_scope"
                placeholder="Project Scope / Farm Location"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              />
              <textarea
                name="requirements"
                placeholder="Detailed Project Requirements"
                rows={2}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              ></textarea>
            </>
          ),
        };
    }
  };

  const { heading, buttonText, specificFields } = getFormSpecifics();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.5 }}
      className="mt-6 border-t border-green-200 pt-6 w-full"
    >
      <h4 className="text-xl font-bold text-green-900 mb-4">{heading}</h4>
      
      {submitMessage ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-green-100 text-green-800 p-4 rounded-lg font-semibold"
        >
          {submitMessage} 🎉
        </motion.div>
      ) : submitError ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-red-100 text-red-800 p-4 rounded-lg font-semibold"
        >
          {submitError}
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Universal Fields */}
          <input
            type="text"
            name="full_name"
            placeholder="Your Full Name"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email Address"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number (Optional)"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
          />

          {/* Service-Specific Fields */}
          {specificFields}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting}
            className={`w-full flex items-center justify-center space-x-2 text-white px-6 py-3 rounded-lg transition font-semibold ${
              isSubmitting
                ? "bg-green-500 cursor-not-allowed"
                : "bg-green-900 hover:bg-green-800"
            }`}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <Send size={18} />
                <span>{buttonText}</span>
              </>
            )}
          </motion.button>
        </form>
      )}
    </motion.div>
  );
};

// --- PACKAGE DISPLAY COMPONENT ---
const PackageDisplay: React.FC<{ packages: Service["packages"] }> = ({ packages }) => {
  if (!packages || packages.length === 0) return null;

  return (
    <div className="w-full mt-4 p-4 bg-green-50 rounded-lg shadow-inner">
      <h4 className="text-xl font-bold text-green-900 mb-4 border-b border-green-200 pb-2">
        Available Packages & Pricing
      </h4>
      <div className="space-y-6">
        {packages.map((group) => (
          <div key={group.title} className="p-3 border border-green-100 rounded-md bg-white">
            <h5 className="text-lg font-semibold text-green-800 mb-3 flex items-center">
              {group.title}
            </h5>
            <ul className="space-y-2">
              {group.items.map((item) => {
                const ItemIcon = item.icon;
                return (
                  <li
                    key={item.name}
                    className="flex justify-between items-start text-sm md:text-base border-b border-gray-100 last:border-b-0 pb-2"
                  >
                    <span className="flex items-center text-gray-700">
                      <ItemIcon size={16} className="text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      {item.name}
                    </span>
                    <span className="font-bold text-green-900 ml-4 flex-shrink-0">
                      {item.price}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-4 italic">
        * Payment is made in advance to secure your slot. Group discounts and customized packages are negotiable.
      </p>
    </div>
  );
};

// Image Slider Component
const ImageSlider: React.FC<{ images: string[]; title: string }> = ({ images, title }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full overflow-hidden rounded-xl h-56 md:h-72 mb-6 shadow-lg">
      <AnimatePresence initial={false} mode="wait">
        <motion.img
          key={currentSlide}
          src={images[currentSlide]}
          alt={`${title} - Image ${currentSlide + 1}`}
          className="w-full h-full object-cover"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
        />
      </AnimatePresence>

      {/* Navigation Buttons */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 transition z-10"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 transition z-10"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide ? "w-6 bg-white" : "w-2 bg-white/50"
              }`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Animation variant
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
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <main className="bg-white text-gray-900 overflow-hidden relative">
      {/* === Hero Section with Image Background === */}
      <section className="relative text-white py-32 md:py-40 px-6 md:px-12 text-center overflow-hidden min-h-[80vh] flex items-center justify-center">
        
        {/* Background Image Layer */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${PLACEHOLDERS.HERO_BACKGROUND})` }}
        >
          {/* Dark Overlay for Readability (green-900) */}
          <div className="absolute inset-0 bg-green-900 opacity-80"></div>
        </div>

        {/* Floating Icons (Z-index 20) */}
        <motion.div
          className="absolute top-[15%] left-[8%] opacity-20 hidden sm:block z-20"
          variants={floatFarmVariant}
          animate="animate"
        >
          <Tractor size={80} className="text-green-300" />
        </motion.div>

        <motion.div
          className="absolute bottom-[20%] right-[10%] opacity-20 hidden sm:block z-20"
          variants={floatFarmVariant}
          animate="animate"
        >
          <Sprout size={65} className="text-green-300" />
        </motion.div>

        <motion.div
          className="absolute top-[30%] right-[18%] opacity-20 hidden sm:block z-20"
          variants={floatFarmVariant}
          animate="animate"
        >
          <Leaf size={55} className="text-green-300" />
        </motion.div>

        {/* Text Container (Z-index 30) */}
        <div className="relative z-30 max-w-3xl mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-6"
          >
            Our Comprehensive Services 🚜
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg sm:text-xl md:text-2xl text-green-100 leading-relaxed"
          >
            Empowering agribusinesses and farmers with modern tools, training,
            and expert support to grow sustainably.
          </motion.p>
        </div>
      </section>

      {/* === Services Grid (MODIFIED) === */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10">
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
                <p className="text-gray-700 mb-6 flex-grow">{service.description}</p>
                
                {/* === Dedicated "View Details" Button === */}
                <button
                  onClick={() => setSelectedService(service)}
                  aria-label={`View details for ${service.title}`}
                  className="mt-auto flex items-center justify-center space-x-2 text-green-900 font-semibold px-4 py-2 border-2 border-green-900 rounded-lg hover:bg-green-100 transition duration-200 w-full"
                >
                  <span>View Details</span>
                  <ArrowRight size={20} />
                </button>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* === Modal (Updated with ImageSlider and Form) === */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl p-6 md:p-8 max-w-xl mx-auto relative shadow-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 text-gray-600 hover:text-green-700 z-20 p-2 bg-white rounded-full"
              >
                <X size={24} />
              </button>

              <div className="flex flex-col items-center">
                {/* Image Slider */}
                <ImageSlider
                  images={selectedService.images}
                  title={selectedService.title}
                />

                <h3 className="text-3xl font-bold text-green-900 mb-4">
                  {selectedService.title}
                </h3>
                <p className="text-gray-700 mb-3 text-center">
                  {selectedService.details}
                </p>

                {/* PACKAGE DISPLAY (For Consultancy/Training) */}
                <PackageDisplay packages={selectedService.packages} />
                
                {/* DYNAMIC FORM INTEGRATION */}
                <ServiceForm
                  serviceTitle={selectedService.title}
                  formType={selectedService.formType}
                  packages={selectedService.packages}
                />
                
                <button
                  onClick={() => setSelectedService(null)}
                  className="mt-6 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition font-semibold w-full"
                >
                  Close Details
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