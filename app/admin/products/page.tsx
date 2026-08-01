"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import {
  Plus,
  Upload,
  ImageIcon,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { useProducts } from "@/hooks/useProducts";
import {
  deleteProduct,
} from "@/services/productService";
import { formatCurrency } from "@/utils/formatCurrency";
import { Product } from "@/types/product";

export default function AdminProductsPage() {

  const {
  products,
  setProducts,
} = useProducts();

  const [search, setSearch] =
    useState("");

  const [selectedProducts, setSelectedProducts] =
    useState<string[]>([]);

  const filteredProducts = useMemo(() => {

    return products.filter((product) =>
      product.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  }, [products, search]);

  function toggleProduct(id: string) {

    setSelectedProducts((prev) =>

      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]

    );

  }

  async function handleDelete(product: Product) {

  const confirmDelete = window.confirm(
    `Hapus produk "${product.name}"?`
  );

  if (!confirmDelete) return;

  try {

    await deleteProduct(product.id);

    setProducts((prev) =>
      prev.filter((p) => p.id !== product.id)
    );

    setSelectedProducts((prev) =>
      prev.filter((id) => id !== product.id)
    );

    toast.success(
      "Produk berhasil dihapus."
    );

  } catch (err) {

    console.error(err);

    toast.error(
      "Gagal menghapus produk."
    );

  }

}

  async function handleDeleteSelected() {

  if (selectedProducts.length === 0) return;

  const confirmDelete = window.confirm(

    `Hapus ${selectedProducts.length} produk?`

  );

  if (!confirmDelete) return;

  try {

    await Promise.all(

      selectedProducts.map((id) =>
        deleteProduct(id)
      )

    );

    setProducts((prev) =>
      prev.filter(
        (product) =>
          !selectedProducts.includes(product.id)
      )
    );

    setSelectedProducts([]);

    toast.success(

      "Produk berhasil dihapus."

    );

  } catch (err) {

    console.error(err);

    toast.error(

      "Gagal menghapus produk."

    );

  }

}

 return (

<main className="mx-auto max-w-7xl p-8">

  {/* HEADER */}

  <div className="mb-8 flex flex-wrap items-center justify-between gap-4">

    <div>

      <h1 className="text-4xl font-bold">
        Produk
      </h1>

      <p className="mt-2 text-gray-500">
        Kelola seluruh produk
      </p>

    </div>

    <div className="flex flex-wrap gap-3">

      <Link
        href="/admin/products/import"
        className="flex items-center gap-2 rounded-xl border px-5 py-3 font-semibold transition hover:bg-gray-100"
      >

        <Upload size={20} />

        Import Excel

      </Link>

      <Link
        href="/admin/products/upload"
        className="flex items-center gap-2 rounded-xl border px-5 py-3 font-semibold transition hover:bg-gray-100"
      >

        <ImageIcon size={20} />

        Upload Gambar

      </Link>

      <Link
        href="/admin/products/add"
        className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
      >

        <Plus size={20} />

        Tambah Produk

      </Link>

    </div>

  </div>

  {/* TOOLBAR */}

  {selectedProducts.length > 0 && (

    <div className="mb-6 flex items-center justify-between rounded-2xl border border-red-200 bg-red-50 p-4">

      <p className="font-semibold">

        {selectedProducts.length} produk dipilih

      </p>

      <button

        onClick={handleDeleteSelected}

        className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700"

      >

        <Trash2 size={18} />

        Hapus Terpilih

      </button>

    </div>

  )}

  {/* SEARCH */}

  <input

   className="mb-8 w-full rounded-xl border p-4"

    placeholder="Cari produk..."

    value={search}

    onChange={(e)=>

      setSearch(e.target.value)

    }

  />

  {/* TABLE */}

  <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">

    <table className="w-full">

      <thead className="bg-slate-100">

        <tr>

          <th className="w-14 p-4">

            <input

              type="checkbox"

              checked={

                filteredProducts.length > 0 &&

                selectedProducts.length ===

                filteredProducts.length

              }

              onChange={(e)=>{

                if(e.target.checked){

                  setSelectedProducts(

                    filteredProducts.map(

                      p=>p.id

                    )

                  );

                }else{

                  setSelectedProducts([]);

                }

              }}

            />

          </th>

          <th className="p-4 text-left">

            Gambar

          </th>

          <th className="text-left">

            Produk

          </th>

          <th className="text-left">

            Kategori

          </th>

          <th className="text-left">

            Harga

          </th>

          <th className="text-center">

            Aksi

          </th>

        </tr>

      </thead>

      <tbody>

  {filteredProducts.length === 0 ? (

    <tr>

      <td
        colSpan={6}
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

        {/* Checkbox */}

        <td className="p-4 text-center">

          <input
            type="checkbox"
            checked={selectedProducts.includes(product.id)}
            onChange={() => toggleProduct(product.id)}
          />

        </td>

        {/* Gambar */}

        <td className="p-4">

          <Image
            src={
              product.images?.[0]
                ? product.images[0]
                : "/placeholder.png"
            }
            alt={product.name}
            width={70}
            height={70}
            className="h-16 w-16 rounded-lg object-cover"
          />

        </td>

        {/* Nama */}

        <td>

          <div className="font-semibold">

            {product.name}

          </div>

        </td>

        {/* Kategori */}

        <td>

          {product.category}

        </td>

        {/* Harga */}

        <td>

          {formatCurrency(product.price)}

        </td>

        {/* Aksi */}

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