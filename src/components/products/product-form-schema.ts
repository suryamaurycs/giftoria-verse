
import { z } from 'zod';

export const productFormSchema = z.object({
  name: z.string().min(3, {
    message: "Product name must be at least 3 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  price: z.coerce.number().positive({
    message: "Price must be a positive number.",
  }),
  category: z.string().min(1, {
    message: "Please select a category.",
  }),
  imageUrl: z.string().url({
    message: "Please enter a valid image URL.",
  }),
  inventory: z.coerce.number().int().min(0, {
    message: "Inventory must be a non-negative integer.",
  }),
  featured: z.boolean().default(false),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;

export const productCategories = [
  'Home Decor',
  'Kitchen & Dining',
  'Food & Beverage',
  'Home Fragrance',
  'Bath & Body',
  'Stationery',
  'Jewelry',
  'Accessories',
];
