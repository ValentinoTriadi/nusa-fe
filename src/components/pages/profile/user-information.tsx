import { User } from 'lucide-react';

import { SessionCompany, SessionUser } from '@/types/auth.type';

export const UserInformation = ({
  user,
  company,
}: {
  user: SessionUser;
  company?: SessionCompany;
}) => {
  return (
    <div className="rounded-lg bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100">
          <User size={20} className="text-orange-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Informasi Akun</h2>
      </div>
      <div className="text-muted-foreground mt-2 space-y-1 text-sm">
        <div className="space-y-1">
          <div className="flex">
            <span className="w-32 font-medium">Email:</span>
            <span>{user.email}</span>
          </div>
          <div className="flex">
            <span className="w-32 font-medium">No Telepon:</span>
            <span>{company?.phoneNumber}</span>
          </div>
          <div className="flex">
            <span className="w-32 font-medium">Pemilik:</span>
            <span>{user.name}</span>
          </div>
          <div className="flex">
            <span className="w-32 font-medium">NIB:</span>
            <span>{company?.businessId}</span>
          </div>
          <div className="flex">
            <span className="w-32 font-medium">Terdaftar sejak:</span>
            <span>
              {new Date(user.createdAt).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
