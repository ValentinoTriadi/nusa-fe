'use client';

import { LogOut } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { useLogout } from '@/hooks/api/use-auth';
import { ProfileData } from '@/types/page/profile';

import { Analytic } from './analytic';
import { BusinessInformation } from './business-information';
import { ProfileHeader } from './profile-header';
import { Statistic } from './statistic';

// Mock data for the profile
const profileData: ProfileData = {
  id: '1',
  name: 'CV. Maju Bersama',
  category: 'Produsen Makanan Olahan',
  rating: 4.8,
  reviewCount: 24,
  avatar: '/images/Hero.png',
  address: 'Jl. Raya Bogor No. 123, Depok',
  tags: ['Produsen Lokal Bersertifikat', 'Organik'],
  stats: {
    totalTransaksi: 156,
    mitraAktif: 23,
    kolaborasi: 12,
    rating: 4.8,
  },
  chartData: [
    { name: 'Item 1', value: 25, fill: '#DC2626' }, // red
    { name: 'Item 2', value: 16, fill: '#EA580C' }, // orange
    { name: 'Item 3', value: 20, fill: '#EAB308' }, // yellow
    { name: 'Item 4', value: 20, fill: '#16A34A' }, // green
    { name: 'Item 5', value: 10, fill: '#3B82F6' }, // blue
    { name: 'Item 6', value: 10, fill: '#9333EA' }, // purple
  ],
};

export const ProfileClient = () => {
  const logout = useLogout();
  const handleLogout = () => {
    try {
      logout.mutate();
    } catch (error) {
      console.log('Logout failed:', error);
    }
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

        {/* Logout */}
        <Button
          onClick={handleLogout}
          className="hover:bg-destructive/10 text-destructive w-full rounded-sm bg-white shadow-sm"
        >
          <LogOut />
          Keluar
        </Button>
      </div>
    </div>
  );
};
