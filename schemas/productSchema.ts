import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(3, "Nama produk minimal 3 karakter"),

  price: z
    .number({
      error: "Harga wajib diisi",
    })
    .positive("Harga harus lebih dari 0"),

  category: z
    .string()
    .min(1, "Kategori wajib diisi"),

  description: z
    .string()
    .optional(),
});

export type ProductFormData = z.infer<
  typeof productSchema
>;