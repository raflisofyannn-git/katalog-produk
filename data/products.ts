import { Product } from "@/types/product";

export const products: Product[] = [
  {
  id: "1",
  name: "Sepatu Nike",
  price: 1250000,
  category: "Sepatu",
  description: "Sepatu Nike original dengan kualitas premium.",
  images: [
    "/products/nike1.jpg",
    "/products/nike2.jpg",
    "/products/nike3.jpg",
    "/products/nike4.jpg",
    "/products/nike5.jpg",
  ],
},

   {
  id: "2",
  name: "Tas Coach",
  price: 200000,
  category: "Tas",
  description: "Tas Coach original dengan kualitas premium.",
  images: [
    "/products/coach1.jpg",
    "/products/coach2.jpg",
    "/products/coach3.jpg",
    "/products/coach4.jpg",
    "/products/coach5.jpg",
  ],
},

   {
  id: "3",
  name: "Jam Casio",
  price: 850000,
  category: "Jam",
  description: "Jam Casio original dengan garansi resmi.",
  images: [
    "/products/casio1.jpg",
    "/products/casio2.jpg",
    "/products/casio3.jpg",
    "/products/casio4.jpg",
    "/products/casio5.jpg",
  ],
},
];