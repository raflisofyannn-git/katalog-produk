"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Star } from "lucide-react";

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
      <div className="group overflow-hidden rounded-3xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

        {/* Badge */}
        <div className="absolute z-10 m-3 rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-white shadow-lg">
          BEST SELLER
        </div>

        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-gray-100">

          <Image
            src={product.images?.[0] || "/placeholder.png"}
            alt={product.name}
            fill
            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 25vw"
            className="object-cover transition duration-500 group-hover:scale-110"
          />

        </div>

        {/* Content */}

        <div className="space-y-3 p-5">

          {/* Rating */}

          <div className="flex items-center gap-1">

            <Star
              size={16}
              className="fill-yellow-400 text-yellow-400"
            />

            <span className="text-sm font-medium">
              4.9
            </span>

            <span className="text-xs text-gray-400">
              (120)
            </span>

          </div>

          {/* Product */}

          <h3 className="line-clamp-2 min-h-[56px] text-lg font-bold text-gray-900">

            {product.name}

          </h3>

          {/* Category */}

          <p className="text-sm text-gray-500">

            {product.category}

          </p>

          {/* Price */}

          <div>

            <p className="text-2xl font-extrabold text-blue-600">

              Rp {product.price.toLocaleString("id-ID")}

            </p>

          </div>

          {/* Button */}

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 active:scale-95"
          >
            <ShoppingCart size={18} />

            Tambah ke Keranjang
          </button>

        </div>

      </div>
    </Link>
  );
}