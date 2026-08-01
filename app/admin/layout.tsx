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