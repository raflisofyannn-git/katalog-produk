import { db } from "@/lib/firebase";
import {
  push,
  ref,
  set,
  get,
  update,
  remove,
} from "firebase/database";

import { Order } from "@/types/order";


// =========================
// Generate Nomor Order
// =========================

export async function generateOrderNumber() {
  const now = new Date();

  const yyyy = now.getFullYear();

  const mm = String(now.getMonth() + 1).padStart(2, "0");

  const dd = String(now.getDate()).padStart(2, "0");

  const date = `${yyyy}${mm}${dd}`;

  const snapshot = await get(ref(db, "orders"));

  let count = 1;

  if (snapshot.exists()) {
    count = Object.keys(snapshot.val()).length + 1;
  }

  return `PO-${date}-${String(count).padStart(4, "0")}`;
}

// =========================
// Tambah Order
// =========================

export async function addOrder(order: Order) {
  const orderRef = push(ref(db, "orders"));

  await set(orderRef, order);

  return orderRef.key;
}

// =========================
// Ambil Semua Order
// =========================

export async function getOrders() {
  const snapshot = await get(ref(db, "orders"));

  if (!snapshot.exists()) return [];

  const data = snapshot.val();


return Object.entries(data)
  .map(([id, value]) => ({
    id,
    ...(value as Omit<Order, "id">),
  }))
  .sort(
    (a, b) => b.createdAt - a.createdAt
  );
}

// =========================
// Update Status
// =========================

export async function updateOrder(
  id: string,
  order: Partial<Order>
) {
  await update(ref(db, `orders/${id}`), order);
}

// =========================
// Hapus Order
// =========================

export async function deleteOrder(id: string) {
  await remove(ref(db, `orders/${id}`));
}

// =========================
// Ambil 1 Order
// =========================

export async function getOrderById(id: string) {
  const snapshot = await get(ref(db, `orders/${id}`));

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id,
    ...snapshot.val(),
  };
}

// =========================
// Cari Order berdasarkan Nomor PO
// =========================

export async function getOrderByNumber(
  orderNumber: string
) {
  const snapshot = await get(ref(db, "orders"));

  if (!snapshot.exists()) return null;

  const data = snapshot.val();

  const orders = Object.entries(data).map(([id, value]) => ({
    id,
    ...(value as Omit<Order, "id">),
  }));

  return (
    orders.find(
      (order) =>
        order.orderNumber.toLowerCase() ===
        orderNumber.toLowerCase()
    ) || null
  );
}