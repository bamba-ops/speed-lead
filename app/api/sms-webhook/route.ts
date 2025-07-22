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

// — Stub Redis en mémoire en dev, vraie instance en prod
type RedisClient = {
    get(key: string): Promise<string | null>;
    set(key: string, value: string, mode?: string, duration?: number): Promise<void>;
};

let redisClient: RedisClient;
if (process.env.NODE_ENV === "development") {
    // Pas de Redis local ? on stocke en Map
    const store = new Map<string, string>();
    redisClient = {
        get: async (key) => store.get(key) ?? null,
        set: async (key, value) => {
            store.set(key, value);
        },
    };
} else {
    // En prod, REDIS_URL doit être défini ainsi :
    // redis://:PASSWORD@redis-16206.c14.us-east-1-3.ec2.redns.redis-cloud.com:16206
    redisClient = new Redis(process.env.REDIS_URL!);
}

// Helper pour générer la clé par numéro
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

    // 2️⃣ Charger l’historique depuis Redis ou le stub
    const raw = await redisClient.get(redisKey(from));
    const history: { role: "user" | "assistant"; content: string }[] = raw
        ? JSON.parse(raw)
        : [];

    // 3️⃣ Construire la liste de messages pour l’API
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
    const reply = completion.choices[0].message.content.trim();

    // 5️⃣ Mettre à jour l’historique et stocker (24 h)
    history.push({ role: "user", content: incoming });
    history.push({ role: "assistant", content: reply });
    await redisClient.set(redisKey(from), JSON.stringify(history), "EX", 60 * 60 * 24);

    // 6️⃣ Répondre via Twilio
    await twClient.messages.create({ to: from, from: FROM, body: reply });

    // 7️⃣ Renvoyer un TwiML vide pour Twilio
    return new NextResponse(`<Response></Response>`, {
        status: 200,
        headers: { "Content-Type": "text/xml" },
    });
}
