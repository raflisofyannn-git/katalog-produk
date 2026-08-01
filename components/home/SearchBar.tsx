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

    <div className="mx-auto mt-8 max-w-7xl px-4">

      <div className="flex items-center rounded-2xl border bg-white px-5 py-4 shadow-sm">

        <Search
          className="mr-3 text-gray-400"
        />

        <input
          value={value}
          onChange={(e) =>
            onChange(e.target.value)
          }
          placeholder="Cari produk..."
          className="w-full outline-none"
        />

      </div>

    </div>

  );

}