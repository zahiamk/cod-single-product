import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, wilaya, commune, quantity } = body ?? {};

    if (!name || !phone || !wilaya || !commune || !quantity) {
      return NextResponse.json(
        {
          ok: false,
          message: "Veuillez remplir tous les champs.",
        },
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

    const googleSheetsUrl = process.env.GOOGLE_SHEETS_URL;

    if (!googleSheetsUrl) {
      console.error("GOOGLE_SHEETS_URL is missing");

      return NextResponse.json(
        {
          ok: false,
          message: "GOOGLE_SHEETS_URL n'est pas configuré.",
        },
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

    const sheetsText = await sheetsResponse.text();

    console.log("GOOGLE SHEETS STATUS:", sheetsResponse.status);
    console.log("GOOGLE SHEETS RESPONSE:", sheetsText);

    if (!sheetsResponse.ok) {
      return NextResponse.json(
        {
          ok: false,
          message: "Google Sheets a refusé la commande.",
          details: sheetsText,
        },
        { status: 500 }
      );
    }

    console.log("NEW COD ORDER:", order);

    return NextResponse.json({
      ok: true,
      orderId: order.id,
    });
  } catch (error: unknown) {
    console.error("ORDER ERROR:", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Erreur serveur.",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
