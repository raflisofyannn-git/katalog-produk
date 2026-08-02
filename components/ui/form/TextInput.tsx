"use client";

interface TextInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}

export default function TextInput({
  label,
  value,
  onChange,
  placeholder = "",
  type = "text",
  required = false,
}: TextInputProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700">
        {label}
        {required && (
          <span className="ml-1 text-red-500">*</span>
        )}
      </label>

      <input
        type={type}
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