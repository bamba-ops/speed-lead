// app/api/send-sms/route.ts
import { NextResponse } from "next/server";
import Twilio from "twilio";

const client = Twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);
const FROM = process.env.TWILIO_FROM_NUMBER!;
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL!;

export async function POST(request: Request) {
  try {
    // ── 1️⃣ Récupérer le payload JSON
    const { tel } = await request.json();

    // ── 2️⃣ Extraire IP et User-Agent depuis les headers
    const forwarded = request.headers.get("x-forwarded-for") ?? "";
    const ip = forwarded.split(",")[0].trim() || "unknown";
    const ua = request.headers.get("user-agent") ?? "unknown";

    // ── 3️⃣ Envoyer un message sur Discord
    const discordContent = [
      "🔔 **Nouveau lead**",
      `• Téléphone    : **${tel}**`,
      `• IP           : \`${ip}\``,
      `• User-Agent   : \`${ua}\``,
    ].join("\n");

    await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: discordContent }),
    });

    // ── 4️⃣ Envoyer le SMS via Twilio
    const body = `Bonjour, c'est votre courtier. Quand êtes-vous disponible pour une visite ?`;

    await client.messages.create({
      to: tel,
      from: FROM,
      body,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: any) {
    console.error("❌ Erreur dans send-sms :", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
