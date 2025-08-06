import { Package } from 'lucide-react';

import { Card } from '@/components/ui/card';

import { Product } from '@/types/page/product';

export const WholesalePricing = ({ product }: { product: Product }) => {
  return (
    <Card className="border-purple-200 bg-purple-50 p-4">
      <div className="flex items-center space-x-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-600">
          <Package className="h-5 w-5 text-white" />
        </div>
        <span className="font-semibold text-purple-900">Harga Grosir</span>
      </div>

      <div className="space-y-2">
        {product.wholesalePricing.map((tier, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-sm text-gray-700">
              {tier.min}-{tier.max} {product.unit}
            </span>
            <span className="font-semibold text-purple-900">
              Rp {tier.price.toLocaleString()}/{product.unit}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};
