// app/api/notify_click/route.ts
export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL!;
export async function POST(request: NextRequest) {
    const data = await request.json();

    const forwarded = request.headers.get("x-forwarded-for") ?? "";
    const ip = forwarded.split(",")[0].trim() || "unknown";
    const ua = request.headers.get("user-agent") ?? "unknown";
    const city = request.headers.get("x-vercel-ip-city") ?? "unknown";
    const country = request.headers.get("x-vercel-ip-country") ?? "unknown";

    const source = data.source || "unknown";
    const utm = data.utm || {};
    const uaClient = data.uaClient || "unknown";
    const event = data.event || "visit";

    let title = "👀 **Nouveau visiteur sur SpeedLead**";
    if (event === "contact_click") {
        title = "🔔 **Clic sur le bouton 'Contacter le courtier'**";
    }

    const content = [
        title,
        `• IP          : \`${ip}\``,
        `• UA          : \`${ua}\``,
        `• UA Client   : \`${uaClient}\``,
        `• Localisation: **${city}, ${country}**`,
        `• Referrer    : ${source}`,
        `• UTM         : ${JSON.stringify(utm)}`
    ].join("\n");

    try {
        await axios.post(WEBHOOK_URL, { content });
    } catch (err) {
        console.error("Erreur webhook Discord :", err);
    }

    return NextResponse.json({ success: true }, { status: 200 });
}
