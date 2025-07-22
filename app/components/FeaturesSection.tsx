"use client";


import React, { useState, useEffect } from 'react';
import { MessageCircle, Brain, Zap, Globe, Clock, BarChart3 } from 'lucide-react';

const FeaturesSection: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState(0);

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

  // Auto-rotate features every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <section id="fonctionnalites" className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-sf-pro text-3xl md:text-5xl font-bold mb-6 text-white">
            Pourquoi SpeedLead AI transforme votre business d'agent immobilier
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            La technologie AI qui fait la différence entre les agents qui survivent et ceux qui dominent
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Features List */}
          <div className="space-y-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isActive = index === activeFeature;
              
              return (
                <div
                  key={index}
                  className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                    isActive 
                      ? 'bg-electric-teal/20 border border-electric-teal/50' 
                      : 'bg-white/5 border border-white/10 hover:bg-white/10'
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      isActive ? 'bg-electric-teal' : 'bg-white/10'
                    }`}>
                      <Icon className={`w-6 h-6 ${isActive ? 'text-black' : 'text-electric-teal'}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-xl font-semibold mb-2 ${
                        isActive ? 'text-white' : 'text-gray-300'
                      }`}>
                        {feature.title}
                      </h3>
                      {isActive && (
                        <p className="text-gray-300 animate-fade-in-up">
                          {feature.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Feature Showcase */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-electric-teal/20 rounded-full flex items-center justify-center mx-auto mb-6">
                {React.createElement(features[activeFeature].icon, {
                  className: "w-10 h-10 text-electric-teal"
                })}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                {features[activeFeature].title}
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                {features[activeFeature].description}
              </p>
            </div>

            {/* Progress Indicators */}
            <div className="flex justify-center space-x-2 mt-8">
              {features.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === activeFeature ? 'bg-electric-teal' : 'bg-white/20'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;