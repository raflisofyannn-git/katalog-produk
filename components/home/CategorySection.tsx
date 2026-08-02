"use client";

import { ArrowRight } from "lucide-react";

interface Props {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
}

export default function CategorySection({
  categories,
  selected,
  onSelect,
}: Props) {
  return (
    <section className="mx-auto mt-8 max-w-7xl px-6">

      {/* Header */}

      <div
        className="
        mb-8
        flex
        flex-col
        gap-5

        lg:flex-row
        lg:items-end
        lg:justify-between
        "
      >

        <div>

          <p
            className="
            text-sm
            font-bold
            uppercase
            tracking-[0.35em]
            text-blue-600
            "
          >
            CATEGORY
          </p>

          <h2
            className="
            mt-2
            text-3xl
            font-black
            tracking-tight
            text-slate-900

            lg:text-5xl
            "
          >
            Explore Categories
          </h2>

          <p
            className="
            mt-3
            text-slate-500
            "
          >
            Temukan perlengkapan diving sesuai kebutuhan Anda.
          </p>

        </div>

        <button
          onClick={() => onSelect("")}
          className="
          hidden

          lg:flex

          items-center
          gap-2

          rounded-full

          bg-blue-600

          px-6
          py-3

          font-semibold

          text-white

          transition

          hover:bg-blue-700
          "
        >

          Semua Produk

          <ArrowRight size={18} />

        </button>

      </div>
            {/* Category Buttons */}

      <div
        className="
        flex
        gap-3
        overflow-x-auto
        pb-2
        no-scrollbar
        "
      >

        {/* Semua */}

        <button
          onClick={() => onSelect("")}
          className={`
            shrink-0
            rounded-full
            px-5
            py-3
            text-sm
            font-semibold
            transition-all
            duration-300

            ${
              selected === ""
                ? "bg-blue-600 text-white shadow-lg"
                : "border border-slate-200 bg-white text-slate-700 hover:border-blue-500 hover:text-blue-600"
            }
          `}
        >
          Semua
        </button>

        {categories.map((category) => (

          <button
            key={category}
            onClick={() => onSelect(category)}
            className={`
              shrink-0
              rounded-full
              border
              px-5
              py-3
              text-sm
              font-semibold
              transition-all
              duration-300

              ${
                selected === category
                  ? "border-blue-600 bg-blue-600 text-white shadow-lg"
                  : "border-slate-200 bg-white text-slate-700 hover:border-blue-500 hover:text-blue-600 hover:shadow-md"
              }
            `}
          >
            {category}
          </button>

        ))}

      </div>

    </section>
  );
}