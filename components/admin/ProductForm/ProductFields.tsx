interface Props {
  name: string;
  price: string;
  category: string;
  description: string;

  setName: (value: string) => void;
  setPrice: (value: string) => void;
  setCategory: (value: string) => void;
  setDescription: (value: string) => void;
}

export default function ProductFields({
  name,
  price,
  category,
  description,
  setName,
  setPrice,
  setCategory,
  setDescription,
}: Props) {
  return (
    <>
      <input
        className="w-full rounded-lg border p-3"
        placeholder="Nama Produk"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="w-full rounded-lg border p-3"
        type="number"
        placeholder="Harga"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <input
        className="w-full rounded-lg border p-3"
        placeholder="Kategori"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <textarea
        className="w-full rounded-lg border p-3"
        rows={5}
        placeholder="Deskripsi"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </>
  );
}