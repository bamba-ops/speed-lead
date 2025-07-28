"use client";

import { useEffect } from "react";
import Header from "./components/Header";
import ProblemSection from "./components/ProblemSection";
import WithWithoutSection from "./components/WithWithoutSection";
import FeaturesSection from "./components/FeaturesSection";
import FAQSection from "./components/FAQSection";
import CTASection from "./components/CTASection";
import CentrisDemo from "./components/CentrisDemo";
import Footer from "./components/Footer";

export default function HomePage() {
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
    <div className="min-h-screen bg-neutral-950 text-white font-sans">
      <Header />

      {/* Hero Section - inspiré Lovable */}
      <section
        className="flex flex-col items-center justify-center min-h-[100vh] px-3 pt-[30px] bg-gradient-to-b from-neutral-950 via-slate-900 to-indigo-950"
      >
        <div className="w-full max-w-xl flex flex-col items-center">
          <h1
            className="
              font-semibold
              text-center
              text-white
              text-2xl sm:text-3xl md:text-4xl
              leading-tight
              tracking-[-0.01em]
              mb-3
              max-w-[24rem] sm:max-w-xl
            "
          >
            Ne perdez plus un seul lead.
            <br />
            <span className="font-normal text-gray-200">
              L’IA filtre, score&nbsp;et décroche le&nbsp;RDV pour&nbsp;vous
            </span>
          </h1>
          <h2
            className="
              text-center
              text-gray-400
              font-normal
              text-base sm:text-lg md:text-xl
              leading-snug
              max-w-[22rem] sm:max-w-lg md:max-w-xl
              mb-6
            "
          >
            Agent IA bilingue (FR/EN) qui discute par SMS, qualifie en temps réel et réserve votre prochaine visite – 24h/24.
          </h2>
          {/* Demo always below */}
         <div className="w-full flex justify-center">
  <div className="w-full flex justify-center">
    <CentrisDemo />
  </div>
</div>
        </div>
      </section>

      {/* Suite du site */}
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
    </div>
  );
}
