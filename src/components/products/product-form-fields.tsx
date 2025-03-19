
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

interface FormFieldProps {
  control: Control<ProductFormValues>;
  name: keyof ProductFormValues;
  label: string;
  placeholder?: string;
  description?: string;
}

export const TextFormField: React.FC<FormFieldProps> = ({
  control, 
  name,
  label,
  placeholder,
}) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input placeholder={placeholder || `Enter ${label.toLowerCase()}`} {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export const NumberFormField: React.FC<FormFieldProps & { step?: string }> = ({
  control, 
  name,
  label,
  placeholder,
  step = "1",
}) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input type="number" step={step} placeholder={placeholder || "0"} {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export const TextareaFormField: React.FC<FormFieldProps & { rows?: number }> = ({
  control, 
  name,
  label,
  placeholder,
  rows = 4,
}) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Textarea 
            placeholder={placeholder || `Enter ${label.toLowerCase()}`} 
            rows={rows} 
            {...field} 
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export const CategoryFormField: React.FC<FormFieldProps> = ({
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
          defaultValue={field.value}
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

export const CheckboxFormField: React.FC<FormFieldProps> = ({
  control, 
  name,
  label,
  description,
}) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
        <FormControl>
          <Checkbox
            checked={field.value}
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

export const UrlFormField: React.FC<FormFieldProps> = ({
  control, 
  name,
  label,
  placeholder,
  description,
}) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input placeholder={placeholder || "https://example.com/image.jpg"} {...field} />
        </FormControl>
        {description && <FormDescription>{description}</FormDescription>}
        <FormMessage />
      </FormItem>
    )}
  />
);
