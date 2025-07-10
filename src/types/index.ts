export interface Product {
  id: string;
  name: string;
  amount: number;
  rate: number;
  status: 'Available' | 'Out of Stock' | 'Limited';
  miles: number;
  text: string;
  orders: number;
  types: string;
  category: 'Travel' | 'Electronics' | 'Cars' | 'House & Furniture' | 'Beverage';
  subcategory?: 'Flights' | 'Hotels' | 'House Rent' | 'House Sale' | 'Furniture' | 'Decoration' | 'Smartphones' | 'Laptops' | 'Gadgets' | 'Luxury Cars' | 'Electric Cars' | 'Car Rental' | 'Alcohol' | 'Non-Alcohol';
  image?: string;
}

export interface User {
  id: string;
  name: string;
  miles: number;
}

export interface Bonus {
  id: string;
  name: string;
  description: string;
  milesRequired: number;
  discount: number;
  type: 'discount' | 'free_item';
}

export interface CartItem {
  productId: string;
  name: string;
  amount: number;
  quantity: number;
  total: number;
  miles: number;
  image?: string;
  category: Product['category'];
}

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  totalMiles: number;
  date: string;
  status: 'completed' | 'pending' | 'cancelled';
}