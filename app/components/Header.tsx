"use client";

import React, { useState, useRef, useEffect, MouseEvent as ReactMouseEvent } from "react";
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
      Speed<span className="text-electric-teal">Lead</span>
    </span>
  </span>
);

const NAV = [
  { href: "#fonctionnalites", label: "Fonctionnalités" },
  { href: "#faq", label: "FAQ" },
];

// Pour TypeScript : accès à window.Calendly
declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (opts: { url: string }) => void;
    };
  }
}

export default function Header() {
  const [menu, setMenu] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const calendlyUrl = "https://calendly.com/w-gharbi-tangerine/demo-speedlead";

  // Charger Calendly CSS & JS
  useEffect(() => {
    if (!document.getElementById("calendly-widget-css")) {
      const link = document.createElement("link");
      link.id = "calendly-widget-css";
      link.href = "https://assets.calendly.com/assets/external/widget.css";
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }
    if (!document.getElementById("calendly-widget-js")) {
      const script = document.createElement("script");
      script.id = "calendly-widget-js";
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // Fermer le menu mobile au clic hors
  useEffect(() => {
    if (!menu) return;
    // 👇 Ici on précise bien le type DOM global
    const handle = (e: globalThis.MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setMenu(false);
      }
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [menu]);

  // Bloquer le scroll quand le menu mobile est ouvert
  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menu]);

  // Ouvre le popup Calendly
  const openCalendly = (e: ReactMouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (window.Calendly?.initPopupWidget) {
      window.Calendly.initPopupWidget({ url: calendlyUrl });
    } else {
      window.open(calendlyUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <header className="fixed top-4 left-0 w-full z-50 pointer-events-none">
      <div className="max-w-3xl md:max-w-5xl xl:max-w-7xl mx-auto px-2 sm:px-6">
        <div className="bg-neutral-950/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex items-center justify-between px-3 sm:px-6 py-2 sm:py-3 pointer-events-auto">
          <Logo />

          {/* Navigation desktop */}
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

          {/* Bouton Démo desktop */}
          <a
            href="#"
            onClick={openCalendly}
            className="hidden md:inline-block bg-electric-teal text-black font-semibold px-6 py-2 rounded-full shadow hover:bg-electric-teal/90 transition-colors"
          >
            Démo gratuite
          </a>

          {/* Bouton menu mobile */}
          <button
            className="md:hidden text-white p-2 rounded-lg focus:outline-none"
            onClick={() => setMenu(true)}
            aria-label="Ouvrir le menu"
          >
            <Menu className="w-7 h-7" />
          </button>
        </div>
      </div>

      {/* Menu mobile glassmorphism */}
      <div
        className={`fixed inset-0 z-[999] bg-black/40 transition-all duration-300 ${
          menu ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
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

          {/* Bouton Démo mobile */}
          <a
            href="#"
            onClick={e => { setMenu(false); openCalendly(e); }}
            className="block bg-electric-teal text-black font-bold text-center py-3 rounded-full shadow hover:bg-electric-teal/90 transition-colors"
          >
            Démo gratuite
          </a>
        </div>
      </div>
    </header>
  );
}
