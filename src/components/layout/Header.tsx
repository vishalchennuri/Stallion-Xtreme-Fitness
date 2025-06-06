"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../ui/Logo";
import { Menu, X, Phone, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname(); // Get the current path

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu function
  const closeMenu = () => {
    setMobileMenuOpen(false);
    document.body.style.overflow = ""; // Restore scrolling
  };

  // Handle click outside to close menu
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click is on the menu content or on the backdrop
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    // Add event listener for outside clicks
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuOpen]);

  // Toggle mobile menu and manage body scroll lock
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);

    // Toggle body scroll lock
    if (!mobileMenuOpen) {
      document.body.style.overflow = "hidden"; // Lock scrolling when menu is open
    } else {
      document.body.style.overflow = ""; // Restore scrolling when menu is closed
    }
  };

  // Make sure to unlock body scroll when component unmounts
  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Animation variants
  const menuItemVariants = {
    closed: { opacity: 0, y: -10 },
    open: { opacity: 1, y: 0 },
  };

  // Helper function to determine if a link is active
  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 py-4 transition-all duration-300 ${
          scrolled ? "bg-black/80 backdrop-blur-sm" : ""
        }`}
      >
        <div className="mx-auto px-4 md:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Logo />

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white focus:outline-none relative z-50"
              onClick={toggleMobileMenu}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6 text-white">
              <Link
                href="/"
                className={`transition text-xs md:text-base font-[modernist] ${
                  isActive("/") ? "text-[#e71b4b]" : "text-white hover:text-[#e71b4b]"
                }`}
              >
                Home
              </Link>
              <Link
                href="/about-us"
                className={`transition text-xs md:text-base font-[modernist] ${
                  isActive("/about-us") ? "text-[#e71b4b]" : "text-white hover:text-[#e71b4b]"
                }`}
              >
                About Us
              </Link>
              <Link
                href="/events"
                className={`transition text-xs md:text-base font-[modernist] ${
                  isActive("/events") ? "text-[#e71b4b]" : "text-white hover:text-[#e71b4b]"
                }`}
              >
                Events
              </Link>
              <Link
                href="/branches"
                className={`transition text-xs md:text-base font-[modernist] ${
                  isActive("/branches") ? "text-[#e71b4b]" : "text-white hover:text-[#e71b4b]"
                }`}
              >
                Branches
              </Link>
              <Link
                href="/stallions"
                className={`transition text-xs md:text-base font-[modernist] ${
                  isActive("/stallions") ? "text-[#e71b4b]" : "text-white hover:text-[#e71b4b]"
                }`}
              >
                Stallion Classic
              </Link>
            </nav>

            {/* Contact Button - Desktop Only */}
            <div className="hidden md:block">
              <Link
                href="/contact"
                className={`px-4 py-2 transition md:text-base ${
                  isActive("/contact")
                    ? "bg-[#e71b4b] text-white"
                    : "bg-[#e71b4b] text-white hover:bg-opacity-90"
                }`}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu - Completely separate from header */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/95 overflow-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close button (X) outside of the menu content */}
            <button
              className="absolute top-4 right-4 text-white focus:outline-none z-50"
              onClick={closeMenu}
              aria-label="Close Menu"
            >
              <X className="h-6 w-6" />
            </button>

            <div
              ref={menuRef}
              className="flex flex-col items-center justify-center min-h-screen py-16"
            >
              {/* Logo in Mobile Menu */}
              <div className="mb-8">
                <Logo />
              </div>

              <motion.div
                className="flex flex-col items-center gap-5"
                initial="closed"
                animate="open"
                variants={{
                  open: {
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
              >
                <motion.div variants={menuItemVariants}>
                  <Link
                    href="/"
                    className={`transition text-xl font-[modernist] ${
                      isActive("/") ? "text-[#e71b4b]" : "text-white hover:text-[#e71b4b]"
                    }`}
                    onClick={closeMenu}
                  >
                    Home
                  </Link>
                </motion.div>

                <motion.div variants={menuItemVariants}>
                  <Link
                    href="/about-us"
                    className={`transition text-xl font-[modernist] ${
                      isActive("/about-us") ? "text-[#e71b4b]" : "text-white hover:text-[#e71b4b]"
                    }`}
                    onClick={closeMenu}
                  >
                    About Us
                  </Link>
                </motion.div>

                <motion.div variants={menuItemVariants}>
                  <Link
                    href="/events"
                    className={`transition text-xl font-[modernist] ${
                      isActive("/events") ? "text-[#e71b4b]" : "text-white hover:text-[#e71b4b]"
                    }`}
                    onClick={closeMenu}
                  >
                    Events
                  </Link>
                </motion.div>

                <motion.div variants={menuItemVariants}>
                  <Link
                    href="/branches"
                    className={`transition text-xl font-[modernist] ${
                      isActive("/branches") ? "text-[#e71b4b]" : "text-white hover:text-[#e71b4b]"
                    }`}
                    onClick={closeMenu}
                  >
                    Branches
                  </Link>
                </motion.div>

                <motion.div variants={menuItemVariants}>
                  <Link
                    href="/stallions"
                    className={`transition text-xl font-[modernist] ${
                      isActive("/stallions") ? "text-[#e71b4b]" : "text-white hover:text-[#e71b4b]"
                    }`}
                    onClick={closeMenu}
                  >
                    Stallion Classic
                  </Link>
                </motion.div>

                <motion.div
                  className="pt-6 flex flex-col gap-4 items-center w-full"
                  variants={menuItemVariants}
                >
                  <Link
                    href="/contact"
                    className={`px-8 py-3 flex items-center justify-center transition text-base font-[modernist] w-64 ${
                      isActive("/contact")
                        ? "bg-[#e71b4b] text-white"
                        : "bg-[#e71b4b] text-white hover:bg-opacity-90"
                    }`}
                    onClick={closeMenu}
                  >
                    Contact Us <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>

                  <Link
                    href="tel:+91 8885110136"
                    className="border border-white text-white px-8 py-3 flex items-center justify-center hover:bg-white/10 transition text-base w-64"
                    onClick={closeMenu}
                  >
                    <Phone className="mr-2 h-4 w-4" /> Call Us
                  </Link>
                </motion.div>
              </motion.div>

              {/* Social Links */}
              <motion.div
                className="flex gap-4 mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#e71b4b] transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#e71b4b] transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="5"
                      ry="5"
                    ></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                {/* YouTube */}
                <a
                  href="https://youtube.com/@stallionxtremefitness?si=qZgnUTp4IHMprTuo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#e71b4b] transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                  </svg>
                </a>

                {/* Twitter/X
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#e71b4b] transition">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </a> */}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}