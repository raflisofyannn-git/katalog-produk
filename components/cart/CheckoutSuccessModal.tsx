"use client";

interface Props {
  open: boolean;
  orderNumber: string;
  whatsappUrl: string;
  onClose: () => void;
}

export default function CheckoutSuccessModal({
  open,
  orderNumber,
  whatsappUrl,
  onClose,
}: Props) {
  if (!open) return null;

  function openWhatsapp() {
  window.location.assign(whatsappUrl);
}

  async function copyPO() {
    await navigator.clipboard.writeText(orderNumber);
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-5">

      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">

        <div className="text-center">

          <div className="text-6xl">
            ✅
          </div>

          <h2 className="mt-4 text-2xl font-bold">
            Pesanan Berhasil
          </h2>

          <p className="mt-3 text-gray-500">
            Nomor PO Anda
          </p>

          <div className="mt-3 rounded-xl border bg-slate-50 p-4">

            <p className="text-xl font-bold text-blue-600">
              {orderNumber}
            </p>

          </div>

          <button
            onClick={copyPO}
            className="mt-3 text-sm text-blue-600 hover:underline"
          >
            Salin Nomor PO
          </button>

          <p className="mt-6 text-gray-600">
            Klik tombol di bawah untuk mengirim
            pesanan melalui WhatsApp ke Admin.
          </p>

          <button
            onClick={openWhatsapp}
            className="mt-6 w-full rounded-xl bg-green-600 py-3 font-semibold text-white hover:bg-green-700"
          >
            Kirim ke WhatsApp
          </button>

          <button
            onClick={onClose}
            className="mt-3 w-full rounded-xl border py-3"
          >
            Tutup
          </button>

        </div>

      </div>

    </div>
  );
}