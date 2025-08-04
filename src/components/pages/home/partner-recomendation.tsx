import { Star } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';

import { partnerData } from '@/constants/pages/home/partner';

import { PartnerCard } from './partner-card';

export const PartnerRecommendation = () => {
  return (
    <Card className="w-full max-w-md px-2 py-4">
      <CardContent className="flex flex-col gap-4 px-2">
        <div className="flex items-center gap-2">
          <Star className="h-5 w-5 text-orange-500" />
          <h2 className="text-lg font-semibold text-gray-800">
            Rekomendasi Mitra
          </h2>
        </div>

        <div className="space-y-2">
          {partnerData.map((partner, idx) => (
            <PartnerCard
              key={idx}
              foto="/logo.png"
              nama={partner.nama}
              deskripsi={partner.deskripsi}
              jarak={partner.jarak}
              persentase={partner.persentase}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
