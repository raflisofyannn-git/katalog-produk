"use client";

import { useEffect, useState } from "react";

import { getProducts } from "@/services/productService";

import { Product } from "@/types/product";

import UploadImageRow from "@/components/admin/UploadImageRow";

export default function UploadImagePage() {

  const [products, setProducts] =
    useState<Product[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    async function load() {

      const data =
        await getProducts();

      setProducts(data);

      setLoading(false);

    }

    load();

  }, []);

  if (loading) {

    return (

      <main className="p-8">

        Memuat Produk...

      </main>

    );

  }

  return (

    <main className="mx-auto max-w-6xl p-8">

      <h1 className="text-4xl font-bold">

        Upload Gambar Produk

      </h1>

      <p className="mt-2 text-gray-500">

        Upload foto tanpa membuka Edit Produk.

      </p>

      <div className="mt-8 space-y-5">

        {products.map((product) => (

          <UploadImageRow

            key={product.id}

            product={product}

          />

        ))}

      </div>

    </main>

  );

}