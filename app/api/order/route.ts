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
      createdAt: new Date().toISOString()
    };

    // Production hook:
    // Send `order` to your database, Google Sheets, Telegram bot,
    // CRM, or delivery API here. No card payment is involved.
    console.log("NEW COD ORDER", order);

    return NextResponse.json({
      ok: true,
      orderId: order.id
    });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Erreur serveur." },
      { status: 500 }
    );
  }
}
