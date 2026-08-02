"use client";

import StatCard from "@/components/admin/dashboard/StatCard";
import {
  Package,
  ShoppingCart,
  Clock3,
  CheckCircle2,
  Truck,
  Wallet,
  Users,
} from "lucide-react";

import { useDashboard } from "@/hooks/useDashboard";
import { formatCurrency } from "@/utils/formatCurrency";
import BestProducts from "@/components/admin/dashboard/BestProducts";

export default function AdminDashboard() {

  const {
  loading,
  totalProducts,
  totalCustomers,
  totalOrders,
  pendingOrders,
  orderedOrders,
  arrivedOrders,
  completedOrders,
  totalRevenue,
} = useDashboard();

  if (loading) {
    return (
      <main className="flex h-screen items-center justify-center">
        <p className="text-lg font-medium">
          Memuat Dashboard...
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl p-8">

      {/* Header */}

      <div className="mb-10">

        <h1 className="text-4xl font-bold">
          Dashboard Admin
        </h1>

        <p className="mt-2 text-gray-500">
          Ringkasan aktivitas toko
        </p>

      </div>

      {/* Statistik */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

  <StatCard
    title="Total Produk"
    value={totalProducts}
    icon={Package}
    color="text-blue-600"
    bg="bg-white"
  />

  <StatCard
    title="Total Customer"
    value={totalCustomers}
    icon={Users}
    color="text-green-600"
    bg="bg-white"
  />

  <StatCard
    title="Total Pesanan"
    value={totalOrders}
    icon={ShoppingCart}
    color="text-indigo-600"
    bg="bg-white"
  />

  <StatCard
    title="Pending"
    value={pendingOrders}
    icon={Clock3}
    color="text-yellow-600"
    bg="bg-yellow-50"
  />

  <StatCard
    title="Ordered"
    value={orderedOrders}
    icon={ShoppingCart}
    color="text-blue-600"
    bg="bg-blue-50"
  />

  <StatCard
    title="Arrived"
    value={arrivedOrders}
    icon={Truck}
    color="text-purple-600"
    bg="bg-purple-50"
  />

  <StatCard
    title="Completed"
    value={completedOrders}
    icon={CheckCircle2}
    color="text-green-600"
    bg="bg-green-50"
  />

  <StatCard
    title="Total Omzet"
    value={formatCurrency(totalRevenue)}
    icon={Wallet}
    color="text-cyan-600"
    bg="bg-cyan-50"
  />

</div>

      {/* Produk Terlaris */}

      <div className="mt-10 rounded-2xl border bg-white p-6 shadow-sm">

        <h2 className="mb-6 text-2xl font-bold">
          Produk Terlaris
        </h2>

        <BestProducts />

      </div>

    </main>
  );

}