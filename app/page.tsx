 "use client";

import { FormEvent, useState } from "react";

const wilayas = ["أدرار","الشلف","الأغواط","أم البواقي","باتنة","بجاية","بسكرة","بشار","البليدة","البويرة","تمنراست","تبسة","تلمسان","تيارت","تيزي وزو","الجزائر","الجلفة","جيجل","سطيف","سعيدة","سكيكدة","سيدي بلعباس","عنابة","قالمة","قسنطينة","المدية","مستغانم","المسيلة","معسكر","ورقلة","وهران","البيض","إليزي","برج بوعريريج","بومرداس","الطارف","تندوف","تيسمسيلت","الوادي","خنشلة","سوق أهراس","تيبازة","ميلة","عين الدفلى","النعامة","عين تموشنت","غرداية","غليزان"];
const price = 2990;

export default function Home() {
  const [qty, setQty] = useState(1);
  const [sent, setSent] = useState(false);
  const total = price * qty;

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const response = await fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.get("name"), phone: form.get("phone"),
        wilaya: form.get("wilaya"), commune: form.get("commune"), quantity: qty
      })
    });
    if (response.ok) setSent(true);
    else alert("تعذر تسجيل الطلب. يرجى المحاولة مرة أخرى.");
  }

  return (
    <main dir="rtl">
      <header className="sticky top-0 z-30 border-b border-black/10 bg-[#faf8f3]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <div className="text-lg font-black">لُعَبِي<span className="text-[#c65b32]">.</span></div>
          <a href="#order" className="rounded-full bg-black px-5 py-2.5 text-sm font-bold text-white">اطلب الآن</a>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-10 md:grid-cols-2 md:py-20">
        <div>
          <span className="inline-flex rounded-full bg-[#c65b32] px-3 py-1 text-xs font-bold text-white">لعبة تعليمية للأطفال</span>
          <h1 className="mt-6 text-5xl font-black leading-[1.05] md:text-7xl">تعلّم الأرقام<br/><span className="text-[#c65b32]">بطريقة ممتعة!</span></h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-black/60">لعبة الأرقام الخشبية الملوّنة تساعد طفلك على التعرف على الأرقام من 1 إلى 20 وترتيبها ومطابقتها بطريقة عملية وممتعة.</p>
          <div className="mt-8 flex items-end gap-3"><span className="text-4xl font-black">{price.toLocaleString("ar-DZ")} دج</span><span className="mb-1 text-lg text-black/35 line-through">3,990 دج</span></div>
          <a href="#order" className="mt-8 inline-flex rounded-2xl bg-[#c65b32] px-7 py-4 font-bold text-white shadow-xl">أريد طلب اللعبة الآن ←</a>
          <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold text-black/60"><span>✓ الدفع عند الاستلام</span><span>✓ توصيل إلى المنزل</span><span>✓ مناسبة للتعلم واللعب</span></div>
        </div>
        <div className="relative">
          <div className="overflow-hidden rounded-[2rem] bg-[#e9e2d7] shadow-2xl"><img src="/product.png" alt="لعبة الأرقام الخشبية التعليمية من 1 إلى 20" className="h-auto w-full object-cover"/></div>
          <div className="absolute -bottom-5 -right-4 rounded-2xl bg-white p-4 shadow-xl"><div className="text-xs font-bold text-black/40">مميزة للأطفال</div><div className="mt-1 font-black">أرقام + ألوان + ترتيب</div></div>
        </div>
      </section>

      <section className="border-y border-black/10 bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 md:grid-cols-3">
          {[["01","تعلّم الأرقام","يتعرف الطفل على الأرقام من 1 إلى 20 ويتدرّب على ترتيبها."],["02","ألوان جذابة","ألوان مختلفة تجعل وقت التعلم أكثر تفاعلاً ومتعة."],["03","لعب وتعلّم","نشاط بسيط يمكن استخدامه في البيت مع الوالدين أو بشكل مستقل."]].map(([n,t,d]) => <div key={n}><div className="text-sm font-black text-[#c65b32]">{n}</div><h2 className="mt-3 text-xl font-black">{t}</h2><p className="mt-2 leading-7 text-black/55">{d}</p></div>)}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="max-w-2xl"><p className="text-sm font-black uppercase tracking-[.2em] text-[#c65b32]">لماذا تختارها؟</p><h2 className="mt-3 text-4xl font-black md:text-5xl">لعبة بسيطة، وفائدة كبيرة.</h2><p className="mt-5 leading-8 text-black/55">اجعل تعلم الأرقام نشاطاً عملياً بعيداً عن الملل. الطفل يلمس القطع، يحركها، يرتبها ويتعرف على الأرقام والألوان أثناء اللعب.</p></div>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {[["🔢","التعرف على الأرقام","نشاط عملي للتدرب على الأرقام وتسلسلها."],["🎨","تمييز الألوان","ألوان متعددة تضيف جانباً ممتعاً للنشاط."],["🧩","الترتيب والمطابقة","يمكن للطفل ترتيب القطع ومطابقة الأرقام بطريقة تفاعلية."],["👨‍👩‍👧","وقت ممتع مع العائلة","نشاط مناسب للعب والتعلم مع الوالدين."]].map(([icon,title,text]) => <div key={title} className="rounded-3xl border border-black/10 bg-white p-6"><div className="mb-8 text-2xl">{icon}</div><h3 className="font-black">{title}</h3><p className="mt-2 text-sm leading-6 text-black/50">{text}</p></div>)}
        </div>
      </section>

      <section className="bg-[#f0e9de] px-5 py-16 text-center"><p className="text-sm font-black text-[#c65b32]">العرض</p><h2 className="mt-3 text-4xl font-black md:text-5xl">اطلبها اليوم لطفلك</h2><p className="mx-auto mt-4 max-w-2xl leading-7 text-black/55">السعر الحالي {price.toLocaleString("ar-DZ")} دج، والدفع عند استلام الطلب.</p></section>

      <section id="order" className="bg-black px-5 py-16 text-white">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1fr_460px] md:items-center">
          <div><p className="text-sm font-black text-[#e78b68]">الطلب</p><h2 className="mt-3 text-5xl font-black leading-[1.05]">اطلب اللعبة الآن<br/>وادفع عند الاستلام.</h2><p className="mt-6 max-w-xl leading-7 text-white/55">أدخل معلومات التوصيل فقط. لا تحتاج إلى بطاقة بنكية أو دفع إلكتروني. سنتواصل معك لتأكيد الطلب قبل الشحن.</p><div className="mt-8 space-y-3 text-sm font-semibold text-white/75"><div>✓ الدفع عند الاستلام</div><div>✓ التوصيل إلى مختلف ولايات الجزائر</div><div>✓ تأكيد الطلب عبر الهاتف</div></div></div>

          <div className="rounded-[2rem] bg-white p-6 text-black shadow-2xl md:p-8">
            {sent ? <div className="py-12 text-center"><div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-2xl">✓</div><h3 className="mt-5 text-2xl font-black">تم تسجيل طلبك بنجاح</h3><p className="mt-3 leading-7 text-black/55">شكراً لك! سنتواصل معك هاتفياً لتأكيد الطلب.</p><button onClick={() => setSent(false)} className="mt-7 text-sm font-bold underline">تعديل الطلب</button></div> :
            <form onSubmit={submit} className="space-y-4">
              <div><label className="text-sm font-bold">الاسم الكامل</label><input required name="name" className="mt-2 w-full rounded-xl border border-black/10 bg-[#faf8f3] px-4 py-3.5 outline-none" placeholder="اكتب اسمك الكامل"/></div>
              <div><label className="text-sm font-bold">رقم الهاتف</label><input required name="phone" type="tel" pattern="[0-9 +()-]{8,}" dir="ltr" className="mt-2 w-full rounded-xl border border-black/10 bg-[#faf8f3] px-4 py-3.5 text-left outline-none" placeholder="05 / 06 / 07 XX XX XX XX"/></div>
              <div className="grid gap-4 sm:grid-cols-2"><div><label className="text-sm font-bold">الولاية</label><select required name="wilaya" className="mt-2 w-full rounded-xl border border-black/10 bg-[#faf8f3] px-4 py-3.5 outline-none"><option value="">اختر الولاية</option>{wilayas.map(w => <option key={w}>{w}</option>)}</select></div><div><label className="text-sm font-bold">البلدية</label><input required name="commune" className="mt-2 w-full rounded-xl border border-black/10 bg-[#faf8f3] px-4 py-3.5 outline-none" placeholder="اكتب البلدية"/></div></div>
              <div><label className="text-sm font-bold">الكمية</label><div className="mt-2 flex items-center justify-between rounded-xl border border-black/10 bg-[#faf8f3] p-2"><button type="button" onClick={() => setQty(Math.max(1,qty-1))} className="h-10 w-10 rounded-lg bg-white font-black">−</button><span className="font-black">{qty}</span><button type="button" onClick={() => setQty(Math.min(9,qty+1))} className="h-10 w-10 rounded-lg bg-white font-black">+</button></div></div>
              <div className="flex items-center justify-between border-t border-black/10 pt-5"><span className="font-bold text-black/50">المجموع</span><span className="text-2xl font-black">{total.toLocaleString("ar-DZ")} دج</span></div>
              <button type="submit" className="w-full rounded-xl bg-[#c65b32] py-4 font-black text-white">تأكيد الطلب الآن</button><p className="text-center text-xs text-black/40">الدفع عند الاستلام · لا يوجد دفع بالبطاقة</p>
            </form>}
          </div>
        </div>
      </section>
      <footer className="bg-black px-5 pb-10 text-center text-sm text-white/35">© 2026 لُعَبِي. جميع الحقوق محفوظة.</footer>
    </main>
  );
}