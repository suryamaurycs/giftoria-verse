
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import PageWrapper from '@/components/layout/PageWrapper';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';
import ProductGrid from '@/components/products/ProductGrid';
import { useProducts } from '@/context/ProductContext';

const Shop = () => {
  const { products, isLoading } = useProducts();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get query params from URL
  const params = new URLSearchParams(location.search);
  const categoryParam = params.get('category') || '';
  const searchParam = params.get('search') || '';
  const sortParam = params.get('sort') || 'newest';
  
  // State for filters
  const [category, setCategory] = useState(categoryParam);
  const [searchTerm, setSearchTerm] = useState(searchParam);
  const [sortBy, setSortBy] = useState(sortParam);
  
  // Extract unique categories from products
  const categories = ['All', ...new Set(products.map((product) => product.category))];
  
  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (category && category !== 'All') params.set('category', category);
    if (searchTerm) params.set('search', searchTerm);
    if (sortBy !== 'newest') params.set('sort', sortBy);
    
    navigate({
      pathname: '/shop',
      search: params.toString()
    }, { replace: true });
  }, [category, searchTerm, sortBy, navigate]);
  
  // Filter and sort products
  const filteredProducts = products
    .filter((product) => {
      // Category filter
      if (category && category !== 'All') {
        if (product.category !== category) return false;
      }
      
      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          product.name.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower) ||
          product.category.toLowerCase().includes(searchLower)
        );
      }
      
      return true;
    })
    .sort((a, b) => {
      // Sort products
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });
  
  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The search term is already managed by state, just prevent default form submission
  };
  
  return (
    <>
      <Header />
      <CartDrawer />
      <PageWrapper>
        <div className="container mx-auto px-4 md:px-6 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-medium mb-4">Shop Our Collection</h1>
            <p className="text-gray-600">
              Discover our curated selection of thoughtful gifts for every occasion.
            </p>
          </div>
          
          {/* Filters Section */}
          <div className="bg-white rounded-lg shadow-soft p-4 mb-8 animate-fade-in">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <form onSubmit={handleSearch} className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </form>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-48">
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="w-full sm:w-48">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger id="sort">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="oldest">Oldest</SelectItem>
                      <SelectItem value="price-asc">Price: Low to High</SelectItem>
                      <SelectItem value="price-desc">Price: High to Low</SelectItem>
                      <SelectItem value="name-asc">Name: A to Z</SelectItem>
                      <SelectItem value="name-desc">Name: Z to A</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            {/* Active filters */}
            {(category !== 'All' && category !== '') || searchTerm ? (
              <div className="flex items-center mt-4 gap-2">
                <span className="text-sm text-gray-500">Active filters:</span>
                
                {category !== 'All' && category !== '' && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs h-7 px-2"
                    onClick={() => setCategory('All')}
                  >
                    Category: {category} ×
                  </Button>
                )}
                
                {searchTerm && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs h-7 px-2"
                    onClick={() => setSearchTerm('')}
                  >
                    Search: {searchTerm} ×
                  </Button>
                )}
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs h-7 ml-auto"
                  onClick={() => {
                    setCategory('All');
                    setSearchTerm('');
                    setSortBy('newest');
                  }}
                >
                  Clear all
                </Button>
              </div>
            ) : null}
          </div>
          
          {/* Results */}
          <div className="mb-4 flex justify-between items-center">
            <p className="text-gray-500">
              {isLoading
                ? 'Loading products...'
                : `Showing ${filteredProducts.length} ${
                    filteredProducts.length === 1 ? 'product' : 'products'
                  }`}
            </p>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-pulse">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-lg aspect-square" />
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <Filter className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">No products found</h3>
              <p className="text-gray-500 mb-6">
                Try adjusting your search or filter criteria.
              </p>
              <Button
                onClick={() => {
                  setCategory('All');
                  setSearchTerm('');
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <ProductGrid products={filteredProducts} />
          )}
        </div>
      </PageWrapper>
      <Footer />
    </>
  );
};

export default Shop;
