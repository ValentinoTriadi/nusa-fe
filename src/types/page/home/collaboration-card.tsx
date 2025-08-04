export interface CollaborationCardProps {
  id: string;
  title: string;
  status: 'Aktif' | 'Selesai' | 'Pending';
  totalParticipants: number;
  target: string;
}
