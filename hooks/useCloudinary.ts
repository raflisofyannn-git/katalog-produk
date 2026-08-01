"use client";

import { useState } from "react";

import { uploadImages } from "@/services/uploadService";
import { validateImages } from "@/utils/cloudinary";

export function useCloudinary() {
  const [loading, setLoading] = useState(false);

  const [progress, setProgress] = useState(0);

  async function upload(files: File[]) {
    try {
      setLoading(true);
      setProgress(10);

      validateImages(files);

      setProgress(30);

      const urls = await uploadImages(files);

      setProgress(100);

      return urls;

    } finally {

      setTimeout(() => {
        setProgress(0);
        setLoading(false);
      }, 300);
    }
  }

  return {
    upload,
    loading,
    progress,
  };
}