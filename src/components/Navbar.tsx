"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Pricing", href: "#pricing" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 bg-gradient-to-br from-[#3B5BDB] to-[#6366F1] rounded-lg rotate-0 group-hover:rotate-6 transition-transform duration-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="relative z-10">
                  <path
                    d="M7.5 10.5C7.83329 10.9053 8.24898 11.2372 8.71906 11.4739C9.18913 11.7106 9.70356 11.8468 10.2292 11.8732C10.7548 11.8996 11.2808 11.8158 11.773 11.627C12.2652 11.4383 12.7126 11.1492 13.0875 10.7775L15.0875 8.7775C15.7637 8.07711 16.1349 7.14202 16.1252 6.17206C16.1155 5.20209 15.7259 4.27449 15.0354 3.58396C14.3449 2.89343 13.4173 2.50388 12.4473 2.4942C11.4773 2.48452 10.5422 2.85564 9.84183 3.53183L8.68183 4.68183"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.5 7.5C10.1667 7.09468 9.75099 6.76276 9.28092 6.52607C8.81085 6.28938 8.29642 6.15322 7.77078 6.12679C7.24513 6.10036 6.71918 6.18422 6.22696 6.37295C5.73474 6.56168 5.28737 6.85083 4.9125 7.2225L2.9125 9.2225C2.23627 9.92289 1.86515 10.858 1.87483 11.8279C1.88451 12.7979 2.27406 13.7255 2.96459 14.416C3.65512 15.1066 4.58272 15.4961 5.55269 15.5058C6.52265 15.5155 7.45775 15.1443 8.15814 14.4682L9.31064 13.3182"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <span className="font-bold text-xl text-slate-900 tracking-tight">
              wrappp
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all duration-150"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="#dashboard"
              className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="#hero"
              className="relative overflow-hidden px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-[#3B5BDB] to-[#6366F1] rounded-lg shadow-md shadow-indigo-200/50 hover:shadow-indigo-300/60 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 btn-shimmer"
            >
              Get started free
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-5 h-5 flex flex-col justify-center gap-1.5">
              <span
                className={`block h-0.5 bg-current transition-all duration-300 ${
                  menuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`block h-0.5 bg-current transition-all duration-300 ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 bg-current transition-all duration-300 ${
                  menuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white border-t border-slate-100 px-6 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="px-3 py-2.5 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 mt-2 border-t border-slate-100 flex flex-col gap-2">
            <Link
              href="#"
              className="px-4 py-2.5 text-sm font-medium text-center text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="#hero"
              className="px-4 py-2.5 text-sm font-semibold text-center text-white bg-gradient-to-r from-[#3B5BDB] to-[#6366F1] rounded-lg"
            >
              Get started free
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
