"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import {
  ArrowLeft,
  Printer,
} from "lucide-react";

import { useOrder } from "@/hooks/useOrder";
import { useSettings } from "@/hooks/useSettings";
import { formatCurrency } from "@/utils/formatCurrency";

export default function InvoicePage() {

  const params = useParams();
  const id = params.id as string;
  const { order, loading } = useOrder(id);
  const { settings } = useSettings();

  if (loading) {

    return (

      <main className="flex h-screen items-center justify-center">

        <p className="text-lg font-semibold">

          Memuat Invoice...

        </p>

      </main>

    );

  }

  if (!order) {

    return (

      <main className="mx-auto max-w-5xl p-8">

        <h1 className="text-3xl font-bold">

          Invoice tidak ditemukan

        </h1>

        <Link
          href="/admin/orders"
          className="mt-6 inline-block text-blue-600"
        >
          Kembali
        </Link>

      </main>

    );

  }

  return (

    <main className="min-h-screen bg-slate-100 p-8">

      {/* Toolbar */}

      <div className="mx-auto mb-8 flex max-w-5xl items-center justify-between print:hidden">

        <Link
          href={`/admin/orders/${order.id}`}
          className="flex items-center gap-2 text-blue-600"
        >

          <ArrowLeft size={20} />

          Kembali

        </Link>

        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
        >

          <Printer size={20} />

          Print / Save PDF

        </button>

      </div>

      {/* Invoice */}

      <div className="mx-auto max-w-5xl rounded-xl bg-white p-10 shadow print:shadow-none">

        {/* Header */}

        <div className="flex items-start justify-between border-b pb-8">

          <div>

           <h1 className="text-4xl font-bold">
            {settings?.storeName || "IMPORT STORE"}
            </h1>

            <p className="mt-2 text-gray-500">
            {settings?.address || "-"}
            </p>

            <p className="text-gray-500">
            WhatsApp : {settings?.adminPhone || "-"}
            </p>

            {settings?.email && (
            <p className="text-gray-500">
                Email : {settings.email}
            </p>
            )}

          </div>

          <div className="text-right">

            <h2 className="text-3xl font-bold">

              INVOICE

            </h2>

            <p className="mt-3">

              {order.orderNumber}

            </p>

          </div>

        </div>

        {/* Customer */}

        <div className="mt-8 grid gap-8 md:grid-cols-2">

          <div>

            <h3 className="mb-4 text-lg font-bold">

              Customer

            </h3>

            <p>

              {order.customerName}

            </p>

            <p>

              {order.customerPhone}

            </p>

          </div>

          <div className="text-right">

            <h3 className="mb-4 text-lg font-bold">

              Detail Invoice

            </h3>

            <p>

              Tanggal :

              {" "}

              {new Date(
                order.createdAt
              ).toLocaleDateString("id-ID")}

            </p>

            <p>

              Status :

              {" "}

              {order.status}

            </p>

          </div>

        </div>

        {/* Produk */}

        <table className="mt-10 w-full border-collapse">

          <thead>

            <tr className="border-b bg-slate-100">

              <th className="p-4 text-left">

                Produk

              </th>

              <th className="p-4 text-center">

                Qty

              </th>

              <th className="p-4 text-right">

                Harga

              </th>

              <th className="p-4 text-right">

                Subtotal

              </th>

            </tr>

          </thead>

          <tbody>
                        {order.items.map((item) => (

              <tr
                key={item.id}
                className="border-b"
              >

                <td className="p-4">

                  {item.name}

                </td>

                <td className="p-4 text-center">

                  {item.qty}

                </td>

                <td className="p-4 text-right">

                  {formatCurrency(item.price)}

                </td>

                <td className="p-4 text-right font-semibold">

                  {formatCurrency(
                    item.price * item.qty
                  )}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

        {/* Total */}

        <div className="mt-10 flex justify-end">

          <div className="w-full max-w-sm rounded-xl border p-6">

            <div className="flex items-center justify-between">

              <span className="text-lg">

                Total

              </span>

              <span className="text-3xl font-bold text-blue-600">

                {formatCurrency(order.total)}

              </span>

            </div>

          </div>

        </div>

        {/* Footer */}

        <div className="mt-16 border-t pt-8 text-center">

          <h3 className="text-xl font-semibold">
            Terima Kasih
            </h3>

            <p className="mt-2 text-gray-500">
            Terima kasih telah berbelanja di{" "}
            <span className="font-semibold">
                {settings?.storeName || "IMPORT STORE"}
            </span>.
            </p>

            <p className="mt-1 text-gray-500">
            Simpan invoice ini sebagai bukti transaksi.
            </p>

            {settings?.footerText && (
            <p className="mt-5 text-sm text-gray-400">
                {settings.footerText}
            </p>
            )}

        </div>

      </div>

      <style jsx global>{`

        @media print {

          body {
            background: white;
          }

          @page {
            size: A4;
            margin: 15mm;
          }

          .print\\:hidden {
            display: none !important;
          }

        }

      `}</style>

    </main>

  );

}