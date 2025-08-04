import { Card, CardContent } from '@/components/ui/card';

import { StatsCardsProps } from '@/types/page/home/stats-cards';

export const StatsCards = ({
  mitra,
  transaksi,
  kolaborasi,
}: StatsCardsProps) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-3 gap-3">
        <Card className="border-0 bg-purple-100 py-0">
          <CardContent className="p-4 text-center">
            <div className="mb-1 text-3xl font-bold text-purple-600">
              {mitra}
            </div>
            <div className="text-sm text-purple-700">Mitra Aktif</div>
          </CardContent>
        </Card>
        <Card className="border-0 bg-orange-100 py-0">
          <CardContent className="p-4 text-center">
            <div className="mb-1 text-3xl font-bold text-orange-600">
              {transaksi}
            </div>
            <div className="text-sm text-orange-700">Transaksi</div>
          </CardContent>
        </Card>
        <Card className="border-0 bg-purple-100 py-0">
          <CardContent className="p-4 text-center">
            <div className="mb-1 text-3xl font-bold text-purple-600">
              {kolaborasi}
            </div>
            <div className="text-sm text-purple-700">Kolaborasi</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
