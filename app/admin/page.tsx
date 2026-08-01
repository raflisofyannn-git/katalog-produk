"use client";

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

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

        <div className="rounded-2xl border bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Total Pesanan
              </p>

              <div className="rounded-2xl border bg-white p-6 shadow-sm">

  <div className="flex items-center justify-between">

    <div>

      <p className="text-sm text-gray-500">
        Total Produk
      </p>

      <h2 className="mt-3 text-4xl font-bold">
        {totalProducts}
      </h2>

    </div>

    <Package
      size={42}
      className="text-blue-600"
    />

  </div>

</div>


<div className="rounded-2xl border bg-white p-6 shadow-sm">

  <div className="flex items-center justify-between">

    <div>

      <p className="text-sm text-gray-500">
        Total Customer
      </p>

      <h2 className="mt-3 text-4xl font-bold">
        {totalCustomers}
      </h2>

    </div>

    <Users
      size={42}
      className="text-green-600"
    />

  </div>

</div>

              <h2 className="mt-3 text-4xl font-bold">
                {totalOrders}
              </h2>

            </div>

            <Package
              size={42}
              className="text-blue-600"
            />

          </div>

        </div>

        <div className="rounded-2xl border bg-yellow-50 p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Pending
              </p>

              <h2 className="mt-3 text-4xl font-bold text-yellow-600">
                {pendingOrders}
              </h2>

            </div>

            <Clock3
              size={42}
              className="text-yellow-600"
            />

          </div>

        </div>

        <div className="rounded-2xl border bg-blue-50 p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Ordered
              </p>

              <h2 className="mt-3 text-4xl font-bold text-blue-600">
                {orderedOrders}
              </h2>

            </div>

            <ShoppingCart
              size={42}
              className="text-blue-600"
            />

          </div>

        </div>

        <div className="rounded-2xl border bg-purple-50 p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Arrived
              </p>

              <h2 className="mt-3 text-4xl font-bold text-purple-600">
                {arrivedOrders}
              </h2>

            </div>

            <Truck
              size={42}
              className="text-purple-600"
            />

          </div>

        </div>

        <div className="rounded-2xl border bg-green-50 p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Completed
              </p>

              <h2 className="mt-3 text-4xl font-bold text-green-600">
                {completedOrders}
              </h2>

            </div>

            <CheckCircle2
              size={42}
              className="text-green-600"
            />

          </div>

        </div>

        <div className="rounded-2xl border bg-cyan-50 p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Total Omzet
              </p>

              <h2 className="mt-3 text-2xl font-bold text-cyan-600">
                {formatCurrency(totalRevenue)}
              </h2>

            </div>

            <Wallet
              size={42}
              className="text-cyan-600"
            />

          </div>

        </div>

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