"use client";

import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  open: boolean;
  images: string[];
  current: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function ImageViewer({
  open,
  images,
  current,
  onClose,
  onPrev,
  onNext,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">

      <button
        onClick={onClose}
        className="absolute right-5 top-5 text-white"
      >
        <X size={34} />
      </button>

      <button
        onClick={onPrev}
        className="absolute left-5 text-white"
      >
        <ChevronLeft size={40} />
      </button>

      <div className="relative h-[80vh] w-[90vw]">

        <Image
          src={images[current]}
          alt=""
          fill
          sizes="90vw"
          className="object-contain"
        />

      </div>

      <button
        onClick={onNext}
        className="absolute right-5 text-white"
      >
        <ChevronRight size={40} />
      </button>

    </div>
  );
}