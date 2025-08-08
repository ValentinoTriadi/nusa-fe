import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';

import { WholesalePrice } from '@/api';

export const BottomBar = ({
  quantity,
  total,
  regularPrice,
  currentPrice,
  wholesaleTiers,
  unit,
}: {
  quantity: number;
  total: number;
  regularPrice?: number;
  currentPrice?: number;
  wholesaleTiers?: WholesalePrice[];
  unit: string;
}) => {
  // Calculate savings if wholesale price is different from regular price
  const savings =
    regularPrice && currentPrice && regularPrice > currentPrice
      ? (regularPrice - currentPrice) * quantity
      : 0;

  // Find next wholesale tier that user can upgrade to
  const getNextTierIncentive = () => {
    if (!wholesaleTiers || !regularPrice) return null;

    // Find current tier
    const currentTier = wholesaleTiers.find(
      (tier) => quantity >= tier.minQuantity && quantity <= tier.maxQuantity,
    );

    if (!currentTier) return null;

    // Find next tier with better price
    const nextTier = wholesaleTiers.find(
      (tier) => tier.minQuantity > quantity && tier.price < currentTier.price,
    );

    if (!nextTier) return null;

    const quantityNeeded = nextTier.minQuantity - quantity;
    const nextTierTotalCost = nextTier.minQuantity * nextTier.price;
    const potentialSavings =
      nextTier.minQuantity * regularPrice - nextTierTotalCost;

    return {
      quantityNeeded,
      nextTierMin: nextTier.minQuantity,
      potentialSavings,
      nextTierPrice: nextTier.price,
    };
  };

  const nextTierIncentive = getNextTierIncentive();

  return (
    <div className="right-0 bottom-0 left-0 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
      {/* Next Tier Incentive Card */}
      {nextTierIncentive && (
        <div className="border border-orange-200 bg-gradient-to-r from-orange-50 to-red-50 px-4 py-2">
          <div className="text-sm text-orange-700">
            <p className="mb-1">
              <span className="font-medium">
                Kurang {nextTierIncentive.quantityNeeded} {unit} lagi
              </span>{' '}
              untuk hemat{' '}
              <span className="font-bold text-green-600">
                Rp {nextTierIncentive.potentialSavings.toLocaleString()}
              </span>
            </p>
            <p className="text-xs text-orange-600">
              Beli {nextTierIncentive.nextTierMin} {unit} dengan harga Rp{' '}
              {nextTierIncentive.nextTierPrice.toLocaleString()}/{unit}
            </p>
          </div>
        </div>
      )}

      {/* Main Bottom Bar */}
      <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-col">
          <div className="flex items-center justify-between gap-2">
            <h1 className="text-lg font-semibold">
              Total: Rp {total.toLocaleString()}
            </h1>
            {savings > 0 && (
              <div className="rounded-full bg-green-100 px-2">
                <span className="text-xs font-medium text-green-700">
                  Hemat Rp {savings.toLocaleString()}
                </span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <p>
              {quantity} {unit}
            </p>
            •{savings > 0 ? <p>Harga Grosir</p> : <p>Harga Reguler</p>}
          </div>
        </div>
        <div className="flex gap-3 text-xs">
          <button className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3">
            <ShoppingCart className="h-4 w-4" />
            Keranjang
          </button>
          <Link
            href={'/checkout'}
            className="flex-1 rounded-lg bg-orange-500 px-4 py-3 text-center font-medium text-white"
          >
            Beli Sekarang
          </Link>
        </div>
      </div>
    </div>
  );
};
