import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';

import { Product } from '@/types/page/product';

interface OrderQuantityProps {
  quantity: number;
  setQuantity: (_value: number) => void;
  product: Product;
}

export const OrderQuantity = ({
  quantity,
  setQuantity,
  product,
}: OrderQuantityProps) => {
  const [inputValue, setInputValue] = useState(quantity.toString());
  const [isFocused, setIsFocused] = useState(false);

  // Sync input value when quantity changes from outside (e.g., +/- buttons)
  useEffect(() => {
    if (!isFocused) {
      setInputValue(quantity.toString());
    }
  }, [quantity, isFocused]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Allow empty input or valid numbers while typing
    if (value === '' || /^\d+$/.test(value)) {
      setInputValue(value);

      // Only update quantity if it's a valid number that makes sense
      const numValue = parseInt(value);
      if (!isNaN(numValue) && numValue >= product.minOrder) {
        // Update quantity immediately if it's within valid range
        const clampedValue = Math.min(product.maxStock, numValue);
        setQuantity(clampedValue);
      }
      // If value is below minimum, don't update quantity yet
      // This allows typing intermediate values like "9" for "95"
    }
  };

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);

    // Apply validation when user leaves the input
    const numValue = parseInt(inputValue) || 0;
    const clampedValue = Math.max(
      product.minOrder,
      Math.min(product.maxStock, numValue),
    );

    setQuantity(clampedValue);
    setInputValue(clampedValue.toString());
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Apply validation when user presses Enter
    if (e.key === 'Enter') {
      handleInputBlur();
      (e.target as HTMLInputElement).blur();
    }
  };

  return (
    <div className="flex w-full items-center">
      <label className="text-foreground w-full font-medium">
        Jumlah Pesanan
      </label>
      <div className="flex w-full items-center space-x-4">
        <Button
          variant="outline"
          className="aspect-square rounded-sm !bg-white !p-2 shadow-sm disabled:opacity-30"
          onClick={() => setQuantity(Math.max(product.minOrder, quantity - 10))}
          disabled={quantity <= product.minOrder}
        >
          -
        </Button>
        <div className="flex-1">
          <input
            type="text"
            inputMode="numeric"
            value={inputValue}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onKeyDown={handleInputKeyDown}
            className="w-full [appearance:textfield] rounded-lg border p-2 text-center [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            placeholder={`Min ${product.minOrder}`}
          />
        </div>
        <Button
          variant="outline"
          className="aspect-square rounded-sm !bg-white !p-2 shadow-sm"
          onClick={() => setQuantity(Math.min(product.maxStock, quantity + 10))}
          disabled={quantity >= product.maxStock}
        >
          +
        </Button>
      </div>
    </div>
  );
};
