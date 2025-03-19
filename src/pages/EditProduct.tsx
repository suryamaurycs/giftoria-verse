
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageWrapper from '@/components/layout/PageWrapper';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';
import ProductForm from '@/components/products/ProductForm';
import { useProducts } from '@/context/ProductContext';
import { ProductFormData } from '@/types';

const EditProduct = () => {
  const { id } = useParams<{ id: string }>();
  const { getProduct, updateProduct } = useProducts();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const product = id ? getProduct(id) : undefined;

  const handleSubmit = (formData: ProductFormData) => {
    setIsSubmitting(true);
    
    // Simulate async operation
    setTimeout(() => {
      updateProduct(formData);
      setIsSubmitting(false);
      navigate('/dashboard');
    }, 500);
  };

  if (!product) {
    return (
      <>
        <Header />
        <PageWrapper>
          <div className="container mx-auto px-4 md:px-6 py-8 text-center">
            <h2 className="text-2xl font-medium mb-4">Product Not Found</h2>
            <p className="text-gray-600 mb-8">
              The product you're trying to edit doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link to="/dashboard">Return to Dashboard</Link>
            </Button>
          </div>
        </PageWrapper>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <CartDrawer />
      <PageWrapper>
        <div className="container mx-auto px-4 md:px-6 py-8">
          <Button
            variant="ghost"
            className="mb-6"
            onClick={() => navigate('/dashboard')}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-medium mb-6">Edit Product</h1>
            
            <ProductForm 
              initialData={product} 
              onSubmit={handleSubmit} 
              isSubmitting={isSubmitting} 
            />
          </div>
        </div>
      </PageWrapper>
      <Footer />
    </>
  );
};

export default EditProduct;
