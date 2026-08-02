"use client";

import {
  Grid2x2,
  Waves,
  Dumbbell,
  Tent,
  Bike,
  Fish,
} from "lucide-react";

interface Props {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
}

function getIcon(category: string) {
  const text = category.toLowerCase();

  if (text.includes("diving")) return <Fish size={28} />;
  if (text.includes("swimming")) return <Waves size={28} />;
  if (text.includes("fitness")) return <Dumbbell size={28} />;
  if (text.includes("outdoor")) return <Tent size={28} />;

  return <Bike size={28} />;
}

export default function CategoryFilter({
  categories,
  selected,
  onSelect,
}: Props) {
  return (
    <section className="mx-auto mt-10 max-w-7xl px-4">

      <div className="mb-8">

        <h2 className="text-3xl font-bold">
          Kategori Produk
        </h2>

        <p className="mt-2 text-gray-500">
          Pilih kategori untuk menemukan produk yang Anda butuhkan.
        </p>

      </div>

      <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5">

        {/* Semua */}

        <button
          onClick={() => onSelect("")}
          className={`group rounded-3xl border p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl
          ${
            selected === ""
              ? "border-blue-600 bg-blue-600 text-white"
              : "border-gray-200 bg-white"
          }`}
        >
          <div className="mb-4 flex justify-center">

            <Grid2x2
              size={34}
              className={
                selected === ""
                  ? "text-white"
                  : "text-blue-600"
              }
            />

          </div>

          <h3 className="font-bold">
            Semua
          </h3>

        </button>

        {/* Category */}

        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelect(category)}
            className={`group rounded-3xl border p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl
            ${
              selected === category
                ? "border-blue-600 bg-blue-600 text-white"
                : "border-gray-200 bg-white"
            }`}
          >
            <div className="mb-4 flex justify-center">

              <div
                className={
                  selected === category
                    ? "text-white"
                    : "text-blue-600"
                }
              >
                {getIcon(category)}
              </div>

            </div>

            <h3 className="text-sm font-bold md:text-base">
              {category}
            </h3>

          </button>
        ))}

      </div>

    </section>
  );
}