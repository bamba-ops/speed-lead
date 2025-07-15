import React, { useState, useEffect } from 'react';
import { MessageCircle, Target, Zap, ArrowRight, CheckCircle } from 'lucide-react';
import Header from './components/Header';
import ProblemSection from './components/ProblemSection';
import WithWithoutSection from './components/WithWithoutSection';
import FeaturesSection from './components/FeaturesSection';
import FAQSection from './components/FAQSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

interface ChatMessage {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: string;
}

const ChatDemo: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  const chatSequences = [
    [
      { id: 1, text: "Bonjour, j'aimerais visiter 123 Rue Laurier Est.", isBot: false, timestamp: "14:32" },
      { id: 2, text: "Bonjour! Je suis l'assistant de l'agent. Quel est votre budget approximatif ?", isBot: true, timestamp: "14:32" },
    ],
    [
      { id: 1, text: "Hi, I'm interested in the condo on Saint-Denis", isBot: false, timestamp: "21:45" },
      { id: 2, text: "Hello! I'm the agent's assistant. What's your preferred viewing time?", isBot: true, timestamp: "21:45" },
    ],
    [
      { id: 1, text: "Disponible pour une visite ce weekend?", isBot: false, timestamp: "09:15" },
      { id: 2, text: "Parfait! Samedi ou dimanche vous convient mieux ?", isBot: true, timestamp: "09:15" },
    ],
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const sequence = chatSequences[currentStep];
      
      // Clear previous messages
      setMessages([]);
      
      // Add first message (lead)
      setTimeout(() => {
        setMessages([sequence[0]]);
      }, 100);
      
      // Add bot response after 800ms
      setTimeout(() => {
        setMessages(sequence);
      }, 800);
      
      // Move to next sequence
      setCurrentStep((prev) => (prev + 1) % chatSequences.length);
    }, 6000);

    // Initial load
    const sequence = chatSequences[0];
    setTimeout(() => setMessages([sequence[0]]), 100);
    setTimeout(() => setMessages(sequence), 800);

    return () => clearInterval(interval);
  }, [currentStep]);

  return (
    <div className="relative mx-auto w-80 h-[640px] bg-black rounded-[3rem] p-2 shadow-2xl">
      {/* iPhone Frame */}
      <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-36 h-6 bg-black rounded-b-2xl z-10"></div>
        
        {/* Status Bar */}
        <div className="flex justify-between items-center px-8 pt-3 pb-2 text-black text-sm font-medium">
          <span>9:41</span>
          <div className="flex space-x-1">
            <div className="w-4 h-2 bg-black rounded-sm"></div>
            <div className="w-6 h-2 bg-black rounded-sm"></div>
            <div className="w-6 h-2 bg-black rounded-sm"></div>
          </div>
        </div>

        {/* Chat Header */}
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-electric-teal rounded-full flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">SpeedLead Bot</h3>
              <p className="text-sm text-green-500">En ligne</p>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 bg-gray-50 px-4 py-4 space-y-4 h-96 overflow-hidden">
          {messages.map((message) => (
            <div
              key={`${currentStep}-${message.id}`}
              className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} animate-chat-bubble`}
            >
              <div
                className={`max-w-xs px-4 py-3 rounded-2xl ${
                  message.isBot
                    ? 'bg-electric-teal text-white rounded-bl-md'
                    : 'bg-white text-gray-900 rounded-br-md shadow-sm border border-gray-200'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className={`text-xs mt-1 ${message.isBot ? 'text-blue-100' : 'text-gray-500'}`}>
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="bg-white border-t border-gray-200 px-4 py-3">
          <div className="flex items-center space-x-3">
            <div className="flex-1 bg-gray-100 rounded-full px-4 py-2">
              <p className="text-gray-400 text-sm">Tapez votre message...</p>
            </div>
            <div className="w-8 h-8 bg-electric-teal rounded-full flex items-center justify-center">
              <ArrowRight className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white font-inter">
      <Header />
      
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center px-4 py-20 pt-32 relative">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-sf-pro text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            Répondez à vos leads Centris en{' '}
            <span className="text-electric-teal">&lt; 30 secondes</span>
            <br />
            – même à 2 h du matin.
          </h1>
          
          <h2 className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-16 max-w-4xl mx-auto">
            Bot SMS bilingue <span className="text-electric-teal font-semibold">FR/EN</span> qui qualifie vos prospects 
            automatiquement et vous les transfert en temps réel.
          </h2>

          {/* Interactive Demo */}
          <div className="mb-16">
            <ChatDemo />
          </div>
        </div>
      </section>

      <ProblemSection />
      
      {/* Proof Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center">
              <div className="text-4xl font-bold text-electric-teal mb-2">48%</div>
              <p className="text-gray-300">des leads jamais rappelés</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center">
              <div className="text-4xl font-bold text-electric-teal mb-2">20×</div>
              <p className="text-gray-300">plus de conversion &lt; 5 min</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center">
              <div className="text-4xl font-bold text-electric-teal mb-2">+35%</div>
              <p className="text-gray-300">ROI moyen mandats</p>
            </div>
          </div>
        </div>
      </section>

      <WithWithoutSection />
      <FeaturesSection />
      
      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-sf-pro text-3xl md:text-5xl font-bold mb-16">Comment ça marche</h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-electric-teal/20 rounded-full flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-electric-teal" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Capture</h3>
              <p className="text-gray-400">Réception automatique des leads Centris</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-electric-teal/20 rounded-full flex items-center justify-center mb-6">
                <MessageCircle className="w-8 h-8 text-electric-teal" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Qualifie</h3>
              <p className="text-gray-400">Questions intelligentes pour qualifier le prospect</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-electric-teal/20 rounded-full flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-electric-teal" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Transfert</h3>
              <p className="text-gray-400">Lead qualifié envoyé en temps réel</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="tarifs" className="py-20 px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white/5 backdrop-blur-sm border border-electric-teal/30 rounded-3xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Starter</h3>
            <div className="text-5xl font-bold text-electric-teal mb-6">$149<span className="text-lg text-gray-400">/mo</span></div>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-center justify-center space-x-3">
                <CheckCircle className="w-5 h-5 text-electric-teal" />
                <span>SMS 24/7 FR/EN</span>
              </li>
              <li className="flex items-center justify-center space-x-3">
                <CheckCircle className="w-5 h-5 text-electric-teal" />
                <span>Pas de code</span>
              </li>
              <li className="flex items-center justify-center space-x-3">
                <CheckCircle className="w-5 h-5 text-electric-teal" />
                <span>Annulable quand vous voulez</span>
              </li>
            </ul>
            
            <button className="w-full bg-electric-teal text-black font-semibold py-4 rounded-full hover:bg-electric-teal/90 transition-colors">
              Commencer maintenant
            </button>
          </div>
        </div>
      </section>

      <FAQSection />
      <CTASection />
      <Footer />

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-black/90 backdrop-blur-sm border-t border-white/10 md:hidden">
        <button className="w-full bg-electric-teal text-black font-semibold py-4 rounded-full hover:bg-electric-teal/90 transition-colors">
          Réserver ma démo 15 min
        </button>
      </div>

      {/* Desktop CTA */}
      <div className="hidden md:block fixed bottom-8 right-8">
        <button className="bg-electric-teal text-black font-semibold px-8 py-4 rounded-full hover:bg-electric-teal/90 transition-all duration-300 transform hover:scale-105 shadow-2xl">
          Réserver ma démo 15 min
        </button>
      </div>
    </div>
  );
};

export default App;