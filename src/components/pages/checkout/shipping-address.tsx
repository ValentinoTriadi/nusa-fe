import { MapPin } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

import { CheckoutAddress } from '@/types/page/checkout';

export const ShippingAddress = ({ address }: { address: CheckoutAddress }) => {
  return (
    <div className="mb-0 border-t border-gray-200 p-4 py-6">
      <div className="mb-3 flex items-center gap-2">
        <MapPin className="text-accent h-7 w-7" />
        <h2 className="text-xl font-semibold text-gray-900">
          Alamat Pengiriman
        </h2>
      </div>

      <div className="flex flex-col gap-2">
        <div className="rounded-lg bg-gray-200 p-3">
          <h3 className="font-medium text-gray-900">{address.name}</h3>
          <p className="mt-1 text-sm text-gray-600">{address.street}</p>
          <p className="text-sm text-gray-600">{address.phone}</p>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="w-fit border border-gray-200 text-sm shadow-none"
        >
          Ubah Alamat
        </Button>
      </div>
    </div>
  );
};
