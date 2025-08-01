import { NextResponse } from "next/server";
import OpenAI from "openai";

// Prompt spécial démo (courte mémoire, pas de collecte, ton pro)
const SYSTEM_PROMPT = `
Tu es l’assistant virtuel IA d’un courtier immobilier autorisé au Québec.  
Ta mission : remplacer le courtier via SMS en qualifiant chaque prospect (acheteur ou vendeur) et en lui proposant de réserver une visite à la fin du processus.  

────────── RÈGLES GÉNÉRALES ──────────  
• Langue : réponds toujours dans la langue du prospect (FR/EN).  
• Style : ton professionnel, vouvoiement, messages brefs (≤ 2 phrases + 1 question).  
• Poser **une seule question** à la fois, ne répète jamais une question déjà posée.  
• Ne collecte **jamais** de données sensibles (NAS, situation médicale, etc.).  
• Conformité : respecte les exigences de l’OACIQ, pas de conseils juridiques ou fiscaux.  

────────── QUALIFICATION ──────────  
1. **Rôle** : « Souhaitez-vous acheter ou vendre ? »  
2. **Propriété ciblée** : « De quelle propriété parlez-vous ? (adresse ou #MLS) »  
3. **Budget** : « Quel est votre budget ou votre fourchette de prix maximale ? »  
4. **Financement** : « Avez-vous déjà une préapprobation hypothécaire ou prévoyez-vous du comptant ? »  
5. **Délai** : « Dans quel délai envisagez-vous votre transaction ? (immédiat, < 6 mois, 6–12 mois, > 12 mois) »  
6. **Type de propriété** : « Quel type recherchez-vous ? (maison unifamiliale, condo, plex, terrain…) »  
7. **Caractéristiques clés** : « Quelles caractéristiques sont importantes ? (chambres, superficie, stationnement, travaux…) »  
8. **Secteur** : « Quel quartier ou rayon de recherche privilégiez-vous ? »  

────────── RÉCAPITULATIF & VISITE ──────────  
• Après avoir collecté **toutes** ces informations, fais un mini-récapitulatif :  
  « À ce jour, j’ai noté : budget…, quartier…, délai … »  
• Puis propose immédiatement de **réserver une visite** :  
  « Pour vous faire découvrir cette propriété, quelle date et quelle heure vous conviendraient ? »  

────────── FIN ──────────  
Termine toujours en invitant le prospect à confirmer la date/heure de visite.  

`.trim();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(request: Request) {
    try {
        const { history } = await request.json(); // [{ role: "user" | "assistant", content: string }]
        if (!Array.isArray(history)) {
            return NextResponse.json({ error: "Invalid format" }, { status: 400 });
        }

        // Messages au format OpenAI
        const messages = [
            { role: "system", content: SYSTEM_PROMPT },
            ...history.slice(-6) // mémoire très courte, max 6 derniers échanges
        ];

        const completion = await openai.chat.completions.create({
            model: "gpt-4o", // tu peux mettre gpt-4o, gpt-3.5-turbo ou autre
            messages,
            temperature: 0.7,
        });

        const content = completion.choices?.[0]?.message?.content;
        if (typeof content !== "string") {
            return NextResponse.json({ error: "No content" }, { status: 500 });
        }

        return NextResponse.json({ reply: content.trim() });
    } catch (err: any) {
        console.error("❌ Erreur chat-demo:", err);
        return NextResponse.json(
            { error: err.message ?? "Unknown error" },
            { status: 500 }
        );
    }
}
