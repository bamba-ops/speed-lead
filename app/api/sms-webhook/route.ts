// app/api/sms-webhook/route.ts
import { NextResponse } from "next/server";
import Twilio from "twilio";
import OpenAI from "openai";
import Redis from "ioredis";

// — Initialisation Twilio
const twClient = Twilio(
    process.env.TWILIO_ACCOUNT_SID!,
    process.env.TWILIO_AUTH_TOKEN!
);
const FROM = process.env.TWILIO_FROM_NUMBER!;

// — Initialisation OpenAI (v4 SDK)
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// — Connexion Redis (Cloud / prod & dev)
const redis = new Redis(process.env.REDIS_URL!);

// Helper : clé Redis par numéro de téléphone
const redisKey = (from: string) => `chat:${from}`;

// Prompt système pour l’agent immobilier
// Prompt système — Speed-to-Lead Québec (version enrichie)
const SYSTEM_PROMPT = `
Tu es l’assistant virtuel bilingue (FR/EN) d’un courtier immobilier autorisé au Québec.
Le prospect t’a contacté via l’annonce d’une propriété précise. Ta mission : qualifier ce lead
pour cette annonce (et, au besoin, préparer des suggestions similaires).

─────────── RÈGLES GÉNÉRALES ───────────
• Langue : réponds toujours dans la langue utilisée par le client.  
• Style : messages courts (≤ 2 phrases + 1 question), ton professionnel, vouvoiement.  
• Une question à la fois ; ne répète jamais une question déjà posée.  
• Ne redemande pas la disponibilité du client, ni ne te présentes à nouveau.  
• N’offre aucun conseil juridique ou financier ; reste conforme aux exigences de l’OACIQ.  
• Termine CHAQUE message par : « Un courtier vous rappellera sous 30 minutes. ».  
• Si le client demande quand il sera appelé : réponds toujours « Le plus rapidement possible »
  avant la phrase de clôture ci-dessus.  
• Ne recueille jamais de données sensibles (NAS, dossiers médicaux, etc.).  

─────────── STRATÉGIE DE QUALIFICATION (sélectionne la prochaine question pertinente) ───────────
1. Confirmer l’intérêt : « Souhaitez-vous visiter la propriété de l’annonce (adresse ou #MLS) ? »  
2. Budget ou fourchette de prix maximal.  
3. Statut de financement : pré-approbation, comptant, besoin d’aide, etc.  
4. Délai pour l’achat / la vente (immédiat, <6 mois, 6-12 mois, >12 mois).  
5. Type de propriété recherché : maison unifamiliale, condo, plex, terrain, etc.  
6. Caractéristiques clés : surfaces, nb de chambres, stationnement, travaux acceptables, etc.  
7. Secteur ou quartier privilégié (rayon de recherche, proximité services).  
8. Besoin d’informations complémentaires (documents, photos, visite virtuelle).  
9. Contexte particulier : investissement, revente de leur maison actuelle, première propriété, etc.  

─────────── MÉMOIRE COURTE & RÉCAPITULATIF ───────────
• En interne, note chaque réponse pour ne pas la redemander.  
• Après 4-5 échanges, fais un mini-récapitulatif :  
  « À date, j’ai noté : budget …, secteur …, délai … ».  
  Puis poursuis la qualification avec la prochaine question manquante.  

─────────── GESTION DES QUESTIONS HORS PORTÉE ───────────
• Si une question dépasse tes fonctions (p. ex. fiscalité, notariat) :  
  réponds : « Le courtier pourra clarifier ce point avec vous. »  
`.trim();


export async function POST(request: Request) {
    console.log("▶ sms-webhook POST reçu");
    console.log("🔑 REDIS_URL =", process.env.REDIS_URL);

    // 1️⃣ Parser form-data Twilio
    const form = await request.formData();
    const from = String(form.get("From") ?? "");
    const incoming = String(form.get("Body") ?? "");

    // 2️⃣ Charger l’historique depuis Redis
    const raw = await redis.get(redisKey(from));
    const history: { role: "user" | "assistant"; content: string }[] = raw
        ? JSON.parse(raw)
        : [];

    // 3️⃣ Construire le tableau de messages
    const messages = [
        { role: "system" as const, content: SYSTEM_PROMPT },
        ...history.slice(-10),
        { role: "user" as const, content: incoming },
    ];

    // 4️⃣ Appel à l’API ChatGPT
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages,
        temperature: 0.7,
    });

    // 5️⃣ Extraire la réponse en toute sécurité
    const choice = completion.choices?.[0];
    const content = choice?.message?.content;
    if (typeof content !== "string") {
        console.error("⚠️ OpenAI response malformed", completion);
        // On renvoie un TwiML vide pour ne pas bloquer Twilio
        return new NextResponse(`<Response></Response>`, {
            status: 200,
            headers: { "Content-Type": "text/xml" },
        });
    }
    const reply = content.trim();

    // 6️⃣ Mettre à jour l’historique et stocker (TTL 24h)
    history.push({ role: "user", content: incoming });
    history.push({ role: "assistant", content: reply });
    await redis.set(redisKey(from), JSON.stringify(history), "EX", 60 * 60 * 24);

    // 7️⃣ Envoyer la réponse via Twilio
    await twClient.messages.create({
        to: from,
        from: FROM,
        body: reply,
    });

    // 8️⃣ Retour TwiML vide
    return new NextResponse(`<Response></Response>`, {
        status: 200,
        headers: { "Content-Type": "text/xml" },
    });
}
