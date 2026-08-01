"use client";

interface Props {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
}

export default function CategoryFilter({
  categories,
  selected,
  onSelect,
}: Props) {
  return (
    <div className="mx-auto mt-6 flex max-w-7xl gap-3 overflow-x-auto px-4 pb-2">

      <button
        onClick={() => onSelect("")}
        className={`rounded-full px-5 py-2 font-medium transition
        ${
          selected === ""
            ? "bg-blue-600 text-white"
            : "bg-gray-100 hover:bg-gray-200"
        }`}
      >
        Semua
      </button>

      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={`rounded-full px-5 py-2 font-medium transition whitespace-nowrap
          ${
            selected === category
              ? "bg-blue-600 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}