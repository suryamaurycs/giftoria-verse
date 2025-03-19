
import { Product } from '@/types';

export const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Handcrafted Wooden Vase',
    description: 'A beautifully crafted wooden vase made from sustainable materials. Perfect for any home decor.',
    price: 89.99,
    category: 'Home Decor',
    imageUrl: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9',
    featured: true,
    inventory: 25,
    createdAt: new Date('2023-01-15')
  },
  {
    id: '2',
    name: 'Luxury Scented Candle Set',
    description: 'Set of 3 luxury scented candles with notes of amber, vanilla, and sandalwood.',
    price: 54.99,
    category: 'Home Fragrance',
    imageUrl: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04',
    featured: true,
    inventory: 40,
    createdAt: new Date('2023-02-10')
  },
  {
    id: '3',
    name: 'Artisan Ceramic Mug',
    description: 'Handmade ceramic mug with a minimalist design and comfortable handle.',
    price: 34.99,
    category: 'Kitchen & Dining',
    imageUrl: 'https://images.unsplash.com/photo-1472396961693-142e6e269027',
    featured: false,
    inventory: 15,
    createdAt: new Date('2023-03-05')
  },
  {
    id: '4',
    name: 'Premium Tea Collection Box',
    description: 'Curated collection of premium loose leaf teas from around the world.',
    price: 49.99,
    category: 'Food & Beverage',
    imageUrl: 'https://images.unsplash.com/photo-1466721591366-2d5fba72006d',
    featured: true,
    inventory: 30,
    createdAt: new Date('2023-03-20')
  }
];
