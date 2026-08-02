"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ShoppingCart,
  Eye,
  ArrowRight,
  ShieldCheck,
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
    <div
  className="
  group
  relative
  flex
  h-full
  flex-col
  overflow-hidden
  rounded-[28px]
  border
  border-slate-200
  bg-white
  "
>

     
      <Link href={`/produk/${product.id}`}>

        <div
  className="
  relative
  aspect-[4/5]
  overflow-hidden
  bg-gradient-to-br
  from-slate-50
  via-white
  to-blue-50
  "
>

          <Image
            src={
              product.images?.[0] ||
              "/placeholder.png"
            }
            alt={product.name}
            fill
            sizes="(max-width:768px)100vw,25vw"
            className="
            object-cover
            transition-all
            duration-700
            group-hover:scale-110
            group-hover:rotate-1
            "
          />

      
<div
  className="
  absolute
  right-4
  top-4
  rounded-full
  bg-white/90
  p-2
  shadow-lg
  backdrop-blur
  "
>
  <ShieldCheck
    size={18}
    className="text-blue-600"
  />
</div>

        </div>

      </Link>

    <div
  className="
  flex
  flex-1
  flex-col
  p-4
  lg:p-5
  "
>

        <div className="flex items-center justify-between">

  <span
    className="
    rounded-full
    bg-blue-50
    px-3
    py-1
    text-[16px]
    font-bold
    uppercase
    tracking-wider
    text-blue-600
    "
  >
    {product.category}
  </span>

  

</div>

        <h3
  className="
  line-clamp-2
  min-h-[52px]
 text-base
lg:text-lg
  font-extrabold
  leading-7
  text-slate-800
  transition
  group-hover:text-blue-600
  "
>
  {product.name}
</h3>

        
        <div>

  <p
    className="
    text-xs
    uppercase
    tracking-wider
    text-slate-500
    "
  >
    Harga
  </p>

  <h2
    className="
    mt-1
    text-xl
lg:text-2xl
    font-black
    tracking-tight
    text-blue-600
    "
  >
    Rp {product.price.toLocaleString("id-ID")}
  </h2>

</div>

        <div className="mt-2 flex gap-3">

  <Link
    href={`/produk/${product.id}`}
    className="
    group/detail
    flex
    h-10
lg:h-12
    flex-1
    items-center
    justify-center
    gap-2
    rounded-2xl
    border
    border-slate-200
    bg-white
    font-semibold
    text-slate-700
    transition-all
    duration-300
    hover:border-blue-600
    hover:text-blue-600
    "
  >

    <Eye
      size={18}
      className="transition group-hover/detail:scale-110"
    />

    Detail

    <ArrowRight
      size={16}
      className="
      transition
      group-hover/detail:translate-x-1
      "
    />

  </Link>

  <button
    onClick={() => onAddToCart(product)}
    className="
    group/cart
    flex
    h-12
    flex-1
    items-center
    justify-center
    gap-2
    rounded-2xl
    bg-blue-600
    font-semibold
    text-white
    shadow-lg
    transition-all
    duration-300
    hover:-translate-y-0.5
    hover:bg-blue-700
    hover:shadow-xl
    "
  >

    <ShoppingCart
      size={18}
      className="transition group-hover/cart:rotate-12"
    />

    Add

  </button>

</div>

      </div>
<div
  className="
  pointer-events-none
  absolute
  inset-0
  rounded-3xl
  ring-0
  transition-all
  duration-500
  group-hover:ring-2
  group-hover:ring-blue-100
  "
/>
    </div>
  );
}