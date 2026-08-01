"use client";

import { useEffect, useState } from "react";
import { getOrders } from "@/services/orderService";

interface BestProduct {
  id: string;
  name: string;
  qty: number;
}

export function useBestProducts() {
  const [products, setProducts] = useState<BestProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const orders = await getOrders();

      const map = new Map<string, BestProduct>();

      orders.forEach((order) => {
        order.items.forEach((item) => {
          const exist = map.get(item.id);

          if (exist) {
            exist.qty += item.qty;
          } else {
            map.set(item.id, {
              id: item.id,
              name: item.name,
              qty: item.qty,
            });
          }
        });
      });

      const result = Array.from(map.values())
        .sort((a, b) => b.qty - a.qty)
        .slice(0, 5);

      setProducts(result);
    } finally {
      setLoading(false);
    }
  }

  return {
    products,
    loading,
  };
}