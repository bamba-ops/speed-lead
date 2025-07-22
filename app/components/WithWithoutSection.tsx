"use client";


import React from 'react';
import { Check, X } from 'lucide-react';

const WithWithoutSection: React.FC = () => {
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

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-sf-pro text-3xl md:text-5xl font-bold mb-6 text-white">
            SpeedLead AI vs. Méthodes traditionnelles
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Pourquoi les top agents de Montréal abandonnent les appels manuels
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* With SpeedLead */}
          <div className="bg-electric-teal/10 border border-electric-teal/30 rounded-2xl p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-electric-teal rounded-full flex items-center justify-center mr-4">
                <Check className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-2xl font-bold text-white">Avec SpeedLead</h3>
            </div>
            
            <div className="space-y-4">
              {comparisons.map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-electric-teal mt-0.5 flex-shrink-0" />
                  <p className="text-gray-200">{item.with}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Without SpeedLead */}
          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mr-4">
                <X className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Méthodes traditionnelles</h3>
            </div>
            
            <div className="space-y-4">
              {comparisons.map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <X className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-300">{item.without}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-gray-300 mb-6">
            Résultat : <span className="text-electric-teal font-semibold">+35% de mandats</span> avec
            <span className="text-electric-teal font-semibold"> 50% moins d'effort</span> grâce à l'AI
          </p>
          <button className="bg-electric-teal text-black font-semibold px-8 py-4 rounded-full hover:bg-electric-teal/90 transition-colors">
            Voir la démo en action
          </button>
        </div>
      </div>
    </section>
  );
};

export default WithWithoutSection;