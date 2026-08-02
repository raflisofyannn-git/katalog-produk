"use client";

import {
  Waves,
  Fish,
  Backpack,
  Dumbbell,
  Shirt,
  ArrowRight,
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
    <section className="mx-auto mt-8 max-w-7xl px-6">

      {/* Header */}

    <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

      <div>

        <p className="text-sm font-bold uppercase tracking-[0.35em] text-blue-600">
          CATEGORY
        </p>

        <h2 className="mt-2 text-4xl font-black tracking-tight text-slate-900">
          Kategori Produk
        </h2>

        <p className="mt-2 text-slate-500">
          Pilih kategori sesuai kebutuhan Anda.
        </p>

      </div>

      <button
        onClick={() => onSelect("")}
        className="
          inline-flex
          items-center
          gap-2
          rounded-full
          border
          border-blue-200
          bg-blue-50
          px-6
          py-3
          font-semibold
          text-blue-600
          transition-all
          duration-300
          hover:bg-blue-600
          hover:text-white
          hover:shadow-lg
        "
      >
        Semua Kategori

        <ArrowRight size={18} />

      </button>

    </div>

      {/* Card */}

      <div className="flex flex-wrap justify-center gap-3">

        {categories.map((category, index) => {

          const Icon = icons[index % icons.length];

          const active = selected === category;

          return (

            <button
              key={category}
              onClick={() => onSelect(category)}
              className={`
                group
                relative
                h-[120px]
                w-[120px]
                overflow-hidden
                rounded-[30px]
                border
                transition-all
                duration-500
                shadow-sm

                ${
                    active
                      ? "border-blue-600 bg-white shadow-2xl scale-105"
                      : "border-slate-200 bg-white hover:-translate-y-2 hover:border-blue-400 hover:shadow-xl"
                  }
              `}
            >

              {/* Background Glow */}

              <div
                className={`
                  absolute
                  inset-0
                  rounded-[30px]
                  transition-all
                  duration-500

                  ${
                    active
                      ? "bg-blue-50"
                      : "opacity-0 group-hover:opacity-100 bg-blue-50"
                  }
                `}
              />

              <div className="relative z-10 flex h-full flex-col items-center justify-center">

                <div
                  className={`
                    mb-2
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    transition-all
                    duration-500

                    ${
                        active
                          ? "bg-blue-600"
                          : "bg-blue-50 group-hover:bg-blue-100"
                      }
                  `}
                >

                  <Icon
                    size={25}
                    className={
                      active
                        ? "text-white"
                        : "text-blue-600"
                    }
                  />

                </div>

                <h3 className="text-sm font-bold text-slate-900">
                  {category}
                </h3>

                
              </div>

            </button>

          );

        })}

      </div>

    </section>
  );
}