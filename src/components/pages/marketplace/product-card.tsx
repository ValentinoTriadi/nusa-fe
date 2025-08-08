import { Heart, MapPin } from 'lucide-react';
import Image from 'next/image';
import image from 'next/image';
import Link from 'next/link';
import { id } from 'zod/v4/locales';

import { ProductCardProps } from '@/types/page/marketplace';

export const ProductCard = ({
  product,
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
            <Image
              src={product.imageUrls[0]}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="min-w-0 flex-1 gap-1">
            <div className="flex items-start justify-between">
              <div className="min-w-0 flex-1">
                <h3 className="text-sm leading-tight font-semibold text-gray-900">
                  {product.name}
                </h3>
                <p className="text-xs text-gray-600">
                  {product.store?.storeName}
                </p>
              </div>

              {/* Favorite Button */}
              <button
                onClick={() => onToggleFavorite?.(product.id)}
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
                Rp {formatPrice(product.price)}/{product.unit}
              </p>

              {/* Min Order */}
              <p className="text-xs text-gray-500">
                • Min. {product.wholesalePrices?.[0].minQuantity} {product.unit}
              </p>
            </div>

            {/* Location */}
            <div className="mt-1 flex items-center gap-1">
              <MapPin size={12} className="text-gray-400" />
              <p className="text-xs text-gray-500">
                {product.store?.city}, {product.store?.province}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
