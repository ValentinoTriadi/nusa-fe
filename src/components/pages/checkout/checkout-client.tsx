'use client';

import {
  ChevronLeft,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

import { mockCheckoutData } from '@/constants/pages/checkout';

import { OrderSummary } from './order-summary';
import { PaymentMethods } from './payment-methods';
import { PaymentSummary } from './payment-summary';
import { ShippingAddress } from './shipping-address';
import { ShippingOptions } from './shipping-options';

// Mock data - replace with actual data from props or API

export const CheckoutClient = () => {
  const router = useRouter();
  const [selectedShipping, setSelectedShipping] = useState('local');
  const [selectedPayment, setSelectedPayment] = useState('qris');

  const handleConfirmOrder = () => {
    // Handle order confirmation
    console.log('Order confirmed');
  };

  const getSelectedShippingPrice = () => {
    const selected = mockCheckoutData.shipping.options.find(
      (option) => option.id === selectedShipping,
    );
    return selected?.price || 0;
  };

  const calculateTotal = () => {
    return (
      mockCheckoutData.summary.subtotal +
      getSelectedShippingPrice() +
      mockCheckoutData.summary.adminFee
    );
  };

  return (
    <div className="bg-background relative min-h-screen">
      {/* Header */}
      <div className="bg-background sticky top-0 z-20 flex w-full max-w-md flex-shrink-0 items-center justify-between px-4 py-6 shadow-md">
        <Button
          onClick={(e) => {
            e.preventDefault();
            router.back();
          }}
          className="text-foreground z-10 flex aspect-square items-center gap-2 rounded-full bg-transparent !p-2 shadow-none transition-colors duration-300 ease-in-out hover:bg-gray-200/50"
        >
          <ChevronLeft size={24} className="h-6 w-6" />
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
        <div className="h-8 w-8"></div>
      </div>

      <div className="space-y-6 p-4">
        {/* Shipping Address */}
        <ShippingAddress address={mockCheckoutData.address} />

        {/* Order Summary */}
        <OrderSummary orderItems={mockCheckoutData.orderItems} />

        {/* Shipping Options */}
        <ShippingOptions
          shipping={mockCheckoutData.shipping}
          selectedShipping={selectedShipping}
          setSelectedShipping={setSelectedShipping}
        />

        {/* Payment Methods */}
        <PaymentMethods
          payment={mockCheckoutData.payment}
          selectedPayment={selectedPayment}
          setSelectedPayment={setSelectedPayment}
        />

        {/* Payment Summary */}
        <PaymentSummary
          subtotal={mockCheckoutData.summary.subtotal}
          shippingCost={getSelectedShippingPrice()}
          adminFee={mockCheckoutData.summary.adminFee}
          total={calculateTotal()}
        />
      </div>

      {/* Fixed Bottom Bar */}
      <div className="sticky bottom-0 flex flex-col items-center bg-white p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <Button
          onClick={handleConfirmOrder}
          className="w-fit rounded-lg bg-orange-500 py-6 font-medium text-white hover:bg-orange-600"
        >
          Konfirmasi Pesanan • Rp {calculateTotal().toLocaleString()}
        </Button>
        <p className="mt-2 text-center text-xs text-gray-500">
          Dengan melanjutkan, Anda menyetujui syarat dan ketentuan
        </p>
      </div>
    </div>
  );
};
