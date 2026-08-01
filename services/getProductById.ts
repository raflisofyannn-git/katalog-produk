import { db } from "@/lib/firebase";
import { get, ref } from "firebase/database";

export async function getProductById(id: string) {

  const snapshot = await get(
    ref(db, `products/${id}`)
  );

  if (!snapshot.exists()) return null;

  return {
    id,
    ...snapshot.val(),
  };

}