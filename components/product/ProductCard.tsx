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
shadow-sm
transition-all
duration-500
hover:-translate-y-2
hover:shadow-xl
  "
>

     
      <Link href={`/produk/${product.id}`}>

        <div
  className="
  relative
  aspect-[4/5]
  overflow-hidden
  bg-gradient-to-br
  from-white
  via-slate-50
  to-white
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
            object-contain
            p-4
            transition-all
            duration-500
            group-hover:scale-105
            "
          />

      
<div
  className="
  absolute
  right-3
top-3
  rounded-full
  bg-white/90
  p-1.5
  shadow-lg
  backdrop-blur
  "
>
  <ShieldCheck
    size={16}
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
    text-[10px]
sm:text-xs
lg:text-sm
    font-bold
    uppercase
    tracking-[0.2em]
    text-blue-600
    "
  >
    {product.category}
  </span>

  

</div>

        <h3
  className="
  line-clamp-2
  min-h-[48px]
 text-base
lg:text-lg
  font-extrabold
  leading-6
  text-slate-800
  transition
  group-hover:text-blue-600
  "
>
  {product.name}
</h3>

        
        <div className="mt-4">

  <p
    className="
    text-[10px]
    uppercase
    tracking-[0.25em]
    text-slate-400
    "
  >
    Harga
  </p>

  <h2
    className="
    mt-1
    text-lg
    font-extrabold
    tracking-tight
    text-blue-600

    sm:text-xl

    lg:text-2xl
    "
  >
    Rp {product.price.toLocaleString("id-ID")}
  </h2>

</div>

<div
  className="
  mt-5
  grid
  grid-cols-2
  gap-2
  "
>

  <Link
    href={`/produk/${product.id}`}
    className="
    flex
    h-10
    items-center
    justify-center
    gap-1
    rounded-xl
    border
    border-slate-200
    bg-white
    text-xs
    font-semibold
    text-slate-700
    transition-all
    hover:border-blue-600
    hover:text-blue-600

    lg:h-11
    lg:text-sm
    "
  >

    <Eye size={16} />

    Detail

  </Link>

  <button
    onClick={() => onAddToCart(product)}
    className="
    flex
    h-10
    items-center
    justify-center
    gap-1
    rounded-xl
    bg-blue-600
    text-xs
    font-semibold
    text-white
    transition-all
    hover:bg-blue-700

    lg:h-11
    lg:text-sm
    "
  >

    <ShoppingCart size={16} />

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