"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQSection: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const faqs = [
    {
      question: "Comment SpeedLead s'intègre avec Centris ?",
      answer: "Connexion via l'API Centris en 24\u00a0h, aucune configuration."
    },
    {
      question: "Puis-je personnaliser les questions du bot AI ?",
      answer: "Oui, adaptez-les facilement depuis votre tableau de bord."
    },
    {
      question: "Que se passe-t-il si le bot ne comprend pas ?",
      answer: "La conversation vous est aussit\u00f4t transf\u00e9r\u00e9e avec l'historique."
    },
    {
      question: "Puis-je annuler \u00e0 tout moment ?",
      answer: "Bien s\u00fbr, r\u00e9siliez en un clic, sans engagement."
    }
  ];

  return (
    <section id="faq" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-sf-pro text-3xl md:text-5xl font-bold mb-6 text-white">
            Questions fréquentes
          </h2>
          <p className="text-xl text-gray-300">
            Tout ce que vous devez savoir avant de commencer
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
            >
              <button
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
              >
                <h3 className="text-lg font-semibold text-white pr-4">
                  {faq.question}
                </h3>
                {openFAQ === index ? (
                  <ChevronUp className="w-5 h-5 text-electric-teal flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                )}
              </button>
              
              {openFAQ === index && (
                <div className="px-8 pb-6">
                  <p className="text-gray-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-400 mb-4">
            Vous avez d'autres questions ?
          </p>
          <button className="text-electric-teal hover:text-electric-teal/80 font-semibold">
            Contactez-nous → w.gharbi.tangerine@gmail.com
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;