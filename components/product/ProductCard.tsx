"use client";

import Image from "next/image";
import Link from "next/link";

import { Product } from "@/types/product";

interface Props {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({
  product,
  onAddToCart,
}: Props) {
  return (
    <Link href={`/produk/${product.id}`}>

      <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

        {/* Gambar */}

       <div className="relative aspect-square overflow-hidden">

          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />

        </div>

        {/* Content */}

       <div className="flex flex-1 flex-col space-y-3 p-3 md:p-4">

          <span className="
inline-block rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
            {product.category}
          </span>

          <h3 className="line-clamp-2 min-h-[48px] text-sm font-semibold md:text-lg">

            {product.name}

          </h3>

          <p className="mt-auto text-lg font-bold text-blue-600 md:text-2xl">

            Rp {product.price.toLocaleString("id-ID")}

          </p>

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="w-full rounded-xl bg-blue-600 px-2 py-2 text-xs font-semibold text-white transition hover:bg-blue-700 active:scale-95 md:px-4 md:text-base"
          >
            Add Cart
          </button>

        </div>

      </div>

    </Link>
  );
}