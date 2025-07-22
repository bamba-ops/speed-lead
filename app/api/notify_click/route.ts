// app/api/notify_click/route.ts

// 1️⃣ Passez en Edge Runtime pour bénéficier de request.geo
export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL!;

export async function POST(request: NextRequest) {
    // 2️⃣ Récupérer l’IP client (via x-forwarded-for)
    const forwarded = request.headers.get("x-forwarded-for") ?? "";
    const ip = forwarded.split(",")[0].trim() || "unknown";

    // 3️⃣ Récupérer le User-Agent
    const ua = request.headers.get("user-agent") ?? "unknown";

    // 4️⃣ Exploiter la géoloc fournie par Vercel
    //    request.geo est peuplé automatiquement en Edge Runtime
    const { city = "unknown", country = "unknown" } = request.geo ?? {};

    // 5️⃣ Composer le message pour Discord
    const content = [
        "🔔 **Clique sur “Contacter le courtier”**",
        `• IP         : \`${ip}\``,
        `• UA         : \`${ua}\``,
        `• Localisation: **${city}, ${country}**`,
    ].join("\n");

    // 6️⃣ Envoyer vers votre webhook Discord
    try {
        await axios.post(WEBHOOK_URL, { content });
    } catch (err) {
        console.error("Erreur webhook Discord :", err);
    }

    // 7️⃣ Répondre avec un JSON de confirmation
    return NextResponse.json({ success: true }, { status: 200 });
}
