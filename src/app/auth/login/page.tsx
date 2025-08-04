import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { LoginForm } from './Form';

const LoginPage = () => {
  return (
    <div className="bg-background flex h-screen flex-col items-center overflow-y-scroll p-4 pb-16">
      {/* Header */}
      <div className="bg-background flex w-full items-center gap-3 p-2">
        <Link href={'/'}>
          <ArrowLeft className="h-6 w-6 text-gray-900" />
        </Link>
        <h1 className="w-full text-left text-3xl font-bold text-gray-900">
          Masuk
        </h1>
      </div>

      {/* Logo */}
      <div className="flex h-full w-full items-center justify-center">
        <Image
          src="/web-app-manifest-512x512.png"
          alt="Logo"
          width={128}
          height={128}
          className="h-40 w-40"
        />
      </div>

      {/* Login Form */}
      <LoginForm />
    </div>
  );
};

export default LoginPage;
