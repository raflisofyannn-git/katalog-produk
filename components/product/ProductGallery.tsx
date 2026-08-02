"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ZoomIn } from "lucide-react";
import ImageViewer from "./ImageViewer";

interface Props {
  images: string[];
}

export default function ProductGallery({
  images,
}: Props) {

  const displayImages =
    images && images.length > 0
      ? images
      : ["/placeholder.png"];

  const [selected, setSelected] = useState(displayImages[0]);

  const [viewerOpen, setViewerOpen] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setSelected(displayImages[0]);
    setCurrentIndex(0);
  }, [images]);

  return (
    <div className="space-y-5">

      {/* Main Image */}

      <div
        onClick={() => setViewerOpen(true)}
        className="group relative aspect-square cursor-zoom-in overflow-hidden rounded-3xl border border-gray-200 bg-gradient-to-br from-slate-50 to-white shadow-sm"
      >

        <Image
          src={selected}
          alt="Produk"
          fill
          priority
          sizes="(max-width:768px)100vw,600px"
          className="object-cover transition duration-500 group-hover:scale-110"
        />

        {/* Overlay */}

        <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />

        {/* Zoom */}

        <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full bg-white/90 px-3 py-2 text-sm font-medium shadow">

          <ZoomIn size={18} />

          Perbesar

        </div>

        {/* Counter */}

        {displayImages.length > 1 && (
          <div className="absolute bottom-4 right-4 rounded-full bg-black/70 px-3 py-1 text-sm text-white">

            {currentIndex + 1} / {displayImages.length}

          </div>
        )}

      </div>

      {/* Thumbnail */}

      {displayImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">

          {displayImages.map((img, index) => (

            <button
              key={index}
              onClick={() => {
                setSelected(img);
                setCurrentIndex(index);
              }}
              className={`relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border-2 transition-all duration-300

              ${
                selected === img
                  ? "scale-105 border-blue-600 shadow-lg"
                  : "border-gray-200 hover:border-blue-300"
              }`}
            >

              <Image
                src={img}
                alt={`Thumbnail ${index + 1}`}
                fill
                sizes="96px"
                className="object-cover"
              />

            </button>

          ))}

        </div>
      )}

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