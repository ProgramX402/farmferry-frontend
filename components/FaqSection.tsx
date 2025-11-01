"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function FAQSection() {
  const faqs = [
    {
      question: "What services do you provide to farmers?",
      answer:
        "We offer digital tools, training, and access to equipment and markets that help farmers increase productivity and sustainability.",
    },
    {
      question: "How can small-scale farmers benefit from your platform?",
      answer:
        "Small-scale farmers gain access to modern farming techniques, financing opportunities, and partnerships that were previously out of reach.",
    },
    {
      question: "Do you operate in rural areas?",
      answer:
        "Yes, we focus on reaching rural farming communities with offline-friendly solutions and community-led support programs.",
    },
    {
      question: "Is there a cost to join your program?",
      answer:
        "Most of our training and community programs are free, while advanced tools or premium services have affordable subscription options.",
    },
    {
      question: "How can I get started?",
      answer:
        "Simply contact us through our website or visit one of our local partners to register and receive guidance on how to begin.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-20 px-6 sm:px-10 overflow-x-hidden">
      <div className="max-w-5xl mx-auto text-center space-y-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-green-900">Frequently Asked Questions</h2>
          <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
            Got questions? We’ve got answers. Learn more about how we empower farmers and rural communities.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4 mt-10 text-left">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-5 text-left text-lg font-medium text-green-900 focus:outline-none"
              >
                {faq.question}
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-6 h-6 text-green-800" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="px-5 pb-5 text-gray-700 overflow-hidden"
                  >
                    <p>{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
