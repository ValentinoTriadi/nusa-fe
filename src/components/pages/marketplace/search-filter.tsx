import { ArrowUpDown, Search } from 'lucide-react';

import { SearchFilterProps } from '@/types/page/marketplace';

export const SearchFilter = ({
  searchQuery,
  onSearchChange,
  selectedCategories,
  onCategoryChange,
  sortBy,
  onSortChange,
}: SearchFilterProps) => {
  const categories = ['Terdekat', 'Bahan Baku', 'Kemasan'];

  const handleCategoryToggle = (category: string) => {
    if (selectedCategories.includes(category)) {
      onCategoryChange(selectedCategories.filter((c) => c !== category));
    } else {
      onCategoryChange([...selectedCategories, category]);
    }
  };

  return (
    <div className="space-y-4 bg-white p-4">
      {/* Search Bar */}
      <div className="relative">
        <Search
          size={20}
          className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400"
        />
        <input
          type="text"
          placeholder="Cari produk atau mitra..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-lg border border-gray-200 bg-gray-50 py-3 pr-4 pl-10 text-sm focus:border-transparent focus:ring-2 focus:ring-[#FF5C00] focus:outline-none"
        />
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryToggle(category)}
            className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              selectedCategories.includes(category)
                ? 'border-purple-200 bg-purple-100 text-purple-700'
                : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Filter and Sort */}
      <div className="flex items-center justify-between">
        <button
          onClick={() =>
            onSortChange(sortBy === 'price_asc' ? 'price_desc' : 'price_asc')
          }
          className="flex cursor-pointer items-center gap-2 text-sm text-gray-600 hover:text-black"
        >
          <ArrowUpDown size={16} />
          Harga: {sortBy === 'price_asc' ? 'paling murah' : 'paling mahal'}
        </button>
      </div>
    </div>
  );
};
