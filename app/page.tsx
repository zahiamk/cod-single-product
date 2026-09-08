"use client";

import { FormEvent, useState } from "react";

const wilayas = [
  "أدرار",
  "الشلف",
  "الأغواط",
  "أم البواقي",
  "باتنة",
  "بجاية",
  "بسكرة",
  "بشار",
  "البليدة",
  "البويرة",
  "تمنراست",
  "تبسة",
  "تلمسان",
  "تيارت",
  "تيزي وزو",
  "الجزائر",
  "الجلفة",
  "جيجل",
  "سطيف",
  "سعيدة",
  "سكيكدة",
  "سيدي بلعباس",
  "عنابة",
  "قالمة",
  "قسنطينة",
  "المدية",
  "مستغانم",
  "المسيلة",
  "معسكر",
  "ورقلة",
  "وهران",
  "البيض",
  "إليزي",
  "برج بوعريريج",
  "بومرداس",
  "الطارف",
  "تندوف",
  "تيسمسيلت",
  "الوادي",
  "خنشلة",
  "سوق أهراس",
  "تيبازة",
  "ميلة",
  "عين الدفلى",
  "النعامة",
  "عين تموشنت",
  "غرداية",
  "غليزان",
];

const price = 2990;

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [qty, setQty] = useState(1);
  const [sent, setSent] = useState(false);

  const total = price * qty;

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      const form = new FormData(e.currentTarget);

      const data = {
        name: String(form.get("name") || "").trim(),
        phone: String(form.get("phone") || "").trim(),
        wilaya: String(form.get("wilaya") || "").trim(),
        commune: String(form.get("commune") || "").trim(),
        quantity: qty,
      };

      console.log("SENDING ORDER:", data);

      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
        cache: "no-store",
      });

      const text = await response.text();

      console.log("API STATUS:", response.status);
      console.log("API RESPONSE:", text);

      let result;

      try {
        result = JSON.parse(text);
      } catch {
        throw new Error(
          `Réponse serveur invalide (${response.status})`
        );
      }

      if (!response.ok || !result.ok) {
        throw new Error(
          result.message ||
            `Impossible d'enregistrer la commande (${response.status})`
        );
      }

      setSent(true);
    } catch (error) {
      console.error("ORDER SUBMIT ERROR:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Une erreur est survenue. Réessayez."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#faf8f3] text-black"
    >
      {/* HEADER */}
      <header className="sticky top-0 z-30 border-b border-black/10 bg-[#faf8f3]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <div className="text-lg font-black">
            لُعَبِي<span className="text-[#c65b32]">.</span>
          </div>

          <a
            href="#order"
            className="rounded-full bg-black px-5 py-2.5 text-sm font-bold text-white"
          >
            اطلب الآن
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-10 md:grid-cols-2 md:py-20">
        <div>
          <span className="inline-flex rounded-full bg-[#c65b32] px-3 py-1 text-xs font-bold text-white">
            لعبة تعليمية للأطفال
          </span>

          <h1 className="mt-6 text-5xl font-black leading-[1.05] md:text-7xl">
            تعلّم الأرقام
            <br />
            <span className="text-[#c65b32]">
              بطريقة ممتعة!
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-black/60">
            لعبة الأرقام الخشبية الملوّنة هي وسيلة تعليمية ممتعة
            تساعد طفلك على تعلّم الأرقام من 1 إلى 20 بطريقة عملية
            وتفاعلية. من خلال اللعب، يتدرّب الطفل على العدّ وترتيب
            الأرقام، إجراء عمليات الجمع والطرح البسيطة، والمقارنة بين
            الأرقام مثل أكبر من وأصغر من، مع تنمية التركيز والتفكير
            المنطقي والمهارات الحسابية.
          </p>

          <div className="mt-8 flex items-end gap-3">
            <span className="text-4xl font-black">
              {price.toLocaleString("ar-DZ")} دج
            </span>

            <span className="mb-1 text-lg text-black/35 line-through">
              3,990 دج
            </span>
          </div>

          <a
            href="#order"
            className="mt-8 inline-flex rounded-2xl bg-[#c65b32] px-7 py-4 font-bold text-white shadow-xl"
          >
            أريد طلب اللعبة الآن ←
          </a>

          <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold text-black/60">
            <span>✓ الدفع عند الاستلام</span>
            <span>✓ توصيل إلى المنزل</span>
            <span>✓ مناسبة للتعلم واللعب</span>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-[2rem] bg-[#e9e2d7] shadow-2xl">
            <img
              src="/product.png"
              alt="لعبة الأرقام الخشبية التعليمية من 1 إلى 20"
              className="h-auto w-full object-cover"
            />
          </div>

          <div className="absolute -bottom-5 -right-4 rounded-2xl bg-white p-4 shadow-xl">
            <div className="text-xs font-bold text-black/40">
              مميزة للأطفال
            </div>

            <div className="mt-1 font-black">
              أرقام + ألوان + ترتيب
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="border-y border-black/10 bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 md:grid-cols-3">
          {[
            [
              "01",
              "تعلّم الأرقام",
              "يتعرف الطفل على الأرقام من 1 إلى 20 ويتدرّب على ترتيبها.",
            ],
            [
              "02",
              "ألوان جذابة",
              "ألوان مختلفة تجعل وقت التعلم أكثر تفاعلاً ومتعة.",
            ],
            [
              "03",
              "لعب وتعلّم",
              "نشاط بسيط يمكن استخدامه في البيت مع الوالدين أو بشكل مستقل.",
            ],
          ].map(([number, title, description]) => (
            <div key={number}>
              <div className="text-sm font-black text-[#c65b32]">
                {number}
              </div>

              <h2 className="mt-3 text-xl font-black">
                {title}
              </h2>

              <p className="mt-2 leading-7 text-black/55">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* WHY */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="max-w-2xl">
          <p className="text-sm font-black uppercase tracking-[.2em] text-[#c65b32]">
            لماذا تختارها؟
          </p>

          <h2 className="mt-3 text-4xl font-black md:text-5xl">
            لعبة بسيطة، وفائدة كبيرة.
          </h2>

          <p className="mt-5 leading-8 text-black/55">
            اجعل تعلم الأرقام نشاطاً عملياً بعيداً عن الملل. الطفل
            يلمس القطع، يحركها، يرتبها ويتعرف على الأرقام والألوان
            أثناء اللعب.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {[
            [
              "🔢",
              "التعرف على الأرقام",
              "نشاط عملي للتدرب على الأرقام وتسلسلها.",
            ],
            [
              "🎨",
              "تمييز الألوان",
              "ألوان متعددة تضيف جانباً ممتعاً للنشاط.",
            ],
            [
              "🧩",
              "الترتيب والمطابقة",
              "يمكن للطفل ترتيب القطع ومطابقة الأرقام بطريقة تفاعلية.",
            ],
            [
              "👨‍👩‍👧",
              "وقت ممتع مع العائلة",
              "نشاط مناسب للعب والتعلم مع الوالدين.",
            ],
          ].map(([icon, title, description]) => (
            <div
              key={title}
              className="rounded-3xl border border-black/10 bg-white p-6"
            >
              <div className="mb-8 text-2xl">
                {icon}
              </div>

              <h3 className="font-black">{title}</h3>

              <p className="mt-2 text-sm leading-6 text-black/50">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* OFFER */}
      <section className="bg-[#f0e9de] px-5 py-16 text-center">
        <p className="text-sm font-black text-[#c65b32]">
          العرض
        </p>

        <h2 className="mt-3 text-4xl font-black md:text-5xl">
          اطلبها اليوم لطفلك
        </h2>

        <p className="mx-auto mt-4 max-w-2xl leading-7 text-black/55">
          السعر الحالي {price.toLocaleString("ar-DZ")} دج، والدفع
          عند استلام الطلب.
        </p>
      </section>

      {/* ORDER */}
      <section
        id="order"
        className="bg-black px-5 py-16 text-white"
      >
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1fr_460px] md:items-center">
          <div>
            <p className="text-sm font-black text-[#e78b68]">
              الطلب
            </p>

            <h2 className="mt-3 text-5xl font-black leading-[1.05]">
              اطلب اللعبة الآن
              <br />
              وادفع عند الاستلام.
            </h2>

            <p className="mt-6 max-w-xl leading-7 text-white/55">
              أدخل معلومات التوصيل فقط. لا تحتاج إلى بطاقة بنكية أو
              دفع إلكتروني. سنتواصل معك لتأكيد الطلب قبل الشحن.
            </p>

            <div className="mt-8 space-y-3 text-sm font-semibold text-white/75">
              <div>✓ الدفع عند الاستلام</div>
              <div>✓ التوصيل إلى مختلف ولايات الجزائر</div>
              <div>✓ تأكيد الطلب عبر الهاتف</div>
            </div>
          </div>

          {/* FORM */}
          <div className="rounded-[2rem] bg-white p-6 text-black shadow-2xl md:p-8">
            {sent ? (
              <div className="py-12 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-2xl">
                  ✓
                </div>

                <h3 className="mt-5 text-2xl font-black">
                  تم تسجيل طلبك بنجاح
                </h3>

                <p className="mt-3 leading-7 text-black/55">
                  شكراً لك! سنتواصل معك هاتفياً لتأكيد الطلب.
                </p>

                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-7 text-sm font-bold underline"
                >
                  تعديل الطلب
                </button>
              </div>
            ) : (
              <form
                onSubmit={submit}
                noValidate
                className="space-y-4"
              >
                {/* NAME */}
                <div>
                  <label className="text-sm font-bold">
                    الاسم الكامل
                  </label>

                  <input
                    required
                    name="name"
                    type="text"
                    autoComplete="name"
                    className="mt-2 w-full rounded-xl border border-black/10 bg-[#faf8f3] px-4 py-3.5 outline-none"
                    placeholder="اكتب اسمك الكامل"
                  />
                </div>

                {/* PHONE */}
                <div>
                  <label className="text-sm font-bold">
                    رقم الهاتف
                  </label>

                  <input
                    required
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    dir="ltr"
                    className="mt-2 w-full rounded-xl border border-black/10 bg-[#faf8f3] px-4 py-3.5 text-left outline-none"
                    placeholder="05 XX XX XX XX"
                  />
                </div>

                {/* WILAYA + COMMUNE */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-sm font-bold">
                      الولاية
                    </label>

                    <select
                      required
                      name="wilaya"
                      defaultValue=""
                      className="mt-2 w-full rounded-xl border border-black/10 bg-[#faf8f3] px-4 py-3.5 outline-none"
                    >
                      <option value="">
                        اختر الولاية
                      </option>

                      {wilayas.map((wilaya) => (
                        <option
                          key={wilaya}
                          value={wilaya}
                        >
                          {wilaya}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-bold">
                      البلدية
                    </label>

                    <input
                      required
                      name="commune"
                      type="text"
                      autoComplete="address-level2"
                      className="mt-2 w-full rounded-xl border border-black/10 bg-[#faf8f3] px-4 py-3.5 outline-none"
                      placeholder="اكتب البلدية"
                    />
                  </div>
                </div>

                {/* QUANTITY */}
                <div>
                  <label className="text-sm font-bold">
                    الكمية
                  </label>

                  <div className="mt-2 flex items-center justify-between rounded-xl border border-black/10 bg-[#faf8f3] p-2">
                    <button
                      type="button"
                      onClick={() =>
                        setQty((current) =>
                          Math.max(1, current - 1)
                        )
                      }
                      className="h-10 w-10 rounded-lg bg-white font-black"
                    >
                      −
                    </button>

                    <span className="font-black">
                      {qty}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        setQty((current) =>
                          Math.min(9, current + 1)
                        )
                      }
                      className="h-10 w-10 rounded-lg bg-white font-black"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* TOTAL */}
                <div className="flex items-center justify-between border-t border-black/10 pt-5">
                  <span className="font-bold text-black/50">
                    المجموع
                  </span>

                  <span className="text-2xl font-black">
                    {total.toLocaleString("ar-DZ")} دج
                  </span>
                </div>

                {/* SUBMIT */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-xl bg-[#c65b32] py-4 font-black text-white transition hover:bg-[#ad4e2b] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting
                    ? "جارٍ إرسال الطلب..."
                    : "تأكيد الطلب الآن"}
                </button>

                <p className="text-center text-xs text-black/40">
                  الدفع عند الاستلام · لا يوجد دفع بالبطاقة
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black px-5 pb-10 text-center text-sm text-white/35">
        © 2026 لُعَبِي. جميع الحقوق محفوظة.
      </footer>
    </main>
  );
}
