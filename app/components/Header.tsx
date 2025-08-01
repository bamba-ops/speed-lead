"use client";

import React, { useState, useRef, useEffect } from "react";
import { Menu, X } from "lucide-react";

// Logo modernisé
const Logo = () => (
  <span className="flex items-center gap-2 select-none">
    <span className="w-9 h-9 bg-electric-teal rounded-xl flex items-center justify-center shadow-lg">
      <svg viewBox="0 0 32 32" className="w-5 h-5" fill="none">
        <circle cx="16" cy="16" r="13" fill="#000" />
        <path
          d="M15 10l-2 6h3l-1 6 5-8h-3l1-4z"
          fill="#19f3c6"
          stroke="#19f3c6"
          strokeWidth="1"
          strokeLinejoin="round"
        />
      </svg>
    </span>
    <span className="text-white font-black text-xl tracking-tight">
      Speed
      <span className="text-electric-teal">Lead</span>
    </span>
  </span>
);

const NAV = [
  { href: "#fonctionnalites", label: "Fonctionnalités" },
  { href: "#faq", label: "FAQ" },
];

const Header: React.FC = () => {
  const [menu, setMenu] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menu) return;
    const handle = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setMenu(false);
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [menu]);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menu]);

  return (
    <header className="fixed top-4 left-0 w-full z-50 pointer-events-none">
      <div className="max-w-3xl md:max-w-5xl xl:max-w-7xl mx-auto px-2 sm:px-6">
        <div className="bg-neutral-950/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex items-center justify-between px-3 sm:px-6 py-2 sm:py-3 pointer-events-auto">
          <Logo />
          <nav className="hidden md:flex items-center gap-8">
            {NAV.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-electric-teal transition font-medium px-1 py-0.5 focus:outline-none focus:text-electric-teal"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <a
            href="#demo"
            className="hidden md:inline-block bg-electric-teal text-black font-semibold px-6 py-2 rounded-full shadow hover:bg-teal-300 transition-colors"
          >
            Démo gratuite
          </a>
          <button
            className="md:hidden text-white p-2 rounded-lg focus:outline-none"
            onClick={() => setMenu(true)}
            aria-label="Ouvrir le menu"
          >
            <Menu className="w-7 h-7" />
          </button>
        </div>
      </div>
      {/* Menu mobile glassmorphism en bas */}
      <div
        className={`fixed inset-0 z-[999] bg-black/40 transition-all duration-300 ${menu ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        aria-hidden={!menu}
      >
        <div
          ref={ref}
          className={`fixed bottom-0 left-0 right-0 mx-auto w-full max-w-md rounded-t-3xl bg-neutral-950/90 border-t border-white/10 shadow-2xl p-6 flex flex-col gap-6 transition-all duration-300 ${
            menu ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <button
            className="absolute right-4 top-4 text-gray-400 hover:text-white"
            onClick={() => setMenu(false)}
            aria-label="Fermer"
          >
            <X className="w-7 h-7" />
          </button>
          <nav className="flex flex-col gap-4 mt-5">
            {NAV.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-100 text-lg font-semibold hover:text-electric-teal transition"
                onClick={() => setMenu(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <a
            href="#demo"
            className="block bg-electric-teal text-black font-bold text-center py-3 rounded-full shadow hover:bg-teal-300 transition-colors"
            onClick={() => setMenu(false)}
          >
            Démo gratuite
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
