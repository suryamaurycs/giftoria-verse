
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageWrapper from '@/components/layout/PageWrapper';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const NotFound = () => {
  const location = useLocation();

  return (
    <>
      <Header />
      <PageWrapper className="flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 py-16 text-center">
          <Package className="w-16 h-16 mx-auto mb-6 text-giftoria-slate animate-float" />
          <h1 className="text-4xl font-medium mb-4">404</h1>
          <p className="text-xl mb-8">Oops! Page not found</p>
          <p className="text-gray-600 mb-8">
            We couldn't find the page you're looking for: {location.pathname}
          </p>
          <Button asChild className="bg-giftoria-slate hover:bg-giftoria-slate/90">
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </PageWrapper>
      <Footer />
    </>
  );
};

export default NotFound;
