import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { RegisterForm } from './Form';

const RegisterPage = () => {
  return (
    <div className="bg-background flex min-h-screen flex-col items-center overflow-y-scroll p-4 pb-16">
      {/* Header */}
      <div className="bg-background flex w-full items-center gap-3 p-2">
        <Link href={'/auth/login'}>
          <ArrowLeft className="h-6 w-6 text-gray-900" />
        </Link>
        <h1 className="w-full text-left text-3xl font-bold text-gray-900">
          Daftar
        </h1>
      </div>

      {/* Separator */}
      <div className="my-4" />

      {/* Register Form */}
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
