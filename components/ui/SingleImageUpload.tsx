"use client";

import { useState } from "react";

interface Props {
  value: string;
  onChange: (url: string) => void;
}

export default function SingleImageUpload({
  value,
  onChange,
}: Props) {

  const [uploading, setUploading] = useState(false);

  async function handleUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {

    const file = e.target.files?.[0];

    if (!file) return;

    try {

      setUploading(true);

      const formData = new FormData();

      formData.append(
        "file",
        file
      );

      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
      );


      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );


      const data = await res.json();


      if (!data.secure_url) {
        throw new Error(
          "Upload gagal"
        );
      }


      onChange(
        data.secure_url
      );


    } catch (error) {

      console.error(error);

      alert(
        "Upload gambar gagal"
      );

    } finally {

      setUploading(false);

    }

  }


  return (
    <div className="space-y-4">

      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="w-full rounded-xl border p-3"
      />


      {uploading && (
        <p className="text-sm text-gray-500">
          Uploading...
        </p>
      )}


      {value && (
        <img
          src={value}
          alt="preview"
          className="h-40 w-40 rounded-xl object-cover"
        />
      )}

    </div>
  );
}