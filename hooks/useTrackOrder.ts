"use client";

import { useState } from "react";
import { getOrderByNumber } from "@/services/orderService";
import type { Order } from "@/types/order";

export function useTrackOrder() {
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);

  async function search(orderNumber: string) {
    if (!orderNumber.trim()) {
      setOrder(null);
      return;
    }

    try {
      setLoading(true);

      const result = await getOrderByNumber(orderNumber);

      setOrder(result);
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    order,
    search,
  };
}