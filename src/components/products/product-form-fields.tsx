import React from 'react';
import { Control } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { ProductFormValues, productCategories } from './product-form-schema';

interface FormFieldProps<T> {
  control: Control<T>;
  name: keyof T & string;
  label: string;
  placeholder?: string;
  description?: string;
}

export const TextFormField = <T extends Record<string, any>>({
  control, 
  name,
  label,
  placeholder,
}: FormFieldProps<T>) => (
  <FormField
    control={control as any}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input 
            placeholder={placeholder || `Enter ${label.toLowerCase()}`} 
            {...field} 
            value={field.value as string}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export const NumberFormField = <T extends Record<string, any>>({
  control, 
  name,
  label,
  placeholder,
  step = "1",
}: FormFieldProps<T> & { step?: string }) => (
  <FormField
    control={control as any}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input 
            type="number" 
            step={step} 
            placeholder={placeholder || "0"} 
            {...field} 
            value={field.value as number}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export const TextareaFormField = <T extends Record<string, any>>({
  control, 
  name,
  label,
  placeholder,
  rows = 4,
}: FormFieldProps<T> & { rows?: number }) => (
  <FormField
    control={control as any}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Textarea 
            placeholder={placeholder || `Enter ${label.toLowerCase()}`} 
            rows={rows} 
            {...field} 
            value={field.value as string}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export const CategoryFormField: React.FC<FormFieldProps<ProductFormValues>> = ({
  control, 
  name,
  label,
}) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <Select
          onValueChange={field.onChange}
          defaultValue={field.value as string}
        >
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {productCategories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    )}
  />
);

export const CheckboxFormField = <T extends Record<string, any>>({
  control, 
  name,
  label,
  description,
}: FormFieldProps<T>) => (
  <FormField
    control={control as any}
    name={name}
    render={({ field }) => (
      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
        <FormControl>
          <Checkbox
            checked={field.value as boolean}
            onCheckedChange={field.onChange}
          />
        </FormControl>
        <div className="space-y-1 leading-none">
          <FormLabel>{label}</FormLabel>
          {description && <FormDescription>{description}</FormDescription>}
        </div>
      </FormItem>
    )}
  />
);

export const UrlFormField = <T extends Record<string, any>>({
  control, 
  name,
  label,
  placeholder,
  description,
}: FormFieldProps<T>) => (
  <FormField
    control={control as any}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input 
            placeholder={placeholder || "https://example.com/image.jpg"} 
            {...field} 
            value={field.value as string}
          />
        </FormControl>
        {description && <FormDescription>{description}</FormDescription>}
        <FormMessage />
      </FormItem>
    )}
  />
);
