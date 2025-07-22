
"use client";

import React from 'react';
import { AlertTriangle, Clock, TrendingDown } from 'lucide-react';

const ProblemSection: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-sf-pro text-3xl md:text-5xl font-bold mb-8 text-white">
          Pendant que vous dormez, vos concurrents <span className="text-red-400">volent vos mandats</span>
        </h2>
        
        <p className="text-xl text-gray-300 mb-16 max-w-3xl mx-auto">
          Sans assistant AI, chaque minute de retard coûte des milliers en commissions perdues
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8">
            <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-3">Lead froid = Lead mort</h3>
            <p className="text-gray-400">
              Après 5 minutes, vos chances de conversion chutent de 80%. 
              Vos prospects appellent déjà un autre agent.
            </p>
          </div>

          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8">
            <Clock className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-3">Nuits blanches garanties</h3>
            <p className="text-gray-400">
              Les leads arrivent 24/7. Manquer celui de 2h du matin, 
              c'est perdre le mandat de 500k$ qui finance vos vacances.
            </p>
          </div>

          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8">
            <TrendingDown className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-3">Réputation en chute libre</h3>
            <p className="text-gray-400">
              Clients frustrés = mauvaises reviews. 
              Votre crédibilité sur Centris s'effrite lead après lead.
            </p>
          </div>
        </div>

        <div className="mt-16 bg-red-500/5 border border-red-500/20 rounded-2xl p-8">
          <p className="text-2xl font-bold text-red-400 mb-4">
            Résultat : Vous travaillez plus pour gagner moins
          </p>
          <p className="text-gray-300">
            Pendant que vos concurrents automatisent leur suivi avec de l'AI et dorment tranquilles,
            vous courez après des leads déjà convertis ailleurs.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;