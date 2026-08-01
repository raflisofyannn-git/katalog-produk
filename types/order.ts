export interface OrderItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  images: string[];
}

export type OrderStatus =
  | "Pending"
  | "Ordered"
  | "Arrived"
  | "Completed";

export interface Order {
  id?: string;

  orderNumber: string;

  customerName: string;
  customerPhone: string;

  total: number;

  status: OrderStatus;

  createdAt: number;

  items: OrderItem[];
}