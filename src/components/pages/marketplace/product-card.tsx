import { Heart, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { ProductCardProps } from '@/types/page/marketplace';

export const ProductCard = ({
  id,
  name,
  seller,
  price,
  unit,
  minOrder,
  location,
  distance,
  image,
  isFavorited = false,
  onToggleFavorite,
}: ProductCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID').format(price);
  };

  return (
    <div className="cursor-pointer overflow-hidden rounded-lg bg-white shadow-xs transition-shadow hover:shadow-sm">
      <Link href={`/product/${id}`} className="group">
        <div className="flex gap-3 p-3">
          {/* Product Image */}
          <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg">
            <Image src={image} alt={name} fill className="object-cover" />
          </div>

          {/* Product Info */}
          <div className="min-w-0 flex-1 gap-1">
            <div className="flex items-start justify-between">
              <div className="min-w-0 flex-1">
                <h3 className="text-sm leading-tight font-semibold text-gray-900">
                  {name}
                </h3>
                <p className="text-xs text-gray-600">{seller}</p>
              </div>

              {/* Favorite Button */}
              <button
                onClick={() => onToggleFavorite?.(id)}
                className="ml-2 flex-shrink-0"
              >
                <Heart
                  size={20}
                  className={`transition-colors ${
                    isFavorited
                      ? 'fill-current text-red-500'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                />
              </button>
            </div>

            <div className="mt-1 flex items-center gap-2">
              {/* Price */}
              <p className="text-sm font-semibold text-[#FF5C00]">
                Rp {formatPrice(price)}/{unit}
              </p>

              {/* Min Order */}
              <p className="text-xs text-gray-500">• Min. {minOrder}</p>
            </div>

            {/* Location */}
            <div className="mt-1 flex items-center gap-1">
              <MapPin size={12} className="text-gray-400" />
              <p className="text-xs text-gray-500">
                {location}, {distance} km
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
