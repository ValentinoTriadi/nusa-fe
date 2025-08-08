'use client';

import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { ProductCard } from '@/components/pages/marketplace/product-card';
import { SearchFilter } from '@/components/pages/marketplace/search-filter';
import { TabSwitcher } from '@/components/pages/marketplace/tab-switcher';

import { useProductListQuery } from '@/hooks/api/use-product';

export const MarketplaceClient = () => {
  const [activeTab, setActiveTab] = useState<'produk' | 'mitra'>('produk');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('price_asc');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isSearchVisible, setIsSearchVisible] = useState(true);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const { data, isLoading } = useProductListQuery();

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const products = data?.data?.data || [];
  const sortedProducts = [...products].sort((a, b) => {
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
        product.store?.storeName
          .toLowerCase()
          .includes(searchQuery.toLowerCase())) &&
      (selectedCategories.length === 0 ||
        ((selectedCategories.includes('Terdekat') ? true : true) &&
          (selectedCategories.includes('Bahan Baku')
            ? product.tags.includes('Bahan Baku')
            : true) &&
          (selectedCategories.includes('Kemasan')
            ? product.tags.includes('Kemasan')
            : true))),
  );

  return (
    <div className="bg-background flex h-screen w-full flex-col pb-16">
      {/* Header */}
      <div className="z-20 flex flex-shrink-0 items-center justify-between bg-white px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900">Pasar</h1>
        <Link
          href={'/cart'}
          className="text-foreground z-10 flex aspect-square items-center gap-2 rounded-full !p-2 transition-colors duration-300 ease-in-out hover:bg-gray-200/50"
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
          selectedCategories={selectedCategories}
          onCategoryChange={setSelectedCategories}
          sortBy={sortBy}
          onSortChange={setSortBy}
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
      <div
        ref={scrollContainerRef}
        className="min-h-0 flex-1 overflow-y-auto p-4"
      >
        {activeTab === 'produk' ? (
          <div className="space-y-3">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
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
