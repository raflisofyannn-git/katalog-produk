"use client";

import { useState } from "react";
import Image from "next/image";

interface Props {
  value: string[];
  onChange: (urls: string[]) => void;
}

export default function ImageUpload({
  value,
  onChange,
}: Props) {

  const [uploading, setUploading] = useState(false);


  async function handleUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {

    const files = e.target.files;

    if (!files) return;


    // Maksimal 5 gambar
    if (value.length + files.length > 5) {

      alert("Maksimal 5 gambar produk.");

      return;

    }


    try {

      setUploading(true);


      const uploadedUrls: string[] = [];


      for (const file of Array.from(files)) {


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


        uploadedUrls.push(
          data.secure_url
        );

      }


      onChange([
        ...value,
        ...uploadedUrls,
      ]);


    } catch (error) {

      console.error(error);

      alert(
        "Upload gambar gagal"
      );


    } finally {

      setUploading(false);

    }

  }



  function removeImage(index:number){

    const newImages =
      value.filter(
        (_,i)=> i !== index
      );

    onChange(newImages);

  }



  return (

    <div className="space-y-4">


      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleUpload}
        className="w-full rounded-xl border p-3"
      />


      {uploading && (

        <p className="text-sm text-gray-500">
          Upload gambar...
        </p>

      )}



      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">

        {value.map((url,index)=>(

          <div
            key={index}
            className="relative"
          >

            <div className="relative h-28 w-full">

              <Image
                src={url}
                alt={`gambar ${index+1}`}
                fill
                className="rounded-xl object-cover"
              />

            </div>


            <button type="button"
              onClick={() =>
                removeImage(index)
              }
              className="mt-2 w-full rounded-lg bg-red-600 py-1 text-sm text-white"
            >
              Hapus
            </button>


          </div>

        ))}

      </div>


      <p className="text-sm text-gray-500">
        {value.length}/5 gambar
      </p>


    </div>

  );

}