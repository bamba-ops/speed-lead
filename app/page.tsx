// app/page.tsx
"use client";

import { useEffect } from "react";
import { CheckCircle } from "lucide-react";       // ← ajoutez cet import
import Header from "./components/Header";
import ProblemSection from "./components/ProblemSection";
import WithWithoutSection from "./components/WithWithoutSection";
import FeaturesSection from "./components/FeaturesSection";
import FAQSection from "./components/FAQSection";
import CTASection from "./components/CTASection";
import CentrisDemo from "./components/CentrisDemo";
import Footer from "./components/Footer";

export default function HomePage() {
  const calendlyUrl =
    "https://calendly.com/w-gharbi-tangerine/demo-speedlead";

  // Injection Calendly CSS/JS
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

  const openCalendly = () => {
    if (window.Calendly?.initPopupWidget) {
      window.Calendly.initPopupWidget({ url: calendlyUrl });
    } else {
      window.open(calendlyUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">

      <Header />

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center px-4 py-20 pt-32 relative">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            Répondez à vos leads Centris en&nbsp;
            <span className="text-electric-teal">&lt; 30&nbsp;secondes</span>{" "}
            grâce à l’IA
          </h1>
          <h2 className="text-xl sm:text-2xl lg:text-3xl text-gray-300 mb-16 max-w-4xl mx-auto">
            Bot SMS AI bilingue{" "}
            <span className="text-electric-teal font-semibold">FR/EN</span> qui
            qualifie et transfère vos prospects en temps réel
          </h2>
          <div className="mb-16">
            <CentrisDemo />
          </div>
        </div>
      </section>

      <ProblemSection />

      {/* Proof Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center">
            <div className="text-4xl font-bold text-electric-teal mb-2">
              48 %
            </div>
            <p className="text-gray-300">des leads jamais rappelés</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center">
            <div className="text-4xl font-bold text-electric-teal mb-2">
              20×
            </div>
            <p className="text-gray-300">plus de conversion &lt; 5 min</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center">
            <div className="text-4xl font-bold text-electric-teal mb-2">
              + 35 %
            </div>
            <p className="text-gray-300">ROI moyen mandats</p>
          </div>
        </div>
      </section>

      <WithWithoutSection />
      <FeaturesSection />

      {/* Pricing */}
      {/*
      <section id="tarifs" className="py-20 px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white/5 backdrop-blur-sm border border-electric-teal/30 rounded-3xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Starter</h3>
            <div className="text-5xl font-bold text-electric-teal mb-6">
              $149
              <span className="text-lg text-gray-400">/mo</span>
            </div>
            <ul className="space-y-4 mb-8">
              {["SMS 24/7 FR/EN", "Pas de code", "Annulable quand vous voulez"].map(
                (text) => (
                  <li
                    key={text}
                    className="flex items-center justify-center space-x-3"
                  >
                    <CheckCircle className="w-5 h-5 text-electric-teal" />
                    <span>{text}</span>
                  </li>
                )
              )}
            </ul>
            <button
              onClick={openCalendly}
              className="w-full bg-electric-teal text-black font-semibold py-4 rounded-full hover:bg-electric-teal/90 transition-colors"
            >
              Commencer maintenant
            </button>
          </div>
        </div>
      </section>
      */}

      <FAQSection />
      <CTASection />
      <Footer />

      {/* Sticky mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-black/90 backdrop-blur-sm border-t border-white/10 md:hidden">
        <button
          onClick={openCalendly}
          className="w-full bg-electric-teal text-black font-semibold py-4 rounded-full hover:bg-electric-teal/90 transition-colors"
        >
          Réserver ma démo 15 min
        </button>
      </div>

      {/* Desktop CTA */}
      <div className="hidden md:block fixed bottom-8 right-8">
        <button
          onClick={openCalendly}
          className="bg-electric-teal text-black font-semibold px-8 py-4 rounded-full hover:bg-electric-teal/90 transition-transform hover:scale-105 shadow-2xl"
        >
          Réserver ma démo 15 min
        </button>
      </div>
    </div>
  );
}
