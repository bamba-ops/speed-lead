"use client";
import { useState, useRef, useEffect } from "react";

interface Message {
  from: "user" | "bot";
  text: string;
}
type ChatMessage = { role: "user" | "assistant"; content: string };

export default function LiveChatDemo() {
  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: "Bonjour 👋 ! Je suis l'assistant courtier. Que puis-je faire pour vous ?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const fetchOpenAI = async (history: ChatMessage[]) => {
    const res = await fetch("/api/chat-demo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ history }),
    });
    if (!res.ok) throw new Error("Erreur réseau ou serveur.");
    const { reply } = await res.json();
    if (!reply) throw new Error("Erreur réponse AI.");
    return reply as string;
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const newMsg: Message = { from: "user", text: input };
    setMessages(prev => [...prev, newMsg]);
    setInput("");
    setLoading(true);

    try {
      // On cast explicitement chaque entrée en ChatMessage
      const history: ChatMessage[] = [
        ...messages.map(m => ({
          role: m.from === "user" ? "user" : "assistant",
          content: m.text,
        } as ChatMessage)),
        { role: "user", content: input },
      ];

      const reply = await fetchOpenAI(history);
      const botMsg: Message = { from: "bot", text: reply };
      setMessages(prev => [...prev, botMsg]);
    } catch {
      const errorMsg: Message = { from: "bot", text: "Erreur technique, réessayez plus tard." };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="w-full max-w-[350px] mx-auto rounded-2xl bg-gradient-to-b from-neutral-950/95 via-neutral-900/95 to-neutral-950/90 border border-neutral-800 shadow-lg flex flex-col"
      style={{ minHeight: 270 }}
    >
      {/* HEADER */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-neutral-800 bg-neutral-950/85 rounded-t-2xl">
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-electric-teal/70 font-bold text-white text-xs shadow">
          AI
        </span>
        <span className="font-semibold text-white text-sm ml-1">Chat démo IA</span>
        <span className="ml-auto text-[10px] text-gray-400">Propulsé par OpenAI</span>
      </div>

      {/* MESSAGES */}
      <div
        ref={chatRef}
        className="flex-1 px-2 py-3 overflow-y-auto space-y-1 bg-neutral-950/70"
        style={{ minHeight: 90, maxHeight: 180 }}
      >
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`
                relative flex items-end max-w-[88%]
                ${msg.from === "bot"
                  ? "bg-neutral-800 text-gray-100 rounded-br-xl rounded-tr-xl rounded-tl-md"
                  : "bg-electric-teal/90 text-white rounded-bl-xl rounded-tl-xl rounded-tr-md"}
                px-3 py-[7px] text-xs leading-relaxed shadow-sm animate-[fadein_.2s_ease]
              `}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="px-3 py-[7px] rounded-br-xl rounded-tr-xl rounded-tl-md bg-neutral-800 text-gray-300 text-xs opacity-80 animate-pulse">
              L’IA rédige…
            </div>
          </div>
        )}
      </div>

      {/* INPUT */}
      <form
        className="px-2 py-2 border-t border-neutral-800 bg-neutral-950/90 rounded-b-2xl flex gap-2"
        onSubmit={e => { e.preventDefault(); handleSend(); }}
        autoComplete="off"
      >
        <input
          className="flex-1 bg-neutral-800 border-none outline-none px-3 py-2 rounded-lg text-white placeholder-gray-400 text-base"
          placeholder="Écris ton message…"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSend()}
          disabled={loading}
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="bg-electric-teal/90 hover:bg-electric-teal text-white font-bold px-3 py-2 rounded-lg text-base transition active:scale-95 disabled:opacity-60"
        >
          Envoyer
        </button>
      </form>

      <style jsx global>{`
        @keyframes fadein {
          0% { opacity: 0; transform: translateY(16px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
