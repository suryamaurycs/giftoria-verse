
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, Minus, Plus, Edit, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageWrapper from '@/components/layout/PageWrapper';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';
import { useProducts } from '@/context/ProductContext';
import { useCart } from '@/context/CartContext';
import { toast } from '@/components/ui/sonner';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProduct, isLoading } = useProducts();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  
  const product = id ? getProduct(id) : undefined;
  
  // Handle loading and not found states
  if (isLoading) {
    return (
      <>
        <Header />
        <PageWrapper>
          <div className="container mx-auto px-4 md:px-6 py-8">
            <div className="animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-4" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="aspect-square bg-gray-200 rounded-lg" />
                <div className="space-y-4">
                  <div className="h-8 bg-gray-200 rounded w-3/4" />
                  <div className="h-6 bg-gray-200 rounded w-1/4" />
                  <div className="h-24 bg-gray-200 rounded" />
                  <div className="h-10 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            </div>
          </div>
        </PageWrapper>
        <Footer />
      </>
    );
  }
  
  if (!product) {
    return (
      <>
        <Header />
        <PageWrapper>
          <div className="container mx-auto px-4 md:px-6 py-8 text-center">
            <h2 className="text-2xl font-medium mb-4">Product Not Found</h2>
            <p className="text-gray-600 mb-8">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link to="/shop">Return to Shop</Link>
            </Button>
          </div>
        </PageWrapper>
        <Footer />
      </>
    );
  }
  
  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };
  
  // Handle quantity changes
  const incrementQuantity = () => {
    if (quantity < product.inventory) {
      setQuantity(quantity + 1);
    } else {
      toast.error(`Sorry, only ${product.inventory} items available`);
    }
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  // Handle add to cart
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
  return (
    <>
      <Header />
      <CartDrawer />
      <PageWrapper>
        <div className="container mx-auto px-4 md:px-6 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center mb-6 text-sm">
            <Link to="/" className="text-gray-500 hover:text-giftoria-slate">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link to="/shop" className="text-gray-500 hover:text-giftoria-slate">Shop</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-giftoria-slate">{product.name}</span>
          </div>
          
          {/* Back button (mobile) */}
          <Button
            variant="ghost"
            size="sm"
            className="mb-4 md:hidden"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
            {/* Product Image */}
            <div className="bg-gray-50 rounded-lg overflow-hidden">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-auto object-contain aspect-square"
              />
            </div>
            
            {/* Product Details */}
            <div className="animate-slide-up">
              <div className="mb-6">
                <h1 className="text-3xl font-medium mb-2">{product.name}</h1>
                <p className="text-2xl text-giftoria-slate">{formatPrice(product.price)}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md mb-6">
                <h3 className="font-medium mb-2">Description</h3>
                <p className="text-gray-700">{product.description}</p>
              </div>
              
              <div className="flex flex-col space-y-4 mb-8">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Category</p>
                  <p>{product.category}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 mb-1">Availability</p>
                  <p>
                    {product.inventory > 0
                      ? `${product.inventory} in stock`
                      : 'Out of stock'}
                  </p>
                </div>
              </div>
              
              {/* Quantity selector */}
              <div className="flex items-center mb-6">
                <span className="mr-4">Quantity</span>
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-r-none"
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <div className="h-10 w-12 flex items-center justify-center border-y border-input">
                    {quantity}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-l-none"
                    onClick={incrementQuantity}
                    disabled={quantity >= product.inventory}
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Action buttons */}
              <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
                <Button
                  className="flex-1 bg-giftoria-slate hover:bg-giftoria-slate/90"
                  onClick={handleAddToCart}
                  disabled={product.inventory === 0}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
                
                <Button
                  variant="outline"
                  asChild
                >
                  <Link to={`/dashboard/edit-product/${product.id}`}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
      <Footer />
    </>
  );
};

export default ProductDetail;
