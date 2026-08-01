"use client";

import { useDashboard } from "@/hooks/useDashboard";
import { formatCurrency } from "@/utils/formatCurrency";
import BestProducts from "@/components/admin/dashboard/BestProducts";

export default function AdminDashboard() {

  const {
  loading,
  totalOrders,
  pendingOrders,
  orderedOrders,
  arrivedOrders,
  completedOrders,
  totalRevenue,
} = useDashboard();

  if (loading) {
    return (
      <main className="p-8">
        Memuat Dashboard...
      </main>
    );
  }

  return (
  <main className="mx-auto max-w-7xl p-8">

    <h1 className="mb-2 text-3xl font-bold">
  Dashboard Admin
</h1>

<p className="mb-8 text-gray-500">
  Ringkasan aktivitas penjualan
</p>

    {/* Statistik */}
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

      <div className="rounded-xl border bg-white p-6 shadow">
        <p className="text-gray-500">
          Total Pesanan
        </p>

        <h2 className="mt-3 text-4xl font-bold">
          {totalOrders}
        </h2>
      </div>

      <div className="rounded-xl border bg-yellow-50 p-6 shadow">
        <p className="text-gray-500">
          Pending
        </p>

        <h2 className="mt-3 text-4xl font-bold text-yellow-600">
          {pendingOrders}
        </h2>
      </div>

      <div className="rounded-xl border bg-blue-50 p-6 shadow">
  <p className="text-gray-500">
    Ordered
  </p>

  <h2 className="mt-3 text-4xl font-bold text-blue-600">
        {orderedOrders}
      </h2>
    </div>

      <div className="rounded-xl border bg-green-50 p-6 shadow">
        <p className="text-gray-500">
          Selesai
        </p>

        <h2 className="mt-3 text-4xl font-bold text-green-600">
          {completedOrders}
        </h2>
      </div>

<div className="rounded-xl border bg-purple-50 p-6 shadow">
  <p className="text-gray-500">
    Arrived
  </p>

  <h2 className="mt-3 text-4xl font-bold text-purple-600">
    {arrivedOrders}
  </h2>
</div>
  
      <div className="rounded-xl border bg-blue-50 p-6 shadow">
        <p className="text-gray-500">
          Total Omzet
        </p>

        <h2 className="mt-3 text-2xl font-bold text-blue-600">
          {formatCurrency(totalRevenue)}
        </h2>
      </div>

    </div>

    {/* Produk Terlaris */}
    <div className="mt-8">
      <BestProducts />
    </div>

  </main>
);}