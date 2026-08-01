"use client";

import Link from "next/link";
import { Menu, ShoppingCart, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useSettings } from "@/hooks/useSettings";

interface Props {
  onOpenCart: () => void;
}

export default function Navbar({
  onOpenCart,
}: Props) {
  const { totalItems } = useCart();
  const { settings } = useSettings();

  const [openMenu, setOpenMenu] = useState(false);

  // Mencegah Hydration Error
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">

       <Link
  href="/"
  className="flex items-center gap-3"
>

  {settings?.logo ? (

    <Image
      src={settings.logo}
      alt={settings.storeName}
      width={42}
      height={42}
      className="rounded-full object-cover"
    />

  ) : (

    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
      R
    </div>

  )}

  <div>

    <h1 className="text-xl font-bold text-blue-600">
      {settings?.storeName || "IMPORT STORE"}
    </h1>

  </div>

</Link>

        {/* Desktop Menu */}
        <nav className="hidden items-center gap-8 md:flex">

          <a href="#" className="hover:text-blue-600">
            Home
          </a>

          <a href="#produk" className="hover:text-blue-600">
            Produk
          </a>

          <a href="#" className="hover:text-blue-600">
            Kontak
          </a>

        </nav>

        <div className="flex items-center gap-4">

          {/* Cart */}
          <button
            onClick={onOpenCart}
            className="relative rounded-full p-2 hover:bg-gray-100"
          >
            <ShoppingCart size={24} />

            {mounted && totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {totalItems}
              </span>
            )}

          </button>

          {/* Mobile */}
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="rounded-full p-2 hover:bg-gray-100 md:hidden"
          >
            {openMenu ? <X /> : <Menu />}
          </button>

        </div>

      </div>

      {/* Mobile Menu */}
      {openMenu && (

        <div className="border-t bg-white md:hidden">

          <a
            href="#"
            className="block px-5 py-4 hover:bg-gray-100"
          >
            Home
          </a>

          <a
            href="#produk"
            className="block px-5 py-4 hover:bg-gray-100"
          >
            Produk
          </a>

          <a
            href="#"
            className="block px-5 py-4 hover:bg-gray-100"
          >
            Kontak
          </a>

        </div>

      )}

    </header>
  );
}