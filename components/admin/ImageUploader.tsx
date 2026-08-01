"use client";

import { useRef } from "react";
import Image from "next/image";
import { Upload, X } from "lucide-react";
import { toast } from "sonner";

interface Props {
  files: File[];
  previews: string[];

  onChange: (files: File[]) => void;

  loading?: boolean;
  progress?: number;
}

export default function ImageUploader({
  files,
  previews,
  onChange,
  loading = false,
  progress = 0,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFiles(selectedFiles: FileList | null) {
    if (!selectedFiles) return;

    const newFiles = Array.from(selectedFiles);

    const merged = [...files, ...newFiles];

    if (merged.length > 5) {
      toast.warning("Maksimal 5 gambar.");
      return;
    }

    onChange(merged);
  }

  function removeImage(index: number) {
    const updated = files.filter(
      (_, i) => i !== index
    );

    onChange(updated);
  }

  return (
    <div className="space-y-4">

      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFiles(e.dataTransfer.files);
        }}
        className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 p-10 text-center hover:border-blue-500">
        <Upload className="mb-3 h-10 w-10" />

        <p className="font-medium">
          Klik atau Drag & Drop gambar
        </p>

        <p className="text-sm text-slate-500">
          Maksimal 5 gambar
        </p>

        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*"
          hidden
          onChange={(e) =>
            handleFiles(e.target.files)
          }
        />
      </div>

      {loading && (
        <div className="space-y-2">

          <div className="h-3 overflow-hidden rounded bg-slate-200">

            <div
              className="h-full bg-blue-600 transition-all"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

          <p className="text-sm text-slate-500">
            Uploading... {progress}%
          </p>

        </div>
      )}

      {previews.length > 0 && (

        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">

          {previews.map((preview, index) => (

            <div
              key={index}
              className="relative overflow-hidden rounded-xl border"
            >

              <div className="relative h-32 w-full">

                <Image
                  src={preview}
                  alt="Preview"
                  fill
                  sizes="200px"
                  className="object-cover"
                />

              </div>

              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white">
                <X size={14} />
              </button>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}