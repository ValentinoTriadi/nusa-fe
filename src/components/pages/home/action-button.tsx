import { Search, Users } from 'lucide-react';

import { Button } from '@/components/ui/button';

export const ActionButton = () => {
  return (
    <div className="grid w-full grid-cols-2 gap-3">
      <Button className="flex h-16 flex-col gap-2 rounded-md bg-white p-10 shadow-sm hover:bg-gray-100/80">
        <Search className="h-6 w-6 text-orange-500" />
        <span className="font-medium text-gray-700">Cari Mitra</span>
      </Button>
      <Button className="flex h-16 flex-col gap-2 rounded-md bg-white p-10 shadow-sm hover:bg-gray-100/80">
        <Users className="h-6 w-6 text-purple-500" />
        <span className="font-medium text-gray-700">Beli Bareng</span>
      </Button>
    </div>
  );
};
