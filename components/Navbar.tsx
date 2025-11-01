"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Detect scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = ["Home", "About", "Services", "Blogs"];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200"
          : "bg-green-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Container */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className={`text-2xl font-bold tracking-tight transition-colors duration-300 ${
              isScrolled ? "text-green-900" : "text-white"
            }`}
          >
            FarmFerry
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {links.map((item) => {
              const href =
                item.toLowerCase() === "home" ? "/" : `/${item.toLowerCase()}`;
              const isActive = pathname === href;

              return (
                <Link
                  key={item}
                  href={href}
                  className={`relative transition-colors duration-300 ${
                    isScrolled
                      ? isActive
                        ? "text-green-700 font-semibold"
                        : "text-gray-800 hover:text-green-700"
                      : isActive
                      ? "text-white font-semibold"
                      : "text-gray-200 hover:text-white"
                  }`}
                >
                  {item}

                  {/* Active underline indicator */}
                  {isActive && (
                    <span
                      className={`absolute -bottom-1 left-0 w-full h-[2px] rounded-full ${
                        isScrolled ? "bg-green-700" : "bg-white"
                      }`}
                    ></span>
                  )}
                </Link>
              );
            })}

            <Link
              href="/contact"
              className={`ml-4 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                isScrolled
                  ? "bg-green-700 text-white hover:bg-green-800"
                  : "bg-white text-green-900 hover:bg-gray-100"
              }`}
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 transition-colors ${
              isScrolled ? "text-green-900" : "text-white"
            }`}
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div
          className={`md:hidden border-t transition-all duration-300 ${
            isScrolled ? "bg-white/80 backdrop-blur-md" : "bg-green-900"
          }`}
        >
          <div className="px-4 py-3 space-y-2">
            {links.map((item) => {
              const href =
                item.toLowerCase() === "home" ? "/" : `/${item.toLowerCase()}`;
              const isActive = pathname === href;

              return (
                <Link
                  key={item}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className={`block transition-colors ${
                    isScrolled
                      ? isActive
                        ? "text-green-700 font-semibold"
                        : "text-gray-800 hover:text-green-700"
                      : isActive
                      ? "text-white font-semibold"
                      : "text-gray-200 hover:text-white"
                  }`}
                >
                  {item}
                </Link>
              );
            })}
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className={`block text-center px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                isScrolled
                  ? "bg-green-700 text-white hover:bg-green-800"
                  : "bg-white text-green-900 hover:bg-gray-100"
              }`}
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
