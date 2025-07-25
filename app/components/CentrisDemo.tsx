// app/components/CentrisDemo.tsx
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
    setTimeout(() => setToast(null), 3400);
  };

  // Envoie une notification Discord à chaque clic sur le bouton (avec provenance)
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
        event: "contact_click", // 👈 Ici !
        source: referrer,
        utm,
        uaClient,
      }),
    });
  } catch (err) {
    console.error("Notification click failed", err);
  }
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
        const text = await resp.text();
        console.error("Erreur HTTP", resp.status, text);
        showToast("error", "Erreur lors de l'envoi du SMS. Réessayez.");
        return;
      }

      const result = await resp.json();
      if (result.success) {
        showToast("success", "SMS envoyé avec succès !");
      } else {
        console.error("API SMS error:", result.error);
        showToast(
          "error",
          result.error?.error_code === "AUTHENTICATION_FAILED"
            ? "Authentification TextNow échouée."
            : "Erreur d'envoi du SMS. Voir console."
        );
      }
    } catch (err) {
      console.error("Erreur réseau :", err);
      showToast("error", "Erreur réseau lors de l’envoi.");
    } finally {
      setLoading(false);
      setPopup(false);
      setForm({ prenom: "", nom: "", tel: "" });
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto bg-white shadow-xl overflow-hidden rounded-none sm:rounded-2xl border border-gray-200">
      {/* Toast notification */}
      {toast && (
        <div
          className={`fixed left-1/2 top-6 z-[999] -translate-x-1/2 min-w-[240px] max-w-xs px-4 py-3 rounded-lg flex items-center gap-2 text-sm font-semibold shadow-lg transition-all animate-pop ${
            toast.type === "success"
              ? "bg-green-50 text-green-800 border border-green-300"
              : "bg-red-50 text-red-700 border border-red-300"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle className="w-5 h-5 text-green-500" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-500" />
          )}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Header Centris */}
      <div className="flex items-center px-4 py-3 border-b border-gray-100">
        <div className="flex-1" />
        <div className="w-9 h-9 bg-blue-900 rounded-full flex items-center justify-center">
          <User className="text-white w-5 h-5" />
        </div>
      </div>

      {/* Photo principale */}
      <div className="relative">
        <Image
          src={mainPhoto}
          alt="Condo"
          width={1260}
          height={1024}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3 bg-blue-900 text-white text-xs px-2 py-1 rounded shadow">
          Nouvelle inscription
        </div>
        <div className="absolute bottom-3 right-3 bg-white text-blue-900 text-xs px-2 py-1 rounded shadow flex items-center gap-1">
          <Home className="w-4 h-4" /> 25
        </div>
      </div>

      {/* Informations */}
      <div className="px-3 pt-4 pb-6 sm:px-4">
        <div className="text-[22px] font-bold text-gray-900 mb-1">499 000 $</div>
        <div className="font-semibold text-[15px] text-gray-800 mb-0.5">
          Condo à vendre
        </div>
        <div className="flex items-center text-[13px] text-gray-600 mb-3">
          <MapPin className="w-4 h-4 mr-1 text-blue-900" />
          7825, Avenue Niagara, app. 8, Brossard
        </div>

        {/* Boutons Carte/Streetview */}
        <div className="flex gap-2 mb-5">
          <button className="flex-1 border border-blue-900 text-blue-900 rounded-full py-1 text-xs font-semibold">
            Carte
          </button>
          <button className="flex-1 border border-blue-900 text-blue-900 rounded-full py-1 text-xs font-semibold">
            Streetview
          </button>
        </div>

        {/* Caractéristiques */}
        <div>
          <div className="font-bold text-blue-900 mb-2 text-[16px]">
            Caractéristiques
          </div>
          <div className="flex items-center text-gray-700 text-sm mb-1">
            <Home className="w-5 h-5 text-purple-700 mr-2" /> Style de vie
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2 text-[15px]">
            <div className="flex items-center gap-1 text-purple-700">
              <Home className="w-4 h-4" /> 7 pièces
            </div>
            <div className="flex items-center gap-1 text-purple-700">
              <BedDouble className="w-4 h-4" /> 3 chambres
            </div>
            <div className="flex items-center gap-1 text-purple-700">
              <Bath className="w-4 h-4" /> 1 salle de bain
            </div>
          </div>
          <div className="flex justify-between mt-4 text-xs text-gray-800">
            <div>
              <span className="font-bold">Type de copropriété</span>
              <div>Divise</div>
            </div>
            <div>
              <span className="font-bold">Superficie nette</span>
              <div>964 pc</div>
            </div>
          </div>
        </div>

        {/* Bouton de contact */}
        <button
          className="mt-7 w-full bg-blue-900 text-white font-semibold py-3 rounded-full text-base shadow-md hover:bg-blue-800 transition-transform active:scale-95 duration-100"
          onClick={() => {
            notifyClick();
            setPopup(true);
          }}
        >
          Contacter le courtier immobilier
        </button>
      </div>

      {/* Popup form – responsive + anim */}
      {popup && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 animate-fadein">
          <div className="bg-white w-full rounded-t-3xl sm:rounded-xl sm:max-w-[360px] shadow-xl px-5 py-7 relative animate-slideup">
            <button
              onClick={() => setPopup(false)}
              className="absolute top-4 right-5 text-gray-400 hover:text-gray-700 transition"
              aria-label="Fermer le formulaire"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="font-bold text-lg mb-6 text-blue-900">
              Contacter Li Zhao
            </div>
            <form
              className="flex flex-col gap-3"
              onSubmit={handleSubmit}
              autoComplete="off"
            >
              <input
                type="text"
                required
                placeholder="Prénom"
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-900 transition"
                value={form.prenom}
                onChange={(e) =>
                  setForm({ ...form, prenom: e.target.value })
                }
                disabled={loading}
              />
              <input
                type="text"
                required
                placeholder="Nom"
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-900 transition"
                value={form.nom}
                onChange={(e) => setForm({ ...form, nom: e.target.value })}
                disabled={loading}
              />
              <input
                type="tel"
                required
                placeholder="Téléphone"
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-900 transition"
                value={form.tel}
                onChange={(e) => setForm({ ...form, tel: e.target.value })}
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading}
                className={`mt-3 flex justify-center items-center gap-2 bg-blue-900 text-white font-semibold py-2 rounded-full hover:bg-blue-800 transition focus:ring-2 focus:ring-blue-500 active:scale-95 duration-100 ${
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
            <div className="flex items-center gap-3 mt-6 bg-gray-50 rounded-lg px-3 py-2">
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
                  <Phone className="w-4 h-4 text-blue-900" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Animations CSS avec Tailwind utilities */}
      <style jsx global>{`
        .animate-pop {
          animation: popin 0.33s cubic-bezier(0.18, 0.89, 0.32, 1.28);
        }
        @keyframes popin {
          0% {
            opacity: 0;
            transform: scale(0.85) translateY(-30px);
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
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-slideup {
          animation: slideup 0.33s cubic-bezier(0.18, 0.89, 0.32, 1.28);
        }
        @keyframes slideup {
          from {
            opacity: 0;
            transform: translateY(80px);
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
