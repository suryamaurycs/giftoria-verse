
import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/types';
import { cn } from '@/lib/utils';

interface ProductGridProps {
  products: Product[];
  className?: string;
  featuredLayout?: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
  products, 
  className,
  featuredLayout = false
}) => {
  if (products.length === 0) {
    return <p className="text-center py-8 text-gray-500">No products found</p>;
  }

  if (featuredLayout) {
    // Find featured products first
    const featuredProducts = products.filter((product) => product.featured);
    const otherProducts = products.filter((product) => !product.featured);
    
    // Take at most 2 featured products
    const selectedFeatured = featuredProducts.slice(0, 2);
    
    return (
      <div className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6",
        className
      )}>
        {selectedFeatured.map((product, index) => (
          <div key={product.id} className={index === 0 ? "col-span-1 sm:col-span-2 row-span-2" : "col-span-1 sm:col-span-2 lg:col-span-2"}>
            <ProductCard product={product} featured={true} />
          </div>
        ))}
        
        {otherProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  }

  return (
    <div className={cn(
      "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6",
      className
    )}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
