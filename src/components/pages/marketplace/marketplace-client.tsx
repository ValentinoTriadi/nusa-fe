'use client';

import { useEffect, useRef, useState } from 'react';

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
  const [isSearchVisible, setIsSearchVisible] = useState(true);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef.current) return;

      const currentScrollY = scrollContainerRef.current.scrollTop;
      const scrollDirection =
        currentScrollY > lastScrollY.current ? 'down' : 'up';
      const scrollDelta = Math.abs(currentScrollY - lastScrollY.current);
      const isNearBottom =
        currentScrollY + scrollContainerRef.current.clientHeight >=
        scrollContainerRef.current.scrollHeight - 50;

      // Only process if there's significant movement
      if (scrollDelta > 5) {
        console.log(
          'Scroll direction:',
          scrollDirection,
          'Current Y:',
          currentScrollY,
        );
        if (scrollDirection === 'down' && currentScrollY > 20) {
          setIsSearchVisible(false);
        } else if (scrollDirection === 'up' && !isNearBottom) {
          setIsSearchVisible(true);
        }
        lastScrollY.current = currentScrollY;
      }
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll, {
        passive: true,
      });
      return () => {
        scrollContainer.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

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
    <div className="bg-background flex h-screen w-full flex-col pb-16">
      {/* Header */}
      <div className="z-20 flex-shrink-0 bg-white px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900">Marketplace</h1>
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
          selectedCategories={selectedCategories}
          onCategoryChange={setSelectedCategories}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
      </div>

      {/* Tab Switcher */}
      <div className="z-20 flex-shrink-0">
        <TabSwitcher activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* Content */}
      <div
        ref={scrollContainerRef}
        className="min-h-0 flex-1 overflow-y-auto p-4"
      >
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
