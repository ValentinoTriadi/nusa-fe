'use client';

import { ChevronLeft, Heart, Package, ShoppingCart, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

import { BottomBar } from './bottom-bar';
import { OrderQuantity } from './order-quantity';
import { OrderSummary } from './order-summary';
import { ProductImageCarousel } from './product-image-carousel';
import { ProductInfo } from './product-info';
import { ShopInformation } from './shop-information';
import { WholesalePricing } from './wholesale-pricing';

interface ProductDetailClientProps {
  id: string;
}

// Mock product data - replace with API call
const getProductData = (id: string) => ({
  id,
  name: 'Tepung Singkong',
  description:
    'Gula aren organik premium dari petani lokal Bogor. Diproses secara tradisional tanpa bahan kimia, memberikan rasa manis alami yang sempurna untuk berbagai produk makanan dan minuman.',
  images: ['/images/Hero.png', '/logo.png', '/images/Hero.png'],
  basePrice: 12000,
  unit: 'kg',
  minOrder: 50,
  maxStock: 2500,
  shop: {
    rating: 4.8,
    reviewCount: 24,
    name: 'Berkah Jaya',
    location: 'Bogor',
    distance: 12,
  },
  wholesalePricing: [
    { min: 50, max: 99, price: 12000 },
    { min: 100, max: 499, price: 10000 },
    { min: 500, max: 999, price: 8000 },
  ],
  shippingCost: 20000,
  adminFee: 5000,
});

export const ProductDetailClient = ({ id }: ProductDetailClientProps) => {
  const router = useRouter();
  const [quantity, setQuantity] = useState(50);
  const [isFavorite, setIsFavorite] = useState(false);

  const product = getProductData(id);

  // Calculate pricing based on quantity
  const getCurrentPrice = () => {
    const pricing = product.wholesalePricing.find(
      (tier) => quantity >= tier.min && quantity <= tier.max,
    );
    return pricing?.price || product.basePrice;
  };

  const subtotal = getCurrentPrice() * quantity;
  const total = subtotal + product.shippingCost + product.adminFee;

  return (
    <div className="bg-background relative min-h-screen">
      {/* Header */}
      <div className="bg-background sticky top-0 z-20 flex w-full max-w-md flex-shrink-0 items-center justify-between px-4 py-6">
        <Button
          onClick={(e) => {
            e.preventDefault();
            router.back();
          }}
          className="text-foreground z-10 flex aspect-square items-center gap-2 rounded-full bg-transparent !p-2 shadow-none transition-colors duration-300 ease-in-out hover:bg-gray-200/50"
        >
          <ChevronLeft size={24} className="h-6 w-6" />
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">Detail Produk</h1>
        <Link
          href={'/cart'}
          className="text-foreground z-10 flex aspect-square cursor-pointer items-center gap-2 rounded-full !p-2 transition-colors duration-300 ease-in-out hover:bg-gray-200/50"
        >
          <ShoppingCart size={20} className="h-5 w-5" />
        </Link>
      </div>

      {/* Product Images Carousel */}
      <ProductImageCarousel images={product.images} />

      {/* Product Options */}
      <div className="space-y-6 p-4">
        {/* Product Info */}
        <ProductInfo
          product={product}
          isFavorite={isFavorite}
          setIsFavorite={setIsFavorite}
          getCurrentPrice={getCurrentPrice}
        />

        {/* Wholesale Pricing */}
        <WholesalePricing product={product} />

        {/* Rating and Reviews */}
        <ShopInformation shop={product.shop} />

        {/* Quantity Selector */}
        <OrderQuantity
          quantity={quantity}
          setQuantity={setQuantity}
          product={product}
        />

        {/* Order Summary */}
        <OrderSummary
          quantity={quantity}
          product={product}
          subtotal={subtotal}
          total={total}
        />
      </div>

      <BottomBar
        quantity={quantity}
        total={total}
        regularPrice={product.wholesalePricing[0]?.price}
        currentPrice={getCurrentPrice()}
        wholesaleTiers={product.wholesalePricing}
      />
    </div>
  );
};
