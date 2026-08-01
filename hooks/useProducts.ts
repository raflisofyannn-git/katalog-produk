"use client";

import { useEffect, useState } from "react";

import { Product } from "@/types/product";

import { getProducts } from "@/services/productService";

export function useProducts() {

  const [products, setProducts] =
    useState<Product[]>([]);

  const [loading, setLoading] =
    useState(true);

  async function refreshProducts() {

    try {

      const data =
        await getProducts();

      setProducts(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  }

  useEffect(() => {

    refreshProducts();

  }, []);

  return {

    products,

    setProducts,

    refreshProducts,

    loading,

  };

}