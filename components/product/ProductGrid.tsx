"use client";

import ProductCard from "./ProductCard";
import ProductSkeleton from "./ProductSkeleton";
import { Product } from "@/types/product";

interface Props {
  products: Product[];
  loading: boolean;
  onAddToCart: (product: Product) => void;
}

export default function ProductGrid({
  products,
  loading,
  onAddToCart,
}: Props) {
  if (loading) {
    return (
      <section
        id="produk"
        className="mx-auto max-w-7xl px-4 py-20"
      >
        <div className="mb-14 text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">
            Produk
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            Produk Pilihan
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-500">
            Menyediakan perlengkapan sport
            berkualitas langsung dari supplier
            terpercaya di China.
          </p>

        </div>

        <div className="grid grid-cols-2 gap-5 lg:grid-cols-5">
          {Array.from({ length: 10 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      id="produk"
      className="mx-auto max-w-7xl px-4 py-20"
    >
      <div className="mb-14 text-center">

        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">
          Produk
        </p>

        <h2 className="mt-3 text-4xl font-bold">
          Produk Pilihan
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-gray-500">
          Temukan perlengkapan diving,
          swimming dan sport berkualitas
          langsung dari supplier terpercaya
          di China.
        </p>

      </div>

      {products.length === 0 ? (
        <div className="rounded-3xl border border-dashed py-20 text-center">

          <h3 className="text-3xl font-bold">
            Produk belum tersedia
          </h3>

          <p className="mt-3 text-gray-500">
            Silakan coba kategori lain.
          </p>

        </div>
      ) : (
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-5">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      )}
    </section>
  );
}