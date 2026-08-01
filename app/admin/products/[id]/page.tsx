"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { X } from "lucide-react";


import ImageUpload from "@/components/ui/ImageUpload";
import LoadingButton from "@/components/ui/LoadingButton";

import {
  getProductById,
  updateProduct,
  ProductData,
} from "@/services/productService";

import { toast } from "sonner";


export default function EditProductPage() {

  const params = useParams();
  
  const id = params.id as string;
  const router = useRouter();

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);


  const [form, setForm] =
    useState<ProductData | null>(null);



  useEffect(() => {

    async function loadProduct() {

      try {

        const product =
          await getProductById(id);


        if (product) {

          setForm({

            name: product.name,

            description:
              product.description,

            category:
              product.category,

            price:
              product.price,

            images:
              product.images,

          });

        }

      } catch (error) {

        console.error(error);

        toast.error(
          "Gagal mengambil data produk."
        );

      } finally {

        setLoading(false);

      }

    }


    if (id) {
      loadProduct();
    }


  }, [id]);



  async function handleSave() {


    if (!form) return;



    if (!form.name.trim()) {

      toast.error(
        "Nama produk wajib diisi."
      );

      return;

    }



    if (!form.category.trim()) {

      toast.error(
        "Kategori wajib diisi."
      );

      return;

    }



    if (form.price <= 0) {

      toast.error(
        "Harga tidak valid."
      );

      return;

    }



    if (!form.images[0]) { toast.error("Silakan upload gambar produk."); return; }



    try {


      setSaving(true);



      await updateProduct(
        id,
        form
      );



      toast.success(
        "Produk berhasil diperbarui."
      );



      router.push(
        "/admin/products"
      );


    } catch (error) {


      console.error(error);


      toast.error(
        "Gagal memperbarui produk."
      );


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



        <div>

          <label className="mb-3 block font-semibold">
            Foto Produk
          </label>


          <ImageUpload
          value={form.images}
          onChange={(urls) =>
            setForm({
              ...form,
              images: urls,
            })
          }
        />

        </div>



        <div className="flex gap-4 pt-4">


          <LoadingButton
            loading={saving}
            onClick={handleSave}
            className="flex-1"
          >
            Simpan Perubahan
          </LoadingButton>



          <button
            type="button"
            onClick={() =>
              router.push("/admin/products")
            }
            className="rounded-xl border px-8 py-3 font-semibold transition hover:bg-gray-100">
            Batal
          </button>


        </div>


      </div>


    </main>

  );

}