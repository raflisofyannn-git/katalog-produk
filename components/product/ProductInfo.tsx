"use client";

import { useState } from "react";
import {
  ShoppingCart,
  MessageCircle,
  Star,
  ShieldCheck,
  Truck,
  Minus,
  Plus,
} from "lucide-react";

import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { useSettings } from "@/hooks/useSettings";
import LoadingButton from "@/components/ui/LoadingButton";

interface Props {
  product: Product;
}

export default function ProductInfo({
  product,
}: Props) {
  const { addToCart } = useCart();
  const { settings } = useSettings();

  const [loading, setLoading] = useState(false);
  const [qty, setQty] = useState(1);

  async function handleAdd() {
    setLoading(true);

    for (let i = 0; i < qty; i++) {
      addToCart(product);
    }

    await new Promise((resolve) =>
      setTimeout(resolve, 400)
    );

    setLoading(false);
  }

  const whatsapp =
    settings?.adminPhone
      ? `https://wa.me/${settings.adminPhone.replace(/\D/g, "")}`
      : "#";

  return (
    <div className="space-y-8">

      {/* Category */}

      <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">

        {product.category}

      </span>

      {/* Title */}

      <h1 className="text-4xl font-extrabold leading-tight text-slate-900">

        {product.name}

      </h1>

      {/* Rating */}

      

      {/* Price */}

      <div>

        <p className="text-sm text-gray-500">
          Harga
        </p>

        <h2 className="mt-2 text-5xl font-extrabold text-blue-600">

          Rp {product.price.toLocaleString("id-ID")}

        </h2>

      </div>

      {/* Description */}

      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">

        <h3 className="mb-4 text-xl font-bold">
          Deskripsi Produk
        </h3>

        <p className="leading-8 text-gray-600">
          {product.description}
        </p>

      </div>

      {/* Information */}

      <div className="grid gap-4 rounded-3xl bg-slate-50 p-5">

        <div className="flex items-center gap-3">
          <Truck className="text-blue-600" />
          <span>
            Pengiriman langsung dari supplier terpercaya.
          </span>
        </div>

        <div className="flex items-center gap-3">
          <ShieldCheck className="text-green-600" />
          <span>
            Produk diperiksa sebelum dikirim.
          </span>
        </div>

      </div>

      {/* Quantity */}

      <div>

        <p className="mb-3 font-semibold">
          Jumlah
        </p>

        <div className="flex w-fit items-center rounded-2xl border">

          <button
            onClick={() =>
              setQty((q) =>
                Math.max(1, q - 1)
              )
            }
            className="p-4 hover:bg-gray-100"
          >
            <Minus size={18} />
          </button>

          <span className="w-16 text-center text-lg font-bold">
            {qty}
          </span>

          <button
            onClick={() =>
              setQty((q) => q + 1)
            }
            className="p-4 hover:bg-gray-100"
          >
            <Plus size={18} />
          </button>

        </div>

      </div>

      {/* Action */}

      <div className="grid gap-4 md:grid-cols-2">

        <LoadingButton
          loading={loading}
          onClick={handleAdd}
        >
          <span className="flex items-center justify-center gap-2">
            <ShoppingCart size={20} />
            Tambah ke Keranjang
          </span>
        </LoadingButton>

        <a
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-2xl bg-green-600 px-6 py-4 text-lg font-semibold text-white transition hover:bg-green-700"
        >
          <MessageCircle size={22} />
          Chat WhatsApp
        </a>

      </div>

    </div>
  );
}