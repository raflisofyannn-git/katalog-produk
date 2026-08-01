import { getProductById } from "@/services/productService";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({
  params,
}: Props) {

  const { id } = await params;

  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (

    <main className="mx-auto max-w-7xl p-6">

      <div className="grid gap-10 lg:grid-cols-2">

        <ProductGallery
          images={product.images}
        />

        <ProductInfo
          product={product}
        />

      </div>

    </main>

  );

}