# COD Single Product — Vercel Ready

One-page, one-product Algerian cash-on-delivery landing page.

## Included

- Next.js + React + Tailwind CSS
- Single page / single product
- No cart
- No card payment
- COD order form
- Name, phone, Wilaya, Commune, quantity
- `/api/order` Route Handler ready for Vercel
- Mobile responsive
- No external database required for the demo

Vercel supports Next.js with zero-config deployment. Import this repository and deploy.  
Official guide: https://vercel.com/frameworks/nextjs

## Deploy

### Option A — GitHub + Vercel

1. Create a new GitHub repository.
2. Upload all files from this folder to the repository root.
3. In Vercel, choose **Add New Project** and import the repository.
4. Keep the detected Next.js framework/build settings.
5. Click **Deploy**.

Vercel automatically deploys Next.js projects and provides a production URL.

### Option B — Vercel CLI

```bash
npm install
npm run build
npx vercel
npx vercel --prod
```

## Order endpoint

The form posts to:

`POST /api/order`

It currently validates the order and logs it server-side. Replace the marked section in `app/api/order/route.ts` with your database, Google Sheets, Telegram, CRM, Yalidine/Ecotrack/etc. integration.

No payment gateway is used.

## Environment variables

Put secrets in Vercel Project Settings → Environment Variables. Do not expose secrets with `NEXT_PUBLIC_`.

## Product customization

Edit `app/page.tsx` to change:

- Product name
- Price
- Discount
- Product description
- Product image
- Benefits
- Wilaya/commune fields
- Brand name
