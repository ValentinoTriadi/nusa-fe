import Image from 'next/image';

import { cn } from '@/lib/utils';

import { PartnerCardProps } from '@/types/page/home';

export const PartnerCard = ({
  foto,
  nama,
  deskripsi,
  jarak,
  persentase,
}: PartnerCardProps) => {
  return (
    <div className="bg-background flex cursor-pointer items-center gap-3 rounded-sm p-2 hover:bg-gray-500/10">
      <div className="h-full flex-shrink-0 rounded-lg bg-gray-200">
        <Image
          src={foto || '/placeholder.svg'}
          alt={nama || 'Mitra'}
          width={64}
          height={64}
          className="h-full w-full rounded-sm object-cover"
        />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-gray-800">{nama}</h3>
        <p className="mb-1 text-sm text-gray-600">
          {deskripsi} • {jarak} km
        </p>
        <span
          className={cn(
            'inline-block rounded-full px-3 py-1 text-xs text-white',
            persentase < 50 ? 'bg-gray-500' : 'bg-purple-500',
          )}
        >
          {persentase}% Cocok
        </span>
      </div>
    </div>
  );
};
