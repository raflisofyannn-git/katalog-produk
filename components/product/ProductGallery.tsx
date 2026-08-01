"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ImageViewer from "./ImageViewer";

interface Props {
  images: string[];
}

export default function ProductGallery({
  images,
}: Props) {
  const [selected, setSelected] = useState("");
  const [viewerOpen, setViewerOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
  if (images.length > 0) {
      setSelected(images[0]);
      setCurrentIndex(0);
    }
  }, [images]);

  if (images.length === 0) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-xl border bg-slate-100">
        Tidak ada gambar
      </div>
    );
  }

  return (
    <div className="space-y-4">

      {/* Gambar utama */}
      <div
        className="
        relative
        aspect-square
        overflow-hidden
        rounded-3xl
        border
        border-gray-200
        bg-slate-50
        shadow-sm
        cursor-zoom-in
        "
        onClick={() => setViewerOpen(true)}
      >

        <Image
          src={selected}
          alt="Produk"
          fill
          sizes="(max-width:768px) 100vw, 600px"
          className="
          object-cover
          transition-transform
          duration-500
          hover:scale-110
          "
        />

      </div>

      {/* Thumbnail */}
      <div className="
      flex
      gap-3
      overflow-x-auto
      pb-2
      scrollbar-hide
      ">

        {images.map((img, index) => (

          <button
            key={index}
            onClick={() => {
              setSelected(img);
              setCurrentIndex(index);
            }}
            className={`
            relative
            h-20
            w-20
            shrink-0
            overflow-hidden
            rounded-2xl
            border-2
            bg-white
            shadow-sm
            transition-all
            duration-300

            ${
            selected === img
            ? "border-blue-600 scale-105"
            : "border-gray-200 hover:border-blue-300"
            }
            `}
          >

            <Image
              src={img}
              alt=""
              fill
              sizes="80px"
              className="object-cover"
            />

          </button>

        ))}

      </div>
                <ImageViewer
          open={viewerOpen}
          images={images}
          current={currentIndex}
          onClose={() => setViewerOpen(false)}
          onPrev={() => {
            const next =
              currentIndex === 0
                ? images.length - 1
                : currentIndex - 1;

            setCurrentIndex(next);
            setSelected(images[next]);
          }}
          onNext={() => {
            const next =
              currentIndex === images.length - 1
                ? 0
                : currentIndex + 1;

            setCurrentIndex(next);
            setSelected(images[next]);
          }}
        />
    </div>
  );
}