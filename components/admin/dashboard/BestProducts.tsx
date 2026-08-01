"use client";

import { useBestProducts } from "@/hooks/useBestProducts";

export default function BestProducts() {
  const { products, loading } = useBestProducts();

  if (loading) {
    return (
      <div className="rounded-xl border bg-white p-6 shadow">
        Memuat produk terlaris...
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-white p-6 shadow">
      <h2 className="mb-5 text-xl font-bold">
        🔥 Produk Terlaris
      </h2>

      <div className="space-y-4">
        {products.map((item, index) => (
          <div
            key={item.id}
            className="flex justify-between border-b pb-2"
          >
            <div>
              <p className="font-semibold">
                {index + 1}. {item.name}
              </p>
            </div>

            <span className="font-bold text-blue-600">
              {item.qty}x
            </span>
          </div>
        ))}

        {products.length === 0 && (
          <p className="text-gray-500">
            Belum ada transaksi.
          </p>
        )}
      </div>
    </div>
  );
}