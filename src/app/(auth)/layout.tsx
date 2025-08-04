import React from 'react';

import { Navbar } from '@/components/layout/navbar';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-200">
      <div className="bg-background w-full max-w-md">
        {children}
        <Navbar />
      </div>
    </div>
  );
}
