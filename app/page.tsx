"use client";

import { useMemo, useState } from "react";

import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import SearchBar from "@/components/home/SearchBar";
import ProductGrid from "@/components/product/ProductGrid";

import { useProducts } from "@/hooks/useProducts";
import { useCart } from "@/context/CartContext";

import CartSidebar from "@/components/cart/CartSidebar";

import CategoryFilter from "@/components/home/CategoryFilter";
import Footer from "@/components/layout/Footer";
import FeatureSection from "@/components/home/FeatureSection";
import CTASection from "@/components/home/CTASection";

export default function Home() {
  const [search, setSearch] = useState("");

  // JANGAN DIHAPUS DULU

  const { addToCart } = useCart();
  const { products, loading } = useProducts();

  const categories = [
    ...new Set(products.map((p) => p.category)),
  ];

  const [selectedCategory, setSelectedCategory] = useState("");

  const [openCart, setOpenCart] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchSearch = product.name
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

      <FeatureSection />

      <SearchBar
        value={search}
        onChange={setSearch}
      />

      <CategoryFilter
        categories={categories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <ProductGrid
        products={filteredProducts}
        loading={loading}
        onAddToCart={addToCart}
      />

      <CTASection />

      <CartSidebar
        open={openCart}
        onClose={() => setOpenCart(false)}
      />

      <Footer />
    </>
  );
}