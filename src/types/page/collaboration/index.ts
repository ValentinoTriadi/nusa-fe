export interface CollaborationData {
  id: string;
  title: string;
  initiator: string;
  status: 'Aktif' | 'Perencanaan' | 'Selesai';
  progress?: number;
  currentAmount?: number;
  targetAmount?: number;
  unit?: string;
  description?: string;
  participantsCount: number;
  participantsText: string;
  savingsPercentage?: number;
  borderColor: string;
  statusColor: string;
  hasJoinButton?: boolean;
}

export interface CollaborationCardProps {
  collaboration: CollaborationData;
  onJoin: (id: string) => void;
  onViewDetails: (id: string) => void;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  unit: string;
  estimatedPrice: number;
  targetAmount: number;
  savingsPercentage: number;
}

export interface CreateCollaborationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    productId: string;
    status: 'Aktif' | 'Perencanaan';
    title: string;
    description?: string;
    amount: number;
  }) => void;
}
