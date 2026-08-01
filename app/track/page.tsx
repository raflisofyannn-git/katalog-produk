"use client";

import { useState } from "react";
import { Search } from "lucide-react";

import { useTrackOrder } from "@/hooks/useTrackOrder";
import { formatCurrency } from "@/utils/formatCurrency";

export default function TrackPage() {
  const [keyword, setKeyword] = useState("");

  const { order, loading, search } = useTrackOrder();

  return (
    <main className="mx-auto max-w-3xl p-8">

      <h1 className="mb-2 text-4xl font-bold">
        Lacak Pesanan
      </h1>

      <p className="mb-8 text-gray-500">
        Masukkan Nomor PO Anda
      </p>

      <div className="flex gap-3">

        <input
          className="flex-1 rounded-lg border p-3"
          placeholder="PO-20260801-0001"
          value={keyword}
          onChange={(e) =>
            setKeyword(e.target.value)
          }
        />

        <button
          onClick={() => search(keyword)}
          className="rounded-lg bg-blue-600 px-5 text-white hover:bg-blue-700"
        >
          <Search size={20} />
        </button>

      </div>

      {loading && (
        <p className="mt-8">
          Mencari pesanan...
        </p>
      )}

      {!loading && order && (

        <div className="mt-10 rounded-xl border bg-white p-6 shadow">

          <h2 className="text-2xl font-bold">
            {order.orderNumber}
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">

            <div>
              <p className="text-gray-500">
                Customer
              </p>

              <p className="font-semibold">
                {order.customerName}
              </p>
            </div>

            <div>
              <p className="text-gray-500">
                Status
              </p>

              <p className="font-semibold text-blue-600">
                {order.status}
              </p>
            </div>

            <div>
              <p className="text-gray-500">
                Tanggal
              </p>

              <p>
                {new Date(
                  order.createdAt
                ).toLocaleDateString("id-ID")}
              </p>
            </div>

            <div>
              <p className="text-gray-500">
                Total
              </p>

              <p className="font-bold">
                {formatCurrency(order.total)}
              </p>
            </div>

          </div>

          <hr className="my-6" />

          <h3 className="mb-4 text-xl font-bold">
            Produk
          </h3>

          <div className="space-y-4">

            {order.items.map((item) => (

              <div
                key={item.id}
                className="flex justify-between rounded-lg border p-4"
              >

                <div>

                  <p className="font-semibold">
                    {item.name}
                  </p>

                  <p className="text-gray-500">
                    Qty {item.qty}
                  </p>

                </div>

                <p className="font-bold">
                  {formatCurrency(
                    item.price * item.qty
                  )}
                </p>

              </div>

            ))}

          </div>

        </div>

      )}

      {!loading && !order && keyword && (

        <div className="mt-8 rounded-xl border bg-red-50 p-6">

          <h2 className="text-xl font-bold text-red-600">
            Pesanan tidak ditemukan
          </h2>

          <p className="mt-2 text-gray-600">
            Pastikan Nomor PO sudah benar.
          </p>

        </div>

      )}

    </main>
  );
}