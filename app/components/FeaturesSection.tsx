// app/components/FeaturesSection.tsx
"use client";

import React, { useState, useEffect, KeyboardEvent } from 'react';
import { MessageCircle, Brain, Zap, Globe, Clock, BarChart3, ChevronDown } from 'lucide-react';

const features = [
  {
    icon: MessageCircle,
    title: "SMS Instantané 24/7",
    description: "Réponse AI automatique en moins de 30 secondes, même à 3h du matin. Vos prospects n'attendent jamais."
  },
  {
    icon: Brain,
    title: "IA de Qualification",
    description: "Questions intelligentes qui qualifient budget, timeline et motivation. Seuls les prospects sérieux vous sont transférés."
  },
  {
    icon: Globe,
    title: "Bilingue FR/EN",
    description: "Détection AI de la langue. Conversation naturelle en français ou anglais selon le prospect."
  },
  {
    icon: Zap,
    title: "Transfert Temps Réel",
    description: "Lead qualifié envoyé instantanément par SMS/email avec toutes les infos collectées."
  },
  {
    icon: Clock,
    title: "Disponibilité Continue",
    description: "Travaille pendant vos vacances, weekends, et nuits. Votre business ne s'arrête jamais."
  },
  {
    icon: BarChart3,
    title: "Analytics Avancés",
    description: "Tracking complet : taux de conversion, sources de leads, ROI par propriété. Optimisez vos performances."
  }
];

const FeaturesSection: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  // Auto-rotate features every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>, idx: number) => {
    if (e.key === "Enter" || e.key === " ") setActiveFeature(idx);
    if (e.key === "ArrowDown" || e.key === "ArrowRight") setActiveFeature((idx + 1) % features.length);
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") setActiveFeature((idx - 1 + features.length) % features.length);
  };

  return (
    <section id="fonctionnalites" className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-sf-pro text-3xl md:text-5xl font-bold mb-4 text-white">
            Fonctionnalités clés
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Passez de la prospection à la conversion automatique grâce à l’IA qui ne dort jamais.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-start">
          {/* Features List */}
          <div className="w-full lg:w-1/2 space-y-3 mb-8 lg:mb-0">
            <div className="mb-2 flex items-center gap-2 justify-center lg:justify-start">
              <ChevronDown className="w-5 h-5 text-electric-teal animate-bounce" />
              <span className="text-electric-teal font-semibold text-base">Cliquez sur une fonctionnalité pour le détail</span>
            </div>
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              const isActive = idx === activeFeature;
              return (
                <div
                  key={idx}
                  tabIndex={0}
                  onClick={() => setActiveFeature(idx)}
                  onKeyDown={e => handleKeyDown(e, idx)}
                  className={`group flex items-center gap-4 cursor-pointer p-4 rounded-xl transition-all duration-300 border
                    ${isActive
                      ? "bg-electric-teal/20 border-electric-teal shadow-lg ring-2 ring-electric-teal"
                      : "bg-white/5 border-white/10 hover:bg-white/10 hover:shadow"
                    }
                    outline-none focus:ring-2 focus:ring-electric-teal`}
                  aria-selected={isActive}
                  aria-label={feature.title}
                >
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center transition
                    ${isActive ? "bg-electric-teal animate-pulse" : "bg-white/10"}`}>
                    <Icon className={`w-6 h-6 ${isActive ? "text-black" : "text-electric-teal"}`} />
                  </div>
                  <div>
                    <h3 className={`text-lg font-semibold mb-0.5 ${isActive ? "text-white" : "text-gray-200"}`}>{feature.title}</h3>
                    <p className={`text-sm ${isActive ? "block text-gray-200" : "hidden lg:block text-gray-400"}`}>{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Feature Showcase */}
          <div className="w-full lg:w-1/2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center min-h-[320px] transition-all duration-500">
            <div className="text-center w-full">
              <div className="w-20 h-20 bg-electric-teal/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                {React.createElement(features[activeFeature].icon, {
                  className: "w-10 h-10 text-electric-teal"
                })}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 transition-all">{features[activeFeature].title}</h3>
              <p className="text-gray-200 text-lg leading-relaxed animate-fade-in-up">{features[activeFeature].description}</p>
            </div>
            {/* Progress Indicators */}
            <div className="flex justify-center space-x-2 mt-8">
              {features.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-3 h-3 rounded-full transition-all duration-300
                    ${idx === activeFeature ? "bg-electric-teal scale-110" : "bg-white/20"}
                  `}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Simple animation for fade-in-up */}
      <style jsx global>{`
        .animate-fade-in-up {
          animation: fadeInUp 0.3s;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default FeaturesSection;
