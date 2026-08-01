"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import {
  getProductById,
  updateProduct,
  ProductData,
} from "@/services/productService";

import LoadingButton from "@/components/ui/LoadingButton";

import { toast } from "sonner";
export default function EditProductPage() {

  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] =
    useState<ProductData | null>(null);

  useEffect(() => {

    async function load() {

      try {

        const product =
          await getProductById(id);

        if (product) {

          setForm({
            name: product.name,
            description: product.description,
            category: product.category,
            price: product.price,
            images: product.images,
          });

        }

      } finally {

        setLoading(false);

      }

    }

    load();

  }, [id]);

  async function handleSave() {

    if (!form) return;

    try {

      setSaving(true);

      await updateProduct(id, form);

      toast.success("Produk berhasil diperbarui.");

      router.push("/admin/products");

    } catch (err) {

      console.error(err);

      toast.error("Gagal memperbarui produk.");

    } finally {

      setSaving(false);

    }

  }

  if (loading || !form) {

    return (
      <main className="p-8">
        Memuat Produk...
      </main>
    );

  }

  return (

    <main className="mx-auto max-w-4xl p-8">

      <h1 className="mb-2 text-4xl font-bold">
        Edit Produk
      </h1>

      <p className="mb-8 text-gray-500">
        Perbarui informasi produk.
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

        {/* URL Gambar */}

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
            className="w-full rounded-xl border p-3"
          />

        </div>

        <div className="flex gap-4 pt-4">

          <LoadingButton
            loading={saving}
            onClick={handleSave}
          >
            Simpan Perubahan
          </LoadingButton>

          <button
            onClick={() =>
              router.push("/admin/products")
            }
            className="rounded-xl border px-6 py-3 font-semibold hover:bg-gray-100"
          >
            Batal
          </button>

        </div>

      </div>

    </main>

  );

}