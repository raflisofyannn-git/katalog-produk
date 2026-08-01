"use client";

interface Props {
  loading: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export default function LoadingButton({
  loading,
  onClick,
  children,
  className = "",
  type = "button",
}: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className={`
        flex items-center justify-center gap-2
        rounded-xl bg-blue-600
        px-8 py-3
        font-semibold text-white
        transition
        hover:bg-blue-700
        disabled:cursor-not-allowed
        disabled:bg-gray-400
        ${className}
      `}
    >
      {loading && (
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
      )}

      {loading ? "Mohon tunggu..." : children}
    </button>
  );
}