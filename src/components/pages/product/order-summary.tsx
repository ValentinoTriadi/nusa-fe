import { Card } from '@/components/ui/card';

import { Product } from '@/types/page/product';

export const OrderSummary = ({
  quantity,
  product,
  subtotal,
  total,
}: {
  quantity: number;
  product: Product;
  subtotal: number;
  total: number;
}) => {
  return (
    <Card className="bg-gray-50 p-4">
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>
            Subtotal ({quantity} {product.unit})
          </span>
          <span className="font-semibold">Rp {subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Estimasi ongkir</span>
          <span>Rp {product.shippingCost.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Biaya admin escrow</span>
          <span>Rp {product.adminFee.toLocaleString()}</span>
        </div>
        <hr className="my-2" />
        <div className="text-accent flex justify-between text-lg font-bold">
          <span className="text-foreground">Total</span>
          <span>Rp {total.toLocaleString()}</span>
        </div>
      </div>
    </Card>
  );
};
