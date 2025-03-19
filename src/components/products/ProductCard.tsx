
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, featured = false }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };
  
  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <div 
      className={cn(
        'group relative overflow-hidden rounded-lg card-hover transform transition-all duration-500',
        featured ? 'col-span-2 row-span-2' : ''
      )}
    >
      <Link 
        to={`/product/${product.id}`} 
        className="block h-full"
      >
        <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-700 ease-apple group-hover:scale-105"
            loading="lazy"
          />
          
          {product.featured && !featured && (
            <div className="absolute top-2 left-2 bg-giftoria-gold/90 text-white text-xs px-2 py-1 rounded-full">
              Featured
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="font-medium truncate">{product.name}</h3>
          <p className="text-gray-600 mt-1">{formatPrice(product.price)}</p>
        </div>
        
        {/* Hover Actions */}
        <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/5 backdrop-blur-sm">
          <Button 
            size="sm" 
            variant="secondary"
            className="bg-white hover:bg-gray-100"
            onClick={handleAddToCart}
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
          
          <Link 
            to={`/product/${product.id}`}
            aria-label={`View ${product.name} details`}
          >
            <Button 
              size="icon" 
              variant="secondary"
              className="bg-white hover:bg-gray-100"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
