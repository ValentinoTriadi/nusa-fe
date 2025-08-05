'use client';

import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { ProductCard } from '@/components/pages/marketplace/product-card';
import { SearchFilter } from '@/components/pages/marketplace/search-filter';
import { TabSwitcher } from '@/components/pages/marketplace/tab-switcher';

import { mockProducts } from '@/constants/pages/marketplace/product';

export const FavoritesClient = () => {
  const [activeTab, setActiveTab] = useState<'produk' | 'mitra'>('produk');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>(
    mockProducts.map((product) => product.id),
  );
  const [isSearchVisible, setIsSearchVisible] = useState(true);

  const handleToggleFavorite = (productId: string) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };

  const sortedProducts = [...mockProducts].sort((a, b) => {
    return a.price - b.price;
  });

  const filteredProducts = sortedProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.seller.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="bg-background flex h-screen w-full flex-col pb-16">
      {/* Header */}
      <div className="z-20 flex flex-shrink-0 justify-between bg-white px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900">Favorites</h1>
        <Link
          href={'/cart'}
          className="text-foreground hover:bg-accent/50 z-10 flex aspect-square items-center gap-2 rounded-full !p-2 transition-colors duration-300 ease-in-out hover:text-white"
        >
          <ShoppingCart size={20} className="h-5 w-5" />
        </Link>
      </div>

      {/* Search and Filters */}
      <div
        className={`flex-shrink-0 overflow-hidden transition-all duration-300 ease-in-out ${
          isSearchVisible
            ? 'max-h-96 translate-y-0 opacity-100'
            : 'max-h-0 -translate-y-full opacity-0'
        }`}
      >
        <SearchFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </div>

      {/* Tab Switcher */}
      <div className="z-20 flex-shrink-0">
        <TabSwitcher
          activeTab={activeTab}
          onTabChange={(str: string) => {
            setActiveTab(str as 'produk' | 'mitra');
            setIsSearchVisible(true);
          }}
        />
      </div>

      {/* Content */}
      <div className="min-h-0 flex-1 overflow-y-auto p-4">
        {activeTab === 'produk' ? (
          <div className="space-y-3">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                isFavorited={favorites.includes(product.id)}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center py-12">
            <p className="text-gray-500">Mitra content coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
};
