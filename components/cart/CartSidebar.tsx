"use client";

import { ADMIN_PHONE } from "@/constants/config";
import CheckoutSuccessModal from "@/components/cart/CheckoutSuccessModal";
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
}

export default function CartSidebar({
  open,
  onClose,
}: Props) {

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [loadingCheckout, setLoadingCheckout] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [whatsappUrl, setWhatsappUrl] = useState("");
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

const url =
  `https://wa.me/${ADMIN_PHONE}?text=${encodeURIComponent(message)}`;

setOrderNumber(orderNumber);

setWhatsappUrl(url);

setShowSuccess(true);
setCustomerName("");
setCustomerPhone("");

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
        sm:w-[450px]
        flex-col
        bg-white
        shadow-2xl
        transition-transform
        duration-300
        ${open ? "translate-x-0" : "translate-x-full"}
        `}
>
        <div className="flex items-center justify-between border-b px-6 py-5">

  <div>
    <h2 className="text-2xl font-bold">
      🛒 Keranjang
    </h2>

    <p className="text-sm text-gray-500">
      {totalItems} Produk
    </p>
  </div>

  <button
    onClick={onClose}
    className="rounded-full p-2 hover:bg-gray-100"
  >
    <X size={22} />
  </button>

</div>

<div className="flex-1 overflow-y-auto p-5 pb-40">

<div className="mb-6 rounded-xl border p-4">

  <div className="mb-4">
    <label className="mb-2 block text-sm font-medium">
      Nama Customer
    </label>

    <input
      value={customerName}
      onChange={(e) => setCustomerName(e.target.value)}
      placeholder="Masukkan nama customer"
      className="w-full rounded-xl border px-4 py-3"
    />
  </div>

  <div>
    <label className="mb-2 block text-sm font-medium">
      No WhatsApp
    </label>

    <input
        type="tel"
        inputMode="numeric"
        value={customerPhone}
        onChange={(e) => setCustomerPhone(e.target.value)}
        placeholder="08xxxxxxxxxx"
        className="w-full rounded-xl border px-4 py-3"
      />
  </div>

</div>



          {cart.length === 0 ? (
            <p>Keranjang masih kosong.</p>
          ) : (
            cart.map((item) => (
                <div
                    key={item.id}
                    className="mb-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
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

<div className="sticky bottom-0 border-t bg-white p-5 shadow-lg">

          <div className="mb-5 flex items-center justify-between text-lg font-semibold">

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
      <CheckoutSuccessModal
  open={showSuccess}
  orderNumber={orderNumber}
  whatsappUrl={whatsappUrl}
  onClose={() => {
    setShowSuccess(false);
    clearCart();
    onClose();
  }}
/>
    </>
  );
  
}