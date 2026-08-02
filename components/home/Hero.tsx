"use client";

import Image from "next/image";
import { Ship, ShieldCheck, BadgeDollarSign, Headset } from "lucide-react";
import { useSettings } from "@/hooks/useSettings";

export default function Hero() {
  const { settings } = useSettings();

  return (
    <section className="mx-auto mt-8 max-w-7xl px-4">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-900 via-blue-700 to-sky-500">

        {/* Background Effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,.18),transparent_40%)]" />

        <div className="relative grid items-center gap-10 px-8 py-16 lg:grid-cols-2">

          {/* LEFT */}
          <div>

            <span className="inline-block rounded-full bg-white/15 px-5 py-2 text-sm font-semibold tracking-wide text-white backdrop-blur">
              {settings?.heroBadge || "IMPORT SPORT EQUIPMENT"}
            </span>

            <p className="mt-6 text-lg font-bold uppercase tracking-[0.3em] text-cyan-300">
              VINA FINDS
            </p>

            <h1 className="mt-3 text-5xl font-extrabold leading-tight text-white lg:text-6xl">
              {settings?.heroTitle || "Import Produk Sport"}
            </h1>

            <h2 className="mt-2 text-4xl font-bold leading-tight text-cyan-300 lg:text-5xl">
              {settings?.heroSubtitle || "Berkualitas dari China"}
            </h2>

            {/* Feature Icons */}
            <div className="mt-8 grid grid-cols-2 gap-4 text-white">

              <div className="flex items-center gap-3">
                <Ship className="h-8 w-8 text-cyan-300" />
                <div>
                  <p className="font-semibold">Import Langsung</p>
                  <p className="text-sm text-white/70">
                    Supplier China
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <ShieldCheck className="h-8 w-8 text-cyan-300" />
                <div>
                  <p className="font-semibold">Quality Checked</p>
                  <p className="text-sm text-white/70">
                    Sebelum dikirim
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <BadgeDollarSign className="h-8 w-8 text-cyan-300" />
                <div>
                  <p className="font-semibold">Harga Kompetitif</p>
                  <p className="text-sm text-white/70">
                    Langsung import
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Headset className="h-8 w-8 text-cyan-300" />
                <div>
                  <p className="font-semibold">Fast Response</p>
                  <p className="text-sm text-white/70">
                    Siap membantu
                  </p>
                </div>
              </div>

            </div>

            {/* Buttons */}
            <div className="mt-10 flex flex-wrap gap-4">

              <a
                href="#produk"
                className="rounded-xl bg-orange-500 px-8 py-4 font-bold text-white shadow-lg transition hover:bg-orange-600"
              >
                Lihat Produk
              </a>

              <a
                href="https://wa.me/6280000000000"
                target="_blank"
                className="rounded-xl bg-white px-8 py-4 font-bold text-green-600 transition hover:bg-slate-100"
              >
                Hubungi WhatsApp
              </a>

            </div>

          </div>

          {/* RIGHT */}
          <div className="relative hidden justify-center lg:flex">

            {settings?.heroImage ? (

              <div className="relative h-[470px] w-full max-w-xl">

                <Image
                  src={settings.heroImage}
                  alt="Hero"
                  fill
                  priority
                  className="rounded-3xl object-contain drop-shadow-2xl"
                />

              </div>

            ) : (

              <div className="rounded-3xl bg-white/10 p-10 text-white backdrop-blur">

                <h2 className="text-3xl font-bold">
                  Produk Premium
                </h2>

                <p className="mt-5">
                  ✔ Import Langsung
                </p>

                <p>
                  ✔ Harga Kompetitif
                </p>

                <p>
                  ✔ Pengiriman Aman
                </p>

                <p>
                  ✔ After Sales
                </p>

              </div>

            )}

          </div>

        </div>
      </div>
    </section>
  );
}