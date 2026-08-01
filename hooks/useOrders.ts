"use client";

import { useEffect, useState } from "react";
import { getOrders } from "@/services/orderService";
import { Order } from "@/types/order";

export function useOrders() {
  const [orders, setOrders] = useState<(Order & { id: string })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getOrders();
        setOrders(data as (Order & { id: string })[]);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return {
    orders,
    loading,
  };
}