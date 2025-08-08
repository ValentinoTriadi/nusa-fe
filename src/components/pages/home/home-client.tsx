'use client';

import Image from 'next/image';

import { Loading } from '@/components/common/loading';

import { useAuth } from '@/hooks/api/use-auth';

import { ActionButton } from './action-button';
import { ActiveCollaborations } from './active-collaboration';
import { PartnerRecommendation } from './partner-recomendation';
import { StatsCards } from './stats-cards';

export const HomeClient = () => {
  const { user, company, isLoading } = useAuth();

  // Show loading state while checking session
  if (isLoading) {
    return (
      <div className="bg-background flex min-h-screen w-full flex-col items-center justify-center">
        <Loading />
      </div>
    );
  }

  const ownerName = user?.name || 'Owner';
  const companyName = company?.storeName || 'Perusahaan Anda';

  return (
    <div className="bg-background flex h-screen w-full flex-col items-center gap-8 overflow-y-scroll pt-0 pb-20">
      <div className="flex w-full flex-col items-center gap-8 px-4">
        <div className="relative flex w-screen max-w-md overflow-hidden rounded-br-[50px]">
          <Image
            src="/images/Hero.png"
            alt="Workshop background"
            width={1920}
            height={1080}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute bottom-6 left-6 text-white">
            <h1 className="mb-1 text-3xl font-semibold">
              Selamat Pagi, {ownerName}
            </h1>
            <p className="text-lg opacity-90">{companyName}</p>
          </div>
        </div>
        {/* Stats Cards */}
        <StatsCards mitra={12} transaksi={8} kolaborasi={3} />
        {/* Action Buttons */}
        <ActionButton />
        {/* Partner Recommendations */}
        <PartnerRecommendation />
        {/* Active Collaborations */}
        <ActiveCollaborations />
      </div>
    </div>
  );
};
