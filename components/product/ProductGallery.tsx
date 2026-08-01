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

  // Jika tidak ada gambar gunakan placeholder
  const displayImages =
    images && images.length > 0
      ? images
      : ["/placeholder.png"];

  const [selected, setSelected] = useState(
    displayImages[0]
  );

  const [viewerOpen, setViewerOpen] =
    useState(false);

  const [currentIndex, setCurrentIndex] =
    useState(0);

  useEffect(() => {

    setSelected(displayImages[0]);

    setCurrentIndex(0);

  }, [images]);

  return (

    <div className="space-y-4">

      {/* Gambar Utama */}

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
        priority
        loading="eager"
        sizes="(max-width:768px)100vw,600px"
        className="object-cover transition-transform duration-500 hover:scale-110"
      />

      </div>

      {/* Thumbnail */}

      {displayImages.length > 1 && (

        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">

          {displayImages.map((img, index) => (

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
                alt={`Thumbnail ${index + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />

            </button>

          ))}

        </div>

      )}

      {/* Image Viewer */}

      <ImageViewer
        open={viewerOpen}
        images={displayImages}
        current={currentIndex}
        onClose={() => setViewerOpen(false)}
        onPrev={() => {

          const next =
            currentIndex === 0
              ? displayImages.length - 1
              : currentIndex - 1;

          setCurrentIndex(next);

          setSelected(displayImages[next]);

        }}
        onNext={() => {

          const next =
            currentIndex === displayImages.length - 1
              ? 0
              : currentIndex + 1;

          setCurrentIndex(next);

          setSelected(displayImages[next]);

        }}
      />

    </div>

  );

}