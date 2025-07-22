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

// — Connexion Redis unique (dev & prod)
// Veillez à définir REDIS_URL dans vos envs exactement comme ci-dessous
// (avec le mot de passe si nécessaire) :
const redis = new Redis(process.env.REDIS_URL!);

// Helper : clé Redis par n° de tel
const redisKey = (from: string) => `chat:${from}`;

// Prompt système pour l’agent immobilier
const SYSTEM_PROMPT = `
Vous êtes un agent immobilier virtuel.
Votre objectif est de qualifier un lead : budget, localisation, type de bien, délais, etc.
Posez une question à la fois, soyez courtois et professionnel.
`.trim();

export async function POST(request: Request) {
    console.log("▶ sms-webhook POST reçu");

    // 1️⃣ Parser le form-data de Twilio
    const form = await request.formData();
    const from = String(form.get("From") ?? "");
    const incoming = String(form.get("Body") ?? "");

    // 2️⃣ Charger l’historique depuis Redis
    const raw = await redis.get(redisKey(from));
    const history: { role: "user" | "assistant"; content: string }[] = raw
        ? JSON.parse(raw)
        : [];

    // 3️⃣ Préparer la conversation pour ChatGPT
    const messages = [
        { role: "system" as const, content: SYSTEM_PROMPT },
        ...history.slice(-10),
        { role: "user" as const, content: incoming },
    ];

    // 4️⃣ Appeler ChatGPT
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages,
        temperature: 0.7,
    });
    const reply = completion.choices[0].message.content.trim();

    // 5️⃣ Mettre à jour et stocker l’historique (24 h)
    history.push({ role: "user", content: incoming });
    history.push({ role: "assistant", content: reply });
    await redis.set(redisKey(from), JSON.stringify(history), "EX", 60 * 60 * 24);

    // 6️⃣ Répondre via Twilio
    await twClient.messages.create({ to: from, from: FROM, body: reply });

    // 7️⃣ Retour TwiML
    return new NextResponse(`<Response></Response>`, {
        status: 200,
        headers: { "Content-Type": "text/xml" },
    });
}
