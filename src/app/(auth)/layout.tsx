import React from 'react';

import { Navbar } from '@/components/common/navbar';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex h-screen items-center justify-center overflow-y-scroll bg-gray-200">
      <div className="bg-background w-full max-w-md">
        {children}
        <Navbar />
      </div>
    </div>
  );
}
