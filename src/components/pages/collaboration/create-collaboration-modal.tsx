'use client';

import { Package, X } from 'lucide-react';
import { useState } from 'react';

import { mockProducts } from '@/constants/pages/collaboration';
import {
  CreateCollaborationModalProps,
  Product,
} from '@/types/page/collaboration';

export const CreateCollaborationModal = ({
  isOpen,
  onClose,
  onSubmit,
}: CreateCollaborationModalProps) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [status, setStatus] = useState<'Aktif' | 'Perencanaan'>('Perencanaan');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedProduct || !title.trim() || amount <= 0) {
      alert(
        'Mohon pilih produk, isi judul kolaborasi, dan masukkan jumlah yang valid',
      );
      return;
    }

    onSubmit({
      productId: selectedProduct.id,
      status,
      title: title.trim(),
      description: description.trim() || undefined,
      amount,
    });

    // Reset form
    setSelectedProduct(null);
    setStatus('Perencanaan');
    setTitle('');
    setDescription('');
    setAmount(0);
    onClose();
  };

  const handleClose = () => {
    setSelectedProduct(null);
    setStatus('Perencanaan');
    setTitle('');
    setDescription('');
    setAmount(0);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50">
      <div className="mx-4 max-h-[80vh] w-[95%] max-w-[428px] overflow-hidden rounded-lg bg-white">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Buat Kolaborasi Baru
          </h2>
          <button
            onClick={handleClose}
            className="p-2 text-gray-400 transition-colors hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[calc(80vh-200px)] overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-6 p-6">
            {/* Product Selection */}
            <div>
              <label className="mb-3 block text-sm font-medium text-gray-700">
                Pilih Produk/Item
              </label>
              <div className="grid gap-3">
                {mockProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => setSelectedProduct(product)}
                    className={`cursor-pointer rounded-lg border p-4 transition-all ${
                      selectedProduct?.id === product.id
                        ? 'border-[#FF5C00] bg-orange-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="rounded-lg bg-gray-100 p-2">
                        <Package size={20} className="text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">
                          {product.name}
                        </h3>
                        <p className="mb-1 text-sm text-gray-600">
                          {product.description}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700">
                            {product.category}
                          </span>
                          <span className="text-sm font-medium text-[#FF5C00]">
                            ~Rp {product.estimatedPrice.toLocaleString('id-ID')}
                            /{product.unit}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Collaboration Details */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Judul Kolaborasi
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Masukkan judul kolaborasi"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-[#FF5C00] focus:outline-none"
                required
              />
            </div>

            {/* Amount Input */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Jumlah yang Ingin Dibeli{' '}
                {selectedProduct && `(${selectedProduct.unit})`}
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={amount || ''}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  placeholder={
                    selectedProduct
                      ? `Masukkan jumlah yang ingin dibeli dalam ${selectedProduct.unit}`
                      : 'Pilih produk terlebih dahulu'
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-[#FF5C00] focus:outline-none"
                  min="1"
                  disabled={!selectedProduct}
                  required
                />
                {selectedProduct && (
                  <div className="mt-1 text-sm text-gray-600">
                    Target kolaborasi: {selectedProduct.targetAmount}{' '}
                    {selectedProduct.unit} (Hemat{' '}
                    {selectedProduct.savingsPercentage}%)
                  </div>
                )}
              </div>
            </div>

            {/* Status Selection */}
            <div>
              <label className="mb-3 block text-sm font-medium text-gray-700">
                Status Kolaborasi
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setStatus('Perencanaan')}
                  className={`rounded-lg border p-3 text-left transition-all ${
                    status === 'Perencanaan'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium text-gray-900">Perencanaan</div>
                  <div className="text-sm text-gray-600">
                    Mencari mitra untuk bergabung
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setStatus('Aktif')}
                  className={`rounded-lg border p-3 text-left transition-all ${
                    status === 'Aktif'
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium text-gray-900">Aktif</div>
                  <div className="text-sm text-gray-600">
                    Langsung mulai kolaborasi
                  </div>
                </button>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Deskripsi (Opsional)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tambahkan deskripsi kolaborasi..."
                rows={3}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-[#FF5C00] focus:outline-none"
              />
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-gray-200 p-6">
          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50"
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            disabled={!selectedProduct || !title.trim() || amount <= 0}
            className="rounded-lg bg-[#FF5C00] px-6 py-2 text-white transition-colors hover:bg-[#e54f00] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Buat Kolaborasi
          </button>
        </div>
      </div>
    </div>
  );
};
