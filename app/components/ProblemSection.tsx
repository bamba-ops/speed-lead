// app/components/ProblemSection.tsx
"use client";

import React from 'react';
import { AlertTriangle, Clock, TrendingDown } from 'lucide-react';

const ProblemSection: React.FC = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-sf-pro text-3xl md:text-5xl font-bold mb-3 text-white">
          Vos prospects n’attendent pas&nbsp;: <span className="text-red-400">chaque minute compte</span>
        </h2>
        <p className="text-base sm:text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
          Manquer un lead, c’est laisser un mandat (et des milliers&nbsp;$) à la concurrence.
        </p>
        <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
          Sans assistant AI, chaque minute de retard coûte cher en commissions perdues.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Pain 1 */}
          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 transition hover:shadow-lg hover:-translate-y-1">
            <AlertTriangle className="w-11 h-11 text-red-400 mx-auto mb-3 animate-pulse" />
            <h3 className="text-lg font-semibold text-white mb-2">Lead froid = lead perdu</h3>
            <p className="text-gray-400 text-base">
              Après 5 minutes, vos chances de convertir chutent de 80&nbsp;%. Vos prospects passent à un autre agent.
            </p>
          </div>
          {/* Pain 2 */}
          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 transition hover:shadow-lg hover:-translate-y-1">
            <Clock className="w-11 h-11 text-red-400 mx-auto mb-3 animate-pulse" />
            <h3 className="text-lg font-semibold text-white mb-2">Leads 24/7, mais pas vous</h3>
            <p className="text-gray-400 text-base">
              Manquer le message de 2h du matin, c’est dire adieu au mandat à 500k$… et à votre week-end.
            </p>
          </div>
          {/* Pain 3 */}
          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 transition hover:shadow-lg hover:-translate-y-1">
            <TrendingDown className="w-11 h-11 text-red-400 mx-auto mb-3 animate-pulse" />
            <h3 className="text-lg font-semibold text-white mb-2">Votre réputation souffre</h3>
            <p className="text-gray-400 text-base">
              Clients déçus = reviews négatives.<br />
              Chaque lead ignoré nuit à votre crédibilité sur tous les portails.
            </p>
          </div>
        </div>

        <div className="mt-12 bg-red-500/5 border border-red-500/20 rounded-2xl p-7">
          <p className="text-xl font-bold text-red-400 mb-2">
            Résultat&nbsp;: vous travaillez plus, pour moins de résultats
          </p>
          <p className="text-gray-300 text-base">
            Pendant que d’autres agents automatisent leur suivi AI et gagnent en tranquillité, vous courez après des leads déjà convertis ailleurs.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
