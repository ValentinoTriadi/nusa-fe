import { Truck } from 'lucide-react';

import { Card } from '@/components/ui/card';

import { CheckoutShipping } from '@/types/page/checkout';

export const ShippingOptions = ({
  shipping,
  selectedShipping,
  setSelectedShipping,
}: {
  shipping: CheckoutShipping;
  selectedShipping: string;
  setSelectedShipping: (value: string) => void;
}) => {
  return (
    <div className="mb-0 border-t border-gray-200 p-4 py-6">
      <div className="mb-3 flex items-center gap-2">
        <Truck className="text-accent h-7 w-7" />
        <h2 className="text-xl font-semibold text-gray-900">
          Pilih Pengiriman
        </h2>
      </div>

      <div className="space-y-3">
        {shipping.options.map((option) => (
          <label
            key={option.id}
            className="flex cursor-pointer items-center justify-between rounded-lg border p-3 hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="shipping"
                value={option.id}
                checked={selectedShipping === option.id}
                onChange={(e) => setSelectedShipping(e.target.value)}
                className="h-4 w-4 text-orange-500"
              />
              <div>
                <p className="font-medium text-gray-900">{option.name}</p>
                <p className="text-sm text-gray-600">{option.description}</p>
              </div>
            </div>
            <span className="font-semibold text-gray-900">
              Rp {option.price.toLocaleString()}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};
