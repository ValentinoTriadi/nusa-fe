import { ScrollText } from 'lucide-react';
import Image from 'next/image';

import { CheckoutOrderItem } from '@/types/page/checkout';

export const OrderSummary = ({
  orderItems,
}: {
  orderItems: CheckoutOrderItem[];
}) => {
  return (
    <div className="mb-0 border-t border-gray-200 p-4 py-6">
      <div className="mb-3 flex items-center gap-2">
        <ScrollText className="text-accent h-7 w-7" />
        <h2 className="text-xl font-semibold text-gray-900">
          Alamat Pengiriman
        </h2>
      </div>
      {orderItems.map((item) => (
        <div key={item.id} className="flex gap-3">
          <div className="relative h-16 w-16 overflow-hidden rounded-lg">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex-1">
            <h3 className="font-medium text-gray-900">{item.name}</h3>
            <p className="text-sm text-gray-600">{item.description}</p>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-sm text-gray-600">
                Rp {item.price.toLocaleString()}/{item.unit} × {item.quantity}{' '}
                {item.unit}
              </span>
              <span className="font-semibold text-gray-900">
                Rp {item.subtotal.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
