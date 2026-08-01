import { Product } from "@/types/product";

export interface ProductFormProps {
  editProduct?: Product;
  onSuccess?: () => void;
}