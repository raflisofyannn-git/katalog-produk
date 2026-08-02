"use client";

import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import {
  FaInstagram,
  FaFacebookF,
  FaTiktok,
} from "react-icons/fa";

import { useSettings } from "@/hooks/useSettings";

export default function Footer() {
  const { settings } = useSettings();

  return (
    <footer className="mt-24 bg-slate-900 text-white">

      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-2 lg:grid-cols-4">

        {/* Logo */}

        <div>

          <h2 className="text-2xl font-extrabold text-cyan-400">
            {settings?.storeName || "VINA FINDS"}
          </h2>

          <p className="mt-4 leading-7 text-gray-300">
            Import produk sport berkualitas dari supplier terpercaya
            di China dengan sistem Pre Order yang aman dan terpercaya.
          </p>

        </div>

        {/* Menu */}

        <div>

          <h3 className="mb-4 text-lg font-bold">
            Menu
          </h3>

          <div className="space-y-3">

            <Link
              href="/"
              className="block text-gray-300 transition hover:text-cyan-400"
            >
              Home
            </Link>

            <a
              href="#produk"
              className="block text-gray-300 transition hover:text-cyan-400"
            >
              Produk
            </a>

            <a
              href={`https://wa.me/${settings?.adminPhone}`}
              target="_blank"
              className="block text-gray-300 transition hover:text-cyan-400"
            >
              Hubungi Kami
            </a>

          </div>

        </div>

        {/* Contact */}

        <div>

          <h3 className="mb-4 text-lg font-bold">
            Kontak
          </h3>

          <div className="space-y-4">

            <div className="flex gap-3">

              <Phone
                size={18}
                className="mt-1 text-cyan-400"
              />

              <span className="text-gray-300">
                {settings?.adminPhone || "-"}
              </span>

            </div>

            <div className="flex gap-3">

              <Mail
                size={18}
                className="mt-1 text-cyan-400"
              />

              <span className="text-gray-300">
                {settings?.email || "-"}
              </span>

            </div>

            <div className="flex gap-3">

              <MapPin
                size={18}
                className="mt-1 text-cyan-400"
              />

              <span className="text-gray-300">
                {settings?.address || "-"}
              </span>

            </div>

          </div>

        </div>

        {/* Social */}

        <div>

          <h3 className="mb-4 text-lg font-bold">
            Ikuti Kami
          </h3>

          <div className="flex gap-4">

            <a
              href={settings?.instagram || "#"}
              target="_blank"
              className="rounded-xl bg-slate-800 p-3 transition hover:bg-cyan-500"
            >
              <FaInstagram size={22} />
            </a>

            <a
              href={settings?.facebook || "#"}
              target="_blank"
              className="rounded-xl bg-slate-800 p-3 transition hover:bg-cyan-500"
            >
              <FaFacebookF size={22} />
            </a>

          </div>

        </div>

      </div>

      {/* Copyright */}

      <div className="border-t border-slate-800">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-sm text-gray-400 md:flex-row">

          <p>
            © {new Date().getFullYear()} {settings?.storeName}.
            All Rights Reserved.
          </p>

          <p>
            Made with ❤️ in Indonesia
          </p>

        </div>

      </div>

    </footer>
  );
}