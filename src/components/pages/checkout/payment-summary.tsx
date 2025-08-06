import { Banknote } from 'lucide-react';

import { Card } from '@/components/ui/card';

import { mockCheckoutData } from '@/constants/pages/checkout';

export const PaymentSummary = ({
  total,
  shippingCost,
  adminFee,
  subtotal,
}: {
  total: number;
  shippingCost: number;
  adminFee: number;
  subtotal: number;
}) => {
  return (
    <Card className="p-4">
      <div className="flex items-center gap-2">
        <Banknote className="text-accent h-7 w-7" />
        <h2 className="text-2xl font-semibold text-gray-900">
          Rincian Pembayaran
        </h2>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">Rp {subtotal.toLocaleString()}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Ongkos kirim</span>
          <span className="font-medium">
            Rp {shippingCost.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Biaya admin</span>
          <span className="font-medium">Rp {adminFee.toLocaleString()}</span>
        </div>

        <hr className="my-3" />

        <div className="flex justify-between text-lg">
          <span className="font-semibold text-gray-900">Total</span>
          <span className="font-bold text-orange-600">
            Rp {total.toLocaleString()}
          </span>
        </div>
      </div>
    </Card>
  );
};
