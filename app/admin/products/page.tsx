"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import { useProducts } from "@/hooks/useProducts";
import { deleteProduct } from "@/services/productService";
import { formatCurrency } from "@/utils/formatCurrency";
import { Product } from "@/types/product";

export default function AdminProductsPage() {
  const { products, loading } = useProducts();

  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  async function handleDelete(product: Product) {
    const confirmDelete = window.confirm(
      `Hapus produk "${product.name}"?`
    );

    if (!confirmDelete) return;

    try {
      await deleteProduct(product.id);
      toast.success("Produk berhasil dihapus.");
      window.location.reload();
    } catch (err) {
      console.error(err);
      toast.error("Gagal menghapus produk.");
    }
  }

  if (loading) {
    return (
      <main className="p-8">
        Memuat Produk...
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">Produk</h1>

          <p className="mt-2 text-gray-500">
            Kelola seluruh produk
          </p>
        </div>

        <Link
          href="/admin/products/add"
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
        >
          <Plus size={20} />
          Tambah Produk
        </Link>
      </div>

      <input
        className="mb-8 w-full rounded-xl border p-4"
        placeholder="Cari produk..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 text-left">Produk</th>
              <th className="text-left">Kategori</th>
              <th className="text-left">Harga</th>
              <th className="text-center">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="p-8 text-center text-gray-500"
                >
                  Belum ada produk.
                </td>
              </tr>
            ) : (
              filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="border-t hover:bg-slate-50"
                >
                  <td className="p-4">
                    <div className="font-semibold">
                      {product.name}
                    </div>
                  </td>

                  <td>{product.category}</td>

                  <td>
                    {formatCurrency(product.price)}
                  </td>

                  <td>
                    <div className="flex justify-center gap-3">
                      <Link
                        href={`/admin/products/${product.id}`}
                        className="rounded-lg bg-yellow-500 px-4 py-2 text-sm font-semibold text-white hover:bg-yellow-600"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => handleDelete(product)}
                        className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}