import { TabSwitcherProps } from '@/types/page/marketplace';

export const TabSwitcher = ({ activeTab, onTabChange }: TabSwitcherProps) => {
  return (
    <div className="bg-white shadow-lg">
      <div className="flex">
        <button
          onClick={() => onTabChange('produk')}
          className={`flex-1 py-3 text-sm font-medium transition-colors ${
            activeTab === 'produk'
              ? 'border-b-2 border-[#FF5C00] text-gray-900'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Produk
        </button>
        <button
          onClick={() => onTabChange('mitra')}
          className={`flex-1 py-3 text-sm font-medium transition-colors ${
            activeTab === 'mitra'
              ? 'border-b-2 border-[#FF5C00] text-gray-900'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Mitra
        </button>
      </div>
    </div>
  );
};
