"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import LoadingButton from "@/components/ui/LoadingButton";
import {
  addProduct,
  updateProduct,
} from "@/services/productService";
import ImageUploader from "@/components/admin/ImageUploader";
import { useCloudinary } from "@/hooks/useCloudinary";
import { ProductFormProps } from "./types";
import ProductFields from "./ProductFields";

export default function ProductForm({
  editProduct,
  onSuccess,
}: ProductFormProps) {

  const [name,setName] = useState("");
  const [price,setPrice] = useState("");
  const [category,setCategory] = useState("");
  const [description,setDescription] = useState("");

  const [images,setImages] = useState<File[]>([]);
  const [previewImages,setPreviewImages] = useState<string[]>([]);

  const [loading,setLoading] = useState(false);
  const {upload,loading: uploadLoading,progress,} = useCloudinary();

  useEffect(() => {

    if (!editProduct) return;

    setName(editProduct.name);
    setPrice(editProduct.price.toString());
    setCategory(editProduct.category);
    setDescription(editProduct.description);

    setPreviewImages(editProduct.images || []);
    setImages([]);

  }, [editProduct]);

  function handleFiles(files: File[]) {
  setImages(files);

  const previews = files.map((file) =>
    URL.createObjectURL(file)
  );

  setPreviewImages(previews);
}

  async function handleSubmit(){

    if(!name || !price || !category){
      toast.warning("Lengkapi data terlebih dahulu.");
      return;
    }

    try{

      setLoading(true);

      let imageUrls:string[] =
        editProduct?.images || [];

      if (images.length > 0) {
        imageUrls = await upload(images);
        }

      const product = {

        name,
        price:Number(price),
        category,
        description,
        images:imageUrls,

      };

      if(editProduct){

        await updateProduct(
          editProduct.id,
          product
        );

      }else{

        await addProduct(product);

      }

      toast.success("Produk berhasil disimpan.");

      setName("");
      setPrice("");
      setCategory("");
      setDescription("");

      setImages([]);
      setPreviewImages([]);

      onSuccess?.();

    }
    catch(err){

      console.error(err);

      toast.error("Gagal menyimpan produk.");

    }
    finally{

      setLoading(false);

    }

  }

  return(

    <div className="rounded-xl border p-6 space-y-5">

      <h2 className="text-2xl font-bold">

        {editProduct
          ? "Edit Produk"
          : "Tambah Produk"}

      </h2>

      <ProductFields
        name={name}
        price={price}
        category={category}
        description={description}
        setName={setName}
        setPrice={setPrice}
        setCategory={setCategory}
        setDescription={setDescription}
      />

     <ImageUploader
            files={images}
            previews={previewImages}
            onChange={handleFiles}
            loading={uploadLoading}
            progress={progress}
            />

      <LoadingButton
        loading={loading}
        onClick={handleSubmit}
      >

        {editProduct
          ? "Update Produk"
          : "Simpan Produk"}

      </LoadingButton>

    </div>

  );

}