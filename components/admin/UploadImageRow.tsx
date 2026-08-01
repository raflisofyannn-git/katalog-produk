"use client";

import { useState } from "react";
import Image from "next/image";

import ImageUpload from "@/components/ui/ImageUpload";

import { Product } from "@/types/product";

import { updateProduct } from "@/services/productService";

import { toast } from "sonner";

interface Props {
  product: Product;
}

export default function UploadImageRow({
  product,
}: Props) {

  const [images, setImages] = useState<string[]>(
    product.images || []
  );

  const [saving, setSaving] = useState(false);

  async function handleSave(urls: string[]) {

    setImages(urls);

    try {

      setSaving(true);

      await updateProduct(product.id, {

        name: product.name,

        category: product.category,

        description: product.description,

        price: product.price,

        images: urls,

      });

      toast.success(
        "Foto berhasil diperbarui."
      );

    } catch (error) {

      console.error(error);

      toast.error(
        "Gagal menyimpan foto."
      );

    } finally {

      setSaving(false);

    }

  }

  return (

    <div className="flex items-center gap-6 rounded-2xl border bg-white p-6 shadow-sm">

      {/* Thumbnail */}

      <div className="relative h-24 w-24 overflow-hidden rounded-xl border">

        <Image
          src={images?.[0] || "/placeholder.png"}
          alt={product.name}
          fill
          sizes="96px"
          className="object-cover"
        />

      </div>

      {/* Informasi */}

      <div className="flex-1">

        <h3 className="text-lg font-bold">
          {product.name}
        </h3>

        <p className="text-gray-500">
          {product.category}
        </p>

        <p className="mt-1 text-sm">

          {images.length > 0
            ? `${images.length} gambar`
            : "Belum ada gambar"}

        </p>

      </div>

      {/* Upload */}

      <div className="w-[350px]">

        <ImageUpload
          value={images}
          onChange={handleSave}
        />

      </div>

    </div>

  );

}