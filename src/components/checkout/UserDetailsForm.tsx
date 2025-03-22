
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Check } from "lucide-react";

import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TextFormField } from "@/components/products/product-form-fields";

const userDetailsSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  phoneNumber: z.string().min(10, "Please enter a valid phone number."),
  houseNumber: z.string().min(1, "House/Building number is required."),
  roadName: z.string().min(1, "Road/Street name is required."),
  areaColony: z.string().min(1, "Area/Colony is required."),
  city: z.string().min(1, "City is required."),
  state: z.string().min(1, "State is required."),
  pincode: z.string().min(6, "Please enter a valid pincode."),
});

export type UserDetailsFormValues = z.infer<typeof userDetailsSchema>;

interface UserDetailsFormProps {
  onSubmitSuccess: (data: UserDetailsFormValues) => void;
}

const UserDetailsForm: React.FC<UserDetailsFormProps> = ({ onSubmitSuccess }) => {
  const form = useForm<UserDetailsFormValues>({
    resolver: zodResolver(userDetailsSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      houseNumber: "",
      roadName: "",
      areaColony: "",
      city: "",
      state: "",
      pincode: "",
    },
  });

  const onSubmit = (data: UserDetailsFormValues) => {
    console.log("Form submitted with:", data);
    onSubmitSuccess(data);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h2 className="text-xl font-semibold mb-6">Delivery Details</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextFormField<UserDetailsFormValues>
              control={form.control}
              name="fullName"
              label="Full Name"
              placeholder="John Doe"
            />
            
            <TextFormField<UserDetailsFormValues>
              control={form.control}
              name="email"
              label="Email"
              placeholder="johndoe@example.com"
            />
          </div>
          
          <TextFormField<UserDetailsFormValues>
            control={form.control}
            name="phoneNumber"
            label="Mobile Number"
            placeholder="10-digit mobile number"
          />
          
          <div className="space-y-6 border-t pt-6">
            <h3 className="text-lg font-medium">Address Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TextFormField<UserDetailsFormValues>
                control={form.control}
                name="houseNumber"
                label="House/Building Number"
                placeholder="Apartment, suite, unit, etc."
              />
              
              <TextFormField<UserDetailsFormValues>
                control={form.control}
                name="roadName"
                label="Road/Street Name"
                placeholder="Street address"
              />
            </div>
            
            <TextFormField<UserDetailsFormValues>
              control={form.control}
              name="areaColony"
              label="Area/Colony"
              placeholder="Neighborhood, area, etc."
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <TextFormField<UserDetailsFormValues>
                control={form.control}
                name="city"
                label="City"
                placeholder="City"
              />
              
              <TextFormField<UserDetailsFormValues>
                control={form.control}
                name="state"
                label="State"
                placeholder="State"
              />
              
              <TextFormField<UserDetailsFormValues>
                control={form.control}
                name="pincode"
                label="Pincode"
                placeholder="6-digit pincode"
              />
            </div>
          </div>
          
          <Button type="submit" className="w-full bg-giftoria-slate hover:bg-giftoria-slate/90">
            <Check className="mr-2 h-4 w-4" /> Continue to Payment
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UserDetailsForm;
