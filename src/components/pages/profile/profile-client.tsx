'use client';

import { LogOut } from 'lucide-react';

import { Loading } from '@/components/common/loading';
import { Button } from '@/components/ui/button';

import { useLogout } from '@/hooks/api/use-auth';
import { useUser } from '@/hooks/use-session-data';
import { ProfileData } from '@/types/page/profile';

import { Analytic } from './analytic';
import { BusinessInformation } from './business-information';
import { ProfileHeader } from './profile-header';
import { Statistic } from './statistic';
import { UserInformation } from './user-information';

export const ProfileClient = () => {
  const { user, isLoading } = useUser();
  const logout = useLogout();

  const handleLogout = () => {
    try {
      logout.mutate();
    } catch (error) {
      console.log('Logout failed:', error);
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="bg-background flex min-h-screen w-full items-center justify-center">
        <Loading />
      </div>
    );
  }

  // Show error state if no user
  if (!user) {
    return (
      <div className="bg-background flex min-h-screen w-full items-center justify-center">
        <div className="text-center">
          <p className="text-destructive">Unable to load profile</p>
          <Button onClick={() => window.location.reload()} className="mt-2">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  // Create profile data from user session data
  const profileData: ProfileData = {
    id: user.id,
    name: user.storeName || user.name,
    category: user.businessType || 'Business',
    rating: 4.8, // TODO: Get from API when available
    reviewCount: 24, // TODO: Get from API when available
    avatar: user.image || '/images/Hero.png',
    address: `${user.address}, ${user.city}, ${user.province}`,
    tags: ['Verified Business', user.businessType], // TODO: Get from API when available
    stats: {
      totalTransaksi: 156, // TODO: Get from API when available
      mitraAktif: 23, // TODO: Get from API when available
      kolaborasi: 12, // TODO: Get from API when available
      rating: 4.8, // TODO: Get from API when available
    },
    chartData: [
      { name: 'Item 1', value: 25, fill: '#DC2626' }, // red
      { name: 'Item 2', value: 16, fill: '#EA580C' }, // orange
      { name: 'Item 3', value: 20, fill: '#EAB308' }, // yellow
      { name: 'Item 4', value: 20, fill: '#16A34A' }, // green
      { name: 'Item 5', value: 10, fill: '#3B82F6' }, // blue
      { name: 'Item 6', value: 10, fill: '#9333EA' }, // purple
    ], // TODO: Get from API when available
  };

  return (
    <div className="bg-background flex min-h-screen w-full flex-col pb-16">
      {/* Header Section with Purple Background */}
      <ProfileHeader {...profileData} />

      {/* Content */}
      <div className="flex-1 space-y-4 p-4">
        {/* Business Information */}
        <BusinessInformation {...profileData} />

        {/* Statistics */}
        <Statistic {...profileData} />

        {/* Analytics Chart */}
        <Analytic {...profileData} />

        {/* User Information */}
        <UserInformation user={user} />

        {/* Logout */}
        <Button
          onClick={handleLogout}
          disabled={logout.isPending}
          className="hover:bg-destructive/10 text-destructive w-full rounded-sm bg-white shadow-sm"
        >
          <LogOut />
          {logout.isPending ? 'Logging out...' : 'Keluar'}
        </Button>
      </div>
    </div>
  );
};
