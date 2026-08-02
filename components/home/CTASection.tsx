"use client";

import { MessageCircle } from "lucide-react";
import { useSettings } from "@/hooks/useSettings";

export default function CTASection() {
  const { settings } = useSettings();

  const phone = settings?.adminPhone || "";

  const whatsappLink = phone
    ? `https://wa.me/${phone.replace(/\D/g, "")}`
    : "#";

  return (
    <section className="mx-auto my-20 max-w-7xl px-4">

      <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 px-8 py-14 shadow-2xl">

        <div className="mx-auto max-w-3xl text-center">

          <h2 className="text-3xl font-extrabold text-white md:text-4xl">
            Masih Bingung Memilih Produk?
          </h2>

          <p className="mt-5 text-lg leading-8 text-white/90">
            Tim kami siap membantu Anda memilih produk yang paling sesuai
            dengan kebutuhan. Konsultasi gratis melalui WhatsApp.
          </p>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-3 rounded-2xl bg-white px-8 py-4 text-lg font-bold text-green-600 transition hover:scale-105 hover:bg-gray-100"
          >
            <MessageCircle size={24} />
            Chat WhatsApp
          </a>

        </div>

      </div>

    </section>
  );
}