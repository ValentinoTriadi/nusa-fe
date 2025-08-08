'use client';

import { ChevronLeft, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';

import { Loading } from '@/components/common/loading';
import { Button } from '@/components/ui/button';

import { useProductDetailQuery } from '@/hooks/api/use-product';

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

// TODO: Change it
const shippingCost = 20000; // Example shipping cost
const adminFee = 5000; // Example admin fee

export const ProductDetailClient = ({ id }: ProductDetailClientProps) => {
  const router = useRouter();
  const [quantity, setQuantity] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const { data, isLoading } = useProductDetailQuery(id);

  if (isLoading) {
    return (
      <div className="bg-background flex min-h-screen w-full flex-col items-center justify-center">
        <Loading />
      </div>
    );
  }

  const product = data?.data?.data;

  // Calculate pricing based on quantity
  const getCurrentPrice = () => {
    const pricing = product?.wholesalePrices?.find(
      (tier) => quantity >= tier.minQuantity && quantity <= tier.maxQuantity,
    );
    return pricing?.price || product?.price || 0;
  };

  const subtotal = getCurrentPrice() * quantity;
  const total = subtotal + shippingCost + adminFee;

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
      <ProductImageCarousel images={product?.imageUrls || []} />

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
        <ShopInformation shop={product?.store} />

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
          otherFee={[
            {
              title: 'Estimasi Ongkir',
              cost: shippingCost,
            },
            {
              title: 'Biaya Admin',
              cost: adminFee,
            },
          ]}
          total={total}
        />
      </div>

      <BottomBar
        quantity={quantity}
        total={total}
        regularPrice={product?.price}
        currentPrice={getCurrentPrice()}
        wholesaleTiers={product?.wholesalePrices}
        unit={product?.unit || 'kg'}
      />
    </div>
  );
};
