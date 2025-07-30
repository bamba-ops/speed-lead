"use client";
import { useState, FormEvent } from "react";
import { Loader2, CheckCircle, AlertCircle, Phone } from "lucide-react";

export default function CentrisDemo() {
  const [tel, setTel] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3200);
  };

  // notifyClick now accepts an eventName
  const notifyClick = async (eventName: string = "contact_click") => {
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
          event: eventName,
          source: referrer,
          utm,
          uaClient,
        }),
      });
    } catch (err) {
      // silent
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const resp = await fetch("/api/send-sms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tel }),
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
      setTel("");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* TOAST en bas à droite */}
      <div className="fixed z-50 bottom-5 right-5 flex flex-col gap-2 items-end pointer-events-none">
        {toast && (
          <div className={`flex items-center gap-2 px-4 py-3 rounded-xl shadow-xl animate-pop ${toast.type === "success" ? "bg-emerald-900/90 border border-emerald-800 text-emerald-200" : "bg-red-900/90 border border-red-800 text-red-200"} font-medium text-sm pointer-events-auto`}>
            {toast.type === "success" ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <AlertCircle className="w-4 h-4 text-red-400" />}
            {toast.message}
          </div>
        )}
      </div>

      <form className="flex flex-col sm:flex-row items-center gap-3 p-4 bg-neutral-900/80 border border-neutral-800 rounded-2xl shadow-2xl transition-all duration-200" onSubmit={handleSubmit} autoComplete="off">
        <div className="flex items-center w-full sm:w-auto flex-1 bg-neutral-800 rounded-xl shadow-inner px-3 py-3 transition-all border border-neutral-700 focus-within:ring-2 focus-within:ring-electric-teal/60 focus-within:border-electric-teal/80">
          <Phone className="w-5 h-5 text-electric-teal/80 mr-2 flex-shrink-0" />
          <input
            id="tel"
            type="tel"
            required
            placeholder="Entrer ton numéro…"
            className="w-full bg-transparent border-none outline-none text-base sm:text-lg text-white placeholder-gray-400 autofill:bg-neutral-800"
            value={tel}
            onChange={(e) => setTel(e.target.value)}
            onFocus={() => notifyClick("Vas rentré son numéro")}
            disabled={loading}
            autoComplete="off"
            inputMode="tel"
            pattern="^[0-9+ ()-]{8,}$"
            style={{ minWidth: 0 }}
          />
        </div>
        <button
          type="submit"
          disabled={loading || tel.length < 8}
          className={`flex justify-center items-center gap-2 bg-electric-teal/90 text-white font-semibold px-5 py-3 rounded-xl text-base sm:text-lg shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-electric-teal/30 active:scale-95 animate-cta-pop ${loading ? "opacity-60 cursor-not-allowed" : ""} w-full sm:w-auto`}
          onClick={() => notifyClick("contact_click")}
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Envoi...
            </>
          ) : (
            "Recevoir la démo"
          )}
        </button>
      </form>

      <style jsx global>{`
        .animate-pop {
          animation: popin 0.33s cubic-bezier(0.18, 0.89, 0.32, 1.28);
        }
        @keyframes popin {
          0% { opacity: 0; transform: scale(0.95) translateY(20px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-cta-pop {
          animation: ctaPop 1.6s infinite cubic-bezier(.57,1.36,.65,.88);
        }
        @keyframes ctaPop {
          0%,100% { transform: scale(1); }
          22% { transform: scale(1.055); }
          45% { transform: scale(1); }
        }
        input:-webkit-autofill,
        input:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0 1000px #232325 inset !important;
          -webkit-text-fill-color: #fff !important;
          transition: background-color 5000s ease-in-out 0s;
        }
      `}</style>
    </div>
  );
}
