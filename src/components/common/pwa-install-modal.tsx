'use client';

import { Download, Smartphone, X } from 'lucide-react';
import { useEffect, useState } from 'react';

import { usePWAInstall } from '@/hooks/use-pwa-install';

interface PWAInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PWAInstallModal = ({ isOpen, onClose }: PWAInstallModalProps) => {
  const { isInstallable, installApp } = usePWAInstall();
  const [isInstalling, setIsInstalling] = useState(false);

  const handleInstall = async () => {
    setIsInstalling(true);
    const success = await installApp();
    setIsInstalling(false);

    if (success) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black p-4">
      <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        {/* Icon */}
        <div className="mb-4 flex justify-center">
          <div className="bg-accent flex h-16 w-16 items-center justify-center rounded-full">
            <Smartphone className="h-8 w-8 text-white" />
          </div>
        </div>

        {/* Content */}
        <div className="text-center">
          <h2 className="mb-2 text-xl font-bold text-gray-900">
            Install Nusa App
          </h2>
          <p className="mb-6 text-gray-600">
            Install our app for a better experience! Access all features
            directly from your home screen.
          </p>

          {/* Features */}
          <div className="mb-6 space-y-2 text-left">
            <div className="flex items-center gap-3">
              <div className="bg-accent h-2 w-2 rounded-full"></div>
              <span className="text-sm text-gray-700">Works offline</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-accent h-2 w-2 rounded-full"></div>
              <span className="text-sm text-gray-700">Fast loading</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-accent h-2 w-2 rounded-full"></div>
              <span className="text-sm text-gray-700">Push notifications</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 rounded-lg border border-gray-300 py-3 font-medium text-gray-700 hover:bg-gray-50"
            >
              Maybe Later
            </button>
            {isInstallable ? (
              <button
                onClick={handleInstall}
                disabled={isInstalling}
                className="bg-accent flex flex-1 items-center justify-center gap-2 rounded-lg py-3 font-medium text-white hover:bg-orange-600 disabled:opacity-50"
              >
                {isInstalling ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Installing...
                  </>
                ) : (
                  <>
                    <Download size={16} />
                    Install
                  </>
                )}
              </button>
            ) : (
              <div className="flex-1 rounded-lg bg-gray-100 py-3 text-center font-medium text-gray-400">
                Not Available
              </div>
            )}
          </div>
        </div>

        {/* Manual Install Instructions for iOS */}
        <div className="mt-4 rounded-lg bg-gray-50 p-3">
          <p className="text-xs text-gray-600">
            <strong>iOS Users:</strong> Tap the share button in Safari and
            select "Add to Home Screen"
          </p>
        </div>
      </div>
    </div>
  );
};
