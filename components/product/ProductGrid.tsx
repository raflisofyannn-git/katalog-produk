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
        className="mx-auto max-w-7xl px-6 pt-10 pb-20"
      >
        {/* Header */}

        <div className="mb-14 flex items-end justify-between">

          <div>

            <p className="text-sm font-bold uppercase tracking-[0.35em] text-blue-600">
              COLLECTION
            </p>

            <h2
  className="
  mt-3
  text-3xl
  font-black
  tracking-tight
  text-slate-900

  md:text-4xl

  lg:text-5xl
  "
>
              Produk Pilihan
            </h2>

            <p
  className="
  mt-4
  max-w-2xl
  text-base
  leading-7
  text-slate-500

  lg:text-lg
  lg:leading-8
  "
>
              Temukan perlengkapan Diving, Swimming, Outdoor dan
              Sport berkualitas langsung dari supplier terpercaya
              di China.
            </p>

          </div>

          <div className="hidden rounded-full bg-blue-50 px-6 py-3 font-semibold text-blue-600 lg:block">
            Loading...
          </div>

        </div>

        {/* Skeleton */}

        <div
  className="
  grid
  grid-cols-2
  gap-4
  sm:grid-cols-3
  md:grid-cols-4
  lg:grid-cols-5
  auto-rows-fr
  "
>
          {Array.from({ length: 12 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      id="produk"
      className="mx-auto max-w-7xl px-6 pt-10 pb-20"
    >
      {/* Header */}

      <div
  className="
  mb-10
  flex
  flex-col
  gap-4

  lg:mb-14
  lg:flex-row
  lg:items-end
  lg:justify-between
  "
>

        <div>

          <p className="text-sm font-bold uppercase tracking-[0.35em] text-blue-600">
            COLLECTION
          </p>

          <h2 className="mt-3 text-5xl font-black tracking-tight text-slate-900">
            Produk Pilihan
          </h2>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-500">
            Temukan perlengkapan Diving, Swimming, Outdoor dan
            Sport berkualitas langsung dari supplier terpercaya
            di China.
          </p>

        </div>

        <div className="hidden rounded-full bg-blue-50 px-6 py-3 font-semibold text-blue-600 lg:block">
          {products.length} Produk
        </div>

      </div>

      {products.length === 0 ? (

        <div
          className="
          rounded-[32px]
          border-2
          border-dashed
          border-slate-300
          bg-slate-50
          py-24
          text-center
          "
        >

          <h3 className="text-3xl font-bold text-slate-800">
            Produk Belum Tersedia
          </h3>

          <p className="mt-4 text-slate-500">
            Silakan pilih kategori lain atau kembali lagi nanti.
          </p>

        </div>

      ) : (

       <div
  className="
  grid
  grid-cols-2
  gap-4
  auto-rows-fr

  sm:grid-cols-3

  md:grid-cols-4

  lg:grid-cols-5
  "
>

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