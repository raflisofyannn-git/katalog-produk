"use client";

import { useState } from "react";
import Image from "next/image";

interface Props {
  value?: string;
  onChange: (url: string) => void;
}

export default function ImageUpload({
  value,
  onChange,
}: Props) {

  const [uploading, setUploading] =
    useState(false);


  async function handleUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {

    const file =
      e.target.files?.[0];

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
        process.env
          .NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
      );


      const response =
        await fetch(
          `https://api.cloudinary.com/v1_1/${
            process.env
              .NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
          }/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );


      const data =
        await response.json();


      if (!data.secure_url) {

        throw new Error(
          "Upload Cloudinary gagal"
        );

      }


      onChange(
        data.secure_url
      );


    } catch (error) {

      console.error(
        error
      );

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
        className="
          w-full
          rounded-xl
          border
          p-3
        "
      />


      {uploading && (

        <p className="text-sm text-gray-500">
          Upload gambar...
        </p>

      )}


      {value && (

        <div className="relative h-48 w-48">

          <Image
            src={value}
            alt="Preview"
            fill
            className="rounded-xl object-cover"
          />

        </div>

      )}


    </div>

  );

}