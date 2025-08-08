import { MapPin, Star } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { Store } from '@/api';

export const ShopInformation = ({ shop }: { shop?: Store }) => {
  return (
    <div className="flex flex-col space-y-2 border-y border-gray-300 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-200">
            <div className="h-8 w-8 rounded-full bg-purple-400"></div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{shop?.storeName}</h3>
            <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
              Verified
            </span>
          </div>
        </div>
        <Button
          variant="outline"
          className="rounded-sm !bg-white !p-2 text-sm shadow-sm hover:shadow-md"
        >
          Lihat Toko
        </Button>
      </div>
      <div className="flex items-center space-x-4 text-sm">
        <div className="flex items-center space-x-1">
          <Star className="h-5 w-5 fill-orange-400 text-orange-400" />
          {/* TODO: Implement rating display */}
          <span className="font-semibold">4.8</span>
          <span className="text-gray-500">(24 ulasan)</span>
        </div>
        <p>•</p>
        <div className="flex items-center space-x-1 text-gray-600">
          <MapPin className="h-4 w-4" />
          <span className="">
            {shop?.city}, {shop?.province}
          </span>
        </div>
      </div>
    </div>
  );
};
