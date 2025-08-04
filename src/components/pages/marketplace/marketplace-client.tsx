'use client';

import { useState } from 'react';

import { ProductCard } from '@/components/pages/marketplace/product-card';
import { SearchFilter } from '@/components/pages/marketplace/search-filter';
import { TabSwitcher } from '@/components/pages/marketplace/tab-switcher';

import { mockProducts } from '@/constants/pages/marketplace/product';

export const MarketplaceClient = () => {
  const [activeTab, setActiveTab] = useState<'produk' | 'mitra'>('produk');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('price_asc');
  const [favorites, setFavorites] = useState<string[]>([]);

  const handleToggleFavorite = (productId: string) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };

  const sortedProducts = [...mockProducts].sort((a, b) => {
    if (sortBy === 'price_asc') {
      return a.price - b.price;
    } else if (sortBy === 'price_desc') {
      return b.price - a.price;
    }
    return 0; // No sorting if neither condition matches
  });

  const filteredProducts = sortedProducts.filter(
    (product) =>
      (product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.seller.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedCategories.length === 0 ||
        ((selectedCategories.includes('Terdekat')
          ? product.distance < 15
          : true) &&
          (selectedCategories.includes('Bahan Baku')
            ? product.category === 'Bahan Baku'
            : true) &&
          (selectedCategories.includes('Kemasan')
            ? product.category === 'Kemasan'
            : true))),
  );

  return (
    <div className="bg-background flex min-h-screen w-full flex-col pb-16">
      {/* Header */}
      <div className="bg-white px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900">Marketplace</h1>
      </div>

      {/* Search and Filters */}
      <SearchFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategories={selectedCategories}
        onCategoryChange={setSelectedCategories}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {/* Tab Switcher */}
      <TabSwitcher activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Content */}
      <div className="flex-1 p-4">
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
