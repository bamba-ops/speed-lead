// app/api/notify_click/route.ts
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL!;

export async function POST(request: NextRequest) {
    // 1️⃣ Récupérer l’IP du client
    const realIp = request.headers.get("x-real-ip");
    const forwarded = request.headers.get("x-forwarded-for");
    let ip =
        realIp
            ? realIp
            : forwarded
                ? forwarded.split(",")[0].trim()
                : "unknown";

    // 2️⃣ Récupérer le User-Agent
    const ua = request.headers.get("user-agent") ?? "unknown";

    // 3️⃣ Géolocalisation via ipapi.co
    let city = "unknown";
    let country = "unknown";
    if (ip !== "unknown") {
        try {
            const geo = await axios.get(`https://ipapi.co/${ip}/json/`);
            city = geo.data.city || city;
            country = geo.data.country_name || country;
        } catch {
            // ignore errors de géo
        }
    }

    // 4️⃣ Préparer le contenu Discord
    const content = [
        "🔔 **Clique sur “Contacter le courtier”**",
        `• IP : \`${ip}\``,
        `• UA : \`${ua}\``,
        `• Localisation : **${city}, ${country}**`,
    ].join("\n");

    // 5️⃣ Envoi vers Discord
    try {
        await axios.post(WEBHOOK_URL, { content });
    } catch (err) {
        console.error("Erreur webhook Discord :", err);
    }

    return NextResponse.json({ success: true }, { status: 200 });
}
