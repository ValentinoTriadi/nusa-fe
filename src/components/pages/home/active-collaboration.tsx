import { Users } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

import { collaborationData } from '@/constants/pages/home';

import { CollaborationCard } from './collaboration-card';

export const ActiveCollaborations = () => {
  return (
    <Card className="w-full max-w-md px-2 py-4">
      <CardContent className="flex flex-col gap-4 px-2">
        <div className="mb-4 flex items-center gap-2">
          <Users className="h-5 w-5 text-orange-500" />
          <h2 className="text-lg font-semibold text-gray-800">
            Kolaborasi Aktif
          </h2>
        </div>

        {collaborationData.map((collaboration) => (
          <CollaborationCard
            key={collaboration.id}
            id={collaboration.id}
            title={collaboration.title}
            totalParticipants={collaboration.totalParticipants}
            target={collaboration.target}
            status={collaboration.status}
          />
        ))}
      </CardContent>
    </Card>
  );
};
