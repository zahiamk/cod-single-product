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
      message: "Google Sheets error",
      details: sheetsText,
    },
    { status: 500 }
  );
}
