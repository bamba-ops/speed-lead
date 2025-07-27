// app/components/WithWithoutSection.tsx
"use client";

import React from 'react';
import { Check, X } from 'lucide-react';

const comparisons = [
  {
    with: "Réponse AI en < 30 secondes 24/7",
    without: "Réponse manuelle en heures/jours"
  },
  {
    with: "Qualification AI automatique intelligente",
    without: "Appels à froid non qualifiés"
  },
  {
    with: "Leads transférés en temps réel",
    without: "Leads perdus dans les emails"
  },
  {
    with: "Bilingue AI FR/EN automatique",
    without: "Barrière linguistique = leads perdus"
  },
  {
    with: "Disponible même en vacances",
    without: "Business arrêté quand vous partez"
  },
  {
    with: "ROI mesurable et transparent",
    without: "Impossible de tracker les conversions"
  }
];

const WithWithoutSection: React.FC = () => {
  return (
    <section className="py-16 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-sf-pro text-3xl md:text-5xl font-bold mb-5 text-white">
            <span className="block">Avec ou sans SpeedLead AI ?</span>
            <span className="text-lg block mt-2 text-gray-300 font-normal">
              Ce que change l’automatisation pour les top agents de Montréal
            </span>
          </h2>
        </div>

        <div className="flex flex-col md:grid md:grid-cols-2 gap-8">
          {/* AVEC SpeedLead */}
          <div className="bg-electric-teal/10 border border-electric-teal/40 rounded-2xl p-6 flex flex-col h-full shadow-xl">
            <div className="flex items-center mb-5">
              <div className="w-11 h-11 bg-electric-teal rounded-full flex items-center justify-center mr-3 shadow">
                <Check className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-2xl font-bold text-white">Avec SpeedLead</h3>
            </div>
            <ul className="space-y-4 flex-1">
              {comparisons.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-electric-teal mt-1" />
                  <span className="text-base text-gray-100 leading-snug">{item.with}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* SANS SpeedLead */}
          <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 flex flex-col h-full shadow-xl mt-8 md:mt-0">
            <div className="flex items-center mb-5">
              <div className="w-11 h-11 bg-red-500 rounded-full flex items-center justify-center mr-3 shadow">
                <X className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Sans SpeedLead</h3>
            </div>
            <ul className="space-y-4 flex-1">
              {comparisons.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <X className="w-5 h-5 text-red-400 mt-1" />
                  <span className="text-base text-gray-300 leading-snug">{item.without}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-gray-200 mb-6">
            <span className="text-electric-teal font-bold">+35 % de mandats</span> et 
            <span className="text-electric-teal font-bold"> 50 % moins d’effort</span> chez nos clients AI
          </p>
          <button className="bg-electric-teal text-black font-semibold px-8 py-4 rounded-full hover:bg-electric-teal/90 transition-colors text-lg shadow-lg">
            Voir la démo en action
          </button>
        </div>
      </div>

    
    </section>
  );
};

export default WithWithoutSection;
