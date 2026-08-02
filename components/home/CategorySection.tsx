"use client";

import {
  Waves,
  Fish,
  Backpack,
  Dumbbell,
  Shirt,
} from "lucide-react";

interface Props {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
}

const icons = [
  Waves,
  Fish,
  Backpack,
  Shirt,
  Dumbbell,
];

export default function CategorySection({
  categories,
  selected,
  onSelect,
}: Props) {
  return (
    <section className="mx-auto mt-24 max-w-7xl px-6">

      <div className="mb-10 flex items-center justify-between">

        <div>

          <h2 className="text-4xl font-bold">
            Kategori Produk
          </h2>

          <p className="mt-2 text-gray-500">
            Pilih kategori sesuai kebutuhan Anda.
          </p>

        </div>

        <button
          onClick={() => onSelect("")}
          className="font-semibold text-blue-600 hover:underline"
        >
          Semua →
        </button>

      </div>

     <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5">

        {categories.map((category, index) => {

          const Icon = icons[index % icons.length];

          return (
            <button
  key={category}
  onClick={() => onSelect(category)}
  className={`group h-56 rounded-[28px] border border-slate-200 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-2xl

    ${
      selected === category
  ? "border-blue-600 bg-blue-600"
  : "bg-white"
    }
  `}
>

              <div
  className={`mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full transition

    ${
      selected === category
        ? "bg-white/20"
        : "bg-blue-50 group-hover:bg-blue-100"
    }
  `}
>

                <Icon
                size={48}
                className={selected === category ? "text-white" : "text-blue-600"}
                />

              </div>

              <h3
  className={`mt-4 text-lg font-bold ${
    selected === category
      ? "text-white"
      : "text-slate-900"
  }`}
>
  {category}
</h3>

<p
  className={`mt-2 text-sm ${
    selected === category
      ? "text-blue-100"
      : "text-slate-500"
  }`}
>
  Lihat Produk
</p>

            </button>
          );
        })}
      </div>

    </section>
  );
}