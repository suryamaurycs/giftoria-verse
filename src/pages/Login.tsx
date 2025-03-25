
import React from 'react';
import { Navigate } from 'react-router-dom';
import LoginForm from '@/components/auth/LoginForm';
import PageWrapper from '@/components/layout/PageWrapper';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/context/AuthContext';

const Login = () => {
  const { isAuthenticated } = useAuth();
  
  // Redirect if already logged in
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return (
    <>
      <Header />
      <PageWrapper>
        <div className="container mx-auto px-4 md:px-6 py-16">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold text-center mb-8">Sign In to Giftoria</h1>
            <LoginForm />
          </div>
        </div>
      </PageWrapper>
      <Footer />
    </>
  );
};

export default Login;
