"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Upload, Loader2, X } from "lucide-react";
import { toast } from "sonner";

interface Props {
  value: string;
  onChange: (url: string) => void;
}

export default function ImageUpload({
  value,
  onChange,
}: Props) {
  const inputRef =
    useRef<HTMLInputElement>(null);

  const [uploading, setUploading] =
    useState(false);

  async function uploadFile(file: File) {

    if (!file.type.startsWith("image/")) {
      toast.error(
        "File harus berupa gambar."
      );
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error(
        "Ukuran maksimal 5 MB."
      );
      return;
    }

    try {

      setUploading(true);

      const formData = new FormData();

      formData.append("file", file);

      formData.append(
        "upload_preset",
        process.env
          .NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
      );

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${
          process.env
            .NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
        }/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error?.message ??
            "Upload gagal."
        );
      }

      onChange(data.secure_url);

      toast.success(
        "Upload berhasil."
      );

    } catch (err) {

      console.error(err);

      toast.error(
        "Upload gagal."
      );

    } finally {

      setUploading(false);

    }

  }

  async function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {

    const file = e.target.files?.[0];

    if (!file) return;

    await uploadFile(file);

  }
    function removeImage() {

    onChange("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }

  }

  return (

    <div className="space-y-4">

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleChange}
      />

      {!value ? (

        <button
          type="button"
          disabled={uploading}
          onClick={() =>
            inputRef.current?.click()
          }
          className="flex h-56 w-full flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-blue-300 bg-slate-50 transition hover:bg-blue-50 disabled:cursor-not-allowed"
        >

          {uploading ? (

            <>

              <Loader2
                className="animate-spin text-blue-600"
                size={40}
              />

              <p className="font-semibold">
                Uploading...
              </p>

            </>

          ) : (

            <>

              <Upload
                size={42}
                className="text-blue-600"
              />

              <div className="text-center">

                <p className="font-semibold">

                  Klik untuk upload gambar

                </p>

                <p className="mt-1 text-sm text-gray-500">

                  JPG, PNG, WEBP

                </p>

                <p className="text-sm text-gray-500">

                  Maksimal 5 MB

                </p>

              </div>

            </>

          )}

        </button>

      ) : (

        <div className="relative overflow-hidden rounded-2xl border">

          <Image
            src={value}
            alt="Preview"
            width={800}
            height={600}
            className="h-72 w-full object-cover"
          />

          <button
            type="button"
            onClick={removeImage}
            className="absolute right-3 top-3 rounded-full bg-red-600 p-2 text-white transition hover:bg-red-700"
          >

            <X size={18} />

          </button>

        </div>

      )}

    </div>

  );

}