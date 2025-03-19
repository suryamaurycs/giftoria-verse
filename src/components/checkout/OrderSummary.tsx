
import React from "react";
import { CartItem } from "@/types";

interface OrderSummaryProps {
  cartItems: CartItem[];
  cartTotal: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ cartItems, cartTotal }) => {
  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border sticky top-20">
      <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
      
      <div className="space-y-4 max-h-[400px] overflow-y-auto mb-6">
        {cartItems.map((item) => (
          <div key={item.product.id} className="flex items-start py-3 border-b">
            <img
              src={item.product.imageUrl}
              alt={item.product.name}
              className="w-16 h-16 object-cover rounded-md"
            />
            <div className="ml-4 flex-1">
              <h3 className="font-medium">{item.product.name}</h3>
              <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
              <p className="text-gray-700">
                {formatPrice(item.product.price * item.quantity)}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="space-y-2 pt-2">
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>{formatPrice(cartTotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <div className="flex justify-between font-medium text-base pt-4 border-t mt-4">
          <span>Total</span>
          <span>{formatPrice(cartTotal)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
