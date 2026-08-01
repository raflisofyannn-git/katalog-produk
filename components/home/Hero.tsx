"use client";

import Image from "next/image";
import { useSettings } from "@/hooks/useSettings";

export default function Hero() {

  const { settings } = useSettings();

  return (
    <section className="mx-auto mt-8 max-w-7xl px-4">

      <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 to-blue-500">

        <div className="grid items-center gap-8 px-8 py-16 md:grid-cols-2">

          <div>

            <span className="rounded-full bg-white/20 px-4 py-2 text-sm text-white">

              {settings?.heroBadge ||
                "IMPORT PRODUK CHINA"}

            </span>

            <h1 className="mt-6 text-4xl font-extrabold text-white md:text-6xl">
            {settings?.heroTitle ||
            "100% ORIGINAL"}
            </h1>

            <p className="mt-5 text-lg text-white/90">
              {settings?.heroSubtitle ||
                "Semua produk menggunakan sistem PREORDER. Barang langsung dikirim dari supplier terpercaya di China."}
            </p>

                        <a
                href="#produk"
                className="mt-8 inline-block rounded-xl bg-white px-8 py-3 font-bold text-blue-700 transition hover:scale-105"
              >
                {settings?.heroButton ||
                  "Belanja Sekarang"}
              </a>

          </div>

         <div className="hidden justify-center md:flex">

  {settings?.heroImage ? (

    <div className="relative h-[380px] w-full max-w-md overflow-hidden rounded-3xl">

      <Image
        src={settings.heroImage}
        alt="Hero Banner"
        fill
        className="object-cover"
        priority
      />

    </div>

  ) : (

    <div className="rounded-3xl bg-white/10 p-10 backdrop-blur">

     <h2 className="text-3xl font-bold text-white">
        {settings?.heroFeatureTitle || "PREORDER"}
      </h2>

      <p className="mt-4 text-white">
        ✔ {settings?.heroFeature1 || "Original"}
      </p>

      <p className="text-white">
        ✔ {settings?.heroFeature2 || "Harga Kompetitif"}
      </p>

      <p className="text-white">
        ✔ {settings?.heroFeature3 || "Aman"}
      </p>

    </div>

  )}

</div>

        </div>

      </div>

    </section>
  );
}