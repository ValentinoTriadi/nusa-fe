import { TrendingUp } from 'lucide-react';

import { ProfileData } from '@/types/page/profile';

export const Statistic = (profileData: ProfileData) => {
  return (
    <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100">
          <TrendingUp size={20} className="text-orange-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Statistik</h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-background rounded-lg py-5 text-center">
          <div className="text-2xl font-bold text-purple-600">
            {profileData.stats.totalTransaksi}
          </div>
          <div className="text-sm text-gray-600">Total Transaksi</div>
        </div>

        <div className="bg-background rounded-lg py-5 text-center">
          <div className="text-2xl font-bold text-orange-600">
            {profileData.stats.mitraAktif}
          </div>
          <div className="text-sm text-gray-600">Mitra Aktif</div>
        </div>

        <div className="bg-background rounded-lg py-5 text-center">
          <div className="text-2xl font-bold text-green-600">
            {profileData.stats.kolaborasi}
          </div>
          <div className="text-sm text-gray-600">Kolaborasi</div>
        </div>

        <div className="bg-background rounded-lg py-5 text-center">
          <div className="text-2xl font-bold text-blue-600">
            {profileData.stats.rating}
          </div>
          <div className="text-sm text-gray-600">Rating</div>
        </div>
      </div>
    </div>
  );
};
