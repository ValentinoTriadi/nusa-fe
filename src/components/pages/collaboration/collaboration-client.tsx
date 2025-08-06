'use client';

import { Plus, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import {
  mockCollaborations,
  mockProducts,
} from '@/constants/pages/collaboration';

import { CollaborationCard } from './collaboration-card';
import { CreateCollaborationModal } from './create-collaboration-modal';

export const CollaborationClient = () => {
  const [collaborations, setCollaborations] = useState(mockCollaborations);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateNew = () => {
    setIsModalOpen(true);
  };

  const handleCreateCollaboration = (data: {
    productId: string;
    status: 'Aktif' | 'Perencanaan';
    title: string;
    description?: string;
    amount: number;
  }) => {
    // Find the selected product to get its details
    const selectedProduct = mockProducts.find((p) => p.id === data.productId);

    // Generate new collaboration based on form data
    const newCollaboration = {
      id: `new_${Date.now()}`,
      title: data.title,
      initiator: 'Your Company', // This should come from user context
      status: data.status,
      description: data.description,
      participantsCount: 1,
      participantsText: '1 UMKM bergabung',
      borderColor:
        data.status === 'Aktif' ? 'border-green-400' : 'border-blue-400',
      statusColor:
        data.status === 'Aktif'
          ? 'bg-green-100 text-green-700'
          : 'bg-blue-100 text-blue-700',
      hasJoinButton: false,
      // Add progress for Aktif status
      ...(data.status === 'Aktif' && {
        progress: Math.round(
          (data.amount / (selectedProduct?.targetAmount || 100)) * 100,
        ),
        currentAmount: data.amount, // User's purchase amount
        targetAmount: selectedProduct?.targetAmount || 100, // Product's target from mockup
        unit: selectedProduct?.unit || 'unit',
        savingsPercentage: selectedProduct?.savingsPercentage || 15,
      }),
    };
    setCollaborations((prev) => [newCollaboration, ...prev]);
    console.log('New collaboration created:', newCollaboration);
  };

  const handleJoinCollaboration = (id: string) => {
    // Handle join collaboration
    console.log('Join collaboration:', id);
  };

  const handleViewDetails = (id: string) => {
    // Handle view details
    console.log('View details for:', id);
  };

  return (
    <div className="bg-background flex h-screen w-full flex-col pb-16">
      {/* Header */}
      <div className="z-20 flex-shrink-0 bg-white px-4 py-6 shadow-lg">
        <div className="z-20 mb-6 flex flex-shrink-0 justify-between bg-white">
          <h1 className="text-2xl font-bold text-gray-900">Kolaborasi</h1>
          <Link
            href={'/cart'}
            className="text-foreground z-10 flex aspect-square items-center gap-2 rounded-full !p-2 transition-colors duration-300 ease-in-out hover:bg-gray-200/50"
          >
            <ShoppingCart size={20} className="h-5 w-5" />
          </Link>
        </div>

        {/* Create New Button */}
        <button
          onClick={handleCreateNew}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#FF5C00] px-6 py-3 font-medium text-white transition-colors hover:bg-[#e54f00]"
        >
          <Plus size={20} />
          Buat Kolaborasi Baru
        </button>
      </div>

      {/* Content */}
      <div className="min-h-0 flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {collaborations.map((collaboration) => (
            <CollaborationCard
              key={collaboration.id}
              collaboration={collaboration}
              onJoin={handleJoinCollaboration}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      </div>

      {/* Create Collaboration Modal */}
      <CreateCollaborationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateCollaboration}
      />
    </div>
  );
};
