import axios from "axios";

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_UPLOAD_PRESET;

export async function uploadImage(file: File): Promise<string> {

  if (!CLOUD_NAME) {
    throw new Error("Cloudinary Cloud Name belum diset.");
  }

  if (!UPLOAD_PRESET) {
    throw new Error("Upload Preset belum diset.");
  }

  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

  try {

    const response = await axios.post(url, formData);

    return response.data.secure_url;

  } catch (error) {

    console.error("Upload Cloudinary gagal :", error);

    throw new Error("Upload gambar gagal.");

  }

}