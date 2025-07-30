"use client";

import { useEffect, useState, useRef } from "react";
import Header from "./components/Header";
import ProblemSection from "./components/ProblemSection";
import WithWithoutSection from "./components/WithWithoutSection";
import FeaturesSection from "./components/FeaturesSection";
import FAQSection from "./components/FAQSection";
import CTASection from "./components/CTASection";
import CentrisDemo from "./components/CentrisDemo";
import Footer from "./components/Footer";

export default function HomePage() {
  const [showExitModal, setShowExitModal] = useState(false);
  const modalShown = useRef(false);
  const lastScrollY = useRef(0);

  // Exit-intent desktop
  useEffect(() => {
    const handleMouseOut = (e) => {
      if (
        window.innerWidth >= 768 &&
        e.clientY <= 0 &&
        !modalShown.current
      ) {
        setShowExitModal(true);
        modalShown.current = true;
      }
    };
    document.addEventListener("mouseout", handleMouseOut);
    return () => document.removeEventListener("mouseout", handleMouseOut);
  }, []);

  // Exit-intent mobile : scroll vers le haut rapide dans le haut de page
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 768 && !modalShown.current) {
        const scrollY = window.scrollY;
        if (
          scrollY < 200 &&
          lastScrollY.current - scrollY > 60 // scroll up d’au moins 60px
        ) {
          setShowExitModal(true);
          modalShown.current = true;
        }
        lastScrollY.current = scrollY;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
            5 min = mandat perdu
          </h1>
          <h2 className="text-center text-electric-teal font-semibold text-xl sm:text-2xl md:text-3xl leading-tight mb-3">
            30 s = lead qualifié
          </h2>
          <p className="text-center text-gray-300 font-normal text-base sm:text-lg md:text-xl mb-7">
            Teste-le sur TON numéro, 24 h/24.
          </p>
          {/* BADGE + FLECHE ANIMÉE */}
          <div className="flex flex-col items-center mb-3">
            <span className="flex items-center gap-1 px-4 py-1 rounded-full bg-electric-teal/15 border border-electric-teal/40 text-electric-teal text-sm font-semibold animate-badge-bounce shadow-badge select-none mb-1">
              <svg className="w-4 h-4 mr-1 animate-fleche-bounce" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m7-7-7 7-7-7" />
              </svg>
              Essaie la démo !
            </span>
          </div>
          <div className="w-full flex justify-center">
            <CentrisDemo />
          </div>

          {/* BADGES DE CONFIANCE */}
          <div className="flex flex-row flex-wrap justify-center gap-2 mt-5 mb-1 w-full">
            <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-900/40 border border-emerald-800/40 text-emerald-300 text-[14px] font-medium shadow-badge">
              <span className="text-lg leading-none">📈</span>+35&nbsp;% de mandats
            </span>
            <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-900/40 border border-blue-800/30 text-blue-200 text-[14px] font-medium shadow-badge">
              <span className="text-lg leading-none">🔒</span>Conforme Loi 25
            </span>
            <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-neutral-800/60 border border-neutral-700 text-white text-[14px] font-medium shadow-badge">
              <span className="text-lg leading-none">🇨🇦</span>Hébergé au Canada
            </span>
          </div>
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

      {/* Exit-intent Modal PREMIUM */}
      {showExitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-[2px]">
          <div className="relative w-full max-w-md mx-3 animate-modal-pop">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2">
              <span className="bg-electric-teal/90 text-white text-xs px-3 py-1.5 rounded-full shadow-xl border border-electric-teal font-bold tracking-wide animate-badge-bounce">
                🚀 Ne partez pas sans votre démo&nbsp;!
              </span>
            </div>
            <div className={`
              bg-gradient-to-br from-neutral-900/80 via-indigo-950/90 to-neutral-950/90
              border border-electric-teal/40 backdrop-blur-xl rounded-2xl shadow-2xl px-6 pt-10 pb-7 relative
              ring-1 ring-white/5
            `}>
              {/* bouton fermer */}
              <button
                onClick={() => setShowExitModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-electric-teal transition text-2xl font-bold bg-white/0 rounded-full p-1"
                aria-label="Fermer"
                type="button"
                tabIndex={0}
              >
                ×
              </button>
              <h3 className="text-white text-2xl font-semibold mb-3 text-center drop-shadow-sm">
                Recevez votre démo gratuite instantanément 🚀
              </h3>
              <p className="text-gray-300 text-base text-center mb-6">
                Entrez votre numéro pour tester le vrai fonctionnement IA sur votre propre téléphone.
              </p>
              <CentrisDemo />
            </div>
          </div>
        </div>
      )}

      {/* Animations pour le badge et la flèche */}
      <style jsx global>{`
        .animate-badge-bounce {
          animation: badgebounce 1.3s infinite cubic-bezier(.59,1.54,.48,.92);
        }
        @keyframes badgebounce {
          0%,100%{transform:translateY(0);}
          25%{transform:translateY(-8px);}
          50%{transform:translateY(0);}
        }
        .shadow-badge {
          box-shadow: 0 2px 12px 0 rgba(0,220,210,0.13);
        }
        .animate-fleche-bounce {
          animation: flechebounce 1.3s infinite cubic-bezier(.59,1.54,.48,.92);
        }
        @keyframes flechebounce {
          0%,100%{transform:translateY(0);}
          40%{transform:translateY(4px);}
        }
        .animate-modal-pop {
          animation: modalPop 0.38s cubic-bezier(.22,1.02,.34,1.08);
        }
        @keyframes modalPop {
          0% { opacity: 0; transform: scale(.92) translateY(30px);}
          100% { opacity: 1; transform: scale(1) translateY(0);}
        }
      `}</style>
    </div>
  );
}
