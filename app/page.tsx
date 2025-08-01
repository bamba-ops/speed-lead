"use client";

import { useEffect, useState, useRef } from "react";
import Header from "./components/Header";
import ProblemSection from "./components/ProblemSection";
import WithWithoutSection from "./components/WithWithoutSection";
import FeaturesSection from "./components/FeaturesSection";
import FAQSection from "./components/FAQSection";
import CTASection from "./components/CTASection";
import LiveChatDemo from "./components/LiveChatDemo";
import Footer from "./components/Footer";

export default function HomePage() {
  // Plus besoin d'exit modal demo
  // const [showExitModal, setShowExitModal] = useState(false);
  // const modalShown = useRef(false);
  // const lastScrollY = useRef(0);

  useEffect(() => {
    const referrer = document.referrer || "direct";
    const params = new URLSearchParams(window.location.search);
    const utm = {
      utm_source: params.get("utm_source"),
      utm_medium: params.get("utm_medium"),
      utm_campaign: params.get("utm_campaign"),
      utm_content: params.get("utm_content"),
      utm_term: params.get("utm_term"),
    };
    const uaClient = navigator.userAgent;
    /*
    fetch("/api/notify_click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: "visit",
        source: referrer,
        utm,
        uaClient,
      }),
    }).catch(() => {});
    */
  }, []);

  useEffect(() => {
    if (!document.getElementById("calendly-widget-css")) {
      const link = document.createElement("link");
      link.id = "calendly-widget-css";
      link.href = "https://assets.calendly.com/assets/external/widget.css";
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }
    if (!document.getElementById("calendly-widget-js")) {
      const script = document.createElement("script");
      script.id = "calendly-widget-js";
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans relative">
      <Header />

      {/* Mega-CTA FULL SCREEN */}
      <section className="flex flex-col items-center justify-center min-h-screen px-3 pt-[10vh] bg-gradient-to-b from-neutral-950 via-slate-900 to-indigo-950">
        <div className="w-full max-w-lg flex flex-col items-center">
          <h1 className="font-bold text-center text-white text-3xl sm:text-4xl md:text-5xl leading-tight tracking-[-0.01em] mb-2">
            L’assistant SMS IA instantané pour les courtiers immobilier
          </h1>
          <h2 className="text-center text-electric-teal font-semibold text-lg sm:text-xl md:text-2xl leading-tight mb-3">
            Ne ratez plus aucun contact.
          </h2>
          {/* BADGE + FLECHE ANIMÉE */}
          <div className="flex flex-col items-center mb-3">
            <span className="flex items-center gap-1 px-4 py-1 rounded-full bg-electric-teal/15 border border-electric-teal/40 text-electric-teal text-sm font-semibold animate-badge-bounce shadow-badge select-none mb-1">
              <svg
                className="w-4 h-4 mr-1 animate-fleche-bounce"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m7-7-7 7-7-7" />
              </svg>
              Essaie la démo !
            </span>
          </div>
          <div className="w-full flex justify-center">
            <LiveChatDemo />
          </div>
          {/* BADGES DE CONFIANCE */}
         
        </div>
      </section>

      <ProblemSection />
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
            <div className="text-4xl font-bold text-electric-teal mb-2">48 %</div>
            <p className="text-gray-300">des leads jamais rappelés</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
            <div className="text-4xl font-bold text-electric-teal mb-2">20×</div>
            <p className="text-gray-300">plus de conversion &lt; 5 min</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
            <div className="text-4xl font-bold text-electric-teal mb-2">+ 35 %</div>
            <p className="text-gray-300">ROI moyen mandats</p>
          </div>
        </div>
      </section>
      <WithWithoutSection />
      <FeaturesSection />
      <FAQSection />
      <CTASection />
      <Footer />

      {/* Plus de popup démo ou exit-intent */}

      {/* Animations pour le badge et la flèche */}
      <style jsx global>{`
        .animate-badge-bounce {
          animation: badgebounce 1.3s infinite cubic-bezier(.59,1.54,.48,.92);
        }
        @keyframes badgebounce {
          0%,100% { transform: translateY(0); }
          25% { transform: translateY(-8px); }
          50% { transform: translateY(0); }
        }
        .shadow-badge {
          box-shadow: 0 2px 12px 0 rgba(0,220,210,0.13);
        }
        .animate-fleche-bounce {
          animation: flechebounce 1.3s infinite cubic-bezier(.59,1.54,.48,.92);
        }
        @keyframes flechebounce {
          0%,100% { transform: translateY(0); }
          40% { transform: translateY(4px); }
        }
      `}</style>
    </div>
  );
}
