import { ProductWithStore } from '@/api';

export interface ProductCardProps {
  product: ProductWithStore;
  isFavorited?: boolean;
  onToggleFavorite?: (_id: string) => void;
}
