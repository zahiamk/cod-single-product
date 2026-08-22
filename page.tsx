 "use client";

import { FormEvent, useState } from "react";

const wilayas = [
  "Adrar","Chlef","Laghouat","Oum El Bouaghi","Batna","Béjaïa","Biskra","Béchar",
  "Blida","Bouira","Tamanrasset","Tébessa","Tlemcen","Tiaret","Tizi Ouzou","Alger",
  "Djelfa","Jijel","Sétif","Saïda","Skikda","Sidi Bel Abbès","Annaba","Guelma",
  "Constantine","Médéa","Mostaganem","M'Sila","Mascara","Ouargla","Oran",
  "El Bayadh","Illizi","Bordj Bou Arréridj","Boumerdès","El Tarf","Tindouf",
  "Tissemsilt","El Oued","Khenchela","Souk Ahras","Tipaza","Mila","Aïn Defla",
  "Naâma","Aïn Témouchent","Ghardaïa","Relizane"
];

export default function Home() {
  const [qty, setQty] = useState(1);
  const [sent, setSent] = useState(false);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const response = await fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.get("name"),
        phone: form.get("phone"),
        wilaya: form.get("wilaya"),
        commune: form.get("commune"),
        quantity: qty
      })
    });

    if (response.ok) setSent(true);
    else alert("Impossible d'enregistrer la commande. Réessayez.");
  }

  return (
    <main>
      <header className="sticky top-0 z-30 border-b border-black/10 bg-[#faf8f3]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <div className="text-lg font-black tracking-tight">MAISON<span className="text-[#c65b32]">.</span></div>
          <a href="#order" className="rounded-full bg-black px-5 py-2.5 text-sm font-bold text-white">Commander</a>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-12 md:grid-cols-2 md:py-20">
        <div>
          <span className="inline-flex rounded-full bg-black px-3 py-1 text-xs font-bold uppercase tracking-[.2em] text-white">Nouveau</span>
          <h1 className="mt-6 text-5xl font-black leading-[.95] tracking-[-.04em] md:text-7xl">
            Votre produit.<br /><span className="text-[#c65b32]">Simplement.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-8 text-black/60">
            Une présentation premium, une offre claire et une commande en quelques secondes.
            Paiement à la livraison, sans carte bancaire.
          </p>
          <div className="mt-8 flex items-end gap-3">
            <span className="text-4xl font-black">2 990 DA</span>
            <span className="mb-1 text-lg text-black/35 line-through">3 990 DA</span>
          </div>
          <a href="#order" className="mt-8 inline-flex rounded-2xl bg-[#c65b32] px-7 py-4 font-bold text-white shadow-xl shadow-[#c65b32]/20 transition hover:-translate-y-0.5">
            Commander maintenant →
          </a>
          <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold text-black/60">
            <span>✓ Paiement à la livraison</span>
            <span>✓ Livraison à domicile</span>
            <span>✓ Commande rapide</span>
          </div>
        </div>

        <div className="relative">
          <div className="aspect-[4/5] overflow-hidden rounded-[2rem] bg-[#e9e2d7] shadow-2xl">
            <div className="flex h-full items-center justify-center p-10">
              <div className="flex h-[75%] w-[55%] items-center justify-center rounded-[3rem] bg-white shadow-2xl">
                <div className="text-center">
                  <div className="mx-auto h-36 w-24 rounded-2xl bg-gradient-to-br from-[#1d1d1d] to-[#777]" />
                  <p className="mt-5 text-xs font-black tracking-[.3em]">VOTRE PRODUIT</p>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-5 -left-4 rounded-2xl bg-white p-4 shadow-xl">
            <div className="text-xs font-bold text-black/40">OFFRE LIMITÉE</div>
            <div className="mt-1 font-black">-25% aujourd'hui</div>
          </div>
        </div>
      </section>

      <section className="border-y border-black/10 bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 md:grid-cols-3">
          {[
            ["01", "Qualité premium", "Un produit pensé pour être utilisé chaque jour."],
            ["02", "Livraison à domicile", "Recevez votre commande directement chez vous."],
            ["03", "Paiement à la livraison", "Vous payez uniquement lorsque vous recevez le colis."]
          ].map(([n,t,d]) => (
            <div key={n}>
              <div className="text-sm font-black text-[#c65b32]">{n}</div>
              <h2 className="mt-3 text-xl font-black">{t}</h2>
              <p className="mt-2 leading-7 text-black/55">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="max-w-2xl">
          <p className="text-sm font-black uppercase tracking-[.2em] text-[#c65b32]">Pourquoi vous allez l'aimer</p>
          <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">Tout ce qu'il faut. Rien de plus.</h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {["Design élégant et moderne","Utilisation simple au quotidien","Matériaux sélectionnés","Garantie de satisfaction"].map((x,i) => (
            <div key={x} className="rounded-3xl border border-black/10 bg-white p-6">
              <div className="mb-8 text-2xl">{["✦","◉","◇","✓"][i]}</div>
              <h3 className="font-black">{x}</h3>
              <p className="mt-2 text-sm leading-6 text-black/50">Remplacez ce texte par votre avantage produit principal.</p>
            </div>
          ))}
        </div>
      </section>

      <section id="order" className="bg-black px-5 py-16 text-white">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1fr_460px] md:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[.2em] text-[#e78b68]">Commande</p>
            <h2 className="mt-3 text-5xl font-black leading-none tracking-tight">Recevez votre produit à domicile.</h2>
            <p className="mt-6 max-w-xl leading-7 text-white/55">
              Remplissez uniquement vos informations de livraison. Aucun paiement en ligne.
              Un conseiller peut vous contacter pour confirmer la commande.
            </p>
            <div className="mt-8 space-y-3 text-sm font-semibold text-white/75">
              <div>✓ Paiement à la réception</div>
              <div>✓ Livraison partout en Algérie</div>
              <div>✓ Confirmation de commande par téléphone</div>
            </div>
          </div>

          <div className="rounded-[2rem] bg-white p-6 text-black shadow-2xl md:p-8">
            {sent ? (
              <div className="py-12 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-2xl">✓</div>
                <h3 className="mt-5 text-2xl font-black">Commande enregistrée</h3>
                <p className="mt-3 leading-7 text-black/55">Merci ! Votre commande est prête à être confirmée par téléphone.</p>
                <button onClick={() => setSent(false)} className="mt-7 text-sm font-bold underline">Modifier la commande</button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <div>
                  <label className="text-sm font-bold">Nom complet</label>
                  <input required name="name" className="mt-2 w-full rounded-xl border border-black/10 bg-[#faf8f3] px-4 py-3.5 outline-none focus:border-black" placeholder="Votre nom" />
                </div>
                <div>
                  <label className="text-sm font-bold">Téléphone</label>
                  <input required name="phone" type="tel" pattern="[0-9 +()-]{8,}" className="mt-2 w-full rounded-xl border border-black/10 bg-[#faf8f3] px-4 py-3.5 outline-none focus:border-black" placeholder="05 / 06 / 07 XX XX XX XX" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-sm font-bold">Wilaya</label>
                    <select required name="wilaya" className="mt-2 w-full rounded-xl border border-black/10 bg-[#faf8f3] px-4 py-3.5 outline-none focus:border-black">
                      <option value="">Choisir</option>
                      {wilayas.map(w => <option key={w}>{w}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-bold">Commune</label>
                    <input required name="commune" className="mt-2 w-full rounded-xl border border-black/10 bg-[#faf8f3] px-4 py-3.5 outline-none focus:border-black" placeholder="Votre commune" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-bold">Quantité</label>
                  <div className="mt-2 flex items-center justify-between rounded-xl border border-black/10 bg-[#faf8f3] p-2">
                    <button type="button" onClick={() => setQty(Math.max(1, qty-1))} className="h-10 w-10 rounded-lg bg-white font-black">−</button>
                    <span className="font-black">{qty}</span>
                    <button type="button" onClick={() => setQty(Math.min(9, qty+1))} className="h-10 w-10 rounded-lg bg-white font-black">+</button>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-black/10 pt-5">
                  <span className="font-bold text-black/50">Total</span>
                  <span className="text-2xl font-black">{(2990*qty).toLocaleString("fr-FR")} DA</span>
                </div>
                <button type="submit" className="w-full rounded-xl bg-[#c65b32] py-4 font-black text-white transition hover:bg-[#ad4e2b]">
                  CONFIRMER MA COMMANDE
                </button>
                <p className="text-center text-xs text-black/40">Paiement à la livraison · Aucun paiement par carte</p>
              </form>
            )}
          </div>
        </div>
      </section>

      <footer className="bg-black px-5 pb-10 text-center text-sm text-white/35">
        © 2026 MAISON. Tous droits réservés.
      </footer>
    </main>
  );
}