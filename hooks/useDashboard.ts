"use client";

import { useEffect, useState } from "react";

import { getOrders } from "@/services/orderService";
import { getProducts } from "@/services/productService";


export function useDashboard() {

  const [loading, setLoading] =
    useState(true);


  const [totalProducts, setTotalProducts] =
    useState(0);

  const [totalOrders, setTotalOrders] =
    useState(0);

  const [totalCustomers, setTotalCustomers] =
    useState(0);

  const [totalRevenue, setTotalRevenue] =
    useState(0);


  const [pendingOrders, setPendingOrders] =
    useState(0);

  const [orderedOrders, setOrderedOrders] =
    useState(0);

  const [arrivedOrders, setArrivedOrders] =
    useState(0);

  const [completedOrders, setCompletedOrders] =
    useState(0);



  useEffect(() => {

    async function loadDashboard() {

      try {

        const [
          products,
          orders,
        ] = await Promise.all([
          getProducts(),
          getOrders(),
        ]);



        setTotalProducts(
          products.length
        );


        setTotalOrders(
          orders.length
        );



        setPendingOrders(
          orders.filter(
            (order) =>
              order.status === "Pending"
          ).length
        );



        setOrderedOrders(
          orders.filter(
            (order) =>
              order.status === "Ordered"
          ).length
        );



        setArrivedOrders(
          orders.filter(
            (order) =>
              order.status === "Arrived"
          ).length
        );



        setCompletedOrders(
          orders.filter(
            (order) =>
              order.status === "Completed"
          ).length
        );



        setTotalRevenue(
          orders.reduce(
            (total, order) =>
              total + order.total,
            0
          )
        );



        const customerList =
          new Set(
            orders.map(
              (order) =>
                order.customerPhone
            )
          );


        setTotalCustomers(
          customerList.size
        );


      } catch (error) {

        console.error(
          "Dashboard error:",
          error
        );

      } finally {

        setLoading(false);

      }

    }


    loadDashboard();


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