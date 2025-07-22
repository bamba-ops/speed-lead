"use client";


import React from 'react';
import { MessageCircle, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="py-12 px-4 border-t border-white/10 bg-black">
      <div className="max-w-6xl mx-auto">

        {/* Intro visible et centré */}
        <div className="text-center mb-8">
          <img
            src="https://lh3.googleusercontent.com/ogw/AF2bZyiVyvuxtssMkOk-6s_1iSP2Q4ahVxubRUVxtsCc309Uc38=s64-c-mo"
            alt="Walid"
            className="w-10 h-10 rounded-full mx-auto mb-2"
          />
          <p className="text-white text-base font-medium">
            C’est moi, Walid — suivez mon travail sur{' '}
            <a
              href="https://www.tiktok.com/@bambalerequin"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-electric-teal transition-colors"
            >
              @bambalerequin
            </a>
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo & Slogan */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-electric-teal rounded-lg flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-black" />
              </div>
              <span className="text-white font-bold text-xl">SpeedLead</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Le bot&nbsp;AI qui transforme vos leads Centris en mandats automatiquement.
              Réponse en moins de 30&nbsp;secondes, 24h/24.
            </p>
            <div className="flex space-x-4">
              <a href="mailto:w.gharbi.tangerine@gmail.com" className="text-gray-400 hover:text-electric-teal transition-colors">
                <Mail className="w-5 h-5" />
              </a>
              <a href="tel:+15146064186" className="text-gray-400 hover:text-electric-teal transition-colors">
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Liens Produit */}
          <div>
            <h3 className="text-white font-semibold mb-4">Produit</h3>
            <ul className="space-y-2">
              <li><a href="#fonctionnalites" className="text-gray-400 hover:text-white transition-colors">Fonctionnalités</a></li>
              <li><a href="#tarifs" className="text-gray-400 hover:text-white transition-colors">Tarifs</a></li>
              <li><a href="#demo" className="text-gray-400 hover:text-white transition-colors">Démo</a></li>
              <li><a href="#integration" className="text-gray-400 hover:text-white transition-colors">Intégrations</a></li>
            </ul>
          </div>

          {/* Liens Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#faq" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              <li><a href="#aide" className="text-gray-400 hover:text-white transition-colors">Centre d'aide</a></li>
              <li><a href="#status" className="text-gray-400 hover:text-white transition-colors">Statut système</a></li>
            </ul>
          </div>
        </div>

        {/* Barre du bas */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          {/* © */}
          <div className="flex items-center space-x-2 text-gray-400 mb-4 md:mb-0">
            <MapPin className="w-4 h-4" />
            <span>© {year} SpeedLead Montréal</span>
          </div>

          {/* Liens légaux & contact */}
          <div className="flex space-x-6 text-sm">
            <a href="#privacy" className="text-gray-400 hover:text-white transition-colors">
              Confidentialité
            </a>
            <a href="#terms" className="text-gray-400 hover:text-white transition-colors">
              Conditions
            </a>
            <a href="mailto:w.gharbi.tangerine@gmail.com" className="text-electric-teal hover:text-electric-teal/80 transition-colors">
              w.gharbi.tangerine@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
