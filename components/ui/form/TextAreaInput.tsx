"use client";

interface TextAreaInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  placeholder?: string;
}

export default function TextAreaInput({
  label,
  value,
  onChange,
  rows = 4,
  placeholder = "",
}: TextAreaInputProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700">
        {label}
      </label>

      <textarea
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full
          rounded-xl
          border
          border-gray-300
          bg-white
          px-4
          py-3
          text-gray-800
          outline-none
          transition-all
          duration-200
          focus:border-blue-500
          focus:ring-4
          focus:ring-blue-100
        "
      />
    </div>
  );
}