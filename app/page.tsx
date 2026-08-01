"use client";

import { useMemo, useState } from "react";

import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import SearchBar from "@/components/home/SearchBar";
import ProductGrid from "@/components/product/ProductGrid";

import { useProducts } from "@/hooks/useProducts";
import { useCart } from "@/context/CartContext";

import CartSidebar from "@/components/cart/CartSidebar";
import CustomerForm from "@/components/customer/CustomerForm";

import CategoryFilter from "@/components/home/CategoryFilter";

export default function Home() {
  const [search, setSearch] = useState("");

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState(""); 

  // Mengambil fungsi addToCart dari Context
  const { addToCart } = useCart();
  const { products, loading } = useProducts();
  const categories = [
            ...new Set(products.map((p) => p.category)),
            ];
  const [selectedCategory, setSelectedCategory] = useState("");
  const [openCart, setOpenCart] = useState(false);


  // Filter produk
 // Filter produk
const filteredProducts = useMemo(() => {
  return products.filter((product) => {

    const matchSearch =
      product.name
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchCategory =
      selectedCategory === "" ||
      product.category === selectedCategory;

    return matchSearch && matchCategory;

  });
}, [products, search, selectedCategory]);



return (
  <>
      <Navbar onOpenCart={() => setOpenCart(true)} />

      <Hero />

<SearchBar
  value={search}
  onChange={setSearch}
/>

<CategoryFilter
  categories={categories}
  selected={selectedCategory}
  onSelect={setSelectedCategory}
/>

<CustomerForm
  customerName={customerName}
  customerPhone={customerPhone}
  setCustomerName={setCustomerName}
  setCustomerPhone={setCustomerPhone}
/>

      <ProductGrid
    products={filteredProducts}
    loading={loading}
    onAddToCart={addToCart}
/>

      <CartSidebar
  open={openCart}
  onClose={() => setOpenCart(false)}
  customerName={customerName}
  customerPhone={customerPhone}
/>
    </>
  );
}