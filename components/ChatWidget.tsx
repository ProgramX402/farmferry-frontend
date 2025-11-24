"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, X, Bot, Mail, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

// Helper function to format URLs as clickable links
const formatText = (text: string) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, (url) => {
    return `<a href="${url}" target="_blank" class="text-blue-500 hover:underline">${url}</a>`;
  });
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [showChatOptions, setShowChatOptions] = useState(true);
  const [showChatWindow, setShowChatWindow] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "👋 Hi! I'm FarmFerry's AI assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // === Auto-scroll to bottom ===
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // === Handle send ===
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.text }),
      });

      const resultText =
        response.ok
          ? (await response.json()).response ||
            "🤖 I'm not sure I understood that, could you rephrase?"
          : "⚠️ I'm having trouble responding right now. Please try again later.";

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: resultText,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text:
          "🚧 Sorry, I'm having trouble connecting right now. Please try again or reach us via WhatsApp or email.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // === UI State Management ===
  const toggleChat = () => {
    setOpen(!open);
    if (!open) {
      setShowChatOptions(true);
      setShowChatWindow(false);
    }
  };

  const openAIChat = () => {
    setShowChatOptions(false);
    setShowChatWindow(true);
  };

  const closeChatWindow = () => {
    setShowChatWindow(false);
    setShowChatOptions(true);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* === Chat Window === */}
      <AnimatePresence>
        {open && showChatWindow && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="mb-4 bg-white shadow-xl rounded-2xl border border-gray-200 w-80 h-96 flex flex-col"
          >
            {/* Header */}
            <div className="bg-green-900 text-white p-4 rounded-t-2xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot size={20} />
                <span className="font-semibold">Farm Ferry AI</span>
              </div>
              <button
                onClick={closeChatWindow}
                className="text-white hover:bg-green-800 rounded-full p-1 transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] rounded-2xl px-3 py-2 text-sm ${
                      message.sender === "user" ? "bg-green-900 text-white" : "bg-gray-100 text-gray-800"
                    }`}
                    dangerouslySetInnerHTML={{ __html: formatText(message.text) }}
                  />
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 rounded-2xl px-3 py-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <input
  type="text"
  value={inputValue}
  onChange={(e) => setInputValue(e.target.value)}
  onKeyPress={handleKeyPress}
  placeholder="Ask about farming..."
  className="flex-1 px-3 py-2 border border-gray-300 rounded-full text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
  disabled={isTyping}
/>

                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-green-900 text-white rounded-full p-2 hover:bg-green-800 transition disabled:opacity-50"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* === Chat Options Popup === */}
      <AnimatePresence>
        {open && showChatOptions && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="mb-4 bg-white shadow-xl rounded-2xl border border-gray-200 w-64 p-4 space-y-3"
          >
            <h3 className="text-green-900 font-semibold text-lg mb-2">Contact Us</h3>

            <button
              onClick={openAIChat}
              className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-green-50 transition"
            >
              <div className="p-2 bg-green-100 rounded-full">
                <Bot className="text-green-700" size={18} />
              </div>
              <span className="text-gray-700 text-sm font-medium">Chat with AI</span>
            </button>

            <a
              href="https://wa.me/2349138852544"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-green-50 transition"
            >
              <div className="p-2 bg-green-100 rounded-full">
                <FaWhatsapp className="text-green-700" size={18} />
              </div>
              <span className="text-gray-700 text-sm font-medium">Chat on WhatsApp</span>
            </a>

            <a
              href="tel:2349138852544"
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-green-50 transition"
            >
              <div className="p-2 bg-green-100 rounded-full">
                <Phone className="text-green-700" size={18} />
              </div>
              <span className="text-gray-700 text-sm font-medium">Call Us</span>
            </a>

            <a
              href="mailto:enochtyulen@gmail.com"
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-green-50 transition"
            >
              <div className="p-2 bg-green-100 rounded-full">
                <Mail className="text-green-700" size={18} />
              </div>
              <span className="text-gray-700 text-sm font-medium">Send an Email</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* === Floating Button === */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleChat}
        className="bg-green-900 text-white rounded-full p-4 shadow-lg hover:bg-green-800 transition"
      >
        <MessageCircle size={26} />
      </motion.button>
    </div>
  );
}
