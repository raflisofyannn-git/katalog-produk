"use client";

interface Props {
  customerName: string;
  customerPhone: string;

  setCustomerName: (value: string) => void;
  setCustomerPhone: (value: string) => void;
}

export default function CustomerForm({
  customerName,
  customerPhone,
  setCustomerName,
  setCustomerPhone,
}: Props) {
  return (
    <div className="space-y-4 border-b p-5">

      <h2 className="text-lg font-bold">
        Data Customer
      </h2>

      <input
        type="text"
        placeholder="Nama Customer"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        className="w-full rounded-lg border p-3"
      />

      <input
        type="tel"
        placeholder="Nomor WhatsApp"
        value={customerPhone}
        onChange={(e) => setCustomerPhone(e.target.value)}
        className="w-full rounded-lg border p-3"
      />

    </div>
  );
}