export interface ProductCardProps {
  id: string;
  name: string;
  seller: string;
  price: number;
  unit: string;
  minOrder: string;
  location: string;
  distance: number;
  image: string;
  isFavorited?: boolean;
  onToggleFavorite?: (_id: string) => void;
}
