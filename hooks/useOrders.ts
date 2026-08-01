"use client";

import { useEffect, useState } from "react";

import { getOrders } from "@/services/orderService";

import { Order } from "@/types/order";

export function useOrders() {

  const [orders, setOrders] =
    useState<(Order & { id: string })[]>([]);

  const [loading, setLoading] =
    useState(true);

  async function refreshOrders() {

    try {

      const data = await getOrders();

      setOrders(
        data as (Order & { id: string })[]
      );

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  }

  useEffect(() => {

    refreshOrders();

  }, []);

  return {

    orders,

    setOrders,

    refreshOrders,

    loading,

  };

}