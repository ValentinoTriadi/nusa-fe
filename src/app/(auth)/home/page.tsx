import Image from 'next/image';

import { ActionButton } from '@/components/pages/home/action-button';
import { ActiveCollaborations } from '@/components/pages/home/active-collaboration';
import { PartnerRecommendation } from '@/components/pages/home/partner-recomendation';
import { StatsCards } from '@/components/pages/home/stats-cards';

export default function HomePage() {
  const ownerName = 'Budi';
  const company = 'CV Maju Jaya';
  return (
    <div className="bg-background flex min-h-screen w-full flex-col items-center gap-8 overflow-y-scroll pt-0 pb-20">
      {/* Hero Section */}
      <div className="relative w-full max-w-md overflow-hidden rounded-br-3xl">
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
          <p className="text-lg opacity-90">{company}</p>
        </div>
      </div>

      <div className="flex w-full flex-col items-center gap-8 px-4">
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
}
