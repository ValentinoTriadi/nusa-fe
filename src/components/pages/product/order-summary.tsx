import { Card } from '@/components/ui/card';

import { ProductWithStore } from '@/api';

export const OrderSummary = ({
  quantity,
  product,
  subtotal,
  otherFee,
  total,
}: {
  quantity: number;
  product?: ProductWithStore;
  subtotal: number;
  otherFee: {
    title: string;
    cost: number;
  }[];
  total: number;
}) => {
  return (
    <Card className="bg-gray-50 p-4">
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>
            Subtotal ({quantity} {product?.unit})
          </span>
          <span className="font-semibold">Rp {subtotal.toLocaleString()}</span>
        </div>
        {otherFee.map((f, idx) => (
          <div key={idx} className="flex justify-between text-sm text-gray-600">
            <span>{f.title}</span>
            <span>Rp {f.cost.toLocaleString()}</span>
          </div>
        ))}
        <hr className="my-2" />
        <div className="text-accent flex justify-between text-lg font-bold">
          <span className="text-foreground">Total</span>
          <span>Rp {total.toLocaleString()}</span>
        </div>
      </div>
    </Card>
  );
};
