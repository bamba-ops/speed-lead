// app/api/notify_click/route.ts
export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL!;

export async function POST(request: NextRequest) {
    // 1️⃣ Récupérer la vraie IP client
    const forwarded = request.headers.get("x-forwarded-for") ?? "";
    const ip = forwarded.split(",")[0].trim() || "unknown";

    // 2️⃣ User-Agent
    const ua = request.headers.get("user-agent") ?? "unknown";

    // 3️⃣ Localisation via les headers Vercel
    //    Ces headers sont toujours présents en Edge Runtime
    const city = request.headers.get("x-vercel-ip-city") ?? "unknown";
    const country = request.headers.get("x-vercel-ip-country") ?? "unknown";

    // 4️⃣ Construire le message Discord
    const content = [
        "🔔 **Clique sur “Contacter le courtier”**",
        `• IP          : \`${ip}\``,
        `• UA          : \`${ua}\``,
        `• Localisation: **${city}, ${country}**`,
    ].join("\n");

    // 5️⃣ Envoyer vers Discord
    try {
        await axios.post(WEBHOOK_URL, { content });
    } catch (err) {
        console.error("Erreur webhook Discord :", err);
    }

    // 6️⃣ Réponse JSON
    return NextResponse.json({ success: true }, { status: 200 });
}
