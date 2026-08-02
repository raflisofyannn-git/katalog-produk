"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ShoppingCart,
  Eye,
  Star,
  Heart,
} from "lucide-react";

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
    <div className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

      {/* NEW */}
      <span className="absolute left-4 top-4 z-20 rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white">
        NEW
      </span>

      {/* Wishlist */}
      <button
        className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow transition hover:bg-red-50"
      >
        <Heart
          size={18}
          className="text-gray-500 hover:text-red-500"
        />
      </button>

      <Link href={`/produk/${product.id}`}>

        <div className="relative aspect-square overflow-hidden bg-gray-50">

          <Image
            src={
              product.images?.[0] ||
              "/placeholder.png"
            }
            alt={product.name}
            fill
            sizes="(max-width:768px)100vw,25vw"
            className="object-cover transition duration-500 group-hover:scale-110"
          />

        </div>

      </Link>

      <div className="space-y-3 p-5">

        <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">

          {product.category}

        </span>

        <h3 className="line-clamp-2 min-h-[56px] text-lg font-bold">

          {product.name}

        </h3>

        
        <p className="text-2xl font-extrabold text-blue-600">

          Rp {product.price.toLocaleString("id-ID")}

        </p>

        <div className="flex gap-3">

          <Link
            href={`/produk/${product.id}`}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border py-3 font-semibold transition hover:bg-gray-100"
          >
            <Eye size={18} />

            Detail
          </Link>

          <button
            onClick={() =>
              onAddToCart(product)
            }
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            <ShoppingCart size={18} />

            Cart
          </button>

        </div>

      </div>

    </div>
  );
}