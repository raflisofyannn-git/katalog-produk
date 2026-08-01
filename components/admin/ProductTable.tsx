"use client";

import Image from "next/image";
import { ProductData } from "@/services/productService";

interface Product extends ProductData {
  id: string;
}

interface Props {
  products: Product[];
  onDelete: (id: string) => void;
  onEdit: (product: Product) => void;
}

export default function ProductTable({
  products,
  onDelete,
  onEdit,
}: Props) {

  if (products.length === 0) {
    return (
      <div className="mt-8 rounded-xl border p-8 text-center text-gray-500">
        Belum ada produk.
      </div>
    );
  }

  return (
    <div className="mt-8 overflow-x-auto rounded-xl border">

      <table className="min-w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="p-4 text-left">Foto</th>

            <th className="text-left">Nama</th>

            <th className="text-left">Harga</th>

            <th className="text-left">Kategori</th>

            <th className="text-center">Aksi</th>

          </tr>

        </thead>

        <tbody>

          {products.map((product) => (

            <tr
              key={product.id}
              className="border-t"
            >

              <td className="p-3">

                <div className="relative h-20 w-20 overflow-hidden rounded-lg border">

                  {product.images?.length ? (

                    <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        sizes="80px"
                        className="rounded-lg object-cover"
                        />

                  ) : (

                    <div className="flex h-full items-center justify-center text-xs text-gray-400">

                      Tidak ada gambar

                    </div>

                  )}

                </div>

              </td>

              <td>{product.name}</td>

              <td>

                Rp{" "}

                {product.price.toLocaleString("id-ID")}

              </td>

              <td>{product.category}</td>

              <td>

                <div className="flex justify-center gap-2">

                  <button
                    onClick={() => onEdit(product)}
                    className="rounded-lg bg-yellow-500 px-3 py-2 text-white hover:bg-yellow-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(product.id)}
                    className="rounded-lg bg-red-600 px-3 py-2 text-white hover:bg-red-700"
                  >
                    Hapus
                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}