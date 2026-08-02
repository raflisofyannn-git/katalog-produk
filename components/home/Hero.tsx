"use client";

import Image from "next/image";
import { ShoppingBag, MessageCircle } from "lucide-react";
import { useSettings } from "@/hooks/useSettings";

export default function Hero() {
  const { settings } = useSettings();

  return (
    <section className="relative overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/hero/ocean.jpg"
          alt="Ocean"
          fill
          priority
          className="object-cover"
        />
<div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,.18),transparent_50%)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-[#06204d]/20 to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-[760px] max-w-7xl items-center px-6">

        {/* LEFT */}
        <div className="max-w-lg">

          <span className="inline-flex rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white">
            {settings?.heroBadge}
          </span>

          <h1 className="mt-7 text-5xl xl:text-6xl font-extrabold leading-tight text-white">

  {settings?.heroTitle}

  <br />

  <span className="text-cyan-400">
    {settings?.heroSubtitle}
  </span>

</h1>

<p className="mt-8 max-w-lg text-xl leading-9 text-white/90">

  {settings?.heroDescription}

</p>

          <div className="mt-10 flex gap-5">

            <a
              href="#produk"
              className="flex items-center gap-3 rounded-2xl bg-blue-600 px-9 py-5 font-bold text-white transition hover:bg-blue-700"
            >
              <ShoppingBag size={22} />
              {settings?.heroButton}
            </a>

            <a
              href={`https://wa.me/${settings?.adminPhone}`}
              target="_blank"
              className="flex items-center gap-3 rounded-2xl bg-white px-9 py-5 font-bold text-green-600 shadow-lg transition hover:scale-105"
            >
              <MessageCircle size={22} />
              {settings?.heroWhatsappButton}
            </a>

          </div>

        </div>

        {/* RIGHT */}

<div className="relative ml-auto hidden h-[720px] w-[820px] lg:block">

  {/* Batu */}
  <Image
  src="/hero/rock.png"
  alt="Rock"
  width={700}
  height={260}
  className="absolute bottom-0 left-8 z-10"
/>
<div className="absolute bottom-5 left-52 z-20 h-10 w-[520px] rounded-full bg-black/25 blur-3xl" />

  {/* Long Fins */}
  <Image
  src="/hero/longfins.png"
  alt="Long Fins"
  width={400}
  height={400}
  className="absolute right-18 bottom-16 z-10"
/>

  {/* Wetsuit */}
  <Image
  src="/hero/wetsuit.png"
  alt="Wetsuit"
  width={260}
  height={260}
  className="absolute left-92 top-76 z-10"
/>

  {/* Mask */}
  <Image
  src="/hero/mask3.png"
  alt="Drybag"
  width={210}
  height={210}
  className="absolute left-25 bottom-20 z-30"
/>

</div>

      </div>

    </section>
  );
}