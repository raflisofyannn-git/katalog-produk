"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CloseButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="mb-6 flex h-10 w-10 items-center justify-center rounded-full border bg-white shadow transition hover:bg-gray-100"
aria-label="Kembali"
    >
      <X size={20} />
    </button>
  );
}