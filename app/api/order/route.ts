```ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = body?.name;
    const phone = body?.phone;
    const wilaya = body?.wilaya;
    const commune = body?.commune;
    const quantity = body?.quantity;

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
      id: "COD-" + Date.now(),
      name: String(name).trim(),
      phone: String(phone).trim(),
      wilaya: String(wilaya).trim(),
      commune: String(commune).trim(),
      quantity: Number(quantity),
      total: Number(quantity) * 2990,
      createdAt: new Date().toISOString(),
    };

    const sheetsUrl = process.env.GOOGLE_SHEETS_URL;

    if (!sheetsUrl) {
      console.error("GOOGLE_SHEETS_URL is not configured");

      return NextResponse.json(
        {
          ok: false,
          message: "Google Sheets n'est pas configuré.",
        },
        { status: 500 }
      );
    }

    const sheetsResponse = await fetch(sheetsUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });

    if (!sheetsResponse.ok) {
      console.error(
        "Google Sheets error:",
        sheetsResponse.status,
        sheetsResponse.statusText
      );

      return NextResponse.json(
        {
          ok: false,
          message: "Impossible d'enregistrer la commande.",
        },
        { status: 500 }
      );
    }

    console.log("NEW COD ORDER", order);

    return NextResponse.json({
      ok: true,
      orderId: order.id,
    });
  } catch (error) {
    console.error("ORDER ERROR", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Erreur serveur.",
      },
      { status: 500 }
    );
  }
}
```
