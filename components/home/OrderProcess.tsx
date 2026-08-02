"use client";

import {
  Search,
  MessageCircle,
  Wallet,
  Truck,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Pilih Produk",
    description:
      "Pilih produk import sesuai kebutuhan Anda melalui katalog kami.",
  },
  {
    number: "02",
    icon: MessageCircle,
    title: "Hubungi WhatsApp",
    description:
      "Kirim daftar produk kepada admin untuk mendapatkan penawaran terbaik.",
  },
  {
    number: "03",
    icon: Wallet,
    title: "Pembayaran",
    description:
      "Admin akan mengirim total invoice beserta estimasi waktu pengiriman.",
  },
  {
    number: "04",
    icon: Truck,
    title: "Packing & Pengiriman",
    description:
      "Produk dipacking dengan aman lalu dikirim menggunakan ekspedisi terpercaya.",
  },
];

export default function OrderProcess() {
  return (
    <section className="mx-auto mt-32 max-w-7xl px-6">

      <div className="mb-16 text-center">

        <p className="text-sm font-bold uppercase tracking-[0.35em] text-blue-600">
          HOW IT WORKS
        </p>

        <h2 className="mt-4 text-5xl font-black tracking-tight text-slate-900">
          Proses Pemesanan
        </h2>

        <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-500">
          Hanya empat langkah mudah untuk mendapatkan
          produk import berkualitas dari Vina Finds.
        </p>

      </div>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

        {steps.map((step) => {

          const Icon = step.icon;

          return (

            <div
              key={step.number}
              className="
              group
              relative
              overflow-hidden
              rounded-[30px]
              border
              border-slate-200
              bg-white
              p-8
              shadow-sm
              transition-all
              duration-500
              hover:-translate-y-2
              hover:border-blue-200
              hover:shadow-xl
              "
            >

              <div
                className="
                absolute
                right-6
                top-6
                text-6xl
                font-black
                text-slate-100
                transition
                duration-500
                group-hover:text-blue-50
                "
              >
                {step.number}
              </div>

              <div
                className="
                mb-8
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-full
                bg-gradient-to-br
                from-blue-600
                to-cyan-500
                shadow-lg
                transition
                duration-500
                group-hover:scale-110
                "
              >

                <Icon
                  size={38}
                  className="text-white"
                />

              </div>

              <h3 className="text-2xl font-bold text-slate-900">
                {step.title}
              </h3>

              <p className="mt-5 leading-8 text-slate-500">
                {step.description}
              </p>

            </div>

          );

        })}

      </div>

    </section>
  );
}