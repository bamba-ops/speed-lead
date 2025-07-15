import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

const CTASection: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-electric-teal/10 to-blue-500/10 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border border-electric-teal rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 border border-electric-teal rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-electric-teal rounded-full"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="font-sf-pro text-3xl md:text-6xl font-bold mb-6 text-white">
          Commencez à convertir plus de leads
          <span className="text-electric-teal"> dès aujourd'hui</span>
        </h2>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
          Rejoignez les 200+ agents immobiliers qui ont automatisé leur prospection 
          et augmenté leurs revenus de 35% en moyenne
        </p>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="flex items-center justify-center space-x-3">
            <CheckCircle className="w-6 h-6 text-electric-teal flex-shrink-0" />
            <span className="text-gray-300">Configuration en 24h</span>
          </div>
          <div className="flex items-center justify-center space-x-3">
            <CheckCircle className="w-6 h-6 text-electric-teal flex-shrink-0" />
            <span className="text-gray-300">Garantie 30 jours</span>
          </div>
          <div className="flex items-center justify-center space-x-3">
            <CheckCircle className="w-6 h-6 text-electric-teal flex-shrink-0" />
            <span className="text-gray-300">Support 7j/7</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="bg-electric-teal text-black font-bold px-8 py-4 rounded-full hover:bg-electric-teal/90 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 text-lg">
            <span>Réserver ma démo gratuite</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <button className="border border-electric-teal text-electric-teal font-semibold px-8 py-4 rounded-full hover:bg-electric-teal hover:text-black transition-all duration-300">
            Voir les tarifs
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-gray-400 mb-4">
            Déjà utilisé par des agents de prestige à Montréal
          </p>
          <div className="flex justify-center items-center space-x-8 text-gray-500">
            <span className="font-semibold">Westmount</span>
            <span>•</span>
            <span className="font-semibold">Outremont</span>
            <span>•</span>
            <span className="font-semibold">Plateau</span>
            <span>•</span>
            <span className="font-semibold">Ville-Marie</span>
          </div>
        </div>

        {/* Urgency */}
        <div className="mt-8 bg-red-500/10 border border-red-500/20 rounded-2xl p-6">
          <p className="text-red-400 font-semibold mb-2">
            ⚡ Offre limitée - Janvier 2024
          </p>
          <p className="text-gray-300">
            Configuration gratuite (valeur 500$) pour les 50 premiers agents qui s'inscrivent ce mois
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;