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

  // Loading Skeleton
  if (loading) {
    return (
      <div className="mx-auto mt-8 grid max-w-7xl grid-cols-3 gap-4 px-3 md:gap-5 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </div>
    );
  }

  // Produk kosong
  if (products.length === 0) {
    return (
      <section id="produk" className="mx-auto max-w-7xl px-3 py-10 md:px-6 md:py-20">
        <h2 className="mb-6 text-2xl font-bold md:mb-8 md:text-3xl">
          Produk
        </h2>

        <div className="rounded-xl bg-white p-10 text-center shadow">
          <h3 className="text-2xl font-bold">
            Produk tidak ditemukan
          </h3>

          <p className="mt-3 text-gray-500">
            Coba gunakan kata kunci lain.
          </p>
        </div>
      </section>
    );
  }

  // Produk ada
  return (
    <section id="produk" className="mx-auto max-w-7xl px-3 py-10 md:px-6 md:py-20">

      <h2 className="mb-6 text-2xl font-bold md:mb-8 md:text-3xl">
        Produk
      </h2>

      <div className="grid grid-cols-3 gap-4 px-1 md:gap-5 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>

    </section>
  );
}