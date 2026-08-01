"use client";

interface Props {
  loading: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export default function LoadingButton({
  loading,
  onClick,
  children,
}: Props) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="
        flex items-center justify-center gap-2
        rounded-xl bg-blue-600
        px-8 py-3
        text-white font-semibold
        hover:bg-blue-700
        disabled:bg-gray-400
        disabled:cursor-not-allowed
        transition
      "
    >
      {loading && (
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
      )}

      {loading ? "Mohon tunggu..." : children}
    </button>
  );
}