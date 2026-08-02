"use client";

import {
  ShieldCheck,
  PackageSearch,
  Headset,
  Plane,
} from "lucide-react";

export default function FeatureSection() {
  const items = [
    {
      icon: Plane,
      title: "Import Langsung",
      desc: "Produk langsung dari supplier terpercaya di China",
    },
    {
      icon: PackageSearch,
      title: "Produk Sesuai Kebutuhan",
      desc: "Melayani request berbagai jenis produk sesuai kebutuhan Anda",
    },
    {
      icon: ShieldCheck,
      title: "Pengiriman Terjamin",
      desc: "Packing aman dengan ekspedisi terpercaya",
    },
    {
      icon: Headset,
      title: "Layanan After Sales",
      desc: "Konsultasi dan bantuan setelah pembelian",
    },
  ];

  return (
    <section className="-mt-12 relative z-20 mx-auto max-w-7xl px-4">

      <div className="grid gap-6 rounded-3xl bg-white p-8 shadow-2xl md:grid-cols-2 lg:grid-cols-4">

        {items.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="group rounded-2xl p-4 text-center transition duration-300 hover:-translate-y-2 hover:bg-blue-50"
            >
              <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 transition group-hover:bg-blue-600">

                <Icon className="h-10 w-10 text-blue-600 transition group-hover:text-white" />

              </div>

              <h3 className="text-xl font-bold text-gray-900">
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>

    </section>
  );
}