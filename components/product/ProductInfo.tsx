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

    <div className="space-y-6">

      <h1 className="text-4xl font-bold">
        {product.name}
      </h1>

      <p className="text-3xl font-bold text-blue-600">
        Rp {product.price.toLocaleString("id-ID")}
      </p>

      <div className="inline-block rounded-full bg-gray-100 px-4 py-2">
        {product.category}
      </div>

      <div>

        <h2 className="mb-2 font-semibold">
          Deskripsi Produk
        </h2>

        <p className="leading-7 text-gray-600">
          {product.description}
        </p>

      </div>

      <LoadingButton
        loading={loading}
        onClick={handleAdd}
      >
        Tambah ke Keranjang
      </LoadingButton>

    </div>

  );

}