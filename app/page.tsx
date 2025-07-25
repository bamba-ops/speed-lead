// app/page.tsx
"use client";

import { useEffect } from "react";
import { CheckCircle } from "lucide-react";
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

  // Track visiteur à l'arrivée sur la page (provenance, utm, ua)
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

  fetch("/api/notify_click", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      event: "visit", // 👈 Ici !
      source: referrer,
      utm,
      uaClient,
    }),
  }).catch(() => {});
  }, []);

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
      <section className="min-h-screen flex flex-col justify-center items-center px-4 py-14 pt-32 sm:py-20 relative">
        <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:items-stretch justify-center gap-12">
          {/* Texte Hero */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left">
            <h1 className="text-4xl sm:text-6xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6">
              Ne perdez plus un seul lead&nbsp;: <br className="hidden sm:block" />
              l’IA filtre, score et décroche le RDV pour vous
            </h1>
            <h2 className="text-xl sm:text-2xl lg:text-2xl xl:text-3xl text-gray-300 mb-4 max-w-4xl mx-auto lg:mx-0">
              Agent IA bilingue (FR/EN) qui discute par SMS, score en temps réel et réserve votre prochaine visite – 24 h/24.
            </h2>
            <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3 text-base sm:text-lg text-gray-200 mb-4 max-w-3xl mx-auto lg:mx-0">
              <span>⚡ Mise en route &lt; 10 min</span>
              <span className="hidden sm:inline">|</span>
              <span>🔒 Conforme OACIQ</span>
            </div>
            <div className="text-base sm:text-lg text-gray-400 mb-7 lg:mb-8">
              Se connecte à&nbsp;
              <span className="text-white font-semibold">Centris, Facebook Lead Ads, Realtor.ca</span>, téléphone Twilio, etc.
            </div>
          </div>

          {/* Démo Hero avec bandeau explicatif */}
          <div className="w-full lg:w-1/2 flex flex-col items-center">
            {/* Bandeau Démo */}
            <div className="w-full max-w-md mb-2">
              <div className="bg-electric-teal/20 border border-electric-teal text-electric-teal font-semibold rounded-xl px-4 py-3 mb-3 flex items-center gap-2 text-base sm:text-lg justify-center shadow-sm animate-pulse">
                <span className="text-xl">👈</span>
                <span>
                  <span className="font-bold text-electric-teal">Essayez la démo interactive</span> &nbsp;— Cliquez et testez le parcours prospect en direct !
                </span>
                <span className="hidden sm:inline text-xl">👇</span>
              </div>
            </div>
            <div className="w-full max-w-md">
              <CentrisDemo />
            </div>
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
      {/* ...section tarifs, inchangé... */}

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
