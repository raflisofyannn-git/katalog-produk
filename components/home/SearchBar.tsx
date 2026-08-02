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
    <section className="mx-auto mt-24 max-w-7xl px-6">

      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">

        <div className="flex flex-col gap-4 md:flex-row">

          {/* Search */}

          <div className="relative flex-1">

            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              value={value}
              onChange={(e) =>
                onChange(e.target.value)
              }
              placeholder="Cari produk..."
              className="
                h-14
                w-full
                rounded-2xl
                border
                border-gray-200
                bg-gray-50
                pl-12
                pr-4
                outline-none
                transition
                focus:border-blue-500
                focus:bg-white
              "
            />

          </div>

          {/* Button */}

          <button
            className="
              h-14
              rounded-2xl
              bg-blue-600
              px-8
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