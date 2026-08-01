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
      <div className="
                  group
                  overflow-hidden
                  rounded-2xl
                  border
                  bg-white
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  hover:shadow-2xl
                  ">

        <div className="relative aspect-square">

          <div className="absolute left-3 top-3 z-10 rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-white">
            PREORDER
          </div>

          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover"
          />

        </div>

        <div className="space-y-3 p-4">

          <h3 className="line-clamp-2 text-lg font-semibold">
            {product.name}
          </h3>

          <p className="text-xl font-bold text-blue-600">
            Rp {product.price.toLocaleString("id-ID")}
          </p>

          <p className="text-sm text-gray-500">
            {product.category}
          </p>

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="w-full rounded-lg bg-blue-600 py-2 font-semibold text-white transition hover:bg-blue-700"
          >
            Tambah ke Keranjang
          </button>

        </div>

      </div>
    </Link>
  );
}