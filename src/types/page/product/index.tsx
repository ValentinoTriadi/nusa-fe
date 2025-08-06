export interface Product {
  id: string;
  name: string;
  description: string;
  images: string[];
  basePrice: number;
  unit: string;
  minOrder: number;
  maxStock: number;
  shop: Shop;
  wholesalePricing: { min: number; max: number; price: number }[];
  shippingCost: number;
  adminFee: number;
}

export interface Shop {
  rating: number;
  reviewCount: number;
  name: string;
  location: string;
  distance: number;
}
