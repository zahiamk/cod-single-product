import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const clientOrderId = body?.clientOrderId;
    const name = body?.name;
    const phone = body?.phone;
    const wilaya = body?.wilaya;
    const commune = body?.commune;
    const quantity = body?.quantity;

    // Validate required fields
    if (
      !clientOrderId ||
      !name ||
      !phone ||
      !wilaya ||
      !commune ||
      !quantity
    ) {
      return NextResponse.json(
        {
          ok: false,
          message: "Veuillez remplir tous les champs.",
        },
        { status: 400 }
      );
    }

    // Validate quantity
    const numericQuantity = Number(quantity);

    if (
      !Number.isInteger(numericQuantity) ||
      numericQuantity < 1 ||
      numericQuantity > 9
    ) {
      return NextResponse.json(
        {
          ok: false,
          message: "Quantité invalide.",
        },
        { status: 400 }
      );
    }

    // Create the order
    const order = {
      id: "COD-" + Date.now(),
      clientOrderId: String(clientOrderId),
      name: String(name).trim(),
      phone: String(phone).trim(),
      wilaya: String(wilaya).trim(),
      commune: String(commune).trim(),
      quantity: numericQuantity,
      total: numericQuantity * 2990,
      createdAt: new Date().toISOString(),
    };

    // Google Sheets Apps Script URL
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

    // Send order to Google Sheets
    const sheetsResponse = await fetch(sheetsUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
      cache: "no-store",
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

    const sheetsResult = await sheetsResponse.json().catch(() => null);

    // Google Sheets says this order was already recorded
    if (sheetsResult?.duplicate) {
      return NextResponse.json({
        ok: true,
        duplicate: true,
        orderId: order.id,
      });
    }

    console.log("NEW COD ORDER", order);

    return NextResponse.json({
      ok: true,
      orderId: order.id,
    });
  } catch (error) {
    console.error("ORDER ERROR:", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Erreur serveur.",
      },
      { status: 500 }
    );
  }
}
