import { Info, MapPin } from 'lucide-react';

import { ProfileData } from '@/types/page/profile';

export const BusinessInformation = (profileData: ProfileData) => {
  return (
    <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100">
          <Info size={20} className="text-orange-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">
          Informasi Bisnis
        </h2>
      </div>

      {/* Address */}
      <div className="mb-4 flex items-start gap-3">
        <MapPin size={16} className="mt-1 flex-shrink-0 text-gray-400" />
        <p className="text-sm text-gray-600">{profileData.address}</p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {profileData.tags.map((tag, index) => (
          <span
            key={index}
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              index === 0
                ? 'bg-orange-100 text-orange-700'
                : 'bg-green-100 text-green-700'
            }`}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};
