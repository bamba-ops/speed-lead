import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQSection: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const faqs = [
    {
      question: "Comment SpeedLead s'intègre avec Centris ?",
      answer: "SpeedLead se connecte automatiquement à votre compte Centris via API sécurisée. Aucune configuration technique requise - nous nous occupons de tout en 24h."
    },
    {
      question: "Que se passe-t-il si le bot AI ne peut pas répondre ?",
      answer: "Si la conversation devient trop complexe, le bot AI transfère immédiatement vers vous avec tout l'historique. Vous gardez toujours le contrôle final."
    },
    {
      question: "Les prospects savent-ils qu'ils parlent à un bot AI ?",
      answer: "Oui, transparence totale. Le bot AI se présente comme 'l'assistant de l'agent' dès le premier message. Les prospects apprécient la réactivité."
    },
    {
      question: "Puis-je personnaliser les questions du bot AI ?",
      answer: "Absolument. Vous définissez les questions de qualification selon votre marché : budget, timeline, type de propriété, secteur géographique, etc."
    },
    {
      question: "Combien coûtent les SMS ?",
      answer: "Inclus dans l'abonnement jusqu'à 1000 SMS/mois. Au-delà, 0.05$ par SMS. La plupart de nos clients restent sous la limite."
    },
    {
      question: "Puis-je annuler à tout moment ?",
      answer: "Oui, aucun engagement. Annulation en un clic depuis votre tableau de bord. Vos données restent exportables 30 jours après annulation."
    },
    {
      question: "Quelle est la politique de remboursement ?",
      answer: "Garantie 30 jours satisfait ou remboursé. Si SpeedLead ne vous fait pas gagner au moins un mandat supplémentaire, remboursement intégral."
    },
    {
      question: "Le bot AI fonctionne-t-il avec d'autres plateformes ?",
      answer: "Actuellement optimisé pour Centris. Intégrations avec DuProprio et Kijiji en développement. Contactez-nous pour vos besoins spécifiques."
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