// app/api/send-sms/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
    try {
        const { prenom, nom, tel } = await request.json();
        const message = `Bonjour ${prenom} ${nom}, je suis votre courtier. Quelles sont vos disponibilités pour visiter le condo ?`;

        const URL = process.env.TEXTNOW_URL!;
        const COOKIE = process.env.TEXTNOW_COOKIE!;

        const HEADERS = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
            "Content-Type": "application/json",
            Origin: "https://www.textnow.com",
            Referer: "https://www.textnow.com/",
            Accept: "application/json, text/javascript, */*; q=0.01",
            Cookie: `connect.sid=${COOKIE}`,
        };

        const payload = {
            from_name: "",
            has_video: false,
            contact_value: tel,
            message,
            message_direction: 2,
            message_type: 1,
            read: 1,
            new: true,
            date: new Date().toISOString(),
        };

        const resp = await axios.post(URL, payload, { headers: HEADERS });
        return NextResponse.json({ success: true, data: resp.data }, { status: 200 });

    } catch (err: any) {
        console.error("Erreur envoi SMS :", err.response?.data || err.message);
        return NextResponse.json(
            { success: false, error: err.response?.data || err.message },
            { status: 500 }
        );
    }
}
