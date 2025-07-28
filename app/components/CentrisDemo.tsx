"use client";
import { useState, FormEvent } from "react";
import Image from "next/image";
import {
  MapPin,
  User,
  Home,
  BedDouble,
  Bath,
  X,
  Phone,
  CheckCircle,
  AlertCircle,
  Loader2,
  ArrowDownRight
} from "lucide-react";

const mainPhoto =
  "https://mspublic.centris.ca/media.ashx?id=ADDD250DEFABD01DDDDDDD1DDD&t=pi&sm=m&w=1260&h=1024";

export default function CentrisDemo() {
  const [popup, setPopup] = useState(false);
  const [form, setForm] = useState({ prenom: "", nom: "", tel: "" });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3200);
  };

  const notifyClick = async () => {
    try {
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
      await fetch("/api/notify_click", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: "contact_click",
          source: referrer,
          utm,
          uaClient,
        }),
      });
    } catch (err) {}
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const resp = await fetch("/api/send-sms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!resp.ok) {
        showToast("error", "Erreur lors de l'envoi. Réessayez.");
        return;
      }
      const result = await resp.json();
      if (result.success) {
        showToast("success", "SMS envoyé avec succès !");
      } else {
        showToast("error", "Erreur d'envoi du SMS.");
      }
    } catch {
      showToast("error", "Erreur réseau lors de l’envoi.");
    } finally {
      setLoading(false);
      setForm({ prenom: "", nom: "", tel: "" });
    }
  };

  return (
    <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-lg mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-200">
      {/* HEADER */}
      <div className="flex items-center px-3 py-2 lg:px-6 lg:py-4 border-b border-gray-100 bg-gray-50">
        <div className="flex-1 text-gray-600 font-medium text-xs lg:text-base">
          Démo immobilière
        </div>
        <div className="w-7 h-7 lg:w-10 lg:h-10 bg-gray-900 rounded-full flex items-center justify-center">
          <User className="text-white w-3.5 h-3.5 lg:w-5 lg:h-5" />
        </div>
      </div>

      {/* CARD: grid 2 colonnes, responsive */}
      <div className="grid grid-cols-[100px_1fr] sm:grid-cols-[160px_1fr] lg:grid-cols-[220px_1fr] items-stretch overflow-hidden rounded-2xl">
        {/* Image à gauche, SANS padding/marge */}
<div className="relative w-full h-full min-h-[100px] sm:min-h-[160px] lg:min-h-[220px]">
  <img
    src={mainPhoto}
    alt="Condo"
    className="object-cover w-full h-full rounded-none"
    style={{ display: "block" }}
    loading="eager"
    draggable={false}
  />
</div>


        {/* Infos et CTA, padding seulement à droite */}
        <div className="flex flex-col justify-between h-full px-2 py-2 sm:px-3 sm:py-3 lg:px-8 lg:py-8">
          <div>
            <div className="text-base sm:text-lg lg:text-3xl font-bold text-gray-900 mb-0.5 leading-snug">
              499 000 $
            </div>
            <div className="font-semibold text-gray-700 mb-0.5 text-xs sm:text-sm lg:text-lg leading-tight">
              Condo à vendre
            </div>
            <div className="flex items-center text-xs lg:text-base text-gray-500 mb-1">
              <MapPin className="w-3.5 h-3.5 lg:w-5 lg:h-5 mr-1 text-gray-400" />
              7825, Avenue Niagara, app. 8, Brossard
            </div>
            <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs lg:text-base text-gray-600 mb-1">
              <div className="flex items-center gap-0.5 lg:gap-1">
                <Home className="w-3.5 h-3.5 lg:w-5 lg:h-5" /> 7 pièces
              </div>
              <div className="flex items-center gap-0.5 lg:gap-1">
                <BedDouble className="w-3.5 h-3.5 lg:w-5 lg:h-5" /> 3 ch
              </div>
              <div className="flex items-center gap-0.5 lg:gap-1">
                <Bath className="w-3.5 h-3.5 lg:w-5 lg:h-5" /> 1 sdb
              </div>
            </div>
          </div>
          {/* BADGE ANIMÉ */}
          <div className="flex flex-col items-center mt-5 mb-1 sm:mt-4 sm:mb-1">
            <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-electric-teal/20 border border-electric-teal/40 text-electric-teal text-xs font-bold animate-bounce-slow shadow-badge relative">
              <ArrowDownRight className="w-4 h-4 animate-arrow-pulse" />
              Essayez la démo&nbsp;!
            </span>
          </div>
          {/* BOUTON CTA AVEC ANIMATION */}
          <button
            className="w-full bg-gray-900 text-white font-semibold py-3 sm:py-2 lg:py-3 rounded-xl text-base sm:text-sm lg:text-lg hover:bg-gray-800 transition mt-3 sm:mt-1 focus:outline-none focus:ring-4 focus:ring-electric-teal/30 animate-cta-pop"
            onClick={() => {
              notifyClick();
              setPopup(true);
            }}
          >
            Contacter le courtier
          </button>
        </div>
      </div>

      {/* POPUP */}
      {popup && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 animate-fadein">
          <div className="bg-white w-full rounded-t-3xl sm:rounded-xl sm:max-w-[340px] shadow-xl px-4 py-6 relative animate-slideup">
            <button
              onClick={() => setPopup(false)}
              className="absolute top-3 right-4 text-gray-400 hover:text-gray-700 transition"
              aria-label="Fermer le formulaire"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="font-bold text-lg mb-5 text-gray-900 text-center">
              Contacter Li Zhao
            </div>

            {/* Toast message */}
            {toast && (
              <div
                className={`w-full flex items-center justify-center mb-4 animate-pop ${
                  toast.type === "success"
                    ? "bg-green-50 text-green-800 border border-green-300"
                    : "bg-red-50 text-red-700 border border-red-300"
                } rounded-lg px-3 py-2 font-semibold text-xs gap-2`}
              >
                {toast.type === "success" ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-500" />
                )}
                <span>{toast.message}</span>
              </div>
            )}

            <form
              className="flex flex-col gap-4"
              onSubmit={handleSubmit}
              autoComplete="off"
            >
              <div>
                <label
                  htmlFor="prenom"
                  className="block text-gray-800 font-medium text-xs mb-1"
                >
                  Prénom
                </label>
                <input
                  id="prenom"
                  type="text"
                  required
                  placeholder="Prénom"
                  className="w-full bg-gray-100 border border-gray-300 rounded-lg px-3 py-1.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-electric-teal focus:border-electric-teal transition"
                  value={form.prenom}
                  onChange={(e) =>
                    setForm({ ...form, prenom: e.target.value })
                  }
                  disabled={loading}
                />
              </div>
              <div>
                <label
                  htmlFor="nom"
                  className="block text-gray-800 font-medium text-xs mb-1"
                >
                  Nom
                </label>
                <input
                  id="nom"
                  type="text"
                  required
                  placeholder="Nom"
                  className="w-full bg-gray-100 border border-gray-300 rounded-lg px-3 py-1.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-electric-teal focus:border-electric-teal transition"
                  value={form.nom}
                  onChange={(e) =>
                    setForm({ ...form, nom: e.target.value })
                  }
                  disabled={loading}
                />
              </div>
              <div>
                <label
                  htmlFor="tel"
                  className="block text-gray-800 font-medium text-xs mb-1"
                >
                  Téléphone
                </label>
                <input
                  id="tel"
                  type="tel"
                  required
                  placeholder="Téléphone"
                  className="w-full bg-gray-100 border border-gray-300 rounded-lg px-3 py-1.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-electric-teal focus:border-electric-teal transition"
                  value={form.tel}
                  onChange={(e) =>
                    setForm({ ...form, tel: e.target.value })
                  }
                  disabled={loading}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`mt-1 flex justify-center items-center gap-2 bg-gray-900 text-white font-semibold py-1.5 rounded-lg text-sm hover:bg-gray-800 transition ${
                  loading ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Envoi...
                  </>
                ) : (
                  "Envoyer"
                )}
              </button>
            </form>
            {/* Info courtier */}
            <div className="flex items-center gap-2 mt-5 bg-gray-50 rounded-lg px-2 py-1.5">
              <Image
                src="https://randomuser.me/api/portraits/women/82.jpg"
                alt="Li Zhao"
                width={36}
                height={36}
                className="rounded-full object-cover"
              />
              <div>
                <div className="font-semibold text-xs text-gray-900">
                  Li Zhao
                </div>
                <div className="text-[11px] text-gray-700 leading-tight">
                  Courtier immobilier résidentiel et commercial agréé DA
                </div>
                <div className="flex gap-1 mt-1">
                  <Phone className="w-4 h-4 text-gray-900" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Animations */}
      <style jsx global>{`
        /* Badge slow bounce */
        .animate-bounce-slow {
          animation: badgebounce 1.5s infinite cubic-bezier(.59,1.54,.48,.92);
        }
        @keyframes badgebounce {
          0%,100%{transform:translateY(0);}
          20%{transform:translateY(-8px);}
          45%{transform:translateY(0);}
          55%{transform:translateY(-3px);}
          75%{transform:translateY(0);}
        }
        /* Arrow pulsing */
        .animate-arrow-pulse {
          animation: arrowpulse 1s infinite alternate cubic-bezier(.68,-0.55,.27,1.55);
        }
        @keyframes arrowpulse {
          from { transform: translateY(0) scale(1);}
          to   { transform: translateY(2px) scale(1.20);}
        }
        /* CTA bouton pulse */
        .animate-cta-pop {
          animation: ctaPop 1.7s infinite cubic-bezier(.57,1.36,.65,.88);
        }
        @keyframes ctaPop {
          0%,100% { transform: scale(1);}
          20% { transform: scale(1.06);}
          40% { transform: scale(1);}
        }
        /* Badge shadow */
        .shadow-badge {
          box-shadow: 0 2px 12px 0 rgba(0,220,210,0.11);
        }
        /* Animations natives existantes */
        .animate-pop {
          animation: popin 0.33s cubic-bezier(0.18, 0.89, 0.32, 1.28);
        }
        @keyframes popin {
          0% {
            opacity: 0;
            transform: scale(0.95) translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-fadein {
          animation: fadein 0.25s ease;
        }
        @keyframes fadein {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-slideup {
          animation: slideup 0.33s cubic-bezier(0.18, 0.89, 0.32, 1.28);
        }
        @keyframes slideup {
          from {
            opacity: 0;
            transform: translateY(60px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
