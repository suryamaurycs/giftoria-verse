
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product, ProductFormData } from '@/types';
import { sampleProducts } from '@/lib/data';
import { toast } from '@/components/ui/sonner';
import { v4 as uuidv4 } from 'uuid';

type ProductContextType = {
  products: Product[];
  isLoading: boolean;
  addProduct: (product: ProductFormData) => void;
  updateProduct: (product: ProductFormData) => void;
  deleteProduct: (id: string) => void;
  getProduct: (id: string) => Product | undefined;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch from an API
    const fetchProducts = () => {
      setIsLoading(true);
      try {
        // Simulate API call with timeout
        setTimeout(() => {
          const storedProducts = localStorage.getItem('giftoria-products');
          if (storedProducts) {
            setProducts(JSON.parse(storedProducts));
          } else {
            setProducts(sampleProducts);
            localStorage.setItem('giftoria-products', JSON.stringify(sampleProducts));
          }
          setIsLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts(sampleProducts);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Save products to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('giftoria-products', JSON.stringify(products));
    }
  }, [products, isLoading]);

  const addProduct = (productData: ProductFormData) => {
    const newProduct: Product = {
      ...productData,
      id: uuidv4(),
      createdAt: new Date(),
    };
    
    setProducts((prevProducts) => [...prevProducts, newProduct]);
    toast.success('Product added successfully');
  };

  const updateProduct = (productData: ProductFormData) => {
    if (!productData.id) return;
    
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productData.id
          ? { ...product, ...productData }
          : product
      )
    );
    toast.success('Product updated successfully');
  };

  const deleteProduct = (id: string) => {
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
    toast.success('Product deleted successfully');
  };

  const getProduct = (id: string) => {
    return products.find((product) => product.id === id);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        isLoading,
        addProduct,
        updateProduct,
        deleteProduct,
        getProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
