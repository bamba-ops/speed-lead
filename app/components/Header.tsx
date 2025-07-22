"use client";


import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Logo = () => (
  <span className="flex items-center space-x-2 select-none">
    {/* Icône SVG custom : bulle + éclair */}
    <span className="w-8 h-8 bg-electric-teal rounded-lg flex items-center justify-center">
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
    <span className="text-white font-bold text-lg tracking-tight">
      Speed
      <span className="text-electric-teal">Lead</span>
    </span>
  </span>
);

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Nouveau logo moderne */}
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#fonctionnalites" className="text-gray-300 hover:text-white transition-colors">
              Fonctionnalités
            </a>
            <a href="#tarifs" className="text-gray-300 hover:text-white transition-colors">
              Tarifs
            </a>
            <a href="#faq" className="text-gray-300 hover:text-white transition-colors">
              FAQ
            </a>
          </nav>

          {/* Desktop CTA */}
          <button className="hidden md:block bg-electric-teal text-black font-semibold px-6 py-2 rounded-full hover:bg-electric-teal/90 transition-colors">
            Démo gratuite
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/10">
            <nav className="flex flex-col space-y-4 mt-4">
              <a
                href="#fonctionnalites"
                className="text-gray-300 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Fonctionnalités
              </a>
              <a
                href="#tarifs"
                className="text-gray-300 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Tarifs
              </a>
              <a
                href="#faq"
                className="text-gray-300 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </a>
              <button className="bg-electric-teal text-black font-semibold py-3 rounded-full hover:bg-electric-teal/90 transition-colors mt-4">
                Démo gratuite
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
