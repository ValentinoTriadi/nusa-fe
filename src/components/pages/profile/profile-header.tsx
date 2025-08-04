import { Star } from 'lucide-react';
import Image from 'next/image';

import { ProfileData } from '@/types/page/profile';

export const ProfileHeader = (profileData: ProfileData) => {
  return (
    <div className="rounded-br-3xl bg-gradient-to-br from-purple-500 to-purple-900 p-6 text-white">
      <div className="flex items-center gap-4">
        {/* Profile Image */}
        <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-white/20">
          <Image
            src={profileData.avatar}
            alt={profileData.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Profile Info */}
        <div className="flex-1">
          <h1 className="text-xl font-bold text-white">{profileData.name}</h1>
          <p className="mb-2 text-sm text-purple-100">{profileData.category}</p>

          {/* Rating */}
          <div className="flex items-center gap-1">
            <Star size={20} className="text-accent" />
            <span className="font-medium text-white">
              {profileData.rating} ({profileData.reviewCount} ulasan)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
