
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { ProductFormData } from '@/types';
import { Form } from '@/components/ui/form';
import { 
  productFormSchema, 
  ProductFormValues 
} from './product-form-schema';
import {
  TextFormField,
  NumberFormField,
  TextareaFormField,
  CategoryFormField,
  CheckboxFormField,
  UrlFormField
} from './product-form-fields';

interface ProductFormProps {
  initialData?: ProductFormData;
  onSubmit: (data: ProductFormData) => void;
  isSubmitting?: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  onSubmit,
  isSubmitting = false,
}) => {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: initialData?.name || '',
      description: initialData?.description || '',
      price: initialData?.price || 0,
      category: initialData?.category || '',
      imageUrl: initialData?.imageUrl || '',
      inventory: initialData?.inventory || 0,
      featured: initialData?.featured || false,
    },
  });

  const handleSubmit = (values: ProductFormValues) => {
    // Create a ProductFormData object with all required fields
    const productData: ProductFormData = {
      name: values.name,
      description: values.description,
      price: values.price,
      category: values.category,
      imageUrl: values.imageUrl,
      inventory: values.inventory,
      featured: values.featured,
    };
    
    // Only add the id if it exists in initialData
    if (initialData?.id) {
      productData.id = initialData.id;
    }
    
    onSubmit(productData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextFormField 
            control={form.control} 
            name="name" 
            label="Product Name" 
            placeholder="Enter product name"
          />

          <NumberFormField 
            control={form.control} 
            name="price" 
            label="Price ($)" 
            placeholder="0.00"
            step="0.01"
          />
        </div>

        <TextareaFormField 
          control={form.control} 
          name="description" 
          label="Description" 
          placeholder="Enter product description"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CategoryFormField 
            control={form.control} 
            name="category" 
            label="Category"
          />

          <NumberFormField 
            control={form.control} 
            name="inventory" 
            label="Inventory" 
            placeholder="0"
          />
        </div>

        <UrlFormField 
          control={form.control} 
          name="imageUrl" 
          label="Image URL" 
          placeholder="https://example.com/image.jpg"
          description="Enter a valid URL for the product image"
        />

        <CheckboxFormField 
          control={form.control} 
          name="featured" 
          label="Featured Product" 
          description="Featured products are displayed prominently on the homepage"
        />

        <Button
          type="submit"
          className="w-full bg-giftoria-slate hover:bg-giftoria-slate/90"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : initialData ? 'Update Product' : 'Add Product'}
        </Button>
      </form>
    </Form>
  );
};

export default ProductForm;
