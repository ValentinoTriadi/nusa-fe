import Image from 'next/image';

import { RegisterForm } from './Form';

const RegisterPage = () => {
  return (
    <div className="bg-background flex min-h-[100dvh] flex-col items-center overflow-y-scroll p-4 pb-16">
      {/* Header */}
      <div className="bg-background flex w-full items-center p-2">
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
