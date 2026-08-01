"use client";

import { ADMIN_PHONE } from "@/constants/config";
import LoadingButton from "@/components/ui/LoadingButton";
import { useState } from "react";
import {
  addOrder,
  generateOrderNumber,
} from "@/services/orderService";

import {
  X,
  Plus,
  Minus,
  Trash2,
} from "lucide-react";

import { useCart } from "@/context/CartContext";
import { createWhatsappMessage } from "@/utils/formatWhatsApp";
import { toast } from "sonner";


interface Props {
  open: boolean;
  onClose: () => void;

  customerName: string;
  customerPhone: string;
}

export default function CartSidebar({
  open,
  onClose,
  customerName,
  customerPhone,
}: Props) {

  const [loadingCheckout, setLoadingCheckout] = useState(false);
  const {
  cart,
  increaseQty,
  decreaseQty,
  removeItem,
  clearCart,
  totalItems,
  totalPrice,
} = useCart();

    async function handleCheckout() {

  if (!customerName.trim()) {
    toast.warning("Masukkan nama customer.");
    return;
  }

  if (!customerPhone.trim()) {
    toast.warning("Masukkan nomor WhatsApp.");
    return;
  }

  if (cart.length === 0) {
    toast.warning("Keranjang masih kosong.");
    return;
  }

  try {

    setLoadingCheckout(true);

    // ===========================
    // Generate Nomor PO
    // ===========================

    const orderNumber = await generateOrderNumber();

    // ===========================
    // Simpan ke Firebase
    // ===========================

    await addOrder({
      orderNumber,

      customerName,

      customerPhone,

      total: totalPrice,

      status: "Pending",

      createdAt: Date.now(),

      items: cart,
    });

    // ===========================
    // Pesan WhatsApp
    // ===========================

   const message = createWhatsappMessage(
  cart,
  customerName,
  customerPhone,
  totalPrice,
  orderNumber
);

window.open(
  `https://wa.me/${ADMIN_PHONE}?text=${encodeURIComponent(message)}`,
  "_blank"
);

    clearCart();

    onClose();

  } catch (err) {

    console.error(err);

    toast.error("Checkout gagal.");

  } finally {

    setLoadingCheckout(false);

  }

}



  return (
    <>
      {/* Background */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 transition ${
          open
            ? "visible opacity-100"
            : "invisible opacity-0"
        }`}
      />

      {/* Sidebar */}
      <div

        className={`
        fixed right-0 top-0
        flex h-full
        w-full
        sm:w-[420px]
        flex-col
        bg-white
        shadow-2xl
        transition-transform
        duration-300
        ${open ? "translate-x-0" : "translate-x-full"}
        `}
>
        <div className="flex items-center justify-between border-b p-5">

          <h2 className="text-xl font-bold">
            Keranjang ({totalItems})
          </h2>

          <button onClick={onClose}>
            <X />
          </button>

        </div>

        <div className="flex-1 overflow-y-auto p-5">

          {cart.length === 0 ? (
            <p>Keranjang masih kosong.</p>
          ) : (
            cart.map((item) => (
                <div
                    key={item.id}
                    className="mb-5 rounded-xl border p-4"
                >
                    <h3 className="font-semibold">
                    {item.name}
                    </h3>

                    <p className="text-sm text-gray-500">
                    Rp {item.price.toLocaleString("id-ID")}
                    </p>

                    <div className="mt-3 flex items-center justify-between">

                    <div className="flex items-center gap-2">

                        <button
                        onClick={() => decreaseQty(item.id)}
                        className="rounded bg-gray-200 p-1"
                        >
                        <Minus size={16}/>
                        </button>

                        <span className="w-6 text-center">
                        {item.qty}
                        </span>

                        <button
                        onClick={() => increaseQty(item.id)}
                        className="rounded bg-blue-600 p-1 text-white"
                        >
                        <Plus size={16}/>
                        </button>

                    </div>

                    <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500"
                    >
                        <Trash2 size={18}/>
                    </button>

                    </div>

                    <div className="mt-3 font-bold text-blue-600">
                    Rp {(item.price * item.qty).toLocaleString("id-ID")}
                    </div>
                </div>
                ))
          )}

        </div>

        <div className="border-t p-5">

          <div className="mb-4 flex justify-between">

            <span>Total</span>

            <span className="font-bold text-blue-600">
              Rp {totalPrice.toLocaleString("id-ID")}
            </span>

          </div>

          <LoadingButton
            loading={loadingCheckout}
            onClick={handleCheckout}
          >
            Checkout WhatsApp
          </LoadingButton>

        </div>
      </div>
    </>
  );
}