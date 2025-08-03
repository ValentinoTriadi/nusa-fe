import Image from 'next/image';

import { LoginForm } from './Form';

const LoginPage = () => {
  return (
    <div className="bg-background flex h-screen flex-col items-center overflow-y-scroll p-4 pb-16">
      {/* Header */}
      <div className="bg-background flex w-full items-center p-2">
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
