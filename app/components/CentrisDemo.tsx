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
      // On ne ferme plus la popup immédiatement pour que l'utilisateur voie le message
      // setPopup(false);
      setForm({ prenom: "", nom: "", tel: "" });
    }
  };

  return (
    <div className="relative w-full bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      {/* HEADER */}
      <div className="flex items-center px-4 py-3 border-b border-gray-100 bg-gray-50">
        <div className="flex-1 text-gray-600 font-medium text-sm">
          Démo immobilière
        </div>
        <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
          <User className="text-white w-4 h-4" />
        </div>
      </div>

      {/* CARD: column sur mobile, row sur md+ */}
      <div className="flex flex-col md:flex-row">
        {/* Image à gauche sur desktop, en haut sur mobile */}
        <div className="w-full md:w-48 h-28 sm:h-36 md:h-auto md:min-h-[220px] relative">
          <Image
            src={mainPhoto}
            alt="Condo"
            fill
            className="object-cover md:rounded-l-xl md:rounded-tr-none rounded-t-xl"
            sizes="(max-width: 768px) 100vw, 200px"
            priority
          />
        </div>
        {/* Infos et CTA */}
        <div className="flex-1 flex flex-col justify-between px-3 pt-2 pb-3 md:py-6 md:px-6">
          <div>
            <div className="text-lg md:text-2xl font-bold text-gray-900 mb-1">
              499 000 $
            </div>
            <div className="font-semibold text-gray-700 mb-1 text-sm md:text-base">
              Condo à vendre
            </div>
            <div className="flex items-center text-xs md:text-sm text-gray-500 mb-2">
              <MapPin className="w-4 h-4 mr-1 text-gray-400" />
              7825, Avenue Niagara, app. 8, Brossard
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs md:text-sm text-gray-600 mb-2">
              <div className="flex items-center gap-1">
                <Home className="w-4 h-4" /> 7 pièces
              </div>
              <div className="flex items-center gap-1">
                <BedDouble className="w-4 h-4" /> 3 chambres
              </div>
              <div className="flex items-center gap-1">
                <Bath className="w-4 h-4" /> 1 sdb
              </div>
            </div>
          </div>
          {/* CTA bouton */}
          <button
            className="w-full bg-gray-900 text-white font-semibold py-2 rounded-lg text-base hover:bg-gray-800 transition mt-1"
            onClick={() => {
              notifyClick();
              setPopup(true);
            }}
          >
            Contacter le courtier immobilier
          </button>
        </div>
      </div>

      {/* POPUP */}
      {popup && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 animate-fadein">
          <div className="bg-white w-full rounded-t-3xl sm:rounded-xl sm:max-w-[380px] shadow-xl px-5 py-8 relative animate-slideup">
            <button
              onClick={() => setPopup(false)}
              className="absolute top-4 right-5 text-gray-400 hover:text-gray-700 transition"
              aria-label="Fermer le formulaire"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="font-bold text-xl mb-7 text-gray-900 text-center">
              Contacter Li Zhao
            </div>

            {/* Toast message directement dans la popup, au-dessus du form */}
            {toast && (
              <div
                className={`w-full flex items-center justify-center mb-5 animate-pop ${
                  toast.type === "success"
                    ? "bg-green-50 text-green-800 border border-green-300"
                    : "bg-red-50 text-red-700 border border-red-300"
                } rounded-lg px-4 py-3 font-semibold text-sm gap-2`}
              >
                {toast.type === "success" ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-500" />
                )}
                <span>{toast.message}</span>
              </div>
            )}

            <form
              className="flex flex-col gap-5"
              onSubmit={handleSubmit}
              autoComplete="off"
            >
              <div>
                <label
                  htmlFor="prenom"
                  className="block text-gray-800 font-medium text-sm mb-1"
                >
                  Prénom
                </label>
                <input
                  id="prenom"
                  type="text"
                  required
                  placeholder="Prénom"
                  className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-electric-teal focus:border-electric-teal transition"
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
                  className="block text-gray-800 font-medium text-sm mb-1"
                >
                  Nom
                </label>
                <input
                  id="nom"
                  type="text"
                  required
                  placeholder="Nom"
                  className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-electric-teal focus:border-electric-teal transition"
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
                  className="block text-gray-800 font-medium text-sm mb-1"
                >
                  Téléphone
                </label>
                <input
                  id="tel"
                  type="tel"
                  required
                  placeholder="Téléphone"
                  className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-electric-teal focus:border-electric-teal transition"
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
                className={`mt-2 flex justify-center items-center gap-2 bg-gray-900 text-white font-semibold py-2 rounded-lg hover:bg-gray-800 transition ${
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
            <div className="flex items-center gap-3 mt-7 bg-gray-50 rounded-lg px-3 py-2">
              <Image
                src="https://randomuser.me/api/portraits/women/82.jpg"
                alt="Li Zhao"
                width={48}
                height={48}
                className="rounded-full object-cover"
              />
              <div>
                <div className="font-semibold text-sm text-gray-900">
                  Li Zhao
                </div>
                <div className="text-xs text-gray-700">
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
