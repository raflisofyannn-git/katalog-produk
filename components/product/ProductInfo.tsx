"use client";

import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import LoadingButton from "@/components/ui/LoadingButton";
import { useState } from "react";

interface Props {
  product: Product;
}

export default function ProductInfo({
  product,
}: Props) {

  const { addToCart } = useCart();

  const [loading, setLoading] = useState(false);

  async function handleAdd() {

    setLoading(true);

    await new Promise((resolve) =>
      setTimeout(resolve, 500)
    );

    addToCart(product);

    setLoading(false);

  }

  return (

    <div className="space-y-8">

      {/* Kategori */}

      <span
className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
        {product.category}
      </span>

      {/* Nama */}

      <h1 className="text-4xl font-bold leading-tight">

        {product.name}

      </h1>

      {/* Harga */}

      <div>

        <p className="text-sm text-gray-500">
          Harga
        </p>

        <p className="mt-1 text-5xl font-extrabold text-blue-600">

          Rp {product.price.toLocaleString("id-ID")}

        </p>

      </div>

      {/* Deskripsi */}

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

        <h2 className="mb-4 text-lg font-bold">

          Deskripsi Produk

        </h2>

        <p className="leading-8 text-gray-600">

          {product.description}

        </p>

      </div>

      {/* Tombol */}

      <LoadingButton
        loading={loading}
        onClick={handleAdd}
      >

        Tambah ke Keranjang

      </LoadingButton>

    </div>

  );

}