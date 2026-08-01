import { db } from "@/lib/firebase";

import {
  push,
  ref,
  set,
  get,
  update,
  remove,
} from "firebase/database";

import { Product } from "@/types/product";

export type ProductData = Omit<Product, "id">;

// =========================
// Tambah Produk
// =========================
export async function addProduct(product: ProductData) {

  const productRef = push(ref(db, "products"));

  await set(productRef, product);

  return productRef.key;

}

// =========================
// Semua Produk
// =========================
export async function getProducts(): Promise<Product[]> {

  const snapshot = await get(ref(db, "products"));

  if (!snapshot.exists()) return [];

  const data = snapshot.val();

  return Object.entries(data).map(([id, value]) => ({
    id,
    ...(value as ProductData),
  }));

}

// =========================
// Satu Produk
// =========================
export async function getProductById(id: string) {

  const snapshot = await get(
    ref(db, `products/${id}`)
  );

  if (!snapshot.exists()) return null;

  return {
    id,
    ...snapshot.val(),
  } as Product;

}

// =========================
// Update
// =========================
export async function updateProduct(
  id: string,
  product: ProductData
) {

  await update(
    ref(db, `products/${id}`),
    product
  );

}



// =========================
// Hapus
// =========================
export async function deleteProduct(id: string) {

  await remove(
    ref(db, `products/${id}`)
  );

}