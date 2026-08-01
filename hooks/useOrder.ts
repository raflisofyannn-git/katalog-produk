"use client";

import { useEffect, useState } from "react";
import { getOrderById } from "@/services/orderService";
import { Order } from "@/types/order";

export function useOrder(id: string) {
  const [order, setOrder] = useState<(Order & { id: string }) | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getOrderById(id);

        setOrder(data as Order & { id: string });
      } finally {
        setLoading(false);
      }
    }

    if (id) load();
  }, [id]);

  return {
    order,
    loading,
  };
}