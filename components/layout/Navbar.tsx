"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  ShoppingCart,
  X,
  Phone,
  Home,
  Package,
} from "lucide-react";

import { useCart } from "@/context/CartContext";
import { useSettings } from "@/hooks/useSettings";

import { useEffect, useState } from "react";

interface Props {
  onOpenCart: () => void;
}

export default function Navbar({
  onOpenCart,
}: Props) {
  const { totalItems } = useCart();
  const { settings } = useSettings();

  const [mounted, setMounted] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 shadow-lg backdrop-blur"
            : "bg-white/90 backdrop-blur"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4">

          {/* Logo */}

          <Link
            href="/"
            className="flex items-center gap-3"
          >
            {settings?.logo ? (
              <Image
                src={settings.logo}
                alt={settings.storeName}
                width={52}
                height={52}
                className="rounded-full border object-cover shadow"
              />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white shadow">
                V
              </div>
            )}

            <div>
              <h1 className="text-xl font-extrabold text-blue-600">
                {settings?.storeName ||
                  "VINA FINDS"}
              </h1>

              <p className="text-xs text-gray-500">
                Sport Equipment
              </p>
            </div>
          </Link>

          {/* Desktop */}

          <nav className="hidden items-center gap-8 lg:flex">

            <a
              href="/"
              className="flex items-center gap-2 font-medium transition hover:text-blue-600"
            >
              <Home size={18} />
              Home
            </a>

            <a
              href="#produk"
              className="flex items-center gap-2 font-medium transition hover:text-blue-600"
            >
              <Package size={18} />
              Produk
            </a>

            <a
              href={
                settings?.adminPhone
                  ? `https://wa.me/${settings.adminPhone}`
                  : "#"
              }
              target="_blank"
              className="flex items-center gap-2 font-medium transition hover:text-blue-600"
            >
              <Phone size={18} />
              Kontak
            </a>

          </nav>

          {/* Right */}

          <div className="flex items-center gap-3">

            <button
              onClick={onOpenCart}
              className="relative rounded-xl bg-gray-100 p-3 transition hover:bg-blue-600 hover:text-white"
            >
              <ShoppingCart size={22} />

              {mounted &&
                totalItems > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                    {totalItems}
                  </span>
                )}
            </button>

            <button
              onClick={() =>
                setOpenMenu(!openMenu)
              }
              className="rounded-xl bg-gray-100 p-3 transition hover:bg-blue-600 hover:text-white lg:hidden"
            >
              {openMenu ? (
                <X />
              ) : (
                <Menu />
              )}
            </button>

          </div>

        </div>

        {/* Mobile */}

        {openMenu && (
          <div className="border-t bg-white lg:hidden">

            <a
              href="/"
              className="block px-6 py-4 hover:bg-gray-100"
            >
              🏠 Home
            </a>

            <a
              href="#produk"
              className="block px-6 py-4 hover:bg-gray-100"
            >
              📦 Produk
            </a>

            <a
              href={
                settings?.adminPhone
                  ? `https://wa.me/${settings.adminPhone}`
                  : "#"
              }
              target="_blank"
              className="block px-6 py-4 hover:bg-gray-100"
            >
              💬 Kontak
            </a>

          </div>
        )}
      </header>
    </>
  );
}