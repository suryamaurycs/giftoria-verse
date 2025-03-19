
import React from 'react';
import { ArrowRight, Package, Star, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import PageWrapper from '@/components/layout/PageWrapper';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';
import ProductGrid from '@/components/products/ProductGrid';
import { useProducts } from '@/context/ProductContext';

const Index = () => {
  const { products, isLoading } = useProducts();
  
  // Get featured and recent products
  const featuredProducts = products.filter(product => product.featured);
  const recentProducts = [...products]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 4);

  return (
    <>
      <Header />
      <CartDrawer />
      <PageWrapper>
        {/* Hero Section */}
        <section className="relative h-[90vh] flex items-center bg-giftoria-cream overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-white/90 to-white/50" />
            <img
              src="https://images.unsplash.com/photo-1472396961693-142e6e269027"
              alt="Giftoria background"
              className="w-full h-full object-cover object-center"
            />
          </div>
          
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="max-w-2xl animate-slide-up">
              <span className="inline-block px-3 py-1 bg-giftoria-slate/10 text-giftoria-slate rounded-full text-sm font-medium mb-4">
                Curated with Care
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-6">
                Thoughtful Gifts for Every Occasion
              </h1>
              <p className="text-lg text-gray-700 mb-8 max-w-lg">
                Discover our collection of unique, handcrafted gifts that make every moment memorable.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-giftoria-slate hover:bg-giftoria-slate/90">
                  <Link to="/shop">Explore Collection</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/about">Our Story</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-16 container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-10">
            <div className="mb-6 md:mb-0">
              <span className="text-giftoria-slate font-medium">Featured Collection</span>
              <h2 className="text-3xl font-medium mt-1">Our Special Selections</h2>
            </div>
            <Link to="/shop" className="group flex items-center text-giftoria-slate font-medium hover:underline">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-lg aspect-square" />
              ))}
            </div>
          ) : (
            <ProductGrid products={featuredProducts.length > 0 ? featuredProducts : products.slice(0, 6)} featuredLayout={true} />
          )}
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-medium text-center mb-12">Why Choose Giftoria</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-soft animate-slide-up">
                <div className="w-12 h-12 flex items-center justify-center bg-giftoria-slate/10 text-giftoria-slate rounded-full mb-4">
                  <Package className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-medium mb-2">Curated Selection</h3>
                <p className="text-gray-600">
                  Each product in our collection is carefully selected for its quality and uniqueness.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-soft animate-slide-up [animation-delay:100ms]">
                <div className="w-12 h-12 flex items-center justify-center bg-giftoria-slate/10 text-giftoria-slate rounded-full mb-4">
                  <Star className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-medium mb-2">Premium Quality</h3>
                <p className="text-gray-600">
                  We partner with artisans and brands that meet our high standards for craftsmanship.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-soft animate-slide-up [animation-delay:200ms]">
                <div className="w-12 h-12 flex items-center justify-center bg-giftoria-slate/10 text-giftoria-slate rounded-full mb-4">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-medium mb-2">Secure Shopping</h3>
                <p className="text-gray-600">
                  Shop with confidence knowing your information is protected and your satisfaction is guaranteed.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* New Arrivals */}
        <section className="py-16 container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-10">
            <div className="mb-6 md:mb-0">
              <span className="text-giftoria-slate font-medium">Latest Additions</span>
              <h2 className="text-3xl font-medium mt-1">New Arrivals</h2>
            </div>
            <Link to="/shop" className="group flex items-center text-giftoria-slate font-medium hover:underline">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 animate-pulse">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-lg aspect-square" />
              ))}
            </div>
          ) : (
            <ProductGrid products={recentProducts} />
          )}
        </section>

        {/* Newsletter Section */}
        <section className="py-16 bg-giftoria-slate text-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <div className="max-w-xl mx-auto">
              <h2 className="text-3xl font-medium mb-4">Join Our Newsletter</h2>
              <p className="mb-6 opacity-90">
                Subscribe for updates on new products, special offers, and gift inspiration.
              </p>
              <div className="flex w-full max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 rounded-l-md focus:outline-none text-gray-800"
                />
                <Button className="rounded-l-none bg-giftoria-gold hover:bg-giftoria-gold/90">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </section>
      </PageWrapper>
      <Footer />
    </>
  );
};

export default Index;
