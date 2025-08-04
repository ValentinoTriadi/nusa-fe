import { Badge } from '@/components/ui/badge';

import { cn } from '@/lib/utils';

import { CollaborationCardProps } from '@/types/page/home';

export const CollaborationCard = ({
  id,
  title,
  totalParticipants,
  target,
  status,
}: CollaborationCardProps) => {
  return (
    <div
      className={cn('cursor-pointer rounded-lg border p-4', {
        'border-green-200 bg-green-50 hover:bg-green-100': status === 'Aktif',
        'border-orange-200 bg-orange-50 hover:bg-orange-100':
          status === 'Pending',
        'border-gray-200 bg-gray-50 opacity-70 hover:bg-gray-100':
          status === 'Selesai',
      })}
    >
      <div className="flex items-start justify-between">
        <div className="flex flex-col items-start gap-1">
          <h3 className="mb-1 font-semibold text-gray-700">
            {title || 'Kolaborasi Baru'}
          </h3>
          <p className="text-sm text-gray-600">
            {totalParticipants} UMKM • Target: {target}
          </p>
        </div>
        <Badge
          className={cn('rounded-full px-4 text-white', {
            'bg-green-500': status === 'Aktif',
            'bg-orange-500': status === 'Pending',
            'bg-gray-500': status === 'Selesai',
          })}
        >
          {status || 'Aktif'}
        </Badge>
      </div>
    </div>
  );
};
