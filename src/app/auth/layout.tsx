import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-200">
      <div className="bg-background w-full max-w-md">{children}</div>
    </div>
  );
}
