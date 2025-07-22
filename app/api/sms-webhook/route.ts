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
const SYSTEM_PROMPT = `
Vous êtes un agent immobilier virtuel.
Votre objectif est de qualifier un lead : budget, localisation, type de bien, délais, etc.
Posez une question à la fois, soyez courtois et professionnel.
`.trim();

export async function POST(request: Request) {
    console.log("▶ sms-webhook POST reçu");

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
