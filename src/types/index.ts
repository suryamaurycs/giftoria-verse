
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  featured?: boolean;
  inventory: number;
  createdAt: Date;
}

export type CartItem = {
  product: Product;
  quantity: number;
};

export type ProductFormData = {
  id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  featured?: boolean;
  inventory: number;
};
