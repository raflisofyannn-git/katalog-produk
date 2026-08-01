export const MAX_IMAGE = 5;

export const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

export function validateImage(file: File) {
  if (!file.type.startsWith("image/")) {
    throw new Error("File harus berupa gambar.");
  }

  if (file.size > MAX_SIZE) {
    throw new Error("Ukuran gambar maksimal 5 MB.");
  }
}

export function validateImages(files: File[]) {
  if (files.length > MAX_IMAGE) {
    throw new Error(
      `Maksimal upload ${MAX_IMAGE} gambar.`
    );
  }

  files.forEach(validateImage);
}