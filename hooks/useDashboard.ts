"use client";

import { useEffect, useState } from "react";

import { getOrders } from "@/services/orderService";
import { getProducts } from "@/services/productService";


export function useDashboard() {
  const [loading, setLoading] = useState(true);

  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  const [pendingOrders, setPendingOrders] = useState(0);
  const [completedOrders, setCompletedOrders] = useState(0);

  const [orderedOrders, setOrderedOrders] = useState(0);
  const [arrivedOrders, setArrivedOrders] = useState(0);

  useEffect(() => {
    async function load() {
      try {
        const [products, orders] = await Promise.all([
          getProducts(),
          getOrders(),
        ]);

        setTotalProducts(products.length);
        setTotalOrders(orders.length);

        setPendingOrders(
          orders.filter((o) => o.status === "Pending").length
        );

        setCompletedOrders(
          orders.filter((o) => o.status === "Completed").length
        );

        setOrderedOrders(
          orders.filter((o) => o.status === "Ordered").length
        );

        setArrivedOrders(
          orders.filter((o) => o.status === "Arrived").length
        );

        setTotalRevenue(
          orders.reduce((sum, order) => sum + order.total, 0)
        );

        const customers = new Set(
          orders.map((order) => order.customerPhone)
        );

        setTotalCustomers(customers.size);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return {
  loading,
  totalProducts,
  totalOrders,
  totalCustomers,
  totalRevenue,

  pendingOrders,
  orderedOrders,
  arrivedOrders,
  completedOrders,
};
}