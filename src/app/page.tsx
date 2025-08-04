'use client';

import { ArrowBigDown } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { PWAInstallModal } from '@/components/common/pwa-install-modal';

import { usePWAInstall } from '@/hooks/use-pwa-install';

export default function LandingPage() {
  const [showPWAModal, setShowPWAModal] = useState(false);
  const { isInstallable, isInstalled } = usePWAInstall();

  useEffect(() => {
    // Show PWA modal after 2 seconds if app is installable and not already installed
    const timer = setTimeout(() => {
      if (isInstallable && !isInstalled) {
        setShowPWAModal(true);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [isInstallable, isInstalled]);
  return (
    <div className="flex h-screen items-center justify-center bg-gray-200">
      <div className="bg-background flex h-screen w-full max-w-md flex-col items-center justify-center">
        <div className="h-[35%] w-full bg-[url('/images/main-top.png')] bg-cover bg-center">
          <div className="flex h-full items-end justify-end py-10 pr-12 pl-4">
            <h2 className="text-2xl font-bold text-white">
              Beli bahan baku lokal dengan harga lebih murah?
            </h2>
          </div>
        </div>
        <div className="flex h-[65%] w-full">
          <div className="h-full w-full">
            <div className="bg-accent flex h-[40%] w-full items-center justify-center">
              <h1 className="font-family-literata flex w-full items-center justify-center text-center text-5xl leading-none font-normal text-white">
                Nusa
              </h1>
            </div>
            <div className="h-[60%] w-full bg-[url('/images/main-bottom-left.png')] bg-cover bg-center">
              <div className="flex h-full items-end justify-end p-2 pl-20">
                <h2 className="text-end text-lg leading-tight font-bold text-white">
                  Gabung di komunitas usaha lokal?
                </h2>
              </div>
            </div>
          </div>
          <div className="h-full w-full">
            <div className="flex h-[60%] w-full items-center justify-center bg-[url('/images/main-bottom-right.png')] bg-cover bg-center">
              <div className="flex h-full items-start justify-end py-4 pr-2 pl-10">
                <h2 className="text-end text-lg leading-tight font-bold text-white">
                  Kolaborasi dengan usaha lokal{' '}
                  <span className="whitespace-nowrap">se-Indonesia?</span>
                </h2>
              </div>
            </div>
            <div className="bg-accent h-[40%] w-full">
              <div className="flex h-full flex-col items-end justify-start gap-5 p-4 pl-10">
                <Link href={'/auth/login'}>
                  <h2 className="text-md cursor-pointer text-end leading-tight font-medium text-white">
                    Klik untuk mulai sekarang →
                  </h2>
                </Link>
                <ArrowBigDown
                  className="rotate-180 animate-bounce text-white"
                  width={48}
                  height={48}
                />
              </div>
            </div>
          </div>
        </div>

        {/* PWA Install Modal */}
        <PWAInstallModal
          isOpen={showPWAModal}
          onClose={() => setShowPWAModal(false)}
        />
      </div>
    </div>
  );
}
