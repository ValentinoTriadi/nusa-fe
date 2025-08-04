export interface TabSwitcherProps {
  activeTab: 'produk' | 'mitra';
  onTabChange: (tab: 'produk' | 'mitra') => void;
}
