"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  ArrowLeft,
  User,
  Phone,
  Calendar,
  Package,
  MessageCircle,
  Printer,
} from "lucide-react";

import { useOrder } from "@/hooks/useOrder";
import { updateOrder } from "@/services/orderService";

import type { OrderStatus } from "@/types/order";

import { formatCurrency } from "@/utils/formatCurrency";

import LoadingButton from "@/components/ui/LoadingButton";
import OrderStatusBadge from "@/components/admin/OrderStatusBadge";

import { toast } from "sonner";

export default function OrderDetailPage() {

  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const { order, loading } = useOrder(id);

  const [status, setStatus] =
    useState<OrderStatus>("Pending");

  const [saving, setSaving] =
    useState(false);

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

      toast.success(
        "Status berhasil diperbarui."
      );

      router.refresh();

    } catch (error) {

      console.error(error);

      toast.error(
        "Gagal memperbarui status."
      );

    } finally {

      setSaving(false);

    }

  }

  if (loading) {

    return (

      <main className="flex h-screen items-center justify-center">

        <p className="text-lg font-semibold">

          Memuat Detail Pesanan...

        </p>

      </main>

    );

  }

  if (!order) {

    return (

      <main className="mx-auto max-w-6xl p-8">

        <h1 className="text-3xl font-bold">

          Pesanan tidak ditemukan

        </h1>

        <Link
          href="/admin/orders"
          className="mt-6 inline-flex items-center gap-2 text-blue-600"
        >
          <ArrowLeft size={18} />
          Kembali
        </Link>

      </main>

    );

  }

  return (

    <main className="mx-auto max-w-6xl p-8">

      <Link
        href="/admin/orders"
        className="mb-8 inline-flex items-center gap-2 text-blue-600 hover:underline"
      >
        <ArrowLeft size={18} />
        Kembali ke Daftar Pesanan
      </Link>

      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>

          <h1 className="text-4xl font-bold">

            {order.orderNumber}

          </h1>

          <p className="mt-2 text-gray-500">

            Detail Pesanan Customer

          </p>

        </div>

        <OrderStatusBadge
          status={status}
        />

      </div>

      <div className="grid gap-6 lg:grid-cols-2">

        {/* Customer */}

        <div className="rounded-2xl border bg-white p-6 shadow-sm">

          <h2 className="mb-6 text-xl font-bold">

            Informasi Customer

          </h2>

          <div className="space-y-5">

            <div className="flex items-center gap-4">

              <User
                size={22}
                className="text-blue-600"
              />

              <div>

                <p className="text-sm text-gray-500">
                  Nama Customer
                </p>

                <p className="font-semibold">
                  {order.customerName}
                </p>

              </div>

            </div>

            <div className="flex items-center gap-4">

              <Phone
                size={22}
                className="text-green-600"
              />

              <div>

                <p className="text-sm text-gray-500">
                  WhatsApp
                </p>

                <p className="font-semibold">
                  {order.customerPhone}
                </p>

              </div>

            </div>

            <div className="flex items-center gap-4">

              <Calendar
                size={22}
                className="text-orange-500"
              />

              <div>

                <p className="text-sm text-gray-500">
                  Tanggal
                </p>

                <p className="font-semibold">
                  {new Date(
                    order.createdAt
                  ).toLocaleString("id-ID")}
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Status */}

        <div className="rounded-2xl border bg-white p-6 shadow-sm">

          <h2 className="mb-6 text-xl font-bold">

            Status Pesanan

          </h2>

          <select
            className="w-full rounded-xl border p-4"
            value={status}
            onChange={(e) =>
              setStatus(
                e.target.value as OrderStatus
              )
            }
          >

            <option value="Pending">
              Pending
            </option>

            <option value="Ordered">
              Ordered
            </option>

            <option value="Arrived">
              Arrived
            </option>

            <option value="Completed">
              Completed
            </option>

          </select>

          <div className="mt-5">

            <LoadingButton
              loading={saving}
              onClick={handleUpdateStatus}
            >
              Simpan Status
            </LoadingButton>

          </div>

        </div>

      </div>

      {/* PRODUK */}

      <div className="mt-8 rounded-2xl border bg-white p-6 shadow-sm">

        <div className="mb-6 flex items-center gap-3">

          <Package className="text-blue-600" />

          <h2 className="text-2xl font-bold">

            Daftar Produk

          </h2>

        </div>
                <div className="space-y-5">

          {order.items.map((item) => (

            <div
              key={item.id}
              className="flex items-center justify-between rounded-xl border border-gray-200 bg-slate-50 p-5"
            >

              <div>

                <h3 className="text-lg font-semibold">

                  {item.name}

                </h3>

                <p className="mt-2 text-gray-500">

                  Qty : {item.qty}

                </p>

                <p className="mt-1 text-gray-500">

                  Harga :
                  {" "}
                  {formatCurrency(item.price)}

                </p>

              </div>

              <div className="text-right">

                <p className="text-sm text-gray-500">

                  Subtotal

                </p>

                <p className="text-xl font-bold text-blue-600">

                  {formatCurrency(
                    item.price * item.qty
                  )}

                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* TOTAL */}

      <div className="mt-8 rounded-2xl border bg-white p-6 shadow-sm">

        <div className="flex items-center justify-between">

          <span className="text-xl font-semibold">

            Total Pesanan

          </span>

          <span className="text-3xl font-bold text-blue-600">

            {formatCurrency(order.total)}

          </span>

        </div>

      </div>

      {/* AKSI */}

      <div className="mt-8 grid gap-4 md:grid-cols-2">

        <a
          href={`https://wa.me/${order.customerPhone.replace(/\D/g, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="
            flex
            items-center
            justify-center
            gap-3
            rounded-2xl
            bg-green-600
            py-4
            font-semibold
            text-white
            transition
            hover:bg-green-700
          "
        >

          <MessageCircle size={22} />

          Chat Customer

        </a>

        <Link
  href={`/admin/orders/${order.id}/invoice`}
  className="
    flex
    items-center
    justify-center
    gap-3
    rounded-2xl
    border
    py-4
    font-semibold
    transition
    hover:bg-slate-100
  "
>

  <Printer size={22} />

  Cetak Invoice

</Link>

      </div>

    </main>

  );

}