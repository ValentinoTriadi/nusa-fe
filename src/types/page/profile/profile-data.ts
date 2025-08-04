export interface ProfileData {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviewCount: number;
  avatar: string;
  address: string;
  tags: string[];
  stats: {
    totalTransaksi: number;
    mitraAktif: number;
    kolaborasi: number;
    rating: number;
  };
  chartData: {
    name: string;
    value: number;
    fill: string;
  }[];
}
