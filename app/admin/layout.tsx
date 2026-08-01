"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Settings,
  LogOut,
} from "lucide-react";

interface Props {
  children: React.ReactNode;
}

export default function AdminLayout({
  children,
}: Props) {

  const pathname = usePathname();

  const menus = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Produk",
      href: "/admin/products",
      icon: Package,
    },
    {
      name: "Pesanan",
      href: "/admin/orders",
      icon: ShoppingCart,
    },
    {
      name: "Setting",
      href: "/admin/settings",
      icon: Settings,
    },
  ];
    return (

    <div className="flex min-h-screen bg-slate-100">

      {/* Sidebar */}

      <aside className="w-72 border-r bg-white shadow-sm">

        <div className="border-b p-6">

          <h1 className="text-2xl font-bold text-blue-600">
            Admin Panel
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Katalog Produk
          </p>

        </div>

        <nav className="space-y-2 p-4">

          {menus.map((menu) => {

            const Icon = menu.icon;

            const active =
              pathname === menu.href;

            return (

              <Link
                key={menu.href}
                href={menu.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition
                  ${
                    active
                      ? "bg-blue-600 text-white"
                      : "hover:bg-slate-100"
                  }`}
              >

                <Icon size={20} />

                {menu.name}

              </Link>

            );

          })}

        </nav>

      </aside>

      {/* Content */}

      <div className="flex flex-1 flex-col">

        {/* Header */}

        <header className="flex h-20 items-center justify-between border-b bg-white px-8 shadow-sm">

          <div>

            <h2 className="text-2xl font-bold">
              Dashboard Admin
            </h2>

            <p className="text-sm text-gray-500">
              Kelola seluruh data website
            </p>

          </div>

          <button
            className="flex items-center gap-2 rounded-xl border px-5 py-3 font-semibold transition hover:bg-slate-100"
          >

            <LogOut size={20} />

            Logout

          </button>

        </header>

        <main className="flex-1 p-8">

          {children}

        </main>

      </div>

    </div>

  );

}