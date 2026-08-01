"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useOrder } from "@/hooks/useOrder";
import { updateOrder } from "@/services/orderService";

import type { OrderStatus } from "@/types/order";

import { formatCurrency } from "@/utils/formatCurrency";
import LoadingButton from "@/components/ui/LoadingButton";

import { toast } from "sonner";
import OrderStatusBadge from "@/components/admin/OrderStatusBadge";

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const { order, loading } = useOrder(id);

  const [status, setStatus] = useState<OrderStatus>("Pending");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (order) {
      setStatus(order.status);
    }
  }, [order]);

  async function handleUpdateStatus() {
    if (!order?.id) return;

    try {
      setSaving(true);

      await updateOrder(order.id, {
        status,
      });

      toast.success("Status berhasil diperbarui.");

      router.refresh();
    } catch (error) {
      console.error(error);

      toast.error("Gagal memperbarui status.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="mx-auto max-w-5xl p-8">
        <p>Memuat data...</p>
      </main>
    );
  }

  if (!order) {
    return (
      <main className="mx-auto max-w-5xl p-8">
        <h1 className="text-2xl font-bold">
          Pesanan tidak ditemukan
        </h1>

        <Link
          href="/admin/orders"
          className="mt-5 inline-block text-blue-600"
        >
          ← Kembali
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl p-8">

      <Link
        href="/admin/orders"
        className="mb-6 inline-block text-blue-600 hover:underline"
      >
        ← Kembali
      </Link>

      <div className="rounded-xl border bg-white p-8 shadow">

        <h1 className="mb-8 text-3xl font-bold">
          {order.orderNumber}
        </h1>

        <div className="grid gap-6 md:grid-cols-2">

          <div>
            <p className="text-sm text-gray-500">
              Customer
            </p>

            <p className="font-semibold">
              {order.customerName}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              No WhatsApp
            </p>

            <p className="font-semibold">
              {order.customerPhone}
            </p>
          </div>

          <div>
            <p className="mb-2 text-sm text-gray-500">
              Status
            </p>

           <select
                className="w-full rounded-lg border p-3"
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value as OrderStatus)
                }
              >
                <option value="Pending">Pending</option>
                <option value="Ordered">Ordered</option>
                <option value="Arrived">Arrived</option>
                <option value="Completed">Completed</option>
              </select>

              <div className="mt-4">
                <OrderStatusBadge status={status} />
              </div>

            <div className="mt-3">
              <LoadingButton
                loading={saving}
                onClick={handleUpdateStatus}
              >
                Simpan Status
              </LoadingButton>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Tanggal
            </p>

            <p className="font-semibold">
              {new Date(order.createdAt).toLocaleString("id-ID")}
            </p>
          </div>

        </div>

        <hr className="my-8" />

        <h2 className="mb-5 text-xl font-bold">
          Daftar Produk
        </h2>

        <div className="space-y-4">

          {order.items.map((item) => (

            <div
              key={item.id}
              className="flex items-center justify-between rounded-lg border p-4"
            >

              <div>

                <h3 className="font-semibold">
                  {item.name}
                </h3>

                <p className="text-gray-500">
                  Qty : {item.qty}
                </p>

              </div>

              <div className="font-bold text-blue-600">
                {formatCurrency(item.price * item.qty)}
              </div>

            </div>

          ))}

        </div>

        <hr className="my-8" />

        <div className="flex justify-between text-xl font-bold">

          <span>Total</span>

          <span>
            {formatCurrency(order.total)}
          </span>

        </div>

      </div>

    </main>
  );
}