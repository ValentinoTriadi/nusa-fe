import { Heart } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { ProductWithStore } from '@/api';

interface ProductInfoProps {
  product?: ProductWithStore;
  isFavorite: boolean;
  setIsFavorite: (_value: boolean) => void;
  getCurrentPrice: () => number;
}

export const ProductInfo = ({
  product,
  isFavorite,
  setIsFavorite,
  getCurrentPrice,
}: ProductInfoProps) => {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">{product?.name}</h2>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsFavorite(!isFavorite)}
          className="h-8 w-8 rounded-full !bg-white shadow-sm"
        >
          <Heart
            className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-foreground'}`}
          />
        </Button>
      </div>
      <p className="text-foreground mt-2 text-sm leading-relaxed">
        {product?.description}
      </p>
      <div className="text-accent text-2xl font-bold">
        Rp {getCurrentPrice().toLocaleString()}
        <span className="text-foreground text-sm">/{product?.unit}</span>
      </div>
      <div className="text-xs text-gray-500">
        Min. {product?.wholesalePrices?.[0].minQuantity.toLocaleString() || 0}{' '}
        {product?.unit} • Tersedia: {product?.stock.toLocaleString()}{' '}
        {product?.unit}
      </div>
    </div>
  );
};
