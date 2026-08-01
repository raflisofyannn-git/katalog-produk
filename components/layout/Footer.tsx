"use client";

//import { Instagram, Facebook } from "lucide-react";
import Link from "next/link";
import { useSettings } from "@/hooks/useSettings";

export default function Footer() {
  const { settings } = useSettings();

  return (
    <footer className="mt-20 border-t bg-slate-900 text-white">

      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-3">

        {/* Tentang */}

        <div>

          <h2 className="text-2xl font-bold">
            {settings?.storeName || "IMPORT STORE"}
          </h2>

          <p className="mt-4 text-sm text-slate-300">
            {settings?.footerText ||
              "Import produk berkualitas langsung dari supplier terpercaya di China."}
          </p>

        </div>

        {/* Menu */}

        <div>

          <h3 className="mb-4 text-lg font-semibold">
            Menu
          </h3>

          <div className="space-y-2">

            <Link
              href="/"
              className="block hover:text-blue-400"
            >
              Home
            </Link>

            <a
              href="#produk"
              className="block hover:text-blue-400"
            >
              Produk
            </a>

            <Link
              href="/tracking"
              className="block hover:text-blue-400"
            >
              Tracking Order
            </Link>

          </div>

        </div>

        {/* Kontak */}

        <div>

          <h3 className="mb-4 text-lg font-semibold">
            Hubungi Kami
          </h3>

          <p className="text-slate-300">
            WhatsApp
          </p>

          <p className="font-semibold">
            {settings?.adminPhone || "-"}
          </p>

          <p className="mt-4 text-slate-300">
            Alamat
          </p>

          <div className="mt-6 flex gap-3">

  {settings?.instagram && (
    <a
      href={settings.instagram}
      target="_blank"
      className="rounded-lg border border-slate-600 px-3 py-2 text-sm hover:bg-slate-800"
    >
      Instagram
    </a>
  )}


  {settings?.facebook && (
    <a
      href={settings.facebook}
      target="_blank"
      className="rounded-lg border border-slate-600 px-3 py-2 text-sm hover:bg-slate-800"
    >
      Facebook
    </a>
  )}


  {settings?.tiktok && (
    <a
      href={settings.tiktok}
      target="_blank"
      className="rounded-lg border border-slate-600 px-3 py-2 text-sm hover:bg-slate-800"
    >
      TikTok
    </a>
  )}

</div>

        </div>

      </div>

      <div className="border-t border-slate-700 py-5 text-center text-sm text-slate-400">

        © {new Date().getFullYear()}{" "}
        {settings?.storeName || "IMPORT STORE"}

      </div>

    </footer>
  );
}