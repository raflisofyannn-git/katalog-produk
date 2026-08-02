"use client";

import { Search } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({
  value,
  onChange,
}: Props) {
  return (
    <section className="relative z-20 -mt-10 mb-20">

  <div className="mx-auto flex max-w-7xl justify-center px-6">

    <div
      className="
      flex
      w-full
      max-w-2xl
      items-center
      rounded-3xl
      border
      border-slate-200
      bg-white
      p-3
      shadow-[0_18px_50px_rgba(15,23,42,.08)]
      "
    >

      <Search
        size={22}
        className="ml-4 text-slate-400"
      />

      <input
        type="text"
        placeholder="Cari produk..."
        className="
        flex-1
        border-none
        bg-transparent
        px-4
        py-3
        text-lg
        outline-none
        placeholder:text-slate-400
        "
      />

      <button
        className="
        rounded-2xl
        bg-blue-600
        px-8
        py-4
        font-semibold
        text-white
        transition
        hover:bg-blue-700
        "
      >
        Cari
      </button>

    </div>

  </div>

</section>
  );
}