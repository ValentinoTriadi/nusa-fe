import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { LoginForm } from './Form';

const LoginPage = () => {
  return (
    <div className="bg-background flex h-screen flex-col items-center overflow-y-scroll pb-16">
      {/* Header */}
      <div className="bg-background sticky top-0 flex w-full items-center gap-3 p-6">
        <Link href={'/'}>
          <ArrowLeft className="h-6 w-6 text-gray-900" />
        </Link>
        <h1 className="w-full text-left text-3xl font-bold text-gray-900">
          Masuk
        </h1>
      </div>

      <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-4">
        {/* Logo */}
        <div className="flex h-full w-full items-center justify-center">
          <Image
            src="/logo.png"
            alt="Logo"
            width={128}
            height={128}
            className="h-40 w-40 rounded-lg"
          />
        </div>

        {/* Login Form */}
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
