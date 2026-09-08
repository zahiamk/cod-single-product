import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, wilaya, commune, quantity } = body ?? {};

    if (!name || !phone || !wilaya || !commune || !quantity) {
      return NextResponse.json(
        { ok: false, message: "Veuillez remplir tous les champs." },
        { status: 400 }
      );
    }

    const order = {
      id: `COD-${Date.now()}`,
      name: String(name).trim(),
      phone: String(phone).trim(),
      wilaya: String(wilaya).trim(),
      commune: String(commune).trim(),
      quantity: Number(quantity),
      total: Number(quantity) * 2990,
      createdAt: new Date().toISOString(),
    };

    // Send order to Google Sheets
    const googleSheetsUrl = process.env.GOOGLE_SHEETS_URL;

    if (!googleSheetsUrl) {
      console.error("GOOGLE_SHEETS_URL is not configured");

      return NextResponse.json(
        { ok: false, message: "Configuration serveur manquante." },
        { status: 500 }
      );
    }

    const sheetsResponse = await fetch(googleSheetsUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });

    if (!sheetsResponse.ok) {
      console.error(
        "Google Sheets error:",
        await sheetsResponse.text()
      );

      return NextResponse.json(
        { ok: false, message: "Impossible d'enregistrer la commande." },
        { status: 500 }
      );
    }

    console.log("NEW COD ORDER", order);

    return NextResponse.json({
      ok: true,
      orderId: order.id,
    });
  } catch (error: unknown) {
    console.error("Order error:", error);

    return NextResponse.json(
      { ok: false, message: "Erreur serveur." },
      { status: 500 }
    );
  }
}
