"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { addProduct } from "@/services/productService";
import type { ProductData } from "@/services/productService";

import LoadingButton from "@/components/ui/LoadingButton";

import { toast } from "sonner";

export default function AddProductPage() {
  const router = useRouter();

  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState<ProductData>({
    name: "",
    description: "",
    category: "",
    price: 0,
    images: [""],
  });

  async function handleSave() {
    try {
      setSaving(true);

      await addProduct(form);

      toast.success("Produk berhasil ditambahkan.");

      router.push("/admin/products");
    } catch (err) {
      console.error(err);

      toast.error("Gagal menambahkan produk.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="mx-auto max-w-4xl p-8">

      <h1 className="mb-2 text-4xl font-bold">
        Tambah Produk
      </h1>

      <p className="mb-8 text-gray-500">
        Tambahkan produk baru ke katalog.
      </p>

            <div className="space-y-6 rounded-2xl border bg-white p-8 shadow">

        {/* Nama Produk */}

        <div>

          <label className="mb-2 block font-semibold">
            Nama Produk
          </label>

          <input
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
            className="w-full rounded-xl border p-3"
          />

        </div>

        {/* Harga */}

        <div>

          <label className="mb-2 block font-semibold">
            Harga
          </label>

          <input
            type="number"
            value={form.price}
            onChange={(e) =>
              setForm({
                ...form,
                price: Number(e.target.value),
              })
            }
            className="w-full rounded-xl border p-3"
          />

        </div>

        {/* Kategori */}

        <div>

          <label className="mb-2 block font-semibold">
            Kategori
          </label>

          <input
            value={form.category}
            onChange={(e) =>
              setForm({
                ...form,
                category: e.target.value,
              })
            }
            className="w-full rounded-xl border p-3"
          />

        </div>

        {/* Deskripsi */}

        <div>

          <label className="mb-2 block font-semibold">
            Deskripsi
          </label>

          <textarea
            rows={5}
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
            className="w-full rounded-xl border p-3"
          />

        </div>

        {/* Gambar */}

        <div>

          <label className="mb-2 block font-semibold">
            URL Gambar
          </label>

          <input
            value={form.images[0]}
            onChange={(e) =>
              setForm({
                ...form,
                images: [e.target.value],
              })
            }
            placeholder="https://..."
            className="w-full rounded-xl border p-3"
          />

        </div>

        <div className="pt-4">

          <LoadingButton
            loading={saving}
            onClick={handleSave}
          >
            Simpan Produk
          </LoadingButton>

        </div>

      </div>

    </main>

  );

}