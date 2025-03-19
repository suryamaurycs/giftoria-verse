
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, CreditCard, Landmark, ArrowLeft } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";

interface PaymentMethodSelectionProps {
  onBack: () => void;
  userDetails: Record<string, string>;
}

const PaymentMethodSelection: React.FC<PaymentMethodSelectionProps> = ({ 
  onBack,
  userDetails
}) => {
  const [paymentMethod, setPaymentMethod] = useState<string>("card");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const navigate = useNavigate();
  const { clearCart } = useCart();

  const handlePaymentSubmit = () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast.success("Payment successful! Order placed.");
      clearCart();
      navigate("/");
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          className="mr-4"
          onClick={onBack}
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>
        <h2 className="text-xl font-semibold">Select Payment Method</h2>
      </div>

      <RadioGroup 
        defaultValue={paymentMethod}
        onValueChange={setPaymentMethod}
        className="grid gap-4"
      >
        <Card className={`cursor-pointer ${paymentMethod === "card" ? "border-2 border-primary" : ""}`}>
          <CardHeader className="pb-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="card" id="card" />
              <CardTitle className="text-lg flex items-center">
                <CreditCard className="mr-2 h-5 w-5" /> Credit/Debit Card
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>Pay securely using your credit or debit card.</CardDescription>
            {paymentMethod === "card" && (
              <div className="mt-4 grid gap-2">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Card Number</label>
                    <input 
                      type="text" 
                      placeholder="1234 5678 9012 3456"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Name on Card</label>
                    <input 
                      type="text"
                      placeholder="John Doe"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Expiry Date</label>
                    <input 
                      type="text"
                      placeholder="MM/YY"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">CVV</label>
                    <input 
                      type="text"
                      placeholder="123"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    />
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className={`cursor-pointer ${paymentMethod === "bank" ? "border-2 border-primary" : ""}`}>
          <CardHeader className="pb-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="bank" id="bank" />
              <CardTitle className="text-lg flex items-center">
                <Landmark className="mr-2 h-5 w-5" /> Bank Transfer
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>Transfer the amount directly to our bank account.</CardDescription>
            {paymentMethod === "bank" && (
              <div className="mt-4 space-y-2 text-sm">
                <p><strong>Bank Name:</strong> Example Bank</p>
                <p><strong>Account Number:</strong> 1234567890</p>
                <p><strong>IFSC Code:</strong> EXBK0001234</p>
                <p><strong>Account Holder:</strong> Giftoria Store</p>
              </div>
            )}
          </CardContent>
        </Card>
      </RadioGroup>

      <Button 
        onClick={handlePaymentSubmit} 
        className="w-full bg-giftoria-slate hover:bg-giftoria-slate/90"
        disabled={isProcessing}
      >
        {isProcessing ? (
          <span className="flex items-center">Processing...</span>
        ) : (
          <span className="flex items-center">
            <Check className="mr-2 h-4 w-4" /> Complete Payment
          </span>
        )}
      </Button>
    </div>
  );
};

export default PaymentMethodSelection;
