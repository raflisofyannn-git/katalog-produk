interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ProductImageUpload({
  onChange,
}: Props) {
  return (
    <div>
      <label className="font-semibold">
        Gambar Produk (maksimal 5)
      </label>

      <input
        className="mt-2 w-full rounded-lg border p-3"
        type="file"
        accept="image/*"
        multiple
        onChange={onChange}
      />
    </div>
  );
}