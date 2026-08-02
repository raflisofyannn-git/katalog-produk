"use client";

import Link from "next/link";
import Image from "next/image";

import {
  Menu,
  X,
  Home,
  Package,
  Phone,
  ShoppingCart,
  Search,
} from "lucide-react";

import { useEffect, useState } from "react";

import { useCart } from "@/context/CartContext";
import { useSettings } from "@/hooks/useSettings";

interface Props {
  onOpenCart: () => void;
}

const menus = [
  {
    title: "Home",
    href: "/",
    icon: Home,
  },
  {
    title: "Produk",
    href: "#produk",
    icon: Package,
  },
  {
    title: "Kontak",
    href: "#kontak",
    icon: Phone,
  },
];

export default function Navbar({
  onOpenCart,
}: Props) {

  const { settings } = useSettings();

  const { totalItems } = useCart();

  const [mounted, setMounted] =
    useState(false);

  const [openMenu, setOpenMenu] =
    useState(false);

  const [scrolled, setScrolled] =
    useState(false);

  useEffect(() => {

    setMounted(true);

    const handleScroll = () => {

      setScrolled(window.scrollY > 30);

    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );

  }, []);
    return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-slate-200 bg-white/90 shadow-lg backdrop-blur-xl"
            : "bg-white/70 backdrop-blur-xl"
        }`}
      >
        <div
  className="
  mx-auto
  flex
  h-20
  max-w-7xl
  items-center
  justify-between
  px-4

  sm:px-6
  lg:h-24
  "
>

          {/* Logo */}

          <Link
  href="/"
  className="
  flex
  items-center
  gap-3
  transition
  hover:opacity-90
  "
>

  {settings?.logo ? (

    <Image
      src={settings.logo}
      alt={settings.storeName}
      width={54}
      height={54}
      className="
      h-10
      w-10
      rounded-full
      object-cover

      sm:h-12
      sm:w-12

      lg:h-14
      lg:w-14
      "
    />

  ) : (

    <div
      className="
      flex
      h-10
      w-10
      items-center
      justify-center
      rounded-full
      bg-blue-600
      text-white
      font-bold
      "
    >
      V
    </div>

  )}

  <div>

    <h1
      className="
      text-2xl
      font-black
      leading-none
      text-slate-900

      lg:text-[42px]
      "
    >
      {settings?.storeName}
    </h1>

    <p
      className="
      hidden

      sm:block

      text-[11px]
      uppercase
      tracking-[0.35em]
      text-slate-500
      "
    >
      INTO THE BLUE │ SPORT EQUIPMENT
    </p>

  </div>

</Link>

          {/* Desktop Menu */}

          <nav className="hidden items-center gap-10 lg:flex">

            {menus.map((menu) => {

              const Icon = menu.icon;

              return (

                <a
                  key={menu.title}
                  href={menu.href}
                  className="
                  group
                  relative
                  flex
                  items-center
                  gap-2
                  font-semibold
                  text-slate-700
                  transition
                  duration-300
                  hover:text-blue-600
                  "
                >

                  <Icon size={18} />

                  {menu.title}

                  <span
                    className="
                    absolute
                    -bottom-8
                    left-0
                    h-[3px]
                    w-0
                    rounded-full
                    bg-blue-600
                    transition-all
                    duration-300
                    group-hover:w-full
                    "
                  />

                </a>

              );

            })}

          </nav>

          {/* Right */}

          <div className="flex items-center gap-4">

            {/* Search */}

            <div
              className="
              hidden
            lg:flex
              items-center
              gap-3
              rounded-full
              border
              border-slate-200
              bg-white
              px-5
              py-3
              shadow-sm
              transition
              focus-within:border-blue-500
              focus-within:shadow-md
              "
            >

              <Search
                size={18}
                className="text-slate-400"
              />

              <input
                type="text"
                placeholder="Cari produk..."
                className="
                w-64
                bg-transparent
                text-sm
                outline-none
                placeholder:text-slate-400
                "
              />

            </div>

            {/* Cart */}

            <button
              onClick={onOpenCart}
              className="
              relative
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              border
              border-slate-200
              bg-white
              shadow-sm
              transition-all
              duration-300
              hover:border-blue-600
              hover:bg-blue-50
              hover:shadow-md
              "
            >

              <ShoppingCart size={22} />

              {mounted && totalItems > 0 && (

                <span
                  className="
                  absolute
                  -right-1
                  -top-1
                  flex
                  h-6
                  w-6
                  items-center
                  justify-center
                  rounded-full
                  bg-red-500
                  text-xs
                  font-bold
                  text-white
                  "
                >

                  {totalItems}

                </span>

              )}

            </button>

            {/* Mobile */}

            <button
              onClick={() =>
                setOpenMenu(!openMenu)
              }
              className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              border
              border-slate-200
              bg-white
              shadow-sm
              transition
              hover:border-blue-600
              hover:bg-blue-50
              lg:hidden
              "
            >

              {openMenu ? (
                <X size={22} />
              ) : (
                <Menu size={22} />
              )}

            </button>

          </div>

        </div>

{/* Mobile Search */}

<div className="border-t bg-white p-4 xl:hidden">

  <div
    className="
    flex
    items-center
    gap-3
    rounded-full
    border
    border-slate-200
    bg-slate-50
    px-4
    py-3
    transition
    focus-within:border-blue-500
    "
  >

    <Search
      size={18}
      className="text-slate-400"
    />

    <input
      type="text"
      placeholder="Cari produk..."
      className="
      w-full
      bg-transparent
      text-sm
      outline-none
      placeholder:text-slate-400
      "
    />

  </div>

</div>

        {/* Mobile Menu */}

        {openMenu && (

          <div className="border-t border-slate-200 bg-white lg:hidden">

            {menus.map((menu) => {

              const Icon = menu.icon;

              return (

                <a
                  key={menu.title}
                  href={menu.href}
                  onClick={() => setOpenMenu(false)}
                  className="
                  flex
                  items-center
                  gap-3
                  px-6
                  py-5
                  font-medium
                  transition
                  hover:bg-slate-50
                  "
                >

                  <Icon
                    size={18}
                    className="text-blue-600"
                  />

                  {menu.title}

                </a>

              );

            })}

          </div>

        )}

      </header>
    </>
  );
}