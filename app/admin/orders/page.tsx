"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useOrders } from "@/hooks/useOrders";
import type { OrderStatus } from "@/types/order";
import OrderStatusBadge from "@/components/admin/OrderStatusBadge";


export default function OrdersPage() {
  const { orders, loading } = useOrders();

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState<
    OrderStatus | "All"
  >("All");

  const [dateFilter, setDateFilter] = useState<
  "All" | "Today" | "7days" | "30days"
>("All");

  const filteredOrders = useMemo(() => {
  return orders.filter((order) => {
    const matchSearch =
      order.orderNumber
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      order.customerName
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchStatus =
      statusFilter === "All"
        ? true
        : order.status === statusFilter;

    const today = new Date();
    const orderDate = new Date(order.createdAt);

    let matchDate = true;

    if (dateFilter === "Today") {
      matchDate =
        orderDate.toDateString() === today.toDateString();
    }

    if (dateFilter === "7days") {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(today.getDate() - 7);

      matchDate = orderDate >= sevenDaysAgo;
    }

    if (dateFilter === "30days") {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(today.getDate() - 30);

      matchDate = orderDate >= thirtyDaysAgo;
    }

    return matchSearch && matchStatus && matchDate;
  });
}, [orders, search, statusFilter, dateFilter]);

  if (loading) {
    return (
      <main className="p-8">
        <h1 className="text-3xl font-bold">
          Pesanan
        </h1>

        <p className="mt-5">
          Memuat data...
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl p-8">

      <h1 className="mb-8 text-3xl font-bold">
        Riwayat Pesanan
      </h1>

      <div className="mb-6 flex flex-wrap gap-3">

  <input
    className="rounded-lg border px-4 py-2"
    placeholder="Cari No PO / Customer"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />

  <select
    className="rounded-lg border px-4 py-2"
    value={statusFilter}
    onChange={(e) =>
      setStatusFilter(e.target.value as OrderStatus | "All")
    }
  >
    <option value="All">Semua Status</option>
    <option value="Pending">Pending</option>
    <option value="Ordered">Ordered</option>
    <option value="Arrived">Arrived</option>
    <option value="Completed">Completed</option>
  </select>

  <select
    className="rounded-lg border px-4 py-2"
    value={dateFilter}
    onChange={(e) =>
      setDateFilter(
        e.target.value as
          | "All"
          | "Today"
          | "7days"
          | "30days"
      )
    }
  >
    <option value="All">Semua Tanggal</option>
    <option value="Today">Hari Ini</option>
    <option value="7days">7 Hari Terakhir</option>
    <option value="30days">30 Hari Terakhir</option>
  </select>

</div>

      <div className="overflow-hidden rounded-xl border">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="p-4 text-left">
                No PO
              </th>

              <th className="text-left">
                Customer
              </th>

              <th className="text-left">
                Total
              </th>

              <th className="text-left">
                Status
              </th>

              <th className="text-left">
                Tanggal
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredOrders.length === 0 ? (

              <tr>

                <td
                  colSpan={5}
                  className="p-8 text-center text-gray-500"
                >
                  Tidak ada pesanan.
                </td>

              </tr>

            ) : (

              filteredOrders.map((order) => (

                <tr
                  key={order.id}
                  className="border-t transition hover:bg-slate-50"
                >

                  <td className="p-4">

                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="font-semibold text-blue-600 hover:underline"
                    >
                      {order.orderNumber}
                    </Link>

                  </td>

                  <td>
                    {order.customerName}
                  </td>

                  <td>
                    Rp{" "}
                    {order.total.toLocaleString("id-ID")}
                  </td>

                  <td>

                    <OrderStatusBadge status={order.status}
                    />

                  </td>

                  <td>

                    {new Date(
                      order.createdAt
                    ).toLocaleDateString("id-ID")}

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </main>
  );
}