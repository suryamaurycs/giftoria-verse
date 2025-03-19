
import React from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Check, ArrowLeft } from "lucide-react";

import PageWrapper from "@/components/layout/PageWrapper";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useCart } from "@/context/CartContext";
import { TextFormField } from "@/components/products/product-form-fields";
import UserDetailsForm from "@/components/checkout/UserDetailsForm";
import OrderSummary from "@/components/checkout/OrderSummary";
import { toast } from "sonner";

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCart();
  
  const handlePlaceOrder = () => {
    toast.success("Order placed successfully!");
    clearCart();
    navigate("/");
  };

  if (cartItems.length === 0) {
    return (
      <PageWrapper>
        <div className="max-w-4xl mx-auto px-4 py-10">
          <div className="text-center py-10">
            <h1 className="text-2xl font-medium mb-4">Your cart is empty</h1>
            <p className="text-gray-500 mb-6">Add some products to your cart before checking out.</p>
            <Button onClick={() => navigate("/shop")}>Continue Shopping</Button>
          </div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="max-w-6xl mx-auto px-4 py-10">
        <Button 
          variant="ghost" 
          className="mb-6 flex items-center gap-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <UserDetailsForm onSubmitSuccess={handlePlaceOrder} />
          </div>
          
          <div className="lg:col-span-1">
            <OrderSummary cartItems={cartItems} cartTotal={cartTotal} />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Checkout;
