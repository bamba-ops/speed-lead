// app/api/send-sms/route.ts
import { NextResponse } from "next/server";
import Twilio from "twilio";

const client = Twilio(
    process.env.TWILIO_ACCOUNT_SID!,
    process.env.TWILIO_AUTH_TOKEN!
);
const FROM = process.env.TWILIO_FROM_NUMBER!;

export async function POST(request: Request) {
    try {
        const { prenom, nom, tel } = await request.json();
        const body = `Bonjour ${prenom} ${nom}, je suis votre courtier. Quelles sont vos disponibilités pour visiter le condo ?`;

        await client.messages.create({
            to: tel,
            from: FROM,
            body,
        });

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (err: any) {
        console.error("❌ Twilio Error:", err);
        return NextResponse.json(
            { success: false, error: err.message },
            { status: 500 }
        );
    }
}
