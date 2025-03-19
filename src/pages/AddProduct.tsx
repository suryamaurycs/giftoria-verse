
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageWrapper from '@/components/layout/PageWrapper';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';
import ProductForm from '@/components/products/ProductForm';
import { useProducts } from '@/context/ProductContext';
import { ProductFormData } from '@/types';

const AddProduct = () => {
  const { addProduct } = useProducts();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (formData: ProductFormData) => {
    setIsSubmitting(true);
    
    // Simulate async operation
    setTimeout(() => {
      addProduct(formData);
      setIsSubmitting(false);
      navigate('/dashboard');
    }, 500);
  };

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
            <h1 className="text-3xl font-medium mb-6">Add New Product</h1>
            
            <ProductForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
          </div>
        </div>
      </PageWrapper>
      <Footer />
    </>
  );
};

export default AddProduct;
